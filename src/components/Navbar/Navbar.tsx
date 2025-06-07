"use client";

import MobileMenu from "@/components/MobileMenu/MobileMenu";
import { isActiveRoute } from "@/utils/helpers";
import { NavItem } from "@/utils/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
	// Constants
	const NAV_ITEMS: NavItem[] = [
		{ label: "Home", href: "/" },
		{ label: "Projects", href: "/projects" },
	];

	// Hooks
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Helpers
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const closeMenu = () => setIsMenuOpen(false);

	// JSX
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				{/* Logo */}
				<Link href="/" onClick={closeMenu}>
					<span className={styles.logo}>CZHANGY.IO</span>
				</Link>

				{/* Desktop Navigation */}
				<ul className={styles.navLinks}>
					{NAV_ITEMS.map((item: NavItem) => (
						<li key={item.href}>
							<Link href={item.href} className={`${styles.navLink} ${isActiveRoute(pathname, item.href) ? styles.active : ""}`}>
								{item.label}
							</Link>
						</li>
					))}
				</ul>

				{/* Mobile Navigation */}
				<MobileMenu open={isMenuOpen} items={NAV_ITEMS} onToggle={toggleMenu} onClose={closeMenu} />
			</div>
		</nav>
	);
};

export default Navbar;
