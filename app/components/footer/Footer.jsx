"use client";
import Image from "next/image";
import Link from "next/link";
import fetchHandler from "@/utils/fetchHandler";
import { useEffect, useState } from "react";
import "./Footer.css";

const getFooter = async () => {
	try {
		const response = await fetchHandler(
			`${process.env.NEXT_PUBLIC_STRAPI}/api/home?populate=logo`,
			{ cache: "no-store" }
		);
		return response;
	} catch (error) {
		console.error(`Error getting data: ${error}`);
	}
};

function Footer() {
	const [logoUrl, setLogoUrl] = useState();

	useEffect(() => {
		getFooter().then((response) => {
			const logo =
				response?.data?.attributes?.logo?.data?.attributes?.formats?.medium
					?.url;
			setLogoUrl(logo);
		});
	}, []);

	return (
		<footer>
			<div className="container-footer">

				<Link href="/" className="book-footer">
					<h2 className="book-footer">
						<span className="text-pink-800 font-bold">Book</span> Your
						Appointment Today
					</h2>
				</Link>

				<section>
					<Image
						src={logoUrl}
						width={300}
						height={300}
						alt="logo de leonor b"
						className="logo-footer"
					/>

					<div className="leonorB-footer-container">
						<h1>LeonorB</h1>
						<h2>Online Homeopath</h2>
					</div>

					<div className="RRSS-container">
						<h1>Follow Me</h1>
						<div className="icons-container">
							<Link
								href="https://m.facebook.com/Homeopathyenergymedicine"
								target="blank"
							>
								{" "}
								<Image
									src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1696188039/thumbnail_facebook_d431f572be.png"
									width={50}
									height={50}
									alt="icono de facebook"
									className="icon"
								/>
							</Link>
							<Link href="/">
								{" "}
								<Image
									src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1696188039/thumbnail_insta_3f71c96df3.png"
									width={48}
									height={44}
									alt="icon de facebook"
									className="icon"
								/>
							</Link>
						</div>
					</div>
				</section>
			</div>
			<div className="developedBy">
				<p>Leonor B &copy;</p>
				<Link href="/">Developed by MBA Digital</Link>
			</div>
		</footer>
	);
}

export default Footer;
