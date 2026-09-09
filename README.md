# Jobbportal

En jobbportal byggd med [Next.js](https://nextjs.org/) (App Router) och [Storyblok](https://www.storyblok.com/) som headless CMS. Examinationsuppgift — dynamisk CMS-sajt med jobbannonser, filter och sök.

## Funktioner

- `/jobs` — lista över alla lediga jobb, med toolbar för filtrering på avdelning och fritextsök
- `/jobs/[slug]` — detaljsida för en jobbannons (titel, sammanfattning, plats, avdelning, RichText-innehåll)
- Global header och footer
- Filter (`?department=...`) och sök (`?q=...`) kan kombineras, drivs helt av `<form method="get">` utan klient-JS

## Storyblok-innehållsmodell

| Content type | Fält |
|---|---|
| `job-post` | `title` (Text), `summary` (Textarea), `department` (Single Option → datasource `job-departments`), `location` (Text), `content` (RichText), `publishedAt` (Datetime) |
| `jobs-list` (Nestable) | `heading`, `subheading`, `emptyMessage` |
| `toolbar` (Nestable) | `items` (Blocks: `department-filter`, `search-bar`) |
| `department-filter` (Nestable) | `label` |
| `search-bar` (Nestable) | `placeholder` |

Datasource `job-departments` (slug) innehåller avdelningarna Kök/kok, Servering/servering, Reception/reception och Housekeeping/housekeeping.

Innehållsstruktur i Storyblok: en mapp `jobs/` med publicerade `job-post`-stories, samt en index-story (content type `page`, "Define as root for the folder") vars `body` innehåller ett `toolbar`-block och ett `jobs-list`-block. Eftersom index-storyn är mappens root hämtas den via `cdn/stories/jobs`.

## Komma igång lokalt

```sh
npm install
```

Skapa `.env` (se `.env.example`):

```sh
STORYBLOK_DELIVERY_API_TOKEN=<din token>
STORYBLOK_REGION=eu
```

```sh
npm run dev
```

I produktion (`NODE_ENV=production`) hämtas endast publicerat innehåll (`version: "published"`); lokalt används draft-versionen.

## Driftsättning

Deployas på [Vercel](https://vercel.com/). `STORYBLOK_DELIVERY_API_TOKEN` (och ev. `STORYBLOK_REGION`) sätts som miljövariabler i Vercel-projektets inställningar.
