---
title: "<animate>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/animate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <animate>

The **`<animate>`** SVG element provides a way to animate an attribute of an element over time.

## Attributes

This element only includes global attributes.

## DOM Interface

This element implements the `SVGAnimateElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
  margin: 0;
  padding: 0;
}
```

```html
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <rect width="10" height="10">
    <animate
      attributeName="rx"
      values="0;5;0"
      dur="10s"
      repeatCount="indefinite" />
  </rect>
</svg>
```

## Accessibility concerns

Blinking and flashing animation can be problematic for people with cognitive concerns such as Attention Deficit Hyperactivity Disorder (ADHD). Additionally, certain kinds of motion can be a trigger for Vestibular disorders, epilepsy, and migraine and Scotopic sensitivity.

Consider providing a mechanism for pausing or disabling animation, as well as using the Reduced Motion Media Query or equivalent User Agent client hint `Sec-CH-Prefers-Reduced-Motion` to create a complementary experience for users who have expressed a preference for no animated experiences.

- Designing Safer Web Animation For Motion Sensitivity · An A List Apart Article
- An Introduction to the Reduced Motion Media Query | CSS-Tricks
- Responsive Design for Motion | WebKit
- MDN Understanding WCAG, Guideline 2.2 explanations
- Understanding Success Criterion 2.2.2 | W3C Understanding WCAG 2.0
