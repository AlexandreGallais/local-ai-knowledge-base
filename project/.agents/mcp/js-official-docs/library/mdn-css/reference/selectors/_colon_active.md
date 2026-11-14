---
title: "`:active` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_active/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:active` CSS pseudo-class

The **`:active`** CSS pseudo-class represents an element (such as a button) that is being activated by the user. When using a mouse, "activation" typically starts when the user presses down the primary mouse button.

```css
.joinBtn {
  width: 10em;
  height: 5ex;
  background-image: linear-gradient(135deg, #f34079 40%, #fc894d);
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.joinBtn:active {
  box-shadow: 2px 2px 5px #fc894d;
}
```

```html
<p>Would you like to subscribe to our channel?</p>
<button class="joinBtn">Subscribe</button>
```

The `:active` pseudo-class is commonly used on `` and `` elements. Other common targets of this pseudo-class include elements that are _contained in_ an activated element, and form elements that are being activated through their associated ``.

Styles defined by the `:active` pseudo-class will be overridden by any subsequent link-related pseudo-class (`:link`, `:hover`, or `:visited`) that has at least equal specificity. To style links appropriately, put the `:active` rule after all other link-related rules, as defined by the _LVHA-order_: `:link` — `:visited` — `:hover` — `:active`.

> **Note:**
> On systems with multi-button mice, CSS specifies that the `:active` pseudo-class must only apply to the primary button; on right-handed mice, this is typically the leftmost button.

## Syntax

```css
:active {
  /* ... */
}
```

## Examples

### Active links

#### HTML

```html
<p>
  This paragraph contains a link:
  <a href="#">This link will turn red while you click on it.</a>
  The paragraph will get a gray background while you click on it or the link.
</p>
```

#### CSS

```css
/* Unvisited links */
a:link {
  color: blue;
}
/* Visited links */
a:visited {
  color: purple;
}
/* Hovered links */
a:hover {
  background: yellow;
}
/* Active links */
a:active {
  color: red;
}

/* Active paragraphs */
p:active {
  background: #eeeeee;
}
```

#### Result

### Active form elements

#### HTML

```html
<form>
  <label for="my-button">My button: </label>
  <button id="my-button" type="button">Try Clicking Me or My Label!</button>
</form>
```

#### CSS

```css
form :active {
  color: red;
}

form button {
  background: white;
}
```

#### Result

## See also

- Link-related pseudo-classes: `:link`, `:visited`, and `:hover`
