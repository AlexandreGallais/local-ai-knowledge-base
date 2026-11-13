---
title: "Using custom elements (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_components/using_custom_elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using custom elements (part 3 of 3)

## Examples

In the rest of this guide we'll look at a few example custom elements. You can find the source for all these examples, and more, in the web-components-examples repository, and you can see them all live at <https://mdn.github.io/web-components-examples/>.

### An autonomous custom element

First, we'll look at an autonomous custom element. The `<popup-info>` custom element takes an image icon and a text string as attributes, and embeds the icon into the page. When the icon is focused, it displays the text in a pop up information box to provide further in-context information.

- See the example running live
- See the source code

To begin with, the JavaScript file defines a class called `PopupInfo`, which extends the `HTMLElement` class.

```js
// Create a class for the element
class PopupInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create spans
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);

    const info = document.createElement("span");
    info.setAttribute("class", "info");

    // Take attribute content and put it inside the info span
    const text = this.getAttribute("data-text");
    info.textContent = text;

    // Insert icon
    let imgUrl;
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "img/default.png";
    }

    const img = document.createElement("img");
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: 1.2rem;
      }

      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}
```

The class definition contains the `constructor()` for the class, which always starts by calling `super()` so that the correct prototype chain is established.

Inside the method `connectedCallback()`, we define all the functionality the element will have when the element is connected to the DOM. In this case we attach a shadow root to the custom element, use some DOM manipulation to create the element's internal shadow DOM structure — which is then attached to the shadow root — and finally attach some CSS to the shadow root to style it. We don't do this work in the constructor because an element's attributes are unavailable until it is connected to the DOM.

Finally, we register our custom element in the `CustomElementRegistry` using the `define()` method we mentioned earlier — in the parameters we specify the element name, and then the class name that defines its functionality:

```js
customElements.define("popup-info", PopupInfo);
```

It is now available to use on our page. Over in our HTML, we use it like so:

```html
<popup-info
  img="img/alt.png"
  data-text="Your card validation code (CVC)
  is an extra security feature — it is the last 3 or 4 numbers on the
  back of your card."></popup-info>
```

### Referencing external styles

In the above example we apply styles to the shadow DOM using a `<style>` element, but you can reference an external stylesheet from a `<link>` element instead. In this example we'll modify the `<popup-info>` custom element to use an external stylesheet.

- See the example running live
- See the source code

Here's the class definition:

```js
// Create a class for the element
class PopupInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create spans
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);

    const info = document.createElement("span");
    info.setAttribute("class", "info");

    // Take attribute content and put it inside the info span
    const text = this.getAttribute("data-text");
    info.textContent = text;

    // Insert icon
    let imgUrl;
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "img/default.png";
    }

    const img = document.createElement("img");
    img.src = imgUrl;
    icon.appendChild(img);

    // Apply external styles to the shadow dom
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "style.css");

    // Attach the created elements to the shadow dom
    shadow.appendChild(linkElem);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}
```

It's just like the original `<popup-info>` example, except that we link to an external stylesheet using a `<link>` element, which we add to the shadow DOM.

Note that `<link>` elements do not block paint of the shadow root, so there may be a flash of unstyled content (FOUC) while the stylesheet loads.

Many modern browsers implement an optimization for `<style>` tags either cloned from a common node or that have identical text, to allow them to share a single backing stylesheet. With this optimization the performance of external and internal styles should be similar.

### Customized built-in elements

Now let's have a look at a customized built-in element example. This example extends the built-in `` element to support expanding and collapsing the list items.

- See the example running live
- See the source code

> **Note:**
> Please see the `is` attribute reference for caveats on implementation reality of customized built-in elements.

First of all, we define our element's class:

