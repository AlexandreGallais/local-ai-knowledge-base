---
title: "`<script type=\"speculationrules\">` HTML attribute value (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/script/type/speculationrules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<script type="speculationrules">` HTML attribute value

The **`speculationrules`** value of the `type` attribute of the `<script>` element indicates that the body of the element contains speculation rules.

Speculation rules take the form of a JSON structure that determine what resources should be prefetched or prerendered by the browser. This is part of the `Speculation Rules API`.

> **Note:**
> Speculation rules can be defined inside external text files referenced by the `Speculation-Rules` HTTP header, using the same JSON representation provided below. Specifying an HTTP header is useful in cases where developers are not able to directly modify the document itself.

## Syntax

```html
<script type="speculationrules">
  // JSON object defining rules
</script>
```

> **Note:**
> The `src`, `async`, `nomodule`, `defer`, `crossorigin`, `integrity`, and `referrerpolicy` attributes must not be specified.

### Exceptions

- `TypeError`
    The speculation rules definition is not a valid JSON object.

## Description

A `<script type="speculationrules">` element must contain a valid JSON structure that defines speculation rules. The following examples show separate prefetch and prerender rules:

```html
<script type="speculationrules">
  {
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

```html
<script type="speculationrules">
  {
    "prerender": [
      {
        "where": { "href_matches": "/next" },
        "eagerness": "eager"
      }
    ]
  }
