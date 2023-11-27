import Image from "next/image";
import Link from "next/link";
import "./homeopathy.css"
import ErrorToast from "@/components/ErrorToast";
import Markdown from "@/utils/Markdown";

export const metadata = {
    title: "Homeopathy",
    description: "What is Homeopathy?",
}

const getHomeopathy = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/homeopathy?populate=*`, {
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

async function Homeopathy() {
	let errorMsg;
	let data;

	try {
		data = await getHomeopathy();
	} catch (error) {
		errorMsg = error.message;
	}

	const whatIsHomeopathy = data?.attributes?.whatIsHomeopathy;
	const whatIsHomeopathyText = data?.attributes?.whatIsHomeopathyText;
	const whenUseHomeopathy = data?.attributes?.whenUseHomeopathy;
	const whenUseHomeopathyText = data?.attributes?.whenUseHomeopathyText;
	const image = data?.attributes?.image?.data?.attributes?.url;


	return (
		<main className="container-h">

			
                <section className="what-is-h">
                    <h1>{whatIsHomeopathy}</h1>
                    <Markdown text={whatIsHomeopathyText}/>
                </section>
                
                <Image
                    className="image-h bsp"
                    src={image}
                    alt="Home Page image"
                    width={2000}
                    height={2000}
                />
    
			<section className="when-use-h">
				<h1>{whenUseHomeopathy}</h1>
				<Markdown text={whenUseHomeopathyText}/>
				<Link className="link-button" href="/blog">
					For more information, visit my Blog 
				</Link>
			</section>

			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default Homeopathy;
