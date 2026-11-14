---
title: "User Preferences API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/user_preferences_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# User Preferences API

The **User Preferences API** allows page authors to programmatically override user preference-related media query settings.

## Concepts and Usage

Supporting user agents define values for the CSS media queries `prefers-color-scheme`, `prefers-contrast`, `prefers-reduced-motion`, `prefers-reduced-transparency`, and `prefers-reduced-data`. The `PreferenceManager` object provides programmatic access to these preferences, allowing page authors to listen for preference changes and override them.

## Examples

### Dark Mode Toggle

The following code implements a minimal dark mode toggle.

#### HTML

The HTML features a form containing three radio buttons. These radio buttons set the `color-scheme` field to either `system`, `light`, or `dark`.

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta name="color-scheme" content="light dark" />
  </head>
  <body>
    <form>
      <label>
        <input type="radio" name="color-scheme" value="light" />
        Light
      </label>
      <label>
        <input type="radio" name="color-scheme" value="dark" />
        Dark
      </label>
    </form>
  </body>
</html>
```

#### JavaScript

The JavaScript registers change event listeners for all elements named `color-scheme`. If the value is `system`, the handler clears the color scheme override. Otherwise, it requests a color scheme override with the value of the input element.

```js
if (navigator.preferences) {
  const inputs = {
    light: document.querySelector('[name="color-scheme"][value="light"]'),
    dark: document.querySelector('[name="color-scheme"][value="dark"]'),
  };

  inputs[navigator.preferences.colorScheme.value].checked = true;

  inputs.light.addEventListener("change", () => {
    navigator.preferences.colorScheme.requestOverride("light");
  });
  inputs.dark.addEventListener("change", () => {
    navigator.preferences.colorScheme.requestOverride("dark");
  });

  navigator.preferences.colorScheme.addEventListener("change", () => {
    inputs[navigator.preferences.colorScheme.value].checked = true;
  });
} else {
  document.body.append(
    "Your browser doesn’t support the navigator.preferences API",
  );
}
```

#### Result

```css
body {
  font-family: system-ui, sans-serif;
}

label {
  display: block;
  margin: 0.5em 0;
}
```
