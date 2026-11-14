---
title: "`enterkeyhint` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/enterkeyhint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `enterkeyhint` HTML global attribute

The **`enterkeyhint`** global attribute
is an enumerated attribute defining what action label (or icon) to present for the enter key on virtual keyboards.

```html
<input enterkeyhint="go" />

<p contenteditable enterkeyhint="go">https://example.org</p>
```

## Description

Form controls (such as `<textarea>`
or `` elements) or elements using
`contenteditable` can specify an
`inputmode` attribute to control what kind of virtual keyboard
will be used. To further improve the user's experience, the enter key can be customized specifically by providing an `enterkeyhint`
attribute indicating how the enter key <example-value> be labeled (or which icon should be shown). The enter key <example-value>
represents what the user should do next; typical actions are: sending text, inserting a new line, or searching.

If no `enterkeyhint` attribute is provided, the user agent might use contextual information from the
`inputmode`,
`type`,
or `pattern`
attributes to display a suitable enter key label (or icon).

## Value

The `enterkeyhint` attribute is an enumerated attribute and only accepts the following values:

       | Value
       | Description
       | Example label (depends on user agent and user language)

       | `enterkeyhint="enter"`
       | Typically inserting a new line.
       | `return`, `↵`

       | `enterkeyhint="done"`
       | Typically meaning there is nothing more to input and the input method editor (IME) will be closed.
       | `done`, `✅`

       | `enterkeyhint="go"`
       | Typically meaning to take the user to the target of the text they typed.
       | `go`, `🡢`

       | `enterkeyhint="next"`
       | Typically taking the user to the next field that will accept text.
       | `next`, `⇥`

       | `enterkeyhint="previous"`
       | Typically taking the user to the previous field that will accept text.
       | `return`, `⇤`

       | `enterkeyhint="search"`
       | Typically taking the user to the results of searching for the text they have typed.
       | `search`, `🔍`

       | `enterkeyhint="send"`
       | Typically delivering the text to its target.
       | `send`

## See also

- `HTMLElement.enterKeyHint` property reflecting this attribute
- `inputmode` global attribute
- `contenteditable` global attribute
- `type` and
  `pattern` attributes on
  `` elements
