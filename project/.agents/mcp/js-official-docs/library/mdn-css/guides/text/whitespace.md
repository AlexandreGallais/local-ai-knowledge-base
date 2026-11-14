---
title: "Handling whitespace (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/text/whitespace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Handling whitespace

The presence of whitespace in the DOM can cause layout problems and make manipulation of the content tree difficult in unexpected ways, depending on where it is located. This article explores when difficulties can occur, and looks at what can be done to mitigate resulting problems.

## What is whitespace?

Whitespace characters consist of different characters in different programming language contexts. _Document white space characters_, as far as the CSS whitespace processing rules are concerned, only include spaces (U+0020), tabs (U+0009), line feeds (LF, U+000A), and carriage returns (CR, U+000D), where CR characters are equivalent to spaces in every regard. These characters allow you to format your code for readability. Much of our source code is full of these whitespace characters, and we tend to remove them only as part of a production build step to reduce file size.

Note that this list does not include non-breaking spaces (U+00A0, ` ` in HTML). So these characters don't trigger any collapsing, which is why they are often used to create longer spaces in HTML.

CSS also defines the concept of _segment breaks_, which in the context of HTML are equivalent to LF characters.

## How does HTML process whitespace?

It is a common myth that "HTML ignores whitespace", which is untrue: **HTML preserves all whitespace text content as you wrote them in the source code.** As a markup language, HTML produces a DOM where all whitespace in the text content is preserved, which can be retrieved and manipulated via DOM APIs such as `Node.textContent`. If HTML strips whitespace from the DOM, then CSS, a downstream rendering engine that works on the DOM, would not be able to preserve them using the `white-space` property.

> **Note:**
> To be clear, we're talking about whitespace _between HTML tags_, which becomes text nodes in the DOM. Any whitespace _inside a tag_ (between the angle brackets but not as part of an attribute value) is just part of the HTML syntax and does not appear in the DOM.

> **Note:**
> Due to the magic that is HTML parsing (quote from DOM spec), there do exist certain places where whitespace characters could be ignored. For example, whitespace between the `<html>` and `<head>` opening tags or between the `</body>` and `</html>` closing tags is ignored and does not appear in the DOM. Also, when parsing the `<pre>` element's text content, a single leading newline character gets stripped. We ignore these edge cases.
>
> Furthermore, the HTML parser does _normalize_ certain whitespaces: it replaces CR and CRLF sequences with a single LF. However, CR characters can also be inserted into the DOM either via character references or JavaScript, so the CSS whitespace processing rules still need to define how to handle them.

Take the following document, for example:

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>My Document</title>
  </head>
  <body>
    <h1>Header</h1>
    <p>Paragraph</p>
  </body>
</html>
```

The DOM tree for this looks like so:

Note that:

- Some text nodes will contain only whitespace.
- Other text nodes may have whitespace at the beginning or the end.

> **Note:**
> Firefox DevTools supports highlighting text nodes, enabling you to see exactly which nodes contain whitespace characters. Pure whitespace nodes are marked with a "whitespace" label.

Conserving whitespace characters in the DOM is useful in many ways, but it can also make certain layouts more difficult to implement and may cause problems for developers who want to iterate over DOM nodes. We'll look at these issues and some solutions later on, in the solving common problems with whitespace nodes section.

## How does CSS process whitespace?

When the DOM is passed to CSS for rendering, the whitespace is largely stripped by default. This means that the way your code is formatted is not visible to the end user—creating space around and inside elements is the job of CSS.

```html
<!doctype html>

  <h1>      Hello      World!     </h1>
```

This source code contains a couple of line feeds after the `doctype` and a bunch of space characters before, after, and inside the `<h1>` element. But the browser ignores these spaces and just shows the words "Hello World!" as if these characters didn't exist at all:

CSS ignores most, but not all, whitespace characters. In this example, one of the spaces between "Hello" and "World!" still exists when the page is rendered in a browser. CSS uses a specific algorithm to decide which whitespace characters are user-irrelevant and how they are removed or transformed. We'll explain how this processing works in the next few sections.

### Collapsing and transformation

Let's look at an example. To make the whitespace characters more salient, we've also added a comment to show all spaces as ◦, all tabs as ⇥, and all line breaks as ⏎:

```html
<h1>   Hello
				<span> World!</span>	  </h1>

