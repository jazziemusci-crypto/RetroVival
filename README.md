# Retro Vival Portal — Setup Guide

## 1. Fill in your real links

Open **config.js** and replace every `PUT_..._HERE` placeholder with your actual Google links:

- `adminDashboardUrl` — your Admin Dashboard spreadsheet link
- `orderManagementUrl` — the Order Management **tab** link (right-click the tab in Google Sheets → "Copy link to sheet")
- `formsUrl` — your Google Form link, with `?embedded=true` added to the end
- `invoices` — one entry per invoice. For each invoice's Google Sheet link, change the ending from `/edit?usp=sharing` to `/preview`

Also change `password` to whatever you want people to type to get in.

## 2. Check your Google sharing settings

For the **invoice previews** and **forms preview** to show content inside the site (instead of a "you need access" message), those specific Google files need sharing set to at least **"Anyone with the link can view."** This is a Google Sheets/Forms setting, not something this website controls.

⚠️ Important: this means anyone who gets that raw Google link directly (not through your site) could also view it. The site password only gates the *portal page* — it doesn't add protection to the underlying Google files themselves. If a file needs to stay fully private, don't add it to this portal's preview list, or keep sharing restricted to specific people only (not "anyone with the link").

## 3. Put it on GitHub Pages

1. Go to [github.com](https://github.com) and create a new repository (e.g. `retro-vival-portal`). Public is fine — the password gate still applies to visitors.
2. Upload these 4 files to the repository root: `index.html`, `style.css`, `app.js`, `config.js`
3. Go to your repo's **Settings → Pages**
4. Under "Source," choose **Deploy from a branch**, branch `main`, folder `/root` → Save
5. Wait about a minute, then GitHub will show your live URL, something like:
   `https://yourusername.github.io/retro-vival-portal/`

## 4. Updating later

Whenever you add a new invoice (RV0011, RV0012, etc.), just add one more line to the `invoices` list in `config.js` and re-upload that file to GitHub. No other changes needed.
# RetroVival
# RetroVival
