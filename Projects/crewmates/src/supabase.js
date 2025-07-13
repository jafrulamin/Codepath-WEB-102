import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mwsdwfbuzsazpxrwusmu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13c2R3ZmJ1enNhenB4cnd1c211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMTI3MzYsImV4cCI6MjA2MDU4ODczNn0.PdFNttEs3LRS_Nrx8WBuusfM4My6KQXHeDIR5YYAqDY'

export const supabase = createClient(supabaseUrl, supabaseKey)