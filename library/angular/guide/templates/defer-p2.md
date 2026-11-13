---
title: "Deferred loading with @defer (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/templates/defer.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Deferred loading with @defer (part 2 of 2)

## Compatibility between `@defer` blocks and Hot Module Reload (HMR)

When Hot Module Replacement (HMR) is active, all `@defer` block chunks are fetched eagerly, overriding any configured triggers. To restore the standard trigger behavior, you must disable HMR by serving your application with the `--no-hmr` flag.

## How does `@defer` work with server-side rendering (SSR) and static-site generation (SSG)?

By default, when rendering an application on the server (either using SSR or SSG), defer blocks always render their `@placeholder` (or nothing if a placeholder is not specified) and triggers are not invoked. On the client, the content of the `@placeholder` is hydrated and triggers are activated.

To render the main content of `@defer` blocks on the server (both SSR and SSG), you can enable the Incremental Hydration feature and configure `hydrate` triggers for the necessary blocks.

## Barrel files and lazy chunks

If you're using `@defer` but not seeing a separate lazy chunk in your build output, check how you're importing the deferred component. Importing through a barrel file (`index.ts`) is a common culprit — bundlers see the barrel as a single module and keep all its exports together, so your component ends up in the main bundle regardless of `@defer`.

```typescript
export {HeavyComponent} from './heavy.component';
export {OtherComponent} from './other.component';
```

```typescript
import {Component} from '@angular/core';
import {HeavyComponent} from './index'; // pulls in OtherComponent too

@Component({
  imports: [HeavyComponent],
  template: `@defer {
    <heavy-component />
  }`,
})
export class ParentComponent {}
```

The fix is straightforward — import directly from the component's own file:

```typescript
import {HeavyComponent} from './heavy.component';
```

That's enough for the bundler to split it into its own chunk and load it lazily when the trigger fires.

## Best practices for deferring views

### Avoid cascading loads with nested `@defer` blocks

When you have nested `@defer` blocks, they should have different triggers in order to avoid loading simultaneously, which causes cascading requests and may negatively impact page load performance.

### Avoid layout shifts

Avoid deferring components that are visible in the user’s viewport on initial load. Doing this may negatively affect Core Web Vitals by causing an increase in cumulative layout shift (CLS).

In the event this is necessary, avoid `immediate`, `timer`, `viewport`, and custom `when` triggers that cause the content to load during the initial page render.

### Keep accessibility in mind

When using `@defer` blocks, consider the impact on users with assistive technologies like screen readers.
Screen readers that focus on a deferred section will initially read the placeholder or loading content, but may not announce changes when the deferred content loads.

To ensure deferred content changes are announced to screen readers, you can wrap your `@defer` block in an element with a live region:

```angular-html
<div aria-live="polite" aria-atomic="true">
  @defer (on timer(2000)) {
    <user-profile [user]="currentUser" />
  } @placeholder {
    Loading user profile...
  } @loading {
    Please wait...
  } @error {
    Failed to load profile
  }
</div>
```

This ensures that changes are announced to the user when transitions (placeholder &rarr; loading &rarr; content/error) occur.
