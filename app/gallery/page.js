import "./gallery.css";
import ErrorToast from "@/components/ErrorToast";
import Image from "next/image";
import MyGallery from "@/components/MyGallery";

export const metadata = {
	title: "Galería de Imágenes",
	description: "Podemos sentirnos mejor, Cada Día!",
};

const getData = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/gallery?populate=*`, {
			next: { tags: ["mi-etiqueta-de-cache"] },
		});

		if (!res.ok) {
			const errorData = await res.json();
			console.log(errorData.error.status)
			if(res.status === 404) errorData.error.message = "Nada aquí... Aún!"
			if(res.status === 500) errorData.error.message = "El Servidor Backend No Responde!!"
			const errorMessage = `${res.status}: ${errorData.error.message}`;
			console.log(res)
			throw new Error(errorMessage);
		}

		const { data } = await res.json();
		return data;

	} catch (error) {
		console.error(`Error getting data: ${error.message}`);
		throw error;
	}
};

async function Gallery() {
	
	let errorMsg;
	let data;

	try {
		data = await getData();
	} catch (error) {
		errorMsg = error.message;
	}
	
	const images = data?.attributes?.image?.data; 


	return (
		<main className="container-gallery">
			{(!data?.attributes?.image?.data || !data) ? (
				<div className="container-gallery-empty">
					<h1>
						"Aquí, proto podrás ver imágenes de nuestros pacientes..."
					</h1>
					<Image
						src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1697145963/Home_page_resized_373bd8b148.jpg"
						alt="imagen de homepage"
						width={2000}
						height={2000}
                        className="bsp img-gallery"
					/>
				</div>
			) : (
				<div className="gallery">
					<h1>{data?.attributes?.titulo}</h1>
					<p className="gallery-description">{data?.attributes?.descripcion}</p>
					<MyGallery images={images} />

                        
                
				</div>
			)}
			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default Gallery;
