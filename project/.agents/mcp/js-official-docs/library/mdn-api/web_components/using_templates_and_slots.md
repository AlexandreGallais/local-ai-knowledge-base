---
title: "Using templates and slots"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_components/using_templates_and_slots/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using templates and slots

This article explains how you can use the `<template>` and `<slot>` elements to create a flexible template that can then be used to populate the shadow DOM of a web component.

## The truth about templates

When you have to reuse the same markup structures repeatedly on a web page, it makes sense to use some kind of a template rather than repeating the same structure over and over again.
This was possible before, but it is made a lot easier by the HTML `<template>` element.
This element and its contents are not rendered in the DOM, but it can still be referenced using JavaScript.

Let's look at a trivial quick example:

```html
<template id="custom-paragraph">
  <p>My paragraph</p>
</template>
```

This won't appear in your page until you grab a reference to it with JavaScript and then append it to the DOM, using something like the following:

```js
let template = document.getElementById("custom-paragraph");
let templateContent = template.content;
document.body.appendChild(templateContent);
```

Although trivial, you can already start to see how this could be useful.

## Using templates with web components

Templates are useful on their own, but they work even better with web components.
Let's define a web component that uses our template as the content of its shadow DOM.
We'll call it `<my-paragraph>` as well:

```js
customElements.define(
  "my-paragraph",
  class extends HTMLElement {
    constructor() {
      super();
      let template = document.getElementById("custom-paragraph");
      let templateContent = template.content;

      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(document.importNode(templateContent, true));
    }
  },
);
```

The key point to note here is that we append a clone of the template content to the shadow root, created using the `Document.importNode()` method.

And because we are appending its contents to a shadow DOM, we can include some styling information inside the template in a `<style>` element, which is then encapsulated inside the custom element.
This wouldn't work if we just appended it to the standard DOM.

So for example:

```html
<template id="custom-paragraph">
  <style>
    p {
      color: white;
      background-color: #666666;
      padding: 5px;
    }
  </style>
  <p>My paragraph</p>
</template>
```

Now we can use it by just adding it to our HTML document:

```html
<my-paragraph></my-paragraph>
```

## Adding flexibility with slots

So far so good, but the element isn't very flexible.
We can only display one bit of text inside it, meaning that at the moment it is even less useful than a regular paragraph! We can make it possible to display different text in each element instance in a nice declarative way using the `<slot>` element.

Slots are identified by their `name` attribute, and allow you to define placeholders in your template that can be filled with any markup fragment you want when the element is used in the markup.

So, if we want to add a slot into our trivial example, we could update our template's paragraph element like this:

```html
<p><slot name="my-text">My default text</slot></p>
```

If the slot's content isn't defined when the element is included in the markup, or if the browser doesn't support slots, `<my-paragraph>` just contains the fallback content "My default text".

To define the slot's content, we include an HTML structure inside the `<my-paragraph>` element with a `slot` attribute whose value is equal to the name of the slot we want it to fill. As before, this can be anything you like, for example:

```html
<my-paragraph>
  <span slot="my-text">Let's have some different text!</span>
</my-paragraph>
```

or

```html
<my-paragraph>
  <ul slot="my-text">
    <li>Let's have some different text!</li>
    <li>In a list!</li>
  </ul>
</my-paragraph>
```

> **Note:**
> Nodes that can be inserted into slots are known as _Slottable_ nodes; when a node has been inserted in a slot, it is said to be _slotted_.

And that's it for our trivial example.
If you want to play with it some more, you can find it on GitHub (see it running live also).

The `name` attribute should be unique per shadow root: if you have two slots with the same name, all of the elements with a matching `slot` attribute will be assigned to the first slot with that name. But the `slot` attribute does not need to be unique: a `<slot>` can be filled by multiple elements that all have a matching `slot` attribute.

The `name` and `slot` attributes both default to the empty string, so elements with no `slot` attributes are assigned to the `<slot>` with no `name` attribute (the unnamed slot, or default slot). Here's an example:

```html
<template id="custom-paragraph">
  <style>
    p {
      color: white;
      background-color: #666666;
      padding: 5px;
    }
  </style>
  <p>
    <slot name="my-text">My default text</slot>
    <slot></slot>
  </p>
</template>
```

