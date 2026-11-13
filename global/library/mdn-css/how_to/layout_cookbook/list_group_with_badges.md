---
title: "List group with badges"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/how_to/layout_cookbook/list_group_with_badges/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# List group with badges

In this recipe we will create a list group pattern with badges that indicate a count.

## Requirements

The list items should be displayed with the badges. The badge should be aligned right and vertically centered. The badge must be centered vertically whether there is a single line of content or multiple lines of text.

## Recipe

Click "Play" in the code blocks below to edit the example in the MDN Playground:

```html
<ul class="list-group">
  <li>
    Item One
    <span class="badge">2</span>
  </li>
  <li>
    Item Two
    <span class="badge">10</span>
  </li>
  <li>
    Item Three
    <span class="badge">9</span>
  </li>
  <li>
    Item Four
    <span class="badge">0</span>
  </li>
</ul>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
  padding: 0;
  margin: 1em;
}
.list-group {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #cccccc;
  border-radius: 0.5em;
  width: 20em;
}

.list-group li {
  border-top: 1px solid #cccccc;
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-group li:first-child {
  border-top: 0;
}

.list-group .badge {
  background-color: rebeccapurple;
  color: white;
  font-weight: bold;
  font-size: 80%;
  border-radius: 10em;
  min-width: 1.5em;
  padding: 0.25em;
  text-align: center;
}
```

## Choices made

Flexbox makes this particular pattern straightforward and also facilitates making changes to the layout.

To ensure the text and badge line up correctly, I use the `justify-content` property with a value of `space-between`. This places any extra space between the items. In the live example, if you remove this property, you will see the badge move to the end of the text on items with text shorter than the one line.

To align the content horizontally, I use the `align-items` property to align the text and badge on the cross axis. If you want the badge to align to the top of the content instead, change this to `align-items: flex-start`.

## See also

- Box alignment in flexbox
- Aligning items in a flex container
- CSS flexible box layout module
