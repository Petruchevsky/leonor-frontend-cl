import Header from "../components/Header";
import { Toaster } from "../utils/Toaster";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "@fontsource/red-hat-display";
import "typeface-glacial-indifference";
import "typeface-raleway";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { withAnimation } from "@/utils/Animation";

export const metadata = {
	openGraph: {
		title: "Leonor-B Homeopatía Online",
		description: "Bienvenido(a) a mi Sitio!",
		images: {
			url: "https://res.cloudinary.com/dsvlzbctv/image/upload/v1696360859/logoconfondo_71c9548045.png",
		},
		locale: "es_CL",
		type: "website",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div className="topHeader">
					<Link
						className="flagContainerES"
						href="https://leonor-frontend-cl.vercel.app/"
					>
						<Image
							src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1701951143/ESP_Flag_3119969f4f.png"
							alt="imagen de bandera española"
							width={50}
							height={50}
							className="esp-flag"
						/>
					</Link>

					<Link
						href={`${process.env.SETMORE}`}
						target="_blank"
						className="bookHeaderContainer"
					>
						<h2 className="bookHeader">
							Haz click<span>Aquí</span>para reservar tu Nueva Hora o continuar con tu Tratamiento.
						</h2>
					</Link>

					<Link
						className="flagContainerUK"
						href="https://www.leonorb-homeopath.uk/"
					>
						<Image
							src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1701951143/UK_Flag_1c46c82e8a.png"
							alt="imagen de bandera británica"
							width={50}
							height={50}
							className="uk-flag"
						/>
					</Link>

				</div>

				<Header />
				<Navbar />
				{children}
				<Toaster />
				<Footer />
			</body>
		</html>
	);
}