You can then use it like this:

```html
<my-paragraph>
  <span slot="my-text">Let's have some different text!</span>
  <span>This will go into the unnamed slot</span>
  <span>This will also go into the unnamed slot</span>
</my-paragraph>
```

In this example:

- Content with `slot="my-text"` goes into the named slot.
- All other content automatically goes into the unnamed slot.

## Named and manual slot assignment

The previous example uses _named slot assignment_, which means the named `<slot>` elements in a template are populated with the content of elements in the custom component (or more generally the host element) that have matching names in their `slot` attributes.
This is the original mechanism used for slot assignment and is the most suitable method for most use cases.

_Manual slot assignment_ is an alternative approach in which elements are manually assigned to slots using `HTMLSlotElement.assign()`.

Manual assignment is useful when you want to dynamically select the content to be slotted, or if you want to assign slots based on some other element attribute such as their `id`, without having to add duplicate `slot` attributes.
For example, a `<movie-picker>` custom element might use a `<select>` element to filter on genre, slotting only the elements that have a matching `data-genre` attribute value on change.

```html
<movie-picker>
  <label
    >Genre:
    <select>
      <option>Comedy</option>
      <option>Drama</option>
      <option>Action</option>
      <option>Romance</option>
    </select>
  </label>
  <div data-genre="comedy romance"><h2>Hungover on Valentine's Day</h2></div>
  <div data-genre="drama romance"><h2>Us Two, plus Three</h2></div>
  <div data-genre="action drama"><h2>The Hitman 2: Can't die twice</h2></div>
  <div data-genre="action comedy">
    <h2>Tinkerbell, the last action hero</h2>
  </div>
</movie-picker>
```

Named slot assignment is the default behavior.
On user agents that support setting the shadow root slot assignment method, you can enable this feature when you attach the shadow root.
This is done programmatically using the `options.slotAssignment` parameter passed to `Element.attachShadow()`, or declaratively by setting the `shadowrootslotassignment` attribute on the `<template>` element.

The following HTML shows a basic <example-value> of how you can set `shadowrootslotassignment` when declaratively creating a shadow root (using `shadowrootmode`).

```html
<article id="host">
  <template shadowrootmode="open" shadowrootslotassignment="manual">
    <h2 class="header">
      <slot id="titleSlot"></slot>
    </h2>
  </template>

  <span>Text for the title slot</span>
</article>
```

The code to manually assign the text in the `` to the `<slot>` might look like this:

```js
const host = document.querySelector("#host");
const shadow = host.shadowRoot;
const slot = shadow.querySelector("slot");
const titleText = host.querySelector("span");

slot.assign(titleText);
```

## A more involved example

To finish off the article, let's look at something a little less trivial.

The following set of code snippets show how to use `<slot>` together with `<template>` and some JavaScript to:

- create a **`<element-details>`** element with named slots in its shadow root
- design the **`<element-details>`** element in such a way that, when used in documents, it is rendered from composing the element's content together with content from its shadow root—that is, pieces of the element's content are used to fill in named slots in its shadow root

Note that it is technically possible to use `<slot>` element without a `<template>` element, e.g., within say a regular `` element, and still take advantage of the place-holder features of `<slot>` for Shadow DOM content, and doing so may indeed avoid the small trouble of needing to first access the template element's `content` property (and clone it).
However, it is generally more practical to add slots within a `<template>` element, since you are unlikely to need to define a pattern based on an already-rendered element.

In addition, even if it is not already rendered, the purpose of the container as a template should be more semantically clear when using the `<template>`. In addition, `<template>` can have items directly added to it, like ` | `, which would disappear when added to a ``.

> **Note:**
> You can find this complete example at element-details (see it running live also).

### Creating a template with some slots

First of all, we use the `<slot>` element within a `<template>` element to create a new "element-details-template" document fragment containing some named slots:

