---
title: "Text: wholeText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/text/wholetext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Text: wholeText property

The read-only **`wholeText`** property of the `Text` interface
returns the full text of all `Text` nodes logically adjacent to the node.
The text is concatenated in document order.
This allows specifying any text node and obtaining all adjacent text as a single string.

> **Note:**
> This is similar to calling `Node.normalize()` followed by reading the text value,
> but without modifying the tree.

## Value

A string with the concatenated text.

## Example

Suppose you have the following simple paragraph within your webpage:

```html
<p>
  Through-hiking is great!
  <strong>No insipid election coverage!</strong> However,
  <a href="https://en.wikipedia.org/wiki/Absentee_ballot">casting a ballot</a>
  is tricky.
</p>
```

You decide you don't like the middle sentence, so you remove it:

```js
const paragraph = document.querySelector("p"); // Reads the paragraph
paragraph.removeChild(paragraph.childNodes[1]); // Delete the strong element
```

Now you end up with _"Through-hiking is great! However, casting a ballot is tricky."_, with two nodes before the hyperlink:

1. A `Text` containing the string `"Through-hiking is great!"`
2. A second `Text` node containing the string `" However, "`

To get those two nodes at once, you would call `paragraph.childNodes[0].wholeText`:

```js
console.log(`'${paragraph.childNodes[0].wholeText}'`); // 'Through-hiking is great!   However, '
```

## See also

- The `Text` interface it belongs to.
