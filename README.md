# ClipForge — MoneyPrinterTurbo Static Website Demo

A responsive, static frontend concept for a future short-video generation website inspired by the workflow of [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo).

**Status: frontend demo only.** This project does not run MoneyPrinterTurbo, generate real videos, call external AI APIs, upload user topics, or serve advertisements. The form creates a sample storyboard locally in the browser and can download it as a `.txt` file.

## Features

- Responsive dark creator-studio interface
- Interactive topic/platform/duration/style/narration form
- Sample storyboard generated locally in JavaScript
- Downloadable sample brief
- Privacy and terms starter templates
- No API keys, backend secrets, or external ad scripts included
- GitHub Pages compatible (static files only)

## Project structure

```text
moneyprinterturbo-static-demo/
├── index.html
├── privacy.html
├── terms.html
├── README.md
└── assets/
    ├── app.js
    ├── favicon.svg
    └── style.css
```

## Preview locally

You can open `index.html` in a browser. For a local web server, run this from the project directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new repository on GitHub, for example `clipforge-demo`.
2. Upload the contents of this project folder to the repository root. Do not upload the outer ZIP file instead of its contents.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose your default branch (usually `main`) and folder `/(root)`, then save.
6. Wait for the Pages deployment to finish. GitHub will show the published URL in the Pages settings.
7. Open the published URL and test the form, mobile layout, privacy/terms links, and sample-brief download.

If the repository is named `username.github.io`, its site is normally served at the root domain. Other repository names are normally served under `https://username.github.io/repository-name/`. Use relative links in this project so it works in either case.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages

## To connect real video generation later

GitHub Pages cannot run the Python backend. A production setup needs a separately hosted backend that runs MoneyPrinterTurbo and exposes a secure API.

Suggested architecture:

```text
Browser website (GitHub Pages)
        |
        | HTTPS request; no private credentials in browser
        v
Your backend/API (separately hosted)
        |
        v
MoneyPrinterTurbo service
        |
        v
Job status + secure video download URL
```

Recommended next steps:

1. Deploy MoneyPrinterTurbo using its official instructions: https://github.com/harry0703/MoneyPrinterTurbo
2. Keep API credentials and service secrets on the backend, never in `assets/app.js` or other browser files.
3. Add server-side authentication, request validation, rate limits, job queues, storage limits, error handling, and cost controls.
4. Have the frontend submit a job to your backend, poll a job-status endpoint, and show a secure download link when the job completes.
5. Do not let arbitrary visitors directly access an unrestricted generation endpoint; that can create unexpected service bills.
6. Review the upstream license and any third-party media, model, AI, voice, and music terms before commercial use.

## Advertising / AdSense

No ad code is included. Do not add advertising scripts until you have reviewed the ad network's current rules and your site is eligible.

For Google AdSense, you will generally need to:
1. Own or control the site and submit it for review.
2. Add the publisher-provided code only after following Google's setup instructions.
3. Publish a truthful privacy policy that reflects your real data and advertising practices.
4. Follow applicable consent and privacy requirements for your audience.
5. Avoid deceptive ad placement, invalid clicks, or making ads appear to be part of the video-generation controls.

Approval and earnings are not guaranteed. Ad revenue depends on actual traffic, geography, ad demand, user experience, and policy compliance. A static demo with little original content may not be sufficient for approval on its own.

Google AdSense help: https://support.google.com/adsense/

## Legal and branding notes

- This is an independent frontend demo, not an official MoneyPrinterTurbo interface.
- Review and preserve required notices when using or adapting upstream code. This project contains original frontend demo files and does not copy the upstream Python application.
- The privacy and terms pages are starter templates, not legal advice. Replace their placeholders and verify they accurately describe your actual service before launch.
- Add your real contact details before a commercial launch.

## License

The original frontend files in this demo are provided under the MIT License below. This statement applies to this demo's original files, not to third-party services or any separate upstream project.

MIT License

Copyright (c) 2026 ClipForge Demo contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
