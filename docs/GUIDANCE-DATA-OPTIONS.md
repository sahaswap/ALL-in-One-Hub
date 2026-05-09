# Guidance Data Options

The current site reads guidance updates from:

```text
/guidance-changes.csv
```

That file is included at:

```text
power-pages/web-files/guidance-changes.csv
```

## Current CSV format

The CSV must use these headers exactly:

```text
id,date,title,summary,owner,status,fullGuidance
```

Only rows with:

```text
status = Published
```

should be shown by the guidance calendar.

## Option 1: SharePoint Excel -> Power Automate -> CSV

Recommended for the first client deployment.

Flow:

```text
Business user updates Excel in SharePoint
Power Automate reads Excel table rows
Power Automate creates guidance-changes.csv
Power Pages reads /guidance-changes.csv
```

Excel should be formatted as a table named something like:

```text
GuidanceUpdates
```

Columns:

```text
id
date
title
summary
owner
status
fullGuidance
```

Power Automate actions:

1. Trigger: SharePoint file created or modified.
2. Action: Excel Online Business - List rows present in a table.
3. Action: Data Operations - Create CSV table.
4. Action: save/update `guidance-changes.csv`.
5. Upload or sync the CSV to the Power Pages Web File.
6. Clear Power Pages cache.

This keeps the website simple and avoids browser-side Excel parsing.

## Option 2: SharePoint List or Excel -> Dataverse -> Power Pages

Recommended for a long-term enterprise setup.

Flow:

```text
SharePoint List or Excel
Power Automate sync
Dataverse Guidance Update table
Power Pages reads Dataverse records
```

Suggested Dataverse columns:

| Display name | Type |
| --- | --- |
| Guidance ID | Text |
| Publish Date | Date only |
| Title | Text |
| Summary | Multiline text |
| Owner | Text or lookup |
| Status | Choice |
| Full Guidance | Multiline text |

Power Pages can then render data through Liquid FetchXML or the Power Pages Web API.

## Why not direct XLSX parsing in browser

Direct XLSX parsing is possible, but not recommended for the first client deployment because it usually requires:

- A third-party Excel parsing library.
- Additional browser payload.
- Security review.
- SharePoint/CORS/auth handling.
- Exposing the workbook to browser users.

CSV or Dataverse is safer for Power Pages.
