---
title: "Customizing route behavior (part 3 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/routing/customizing-route-behavior.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Customizing route behavior (part 3 of 3)

## URL handling strategy

URL handling strategies determine which URLs the Angular router processes versus which ones it ignores. By default, Angular attempts to handle all navigation events within the application, but real-world applications often need to coexist with other systems, handle external links, or integrate with legacy applications that manage their own routes.

The `UrlHandlingStrategy` class gives you control over this boundary between Angular-managed routes and external URLs. This becomes essential when migrating applications to Angular incrementally or when Angular applications need to share URL space with other frameworks.

### Implementing a custom URL handling strategy

Custom URL handling strategies extend the `UrlHandlingStrategy` class and implement three methods. The `shouldProcessUrl` method determines whether Angular should handle a given URL, `extract` returns the portion of the URL that Angular should process, and `merge` combines the URL fragment with the rest of the URL:

```ts
import {Injectable} from '@angular/core';
import {UrlHandlingStrategy, UrlTree} from '@angular/router';

@Injectable()
export class CustomUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    // Only handle URLs that start with /app or /admin
    return url.toString().startsWith('/app') || url.toString().startsWith('/admin');
  }

  extract(url: UrlTree): UrlTree {
    // Return the URL unchanged if we should process it
    return url;
  }

  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    // Combine the URL fragment with the rest of the URL
    return newUrlPart;
  }
}
```

This strategy creates clear boundaries in the URL space. Angular handles `/app` and `/admin` paths while ignoring everything else. This pattern works well when migrating legacy applications where Angular controls specific sections while the legacy system maintains others.

### Configuring a custom URL handling strategy

You can register a custom strategy through Angular's dependency injection system:

```ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter, UrlHandlingStrategy} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: UrlHandlingStrategy, useClass: CustomUrlHandlingStrategy},
  ],
};
```

## Custom route matchers

By default, Angular's router iterates through routes in the order they're defined, attempting to match the URL path against each route's path pattern. It supports static segments, parameterized segments (`:id`), and wildcards (`**`). The first route that matches wins, and the router stops searching.

When applications require more sophisticated matching logic based on runtime conditions, complex URL patterns, or other custom rules, custom matchers provide this flexibility without compromising the simplicity of standard routes.

The router evaluates custom matchers during the route matching phase, before path matching occurs. When a matcher returns a successful match, it can also extract parameters from the URL, making them available to the activated component just like standard route parameters.

### Creating a custom matcher

A custom matcher is a function that receives URL segments and returns either a match result with consumed segments and parameters, or null to indicate no match. The matcher function runs before Angular evaluates the route's path property:

```ts
import {Route, UrlSegment, UrlSegmentGroup, UrlMatchResult} from '@angular/router';

export function customMatcher(
  segments: UrlSegment[],
  group: UrlSegmentGroup,
  route: Route,
): UrlMatchResult | null {
  // Matching logic here
  if (matchSuccessful) {
    return {
      consumed: segments,
      posParams: {
        paramName: new UrlSegment('paramValue', {}),
      },
    };
  }
  return null;
}
```

### Implementing version-based routing

Consider an API documentation site that needs to route based on version numbers in the URL. Different versions might have different component structures or feature sets:

```ts
import {Routes, UrlSegment, UrlMatchResult} from '@angular/router';

export function versionMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  // Match patterns like /v1/docs, /v2.1/docs, /v3.0.1/docs
  if (segments.length >= 2 && segments[0].path.match(/^v\d+(\.\d+)*$/)) {
    return {
      consumed: segments.slice(0, 2), // Consume version and 'docs'
      posParams: {
        version: segments[0], // Make version available as a parameter
        section: segments[1], // Make section available too
      },
    };
  }
  return null;
}

// Route configuration
export const routes: Routes = [
  {
    matcher: versionMatcher,
    component: Documentation,
  },
  {
    path: 'latest/docs',
    redirectTo: 'v3/docs',
  },
];
```

If you enable `withComponentInputBinding`, the component receives the extracted parameters through route inputs:

```angular-ts
import {Component, input, inject, resource} from '@angular/core';

@Component({
  selector: 'app-documentation',
  template: `
    @if (documentation.isLoading()) {
      <div>Loading documentation...</div>
    } @else if (documentation.error()) {
      <div>Error loading documentation</div>
    } @else if (documentation.value(); as docs) {
      <article>{{ docs.content }}</article>
    }
  `,
})
export class Documentation {
  // The router sets these inputs from the route parameters
  version = input.required<string>(); // Receives the version parameter
  section = input.required<string>(); // Receives the section parameter

  private docsService = inject(DocumentationService);

  // Resource automatically loads documentation when version or section changes
  documentation = resource({
    params: () => {
      if (!this.version() || !this.section()) return;

      return {
        version: this.version(),
        section: this.section(),
      };
    },
    loader: ({params}) => {
      return this.docsService.loadDocumentation(params.version, params.section);
    },
  });
}
```

### Locale-aware routing

International applications often encode locale information in URLs. A custom matcher can extract locale codes and route to appropriate components while making the locale available as a parameter:

```ts
// Supported locales
const locales = ['en', 'es', 'fr', 'de', 'ja', 'zh'];

export function localeMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length > 0) {
    const potentialLocale = segments[0].path;

    if (locales.includes(potentialLocale)) {
      // This is a locale prefix, consume it and continue matching
      return {
        consumed: [segments[0]],
        posParams: {
          locale: segments[0],
        },
      };
    } else {
      // No locale prefix, use default locale
      return {
        consumed: [], // Don't consume any segments
        posParams: {
          locale: new UrlSegment('en', {}),
        },
      };
    }
  }

  return null;
}
```

### Complex business logic matching

Custom matchers excel at implementing business rules that would be awkward to express in path patterns. Consider an e-commerce site where product URLs follow different patterns based on product type:

```ts
export function productMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length === 0) return null;

  const firstSegment = segments[0].path;

  // Books: /isbn-1234567890
  if (firstSegment.startsWith('isbn-')) {
    return {
      consumed: [segments[0]],
      posParams: {
        productType: new UrlSegment('book', {}),
        identifier: new UrlSegment(firstSegment.substring(5), {}),
      },
    };
  }

  // Electronics: /sku/ABC123
  if (firstSegment === 'sku' && segments.length > 1) {
    return {
      consumed: segments.slice(0, 2),
      posParams: {
        productType: new UrlSegment('electronics', {}),
        identifier: segments[1],
      },
    };
  }

  // Clothing: /style/BRAND/ITEM
  if (firstSegment === 'style' && segments.length > 2) {
    return {
      consumed: segments.slice(0, 3),
      posParams: {
        productType: new UrlSegment('clothing', {}),
        brand: segments[1],
        identifier: segments[2],
      },
    };
  }

  return null;
}
```

### Performance considerations for custom matchers

Custom matchers run for every navigation attempt until a match is found. As a result, complex matching logic can impact navigation performance, especially in applications with many routes. Keep matchers focused and efficient:

- Return early when a match is impossible
- Avoid expensive operations like API calls or complex regular expressions
- Consider caching results for repeated URL patterns

While custom matchers solve complex routing requirements elegantly, overuse can make route configuration harder to understand and maintain. Reserve custom matchers for scenarios where standard path matching genuinely falls short.
