# Graph Report - ALL-in-One-Hub  (2026-05-10)

## Corpus Check
- 4 files · ~6,010 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 115 nodes · 148 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `61afe4f3`
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
1. `ALL in One Hub` - 11 edges
2. `Power Pages Deployment Guide` - 11 edges
3. `collectRecords()` - 9 edges
4. `Guidance data` - 8 edges
5. `vscode.dev Workflow` - 7 edges
6. `Guidance Data Options` - 7 edges
7. `initGuidanceCalendar()` - 7 edges
8. `Copy page bodies` - 5 edges
9. `renderResults()` - 5 edges
10. `runSearch()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `initGuidanceCalendar()` --calls--> `renderResults()`  [INFERRED]
  power-pages/web-files/guidance-calendar.js → power-pages/web-files/site-search.js

## Communities (10 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.1
Nodes (20): 1. Create or open the Power Pages site, 2. Upload Web Files, 3. Validate Web Files, 4. Add shared layout templates, 5. Create the pages, 6. Route check, 7. Clear cache, 8. Functional test (+12 more)

### Community 1 - "Community 1"
Cohesion: 0.17
Nodes (15): code:text (https://vscode.dev/github/<owner>/<repo>), code:text (https://vscode.dev/github/sahaswap/ALL-in-One-Hub), code:text (power-pages/web-files/), code:text (theme.css), code:text (power-pages/web-files/theme.css), code:text (power-pages/pages/), code:text (power-pages/pages/home.html), code:text (power-pages/web-templates/layout-header.html) (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.28
Nodes (15): cleanText(), collectRecords(), ensureResults(), fetchPageRecords(), getCategory(), getExcerpt(), getPageUrls(), getRecords() (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.14
Nodes (14): ALL in One Hub, Client deployment checklist, code:text (ALL-in-One-Hub/), code:text (power-pages/web-files/theme.css), code:text (power-pages/), code:text (docs/POWER-PAGES-DEPLOYMENT.md), code:text (docs/VSCODE-DEV-WORKFLOW.md), Important files (+6 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (13): code:text (/guidance-changes.csv), code:text (power-pages/web-files/guidance-changes.csv), code:text (id,date,title,summary,owner,status,fullGuidance), code:text (status = Published), code:text (Business user updates Excel in SharePoint), code:text (GuidanceUpdates), code:text (id), code:text (SharePoint List or Excel) (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (9): createGuidanceItem(), formatDisplayDate(), formatIsoDate(), getWeekStart(), initGuidanceCalendar(), openGuidanceModal(), openGuidanceRecords(), parseCsv() (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.28
Nodes (9): code:text (SharePoint Excel -> Power Automate -> guidance-changes.csv -), code:text (SharePoint List or Excel -> Power Automate -> Dataverse -> P), code:text (docs/GUIDANCE-DATA-OPTIONS.md), code:text (/guidance-changes.csv), code:text (SharePoint Excel -> Power Automate -> guidance-changes.csv -), code:text (SharePoint List or Excel -> Power Automate -> Dataverse -> P), code:text (docs/GUIDANCE-DATA-OPTIONS.md), Guidance data (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.7
Nodes (4): clearMatches(), getPodName(), runSearch(), updateFeedback()

## Knowledge Gaps
- **36 isolated node(s):** `What this site is`, `Visual direction`, `code:text (ALL-in-One-Hub/)`, `code:text (power-pages/web-files/theme.css)`, `code:text (power-pages/)` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initGuidanceCalendar()` connect `Community 5` to `Community 2`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `renderResults()` connect `Community 2` to `Community 5`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `ALL in One Hub` connect `Community 3` to `Community 6`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `What this site is`, `Visual direction`, `code:text (ALL-in-One-Hub/)` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._