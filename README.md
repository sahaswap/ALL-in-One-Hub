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
    pages/            Home and Contact page body HTML fragments
    web-files/        Theme CSS, CSV, and SVG files to upload as Web Files
    web-templates/    Shared layout header and footer templates
  docs/               Deployment and data setup guides
```

## Important files

```text
power-pages/web-files/theme.css
power-pages/web-files/guidance-changes.csv
power-pages/web-templates/layout-header.html
power-pages/web-templates/layout-footer.html
```

## Power Pages deployment summary

Deploy only this folder:

```text
power-pages/
```

High-level order:

1. Upload every file in `power-pages/web-files/` as a Power Pages Web File, or paste `theme.css` into the portal `theme.css` file if that is the working styling path in the client tenant.
2. Add `layout-header.html` and `layout-footer.html` as shared layout templates or paste into the master layout. The footer contains inline JavaScript, so no separate `.js` Web Files are required.
3. Paste `power-pages/pages/home.html` into the Home page body.
4. Paste `power-pages/pages/contact.html` into the Contact us page body.
5. Keep Guidance, Process Library, Documents, Ownership, and Meet the Team as Home page scroll sections, not separate Power Pages pages.
6. Clear Power Pages cache.
7. Test all routes, anchors, and static files.

For exact instructions, read:

```text
docs/POWER-PAGES-DEPLOYMENT.md
```

## vscode.dev workflow

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

The footer template contains inline JavaScript for shared site search, user welcome text, guidance calendar behavior, and specialized Org / POD search.

Search intentionally does not visually highlight page sections or add red outlines.

## Client deployment checklist

- Confirm all Web Files return 200, not 404.
- Confirm `/guidance-changes.csv` loads for intended users.
- Confirm Home scroll anchors work for `/#guidance`, `/#resources`, `/#documents`, `/#org`, and `/#meet-team`.
- Confirm `/contact` works as the only separate content page.
- Confirm global search works from normal search boxes.
- Confirm Org POD search works separately.
- Confirm browser console has no missing CSS/CSV/SVG files.
- Clear Power Pages cache after every web file update.
