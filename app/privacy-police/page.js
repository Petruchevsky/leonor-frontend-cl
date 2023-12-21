import "./privacy-police.css"
import ErrorToast from "@/components/ErrorToast";
import Link from "next/link";
import Markdown from "@/utils/Markdown";

export const metadata = {
	title: "Póliza de Privacidad",
	description: "Tu Privacidad es muy importante para mí.",
};

const getData = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/privacy-policy-es`, {
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

async function PrivacyPolice() {

    let errorMsg;
	let data;

	try {
		data = await getData();
	} catch (error) {
		errorMsg = error.message;
	}

	const privacyPolice = data?.attributes?.privacyPolice;
	const privacyPoliceText = data?.attributes?.privacyPoliceText;

  return (
    <main className="container-privacy">
        <h1>{privacyPolice}</h1>
        <Markdown text={privacyPoliceText} />
        <Link className="link-button" href="/contact">Contáctame</Link>
      <ErrorToast errorMsg={errorMsg} />
    </main>
  )
}

export default PrivacyPolice