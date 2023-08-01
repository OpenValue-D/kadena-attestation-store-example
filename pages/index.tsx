import AppNavbar from "../app/components/AppNavbar";
import "bootstrap/dist/css/bootstrap.css"
import "./globals.css"
import CertSearchAndShow from "@/app/components/CertSearchAndShow";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <><AppNavbar/><CertSearchAndShow/><Footer/></>
  )
}
