<!-- Header -->

<div align="center">
    <img src="public/cz.png" alt="logo" width="200" height="auto" />
    <h1>czhangy.io</h1>
    <p>
        <a href="">
            <img src="https://img.shields.io/github/last-commit/czhangy/site" alt="Last update" />
        </a>
        <a href="https://github.com/czhangy/site/stargazers">
            <img src="https://img.shields.io/github/stars/czhangy/site" alt="Stars" />
        </a>
        <a href="https://github.com/czhangy/site/issues/">
            <img src="https://img.shields.io/github/issues/czhangy/site" alt="Open issues" />
        </a>
    </p>
    <h4>
        <a href="https://github.com/czhangy/site/issues">New Issue</a>
    </h4>
</div>
<br />

## Links

- [Site](https://site-phi-swart-98.vercel.app/)
- [Vercel deployments](https://vercel.com/czhangys-projects/site/deployments)

## Tech Stack

<!-- Shields.io Badges: https://github.com/Ileriayo/markdown-badges -->

<a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="NextJS" />
</a>
<a href="https://vercel.com/">
    <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</a>
<a href="https://supabase.com/">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</a>
<a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</a>
<a href="https://sass-lang.com/">
    <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="SASS" />
</a>

## Dev Environment

The following values must be populated in `.env.local` to run the web app:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_KEY`
- `SUPABASE_SECRET_KEY`
- `TWITTER_BEARER_TOKEN`
- `GOOGLE_KEY`
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

The following values may need to be populated in `.env.local` for development:

- `SPOTIFY_AUTH_CODE`

### Geocoding

```bash
# Geocodes the city and saves data to DB
npm run geocode <CITY_NAME>
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- Contact -->

## Contact

<a href="https://www.linkedin.com/in/charles-zhang-14746519b/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="https://twitter.com/czhangy_">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
</a>

<!-- Tools -->

## Tools

- [Awesome README](https://github.com/matiassingers/awesome-readme) for README template
- [Shields.io](https://shields.io/) for README icons
- [Vercel](https://vercel.com) for deployment + crons
- [X API](https://docs.x.com/x-api/introduction) for Twitter data
- [Google API](https://developers.google.com/apis-explorer) for geocoding
- [Open-Meteo](https://open-meteo.com/) for weather data
