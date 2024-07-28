import { createClient } from 'node_modules/@supabase/supabase-js/dist/module/index';
import { Database, Tables } from './database.types';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error(
    'Please define the SUPABASE_URL and SUPABASE_KEY environment variables inside .env',
  );
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

export const supabase = createClient<Database>(url, key);

export type Qso = Tables<'qso'>;
