---
title: "`<script type=\"speculationrules\">` HTML attribute value (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/script/type/speculationrules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<script type="speculationrules">` HTML attribute value (part 2 of 2)

## Examples

### Prefetch and prerender in the same set of rules

The basic <example-value> shown in the description section included separate speculation rules defined for prefetch and prerender. It is possible to define both in a single set of rules:

```html
<script type="speculationrules">
  {
    "prefetch": [
      {
        "urls": ["next.html", "next2.html"],
        "requires": ["anonymous-client-ip-when-cross-origin"],
        "referrer_policy": "no-referrer"
      }
    ],
    "prerender": [
      {
        "where": { "selector_matches": ".product-link" },
        "eagerness": "eager"
      }
    ]
  }
</script>
```

> **Note:**
> This code snippet provides a list (`"urls"`) rule and a document (`"where"`) rule example.

### Multiple rule sets

It is also allowable to include multiple sets of rules in a single HTML file:

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
<script type="speculationrules">
  {
    "prerender": [
      {
        "where": { "selector_matches": ".product-link" },
        "eagerness": "eager"
      }
    ]
  }
</script>
```

And multiple rules in a single result set:

```html
<script type="speculationrules">
  {
    "prerender": [
      {
        "urls": ["one.html"]
      },
      {
        "urls": ["two.html"]
      }
    ]
  }
</script>
```

### Dynamic rule insertion

Below is an example that feature detects speculation rules and, if supported, dynamically adds a prerender speculation rule via JavaScript:

```js
if (
  HTMLScriptElement.supports &&
  HTMLScriptElement.supports("speculationrules")
) {
  const specScript = document.createElement("script");
  specScript.type = "speculationrules";
  const specRules = {
    prerender: [
      {
        urls: ["/next.html"],
      },
    ],
  };
  specScript.textContent = JSON.stringify(specRules);
  console.log("added speculation rules to: next.html");
  document.body.append(specScript);
}
```

### `where` syntax examples

A document-sourced rule contains a `"where"` property, which is an object containing criteria that define which links in the document are matched. Effectively, the `"where"` object represents a test that is performed on every link on the page to see whether the speculation rule is applied to it.

The most basic <example-value> will match a single URL pattern or CSS selector:

```json
{ "where": { "href_matches": "/next" } }
```

```json
{ "where": { "selector_matches": ".important-link" } }
```

`"href_matches"` and `"selector_matches"` can also be set to an array of values, so multiple URL patterns or CSS selectors can be matched simultaneously:

```json
{ "where": { "href_matches": ["/next", "/profile"] } }
```

```json
{ "where": { "selector_matches": [".important-link", "#unique-link"] } }
```

URL patterns and selectors can also contain wildcard (`*`) characters, allowing a single value to match multiple URLs. For example, the object below could match `user/`, `user/settings`, `user/stats`, etc.

```json
{ "where": { "href_matches": "/user/*" } }
```

Search parameters (or query strings) can also be targeted in `href_matches`. For example, the object below could match all same-origin URLs with a `category` search parameter (as the first or a subsequent parameter):

```json
{ "where": { "href_matches": "/*\\?*(^|&)category=*" } }
```

Any condition can be negated by placing it inside a `"not"` condition — this means that, when matched, a link _won't_ have the speculation rule applied to it, but when _not_ matched, it _will_. The following example will cause all links that _don't_ match the URL pattern `/logout` to have the rule applied to them, but not links that match `/logout`:

```json
{ "where": { "not": { "href_matches": "/logout" } } }
```

#### Combining multiple `"where"` conditions with `"and"` or `"or"`

Multiple conditions can be combined inside `"and"` or `"or"` conditions — these take the value of arrays containing multiple conditions, all or any of which (respectively) have to match for the speculation rules to apply to a link. Using `"and"` or `"or"`, conditions can be nested multiple levels deep — there is no specified limit on allowed nesting levels.

It is useful to think of the `"where"` object as being equivalent to an `if` statement. So

```plain
{ and: [A, B, { or: [C, { not: D }] }] }
```

is equivalent to

```plain
if (A && B && (C || !D)) {
  apply speculation rule
}
```

In the following complete speculation rule example, all same-origin pages are marked for prefetching except those known to be problematic — the `/logout` page, and any links marked up with a class of `.no-prerender`:

```html
<script type="speculationrules">
  {
    "prefetch": [
      {
        "where": {
          "and": [
            { "href_matches": "/*" },
            { "not": { "href_matches": "/logout" } },
            { "not": { "selector_matches": ".no-prerender" } }
          ]
        }
      }
    ]
  }
