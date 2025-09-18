import Homepage_FAQ from "../components/Homepage_FAQ";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#FFFCF1" }} className="min-h-screen">
      <div className="p-10 text-center text-3xl text-orange-500">
        This is Home Page
      </div>
      {/* FAQ Section */}
      <Homepage_FAQ />
    </div>
  );
}
