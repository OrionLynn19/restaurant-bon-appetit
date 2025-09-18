import Link from "next/link";
import Image from "next/image";
const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/menu", label: "Menu" },
  { href: "/contact", label: "Contact Us" },
];
export default function Footer() {
  return (
    <footer className="mt-2 text-sm">
      <div className="flex max-w-[1440px] mx-auto py-10 ">
        {/* Left: Clinic IconxInfo + Address */}
        <div className="flex gap-40 w-[55%] ">
          {/* Clinic IconxInfo */}
          <section className="flex flex-col justify-center items-center mb-6 ">
            <div className="flex flex-col items-center mb-4 gap-[24px]">
              <Image
                className="mb-6"
                src="/images/footer-bon-icon.png"
                alt="footer-bon-icon"
                width={248}
                height={70}
              />
              <div className="flex justify-between gap-[24px]">
                <a
                  href="https://www.facebook.com/elevaclinic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Image
                    src="/images/facebook.png"
                    alt="Facebook"
                    width={30}
                    height={30}
                  />
                </a>
                <a
                  href="https://www.instagram.com/eleva_clinic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Image
                    src="/images/instagram.png"
                    alt="Instagram"
                    width={30}
                    height={30}
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@eleva_clinic"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <Image
                    src="/images/line.png"
                    alt="TikTok"
                    width={30}
                    height={30}
                  />
                </a>
                <a
                  href="https://page.line.me/757enuzp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Line"
                >
                  <Image
                    src="/images/tik tok.png"
                    alt="Line"
                    width={30}
                    height={30}
                  />
                </a>
              </div>
            </div>
          </section>
          {/* Address */}
          <section className="px-2 gap-10">
            <div>
              <h3
                className="text-[40px] pb-2 text-[#EF9748]"
                style={{
                  fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                }}
              >
                ADDRESS
              </h3>
              <p
                className="text-md font-[500] mb-2 text-black"
                style={{
                  fontFamily:
                    "var(--font-schibsted), Arial, Helvetica, sans-serif",
                }}
              >
                Floor 4, 991 Rama I Rd Bangkok, 10330
              </p>
              <p
                className="text-md font-[500] mb-2 text-black"
                style={{
                  fontFamily:
                    "var(--font-schibsted), Arial, Helvetica, sans-serif",
                }}
              >
                Floor 4, 991 Rama I Rd Bangkok, 10330
              </p>
              <p
                className="text-md font-[500] mb-2 text-black"
                style={{
                  fontFamily:
                    "var(--font-schibsted), Arial, Helvetica, sans-serif",
                }}
              >
                Floor 4, 991 Rama I Rd Bangkok, 10330
              </p>
            </div>
          </section>
        </div>
        {/* Right: Menu, Our Services, Explore */}
        <div className="w-[45%] grid grid-cols-3 gap-8">
          {/* Menu */}
          <section className="px-2">
            <div>
              <h3
                className="text-[#EF9748] text-[40px] pb-2"
                style={{
                  fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                }}
              >
                MENU
              </h3>
              <p
                className="text-md font-[500] mb-1 text-black"
                style={{
                  fontFamily:
                    "var(--font-schibsted), Arial, Helvetica, sans-serif",
                }}
              >
                Special Promotions
              </p>
              <p
                className="text-md font-[500] mb-1 text-black"
                style={{
                  fontFamily:
                    "var(--font-schibsted), Arial, Helvetica, sans-serif",
                }}
              >
                European Cuisine
              </p>
              <p
                className="text-md font-[500] mb-1 text-black"
                style={{
                  fontFamily:
                    "var(--font-schibsted), Arial, Helvetica, sans-serif",
                }}
              >
                Dessert & Drink
              </p>
              <p
                className="text-md font-[500] mb-1 text-black"
                style={{
                  fontFamily:
                    "var(--font-schibsted), Arial, Helvetica, sans-serif",
                }}
              >
                Salad
              </p>
            </div>
          </section>
          {/* Our Services */}
          <section>
            <div>
              <h3
                className="text-[#EF9748] text-[40px] pb-2"
                style={{
                  fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                }}
              >
                Our services
              </h3>
              <Link
                href="/"
                className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
              >
                Menu
              </Link>
              <Link
                href="/contact"
                className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
              >
                Contact Us
              </Link>
              <Link
                href="/about"
                className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
              >
                About Us
              </Link>
            </div>
          </section>
          {/* Explore */}
          <section>
            <div>
              <h3
                className="text-[#EF9748] text-[40px] pb-2"
                style={{
                  fontFamily: "var(--font-bebas), Arial, Helvetica, sans-serif",
                }}
              >
                Explore
              </h3>
              <Link
                href="#"
                className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
              >
                +6645322019
              </Link>
              <Link
                href="https://www.bonappetit.com/"
                className="font-[500] text-black mb-1 block hover:text-[#837e7d]"
              >
               @Bonappetit.com
              </Link>
 
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
