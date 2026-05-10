# Power Pages Deployment Guide

Use this guide when starting from a blank Power Pages site or replacing an existing site with ALL in One Hub.

## 1. Create or open the Power Pages site

1. Go to `https://make.powerpages.microsoft.com`.
2. Select the correct client environment.
3. Create a blank site or open the existing site.
4. Recommended web address:
   - `analysthub`
   - `allinonehub`
   - `cfsbanalysthub`

## 2. Upload Web Files

Upload every file from:

```text
power-pages/web-files/
```

as Power Pages Web Files.

| Source file | Web File partial URL |
| --- | --- |
| `theme.css` | `theme.css` |
| `guidance-changes.csv` | `guidance-changes.csv` |
| `mountain-bg.svg` | `mountain-bg.svg` |
| `cfsb-logo.svg` | `cfsb-logo.svg` |

For each Web File:

| Field | Value |
| --- | --- |
| Name | Exact filename |
| Website | Your site |
| Parent Page | Home |
| Partial URL | Exact filename, no leading slash |
| Publishing State | Published |

After saving the Web File record, attach the actual file in Notes / Timeline if your Power Pages UI requires an attachment.

## 3. Validate Web Files

Open these directly in the browser:

```text
https://your-site-url/theme.css
https://your-site-url/guidance-changes.csv
```

If any URL returns 404, fix that Web File before continuing.

## 4. Add shared layout templates

Create or update shared templates using:

```text
power-pages/web-templates/layout-header.html
power-pages/web-templates/layout-footer.html
```

If your Power Pages site has a master layout, paste the header content before the page body and footer content after the page body.

The header expects this root Web File URL:

```html
<link rel="stylesheet" href="/theme.css">
```

If the client Power Pages tenant already loads `theme.css` automatically, paste the full contents of `power-pages/web-files/theme.css` into that portal `theme.css` file and do not rely on separate custom CSS settings.

The footer contains inline JavaScript for menu behavior, site search, user welcome text, guidance calendar behavior, and Org / POD search. Do not create separate JavaScript Web Files unless you intentionally split the scripts again.

## 5. Create the pages

Create only these Power Pages content pages and paste the matching body HTML.

| Page | Partial URL | Source file |
| --- | --- | --- |
| Home | default home page `/` | `power-pages/pages/home.html` |
| Contact | `contact` | `power-pages/pages/contact.html` |

Guidance & Updates, Process Library, Documents, Ownership, and Meet the Team are scroll sections inside Home. Do not create separate published pages for those sections.

## 6. Route check

The header links expect exactly:

```text
/
/#guidance
/#resources
/#documents
/#org
/#meet-team
/contact
```

## 7. Clear cache

After publishing:

1. Clear Power Pages cache from the admin center.
2. Hard-refresh the browser.

Windows:

```text
Ctrl + F5
```

Mac:

```text
Cmd + Shift + R
```

## 8. Functional test

Test:

- Home page loads with dark glass styling.
- Header navigation scrolls within Home for Guidance, Process Library, Documents, Ownership, and Meet the Team.
- Global search works.
- Guidance calendar loads CSV rows.
- Document Library cards render on Home.
- Org / POD search works separately.
- Meet the Team section renders on Home.
- Contact page renders.
- Browser console has no missing CSS/CSV/SVG files.

## 9. Clean deploy folder

The deployable source is intentionally small. `power-pages/pages/` should contain only `home.html` and `contact.html`, because every section except Contact lives inside Home.
