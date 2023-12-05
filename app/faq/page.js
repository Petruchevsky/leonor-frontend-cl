import ErrorToast from "@/components/ErrorToast";
import Link from "next/link";
import "./faq.css";
import Markdown from "@/utils/Markdown";

export const metadata = {
	title: "FAQ's",
	description: "Frecuently Asked Questions",
};

const getConsultations = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/faqs`, {
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

	return (
		<main className="faq-container">
			<h1>Frequently Asked Questions</h1>
			<section>
				{data?.map((question) => (
					<article>
						<h4>{question?.attributes?.question}</h4>
						<Markdown text={question?.attributes?.answer} />
					</article>
				))}
			</section>
			<h2>Still have unanswered questions?</h2>
			<Link className="link-button" href="/contact">
				Get in Touch
			</Link>

			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default Consultations;
