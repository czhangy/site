require('dotenv').config({ path: '.env.local' });

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'https://example.com/callback';

// 1. Visit this URL in your browser:
const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-recently-played`;

console.log('Visit this URL:', authUrl);
console.log('After authorizing, copy the "code" parameter from the callback URL');

// 2. After getting the code, run this function:
async function getRefreshToken(authCode) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: REDIRECT_URI,
        }),
    });

    const data = await response.json();
    console.log('Save this refresh token to your .env.local:', data.refresh_token);
    return data;
}

getRefreshToken(
    'AQAjb0j57koKF8TaLWkdm_LEU8jJVy3w8XTbMLq0kYJgSGdfa_WZZ6_hEDc7y9kxEkn104-gLeuCljsyZj3jrWZhTqFYAB6wnsM7Y9eZAQzAR7r8djZ47rZJn4UXszGNz1pdv3MTB0vWAewMzVGpIxUp8eeR0c-t-kHrxmP8fPEd5e8u60jgelM8GQb3HRCRAELp3CmwCGtHuvw'
);
