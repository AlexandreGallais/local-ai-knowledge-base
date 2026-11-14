---
title: "Breaking change: QuickGrid sorting and pagination controls render as links"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/11/quickgrid-controls-render-as-links.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# QuickGrid sorting and pagination controls render as links

In ASP.NET Core 11, sortable `QuickGrid` column headers and `Paginator` controls render as links instead of buttons by default. Apps with CSS or tests that target the previous button markup might need updates.

## Version introduced

.NET 11

## Previous behavior

Previously, sortable column headers and paginator controls rendered as `` elements with click handlers.

## New behavior

Starting in ASP.NET Core 11, sortable column headers and paginator controls render as `` elements with `href` attributes. Pagination and sort state is stored in the URL query string, which lets users share a sorted or paginated view and use browser back/forward navigation. The links also work under static server-side rendering (static SSR) without a JavaScript runtime.

Disabled paginator links use `aria-disabled="true"` instead of the `disabled` attribute, which doesn't apply to links.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Links allow pagination and sorting to navigate by URL, including under static SSR where button click handlers aren't available. For more information, see ASP.NET Core Blazor \`QuickGrid\` component.

## Recommended action

Update custom CSS selectors and UI tests that expect button markup. For example:

```diff
- button.col-title { ... }
+ button.col-title, a.col-title { ... }
- nav button { ... }
+ nav button, nav a { ... }
- nav button:disabled { ... }
+ nav button:disabled, nav a[aria-disabled="true"] { ... }
```

The built-in QuickGrid CSS supports both markup styles. For apps with multiple grids on the same page, assign unique query parameter names to avoid conflicts. For more information, see ASP.NET Core Blazor \`QuickGrid\` component.

To restore the previous button markup, set the `AppContext` switch to `false` before rendering the grid:

```csharp
AppContext.SetSwitch(
    "Microsoft.AspNetCore.Components.QuickGrid.EnableUrlBasedQuickGridNavigationAndSorting",
    false);
```

The button markup requires an interactive render mode. The switch **doesn't disable URL-state handling**: `QuickGrid` still reads and writes pagination and sort state in the URL query string.

## Affected APIs

None. No public API signatures changed. This change affects the HTML markup rendered by the `QuickGrid` and `Paginator` components.