```html
<template id="element-details-template">
  <style>
    details {
      font-family: "Open Sans Light", "Helvetica", "Arial";
    }
    .name {
      font-weight: bold;
      color: #217ac0;
      font-size: 120%;
    }
    h4 {
      margin: 10px 0 -8px 0;
    }
    h4 span {
      background: #217ac0;
      padding: 2px 6px;
    }
    h4 span {
      border: 1px solid #cee9f9;
      border-radius: 4px;
    }
    h4 span {
      color: white;
    }
    .attributes {
      margin-left: 22px;
      font-size: 90%;
    }
    .attributes p {
      margin-left: 16px;
      font-style: italic;
    }
  </style>
  <details>
    <summary>
      <span>
        <code class="name"
          >&lt;<slot name="element-name">NEED NAME</slot>&gt;</code
        >
        <span class="desc"
          ><slot name="description">NEED DESCRIPTION</slot></span
        >
      </span>
    </summary>
    <div class="attributes">
      <h4><span>Attributes</span></h4>
      <slot name="attributes"><p>None</p></slot>
    </div>
  </details>
  <hr />
</template>
```

That `<template>` element has several features:

- The `<template>` has a `<style>` element with a set of CSS styles that are scoped just to the document fragment the `<template>` creates, These styles are scoped this way because that fragment will be inserted into a shadow root element.
- The `<template>` uses `<slot>` and its `name` attribute to make three named slots:
  - `<slot name="element-name">`
  - `<slot name="description">`
  - `<slot name="attributes">`

- The `<template>` wraps the named slots in a `` element.

### Creating a new \<element-details> element from the \<template>

Next, let's create a new custom element named **`<element-details>`** and use `Element.attachShadow` to attach to it, as its shadow root, that document fragment we created with our `<template>` element above.
This uses exactly the same pattern as we saw in our earlier trivial example.

```js
customElements.define(
  "element-details",
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById(
        "element-details-template",
      ).content;
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(document.importNode(template, true));
    }
  },
);
```

### Using the \<element-details> custom element with named slots

Now let's take that **`<element-details>`** element and actually use it in our document:

```html
<element-details>
  <span slot="element-name">slot</span>
  <span slot="description"
    >A placeholder inside a web component that users can fill with their own
    markup, with the effect of composing different DOM trees together.</span
  >
  <dl slot="attributes">
    <dt>name</dt>
    <dd>The name of the slot.</dd>
  </dl>
</element-details>

<element-details>
  <span slot="element-name">template</span>
  <span slot="description"
    >A mechanism for holding client- side content that is not to be rendered
    when a page is loaded but may subsequently be instantiated during runtime
    using JavaScript.</span
  >
</element-details>
```

About that snippet, notice these points:

- The snippet has two instances of **`<element-details>`** elements which both use the `slot` attribute to reference the named slots `"element-name"` and `"description"` we put in the `<element-details>` shadow root.
- Only the first of those two **`<element-details>`** elements references the `"attributes"` named slot. The second `<element-details>` element lacks any reference to the `"attributes"` named slot.
- The first `<element-details>` element references the `"attributes"` named slot using a `` element with `` and `` children.

### Adding a final bit of style

As a finishing touch, we'll add a tiny bit more CSS for the ``, ``, and `` elements in our doc:

```css
dl {
  margin-left: 6px;
}
dt {
  color: #217ac0;
  font-family: "Consolas", "Liberation Mono", "Courier New";
  font-size: 110%;
  font-weight: bold;
}
dd {
  margin-left: 16px;
}
```

```css
body {
  margin-top: 47px;
}
```

### Result

Finally let's put all the snippets together and see what the rendered result looks like.

Notice the following points about this rendered result:

- Even though the instances of the **`<element-details>`** element in the document do not directly use the `` element, they get rendered using `` because the shadow root causes them to get populated with that.
- Within the rendered `` output, the content in the **`<element-details>`** elements fills the named slots from the shadow root. In other words, the DOM tree from the **`<element-details>`** elements get _composed_ together with the content of the shadow root.
- For both **`<element-details>`** elements, an **Attributes** heading gets automatically added from the shadow root before the position of the `"attributes"` named slot.
- Because the first **`<element-details>`** has a `` element which explicitly references the `"attributes"` named slot from its shadow root, the contents of that `` replace the `"attributes"` named slot from the shadow root.
- Because the second **`<element-details>`** doesn't explicitly reference the `"attributes"` named slot from its shadow root, its content for that named slot gets filled with the default content for it from the shadow root.
