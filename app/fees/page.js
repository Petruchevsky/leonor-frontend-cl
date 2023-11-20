import ErrorToast from "@/components/ErrorToast";
import Link from "next/link";
import "./fees.css";
import Markdown from "@/utils/Markdown";

export const metadata = {
	title: "Fees",
	description: "About fees",
};

const getData = async () => {
	
	try {
		const res = await fetch(`${process.env.STRAPI}/api/fee?`, {
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

async function page() {
	let errorMsg;
	let data;

	try {
		data = await getData();
	} catch (error) {
		errorMsg = error.message;
	}

	const fees = data?.attributes?.fees;
	const feesText = data?.attributes?.feesText;
	const newClient = data?.attributes?.newClients;
	const newClientPrice = data?.attributes?.newClientsPrice;
	const existingClient = data?.attributes?.existingClients;
	const existingClientPrice = data?.attributes?.existingClientsPrice;

	return (
		<main className="container-fees">
			<section className="fees">
				<h1>{fees}</h1>
				<Markdown text={feesText}/>
			</section>

			<section className="clients">
				<div>
					<h2>{newClient}</h2>
					<h1>£{newClientPrice}</h1>
					<Link className="link-button" href="/setmore">
						Book an Appointment
					</Link>
				</div>
				<div>
					<h2>{existingClient}</h2>
					<h1>£{existingClientPrice}</h1>
					<Link className="link-button" href="/setmore">
						Book an Appointment
					</Link>
				</div>
			</section>

			<section className="questions">
				<h1>Still have questions?</h1>
				<div>
					<p>
						For general information, try the{" "}
						<Link className="link" href="/homeopathy">Homeopathy</Link>{" "}
						or <Link className="link" href="/faq">FAQ</Link> pages.
					</p>
                    <br />
					<p>
						Or if you're interested in a particular condition, why not check out
						the <Link className="link" href="/blog">Blog</Link>...?
					</p>
                    <br />
					<p>
						Otherwise feel free to <Link className="link" href="/contact">Get In Touch</Link> if
						it's something specific.
					</p>
				</div>
			</section>

			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default page;
