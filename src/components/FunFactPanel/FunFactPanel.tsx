'use client';

import { supabase } from '@/lib/supabase';
import React, { useEffect, useState } from 'react';
import LoadingSymbol from '../LoadingSymbol/LoadingSymbol';
import styles from './FunFactPanel.module.scss';

const FunFactPanel: React.FC = () => {
    // Constants
    const CACHE_KEY = 'funFactHistory';
    const HISTORY_LIMIT = 10;

    // Hooks
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [funFact, setFunFact] = useState<string>('');
    useEffect(() => {
        const generateRandomFunFact = (data: string[]) => {
            // Fetch from local storage
            const cacheString: string | null = localStorage.getItem(CACHE_KEY);
            const funFactHistory: string[] = cacheString ? JSON.parse(cacheString) : [];

            // Randomize fun fact until it's one that wasn't used recently
            let funFact: string;
            do {
                funFact = data[Math.floor(Math.random() * data.length)];
            } while (funFactHistory.includes(funFact));

            // Remove overflow if needed
            if (funFactHistory.length === HISTORY_LIMIT) {
                funFactHistory.shift();
            }
            funFactHistory.push(funFact);

            // Write to local storage
            localStorage.setItem(CACHE_KEY, JSON.stringify(funFactHistory));
            setFunFact(funFact);
        };

        const determineFunFact = (data: string[]) => {
            // Date in MM-DD format
            const today: string = new Date().toISOString().slice(5, 10);

            if (today === '12-31') {
                // Birthday fact
                setFunFact(data[0]);
            } else if (today === '02-14' || today === '04/04') {
                // Vicky fact
                setFunFact(data[1]);
            } else {
                generateRandomFunFact(data);
            }
        };

        const fetchFunFact = async () => {
            setIsLoading(true);

            // Read access is public on the Tweet table
            const { data, error } = await supabase.from('fun_facts').select('fact').order('id');

            if (data) {
                determineFunFact(data.map(obj => obj.fact));
            } else {
                console.error(error);
                setFunFact('My code is broken.');
            }

            setIsLoading(false);
        };

        fetchFunFact();
    }, []);

    // JSX
    if (isLoading) {
        return <LoadingSymbol />;
    } else {
        return (
            <div className={styles.funFactPanel}>
                <p className={styles.text}>
                    <strong>Fun Fact: </strong>
                    {funFact}
                </p>
            </div>
        );
    }
};

export default FunFactPanel;
