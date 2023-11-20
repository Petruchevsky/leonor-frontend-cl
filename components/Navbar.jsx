"use client";
import { useState, useEffect } from "react";
import { ImMenu3 } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { FaRegCaretSquareDown } from "react-icons/fa";
import "./Navbar.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function Navbar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, SetDropdownOpen] = useState(false);

	const handleClick = () => {
		SetDropdownOpen(!dropdownOpen);
		console.log(dropdownOpen);
	};

	useEffect(() => {
		SetDropdownOpen(false)
		setIsOpen(false); // Cerrar el menú cuando cambie la ruta
	}, [pathname, searchParams]);

	return (
		<nav className={`${isOpen ? "overlay" : ""}`}>
			<div className="mobileNav">
				<ImMenu3 className="burger" onClick={() => setIsOpen(!isOpen)} />
				<h2 className="onlineHomeo">Online Homeopath</h2>
			</div>
			<ul className={`menu ${isOpen ? "showMenu" : "hideMenu"}`}>
				<li>
					<Link href="/">Home</Link>
				</li>

				<li className="flex-col relative">
					<div className="flex">
						<FaRegCaretSquareDown
							className={`dropdownButton`}
							onClick={handleClick}
						/>

						<span onClick={() => router.push("/consultations")}>
							Consultations
						</span>
					</div>

					<ul
						className={`dropdown ${
							dropdownOpen ? "dropdown-visible" : "dropdown-hidden"
						}`}
					>
						<li>
							<Link href="/fees">Fees</Link>
						</li>
						<li>
							<Link href="/terms-and-conditions">T&C's</Link>
						</li>
						<li>
							<Link href="/privacy-police">Privacy Police</Link>
						</li>
					</ul>
				</li>
				<li>
					<Link href="/homeopathy">Homeopathy</Link>
				</li>
				<li>
					<Link href="/testimonials">Testimonials</Link>
				</li>
				<li>
					<Link href="/gallery">Gallery</Link>
				</li>
				<li>
					<Link href="/blog">Blog</Link>
				</li>
				<li>
					<Link href="/faq">FAQ</Link>
				</li>
				<li>
					<Link href="/contact">Contact</Link>
				</li>
			</ul>
		</nav>
	);
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
