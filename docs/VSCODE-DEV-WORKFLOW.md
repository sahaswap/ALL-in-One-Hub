# vscode.dev Workflow

Use this when the only editor available is:

```text
https://vscode.dev/github/<owner>/<repo>
```

`vscode.dev` is an editor, not a full deployment environment. Use it to copy or download files, then upload/paste them into Power Pages.

## Open the repo

Open the repo in the browser:

```text
https://vscode.dev/github/sahaswap/ALL-in-One-Hub
```

If the repo is public, viewing can work without sign-in, but editing/committing requires sign-in.

## Download or copy Web Files

In the Explorer, open:

```text
power-pages/web-files/
```

This folder now contains only files that must remain as Web Files:

```text
theme.css
guidance-changes.csv
mountain-bg.svg
cfsb-logo.svg
```

For each file:

1. Right-click the file.
2. Choose Download, if available.
3. Upload it as a Power Pages Web File.

If Download is unavailable:

1. Open the file.
2. Press `Ctrl+A` / `Cmd+A`.
3. Press `Ctrl+C` / `Cmd+C`.
4. Create a local file with the same filename.
5. Paste and save.
6. Upload that file to Power Pages.

Open:

```text
power-pages/web-files/theme.css
```

Copy all content and paste it into the portal `theme.css` file. This one file contains the full visual theme.

## Copy page bodies

Open:

```text
power-pages/pages/
```

Only copy these two page files:

```text
power-pages/pages/home.html
power-pages/pages/contact.html
```

For each file:

1. Open the file in `vscode.dev`.
2. Copy all content.
3. Open the matching Power Pages Web Page copy/content field.
4. Paste the content.
5. Save and publish.

Do not create separate published pages for Guidance, Process Library, Documents, Ownership, or Meet the Team. Those sections are already inside `home.html` and should be reached through Home page anchors.

## Copy layout templates

Open:

```text
power-pages/web-templates/layout-header.html
power-pages/web-templates/layout-footer.html
```

Copy/paste them into your Power Pages shared layout or master template.

`layout-footer.html` contains inline JavaScript. This avoids the Power Pages `vscode.dev` issue where separate `.js` Web Files do not save or update reliably.

## What not to do in vscode.dev

Usually you cannot run:

```bash
git clone
python3 -m http.server
pac powerpages upload
npm install
```

If you need terminal commands, use GitHub Codespaces instead of plain `vscode.dev`.
