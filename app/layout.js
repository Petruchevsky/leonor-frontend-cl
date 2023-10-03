import Header from "./components/header/Header";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import "./globals.css";
import "typeface-raleway";
import "typeface-tangerine";
import "@fontsource/red-hat-display";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

export const metadata = {
	title: "LeonorB",
	description: "Welcome to my Site ;)",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Link href="/">
					<h2 className="bookHeader">
						Click <span className="text-white font-bold">Here</span> to Book a
						New or Follow Up Consultation
					</h2>
				</Link>
				<Header />
				{/* <Navbar /> */}
				{children}
				<Toaster />
				<Footer />
			</body>
		</html>
	);
}
