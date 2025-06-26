import { supabase } from '@/lib/supabase';

export const fetchSingleRow = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', 1).single();

    if (error) {
        console.error('Error fetching location data', error);
    }

    return data;
};

export const maybeFetchFromLocalStorage = (cacheKey: string) => {
    const cacheString: string | null = localStorage.getItem(cacheKey);

    if (cacheString) {
        const cacheData = JSON.parse(cacheString);

        // Check if cached data is expired
        if (cacheData.expiry && new Date() <= new Date(cacheData.expiry)) {
            return cacheData;
        } else {
            // Clear cache if expired
            localStorage.removeItem(cacheKey);
        }
    }

    // If key not in local storage, or key is expired. return null (not found)
    return null;
};

export const cacheToLocalStorage = (data: object, cacheKey: string, expiryMins?: number | null) => {
    let cacheData;
    if (expiryMins) {
        const now = new Date();
        const expiry = new Date(now.getTime() + 60 * 60 * 1000);
        cacheData = { ...data, expiry: expiry };
    } else {
        cacheData = { ...data };
    }

    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
};