</script>
```

### Speculation rules JSON representation

The JSON structure contains one or more fields at the top level, each one representing an action to define speculation rules for. At present the supported actions are:

- `"prefetch"` (optional) (experimental)
    Rules for potential future navigations that should have their associated document response body downloaded, leading to significant performance improvements when those documents are navigated to. Note that none of the subresources referenced by the page are downloaded.
- `"prerender"` (optional) (experimental)
    Rules for potential future navigations that should have their associated documents fully downloaded, rendered, and loaded into an invisible tab. This includes loading all subresources, running all JavaScript, and even loading subresources and performing data fetches started by JavaScript. When those documents are navigated to, navigations will be instant, leading to major performance improvements.

> **Note:**
> Consult the Speculation Rules API main page for full details on how to use prefetch and prerender effectively.

Each action field contains an array, which in turn contains one or more objects. Each object contains a single rule defining a set of URLs and related parameters.

Each object can contain the following properties:

- `"source"` (experimental)
    A string indicating the source of the URLs to which the rule applies. This is optional because the value can always be inferred from other properties.

    This can be one of:
    - `"document"`
        Specifies that the URLs will be matched from navigation links in the associated document (as defined in `` and `<area>` elements), based on the conditions described by a `"where"` key. Note that the presence of a `"where"` key <example-value> `"source": "document"`, so it is optional.
    - `"list"`
        Specifies that the URLs will come from a list, specified in the `"urls"` key. Note that the presence of a `"urls"` key <example-value> `"source": "list"`, so it is optional.

- `"urls"` (experimental)
    An array of strings representing a list of URLs to apply the rule to. These can be absolute or relative URLs. Relative URLs will be parsed relative to the document base URL (if inline in a document) or relative to the external resource URL (if externally fetched). `"urls"` and `"where"` cannot both be set in the same rule.

- `"where"` (experimental)
    An object representing the conditions by which the rule matches URLs contained in the associated document. Effectively, the `"where"` object represents a test that is performed on every link on the page to see whether the speculation rule is applied to it. `"where"` and `"urls"` cannot both be set in the same rule.

    This object can contain exactly one of the following properties:
    - `"href_matches"`
        A string containing a URL pattern, or an array containing multiple URL pattern strings, which follow the standard URL Pattern API syntax. Links in the document whose URLs match the pattern(s) will have the rule applied.
    - `"relative_to"`
        In the case of an `"href_matches"` condition, this can specify where you want that condition to be matched relative to. This works in exactly the same way as the rule-level `"relative_to"` key, except that it only affects a single `"href_matches"` condition inside a `"where"` key.
    - `"selector_matches"`
        A string containing a CSS selector, or an array containing multiple CSS selectors. Links in the document matched by those selectors will have the rule applied.
    - `"and"`
        An array containing one or more objects containing conditions (`"href_matches"`, `"selector_matches"`, `"and"`, `"not"`, or `"or"`), all of which must match for the rule to be applied to them.
    - `"not"`
        An object containing one condition (`"href_matches"`, `"selector_matches"`, `"and"`, `"not"`, or `"or"`) which, if it matches, will _not_ have the rule applied to it. All links that _do not_ match the condition _will_ have the rule applied.
    - `"or"`
        An array containing one or more objects containing conditions (`"href_matches"`, `"selector_matches"`, `"and"`, `"not"`, or `"or"`), any of which can match for the rule to be applied to them.

    `"where"` conditions can be nested multiple levels deep to create complex conditions, or you can choose to split them into separate rules to keep them simple. See where examples for more explanation, and multiple examples of use.

- `"eagerness"` (experimental)
    A string providing a hint to the browser as to how eagerly it should prefetch/prerender link targets in order to balance performance advantages against resource overheads. Possible values are:
    - `"immediate"`
        The author thinks the link is very likely to be followed, and/or the document may take significant time to fetch. Prefetch/prerender should start as soon as possible, subject only to considerations such as user preferences and resource limits.
    - `"eager"`
        The author wants to prefetch/prerender a large number of navigations, as early as possible. Prefetch/prerender should start on any slight suggestion that a link may be followed. For example, the user could move their mouse cursor towards the link, hover/focus it for a moment, or pause scrolling with the link in a prominent place.
    - `"moderate"`
        The author is looking for a balance between `eager` and `conservative`. Prefetch/prerender should start when there is a reasonable suggestion that the user will follow a link in the near future. For example, the user could scroll a link into the viewport and hover/focus it for some time.
    - `"conservative"`
        The author wishes to get some benefit from speculative loading with a fairly small tradeoff of resources. Prefetch/prerender should start only when the user is starting to click on the link, for example on `mousedown` or `pointerdown`.

    If `"eagerness"` is not explicitly specified, list (`"urls"`) rules default to `immediate` and document (`"where"`) rules default to `conservative`. The browser takes this hint into consideration along with its own heuristics, so it may select a link that the author has hinted as less eager than another, if the less eager candidate is considered a better choice.

- `"expects_no_vary_search"` (experimental)
    A string providing a hint to the browser as to what `No-Vary-Search` header value will be set on responses for documents that it is receiving prefetch/prerender requests for. The browser can use this to determine ahead of time whether it is more useful to wait for an existing prefetch/prerender to finish, or start a new fetch request when the speculation rule is matched. See the `"expects_no_vary_search"` example for more explanation of how this can be used.

- `"referrer_policy"` (experimental)
    A string representing a specific referrer policy string to use when requesting the URLs specified in the rule — see `Referrer-Policy` for possible values. The purpose of this is to allow the referring page to set a stricter policy specifically for the speculative request than the policy the page already has set (either by default, or by using `Referrer-Policy`).

    > **Note:**
    > A cross-site prefetch requires a referrer policy that is at least as strict as the default `"strict-origin-when-cross-origin"` value — so `"strict-origin-when-cross-origin"`, `"same-origin"`, `"strict-origin"`, or `"no-referrer"`. A laxer policy set in the speculation rules will override a stricter policy set on the referring page as long as it is still sufficiently strict for the cross-site case.

    > **Note:**
    > In the case of document rules, the matched link's specified referrer policy (e.g., using the `referrerpolicy` attribute) will be used, unless the rule specifies a policy that overrides it.

- `"relative_to"` (experimental)
    A string specifying where you want links matched by URL to be matched relative to. The value can be one of:
    - `document`
        URLs should be matched relative to the document the speculation rules are being set on.
    - `ruleset`
        URLs should be matched relative to the file the rules are specified in. This is the default value.

    This key <example-value> is only relevant for rules defined in an external file (set using the `Speculation-Rules` header). When rules are specified inside the same document they are being set for (i.e., in an inline `<script>` element), it makes no difference.

- `"requires"` (experimental)
    An array of strings representing capabilities of the browser parsing the rule, which must be available if the rule is to be applied to the specified URLs.

    > **Warning:**
    > Prefetches will automatically fail in browsers that cannot meet a specified requirement, even if they support the Speculation Rules API.

    Possible values are:
    - `"anonymous-client-ip-when-cross-origin"`
        (prefetch-only) Specifies that the rule matches only if the user agent can prevent the client IP address from being visible to the origin server if a cross-origin prefetch request is issued. Exactly how this works is dependent on browser implementation specifics. For example:
        - Chrome's implementation hides the IP address using a Google-owned proxy, therefore by default it only works for Google-controlled referrers (since in that case, sending the URLs of the destination to Google is not an additional privacy leak). When used on a non-Google-owned site, rules that include this will only match for users that turn on "Enhanced preloading" in `chrome://settings/preloading`.
        - Other Chromium-based browsers will have to provide their own solutions. Thorough testing in all target browsers is advised.
        - A future Safari implementation may possibly use something along the lines of iCloud Private Relay.
        - A future Firefox implementation might use something based on the Mozilla VPN product.

- `"tag"` (experimental)
    A string used to identify a rule or ruleset. This will be included in the `Sec-Speculation-Tags` request header for any speculations covered by that rule.

- `"target_hint"` (experimental)
    A string indicating where the page expects the prerendered content to be activated.
    The directive not supported for prefetch speculations.
    Allowed values are:
    - `"target_hint": "_blank"`
        Open rerendered content in a new page.
    - `"target_hint": "_self"`
        Open rerendered content in the current page.
        This is the default, if not specified.

> **Note:**
> As speculation rules use a `<script>` element, they need to be explicitly allowed in the `Content-Security-Policy` `script-src` directive if the site includes it. This is done by adding the `"inline-speculation-rules"` value along with a hash- or nonce-source.
