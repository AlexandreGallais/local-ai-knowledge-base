---
title: "`<template>` HTML content template element (part 2 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/template/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<template>` HTML content template element (part 2 of 3)

## Examples

### Generating table rows

First we start with the HTML portion of the example.

```html
<table id="producttable">
  <thead>
    <tr>
      <th>UPC_Code</th>
      <th>Product_Name</th>
    </tr>
  </thead>
  <tbody>
    <!-- existing data could optionally be included here -->
  </tbody>
</table>

<template id="productrow">
  <tr>
    <td class="record"></td>
    <td></td>
  </tr>
</template>
```

First, we have a table into which we will later insert content using JavaScript code. Then comes the template, which describes the structure of an HTML fragment representing a single table row.

Now that the table has been created and the template defined, we use JavaScript to insert rows into the table, with each row being constructed using the template as its basis.

```js
// Instantiate the table with the existing HTML tbody
// and the row with the template
const tbody = document.querySelector("tbody");
const template = document.querySelector("#productrow");

// Clone the new row and insert it into the table
const clone = document.importNode(template.content, true);
let td = clone.querySelectorAll("td");
td[0].textContent = "1235646565";
td[1].textContent = "Stuff";

tbody.appendChild(clone);

// Clone the new row and insert it into the table
const clone2 = document.importNode(template.content, true);
td = clone2.querySelectorAll("td");
td[0].textContent = "0384928528";
td[1].textContent = "Acme Kidney Beans 2";

tbody.appendChild(clone2);
```

The result is the original HTML table, with two new rows appended to it via JavaScript:

```css
table {
  background: black;
}

table th,
table td {
  background: white;
}
```

### Implementing a declarative shadow DOM

In this example, a hidden support warning is included at the beginning of the markup. This warning is later set to be displayed via JavaScript if the browser doesn't support the `shadowrootmode` attribute. Next, there are two `` elements, each containing nested `<style>` elements with different behaviors. The first `<style>` element is global to the whole document. The second one is scoped to the shadow root generated in place of the `<template>` element because of the presence of the `shadowrootmode` attribute.

```html
<p hidden>
  ⛔ Your browser doesn't support <code>shadowrootmode</code> attribute yet.
</p>
<article>
  <style>
    p {
      padding: 8px;
      background-color: wheat;
    }
  </style>
  <p>I'm in the DOM.</p>
</article>
<article>
  <template shadowrootmode="open">
    <style>
      p {
        padding: 8px;
        background-color: plum;
      }
    </style>
    <p>I'm in the shadow DOM.</p>
  </template>
</article>
```

```js
const isShadowRootModeSupported = Object.hasOwn(
  HTMLTemplateElement.prototype,
  "shadowRootMode",
);

document
  .querySelector("p[hidden]")
  .toggleAttribute("hidden", isShadowRootModeSupported);
```

### Declarative Shadow DOM with delegated focus

This example demonstrates how `shadowrootdelegatesfocus` is applied to a shadow root that is created declaratively, and the effect this has on focus.

The code first declares a shadow root inside a `` element, using the `<template>` element with the `shadowrootmode` attribute.
This displays both a non-focusable `` containing text and a focusable `` element.
It also uses CSS to style elements with `:focus` to blue, and to set the normal styling of the host element.

```html
<div>
  <template shadowrootmode="open">
    <style>
      :host {
        display: block;
        border: 1px dotted black;
        padding: 10px;
        margin: 10px;
      }
      :focus {
        outline: 2px solid blue;
      }
    </style>
    <div>Clickable Shadow DOM text</div>
    <input type="text" placeholder="Input inside Shadow DOM" />
  </template>
</div>
```

The second code block is identical except that it sets the `shadowrootdelegatesfocus` attribute, which delegates focus to the first focusable element in the tree if a non-focusable element in the tree is selected.

```html
<div>
  <template shadowrootmode="open" shadowrootdelegatesfocus>
    <style>
      :host {
        display: block;
        border: 1px dotted black;
        padding: 10px;
        margin: 10px;
      }
      :focus {
        outline: 2px solid blue;
      }
    </style>
    <div>Clickable Shadow DOM text</div>
    <input type="text" placeholder="Input inside Shadow DOM" />
  </template>
</div>
```

Last of all we use the following CSS to apply a red border to the parent `` element when it has focus.

```css
div:focus {
  border: 2px solid red;
}
```

