---
title: "Handling whitespace (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/text/whitespace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Handling whitespace (part 2 of 2)

## Solving common problems with whitespace nodes

Whitespace nodes are invisible to the website visitor due to the CSS processing rules, but they can interfere with certain layouts and DOM manipulation that rely on the exact structure of the DOM. Let's look at some common problems and how to solve them.

### Whitespace processing between inline and inline-block elements

Let's look at one layout issue with whitespace nodes: spaces between inline and inline-block elements. As we saw earlier with inline and block elements, most whitespace characters are ignored, but word-separating characters like spaces remain. The extra whitespace that does make it to the layout is helpful to separate the words in the sentence.

With `inline-block` elements, it gets more interesting: these elements behave like inline elements on the outside and blocks on the inside. (They're often used to display more complex pieces of UI, placed side by side on the same line, such as navigation menu items.) Any whitespace between adjacent inline or inline-block elements will result in spaces in the layout, just like the spaces between words in text. (This can surprise developers because they are blocks, and blocks don't normally show extra spaces.)

Consider this example (as before, we've included a comment in the HTML code to show the whitespace characters):

```css
.people-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.people-list li {
  display: inline-block;
  width: 2em;
  height: 2em;
  background: #ff0066;
  border: 1px solid;
}
```

```html
<ul class="people-list">
  <li></li>

  <li></li>

  <li></li>

  <li></li>

  <li></li>
</ul>

<!--
<ul class="people-list">⏎
◦◦<li></li>⏎
⏎
◦◦<li></li>⏎
⏎
◦◦<li></li>⏎
⏎
◦◦<li></li>⏎
⏎
◦◦<li></li>⏎
</ul>
-->
```

This renders as follows:

You probably don't want the gaps between the blocks. Depending on your use case (such as a list of avatars or a horizontal row of navigation buttons), you probably want the elements to flush against each other, and to be able to control any spacing yourself.

The Firefox DevTools HTML Inspector can highlight text nodes and also show you exactly the area the elements are taking up. This is useful to check out if you suspect there's extra margin or unexpected whitespace causing gaps.

There are a few ways of getting around this problem:

- Use Flexbox to create the horizontal list of items instead of trying an `inline-block` solution. Flexbox handles spacing and alignment for you, and is definitely the preferred solution:

  ```css
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  ```

- If you need to rely on `inline-block`, you could set the `font-size` of the list to `0`. This only works if the blocks are not sized with `em` units (since `em` is based on `font-size`, the block size would also end up being sized as `0`). Using `rem` units would be a good choice here:

  ```css
  ul {
    font-size: 0;
    /* … */
  }

  li {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    /* … */
  }
  ```

- Alternatively, you could set negative margin on the list items:

  ```css
  li {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin-right: -0.25rem;
  }
  ```

- You can also solve this problem by avoiding whitespace nodes between `` items:

  ```html
  <li>
    ...
  </li><li>
    ...
  </li>
  ```

### Working with whitespace in the DOM

As mentioned previously, whitespace is collapsed and trimmed when rendered, but preserved in the DOM. This may present some pitfalls when trying to do DOM manipulation in JavaScript. For example, if you have a reference to a parent node and want to manipulate its first element child using `Node.firstChild`, a rogue whitespace node just after the opening parent tag will give you the wrong result. The text node would be selected instead of the element you want to target.

As another example, if you want to do something to a subset of elements based on whether they are empty (have no child nodes), you could use `Node.hasChildNodes()`. But if any of those elements contain text nodes, you could end up with false results.

The following JavaScript code shows several functions that deal with whitespace in the DOM:

```js
/**
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use JavaScript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 */

/**
 * Determine whether a node's text content is entirely whitespace.
 *
 * @param nod  A node implementing the `CharacterData` interface (i.e.,
 *             a `Text`, `Comment`, or `CDATASection` node)
 * @return     `true` if all of the text content of `nod` is whitespace,
 *             otherwise `false`.
 */
function isAllWs(nod) {
  return !/[^\t\n\r ]/.test(nod.textContent);
}

/**
 * Determine if a node should be ignored by the iterator functions.
 *
 * @param nod  An object implementing the `Node` interface.
 * @return     `true` if the node is:
 *                1) A `Text` node that is all whitespace
 *                2) A `Comment` node
 *             and otherwise `false`.
 */
function isIgnorable(nod) {
  return (
    nod.nodeType === 8 || // a comment node
    (nod.nodeType === 3 && isAllWs(nod))
  ); // a text node, all ws
}

/**
 * Version of `previousSibling` that skips nodes that are entirely
 * whitespace or comments. (Normally `previousSibling` is a property
 * of all DOM nodes that gives the sibling node, the node that is
 * a child of the same parent, that occurs immediately before the
 * reference node.)
 *
 * @param sib  The reference node.
 * @return     The closest previous sibling to `sib` that is not
 *             ignorable according to `isIgnorable`, or `null` if
 *             no such node exists.
 */
function nodeBefore(sib) {
  while ((sib = sib.previousSibling)) {
    if (!isIgnorable(sib)) {
      return sib;
    }
  }
  return null;
}

/**
 * Version of `nextSibling` that skips nodes that are entirely
 * whitespace or comments.
 *
 * @param sib  The reference node.
 * @return     The closest next sibling to `sib` that is not
 *             ignorable according to `isIgnorable`, or `null`
 *             if no such node exists.
 */
function nodeAfter(sib) {
  while ((sib = sib.nextSibling)) {
    if (!isIgnorable(sib)) {
      return sib;
    }
  }
  return null;
}

/**
 * Version of `lastChild` that skips nodes that are entirely
 * whitespace or comments. (Normally `lastChild` is a property
 * of all DOM nodes that gives the last of the nodes contained
 * directly in the reference node.)
 *
 * @param sib  The reference node.
 * @return     The last child of `sib` that is not ignorable
 *             according to `isIgnorable`, or `null` if no
 *             such node exists.
 */
function lastChild(par) {
  let res = par.lastChild;
  while (res) {
    if (!isIgnorable(res)) {
      return res;
    }
    res = res.previousSibling;
  }
  return null;
}

/**
 * Version of `firstChild` that skips nodes that are entirely
 * whitespace and comments.
 *
 * @param sib  The reference node.
 * @return     The first child of `sib` that is not ignorable
 *             according to `isIgnorable`, or `null` if no
 *             such node exists.
 */
function firstChild(par) {
  let res = par.firstChild;
  while (res) {
    if (!isIgnorable(res)) {
      return res;
    }
    res = res.nextSibling;
  }
  return null;
}

/**
 * Version of `data` that doesn't include whitespace at the beginning
 * and end and normalizes all whitespace to a single space. (Normally
 * `data` is a property of text nodes that gives the text of the node.)
 *
 * @param txt  The text node whose data should be returned
 * @return     A string giving the contents of the text node with
 *             whitespace collapsed.
 */
function dataOf(txt) {
  let data = txt.textContent;
  data = data.replace(/[\t\n\r ]+/g, " ");
  if (data[0] === " ") {
    data = data.substring(1, data.length);
  }
  if (data[data.length - 1] === " ") {
    data = data.substring(0, data.length - 1);
  }
  return data;
}
```

The following code demonstrates the use of the functions above. It iterates over the children of an element (whose children are all elements) to find the one whose text is `"This is the third paragraph"`, and then changes the class attribute and the contents of that paragraph.

```js
let cur = firstChild(document.getElementById("test"));
while (cur) {
  if (dataOf(cur.firstChild) === "This is the third paragraph.") {
    cur.className = "magic";
    cur.firstChild.textContent = "This is the magic paragraph.";
  }
  cur = nodeAfter(cur);
}
```
