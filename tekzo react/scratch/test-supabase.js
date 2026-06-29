import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env manually
const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length === 2) {
    env[parts[0].trim()] = parts[1].trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

console.log('Testing connection with:');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? supabaseKey.substring(0, 15) + '...' : 'undefined');

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
  console.log('\n--- 1. Testing public.contacts query ---');
  try {
    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1);

    if (contactsError) {
      console.error('Contacts fetch failed:', contactsError);
    } else {
      console.log('Contacts fetch succeeded. Rows found:', contacts.length);
    }
  } catch (err) {
    console.error('Unexpected exception during contacts fetch:', err);
  }

  console.log('\n--- 2. Testing Auth sign-in request ---');
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@tekzo.com',
      password: 'wrongpassword'
    });

    if (authError) {
      console.log('Auth request completed. Error message returned by Supabase Auth server:');
      console.log('Code:', authError.code);
      console.log('Status:', authError.status);
      console.log('Message:', authError.message);
    } else {
      console.log('Auth login succeeded unexpectedly with wrong password! Data:', authData);
    }
  } catch (err) {
    console.error('Unexpected exception during auth request:', err);
  }
}

runTest();