<!--
<h1>◦◦◦Hello◦⏎
⇥⇥⇥⇥<span>◦World!</span>⇥◦◦</h1>
-->
```

This example is rendered in the browser like so:

The `<h1>` element contains:

- A text node (consisting of some spaces, the word "Hello", a line break, and some tabs).
- An inline element (``, which contains a space, and the word "World!").
- Another text node (with a tab and spaces after the ``).

Because this `<h1>` element contains only inline elements, it establishes an inline formatting context. This is one of the several layout rendering contexts that browser engines use to arrange content on the page.

Inside this inline formatting context, whitespace characters are processed as follows:

> **Note:**
> This algorithm can be configured via the `white-space-collapse` property (or its shorthand property `white-space`). We'll start by assuming its default value (`white-space-collapse: collapse`), then look at how different property values affect this algorithm.

1. First, all spaces and tabs immediately before and after a line break are ignored. So, if we take our example markup from before:

   ```html
   <h1>◦◦◦Hello◦⏎
   ⇥⇥⇥⇥<span>◦World!</span>⇥◦◦</h1>
   ```

   ...and apply this first rule, we get:

   ```html
   <h1>◦◦◦Hello⏎
   <span>◦World!</span>⇥◦◦</h1>
   ```

2. Next, consecutive line breaks are collapsed into a single line break. We don't have any in this example.
3. Next, lines in the source code are joined into single lines by removing any remaining line break characters. They are either transformed into spaces (U+0020) or simply removed, depending on the context before and after the break. The exact choice between the two is browser- and language-dependent. In our example here in English (where spaces separate words), we can expect all line breaks to be "transformed" into spaces. So we end up with:

   ```html
   <h1>◦◦◦Hello◦<span>◦World!</span>⇥◦◦</h1>
   ```

   Notably, in languages that have no word separators, such as Chinese, lines are joined with no intervening space. So:

   ```html
   <div>你好
   世界</div>
   ```

   might be rendered as "你好世界" without any spaces in between, depending on the browser's heuristics.

4. Next, all tab characters are transformed into space characters, so the example becomes:

   ```html
   <h1>◦◦◦Hello◦<span>◦World!</span>◦◦◦</h1>
   ```

5. After that, any space immediately following another space (even across two separate inline elements) is ignored, so we end up with:

   ```html
   <h1>◦Hello◦<span>World!</span>◦</h1>
   ```

This is why people visiting the web page will see the phrase "Hello World!" nicely written at the top of the page, rather than a weirdly indented "Hello" followed by an even more weirdly indented "World!" on the next line.

After these steps, the browser processes line wrapping and bidirectional text, which we will ignore here. Note that there are still spaces left after the opening `<h1>` tag and before the closing `</h1>` tag, but these are not rendered in the browser. We'll handle that next, as each line is laid out.

Different `white-space-collapse` values skip different steps of this algorithm:

- `preserve` and `break-spaces`: the whole algorithm is skipped, and no whitespace collapsing or transformation happens.
- `preserve-breaks`: steps 2 and 3 are skipped, and line breaks are preserved.
- `preserve-spaces`: the whole algorithm is skipped and replaced with a single step to convert each tab or line break into a space.

In a nutshell, different whitespace characters are collapsed and transformed in the following fashion:

- Tabs are generally converted to spaces.
- If segment breaks are to be collapsed:
  - Sequences of segment breaks are collapsed to a single segment break.
  - They are converted to spaces in languages that separate words with spaces (like English), or removed altogether in languages that do not separate words with spaces (like Chinese).
- If spaces are to be collapsed:
  - Spaces or tabs before or after segment breaks are removed.
  - Sequences of spaces are collapsed to a single space.
- When spaces are preserved, sequences of spaces are treated as non-breaking, except that they will soft wrap at the end of each sequence — that is, the next line will always start with the next non-space character. In the case of the `break-spaces` value, however, a soft wrap could potentially occur after each space, so the next line may start with one or more spaces.

### Trimming and positioning

In both inline and block formatting contexts, elements are laid out in _lines_. In an inline formatting context, lines are created by text wrapping. In a block formatting context, on the other hand, each block forms its own line. As each line is laid out, whitespace is processed further. Let's take a look at an example to explain how this works.

In this example, as before, we've marked the whitespace characters in a comment. We have three text nodes that contain only whitespace: one before the first ``, one between the 2 ``s, and one after the second ``.

```html
<body>
	<div>	Hello	</div>

   <div>  World!   </div>
