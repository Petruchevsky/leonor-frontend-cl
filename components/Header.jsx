import Image from "next/image";
import "./Header.css";
import ErrorToast from "./ErrorToast";

const getHeader = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/home?populate=*`, {
			next: { tags: ["mi-etiqueta-de-cache"] },
		});
		if (!res.ok) {
			const errorData = await res.json();
			const errorMessage = `Error: ${res.status}: ${errorData.message}`;
			throw new Error(errorMessage);
		}

		const { data } = await res.json();
		return data;
	} catch (error) {
		console.error(`Error getting data: ${error}`);
		throw error;
	}
};

async function Header() {
	let data;
	let errorMsg;

	try {
		data = await getHeader();
	} catch (error) {
		errorMsg = error.message;
	}

	const logoUrl =
		data?.attributes?.logo?.data?.attributes?.formats?.medium?.url;

	return (
		<header>
			<ErrorToast errorMsg={errorMsg} />
			{logoUrl ? (
				<Image
					src={logoUrl}
					width={300}
					height={300}
					alt="logo de leonor b"
					className="logo"
				/>
			) : (
				<p>No se pudo cargar el logo</p>
			)}

			<div className="lonorBcontainer">
				<h3 className="leonorB">LeonorB.</h3>
				<h2 className="onlineHomeopath">Online Homeopath</h2>
			</div>

			<form action="/search" method="get" className="search">
				<input
					type="text"
					size={24}
					id="search"
					name="q"
					placeholder="What are you looking for...?"
				/>
				<input type="submit" value="Go" />
			</form>
		</header>
	);
}

export default Header;
