import ErrorToast from "@/components/ErrorToast";
import Link from "next/link";
import "./faq.css";
import Markdown from "@/utils/Markdown";

export const metadata = {
	title: "FAQ's",
	description: "Preguntas Frecuentes",
};

const getConsultations = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/faq-es?_sort=id:asc`, {
			next: { tags: ["mi-etiqueta-de-cache"] },
		});

		if (!res.ok) {
			const errorData = await res.json();

			if(errorData.error.status === 404) errorData.message = "Datos no Encontrados";
			if(errorData.error.status === 500) errorData.message = "Error interno del Servidor Backend";

			const errorMessage = `Error ${res.status}: ${errorData.message}`;
			throw new Error(errorMessage);
		}

		const { data } = await res.json();
		data.sort((a, b) => a.id - b.id);
		return data;
	} catch (error) {
		console.error(`Error Obteniendo los Datos: ${error.message}`);
		throw error;
	}
};

async function Consultations() {
	let errorMsg;
	let data;

	try {
		data = await getConsultations();
	} catch (error) {
		errorMsg = error.msg;
	}

	return (
		<main className="faq-container">
			<h1>Preguntas Frecuentes</h1>
			<section>
				{data?.map((question) => (
					<article>
						<h4>{question?.attributes?.question}</h4>
						<Markdown text={question?.attributes?.answer} />
					</article>
				))}
			</section>
			<h2>No dudes en comunicarte si tienes más preguntas que no se hayan abordado aquí.</h2>
			<Link className="link-button" href="/contact">
				Contáctame
			</Link>

			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default Consultations;
