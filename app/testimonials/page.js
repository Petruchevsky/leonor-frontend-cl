import "./testimonials.css";
import ErrorToast from "@/components/ErrorToast";
import Image from "next/image";
import MySlider from "@/components/MySlider";

export const metadata = {
	title: "Testimonios",
	description: "Mira lo que la Gente Dice!",
};

const getData = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/testimonios`, {
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

async function Testimonials() {
	let errorMsg;
	let data;

	try {
		data = await getData();
	} catch (error) {
		errorMsg = error.message;
	}

	return (
		<main className="container-testi">
			{!data.length ? (
				<div>
					<h1>
						"Aquí, pronto podrás ver los testimonios de nuestros pacientes..."
					</h1>
					<Image
						src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1701094973/testimonials_page_resized_1fd8c5304b.jpg"
						alt="imagen de homepage"
						width={2000}
						height={2000}
						className="img-testi"
					/>
				</div>
			) : (
				<div>
					<h1>Testimonios</h1>

					<Image
						src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1701094973/testimonials_page_resized_1fd8c5304b.jpg"
						alt="imagen de homepage"
						width={2000}
						height={2000}
						className="img-testi"
					/>
					<MySlider data={data} />
				</div>
			)}
			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default Testimonials;