The results are shown below.
When the HTML is first rendered, the elements have no styling, as shown in the first image.
For the shadow root that does not have `shadowrootdelegatesfocus` set you can click anywhere except the `` and the focus does not change (if you select the `` element it will look like the second image).

For the shadow root with `shadowrootdelegatesfocus` set, clicking on the text (which is non-focusable) selects the `` element, as this is the first focusable element in the tree.
This also focuses the parent element as shown below.

### Declarative shadow DOM with named slot assignment

This example shows how elements can be assigned to slots in a shadow DOM based on their `slot` attribute (matched against the slot's `name` attribute).

#### HTML

First we define an `` element that presents title, metadata, and article body information.

The article contains a `<template>` element that will become a shadow root, because of the presence of the `shadowrootmode` attribute.
We don't need to set its `shadowrootslotassignment` attribute because named slot assignment is the default.

The template defines elements that have named slots for "header" and "meta" information, and an unnamed slot for "body" information.
The elements are styled differently so it is easy to differentiate them.

```html
<article id="host">
  <template shadowrootmode="open" shadowrootslotassignment="named">
    <style>
      .header {
        background-color: plum;
      }
      .meta {
        background-color: green;
      }
      .body {
        background-color: lightblue;
      }
    </style>

    <h2 class="header">
      <slot name="title"></slot>
    </h2>

    <div class="meta">
      <slot name="meta"></slot>
    </div>

    <div class="body">
      <slot></slot>
    </div>
  </template>

  <p>
    Text 1 with no slot attribute. Goes into default (unnamed) slot inside the
    "body" div.
  </p>
  <span slot="title">Text for the title slot</span>
  <span slot="meta">Text for the meta slot</span>
  <p>
    Text 2 with no slot attribute. Also goes into default (unnamed) slot inside
    the "body" div.
  </p>
</article>
```

Inside the same host, below the template, we have four elements for populating the slots.
The `` elements have `slot` attributes that match the `name` attributes on slots in the template, and will populate the corresponding slots.
The two `` elements are unnamed, so are both inserted into the unnamed `<slot>` in the "body" element.

#### Results

The example below should show the content of the slots displayed in the appropriate sections.

### Declarative shadow DOM with manual slot assignment

This example shows how elements can be assigned to slots in a shadow DOM using manual slot assignment.

With this approach, each element must manually be assigned to a particular slot.
There is no default assignment, so any slot that is not assigned will be empty.

#### HTML

First we have a hidden support warning.
This warning is later set to be displayed via JavaScript if the browser doesn't support the `shadowrootslotassignment` attribute.

```html
<p id="support-warning" hidden>
  ⛔ Your browser doesn't support the
  <code>shadowrootslotassignment</code> attribute yet.
</p>
```

Next, we define an `` element that presents title, metadata, and article body information.
This contains a `<template>` element that will become a shadow root, because of the presence of the `shadowrootmode` attribute, and will use manual slot assignment because `shadowrootslotassignment="manual"` is set.

The template defines elements that have slots for "header", "meta", and "body" information, that can be separately referenced by their `id` attribute.
The elements are styled differently so it is easy to differentiate them.

```html
<article id="host">
  <template shadowrootmode="open" shadowrootslotassignment="manual">
    <style>
      .header {
        background-color: plum;
      }
      .meta {
        background-color: green;
      }
      .body {
        background-color: lightblue;
      }
    </style>

    <h2 class="header">
      <slot id="titleSlot"></slot>
    </h2>

    <div class="meta">
      <slot id="metaSlot"></slot>
    </div>

    <div class="body">
      <slot id="bodySlot"></slot>
    </div>
  </template>

  <span id="text_title">Text for the title slot</span>
  <span id="text_meta">Text for the meta slot</span>
  <p id="text_body_1">Text 1 for body slot.</p>
  <p id="text_body_2">Text 2 for body slot.</p>
</article>
```

Inside the same host, below the template, we have four elements for populating the slots.
These are also identified by id.

#### JavaScript

The JavaScript for manual slot assignment is shown below.
First the code gets the slots within the shadow root, then the text to be inserted, and finally assigns the text to the slot.
Note that you can only assign a node once to any particular slot, and that if you assign multiple nodes to a single slot using `HTMLSlotElement.assign()`, the order they are specified controls the order they are added.

```js
const host = document.querySelector("#host");
const shadow = host.shadowRoot;

// 1. Target your slots
const titleSlot = shadow.querySelector("#titleSlot");
const metaSlot = shadow.querySelector("#metaSlot");
const bodySlot = shadow.querySelector("#bodySlot");

// 2. Target the Elements to slot
const body1Text = document.querySelector("#text_body_1");
const body2Text = document.querySelector("#text_body_2");
const titleText = document.querySelector("#text_title");
const metaText = document.querySelector("#text_meta");

// 3. Manually assign them
titleSlot.assign(titleText);
metaSlot.assign(metaText);
bodySlot.assign(body2Text, body1Text);
```

The code displays the hidden support warning if slot assignment is not supported.

```js
const isShadowRootSlotAssignmentSupported = Object.hasOwn(
  HTMLTemplateElement.prototype,
  "shadowRootSlotAssignment",
);

document
  .querySelector("p[hidden]")
  .toggleAttribute("hidden", isShadowRootSlotAssignmentSupported);
```

#### Results

The example below should show the content of the slots displayed in the appropriate sections.

> **Note:**
> If the `shadowrootslotassignment` attribute is not supported, a warning note is displayed and the browser will use `named` assignment.
> However, because none of the slots or elements to be inserted are named, all the elements will be inserted into the title slot (because this is the first unnamed slot, and hence is the "default" slot).

### Data on the DocumentFragment is not cloned

When a `DocumentFragment` value is passed, `Node.appendChild` and similar methods move only the _child nodes_ of that value into the target node. Therefore, it is usually preferable to attach event handlers to the children of a `DocumentFragment`, rather than to the `DocumentFragment` itself.

Consider the following HTML and JavaScript:

#### HTML

```html
<div id="container"></div>

<template id="template">
  <div>Click me</div>
</template>
```

#### JavaScript

```js
const container = document.getElementById("container");
const template = document.getElementById("template");

function clickHandler(event) {
  event.target.append(" — Clicked this div");
}

const firstClone = document.importNode(template.content, true);
firstClone.addEventListener("click", clickHandler);
container.appendChild(firstClone);

const secondClone = document.importNode(template.content, true);
secondClone.children[0].addEventListener("click", clickHandler);
container.appendChild(secondClone);
```

#### Result

Since `firstClone` is a `DocumentFragment`, only its children are added to `container` when `appendChild` is called; the event handlers of `firstClone` are not copied. In contrast, because an event handler is added to the first _child node_ of `secondClone`, the event handler is copied when `appendChild` is called, and clicking on it works as one would expect.

### Using `<template for>` for patching

This example uses the `<?marker name="placeholder">` processing instruction as a placeholder and later on fills in the contents using `<template for="placeholder">`.

```html
<body>
  <div>
    <?marker name="placeholder">
  </div>
  ...
  <template for="placeholder">Lorem Ipsum...</template>
  ...
</body>
```

Initially, this results in an empty `` being rendered. It is then updated to the following after the `<template>` element is parsed and processed:

```html
  <div>
    Lorem Ipsum...
  </div>
```

### Using `<template for>` for range patching

This example uses the `<?start>` and `<?end>` processing instructions to contain placeholder content, which is initially displayed then replaced by the `<template for>` content later on.

```html
<body>
  <div>
    <?start name="placeholder">
    Loading...
    <?end>
  </div>
  ...
  <template for="placeholder">Lorem Ipsum...</template>
  ...
</body>
```

Initially the `` is rendered with the `Loading...` placeholder content. This is then updated to the following after the `<template>` is parsed and processed:

```html
  <div>
    Lorem Ipsum...
  </div>
```

This example also demonstrates the lack of processing instruction children and nesting. The `<?start>` and `<?end>` processing instructions, although linked in terms of their relationship with `<template for>`, are separate nodes and not opening and closing tags. They therefore do not contain the `Loading...` content as a child (as demonstrated by the lack of indentation).

### Using `<template for>` for patching `<head>` elements

This example shows that `<template for>` elements that are direct children of the `<body>` element can patch `<head>` markers.

```html
<head>
  ...
  <?start name="title"><title>Loading...</title><?end>
  <?start name="meta-description"><meta name="description" contents="Loading..."><?end>
  ...
</head>
<body>
  ...
  <template for="title"><title>The actual title of the page</title></template>
  <template for="meta-description"><meta name="description" contents="This is a meaningful description..."></template>
  ...
</body>
```

Results in the following once the `<template>` elements have been parsed:

```html
<head>
  ...
  <title>The actual title of the page</title>
  <meta name="description" contents="This is a meaningful description...">
  ...
</head>
<body>
  ...
</body>
```
