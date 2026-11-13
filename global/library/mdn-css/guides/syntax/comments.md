---
title: "Comments"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/syntax/comments/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Comments

A CSS **comment** is used to add explanatory notes to the code or to prevent the browser from interpreting specific parts of the style sheet. By design, comments have no effect on the layout of a document.

## Syntax

Comments can be placed wherever white space is allowed within a style sheet. They can be used on a single line, or traverse multiple lines.

```css
/* Comment */
```

## Examples

```css
/* A one-line comment */

/*
A comment
which stretches
over several
lines
*/

/* The comment below is used to
   disable specific styling */
/*
span {
  color: blue;
  font-size: 1.5em;
}
*/
```

## Notes

The `/* */` comment syntax is used for both single and multiline comments. There is no other way to specify comments in external style sheets. However, when using the `<style>` element, you may use `` to hide CSS from older browsers, although this is not recommended. As with most programming languages that use the `/* */` comment syntax, comments cannot be nested. In other words, the first instance of `*/` that follows an instance of `/*` closes the comment.

## See also

- CSS syntax module
- Syntax guide
- CSS error handling