</body>

<!--
<body>⏎
⇥<div>⇥Hello⇥</div>⏎
⏎
◦◦◦<div>◦◦World!◦◦</div>◦◦⏎
</body>
-->
```

This renders like so:

The whitespace in this example is handled as follows:

> **Note:**
> This algorithm can be configured via the `white-space-collapse` property (or its shorthand property `white-space`). We'll start by assuming its default value (`white-space-collapse: collapse`), then look at how different property values affect this algorithm.

1. First, the whitespace is collapsed the same way as we saw in the previous section, turning this:

   ```html
   <body>⏎
   ⇥<div>⇥Hello⇥</div>⏎
   ⏎
   ◦◦◦<div>◦◦World!◦◦</div>◦◦⏎
   </body>
   ```

   ...into this:

   ```html
   <body>◦<div>◦Hello◦</div>◦<div>◦World!◦</div>◦</body>
   ```

   Lines are then laid out according to the block formatting context established by `<body>`. In this example, each of `<body>`'s five child nodes is laid out as a separate line. (Each line in this code block represents a line in the rendered layout, not a line in our original HTML code):

   ```html
   <body>
   ◦
   <div>◦Hello◦</div>
   ◦
   <div>◦World!◦</div>
   ◦
   </body>
   ```

   Note that if the lines become too long, each line may wrap and create more lines. In reality, browsers determine the content of the lines as the lines are laid out. We'll skip the part about how text wrapping works.

2. Sequences of spaces at the beginning of a line are removed, so the example becomes:

   ```html
   <body>

   <div>Hello◦</div>

   <div>World!◦</div>

   </body>
   ```

3. Each tab that's preserved at this point is rendered according to `tab-size`. This can only happen with `white-space-collapse` set to `preserve` or `break-spaces` because all other settings turn tabs into spaces.
4. Sequences of spaces at the end of a line are removed, so the above becomes:

   ```html
   <body>

   <div>Hello</div>

   <div>World!</div>

   </body>
   ```

The three empty lines we now have are not going to occupy any space in the final layout, because they don't contain any visible content. So we'll end up with only two lines taking up space in the page. People viewing the web page see the words "Hello" and "World!" on two separate lines, just as you'd expect two ``s to be laid out. Browsers essentially ignore all of the whitespace that was included in the HTML code.

Different `white-space-collapse` values skip different steps of this algorithm:

- `preserve` and `break-spaces`: The whole algorithm is skipped except for step 3, so no whitespace collapsing or transformation happens.
- `preserve-spaces`: The whole algorithm is skipped, so whitespace characters at the start and end of lines are preserved.
- `preserve-breaks`: The same algorithm is applied as with the `collapse` value.

## How do DOM APIs process whitespace?

As mentioned previously, whitespace is preserved in the DOM. This means that if you retrieve `Node.textContent`, you will get the text content as you wrote it in the HTML source code, and if you retrieve `Node.childNodes`, you will get all the text nodes, including those that contain only whitespace.

Not all DOM APIs preserve whitespace; some APIs deal with the _rendered text_ by design. For example, `HTMLElement.innerText` returns the text exactly as it's rendered, with all whitespace collapsed and trimmed. `Selection.toString()` returns the text as it would be pasted, which generally means that whitespace is collapsed. However, in Firefox (which collapses whitespace between Chinese characters, as mentioned in the collapsing and transformation section above), the collapsed whitespace is still preserved both in the string returned by `toString()` and in the pasted text.

```html
<div id="test">Hello world!</div>
```

```js
const div = document.getElementById("test");
console.log(div.textContent); // "  Hello\n  world!\n"
console.log(div.innerText); // "Hello world!"
const selection = document.getSelection();
selection.selectAllChildren(div);
console.log(selection.toString()); // "Hello world!"
```
