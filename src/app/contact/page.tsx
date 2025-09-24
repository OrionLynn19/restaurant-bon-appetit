// src/app/contact/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";

type Branch = {
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  gmaps: string;
  image: string;     // from /public/images/...
  lat: number;
  lng: number;
};

const telHref = (s: string) => "tel:" + s.replace(/[^\d+]/g, "");

const branches: Branch[] = [
  {
    city: "BANGKOK",
    name: "Bon Appétit – Silom",
    address: "Floor 4, 991 Rama I Rd Bangkok, 10330",
    phone: "+66 45 322 019",
    hours: "9am–12pm (Everyday)",
    gmaps: "https://maps.google.com/?q=Bon%20Appetit%20Silom",
    image: "/images/our-story-2.png",
    lat: 13.725, // Silom approx
    lng: 100.529,
  },
  {
    city: "BANGKOK",
    name: "Bon Appétit – Pathum Thani",
    address: "Floor 4, 991 Rama I Rd Bangkok, 10330",
    phone: "+66 45 322 019",
    hours: "9am–12pm (Everyday)",
    gmaps: "https://maps.google.com/?q=Bon%20Appetit%20Pathum%20Thani",
    image: "/images/our-story-4.png",
    lat: 14.020, // Pathum Thani approx
    lng: 100.525,
  },
  {
    city: "BANGKOK",
    name: "Bon Appétit – Mo Chit",
    address: "Floor 4, 991 Rama I Rd Bangkok, 10330",
    phone: "+66 45 322 019",
    hours: "9am–12pm (Everyday)",
    gmaps: "https://maps.google.com/?q=Bon%20Appetit%20Mo%20Chit",
    image: "/images/our-story-3.png",
    lat: 13.816, // Mo Chit approx
    lng: 100.553,
  },
];

export default function Contact() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      const L = await import("leaflet");

      // Use CDN icons so markers show up without extra config
      const icon = L.icon({
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      // init map once
      if (
        mapRef.current &&
        !(mapRef.current as HTMLDivElement & { _leaflet_id?: number })._leaflet_id
      ) {
        const map = L.map(mapRef.current, {
          center: [13.77, 100.54],
          zoom: 11,
          scrollWheelZoom: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
          maxZoom: 19,
        }).addTo(map);

        const group: L.Marker[] = [];
        branches.forEach((b) => {
          const m = L.marker([b.lat, b.lng], { icon })
            .addTo(map)
            .bindPopup(`<strong>${b.name}</strong>`);
          group.push(m);
        });

        // fit bounds to the three pins with padding
        const bounds = L.featureGroup(group).getBounds();
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    })();
  }, []);

  return (
    <div className="bg-[#fff9ef] text-stone-800">
      {/* Caption + Title */}
      <section className="mx-auto max-w-6xl px-4 pt-6 text-center">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[.25em] text-amber-500">
          •DELICIOUS FOODS•
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-emerald-900">
          CONTACT US
        </h1>
      </section>

      {/* Map with 3 pins */}
      <section className="mx-auto mt-5 max-w-6xl px-4">
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <div ref={mapRef} className="h-[360px] w-full" />
        </div>
      </section>

      {/* 3 photos together on desktop */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3">
        {branches.map((b, i) => (
          <article
            key={b.name}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <figure className="relative aspect-[4/3]">
              <Image
                src={b.image}
                alt={b.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "auto"}
              />
            </figure>
            <div className="p-4 text-left">
              <p className="text-[11px] font-bold tracking-[.2em] text-stone-500">
                {b.city}
              </p>
              <h3 className="mt-1 text-lg font-extrabold text-emerald-900">
                {b.name}
              </h3>
              <ul className="mt-2 space-y-1 text-[13px]">
                <li className="flex items-start gap-2">
                  <span aria-hidden>📍</span>
                  <span>{b.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden>🧭</span>
                  <a
                    href={b.gmaps}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-emerald-700 underline-offset-2 hover:underline"
                  >
                    Get Direction
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden>☎️</span>
                  <a href={telHref(b.phone)} className="hover:underline">
                    {b.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden>⏰</span>
                  <span>{b.hours}</span>
                </li>
              </ul>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
