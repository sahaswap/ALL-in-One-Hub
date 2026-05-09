# ALL in One Hub

A clean Power Pages-ready repository for the CFSB Analyst Hub / ALL in One Hub website.

This repo was created to separate the final deployable Power Pages site from older scaffold/prototype work. It contains only the dark glass Power Pages implementation, local preview files, and deployment documentation.

## What this site is

ALL in One Hub is a browser-first Power Pages site for analysts. It centralizes:

- Guidance and updates
- Process library resources
- Document library links
- Ownership / POD structure
- Meet the Team
- Contact information
- Site-wide client-side search
- Guidance update data from CSV, with a future path to SharePoint or Dataverse

## Visual direction

The site uses the final dark glass direction:

- Dark smoky backdrop
- Compact glass navigation
- Glass cards and panels
- White hairline borders
- Red CTA buttons
- Desktop/web-first layout with basic responsiveness

## Repository structure

```text
ALL-in-One-Hub/
  power-pages/
    pages/            Page body HTML fragments for Power Pages pages
    web-files/        CSS, JavaScript, CSV, and SVG files to upload as Web Files
    web-templates/    Shared layout header and footer templates
  preview/            Local static preview only; do not deploy this folder
  docs/               Deployment and data setup guides
```

## Important files

```text
power-pages/web-files/tokens.css
power-pages/web-files/components.css
power-pages/web-files/site.js
power-pages/web-files/site-search.js
power-pages/web-files/user-welcome.js
power-pages/web-files/guidance-calendar.js
power-pages/web-files/org-structure.js
power-pages/web-files/guidance-changes.csv
power-pages/web-templates/layout-header.html
power-pages/web-templates/layout-footer.html
```

## Power Pages deployment summary

Deploy only this folder:

```text
power-pages/
```

Do not deploy:

```text
preview/
```

High-level order:

1. Upload every file in `power-pages/web-files/` as a Power Pages Web File.
2. Add `layout-header.html` and `layout-footer.html` as shared layout templates or paste into the master layout.
3. Add every file in `power-pages/pages/` to the matching Power Pages page body.
4. Clear Power Pages cache.
5. Test all routes and static files.

For exact instructions, read:

```text
docs/POWER-PAGES-DEPLOYMENT.md
```

## Local preview

If you have a real terminal:

```bash
python3 -m http.server 3000
```

Then open:

```text
http://localhost:3000/preview/
```

If you only have `vscode.dev`, use it to copy/download files and upload/paste them into Power Pages. See:

```text
docs/VSCODE-DEV-WORKFLOW.md
```

## Guidance data

The current deployment reads guidance data from:

```text
/guidance-changes.csv
```

The business-owned source can be Excel in SharePoint. Recommended production pattern:

```text
SharePoint Excel -> Power Automate -> guidance-changes.csv -> Power Pages
```

Long-term enterprise pattern:

```text
SharePoint List or Excel -> Power Automate -> Dataverse -> Power Pages
```

Details are in:

```text
docs/GUIDANCE-DATA-OPTIONS.md
```

## Search behavior

The site includes `site-search.js`, which wires all normal search forms to shared site-wide client-side search. The Org / POD search remains specialized through `org-structure.js`.

Search intentionally does not visually highlight page sections or add red outlines.

## Client deployment checklist

- Confirm all Web Files return 200, not 404.
- Confirm `/guidance-changes.csv` loads for intended users.
- Confirm Home, Guidance, Process Library, Documents, Ownership, Meet the Team, and Contact routes work.
- Confirm global search works from normal search boxes.
- Confirm Org POD search works separately.
- Confirm browser console has no missing CSS/JS/CSV/SVG files.
- Clear Power Pages cache after every web file update.
