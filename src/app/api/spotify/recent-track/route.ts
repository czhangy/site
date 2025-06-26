import { SpotifyData } from '@/utils/interfaces';

export async function GET() {
    try {
        // Get fresh access token using refresh token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(
                    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                ).toString('base64')}`,
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to refresh token');
        }

        const { access_token } = await tokenResponse.json();

        // Get recently played track
        const recentResponse = await fetch(
            'https://api.spotify.com/v1/me/player/recently-played?limit=1',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (!recentResponse.ok) {
            throw new Error('Failed to fetch recent tracks');
        }

        const data = await recentResponse.json();

        if (data.items.length === 0) {
            return Response.json({ error: 'No recent tracks found' }, { status: 404 });
        }

        const track = data.items[0].track;
        const spotifyData: SpotifyData = {
            songName: track.name,
            // eslint-disable-next-line
            artist: track.artists.map((artist: any) => artist.name).join(', '),
            albumCoverUrl: track.album.images[0]?.url || '',
            spotifyUrl: track.external_urls.spotify,
        };

        return Response.json(spotifyData);
    } catch (error) {
        console.error('Spotify API error:', error);
        return Response.json({ error: 'Failed to fetch recent track' }, { status: 500 });
    }
}
