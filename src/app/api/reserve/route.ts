// src/app/api/reservations/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type ReservationInput = {
  name: string;
  phone: string;
  party_size: number;
  date: string;            // "YYYY-MM-DD"
  time: string;            // e.g. "9:30 AM" or "12:00 PM"
  status?: string;         // optional, default "pending"
  special_requests?: string;
};

function isReservationInput(x: unknown): x is ReservationInput {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.name === "string" &&
    typeof o.phone === "string" &&
    typeof o.party_size === "number" &&
    typeof o.date === "string" &&
    typeof o.time === "string"
  );
}

function toISO(date: string, time: string): string {
  // Let JS parse; your UI already controls the format.
  // Example date "2025-10-15", time "9:30 AM"
  return new Date(`${date} ${time}`).toISOString();
}

// POST /api/reservations  -> create reservation
export async function POST(req: Request) {
  const raw = (await req.json()) as unknown;

  if (!isReservationInput(raw)) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const {
    name,
    phone,
    party_size,
    date,
    time,
    status = "pending",
    special_requests = "",
  } = raw;

  if (!name.trim() || !phone.trim() || party_size <= 0 || !date || !time) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const reservation_time = toISO(date, time);

  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        name,
        phone,
        party_size,
        reservation_time,
        status,
        special_requests,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        branch: (raw as any).branch || "Main",

      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, reservation: data }, { status: 201 });
}

// GET /api/reservations  -> list recent reservations (simple dev check)
export async function GET() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}
