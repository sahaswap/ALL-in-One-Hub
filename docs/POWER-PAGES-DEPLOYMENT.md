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
| `tokens.css` | `tokens.css` |
| `components.css` | `components.css` |
| `site.js` | `site.js` |
| `site-search.js` | `site-search.js` |
| `user-welcome.js` | `user-welcome.js` |
| `guidance-calendar.js` | `guidance-calendar.js` |
| `org-structure.js` | `org-structure.js` |
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
https://your-site-url/tokens.css
https://your-site-url/components.css
https://your-site-url/site.js
https://your-site-url/site-search.js
https://your-site-url/guidance-calendar.js
https://your-site-url/org-structure.js
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

The header expects these root Web File URLs:

```html
<link rel="stylesheet" href="/tokens.css">
<link rel="stylesheet" href="/components.css">
```

The footer expects these scripts:

```html
<script src="/site.js"></script>
<script src="/site-search.js"></script>
<script src="/user-welcome.js"></script>
<script src="/guidance-calendar.js"></script>
<script src="/org-structure.js"></script>
```

## 5. Create the pages

Create these Power Pages routes and paste the matching body HTML.

| Page | Partial URL | Source file |
| --- | --- | --- |
| Home | default home page `/` | `power-pages/pages/home.html` |
| Guidance & Updates | `guidance` | `power-pages/pages/guidance.html` |
| Process Library | `resources` | `power-pages/pages/resources.html` |
| Documents | `document-library` | `power-pages/pages/document-library.html` |
| Ownership | `org` | `power-pages/pages/org.html` |
| Meet the Team | `meet-the-team` | `power-pages/pages/meet-the-team.html` |
| Contact | `contact` | `power-pages/pages/contact.html` |

## 6. Route check

The header links expect exactly:

```text
/
/guidance
/resources
/document-library
/org
/meet-the-team
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
- Header navigation works.
- Global search works.
- Guidance calendar loads CSV rows.
- Document Library cards render.
- Org / POD search works separately.
- Meet the Team page renders.
- Contact page renders.
- Browser console has no 404s.

## 9. Do not deploy preview

Do not deploy:

```text
preview/
```

That folder is only for local static preview.
