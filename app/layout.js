import Header from "../components/Header"
import { Toaster } from "../utils/Toaster";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "@fontsource/red-hat-display";
import "@creative-fonts/agreement-signature"
import "typeface-raleway";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

export const metadata = {
	openGraph: {
	  title: "Leonor-B Homeopath Online",
	  description: "Welcome to my Site",
	  images: {
		url: "https://res.cloudinary.com/dsvlzbctv/image/upload/v1696360859/logoconfondo_71c9548045.png"
	  },
	  locale: 'es_CL',
	  type: 'website',
	}
  }

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Link href="/">
					<h2 className="bookHeader">
						Click<span>Here</span>to Book a
						New or Follow Up Consultation
					</h2>
				</Link>
				<Header />
				<Navbar />
				{children}
				<Toaster />
				<Footer />
			</body>
		</html>
	);
}
