import { LINK_ITEMS } from '@/utils/constants';
import { LinkItem } from '@/utils/interfaces';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
    open: boolean;
    onToggle: () => void;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = props => {
    // Hooks
    const pathname = usePathname();

    // Helpers
    const isActiveRoute = (pathname: string, href: string): boolean => {
        return pathname === href;
    };

    // JSX
    return (
        <div className={styles.mobileMenu}>
            {/* Menu Button */}
            <button
                className={`${styles.mobileMenuBtn} ${props.open ? styles.open : ''}`}
                onClick={props.onToggle}
                aria-label="Toggle navigation menu"
            >
                <span className={`${styles.hamburger} ${props.open ? styles.open : ''}`}></span>
                <span className={`${styles.hamburger} ${props.open ? styles.open : ''}`}></span>
                <span className={`${styles.hamburger} ${props.open ? styles.open : ''}`}></span>
            </button>

            {/* Navigation */}
            <div className={`${styles.mobileMenu} ${props.open ? styles.open : ''}`}>
                <ul className={styles.mobileNavLinks}>
                    {LINK_ITEMS.map((item: LinkItem) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`${styles.mobileNavLink} ${isActiveRoute(pathname, item.href) ? styles.active : ''}`}
                                onClick={props.onClose}
                            >
                                {item.display}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Menu Overlay */}
            {props.open && <div className={styles.overlay} onClick={props.onClose}></div>}
        </div>
    );
};

export default MobileMenu;
