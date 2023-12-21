import ErrorToast from "@/components/ErrorToast";
import Link from "next/link";
import "./fees.css";
import Markdown from "@/utils/Markdown";

export const metadata = {
	title: "Precios",
	description: "Sobre Precios y Cobros",
};

const getData = async () => {
	
	try {
		const res = await fetch(`${process.env.STRAPI}/api/fees-es?`, {
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
		console.error(`Error Obteniendo los Datos: ${error.message}`);
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
					<Link className="link-button" href={`${process.env.SETMORE}`} target="_blank">
						Reserva tu Hora
					</Link>
				</div>
				<div>
					<h2>{existingClient}</h2>
					<h1>£{existingClientPrice}</h1>
					<Link className="link-button" href={`${process.env.SETMORE}`} target="_blank">
						Reserva tu Hora
					</Link>
				</div>
			</section>

			<section className="questions">
				<h1>Aún tienes Dudas?</h1>
				<div>
					<p>
						Para Información general, ingresa a {" "}
						<Link className="link" href="/homeopathy">Homeopatía</Link>{" "}
						o a la sección de <Link className="link" href="/faq">Preguntas Frecuentes</Link>.
					</p>
                    <br />
					<p>
						O si estás interesado en un caso en particular, por qué no intentas buscarlo en nuestro <Link className="link" href="/blog">Blog</Link>...?
					</p>
                    <br />
					<p>
						De todas maneras si lo deseas,  <Link className="link" href="/contact">Contáctame</Link> para darte información más específica sobre tu caso.
					</p>
				</div>
			</section>

			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default page;
