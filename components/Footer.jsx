import Image from "next/image";
import Link from "next/link";
import "./Footer.css";
import ErrorToast from "./ErrorToast";

const getFooter = async () => {
	try {
		const res = await fetch(`${process.env.STRAPI}/api/home-es?populate=*`, {
			next: { tags: ["mi-etiqueta-de-cache"] },
		});
		if (!res.ok) {
			const errorData = await res.json();
			const errorMessage = `Error ${res.status}: ${errorData.Message}`;
			throw new Error(errorMessage);
		}

		const { data } = await res.json();
		return data;
	} catch (error) {
		console.error(`Error getting data: ${error}`);
	}
};

async function Footer() {
	let data;
	let errorMsg;

	try {
		data = await getFooter();
	} catch (error) {
		errorMsg = error.message;
	}

	const logoUrl =
		data?.attributes?.logo?.data?.attributes?.formats?.medium?.url;

	return (
		<footer>
			<div className="container-footer">
				<ErrorToast errorMsg={errorMsg} />
				<Link
					href={`${process.env.SETMORE}`}
					target="_blank"
					className="book-footer"
				>
					<h2 className="book-footer">
						<span>Reserva</span> Tu Hora Hoy Mismo!
					</h2>
				</Link>

				<section>
					<Image
						src={logoUrl}
						width={300}
						height={300}
						alt="logo de leonor b"
						className="logo-footer"
					/>

					<div className="leonorContainerFooter">
						<div className="leonorBcontainerFooter">
							<h3 className="leonorBFooter">Leonor</h3>
							<h3 className="leonorBFooter">Berdichevsky</h3>
						</div>
						<div className="HOnlineContainerFooter">
							<h2 className="onlineHomeopathFooter">Homeopatía</h2>
							<h2 className="onlineHomeopathFooter">Online</h2>
						</div>
					</div>

					<div className="RRSS-container">
						<div className="icons-container">
							<Link
								href="https://m.facebook.com/Homeopathyenergymedicine"
								target="blank"
							>
								{" "}
								<Image
									src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1696641806/facebook_35e0a56122.png"
									width={50}
									height={50}
									alt="icono de facebook"
									className="icon-f"
								/>
							</Link>
							<Link href="/">
								{" "}
								<Image
									src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1696188039/thumbnail_insta_3f71c96df3.png"
									width={50}
									height={50}
									alt="icon de instagram"
									className="icon-i"
								/>
							</Link>
						</div>
					</div>
				</section>
			</div>
			<div className="developedBy">
				<Link href="https://www.moises-web.cl/">Desarrollado por Moisés Web</Link>
				<Link href="/">Leonor Berdichevsky &copy;</Link>
				<Link href="/privacy-police">Póliza de Privacidad</Link>
			</div>
		</footer>
	);
}

export default Footer;
