'use client';

import GlowBorder from '@/components/GlowBorder/GlowBorder';
import MobileMenu from '@/components/MobileMenu/MobileMenu';
import { isActiveRoute } from '@/utils/helpers';
import { LinkItem } from '@/utils/interfaces';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
    // Constants
    const LINK_ITEMS: LinkItem[] = [
        { display: 'Home', href: '/' },
        { display: 'Projects', href: '/projects' },
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
                    {LINK_ITEMS.map((item: LinkItem) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`${styles.navLink} ${isActiveRoute(pathname, item.href) ? styles.active : ''}`}
                            >
                                {item.display}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Navigation */}
                <MobileMenu
                    open={isMenuOpen}
                    items={LINK_ITEMS}
                    onToggle={toggleMenu}
                    onClose={closeMenu}
                />
            </div>

            {/* Animated Border */}
            <GlowBorder top={false} />
        </nav>
    );
};

export default Navbar;
