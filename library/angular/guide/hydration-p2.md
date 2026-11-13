---
title: "Hydration (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/hydration.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Hydration (part 2 of 2)

## I18N

HELPFUL: By default, Angular will skip hydration for components that use i18n blocks, effectively re-rendering those components from scratch.

To enable hydration for i18n blocks, you can add `withI18nSupport` to your `provideClientHydration` call.

```typescript
import {
  bootstrapApplication,
  provideClientHydration,
  withI18nSupport,
} from '@angular/platform-browser';
...

bootstrapApplication(App, {
  providers: [provideClientHydration(withI18nSupport())]
});
```

## Consistent rendering across server-side and client-side

Avoid introducing `@if` blocks and other conditionals that display different content when server-side rendering than client-side rendering, such as using an `@if` block with Angular's `isPlatformBrowser` function. These rendering differences cause layout shifts, negatively impacting end-user experience and core web vitals.

## Third Party Libraries with DOM Manipulation

There are a number of third party libraries that depend on DOM manipulation to be able to render. D3 charts is a prime example. These libraries worked without hydration, but they may cause DOM mismatch errors when hydration is enabled. For now, if you encounter DOM mismatch errors using one of these libraries, you can add the `ngSkipHydration` attribute to the component that renders using that library.

## Third Party Scripts with DOM Manipulation

Many third party scripts, such as ad trackers and analytics, modify the DOM before hydration can occur. These scripts may cause hydration errors because the page no longer matches the structure expected by Angular. Prefer deferring this type of script until after hydration whenever possible. Consider using `AfterNextRender` to delay the script until post-hydration processes have occurred.

### CDNs and browser extensions

Code outside your application can change the HTML from the server before hydration starts. You often can't see these errors on your computer, because they don't happen on your local server.

**CDNs that change HTML.** Some CDN features change HTML on its way to the browser. For example, some features remove comment nodes and whitespace, but hydration needs them. Another example is Email Address Obfuscation from Cloudflare, which is on by default. This feature changes email addresses to elements like ``. It also changes `mailto:` links and adds a script that changes the content back. If this script doesn't run before hydration starts, Angular finds an element where it expects text. Your local server doesn't use the CDN, so your application works on your computer and fails only in production.

**Browser extensions.** Some browser extensions change the page before hydration starts. Examples are click-to-call tools, translators, and password managers. You can't control these extensions. Only users who install them have the problem, so you may see errors from only some users.

To fix these errors:

- Add `ngSkipHydration` to the component host around the changed content. Add it in the template where you write that content, like this: `<app-contact ngSkipHydration>...</app-contact>`. Angular then renders this content again in the browser, and this removes the changes. You can use this attribute only on component host elements, so you can't add it to the `` element. Read more in how to skip hydration.
- Turn off the CDN feature for your application. In Cloudflare, turn off Email Address Obfuscation in the security settings, or use a Configuration Rule to turn it off for the hostnames of your application.

NOTE: The `` comments from Cloudflare don't help in Angular templates, because the compiler removes comments from templates.

## Incremental Hydration

Incremental hydration is an advanced form of hydration that allows for more granular control over when hydration happens. See the incremental hydration guide for more information.
