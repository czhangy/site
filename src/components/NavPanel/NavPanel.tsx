import { LinkItem } from '@/utils/interfaces';
import Link from 'next/link';
import React from 'react';
import styles from './NavPanel.module.scss';

interface NavPanelProps {
    linkItem: LinkItem;
}

const NavPanel: React.FC<NavPanelProps> = props => {
    // JSX
    return (
        <div className={styles.navPanel}>
            <div className={styles.background} />
            <Link className={styles.link} href={props.linkItem.href}>
                <span>{props.linkItem.display}</span>
            </Link>
        </div>
    );
};

export default NavPanel;
