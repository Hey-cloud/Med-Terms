# MedTerms — Medical Terminology Flashcards & Quiz

A responsive single-page React app (Vite + Tailwind) for studying medical terminology using flashcards stored in Google Sheets. Includes SM-2 spaced repetition, interleaving, TTS, images, gamification, export/import, admin tools, and CI.

## Features

- Reads cards from a Google Sheets Apps Script `doGet` endpoint (JSON).
- SM-2 spaced repetition with local progress persistence.
- Interleaving study queue (mix categories).
- Study modes: Learn, Test (typed), Rapid Fire.
- TTS via Web Speech API.
- Image support (diagram via `imageUrl`).
- Mnemonics & local notes (stored locally).
- Gamification: XP, streaks, daily goals.
- Export/import (CSV/JSON) and admin utilities.
- Tests & GitHub Actions workflow.
- Deployable to Vercel.

---

## First-run checklist (8 items)
1. Create a Google Sheet and add a sheet named `cards`. Copy the header row from `sample_sheet.csv`.
2. Create a Google Apps Script project, paste `apps-script/doGet.gs`, replace `<<SHEET_ID>>`, and deploy as a Web App (Execute as: Me, Who has access: Anyone).
3. Copy the Web App URL and set `VITE_SHEET_ENDPOINT` in `.env.local` or Vercel env.
4. `npm install`
5. `npm run dev` and open http://localhost:5173
6. Open app → Admin → Import CSV (optional) to test local CSV import.
7. Run `npm test` to ensure SM-2 tests pass.
8. Deploy to Vercel and configure environment variable.

---

## Google Sheets setup

- Create a sheet named `cards`.
- First row headers (exact):  
  `id,front,back,hint,category,tags,difficulty,interval,ef,repetitions,due,imageUrl,mnemonic,notes,createdAt`
- Add rows. See `sample_sheet.csv` for 10 examples (skeletal system).
- Make sure the Apps Script `doGet` points at this sheet.

**Google Apps Script `doGet` (copy into script editor)**
```javascript
function doGet(e) {
  var ss = SpreadsheetApp.openById('<<SHEET_ID>>');
  var sheet = ss.getSheetByName('cards');
  var values = sheet.getDataRange().getValues();
  var headers = values.shift();
  var rows = values.map(function(r){
    var obj = {};
    headers.forEach(function(h,i){ obj[h]=r[i]; });
    return obj;
  });
  return ContentService.createTextOutput(JSON.stringify(rows))
      .setMimeType(ContentService.MimeType.JSON);
}
