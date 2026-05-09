# Graph Report - ALL-in-One-Hub  (2026-05-09)

## Corpus Check
- 9 files · ~7,289 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 110 nodes · 131 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50da623c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]

## God Nodes (most connected - your core abstractions)
1. `ALL in One Hub` - 10 edges
2. `Power Pages Deployment Guide` - 10 edges
3. `collectRecords()` - 9 edges
4. `initGuidanceCalendar()` - 7 edges
5. `vscode.dev Workflow` - 7 edges
6. `Guidance Data Options` - 7 edges
7. `renderResults()` - 5 edges
8. `runSearch()` - 5 edges
9. `Guidance data` - 5 edges
10. `runSearch()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `initGuidanceCalendar()` --calls--> `renderResults()`  [INFERRED]
  power-pages/web-files/guidance-calendar.js → power-pages/web-files/site-search.js

## Communities (10 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.1
Nodes (19): 1. Create or open the Power Pages site, 2. Upload Web Files, 3. Validate Web Files, 4. Add shared layout templates, 5. Create the pages, 6. Route check, 7. Clear cache, 8. Functional test (+11 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (17): ALL in One Hub, Client deployment checklist, code:text (ALL-in-One-Hub/), code:text (power-pages/web-files/tokens.css), code:text (power-pages/), code:text (preview/), code:text (docs/POWER-PAGES-DEPLOYMENT.md), code:bash (python3 -m http.server 3000) (+9 more)

### Community 2 - "Community 2"
Cohesion: 0.28
Nodes (15): cleanText(), collectRecords(), ensureResults(), fetchPageRecords(), getCategory(), getExcerpt(), getPageUrls(), getRecords() (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.22
Nodes (9): createGuidanceItem(), formatDisplayDate(), formatIsoDate(), getWeekStart(), initGuidanceCalendar(), openGuidanceModal(), openGuidanceRecords(), parseCsv() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (13): code:text (/guidance-changes.csv), code:text (power-pages/web-files/guidance-changes.csv), code:text (id,date,title,summary,owner,status,fullGuidance), code:text (status = Published), code:text (Business user updates Excel in SharePoint), code:text (GuidanceUpdates), code:text (id), code:text (SharePoint List or Excel) (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (12): code:text (https://vscode.dev/github/<owner>/<repo>), code:text (https://vscode.dev/github/sahaswap/ALL-in-One-Hub), code:text (power-pages/web-files/), code:text (power-pages/pages/), code:text (power-pages/web-templates/layout-header.html), code:bash (git clone), Copy layout templates, Copy page bodies (+4 more)

### Community 6 - "Community 6"
Cohesion: 0.7
Nodes (4): clearMatches(), getPodName(), runSearch(), updateFeedback()

### Community 7 - "Community 7"
Cohesion: 0.4
Nodes (5): code:text (SharePoint Excel -> Power Automate -> guidance-changes.csv -), code:text (SharePoint List or Excel -> Power Automate -> Dataverse -> P), code:text (docs/GUIDANCE-DATA-OPTIONS.md), code:text (/guidance-changes.csv), Guidance data

## Knowledge Gaps
- **43 isolated node(s):** `What this site is`, `Visual direction`, `code:text (ALL-in-One-Hub/)`, `code:text (power-pages/web-files/tokens.css)`, `code:text (power-pages/)` (+38 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGuidanceCalendar()` connect `Community 3` to `Community 2`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `renderResults()` connect `Community 2` to `Community 3`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `ALL in One Hub` connect `Community 1` to `Community 7`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `What this site is`, `Visual direction`, `code:text (ALL-in-One-Hub/)` to the rest of the system?**
  _43 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._