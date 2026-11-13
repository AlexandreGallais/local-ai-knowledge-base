---
title: "ARIA: tooltip role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/tooltip_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: tooltip role

A `tooltip` is a contextual text bubble that displays a description for an element that appears on pointer hover or keyboard focus.

## Description

Tooltips provide contextual information about an element when that owning element receives focus or is hovered over, but is otherwise not visible on the page. The tooltip is displayed automatically, after a brief delay; the user does not request it. While a tooltip can be placed on any content, they generally are tips for tools or controls, such as providing additional content for icons that have brief labels (or no labels at all, which is not accessible!).

A tooltip typically becomes visible, after a short delay of generally one to five seconds, in response to a mouse hover, or after the owning element receives keyboard focus. Just as it is opened automatically, without user request, it is closed automatically when the focus is lost or on mouse out. It must stay open when the mouse moves over the tooltip itself, and should also close when the user presses the `Escape` key.

Because the tooltip itself never receives focus and is not in the tabbing order, a tooltip cannot contain interactive elements like links, inputs, or buttons.

The `tooltip` is not the appropriate role for the more information "i" icon, ⓘ. A tooltip is directly associated with the owning element. The `role="tooltip"` is included on the element containing the tip content, not on the icon or control that triggers it. To show a tooltip when the ⓘ is hovered or focused, give the trigger an accessible name and reference the tooltip with `aria-describedby`, so the tip content is announced when the trigger receives focus. Because the detailed information describes the related control rather than the ⓘ itself, also put `aria-describedby` on that control, as shown in the more information icon example.

The use of the ARIA `tooltip` role is a supplement to the normal browser tooltip behavior. An example of a native browser tooltip is the way some browsers display an element's `title` attribute on long mouse hover. One cannot activate this feature through either keyboard focus or through touch interaction, making this feature inaccessible. If the information is important enough to include as a tooltip or title, consider including it in visible text.

Elements with the `tooltip` role should be referenced through the use of `aria-describedby` before or when the tooltip is displayed. The `aria-describedby` attribute is on the owning element, not on the tooltip.

The tooltip is not considered a popup in terms of the `aria-haspopup` property on the owning element, which is why we used "text bubble" in the introductory definition.

Though a tooltip may appear and disappear, as its appearance is automatic and not intentionally controlled by the user, the `aria-expanded` role is not supported.

The accessible name of a tooltip can come from the contents. While, in theory, they could come from an `aria-label` or `aria-labelledby`, in most cases, using ARIA properties to provide a tooltip with an accessible name is not recommended.

Tooltips provide additional information, generally with no direct interaction on the tooltip itself. They are generally associated with the content they're defining via an `aria-describedby` with the `id` of the primary element. Therefore, if the tooltip has an accessible name explicitly set, that name is exposed as the primary element's description rather than the contents of the tooltip, meaning the tooltip contents may never be discovered by a screen reader user.

### Associated WAI-ARIA roles, states, and properties

- The element that serves as the tooltip container has `role="tooltip"` set.
- The element that triggers the tooltip references the tooltip element with `aria-describedby`.

### Keyboard interactions

- `Escape`
    Closes the tooltip

The tooltip should appear on focus or when the element is hovered on, without additional interaction. It should disappear automatically when the focus on the owning element is lost or the mouse is moved outside the owning element and the tooltip. While the tooltip does not receive focus, the `Escape` should close it if it is open.

### Required JavaScript features

- The tooltip is displayed and disappears via keyboard focus and removal of focus and by the mouse events - mousing over and mousing out.

- The tooltip never receives focus. Focus stays on the owning element.

- The tooltip can be hidden with the `Escape` key

- The tooltip stays open when hovered

- The tooltip is only hidden via JavaScript and CSS selectors. If JavaScript is not available the tooltip is shown.

## Examples

### Using a tooltip

