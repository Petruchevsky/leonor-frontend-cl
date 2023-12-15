import Image from "next/image";
import "./Header.css";
import ErrorToast from "./ErrorToast";
import SearchBar from "@/utils/Meilisearch";


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

			<div className="leonorContainer">
				<div className="leonorBcontainer">
					<h3 className="leonorB">Leonor</h3>
					<h3 className="leonorB">Berdichevsky</h3>
				</div>
				<div className="HOnlineContainer">
					<h2 className="onlineHomeopath">Homeopathy</h2>
					<h2 className="onlineHomeopath">Online</h2>
				</div>
			</div>
			
			<SearchBar />

			
		</header>
	);
}

export default Header;
