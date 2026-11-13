---
title: "CSSStyleSheet"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet

The **`CSSStyleSheet`** interface represents a single CSS stylesheet, and lets you inspect and modify the list of rules contained in the stylesheet. It inherits properties and methods from its parent, `StyleSheet`.

A stylesheet consists of a collection of `CSSRule` objects representing each of the rules in the stylesheet. The rules are contained in a `CSSRuleList`, which can be obtained from the stylesheet's `cssRules` property.

For example, one rule might be a `CSSStyleRule` object containing a style such as:

```css
h1,
h2 {
  font-size: 16pt;
}
```

Another rule might be an _at-rule_ such as `@import` or `@media`, and so forth.

See the Obtaining a StyleSheet section for the various ways a `CSSStyleSheet` object can be obtained. A `CSSStyleSheet` object can also be directly constructed. The constructor, and the `CSSStyleSheet.replace()`, and `CSSStyleSheet.replaceSync()` methods are newer additions to the specification, enabling _Constructable Stylesheets_.

To apply a `CSSStyleSheet` to a document or shadow root, assign it to the `Document.adoptedStyleSheets` or `ShadowRoot.adoptedStyleSheets` property, respectively.

## Constructor

- `CSSStyleSheet()`
    Creates a new `CSSStyleSheet` object.

## Instance properties

_Inherits properties from its parent, `StyleSheet`._

- `CSSStyleSheet.cssRules` (read-only)
    Returns a live `CSSRuleList` which maintains an up-to-date list of the `CSSRule` objects that comprise the stylesheet.

    > **Note:**
    > In some browsers, if a stylesheet is loaded from a different domain, accessing `cssRules` results in a `SecurityError`.

- `CSSStyleSheet.ownerRule` (read-only)
    If this stylesheet is imported into the document using an `@import` rule, the `ownerRule` property returns the corresponding `CSSImportRule`; otherwise, this property's value is `null`.

## Instance methods

_Inherits methods from its parent, `StyleSheet`._

- `CSSStyleSheet.deleteRule()`
    Deletes the rule at the specified index into the stylesheet's rule list.
- `CSSStyleSheet.insertRule()`
    Inserts a new rule at the specified position in the stylesheet, given the textual representation of the rule.
- `CSSStyleSheet.replace()`
    Asynchronously replaces the content of the stylesheet and returns a `Promise` that resolves with the updated `CSSStyleSheet`.
- `CSSStyleSheet.replaceSync()`
    Synchronously replaces the content of the stylesheet.

## Legacy properties

_These properties are legacy properties as introduced by Microsoft; these are maintained for compatibility with existing sites._

- `rules` (read-only) (deprecated)
    The `rules` property is functionally identical to the standard `cssRules` property; it returns a live `CSSRuleList` which maintains an up-to-date list of all of the rules in the style sheet.

## Legacy methods

_These methods are legacy methods as introduced by Microsoft; these are maintained for compatibility with existing sites._

- `addRule()` (deprecated)
    Adds a new rule to the stylesheet given the selector to which the style applies and the style block to apply to the matching elements.

    This differs from `insertRule()`, which takes the textual representation of the entire rule as a single string.

- `removeRule()` (deprecated)
    Functionally identical to `deleteRule()`; removes the rule at the specified index from the stylesheet's rule list.

## Obtaining a StyleSheet

A stylesheet is associated with at most one `Document`, which it applies to (unless `disabled`). A list of `CSSStyleSheet` objects for a given document can be obtained using the `Document.styleSheets` property. A specific style sheet can also be accessed from its _owner_ object (`Node` or `CSSImportRule`), if any.

A `CSSStyleSheet` object is created and inserted into the document's `Document.styleSheets` list automatically by the browser, when a stylesheet is loaded for a document.

A (possibly incomplete) list of ways a stylesheet can be associated with a document follows:

       |
        Reason for the style sheet to be associated with the document

       |
        Appears in <code>document.styleSheets</code> list

       |
        Getting the owner element/rule given the style sheet object

       | The interface for the owner object
       | Getting the CSSStyleSheet object from the owner

       |
        `<style>` and `<link>`
        elements in the document

       | Yes
       | `.ownerNode`
       |
        `HTMLLinkElement`,`HTMLStyleElement`,or
        `SVGStyleElement`

       |
        `HTMLLinkElement.sheet`,`HTMLStyleElement.sheet`,or
        `SVGStyleElement.sheet`

       |
        CSS `@import` rule in other style sheets applied to
        the document

       | Yes
       |
        `.ownerRule`

       | `CSSImportRule`
       |
        `.styleSheet`

       |
        `&#x3C;?xml-stylesheet ?>` processing instruction in the
        (non-HTML) document

       | Yes
       | `.ownerNode`
       | `ProcessingInstruction`
       |
        `.sheet`

       |
        JavaScript `import ... with { type: "css" }`

       | No
       | N/A
       | N/A
       | N/A

       | HTTP Link Header
       | Yes
       | N/A
       | N/A
       | N/A

       | User agent (default) style sheets
       | No
       | N/A
       | N/A
       | N/A

## See also

- CSS Object Model
- Using dynamic styling information
