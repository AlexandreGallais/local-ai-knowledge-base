---
title: "`<input type=\"search\">` HTML attribute value (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="search">` HTML attribute value (part 2 of 2)

## Validation

`` elements of type `search` have the same validation features available to them as regular `text` inputs. It is less likely that you'd want to use validation features in general for search boxes. In many cases, users should just be allowed to search for anything, but there are a few cases to consider, such as searches against data of a known format.

> **Note:**
> HTML form validation is _not_ a substitute for scripts that ensure that the entered data is in the proper format. It's far too easy for someone to make adjustments to the HTML that allow them to bypass the validation, or to remove it entirely. It's also possible for someone to bypass your HTML entirely and submit the data directly to your server. If your server-side code fails to validate the data it receives, disaster could strike when improperly-formatted data (or data which is too large, is of the wrong type, and so forth) is entered into your database.

### A note on styling

There are useful pseudo-classes available for styling valid/invalid form elements: `:valid` and `:invalid`. In this section, we'll use the following CSS, which will place a check (tick) next to inputs containing valid values, and a cross next to inputs containing invalid values.

```css
input:invalid ~ span::after {
  content: "✖";
  padding-left: 5px;
  position: absolute;
}

input:valid ~ span::after {
  content: "✓";
  padding-left: 5px;
  position: absolute;
}
```

The technique also requires a `` element to be placed after the form element, which acts as a holder for the icons. This was necessary because some input types on some browsers don't display icons placed directly after them very well.

### Making input required

You can use the `required` attribute as an easy way of making entering a value required before form submission is allowed:

```html
<form>
  <div>
    <input
      type="search"
      id="mySearch"
      name="q"
      placeholder="Search the site…"
      required />
    <button>Search</button>
    <span class="validity"></span>
  </div>
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

```css
input {
  margin-right: 10px;
}

input:invalid ~ span::after {
  content: "✖";
  padding-left: 5px;
  position: absolute;
}

input:valid ~ span::after {
  content: "✓";
  padding-left: 5px;
  position: absolute;
}
```

This renders like so:

In addition, if you try to submit the form with no search term entered into it, the browser will show a message. The following example is from Firefox:

Different messages will be shown when you try to submit the form with different types of invalid data contained inside the inputs; see the below examples.

### Input value length

You can specify a minimum length, in characters, for the entered value using the `minlength` attribute; similarly, use `maxlength` to set the maximum length of the entered value.

The example below requires that the entered value be 4–8 characters in length.

```html
<form>
  <div>
    <label for="mySearch">Search for user</label>
    <input
      type="search"
      id="mySearch"
      name="q"
      placeholder="User IDs are 4–8 characters in length"
      required
      size="30"
      minlength="4"
      maxlength="8" />
    <button>Search</button>
    <span class="validity"></span>
  </div>
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

```css
input {
  margin-right: 10px;
}

input:invalid ~ span::after {
  content: "✖";
  padding-left: 5px;
  position: absolute;
}

input:valid ~ span::after {
  content: "✓";
  padding-left: 5px;
  position: absolute;
}
```

This renders like so:

If you try to submit the form with less than 4 characters, you'll be given an appropriate error message (which differs between browsers). If you try to go beyond 8 characters in length, the browser won't let you.

### Specifying a pattern

You can use the `pattern` attribute to specify a regular expression that the inputted value must follow to be considered valid (see Validating against a regular expression for a crash course).

Let's look at an example. Say we wanted to provide a product ID search form, and the IDs were all codes of two letters followed by four numbers. The following example covers it:

```html
<form>
  <div>
    <label for="mySearch">Search for product by ID:</label>
    <input
      type="search"
      id="mySearch"
      name="q"
      placeholder="two letters followed by four numbers"
      required
      size="30"
      pattern="[A-z]{2}[0-9]{4}" />
    <button>Search</button>
    <span class="validity"></span>
  </div>
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

```css
input {
  margin-right: 10px;
}

input:invalid ~ span::after {
  content: "✖";
  padding-left: 5px;
  position: absolute;
}

input:valid ~ span::after {
  content: "✓";
  padding-left: 5px;
  position: absolute;
}
```

This renders like so:

## Examples

### Accessible search form

This example shows a typical `` menu that includes a search form. WAI-ARIA features are used to make the form more accessible to assistive technology (AT) users.

#### HTML

The main nav items are comprised of a list of links. The search `<form>` is given a `role="search"` attribute, which makes the `<form>` a search landmark, announcing it to AT. We also give the `` element an `aria-label` to give it a clear label that is read out by screen readers.

```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
  <form role="search">
    <input
      type="search"
      name="q"
      placeholder="Search query"
      aria-label="Search through site content" />
    <button>Search!</button>
  </form>
</nav>
```

```css
html {
  font-family: sans-serif;
  font-size: 10px;
}

nav {
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 10px;
}

nav ul {
  padding: 0;
  list-style-type: none;
  flex: 2;
  display: flex;
}

nav li {
  text-align: center;
  flex: 1;
}

nav a {
  font-size: 2rem;
  text-transform: uppercase;
  text-decoration: none;
  color: black;
  display: block;
  width: 100%;
  height: 100%;
  line-height: 1.2;
}

nav form {
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
}

input {
  font-size: 1.6rem;
}

input[type="search"] {
  flex: 3;
  height: 30px;
}

button {
  flex: 1;
  height: 30px;
  padding: 0 1em;
  background: #333333;
  border: 0;
  color: white;
}
```

We have hidden the example's CSS and JavaScript for brevity, as they are not relevant to understanding the HTML. You can check them out by pressing the "Play" button in the live example below.

```js
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
```

#### Result

## Technical summary

       | Value
       |
        A string representing the value contained in
        the search field.

       | Events
       |
        `change` and
        `input`

       | Supported Common Attributes
       |
        `autocomplete`,
        `list`,
        `maxlength`,
        `minlength`,
        `pattern`,
        `placeholder`,
        `required`,
        `size`.

       | IDL attributes
       | `value`

       | DOM interface
       | `HTMLInputElement`

       | Implicit ARIA Role
       |
        with no `list` attribute:
        <code>searchbox</code>
        with `list` attribute: <code>combobox</code>

## See also

- HTML Forms
- `` and the `HTMLInputElement` interface it's based upon
- ``
