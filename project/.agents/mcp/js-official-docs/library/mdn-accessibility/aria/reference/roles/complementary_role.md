---
title: "ARIA: complementary role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/complementary_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: complementary role

The `complementary` landmark role is used to designate a supporting section that relates to the main content, yet can stand alone when separated. These sections are frequently presented as sidebars or call-out boxes. If possible, use the HTML \ element instead.

```html
<div role="complementary">
  <h2>Our partners</h2>
  <!-- complementary section content -->
</div>
```

This is a sidebar containing links to project sponsors.

## Description

The `complementary` role is a landmark role. Landmarks can be used by assistive technology to quickly identify and navigate to large sections of the document. Content listed within a container with the `complementary` landmark role should make sense if separated from the main content of the document.

> **Note:**
> The `` element has an implicit role of `complementary`, unless it has no accessible name and is nested in sectioning content. Developers should always prefer using the correct semantic HTML element over using ARIA.

## Examples

```html
<div role="complementary">
  <h2>Trending articles</h2>
  <ul>
    <li><a href="#">18 tweets that will make you feel all the feels</a></li>
    <li>
      <a href="#">Stop searching! I've found the perfect lunch containers.</a>
    </li>
    <li>
      <a href="#">The time has come to decide how to call these foods</a>
    </li>
    <li><a href="#">17 really good posts we saw on Tumblr this week</a></li>
    <li><a href="#">10 parent hacks we know work because we tried them</a></li>
  </ul>
</div>
```

## Accessibility concerns

Landmark roles are intended to be used sparingly, to identify larger overall sections of the document. Using too many landmark roles can create "noise" in screen readers, making it difficult to understand the overall layout of the page.

## Best practices

### Prefer HTML

The `` element has an implicit role of `complementary`, unless it has no accessible name and is nested in sectioning content. If possible, prefer using the semantic `` element instead of the `complementary` role.

### Labeling landmarks

#### Multiple landmarks

If there is more than one `complementary` landmark role or `` element in a document, provide a label for each landmark using the `aria-label` attribute, or, if the aside has an appropriately descriptive title, point to it with the `aria-labelledby` attribute. This label will allow an assistive technology user to be able to quickly understand the purpose of each landmark.

```html
<aside aria-label="Note about usage">
  <!-- content -->
</aside>

…

<aside id="sidebar" aria-label="Sponsors">
  <!-- content -->
</aside>
```

#### Redundant descriptions

Screen readers will announce the type of role the landmark is. Because of this, you do not need to describe what the landmark is in its label. For example, a declaration of `role="complementary"` with an `aria-label="Sidebar"` may be announced redundantly as, "complementary sidebar".

### Added benefits

Certain technologies such as browser extensions can generate lists of all landmark roles present on a page, allowing non-screen reader users to also quickly identify and navigate to large sections of the document.

- Landmarks browser extension

## See also

- \: The Aside element
- Using HTML sections and outlines
- Landmark roles: Using ARIA: Roles, States, and Properties
- Accessible Landmarks | scottohara.me
- Aside Revisited | HTML5 Doctor
