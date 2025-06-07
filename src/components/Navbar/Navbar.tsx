"use client"; // This directive makes it a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import styles from "./Navbar.module.scss";

interface NavItem {
	label: string;
	href: string;
}

const Navbar: React.FC = () => {
	const pathname = usePathname();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navItems: NavItem[] = [
		{ label: "Home", href: "/" },
		{ label: "Projects", href: "/projects" },
	];

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const isActiveRoute = (pathname: string, href: string): boolean => {
		return pathname === href;
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				{/* Logo */}
				<Link href="/" className={styles.logo} onClick={closeMenu}>
					<span className={styles.logoText}>Charles Zhang</span>
				</Link>

				{/* Desktop Navigation */}
				<ul className={styles.navLinks}>
					{navItems.map((item) => (
						<li key={item.href}>
							<Link href={item.href} className={`${styles.navLink} ${isActiveRoute(item.href) ? styles.active : ""}`}>
								{item.label}
							</Link>
						</li>
					))}
				</ul>

				{/* Mobile Menu Button */}
				<button className={`${styles.mobileMenuBtn} ${isMenuOpen ? styles.open : ""}`} onClick={toggleMenu} aria-label="Toggle navigation menu">
					<span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}></span>
					<span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}></span>
					<span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}></span>
				</button>

				{/* Mobile Navigation */}
				<div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
					<ul className={styles.mobileNavLinks}>
						{navItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className={`${styles.mobileNavLink} ${isActiveRoute(pathname, item.href) ? styles.active : ""}`}
									onClick={closeMenu}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Mobile Menu Overlay */}
				{isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
			</div>
		</nav>
	);
};

export default Navbar;
