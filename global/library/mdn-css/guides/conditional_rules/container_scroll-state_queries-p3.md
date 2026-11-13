---
title: "Using container scroll-state queries (part 3 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/conditional_rules/container_scroll-state_queries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using container scroll-state queries (part 3 of 4)

## Using `snapped` queries

Relevant only when scroll snapping is implemented, scroll-state `snapped` queries, written as `scroll-state(snapped: <keyword>)`, test whether a container is going to be snapped to a scroll snap container ancestor along the given axis. If not, the query returns false.

The keyword value in this case indicates the direction you are testing the element's ability to snap in, for example:

- `x`: Tests whether the container is snapping horizontally to its scroll-snap container ancestor.
- `inline`: Tests whether the container is snapping to its scroll-snap container ancestor in the inline direction.
- `y`: Tests whether the container is snapping to its scroll-snap container ancestor in both directions.

To evaluate a container with a non-`none` `snapped` scroll-state query, it must be a container with a scroll-snap container ancestor, that is, the ancestor has a `scroll-snap-type` value other than `none`. The container query `scroll-state(snapped: none)` matches scroll-state containers that do not have a scroll container ancestor.

Evaluation will occur when the `scrollsnapchanging` event fires on the scroll snap container.

If the test passes, the rules inside the `@container` block are applied to descendants of the matching scroll snap target container.

In this example, we'll look at a scroll snap container with children that snap to it vertically and use a `snapped` query to style the children only when they are snapped or about to be snapped.

### HTML

The HTML consists of a `` element that will be a scroll snap container. Inside are several `` elements that will be snap targets. Each `` contains a wrapper `` and an `<h2>` heading. The wrappers are included to create a style target as container queries enable styling a container's descendants, not the container itself.

```html
<main>
  <section>
    <div class="wrapper">
      <h2>Section 1</h2>
    </div>
  </section>

  ...
</main>
```

We have hidden most of the HTML for brevity.

```html
<main>
  <section>
    <div class="wrapper">
      <h2>Section 1</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 2</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 3</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 4</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 5</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 6</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 7</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 8</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 9</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 10</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 11</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 12</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 13</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 14</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 15</h2>
    </div>
  </section>
  <section>
    <div class="wrapper">
      <h2>Section 16</h2>
    </div>
  </section>
</main>
```

### CSS

```css
* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

/* body and main sizing */

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
}

main {
  gap: 50px;
}
```

We set an `overflow` value of `scroll` and a fixed `height` on the `` element to turn it into a vertical scroll container. We also set a `scroll-snap-type` value of `y mandatory` to turn `` into a scroll snap container that snap targets will snap to along the y axis; `mandatory` means that a snap target will _always_ be snapped to.

```css
main {
  overflow: scroll;
  scroll-snap-type: y mandatory;
  height: 450px;
  width: 250px;
  border: 3px solid black;
}
```

The `` elements are designated as snap targets by setting a non-`none` `scroll-snap-align` value. The `center` value means that they will snap to the container at their center points.

```css
section {
  font-family: "Helvetica", "Arial", sans-serif;
  width: 150px;
  height: 150px;
  margin: 50px auto;

  scroll-snap-align: center;
}
```

```css
.wrapper {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #eeeeee;
  box-shadow:
    inset 1px 1px 4px rgb(255 255 255 / 0.5),
    inset -1px -1px 4px rgb(0 0 0 / 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    0.6s background,
    0.6s color;
}

h2 {
  font-size: 1rem;
  letter-spacing: 1px;
}
```

We want to enable the `` elements to be queried. Specifically, we want to test whether the `` elements are in the process of snapping to their container, so we denote them as scroll-state query containers by setting a `container-type` value of `scroll-state` on them. We also give them a `container-name`, which isn't strictly necessary, but will be useful if our code gets more complex later and we have multiple scroll-state query containers that we want to target with different queries.

```css
section {
  container-type: scroll-state;
  container-name: snap-container;
}
```

Next, we define a `@container` block that sets the container name we are targeting with this query, and the query itself — `snapped: y`. This query applies the rules contained inside the block only if a `` element is being snapped vertically to its container. If that is the case, we apply a new `background` and `color` to the `` element's child `.wrapper` `` to highlight it.

```css
@container snap-container scroll-state(snapped: y) {
  .wrapper {
    background: purple;
    color: white;
  }
}
```

### Result

The rendered result is shown below. Try scrolling the container up and down, and note how the `` style changes when it becomes snapped to its container.
