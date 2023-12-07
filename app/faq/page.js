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
		const res = await fetch(`${process.env.STRAPI}/api/faqs?_sort=id:asc`, {
			next: { tags: ["mi-etiqueta-de-cache"] },
		});

		if (!res.ok) {
			const errorData = await res.json();

			if(errorData.error.status === 404) errorData.message = "No data found";
			if(errorData.error.status === 500) errorData.message = "Internal Backend Server Error";

			const errorMessage = `Error ${res.status}: ${errorData.message}`;
			throw new Error(errorMessage);
		}

		const { data } = await res.json();
		data.sort((a, b) => a.id - b.id);
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
