import { Outlet } from "react-router";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

export default function AppLayout() {
  return (
    <main className="container mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
