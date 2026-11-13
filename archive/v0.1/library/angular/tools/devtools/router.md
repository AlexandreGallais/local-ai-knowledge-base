---
title: "Inspect the Router Tree"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/devtools/router.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Inspect the Router Tree

The **Router Tree** tab lets you visualize the routing tree of your application. You can explore how routes are nested and view details about specific routes.

### View route details

When you select a specific route in the tree, Angular DevTools displays its properties in the sidebar on the right. This information includes:

- **Path**: The URL path for the route. If the route uses a custom URL matcher, DevTools displays the **Matcher** instead.
- **Component**: The component rendered for this route. If the route is a redirect, DevTools displays the **Redirect to** target instead.
- **Path Match**: The path matching strategy (`prefix` or `full`), if configured.
- **Data**: Static data associated with the route, displayed as a JSON tree.
- **Resolvers**: Route resolvers, displayed as key-value pairs.
- **Guards**: Any guards configured on the route, grouped by type — `canActivate`, `canActivateChild`, `canDeactivate`, and `canMatch`.
- **Providers**: Route-level providers, if configured.
- **Title**: The route title, if configured.
- **RunGuardsAndResolvers**: The re-run strategy for guards and resolvers, if configured.
- **Active**: Whether this route is currently active.
- **Auxiliary**: Indicates if the route is an auxiliary route (e.g., in a named outlet).
- **Lazy**: Indicates if the route is lazily loaded.

NOTE: Properties like Path Match, Data, Resolvers, Guards, Providers, Title, and RunGuardsAndResolvers only appear in the sidebar when they are configured on the selected route.

### Navigate to a specific route

You can easily trigger navigation directly from the DevTools. While inspecting a route's details in the right sidebar, click on the **Navigate** icon next to the path string. This triggers the Angular router to navigate to that URL in your application.
