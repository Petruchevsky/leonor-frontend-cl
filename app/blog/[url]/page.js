import Image from "next/image";
import './post.css'
import Markdown from "@/utils/Markdown";

export const metadata = {
	title: "Blog",
	description: "Bienvenido(a) a mi Blog!",
};

async function getPost(url) {
	try {
		const res = await fetch(
			`${process.env.STRAPI}/api/blog-esp?filters[url]=${url}&populate=image`, {
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
		console.error(error.message);
		throw error;
	}
}

async function Post({ params }) {
	const { url } = params;
	const data = await getPost(url);
	const { title, image, post, createdAt } = data[0].attributes;
	const date = new Date(createdAt);

	const options = {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	const formatDate = date.toLocaleDateString("es-CL", options) + " hrs.";

	return (

            <main className="post-container">
                <h1>{title}</h1>
                <p>Creado por Leonor Berdichevsky</p>
                <Image
                    src={image.data.attributes.url}
                    alt={`imagen de ${image.data.attributes.name}`}
                    width={2000}
                    height={2000}
                />
                <p>{formatDate}</p>
                <Markdown text={post}/>
            </main>

	);
}

export default Post;
