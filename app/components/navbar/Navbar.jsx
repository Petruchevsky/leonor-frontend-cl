"use client";
import { useState } from "react";
import { ImMenu3 } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import "./Navbar.css";
import Link from "next/link";
import dynamic from "next/dynamic";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav>
			<div className="burger">
				<h2>LeonorB</h2>
				<ImMenu3 />
			</div>

			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/">
						Consultations
						<ul className="dropdown">
							<li>
								<Link href="/">Fees</Link>
							</li>
							<li>
								<Link href="/">T&C's</Link>
							</li>
							<li>
								<Link href="/">Privacy Police</Link>
							</li>
						</ul>
					</Link>
				</li>
				<li>
					<Link href="/">Homeopathy</Link>
				</li>
				<li>
					<Link href="/">gut</Link>
				</li>
				<li>
					<Link href="/">Skin</Link>
				</li>
				<li>
					<Link href="/">Testimonials</Link>
				</li>
				<li>
					<Link href="/">Gallery</Link>
				</li>
				<li>
					<Link href="/">Blog</Link>
				</li>
				<li>
					<Link href="/">FAQ</Link>
				</li>
				<li>
					<Link href="/">Contact</Link>
				</li>
			</ul>
		</nav>
	);
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
