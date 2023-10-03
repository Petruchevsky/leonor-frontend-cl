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
			{logoUrl ? (
				<Image
					src={logoUrl}
					width={300}
					height={300}
					alt="logo de leonor b"
					className="logo"
				/>
			) : (
				<p>No se pudo cargar el logo</p>
			)}

			<div className="lonorBcontainer">
				<h1 className="leonorB">LeonorB</h1>
				<h2 className="onlineHomeopath">Online Homeopath</h2>
			</div>

			<Link href="/" className="book">
				<h2 className="book">
					<span className="text-pink-800 font-bold">Book</span> Your Appointment
					Today
				</h2>
			</Link>

			<div className="icons">
				<h1>Follow Me</h1>
				<Link href="https://m.facebook.com/Homeopathyenergymedicine" target="blank">
					{" "}
					<Image
						src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1696188039/thumbnail_facebook_d431f572be.png"
						width={60}
						height={60}
						alt="logo de leonor b"
						className="icon"
					/>
				</Link>
				<Link href="/">
					{" "}
					<Image
						src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1696188039/thumbnail_insta_3f71c96df3.png"
						width={60}
						height={60}
						alt="logo de leonor b"
						className="icon"
					/>
				</Link>
			</div>
		</footer>
	);
}

export default Footer;
