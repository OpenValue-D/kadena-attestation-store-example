import AppNavbar from "../app/components/AppNavbar";
import "bootstrap/dist/css/bootstrap.css"
import "./globals.css"
import CertSearchAndShow from "@/app/components/CertSearchAndShow";
import Footer from "@/app/components/Footer";
import CreateEndorsement from "@/app/components/CreateEndorsement";
import ScoreCreation from "@/app/components/ScoreCreation";

export default function CreateScore() {
  return (
    <><AppNavbar/><ScoreCreation/><Footer/></>
  )
}
