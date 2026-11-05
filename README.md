# SpectraCare

Mobile app using the Presage SmartSpectra SDK.

## Spectra — SDK Field Lab

Mobile-first Hungarian SmartSpectra documentation and experiment PWA, inspired by Péter Vívó's warm dark mindmap palette. Built with real TS `|>` syntax compiled by `@pengeszikra/typescript@7.1.0-pipeline.1`, and Tailwind CSS 4.

## Run and build

Node 22.18+ for the pipeline compiler.

```sh
npm ci
npm run build
npm test
npx http-server dist -p 8080
```

Use localhost for desktop camera testing, or HTTPS on phones. The service worker caches the application shell after the first successful visit. Native SDK measurements require network connectivity and the bridge. Private hosting authentication may require an online sign-in before offline use can be established.

## What works

- Searchable Hungarian SDK documentation, expandable examples, copy buttons and official source links.
- Clearly labeled generated signal demo, adjustable breathing rhythm, 12/30/60 second warm-up windows.
- Local camera preview (no measurements, no uploads).
- Actual SmartSpectra Node SDK bridge using `useCustomInput`, `sendFrame`, `decodeMetrics`, validation and error events. The browser streams 640×480 JPEGs; bridge decodes RGB and returns pulse, breathing, HRV and a normalized breathing trace.
- Explicit camera/upload consent, stop on navigation/background, explicit save, JSON export and deletion of local summaries.
- PWA manifest, icons and offline shell.

## Real SDK setup

```sh
cd bridge
npm ci
PRESAGE_API_KEY=your_key BRIDGE_TOKEN=your_random_token_at_least_16_chars ALLOWED_ORIGIN=https://your-app-origin npm start
```

Do not commit credentials. Presage API key remains server-side. Default listen: `127.0.0.1:8787`. Use a trusted TLS reverse proxy or tunnel for mobile WSS; point it to that port with WebSocket upgrades enabled. Set `ALLOWED_ORIGIN` to the exact app origin, no trailing slash. The PWA connection screen takes the WSS address and bridge token, retaining both in memory only. Never expose the raw HTTP/WS service publicly. Only one SDK session is permitted at a time because SDK native state is process-global.

For local desktop testing, `ws://localhost:8787` is accepted only from an HTTP localhost app. Camera measurement needs sustained ~30 fps; JPEG encoding, network and decoding overhead may lower this. Watch SDK validation feedback; do not interpret low-quality results.

## Scope and limitations

This is a POC, not a medical product. No diagnosis, treatment advice, actual emotion inference, face recognition or clinical use. Face analysis and LLM Insights are documented, not implemented in this POC. The demo is synthetic and clearly separated from real measurements.

The SDK package was installed, and the native library load and exported functions were checked. Real camera-to-Presage measurement was **not** validated end to end: no Presage API key or physical phone camera was available. Test the real path on the target phone with your own account before relying on it or submitting it to the challenge.

The PWA is not a standalone browser port of SmartSpectra. The native bridge must run separately on a supported machine. An Android SDK wrapper would be a separate future implementation.

## Privacy

Camera preview stays in the browser. Native mode transmits camera frames to the configured bridge only after consent. The bridge does not persist frames, disables SDK telemetry and makes no explicit LLM requests. Presage SDK network processing/authentication is subject to the vendor's policies. User-saved summaries remain in localStorage, limited to 50, and can be deleted or explicitly exported. No analytics are included.

## Official sources

- https://smartspectra.presagetech.com/docs/
- https://smartspectra.presagetech.com/docs/nodejs
- https://smartspectra.presagetech.com/docs/nodejs/api-reference
- https://smartspectra.presagetech.com/docs/nodejs/metrics
- https://smartspectra.presagetech.com/docs/measurement-quality/
- https://smartspectra.presagetech.com/docs/model-cards-and-limitations/
- https://smartspectra.presagetech.com/docs/telemetry-and-privacy

Documentation checked 2026-11-05. Native SDK pinned at 3.4.0. No SDK binaries are redistributed in the frontend.
