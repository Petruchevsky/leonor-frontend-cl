"use client";
import { useState, useEffect } from "react";
import { ImMenu3 } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { FaRegCaretSquareDown } from "react-icons/fa";
import "./Navbar.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

function Navbar() {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, SetDropdownOpen] = useState(false);

	const handleClick = () => {
		SetDropdownOpen(!dropdownOpen);
		console.log(dropdownOpen);
	};

	return (
		<nav className={`${isOpen ? 'overlay' : ''}`}>
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
						
							<span onClick={() => router.push("/")}>Consultations</span>
					</div>
						
						<ul
							className={`dropdown ${
								dropdownOpen ? "dropdown-visible" : "dropdown-hidden"
							}`}
						>
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
				</li>
				<li>
					<Link href="/">Homeopathy</Link>
				</li>
				<li>
					<Link href="/">Gut</Link>
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
