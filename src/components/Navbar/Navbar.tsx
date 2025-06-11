'use client';

import DesktopNav from '@/components/DesktopNav/DesktopNav';
import GlowBorder from '@/components/GlowBorder/GlowBorder';
import MobileMenu from '@/components/MobileMenu/MobileMenu';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
    // Hooks
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
                <DesktopNav />

                {/* Mobile Navigation */}
                <MobileMenu open={isMenuOpen} onToggle={toggleMenu} onClose={closeMenu} />
            </div>

            {/* Animated Border */}
            <GlowBorder reverse={false} />
        </nav>
    );
};

export default Navbar;
