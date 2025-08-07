import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xsbnptuqoreumobxgyxc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzYm5wdHVxb3JldW1vYnhneXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzU4MDcsImV4cCI6MjA2ODk1MTgwN30.4oiITrzivJ96-msgDG3hMN2-Y9sJa9CzAMULhXjXxNg';

export const supabase = createClient(supabaseUrl, supabaseKey);