---
title: "Speculation Rules API (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speculation_rules_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Speculation Rules API

The **Speculation Rules API** is designed to improve performance for future navigations. It targets document URLs rather than specific resource files, and so makes sense for multi-page applications (MPAs) rather than single-page applications (SPAs).

The Speculation Rules API provides an alternative to the widely-available `<link rel="prefetch">` feature and is designed to supersede the Chrome-only deprecated `<link rel="prerender">` feature. It provides many improvements over these technologies, along with a more expressive, configurable syntax for specifying which documents should be prefetched or prerendered.

> **Note:**
> The Speculation Rules API doesn't handle subresource prefetches; for that you'll need to use `<link rel="prefetch">`.

## Concepts and usage

Speculation rules can be specified inside inline `<script type="speculationrules">` elements and external text files referenced by the `Speculation-Rules` response header. The rules are specified as a JSON structure.

A script example:

```html
<script type="speculationrules">
  {
    "prerender": [
      {
        "where": {
          "and": [
            { "href_matches": "/*" },
            { "not": { "href_matches": "/logout" } },
            { "not": { "href_matches": "/*\\?*(^|&)add-to-cart=*" } },
            { "not": { "selector_matches": ".no-prerender" } },
            { "not": { "selector_matches": "[rel~=nofollow]" } }
          ]
        }
      }
    ],
    "prefetch": [
      {
        "urls": ["next.html", "next2.html"],
        "requires": ["anonymous-client-ip-when-cross-origin"],
        "referrer_policy": "no-referrer"
      }
    ]
  }
</script>
```

Speculation rules using a `<script>` element need to be explicitly allowed in the `Content-Security-Policy` `script-src` directive if the site includes it. This is done by adding one of the `'inline-speculation-rules'` source, a hash-source, or nonce-source.

An HTTP header example:

```http
Speculation-Rules: "/rules/prefetch.json"
```

The text resource containing the speculation rules JSON can have any valid name and extension, but it must be served with an `application/speculationrules+json` MIME type.

> **Note:**
> Rules can be specified using both an inline script and the HTTP header simultaneously — all rules applied to a document are parsed and added to the document's speculation rules list.

You specify a different array to contain the rules for each speculative loading type (for example `"prerender"` or `"prefetch"`). Each rule is contained in an object that specifies for example a list of resources to be fetched, plus options such as an explicit `Referrer-Policy` setting for each rule. Note that prerendered URLs are also prefetched.

See `<script type="speculationrules">` for a full explanation of the available syntax.

### Using prefetching

Including `prefetch` rules inside a `<script type="speculationrules">` element or `Speculation-Rules` header will cause supporting browsers to download the response body of the referenced pages, but none of the subresources referenced by the page. When a prefetched page is navigated to, it will render much more quickly than if it were not prefetched.

The results are kept in a per-document in-memory cache. Any cached prefetches are discarded when you navigate away from the current page, except of course a prefetched document that you then navigate to.

This means that if you prefetch something the user doesn't navigate to, it is generally a waste of resources, although the result may populate the HTTP cache if headers allow. That said, the upfront cost of a prefetch is much smaller than the upfront cost of a prerender, so you are encouraged to adopt prefetching broadly, for example prefetching all of the significant pages on your site, provided they are safe to prefetch (see Unsafe speculative loading conditions for more details).

Same-site and cross-site prefetches will work, but cross-site prefetches are limited (see "same-site" and "cross-site" for an explanation of the difference between the two). For privacy reasons cross-site prefetches will currently only work if the user has no cookies set for the destination site — we don't want sites to be able to track user activity via prefetched pages (which they may never even actually visit) based on previously-set cookies.

> **Note:**
> In the future an opt-in for cross-site prefetches will be provided via the `Supports-Loading-Mode` header, but this was not implemented at the time of writing (only cross-origin, same-site prerendering opt-in was available).

For browsers that support it, speculation rules prefetch should be preferred over older prefetch mechanisms, namely `<link rel="prefetch">` and `fetch()` with a `priority: "low"` option set on it. Because we know that speculation rules prefetch is for navigations, not general resource prefetching, it can be used for cross-site navigations, whereas `<link rel="prefetch">` cannot.

In addition, speculation rules prefetch:

