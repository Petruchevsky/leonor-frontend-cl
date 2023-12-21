import "./blog.css";
import ErrorToast from "@/components/ErrorToast";
import Markdown from "@/utils/Markdown";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
	title: "Blog",
	description: "Welcome to my Blog!",
};

const getData = async () => {

	try {
		const res = await fetch(`${process.env.STRAPI}/api/blog-esp?populate=*`, {
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

async function Blog() {

	let errorMsg;
	let data;

	function formatDate(isoDate) {
		const date = new Date(isoDate);
		const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
		return `${days[date.getUTCDay()]} ${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
	  }	  

	try {
		data = await getData();
	} catch (error) {
		errorMsg = error.message;
	}

	return (
		<main className="container-blog">
			{!data.length ? (
				<div>
					<h1>
						"Aquí, Pronto podrás ver mis entradas de Blog..."
					</h1>
					<Image
						src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1697145963/Home_page_resized_373bd8b148.jpg"
						alt="imagen de homepage"
						width={2000}
						height={2000}
                        className="img-blog"
					/>
				</div>
			) : (
				<div className="blog">
					<h1>Blog</h1>
					<p>"Aquí puedes ver diferentes artículos para entender mejor el alcance de mi tratamiento..."</p>
                    <section>
                        {data?.map(post=>(
                            <article className="post">
                                <Image src={post?.attributes?.image?.data?.attributes?.url} alt={`imagen de ${post?.attributes?.title}`} width={2000} height={2000} />
                                <div className="post-text">
                                    <h1>{post?.attributes?.title}</h1>
                                    <p>Created by Leonor Berdichevsky</p>
                                    <p>{formatDate(post?.attributes?.createdAt)}</p>
                                    <Markdown text={post?.attributes?.post.substring(0, 300) + '...'} />
                                    <Link href={`/blog/${post?.attributes?.url}`} className="link-button">Read The Full Post</Link>
                                </div>
                            </article>
                        ))}
                    </section>
                
				</div>
			)}
			<ErrorToast errorMsg={errorMsg} />
		</main>
	);
}

export default Blog;
