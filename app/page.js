import Image from "next/image";
import "./Home-Page.css";
import ErrorToast from "@/components/ErrorToast";
import Link from "next/link";
import Markdown from "@/utils/Markdown";

export const metadata = {
	  title: "Leonor-B Homeopath Online",
	  description: "Welcome to my Site",
  }

const getData = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/home?populate=*`, {
			next: { tags: ["mi-etiqueta-de-cache"] },
		});

		if (!res.ok) {
			const errorData = await res.json();
			const errorMessage = `Error ${res.status}: ${errorData.message}`;
			throw new Error(errorMessage);
		}

		const { data } = await res.json();
		return data;
	} catch (error) {
		console.error(`Error getting data: ${error.message}`);
		throw error;
	}
};

async function Home() {
	let errorMsg;
	let data;

	try {
		data = await getData();
	} catch (error) {
		errorMsg = error.message;
	}

	const welcome = data?.attributes?.welcome;
	const welcomeText = data?.attributes?.welcomeText;
	const hhch = data?.attributes?.hhch;
	const hhchText = data?.attributes?.hhchText;
	const about = data?.attributes?.about;
	const aboutText = data?.attributes?.aboutText;
	const selfie = data?.attributes?.selfie?.data?.attributes?.url;
	const homePageImage = data?.attributes?.homePageImage?.data?.attributes?.url;


	return (
		<main className="container-home">
			<Image
				className="image bsp"
				src={homePageImage}
				alt="Home Page image"
				width={2000}
				height={2000}
				quality={100}
			/>
			<section className="welcome">
				<h1>{welcome}</h1>
				<Markdown text={welcomeText} />
			</section>

			<section className="hhch">
				<h1>{hhch}</h1>
				<Markdown text={hhchText} />
				<Link className="link-button" href="/homeopathy">
					Learn More
				</Link>
			</section>

			<section className="about">
				<h1>{about}</h1>
				<Markdown text={aboutText} />
				<Link className="link-button" href="/consultations">
					Consultations
				</Link>
			</section>

			<Image
				className="selfie bsp"
				src={selfie}
				alt="Una selfie"
				width={2000}
				height={2000}
			/>

			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default Home;
