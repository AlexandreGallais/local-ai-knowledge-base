---
title: "WAI-ARIA Roles"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WAI-ARIA Roles

ARIA roles provide semantic meaning to content, allowing screen readers and other tools to present and support interaction with an object in a way that is consistent with user expectations of that type of object. ARIA roles can be used to describe elements that don't natively exist in HTML or exist but don't yet have full browser support.

By default, many semantic elements in HTML have a role; for example, `` has the "radio" role. Non-semantic elements in HTML do not have a role; `` and `` without added semantics return `null`. The `role` attribute can provide semantics.

ARIA roles are added to HTML elements using `role="role type"`, where _role type_ is the name of a role in the ARIA specification. Some roles require the inclusion of associated ARIA states or properties; others are only valid in association with other roles.

For example, `` will be announced as a 'tab panel' by screen readers. However, if the tab panel doesn't have nested tabs, the element with the tabpanel role is not in fact a tab panel and accessibility has actually been negatively impacted.

The ARIA states and properties associated with each role are included in the role's pages, with each attribute also having a dedicated page.

## ARIA role types

There are 6 categories of ARIA roles:

### 1. Document structure roles

Document Structure roles are used to provide a structural description for a section of content. Most of these roles should no longer be used as browsers now support semantic HTML elements with the same meaning. The roles without HTML equivalents, such as presentation, toolbar and tooltip roles, provide information on the document structure to assistive technologies such as screen readers as equivalent native HTML tags are not available.

- `toolbar`
- `tooltip`
- `feed`
- `math`
- `presentation` / `none`
- `note`

For most document structure roles, semantic HTML equivalent elements are available and supported. Avoid using:

- `application`
- `article` (use ``)
- `cell` (use ` | `)
- `columnheader` (use ``<<th scope="col">>``)
- `definition` (use ``)
- `directory`
- `document`
- `figure` (use `` instead)
- `group`
- `heading` (use `<h1>` through `<h6>`)
- `img` (use `` or `` instead)
- `list` (use either `` or `` instead)
- `listitem` (use `` instead)
- `meter` (use `<meter>` instead)
- `row` (use the `` with ``)
- `rowgroup` (use ``, `` and ``)
- `rowheader` (use ``<<th scope="row">>``)
- `separator` (use `` if it doesn't have focus)
- `table` (use ``)
- `term` (use ``)

These are included for completeness, but in most cases are rarely, if ever, useful:

- `associationlist`
- `associationlistitemkey`
- `associationlistitemvalue`
- `blockquote`
- `caption`
- `code`
- `deletion`
- `emphasis`
- `insertion`
- `paragraph`
- `strong`
- `subscript`
- `superscript`
- `time`

Graphics roles are defined in the WAI-ARIA Graphics Module and are used to define the structure and semantic meaning of graphical content. They are subclasses of the `document`, `group`, and `img` roles.

- `graphics-document`
- `graphics-object`
- `graphics-symbol`

### 2. Widget roles

Widget roles are used to define common interactive patterns. Like document structure roles, some widget roles have the same semantics as well-supported native HTML elements, and therefore should be avoided. The key <example-value> is that widget roles typically require JavaScript for interaction, while document structure roles often do not.

- `scrollbar`
- `searchbox`
- `separator` (when focusable)
- `slider`
- `spinbutton`
- `switch`
- `tab`
- `tabpanel`
- `treeitem`

Avoid using `button`, `checkbox`, `gridcell`, `link`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `progressbar`, `radio`, and `textbox`, which we've included for completeness. For most, semantic equivalents with accessible interactivity are available and supported. See the individual role documentation for more information.

#### Composite widget roles

- `combobox`
- `menu`
- `menubar`
- `tablist`
- `tree`
- `treegrid`

Avoid using `grid`, `listbox`, and `radiogroup`, which we've included for completeness. See the individual role documentation for more information.

Note that there is also a widget role (`role="widget"`), which is an abstract role and not in the widget role category.

### 3. Landmark roles

Landmark roles provide a way to identify the organization and structure of a web page. By classifying and labeling sections of a page, structural information conveyed visually through layout is represented programmatically. Screen readers use landmark roles to provide keyboard navigation to important sections of a page. Use these sparingly. Too many landmark roles create "noise" in screen readers, making it difficult to understand the overall layout of the page.

- `banner` (document ``)
- `complementary` (``)
- `contentinfo` (document ``)
- `form` (`<form>`)
- `main` (``)
- `navigation` (``)
- `region` (``)
- `search` (`<search>`)

### 4. Live region roles

Live Region roles are used to define elements with content that will be dynamically changed. Sighted users can see dynamic changes when they are visually noticeable. These roles help low vision and blind users know if content has been updated. Assistive technologies, like screen readers, can be made to announce dynamic content changes:

- `alert`
- `log`
- `marquee`
- `status`
- `timer`

### 5. Window roles

Window roles define sub-windows to the main document window, within the same window, such as pop up modal dialogs:

- `alertdialog`
- `dialog`

### 6. Abstract roles

Abstract roles are only intended for use by browsers to help organize and streamline a document. They should not be used by developers writing HTML markup. Doing so will not result in any meaningful information being conveyed to assistive technologies or to users.

Avoid using `command`, `composite`, `input`, `landmark`, `range`, `roletype`, `section`, `sectionhead`, `select`, `structure`, `widget`, and `window`.

> **Note:**
> Don't use abstract roles in your sites and applications. They are for use by browsers. They are included for reference only.

> **Warning:**
> "Abstract roles are used for the ontology. Authors **MUST NOT** use abstract roles in content." - The WAI-ARIA specification

## Roles defined on MDN

The following are the reference pages covering the WAI-ARIA roles discussed on MDN.

## See also

- Using ARIA: Roles, States, and Properties
- ARIA states and properties
