---
title: "no-transition-all"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-transition-all.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-transition-all

📝 Disallow `all` as a transition property.

💼 This rule is enabled in the following configs: ✅ `recommended`, 🎨 `recommended-css`, ☑️ `unopinionated`.

Using `all` can transition properties added or changed later, making transitions less predictable and potentially less efficient. List the properties that should transition instead.

## Examples

```css
/* ❌ */
.button {
	transition: all 150ms;
}

/* ✅ */
.button {
	transition: opacity 150ms, transform 150ms;
}
```

```css
/* ❌ */
.button {
	transition-property: opacity, all;
}

/* ✅ */
.button {
	transition-property: opacity, color;
}
```

This rule only checks explicit `all` values. It does not infer transition properties from indirect values such as `var(--transition)`, and it allows a shorthand that omits the transition property.

When type-aware linting is enabled, it also checks static strings assigned to standard DOM style declaration objects and passed to their `setProperty()` method. It does not check computed properties, dynamic values, JSX, or CSS-in-JS APIs.
