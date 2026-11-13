---
title: "CSS error handling (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/syntax/error_handling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS error handling

When an error exists in CSS, such as an invalid value or a missing semicolon, instead of throwing an error like in JavaScript, the browser (or other user agent) will gracefully recover. Browsers don't provide CSS-related alerts or otherwise indicate errors have occurred in styles. They just discard invalid content and parse subsequent valid styles. This is a feature of CSS, not a bug.

This guide discusses how CSS parsers discard invalid CSS.

## CSS parser errors

When a CSS error is encountered, the browser's parser ignores the line containing the errors, discarding the minimum amount of CSS code before returning to parsing the CSS as normal. The "error recovery" is just the ignoring or skipping of invalid content.

The fact that browsers ignore invalid code enables the use of new CSS features without worrying about anything being broken in older browsers. A browser may not recognize a new feature, but that is okay. The discarding of invalid content without throwing an error allows both old and new syntaxes to coexist in the same ruleset, although bear in mind that they should be specified in that order. For example:

```css
div {
  display: inline-flex;
  display: inline flex;
}
```

The `display` property accepts both legacy single value and multi-keyword syntax. Browsers will render the old syntax until they recognize the new syntax as valid, at which point the new syntax will override the old. If a user has an old browser, the valid fallback won't get overwritten by the new CSS, because the browser perceives it as invalid.

The type and amount of CSS that a browser ignores due to an error depends on the type of error. Some common error situations are listed below:

- For errors in at-rules, whether a single line or the entire at-rule is ignored (fails) depends on the at-rule and the type of error.
- If the error is an invalid selector, the entire declaration block is ignored.
- An error due to a missing semi-colon between property declarations causes an invalid value, in which case, multiple property-value declarations are ignored.
- If the error is a property name or value, such as an unrecognized property name or invalid data type, the property-value declaration is ignored. During the filtering stage, such syntactically invalid declarations are eliminated.
- If the error is due to a missing end-bracket, the extent of what is ignored depends on the browser's ability to parse the error as nested CSS.

After parsing each declaration, style rule, at-rule, and so on, the browser checks the parsed content against its expected grammar for that construct. If the content does not match the expected grammar for that construct, the browser considers it invalid and ignores it.

### At-rule errors

The `@` symbol, known in CSS specifications as an `<at-keyword-token>`, indicates the beginning of a CSS at-rule. Once an at-rule begins with the `@` symbol, nothing is considered invalid from the parser'<example-value>'s prelude. The content of each at-rule is interpreted according to the grammar rules for that particular at-rule.

Statement at-rules, such as `@import` and `@namespace` declarations, contain just a prelude. The semicolon ends the at-rule immediately for statement at-rules. If the contents of the prelude are invalid according to the grammar for that at-rule, the at-rule is ignored, with the browser continuing to parse CSS after it encounters the next semi-colon. For example, if an `@import` at-rule occurs after any CSS declaration other than `@charset`, `@layer` or other `@import` statements, the `@import` declaration is ignored.

```css
@import "assets/fonts.css" layer(fonts);
@namespace svg url("http://www.w3.org/2000/svg");
```

If the parser encounters a curly brace (`{`) before a semi-colon is encountered, the at-rule is parsed as a block at-rule. Block at-rules like `@font-face` and `@keyframes`, contain a block of declarations surrounded by curly braces (`{}`). The opening curly brace informs the browser where the at-rule prelude ends and the at-rule's body starts. The parser looks forward, seeking matching blocks (content surrounded by `()`, `{}`, or `[]`) until it finds a closing curly brace (`}`) that isn't matched by any other curly braces: this closes the body of the at-rule.

Different at-rules have different grammar rules, different (or no) descriptors, and different rules for what, if anything, will invalidate the entire at-rule. The expected grammar for each at-rule and how errors are handled are documented on the respective at-rule page. The handling of invalid content depends on the error.

For example, the `@font-face` rule requires both a `font-family` and `src` descriptor. If either of these is omitted or invalid, the entire `@font-face` rule is invalid. Including an unrelated descriptor, any other valid font descriptor with an invalid value, or a property style declaration within the `@font-face` nested block will not invalidate the font declaration. As long as the font name and font source are included and valid, any invalid CSS within the at-rule is ignored, but the `@font-face` block is still parsed.

While the grammar of the `@keyframes` at-rule is very different from the `@font-face` rule grammar, the type of error still impacts what gets ignored. Important declarations (marked with the `important` flag) and properties that can't be animated are ignored in keyframe rules, but they don't impact other styles declared in the same keyframe selector block. Including an invalid keyframe selector (such as a percentage value less than `0%` or greater than `100%`, or a `number` omitting the `%`) invalidates the keyframe selector list and therefore the style block is ignored. An invalid keyframe selector only invalidates the invalid selector's style block; it does not invalidate the entire `@keyframes` declaration. Including styles between two keyframe selector blocks, on the other hand, will invalidate the entire `@keyframes` at-rule.

Some at-rules are almost always valid. The `@layer` at-rule comes in both regular and nested forms. The `@layer` statement syntax contains just the prelude, ending with a semi-colon. Alternatively, the nested syntax has layer styles nested between curly braces coming after the prelude. Omitting a closing curly brace may be a logic error but is not a syntax error. In the case of a missing closing brace in `@layer`, any styles coming after where the closing brace should have been are parsed as being in the cascade layer defined in the at-rule's prelude. The CSS is valid as there are no syntax errors; nothing is discarded. A syntax error may cause the named or anonymous layer to be empty, but the layer is still created.