- Automatically lowers the priority when needed (`fetch()` doesn't).
- Is respectful of the user's configuration. For example, prefetching doesn't happen when the user's device is in Battery Saver or Data Saver mode.
- Stores the prefetched resources in a per-document in-memory cache as opposed to the HTTP cache, which may result in slightly faster prefetching.

### Using prerendering

Including `prerender` rules inside a `<script type="speculationrules">` element or `Speculation-Rules` header will cause supporting browsers to fetch, render, and load the content into an invisible tab, stored in a per-document in-memory cache. This includes loading all subresources, running all JavaScript, and even loading subresources and performing data fetches started by JavaScript. Any cached prerenders and their subresources are discarded when you navigate away from the current page, except of course a prerendered document that you then navigate to.

Future navigations to a prerendered page will be near-instant. The browser activates the invisible tab instead of carrying out the usual navigation process, replacing the old foreground page with the prerendered page. If a page is activated before it has fully prerendered, it is activated in its current state and then continues to load, which means you will still see a significant performance improvement.

Prerendering uses memory and network bandwidth. If you prerender something the user doesn't navigate to, these are wasted (although the result may populate the HTTP cache if headers allow, allowing later use). The upfront cost of a prerender is much larger than the upfront cost of a prefetch, and other conditions could also make content unsafe to prerender (see Unsafe speculative loading conditions for more details). As a result, you are encouraged to adopt prerendering more sparingly, carefully considering cases where there is a high likelihood of the page being navigated to, and you think the user experience benefit is worth the extra cost.

> **Note:**
> To put the amount of potential resource wastage in perspective, a prerender uses about the same amount of resources as rendering an ``.

> **Note:**
> Many APIs will be automatically deferred when prerendering/until activation. See Platform features deferred or restricted during prerender for more details.

Prerendering is restricted to same-origin documents by default. Cross-origin, same-site prerendering is possible — it requires the navigation target to opt-in using the `Supports-Loading-Mode` header with a value of `credentialed-prerender`. Cross-site prerendering is not possible at this time.

For browsers that support it, speculation rules prerender should be preferred over older prerender mechanisms, namely `<link rel="prerender">`:

- `<link rel="prerender">` is Chrome-specific and was never standardized, and the Chrome engineering team are in the process of sunsetting it.
- It loads subresources loaded via JavaScript, whereas `<link rel="prerender">` doesn't.
- It doesn't get blocked by `Cache-Control` settings, whereas `<link rel="prerender">` often does.
- Speculation rules prerender should be treated as a hint and a progressive enhancement. Unlike `<link rel="prerender">`, it is a speculative hint and the browser may choose not to act upon the hint based on user settings, current memory usage, or other heuristics.

### Speculation rules API feature detection

You can check if the Speculation Rules API is supported using the following code:

```js
if (
  HTMLScriptElement.supports &&
  HTMLScriptElement.supports("speculationrules")
) {
  console.log("Your browser supports the Speculation Rules API.");
}
```

For example, you might want to insert speculation rules for prefetching in supporting browsers, but use an older technology such as `<link rel="prefetch">` in others:

```js
if (
  HTMLScriptElement.supports &&
  HTMLScriptElement.supports("speculationrules")
) {
  const specScript = document.createElement("script");
  specScript.type = "speculationrules";
  const specRules = {
    prefetch: [
      {
        source: "list",
        urls: ["/next.html"],
      },
    ],
  };
  specScript.textContent = JSON.stringify(specRules);
  document.body.append(specScript);
} else {
  const linkElem = document.createElement("link");
  linkElem.rel = "prefetch";
  linkElem.href = "/next.html";
  document.head.append(linkElem);
}
```

## Detecting prefetched and prerendered pages

This section looks at different ways to detect whether a requested page has been prefetched or prerendered.

### Server-side detection

Prefetched and prerendered page requests are sent with the `Sec-Purpose` request header:

For prefetch:

```http
Sec-Purpose: prefetch
```

For prerender:

```http
Sec-Purpose: prefetch;prerender
```

Servers can respond based on this header, for example, to log speculative load requests, return different content, or even prevent speculative loading from happening. If a non-success response code is returned (any HTTP status other than in the 200-299 range after redirects), then the page will not be prefetched/prerendered. In addition the 204 and 205 status codes also prevent prerendering (but do not prevent prefetch).

Using a non-success code (for example a 503) is the easiest way to prevent speculative loading server-side, although it is usually a better approach to allow the prefetch/prerender, and use JavaScript to delay any actions that should only happen when the page is actually viewed.

### JavaScript prefetch detection

When a page is prefetched, its `PerformanceResourceTiming.deliveryType` entry will return a value of `"navigational-prefetch"`. You could use the following to run a function when a performance entry of type `"navigational-prefetch"` is received:

```js
if (
  performance.getEntriesByType("navigation")[0].deliveryType ===
  "navigational-prefetch"
) {
  respondToPrefetch(); // Author-defined function
}
```

This technique is useful when measuring performance, or when you want to defer actions that might cause problems if they occur during prefetching (see Unsafe prefetching).

### JavaScript prerender detection

To run an activity while the page is prerendering, you can check for the `Document.prerendering` property. You could for example run some analytics:

```js
if (document.prerendering) {
  analytics.sendInfo("got this far during prerendering!");
}
```

When a prerendered document is activated, `PerformanceNavigationTiming.activationStart` is set to a `DOMHighResTimeStamp` representing the time between when the prerender was started and the document was activated. The following function can check for prerendering _and_ prerendered pages:

```js
function pagePrerendered() {
  return (
    document.prerendering ||
    self.performance?.getEntriesByType?.("navigation")[0]?.activationStart > 0
  );
}
```

When the prerendered page is activated by the user viewing the page, the `prerenderingchange` event will fire. This can be used to enable activities that previously would be started by default on page load but which you wish to delay until the page is viewed by the user. The following code sets up an event listener to run a function once prerendering has finished, on a prerendered page, or runs it immediately on a non-prerendered page:

```js
if (document.prerendering) {
  document.addEventListener("prerenderingchange", initAnalytics, {
    once: true,
  });
} else {
  initAnalytics();
}
```
