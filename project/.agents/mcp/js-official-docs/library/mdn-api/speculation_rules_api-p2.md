---
title: "Speculation Rules API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/speculation_rules_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Speculation Rules API (part 2 of 3)

## Unsafe speculative loading conditions

This section covers conditions to look out for, under which prefetching and/or prerendering are **unsafe**. This means that prefetching/prerendering pages that exhibit these conditions may require mitigations in your code, or need to be avoided altogether.

### Unsafe prefetching

As mentioned earlier, we recommend adopting prefetching broadly, as the risk-to-reward ratio is fairly low — the potential for resource wastage is minimal, and the performance improvements can be significant. However, you need to make sure prefetched pages do not cause problems with the flow of your application.

When a prefetch is done, the browser downloads the response body of the referenced page via a single GET request, which the user may navigate to at a future time. Problems can arise specifically when the URL of the request performs a server-initiated side effect that you don't want to happen until the URL is navigated to.

For example:

- Sign-out URLs.
- Language switching URLs.
- "Add to cart" URLs.
- Sign-in flow URLs where the server causes an SMS to be sent, for example as a one-time password (OTP).
- URLs that increment a user's usage allowance numbers, such as consuming their monthly free article allowance or starting the timer on their monthly minutes.
- URLs that initiate server-side ad conversion tracking.

Such issues can be mitigated on the server by watching for the `Sec-Purpose: prefetch` header as the requests come in, and then running specific code to defer problematic functionality. Later on, when the page is actually navigated to, you can initiate the deferred functionality via JavaScript if needed.

> **Note:**
> You can find more details about the detection code in the Detecting prefetched and prerendered pages section.

It is also potentially risky to prefetch a document whose server-rendered contents will change due to actions the user can take on the current page. This could include, for example, flash sale pages or movie theater seat maps. Test such cases carefully, and mitigate such issues by updating content once the page is loaded. See Server-rendered varying state for more details about these cases.

> **Note:**
> Browsers will cache prefetched pages for a short time (Chrome for example caches them for 5 minutes) before discarding them, so in any case, your users might see content that is up to 5 minutes out of date.

Stale prefetches can be cleared using the `prefetchCache` value of the `Clear-Site-Data` response header.
This might be used, for example, when for state changing requests mean that the cached data is no longer valid, such as when logging out of a site.

Prefetching is safe if all side effects of fetching the page result from JavaScript execution, since the JavaScript will not run until activation.

One final tip is to audit the URLs listed as disallowed in your robots.txt file — normally these URLs point to pages that can only be accessed by authenticated users, and therefore should not be included in search engine results. Many of these will be fine, but it can be a good place to find URLs unsafe for prefetching (i.e., they exhibit the conditions described above).

### Unsafe prerendering

Prerendering is more risky to adopt than prefetching and should therefore be done sparingly, in cases where it is worth it. There are more unsafe conditions to watch out for with prerendering so, while the reward is higher, the risk is too.

When a prerender is done, the browser GETs the URL and renders and loads the content into an invisible tab. This includes running the content's JavaScript and loading all subresources, including those fetched by JavaScript. Content can be potentially unsafe to prerender if any of the following conditions are observed:

- The URL is unsafe to prefetch. Read the previous section first if you haven't already, and understand that these conditions also equally apply to unsafe prerendering.
- The page's JavaScript modifies client-side storage (for example Web Storage or IndexedDB) on load in a way that may cause confusing effects in other, non-prerendered pages that the user is currently looking at.
- The page runs JavaScript or loads images that cause side effects such as sending analytics, recording ad impressions, or otherwise modifying the state of the application as if the user had already interacted with it. Again, this can affect the flow of the application, or cause incorrect performance or usage reporting. See Server-rendered varying state for more details about such use cases.

To mitigate such problems, you can use the following techniques:

- Watch for the `Sec-Purpose: prefetch` header on the server as the requests come in, and then run specific code to defer problematic functionality.
- Use the `prerenderingchange` event to detect when the prerendered page is actually activated and run code as a result. This is useful in two cases:
  - Deferring code that may cause problems if it is run before the page is viewed. For example, you may want to wait until after activation to update client-side storage or modify server-side state using JavaScript. This can avoid situations when the UI and the application state become out of sync with one another, for example a shopping cart showing no items even though the user has added some.
  - If the above is not possible, then you could still rerun code after the page is activated to bring the app up-to-date again. For example, a highly dynamic flash sale page might rely on content updates coming in from a third-party library. If you can't delay the updates, you can always get fresh updates once the user views the page. Prerendered pages can be updated in real-time using the Broadcast Channel API, or another mechanism such as `fetch()` or a `WebSocket`. This guarantees that the user will see up-to-date content after prerendering activation.
