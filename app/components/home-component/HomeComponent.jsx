"use client";
import Image from "next/image";
import fetchHandler from "@/utils/fetchHandler";
import { useEffect, useState } from "react";
import "./HomeComponent.css";

const getHome = async () => {
	try {
		const response = await fetchHandler(
			`${process.env.NEXT_PUBLIC_STRAPI}/api/home?populate=selfie`,
			{ cache: "no-store" }
		);
		console.log(response);
		return response;
	} catch (error) {
		console.error(`Error getting data: ${error}`);
	}
};

function HomeComponent() {
	const [welcome, setWelcome] = useState();
	const [welcomeText, setWelcomeText] = useState();
	const [hhch, setHhch] = useState();
	const [hhchText, setHhchText] = useState();
	const [tsw, setTsw] = useState();
	const [tswText, setTswText] = useState();
	const [selfie, setSelfie] = useState();
	const [about, setAbout] = useState();
	const [aboutText, setAboutText] = useState();

	useEffect(() => {
		getHome().then((response) => {
			const tsw = response?.data?.attributes?.tsw;
			const tswText = response?.data?.attributes?.tswText;
			const welcome = response?.data?.attributes?.welcome;
			const welcomeText = response?.data?.attributes?.welcomeText;
			const hhch = response?.data?.attributes?.hhch;
			const hhchText = response?.data?.attributes?.hhchText;
			const about = response?.data?.attributes?.about;
			const aboutText = response?.data?.attributes?.aboutText;
			const selfie =
				response?.data?.attributes?.selfie?.data?.attributes?.formats?.medium
					?.url;
			setTsw(tsw);
			setTswText(tswText);
			setWelcome(welcome);
			setWelcomeText(welcomeText);
			setHhch(hhch);
			setHhchText(hhchText);
			setSelfie(selfie);
			setAbout(about);
			setAboutText(aboutText);
		});
	}, []);

	return (
		<main className="container">
			<section className="welcome">
				<h1>{welcome}</h1>
				<p>{welcomeText}</p>
			</section>
			<section className="hhch">
				<h1>{hhch}</h1>
				<p>{hhchText}</p>
			</section>
			<section className="tsw">
				<h1>{tsw}</h1>
				<p>{tswText}</p>
			</section>
			<section className="about">
				<h1>{about}</h1>
				<p>{aboutText}</p>
			</section>
			<Image
				className="selfie bsp"
				src={selfie}
				alt="Una selfie"
				width={300}
				height={300}
			/>
		</main>
	);
}

export default HomeComponent;