### Errors in selector lists

There are many ways you might make a mistake writing a selector, but only invalid selectors cause a selector list to be invalid (See invalid selector list).

If you include a class selector, an id_selectors, or a type selector for a class, id, or element (or custom element) that doesn't exist, it may be a logic error but it's not a syntax error. However, if you have a typo in a pseudo-class or a pseudo-element, it might create an invalid selector, which is an error the parser needs to address.

If a selector list contains any invalid selectors, then the entire style block is ignored. There are exceptions: if the invalid selector is within an `:is` or `:where` pseudo-class (which accept forgiving selector lists) or if the unknown selector is a `-webkit-` prefixed pseudo-element, only the unknown selector is ignored as not matching anything. The selector list is not invalidated.

Outside of these exceptions, a single invalid or unsupported selector in the selector list will invalidate the entire rule and the entire selector block will be ignored. The browser will then look for the closing curly brace and continue parsing from that point onwards.

#### `-webkit-` exception

Due to legacy issues from the overuse of browser-specific prefixes in selectors and property names (and values), browsers avoid excessive invalidation of selector lists by treating all pseudo-elements that start with a case-insensitive `-webkit-` prefix and don't end with `()` as valid.

This means that a pseudo-element like `::-webkit-works-only-in-samsung` will not invalidate a selector list, regardless of which browser the code is running in. In such cases, the pseudo-element may not be recognized or supported by the browser, but it will not cause the entire selector list and its associated style block to be ignored. On the other hand, an unknown prefixed selector with a function notation of `::-webkit-imaginary-function()` will invalidate the entire selector list, and the browser will ignore the entire selector block.

### Errors within CSS declaration blocks

When it comes to CSS properties and values within a declaration block, if either the property or the value is invalid, that property-value pair is ignored and discarded. When a user agent parses or interprets a list of declarations, unknown syntax at any point causes the browser's parser to discard only the current declaration. It then continues parsing CSS after the next semicolon or closing curly bracket is encountered, whichever comes first.

This example contains an error. The parser ignores the error (and the comments), seeks forward until it encounters a semi-colon, then restarts parsing:

```css
p {
  /* Invalid syntax due to missing semi-colon */
  border-color: red
  background-color: green;

  /* Valid syntax but likely a logic error */
  border-width: 100vh;
}
```

The reason the first declaration in this selector block is invalid is because the semi-colon is missing and the declaration is not the last one in the selector block. The property missing the semi-colon is ignored, as is the property-value pair following it because the browser only continues parsing after a semi-colon or closing bracket is encountered. Specifically, the `border-color` value is parsed as `red background-color: green;` which is not a valid `<color>` value.

The `border-width` value of `100vh` is likely a mistake, but it's not an error. As it is syntactically valid, it will be parsed and applied to the elements matching the selector.

#### Vendor prefixes

Vendor-prefixed property names and property values, when not understood by a browser, are treated as invalid and ignored. Only the individual rules containing an invalid property or value are ignored. The parser looks for the next semi-colon or closing curly brace and then continues parsing from there.

You may come across legacy CSS that looks like the following:

```css
/* Prefixed values */
.wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  display: block flex;
}
/* Prefixed properties */
.rounded {
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
}
```

In this example, the last declaration in each block is valid in all browsers — `display: flex;` and `border-radius: 50%;`. Because of the cascade order of appearance rule, browsers will apply any prefixed declarations they understand, and then override those values with the standard unprefixed version.

> **Note:**
> Avoid including prefixed properties or property values where possible. If you must use them, declare the prefixed versions before the non-prefixed version as shown above.

### Errors with auto-closed endings

If a stylesheet ends while a rule, declaration, function, string, or comment is still open, the parser will automatically close everything that was left unclosed.

> **Note:**
> This is true of external style sheets, selector blocks within an HTML `<style>` element, and inline rules within a `style` attribute.

If the content between the last semi-colon and the end of the stylesheet is valid, even if incomplete, the CSS will be parsed normally. For example, if you fail to close out a `@keyframes` declaration before closing your `<style>`, the animation is still valid.

```html
<style>
@keyframes move {
  100% {
    transform: translateX(100vw)
</style>
```

Here the `move` animation is valid. Failing to properly close CSS statements doesn't necessarily make the statements invalid. That said, do not take advantage of CSS's forgiving nature. Always close all of your statements and style blocks. It makes your CSS more readable and maintainable and ensures that the browser parses the CSS as you intended.

#### Unclosed comments

Unclosed comments are logic errors, not syntax errors. If a comment starts with `/*` but is not closed, all CSS code until a closing delimiter (`*/`) in a subsequent comment or the end of the stylesheet, whichever comes first, is part of the comment. While an unclosed comment does not invalidate your CSS, it causes the CSS following the opening delimiter (`/*`) to be ignored.

```html
<style>
  /* this comment is not closed
  @keyframes move {
    0% {transform: translateX(0);}
    100% {transform: translateX(100vw);}
  }
</style>
<p style="/* another unclosed comment">Parsed as HTML.</p>
```

In this example, the two CSS comments are not closed, but the closing `</style>` tag closes the first comment and the `style` attribute's close quote closes the second comment.
