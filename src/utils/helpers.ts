import { supabase } from '@/lib/supabase';

export const fetchSingleRow = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', 1).single();

    if (error) {
        console.error('Error fetching location data', error);
    }

    return data;
};
