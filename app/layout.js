import Header from "./components/header/Header";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import "./globals.css";
import "./components/header/Header.css"
import "typeface-raleway";
import "typeface-tangerine";
import "@fontsource/red-hat-display";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

export const metadata = {
	openGraph: {
	  title: "LeonorB Homeopath Online",
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
