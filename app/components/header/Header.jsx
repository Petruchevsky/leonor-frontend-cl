"use client";
import Image from "next/image";
import fetchHandler from "@/utils/fetchHandler";
import { useEffect, useState } from "react";
import "./Header.css";

const getHome = async () => {
	try {
		const response = await fetchHandler(
			`${process.env.NEXT_PUBLIC_STRAPI}/api/home?populate=*`,
			{ cache: "no-store" }
		);
		return response;
	} catch (error) {
		console.error(`Error getting data: ${error}`);
	}
};

function Header() {
	const [logoUrl, setLogoUrl] = useState();

	useEffect(() => {
		getHome().then((response) => {
			const logo =
				response?.data?.attributes?.logo?.data?.attributes?.formats?.medium
					?.url;
			setLogoUrl(logo);
		});
	}, []);

	return (
		<header>
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

			<form action="/search" method="get" className="search">
				<input
					type="text"
					size={24}
					id="search"
					name="q"
					placeholder="What are you looking for...?"
				/>
				<input type="submit" value="Go" />
			</form>
		</header>
	);
}

export default Header;
