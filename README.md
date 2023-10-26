This project was built from a template I built myself. This template contains setup for:
- [Remix runtime](remix.run)
- [Supabase backend-as-a-service](supabase.com)
- [Vercel deployment](vercel.com)
- [TailwindCSS styles](tailwindcss.com)

# API Design Thoughts
When considering a CRUD setup for geospatial data, here are the main things that come to mind from a design perspective:
- Clearly-defined structures for metadata, geographic information, etc. with corresponding back-end and front-end validation
- Pub-sub model for updating map data client-side without needing to reload all data
- Only loading points within the initial viewport first to ensure snappy initial page load times.