import styles from '@/styles/not-found.module.scss';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className={`${styles.notFound} container`}>
            <h1 className={styles.main}>404</h1>
            <h2 className={styles.title}>Page Not Found</h2>
            <p className={styles.subtitle}>🤔 Now how did you find your way here? 🤔</p>
            <Link href="/" className={styles.link}>
                Go Home
            </Link>
        </div>
    );
}
