import { LINK_ITEMS } from '@/utils/constants';
import { LinkItem } from '@/utils/interfaces';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { CSSProperties } from 'react';
import styles from './DesktopNav.module.scss';

const DesktopNav: React.FC = () => {
    // Hooks
    const pathname = usePathname();

    // Helpers
    const getHrefs = (): string[] => {
        return LINK_ITEMS.map((item: LinkItem) => item.href);
    };
    const computeInlineStyle = (): CSSProperties => {
        // Idx will always be != -1 because this helper only runs on valid paths
        const idx: number = getHrefs().indexOf(pathname);
        const width: number = LINK_ITEMS[idx].width;

        // This math works as follows:
        // - We multiply the index of the item by 5.5 to account for each nav item
        //   taking up 4rem of space + 1.5rem for gap, allowing the start point of
        //   the calculation to offset itself from the left of the container
        // - We then compute the diff between 4 (the width of the nav item) and the
        //   width of the words (hardcoded in NAV_LINKS) and divide by 2 to know
        //   how much we need to offset the bar from the left of the nav item
        return { left: `${idx * 5.5 + 0.5 * (4 - width)}rem`, width: `${width}rem` };
    };

    // JSX
    return (
        <ul className={styles.desktopNav}>
            {/* Nav Items */}
            {LINK_ITEMS.map((item: LinkItem) => (
                <li key={item.href}>
                    <Link className={styles.navLink} href={item.href}>
                        {item.display}
                    </Link>
                </li>
            ))}

            {/* Highlight Bar */}
            {getHrefs().includes(pathname) ? (
                <span className={styles.highlight} style={computeInlineStyle()} />
            ) : null}
        </ul>
    );
};

export default DesktopNav;
