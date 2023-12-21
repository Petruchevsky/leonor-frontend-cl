import ErrorToast from "@/components/ErrorToast";
import Link from "next/link";
import "./tcs.css"
import Markdown from "@/utils/Markdown";

export const metadata = {
	title: "T&C's",
	description: "Términos y Condiciones",
};

const getData = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/terms-and-conditions-es?`, {
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

async function Terms() {

    let errorMsg;
	let data;

	try {
		data = await getData();
	} catch (error) {
		errorMsg = error.message;
	}

	const tcs = data?.attributes?.tcs;
	const tcsText = data?.attributes?.tcsText;

  return (
    <main className="container-tcs">
        <h1>{tcs}</h1>
        <Markdown text={tcsText} />
        <Link className="link-button" href="/contact">Contáctame!</Link>
      <ErrorToast errorMsg={errorMsg} />
    </main>
  )
}

export default Terms
