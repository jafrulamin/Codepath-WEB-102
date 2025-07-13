import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://thlwktolrlfbefjohmuw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobHdrdG9scmxmYmVmam9obXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MzA2NzcsImV4cCI6MjA2MTIwNjY3N30.ISqWbfUijgslRee4SCAwT0tamYoaAJYbIGvYPXT3M8I';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);