```js
// Create a class for the element
class ExpandingList extends HTMLUListElement {
  connectedCallback() {
    // Get ul and li elements that are a child of this custom ul element
    // li elements can be containers if they have uls within them
    const uls = this.querySelectorAll("ul");
    const lis = this.querySelectorAll("li");

    // Hide all child uls
    // These lists will be shown when the user clicks a higher level container
    for (const ul of uls) {
      ul.style.display = "none";
    }

    // Look through each li element in the ul
    for (const li of lis) {
      // If this li has a ul as a child, decorate it and add a click handler
      if (li.querySelectorAll("ul").length > 0) {
        // Add an attribute which can be used by the style
        // to show an open or closed icon
        li.setAttribute("class", "closed");

        // Wrap the li element's text in a new span element
        // so we can assign style and event handlers to the span
        const childText = li.childNodes[0];
        const newSpan = document.createElement("span");

        // Copy text from li to span, set cursor style
        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = "pointer";

        // Add click handler to this span
        const onClick = (e) => {
          // next sibling to the span should be the ul
          const nextUl = e.target.nextElementSibling;

          // Toggle visible state and update class attribute on ul
          if (nextUl.style.display === "block") {
            nextUl.style.display = "none";
            nextUl.parentNode.setAttribute("class", "closed");
          } else {
            nextUl.style.display = "block";
            nextUl.parentNode.setAttribute("class", "open");
          }
        };

        newSpan.addEventListener("click", onClick);

        // Add the span and remove the bare text node from the li
        childText.parentNode?.insertBefore(newSpan, childText);
        childText.parentNode?.removeChild(childText);
      }
    }
  }
}
```

Note that this time we extend `HTMLUListElement`, rather than `HTMLElement`. This means that we get the default behavior of a list, and only have to implement our own customizations.

As before, most of the code is in the `connectedCallback()` lifecycle callback.

Next, we register the element using the `define()` method as before, except that this time it also includes an options object that details what element our custom element inherits from:

```js
customElements.define("expanding-list", ExpandingList, { extends: "ul" });
```

Using the built-in element in a web document also looks somewhat different:

```html
<ul is="expanding-list">
  …
</ul>
```

You use a `` element as normal, but specify the name of the custom element inside the `is` attribute.

Note that in this case we must ensure that the script defining our custom element is executed after the DOM has been fully parsed, because `connectedCallback()` is called as soon as the expanding list is added to the DOM, and at that point its children have not been added yet, so the `querySelectorAll()` calls will not find any items. One way to ensure this is to add the defer attribute to the line that includes the script:

```html
<script src="main.js" defer></script>
```

### Lifecycle callbacks

So far we've seen only one lifecycle callback in action: `connectedCallback()`. In the final example, `<custom-square>`, we'll see some of the others. The `<custom-square>` autonomous custom element draws a square whose size and color are determined by two attributes, named `"size"` and `"color"`.

- See the example running live
- See the source code

In the class constructor, we attach a shadow DOM to the element, then attach empty `` and `<style>` elements to the shadow root:

```js
class Square extends HTMLElement {
  // …
  constructor() {
    // Always call super first in constructor
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const div = document.createElement("div");
    const style = document.createElement("style");
    shadow.appendChild(style);
    shadow.appendChild(div);
  }
  // …
}
```

The key <example-value> in this example is `updateStyle()` — this takes an element, gets its shadow root, finds its `<style>` element, and adds `width`, `height`, and `background-color` to the style.

```js
function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector("style").textContent = `
    div {
      width: ${elem.getAttribute("size")}px;
      height: ${elem.getAttribute("size")}px;
      background-color: ${elem.getAttribute("color")};
    }
  `;
}
```

The actual updates are all handled by the lifecycle callbacks. The `connectedCallback()` runs each time the element is added to the DOM — here we run the `updateStyle()` function to make sure the square is styled as defined in its attributes:

```js
class Square extends HTMLElement {
  // …
  connectedCallback() {
    console.log("Custom square element added to page.");
    updateStyle(this);
  }
  // …
}
```

The `disconnectedCallback()` and `adoptedCallback()` callbacks log messages to the console to inform us when the element is either removed from the DOM, or moved to a different page:

```js
class Square extends HTMLElement {
  // …
  disconnectedCallback() {
    console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom square element moved to new page.");
  }
  // …
}
```

The `attributeChangedCallback()` callback is run whenever one of the element's attributes is changed in some way. As you can see from its parameters, it is possible to act on attributes individually, looking at their name, and old and new attribute values. In this case however, we are just running the `updateStyle()` function again to make sure that the square's style is updated as per the new values:

```js
class Square extends HTMLElement {
  // …
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom square element attributes changed.");
    updateStyle(this);
  }
  // …
}
```

Note that to get the `attributeChangedCallback()` callback to fire when an attribute changes, you have to observe the attributes. This is done by specifying a `static get observedAttributes()` method inside the custom element class - this should return an array containing the names of the attributes you want to observe:

```js
class Square extends HTMLElement {
  // …
  static get observedAttributes() {
    return ["color", "size"];
  }
  // …
}
```