- Manage your third-party analytics scripts carefully — if possible, use scripts that are prerendering-aware (for example use the `Document.prerendering` property to defer running on prerendering pages) such as Google Analytics or NewRelic.
  - Note that loading the contents of cross-origin ``s is delayed while prerendering, until activation occurs. This is done to avoid breakage caused by loading cross-origin pages that are unaware of prerendering, and to avoid complexities around what credentials and storage to expose to these frames. It means that users may initially see blank frames in some cases, but it also means most third-party widgets such as ad tech are safe to use while prerendering.
  - For third-party scripts that are not prerendering-aware, avoid loading them until after activation using the `prerenderingchange` event, as mentioned earlier.

### Server-rendered varying state

There are two main types of server-rendered state to be concerned with: **outdated state**, and **user-specific state**. This can cause both unsafe prefetching and prerendering.

- Outdated state: Consider the example of a server-rendered list of blog comments, which may become out of date between the blog post being prerendered, and it being viewed. This might be particularly problematic if the current page is an admin panel where the user is deleting spam comments. If the user then navigates to the blog post, they might be confused as to why they can see the spam comments they just deleted.
- User-specific state: Consider the example of tracking sign-in state via a cookie. Problems can arise like the following:
  - The user visits `https://site.example/a` in tab 1 and `https://site.example/b` in tab 2, while logged out.
  - `https://site.example/b` prerenders `https://site.example/c`. It will be prerendered in a logged-out state.
  - The user signs in to `https://site.example` in tab 1.
  - The user switches to tab 2 and clicks the link to `https://site.example/c`, which activates the prerendered page.
  - Tab 2 displays a signed-out view of `https://site.example/c`, which confuses the user since they thought they were logged in.

User-specific state problems can occur for other user settings, for example language settings, dark-mode preferences, or adding items to a cart. They can also occur when only a single tab is involved:

- Let's say the user visits `https://site.example/product`.
- `https://site.example.com/product` prerenders `https://site.example.com/cart`. It prerenders with 0 items in the cart.
- The user clicks on the "Add to cart" buttons, which initiates a fetch request to add the item to the user's cart (with no page reload).
- The user clicks on the link to `https://site.example.com/cart`, which activates the prerendered page.
- The user sees an empty cart, even though they just added something to it.

The best mitigation for these cases, and indeed any time when content can get out of sync with the server, is for pages to refresh themselves as needed. For example, a server might use the Broadcast Channel API, or another mechanism such as `fetch()` or a `WebSocket`. Pages can then update themselves appropriately, including speculatively loaded pages that have not yet been activated.

Where refreshes are not possible, speculations can be cleared using the `Clear-Site-Data` response header with the `Clear-Site-Data#prefetchCache` or `Clear-Site-Data#prerenderCache` values (or both) as appropriate.

The header can be returned on any same-site HTTP request (such as an `/api/add-to-cart` API call).

## Session history behavior for prerendered documents

Activating a prerendering/prerendered document behaves like any conventional navigation, from the end-user perspective. The activated document is displayed in the tab and appended to session history, and any existing forward history entries are pruned. Any navigations taking place within the prerendering browsing context _before_ activation do not affect the session history.

From the developer's perspective, a prerendering document can be thought of as having a **trivial session history** where only one entry — the current entry — exists. All navigations within the prerendering context are effectively replaced.

While API features that operate on session history (for example `History` and `Navigation`) can be called within prerendering documents, they only operate on the context's trivial session history. Consequently, prerendering documents do not take part in their referring page's joint session history. For example, they cannot navigate their referrer via `History.back()`.

This design ensures that users get the expected experience when using the back button — i.e., that they are taken back to the last thing they saw. Once a prerendering document is activated, only a single session history entry gets appended to the joint session history, ignoring any previous navigations that happened within the prerendering browsing context. Going back one step in the joint session history — for example, by pressing the back button — takes the user back to the referrer page.