</script>
```

> **Note:**
> The `where` pattern above does not include cross-site links, which are supported for prefetching (provided the user has no cookies set for the destination site, to protect against tracking) but not for prerendering.

### `"relative_to"` example

For rule sets that are externally fetched (i.e., via the `Speculation-Rules`) response header, URLs in list rules and URL patterns in document rules are parsed relative to the containing external text file's URL by default. To parse URLs in a list rule relative to the document's base URL, `"relative_to"` is used like this:

```json
{
  "urls": ["/home", "/about"],
  "relative_to": "document"
}
```

For document rules, `"relative_to"` can be paired directly with `"href_matches"` and the document's base URL would only be used for patterns in that particular condition:

```json
{
  "where": {
    "or": [
      { "href_matches": "/home", "relative_to": "document" },
      { "href_matches": "/about" }
    ]
  }
}
```

In the above example, only the first `"href_matches"` will be matched relative to the document's base URL.

`relative_to` is mainly relevant if the speculation rules JSON file is on a different origin to the document you wish to apply them to:

1. If the document is located at `https://example.com/some/subpage.html` and the rules are at `https://example.com/resources/rules.json`, then `/home` always equates to `https://example.com/home` regardless of whether `relative_to` is set to `document` or `ruleset`.

2. However, if the document is located at `https://example.com/some/subpage.html` and the rules are at `https://other.example/resources/rules.json` (for example, on a third-party or cookieless resource origin), then:
   - `"relative_to": "document"` will cause `/home` to equate to `https://example.com/home`.
   - `"relative_to": "ruleset"` will cause `/home` to equate to `https://other.example/home`.

   This is the typical use case for `"relative_to"`.

3. Another potential (but rarer) use case is when your URLs are specified in the form `home` instead of `/home`. If the document is located at `https://example.com/some/subpage.html` and the rules are at `https://example.com/resources/rules.json`, then:
   - `"relative_to": "document"` would cause `home` to equate to `https://example.com/some/home`.
   - `"relative_to": "ruleset"` would cause `home` to equate to `https://example.com/resources/home`.

### `"expects_no_vary_search"` example

Consider the case of a user directory landing page, `/users`, which has an `id` parameter added to bring up information on a specific user, for example `/users?id=345`. Whether this URL should be considered identical for caching purposes depends on the behavior of the application:

1. If this parameter has the effect of loading a completely new page containing the information for the specified user, then the URL should be cached separately.
2. If this parameter has the effect of highlighting the specified user on the same page, and perhaps revealing a pullout panel displaying their data, then the URL should be considered the same for caching purposes. This could result in performance improvements around the loading of the user pages and could be achieved via a `No-Vary-Search` with a value of `params=("id")`.

How does this affect speculation rules? Consider the following code:

```html
<script type="speculationrules">
  {
    "prefetch": [
      {
        "urls": ["/users"]
      }
    ]
  }
</script>
<a href="/users?id=345">User Bob</a>
```

What would happen in this case when the user starts a navigation to `/users?id=345` when the headers for the prefetch of `/users` have not been received yet? At this point, the browser doesn't know what the `No-Vary-Search` value will be, if anything. If there was no `No-Vary-Search` value set, and the application behavior was more like Option 1 above, the prefetch would be wasted and the browser would need to go and fetch the separate `/users?id=345` page from scratch.

To solve this, we can provide a hint as to what the page author expects the `No-Vary-Search` value to be. A speculation rule can have an `"expects_no_vary_search"` field, which contains a string representation of the expected header value:

```html
<script type="speculationrules">
  {
    "prefetch": [
      {
        "urls": ["/users"],
        "expects_no_vary_search": "params=(\"id\")"
      }
    ]
  }
</script>
<a href="/users?id=345">User Bob</a>
```

This indicates that Option 2 described above is what the server is expected to produce. If a navigation starts while there is an ongoing prefetch of `/users`, this informs the browser that it is appropriate to wait for the prefetch, instead of immediately starting another fetch for `/users?id=345`.

