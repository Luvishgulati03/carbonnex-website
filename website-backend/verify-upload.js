const fs = require('fs');
const path = require('path');
const axios = require('axios'); // need to install axios or use fetch (node 18+)
const FormData = require('form-data'); // need to install form-data

// User provided file path
const PDF_PATH = 'c:\\Users\\Luvish\\OneDrive\\Desktop\\carbonnex-website\\CarbonNex – Services Overview.pdf';
const API_URL = 'http://localhost:5000/api';

async function verifyUpload() {
    try {
        // 1. Login to get token
        console.log('Logging in as admin...');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@carbonnex.com', password: 'admin' })
        });

        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.statusText}`);
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Login successful.');

        // 2. Prepare FormData
        if (!fs.existsSync(PDF_PATH)) {
            throw new Error(`File not found at ${PDF_PATH}`);
        }

        const form = new FormData();
        form.append('title', 'CarbonNex Services Overview');
        form.append('summary', 'Detailed overview of our ESG and Carbon services.');
        form.append('type', 'whitepaper');
        form.append('access_level', 'public');
        form.append('file', fs.createReadStream(PDF_PATH));

        // 3. Upload File
        console.log('Uploading file...');
        // We use axios here because node-fetch + form-data interaction can be tricky with headers
        const uploadRes = await axios.post(`${API_URL}/resources`, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Upload successful!');
        console.log('Resource ID:', uploadRes.data.id);
        console.log('File Path:', uploadRes.data.file_path);

        return uploadRes.data;

    } catch (err) {
        console.error('Verification failed:', err.response ? err.response.data : err.message);
        process.exit(1);
    }
}

verifyUpload();
