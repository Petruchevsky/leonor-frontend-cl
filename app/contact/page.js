import Link from "next/link";
import "./contact.css";
import FormContact from "@/components/FormContact";

export const metadata = {
	title: "Contact",
	description: "Please Get in Touch!",
};

function Contact() {
	return (
		<main className="contact-container">
			<section>
				<h1>Get in Touch</h1>
				<p>You can contact me via e-mail.</p>
				<Link
					className="link-button"
					href="mailto:contact@leonorb-homeopath.uk?subject=Enquiry"
					target="_blank"
				>
					contact@leonorb-homeopath.uk
				</Link>
				<p>
					My working hours are Monday - Friday (Exc Wednesdays) from 10 am - 5 pm
					GMT.{" "}
				</p>
				<p>I will do my best to respond to you as quickly as possible.</p>
			</section>

            <section>
                <FormContact />
            </section>
		</main>
	);
}

export default Contact;