Document rules can also be used in conjunction with `"expects_no_vary_search"`, depending on the pattern used. For example, in the case of:

```html
<script type="speculationrules">
  {
    "prefetch": [
      {
        { "where": { "href_matches": "/users?id=*" } },
        "expects_no_vary_search": "params=(\"id\")"
      }
    ]
  }
</script>
<a href="/users?id=012">User Bill</a>
<a href="/users?id=345">User Bob</a>
<a href="/users?id=678">User Ben</a>
```

If a link is hovered over, the browser will start prefetching that specific link.

If the user hovers over another link before the prefetch completes, the `expects_no_vary_search` pattern tells the browser that there is no need to cancel the current prefetch, because all `/users` URLs with `id` URL parameter values effectively point to the same page for this context (and for caching purposes).

> **Warning:**
> Additional care must be taken when using prerender with `No-Vary-Search` since the page may initially be prerendered with different URL parameters. `No-Vary-Search` is used for URL parameters that deliver the same resource from the server, but are used by the client for various reasons (client-side rendering, UTM parameters for analytics measurement, etc.). As the initial prerender may be for different URL parameters, any code depending on them should only run after prerender activation.

Multiple params can be provided in a space-separated array:

```html
<script type="speculationrules">
  {
    "prefetch": [
      {
        { "where": { "href_matches": "/users?id=*" } },
        "expects_no_vary_search": "params=(\"id\" \"order\" \"lang\")"
      }
    ]
  }
</script>
```

> **Note:**
> As a structured field, the parameters should be space-separated, quoted strings — as shown above — and not comma-separated, which developers may be more used to.

### `eagerness` example

The following set of document rules shows how `eagerness` can be used to hint at the eagerness with which the browser should prerender each matching set of links.

```html
<script type="speculationrules">
  {
    "prerender": [
      {
        "where": { "href_matches": "/*" },
        "eagerness": "conservative"
      },
      {
        "where": { "selector_matches": ".product-link" },
        "eagerness": "eager"
      }
    ]
  }
</script>
```

Here we are hinting that:

- All same-site links contained in the document should be conservatively prerendered (i.e., when the user starts to activate them).
- Any product links (in this case, those with a `class` of `.product-link`) in the document should be eagerly prerendered (i.e., if the user makes any kind of move towards navigating to them).

> **Note:**
> The effects of eagerness settings are less useful for list rules. By default, list rule URLs are prefetched/prerendered immediately as soon as the rules are parsed, which is what you'd expect — they are intended for explicit listing of high-priority URLs that you want to make available as soon as possible. For this reason, `eager` has the same effect as `immediate` in current implementations. Lower eagerness settings are for prefetching/prerendering when links are interacted with, and for these you are more likely to use document rules to find them on the page.

### `tag` example

A `tag` can be included at the top level, to identify the overall ruleset:

```html
<script type="speculationrules">
  {
    "tag": "my-rules",
    "prerender": [
      {
        "where": { "href_matches": "/*" },
        "eagerness": "conservative"
      }
    ]
  }
</script>
```

Or to identify individual rules:

```html
<script type="speculationrules">
  {
    "prefetch": [
      "tag": "my-prefetch-rule",
      "urls": ["next.html"]
    ],
    "prerender": [
      "tag": "my-prerender-rule",
      "urls": ["next2.html"]
    ],
  }
</script>
```

See `Sec-Speculation-Tags` for more examples.

### `target_hint` example

A `target_hint` can be included to indicate the target window in which matching prerender speculations will be opened:

```html
<script type="speculationrules">
  {
    "tag": "my-rules",
    "prerender": [
      {
        "eagerness": "eager",
        "target_hint": "_blank",
        "urls": ["page2.html"]
      }
    ]
  }
</script>
```

The rules above allow the following links to be prerendered correctly in the appropriate targets:

```html
<a href="page1.html">Open link in this window</a>
<a target="_blank" href="page2.html">Open link in new window</a>
```

`target_hint` is only needed for list rules, which use `urls`.
They are not needed for document rules (which use `where`) since in these the target can be known from the `target` attribute of the `` link element.

## See also

- Prerender pages in Chrome for instant page navigations on developer.chrome.com
- Speculative loading
- Speculation Rules API
