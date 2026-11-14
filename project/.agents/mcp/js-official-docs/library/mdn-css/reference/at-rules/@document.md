---
title: "`@document` CSS at-rule"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@document/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `@document` CSS at-rule

The **`@document`** CSS at-rule restricts the style rules contained within it based on the URL of the document. It is designed primarily for user-defined style sheets (see userchrome.org for more information), though it can be used on author-defined style sheets, too.

## Syntax

```css
@document url("https://www.example.com/")
{
  h1 {
    color: green;
  }
}
```

An `@document` rule can specify one or more matching functions. If any of the functions apply to a given URL, the rule will take effect on that URL. The functions available are:

- `url()`
    Matches an exact URL.
- `url-prefix()`
    Matches if the document URL starts with the value provided.
- `domain()`
    Matches if the document URL is on the domain provided (or a subdomain of it).
- `media-document()`
    Matches the media according to the string in parameter, one of `video`, `image`, `plugin` or `all`.
- `regexp()`
    Matches if the document URL is matched by the regular expression provided. The expression must match the entire URL.

The values provided to the `url()`, `url-prefix()`, `domain()`, and `media-document()` functions can be optionally enclosed by single or double quotes. The values provided to the `regexp()` function _must_ be enclosed in quotes.

Escaped values provided to the `regexp()` function must additionally be escaped from the CSS. For example, a `.` (period) matches any character in regular expressions. To match a literal period, you would first need to escape it using regular expression rules (to `\.`), then escape that string using CSS rules (to `\\.`).

`@document` is currently only supported in Firefox; if you wanted to replicate using such functionality in your own non-Firefox browser, you could try using this polyfill by @An-Error94, which uses a combination of a user script, data-\* attributes, and attribute selectors.

> **Note:**
> There is a -moz-prefixed version of this property — `@-moz-document`. This has been limited to use only in user and UA sheets in Firefox 59 in Nightly and Beta — an experiment designed to mitigate potential CSS injection attacks (See Firefox bug 1035091).

## Formal syntax

```plain
@document [ <url>                    |
            url-prefix(<string>)     |
            domain(<string>)         |
            media-document(<string>) |
            regexp(<string>)
          ]# {
  <group-rule-body>
}
```

## Examples

### Specifying document for CSS rule

```css
@document url("http://www.w3.org/"),
          url-prefix("http://www.w3.org/Style/"),
          domain("mozilla.org"),
          media-document("video"),
          regexp("https:.*") {
  /* CSS rules here apply to:
     - The page "http://www.w3.org/"
     - Any page whose URL begins with "http://www.w3.org/Style/"
     - Any page whose URL's host is "mozilla.org"
       or ends with ".mozilla.org"
     - Any standalone video
     - Any page whose URL starts with "https:" */

  /* Make the above-mentioned pages really ugly */
  body {
    color: purple;
    background: yellow;
  }
}
```

## Specifications

Initially in Level 3, `@document` was postponed to Level 4, but then subsequently removed.

## See also

- Per-site user style sheet rules on the www-style mailing list.
