import ErrorToast from "@/components/ErrorToast";
import Link from "next/link";
import "./consultations.css";
import Markdown from "@/utils/Markdown";

export const metadata = {
	title: "Dudas y Consultas",
	description: "Obtén más información Aquí!",
};

const getConsultations = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/consultation-es`, {
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

async function Consultations() {
	let errorMsg;
	let data;

	try {
		data = await getConsultations();
	} catch (error) {
		errorMsg = error.msg;
	}

	const consultation = data?.attributes?.consultation;
	const consultationText = data?.attributes?.consultationText;

	return (
		<main className="consultations-container">
			<h1>{consultation}</h1>
			<Markdown text={consultationText} />

			<Link
				className="link-button"
				href={`${process.env.SETMORE}`}
				target="_blank"
			>
				Reserva tu Hora{" "}
			</Link>

			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default Consultations;