```html
<label for="<example-value>">Password:</label>
<input aria-describedby="<example-value>" id="<example-value>" type="<example-value>" />
<div role="<example-value>" id="<example-value>">
  <p>Password Rules:</p>
  <ul>
    <li>Minimum of 8 characters</li>
    <li>
      Include at least one lowercase letter, one uppercase letter, one number
      and one special character
    </li>
    <li>Unique to this website</li>
  </ul>
</div>
```

The tooltip can be instantiated with CSS. Change the class name with JavaScript to a class that hides the tooltip if the user hits the `Escape` key.

```css
[role="tooltip"] {
  visibility: hidden;
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: black;
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  /* Give some time before hiding so mouse can exit the input
  and enter the tooltip */
  transition: visibility 0.5s;
}
[aria-describedby]:hover,
[aria-describedby]:focus {
  position: relative;
}
[aria-describedby]:hover + [role="tooltip"],
[aria-describedby]:focus + [role="tooltip"],
[role="tooltip"]:hover,
[role="tooltip"]:focus {
  visibility: visible;
}
```

The above hides the tooltip with CSS in the default state or if the `hide-tooltip` class has been added with JavaScript (when the user hit `Escape`), with high specificity to ensure the tooltip doesn't show. When the owning element receives focus, it gets positioned relatively and the tooltip becomes visible. We keep the tooltip visible when hovering over the tooltip, consistent with WCAG 1.4.13. Here, we allow the cursor to move from the input to the tooltip without the latter disappearing by waiting 0.5s in between; there are other ways to achieve this, such as filling the gap with a transparent element that also keeps the tooltip visible when hovered over.

### Using a more information icon

This example shows a tooltip when the ⓘ button is hovered over or receives keyboard focus. The button has an accessible name and references the tooltip with `aria-describedby`, so the tooltip content is announced when the button receives focus. The input also references the tooltip with `aria-describedby`, because the information describes that control, even when the tooltip is hidden.

```html
<label for="username">Username:</label>
<input id="username" aria-describedby="username-help" />
<div class="info">
  <button
    type="button"
    aria-label="More information about usernames"
    aria-describedby="username-help">
    <span aria-hidden="true">ⓘ</span>
  </button>
  <div role="tooltip" id="username-help">
    <p>Your username is displayed publicly alongside your comments.</p>
  </div>
</div>
```

The tooltip is positioned below the icon. Padding above the text bubble bridges the gap to the button so the pointer can move onto the tooltip without closing it.

```css
.info {
  display: inline-block;
  position: relative;
}

[role="tooltip"] {
  visibility: hidden;
  position: absolute;
  top: 100%;
  right: 0;
  width: 15rem;
  padding-top: 0.5rem;
  z-index: 1;
}

.info:hover [role="tooltip"],
.info:focus-within [role="tooltip"] {
  visibility: visible;
}

[role="tooltip"] p {
  margin: 0;
  padding: 0.75rem;
  border-radius: 0.25rem;
  background: #222222;
  color: white;
  box-shadow: 0 2px 6px #00000044;
}

[role="tooltip"]::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0.5rem;
  border-right: 0.5rem solid transparent;
  border-bottom: 0.5rem solid #222222;
  border-left: 0.5rem solid transparent;
}
```

The tooltip stays visible while the button has focus or the pointer is over the button or tooltip. It is hidden when neither condition applies.

## Accessibility concerns

If the information is important enough for a tooltip, isn't it important enough to always be visible?

The tooltip must stay open when hovered, even if that technically means the mouse moves out of the owning element. As content which appears on hover can be difficult or impossible to perceive if a user is required to keep their mouse pointer over the trigger, WCAG 1.4.13 states that content made visible should be persistent, meaning it should not disappear without user action.

## Best practices

Instead of using tooltips and hiding important information, consider writing clear, succinct, always visible descriptions. If you have space, don't use tooltips or toggletips. Just provide clear labels and sufficient body text.

## See also

- The `dialog` role
- CSS: `:focus` pseudoclass
- Tooltips & Toggletips by Heydon Pickering
- Understanding SC 1.4.13:Content on Hover or Focus (WCAG Level AA)
