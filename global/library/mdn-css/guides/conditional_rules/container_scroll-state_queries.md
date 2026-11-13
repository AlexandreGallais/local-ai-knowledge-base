---
title: "Using container scroll-state queries (part 1 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/conditional_rules/container_scroll-state_queries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using container scroll-state queries

**Container scroll-state queries** are a type of container query. Rather than selectively applying styles to descendant elements based on the container's size, scroll-state queries allow you to selectively apply styles to descendant elements based on the container's scroll state. This can include whether the container is partially scrolled, snapped to a scroll snap container ancestor, or positioned via `position: sticky` and stuck to a boundary of a scroll container ancestor.

This article explains how to use container scroll-state queries, walking through an example of each type. It assumes that you know the basics of container queries. If you are new to container queries, read CSS container queries before continuing.

## Types of container scroll-state query

There are three `@container` descriptors you can use in a `scroll-state()` query:

- `scrollable`: Queries whether a container can be scrolled in the given direction via user-initiated scrolling (for example by dragging the scrollbar or using a trackpad gesture). In other words, is there any overflowing content in the given direction that can be scrolled to? This is useful for applying styling related to the scroll position of a scroll container. For example, you could display a hint that encourages people to scroll down and see more content when the scrollbar is up at the top, and hide it when the user has actually started scrolling.
- `scrolled`: Queries whether a container was most recently scrolled in the given direction. This allows you to selectively apply styles based on the user's scroll direction, for example a top menu bar that only displays when the user is scrolling upwards.
- `snapped`: Queries whether a container is going to be snapped to a scroll snap container ancestor along a given axis. This is useful for applying styles when an element is snapped to a scroll snap container. For example, you might want to highlight a snapped element in some way, or reveal some of its content that was previously hidden.
- `stuck`: Queries whether a container with a `position` value of `sticky` is stuck to an edge of its scroll container ancestor. This is useful for styling `position: sticky` elements differently when stuck — for example, you could give them a different color scheme or layout.

## Syntax overview

To establish a container element as a scroll-state query container, set the `container-type` property on it with a value of `scroll-state`. You can optionally also give it a `container-name`, so that you can target it with a specific container query:

```css
.container {
  container-type: scroll-state;
  container-name: my-container;
}
```

You can then create a `@container` block that specifies the query, the rules that are applied to children of the container if the test passes, and optionally, the `container-name` of the container(s) you want to query. If you don't specify a `container-name`, the container query will be applied to all scroll-state query containers on the page.

Here, we query only containers named `my-container` to determine whether the container can be scrolled towards its top edge:

```css
@container my-container scroll-state(scrollable: top) {
  /* CSS rules go here */
}
```

> **Note:**
> To separate scroll-state queries from other container queries, the scroll-state descriptors and value are placed inside parentheses, preceded by `scroll-state` (`scroll-state( ... )`). These constructs look like functions, but they're not.

## Using `scrollable` queries

Scroll-state `scrollable` queries, written as `scroll-state(scrollable: <keyword>)`, test whether a container's scrolling ancestor can be scrolled in the given direction via user-initiated scrolling. If not, the query returns false.

The keyword value indicates the direction you are testing for scrolling availability in, for example:

- `top`: Tests whether the container can be scrolled towards its top edge.
- `inline-end`: Tests whether the container can be scrolled towards its inline-end edge.
- `y`: Tests whether the container can be scrolled in either or both directions along its y axis.

If the test passes, the rules inside the `@container` block are applied to descendants of the matching scroll container.

Let's look at an example in which we have a scrolling container full of content, and a handy little link to scroll back to the top if wished. We will use a `scrollable` query to only show the link when the user has started to scroll down through the content.

### HTML

In the HTML we have an `` element containing enough content to cause the document to scroll, preceded by a back-to-top link:

```html
<a class="back-to-top" href="#" aria-label="Top of page">↑</a>
<article>
  <h1>Reader with container query-controlled "back-to-top" link</h1>
  <section>
    <header>
      <h2>This first section is interesting</h2>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>

    ...
  </section>

  ...
</article>
```

We have hidden most of the HTML for brevity.

```html
<a class="back-to-top" href="#" aria-label="Scroll back to top">↑</a>
<article>
  <h1>Reader with container query-controlled "back-to-top" link</h1>
  <section>
    <header>
      <h2>This first section is interesting</h2>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </header>

    <p>
      Mauris non malesuada est, sed vestibulum nibh. Duis vestibulum iaculis
      lectus, eu sagittis dolor dignissim iaculis. Nunc et orci sed sapien
      eleifend placerat. Curabitur dapibus risus eget odio sollicitudin, sit
      amet luctus justo pellentesque.
    </p>

    <p>
      <strong>Morbi non pharetra quam.</strong> Fusce vestibulum sem diam, ac
      consequat augue consectetur ut. Donec at augue viverra, tempus urna sit
      amet, porta augue.
      <em>Phasellus fringilla tincidunt sem ullamcorper varius.</em> Aenean
      gravida feugiat sem nec ultricies.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      Sed pellentesque placerat mi sed maximus. Sed vitae dui vitae mi pulvinar
      gravida sed et libero.
      <a href="#">Duis nec venenatis dolor, sed tristique felis.</a>
      Integer dapibus facilisis leo elementum vulputate. Curabitur a urna quis
      nulla vulputate tincidunt quis ac enim.
    </p>

    <p>
      Cras non elit vel leo dignissim convallis. Duis eros urna, varius sit amet
      lorem vel, feugiat euismod est.
      <strong>Aliquam ornare eu elit ut iaculis.</strong>
      Suspendisse vulputate tempor leo, non rhoncus risus aliquam vel.
    </p>
  </section>
  <section>
    <header>
      <h2>This one, not so much</h2>

      <p>Suspendisse varius est ac turpis mollis cursus.</p>
    </header>

    <p>
      <strong
        >Curabitur faucibus condimentum eros, ut auctor felis lacinia
        sed.</strong
      >
      Praesent vitae scelerisque eros.
    </p>

    <p>
      <em>Ut vitae suscipit augue.</em> Cras et orci condimentum ante dignissim
      iaculis. Sed consectetur quis est sed dignissim. Nulla egestas orci erat,
      et commodo arcu feugiat ut.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      Sed non tempor massa, at accumsan ante. Pellentesque habitant morbi
      <a href="#">tristique senectus</a> et netus et malesuada fames ac turpis
      egestas.
    </p>

    <p>
      Pellentesque placerat luctus tempor. Nunc congue dapibus eros, at
      vulputate nulla. Sed rutrum eleifend magna vel porta. Integer cursus orci
      faucibus turpis scelerisque, nec pharetra arcu molestie.
    </p>
  </section>
  <section>
    <header>
      <h2>Hopefully this section provides some clarity?</h2>

      <p>Curabitur facilisis ornare lorem et eleifend.</p>
    </header>

    <p>
      <strong>Aenean mollis non neque sed finibus.</strong> Lorem ipsum dolor
      sit amet, consectetur adipiscing elit. Suspendisse sagittis viverra urna.
      In hac habitasse platea dictumst. Vestibulum neque orci, mollis sagittis
      augue et, pharetra vehicula diam.
    </p>

    <img src="#" alt="Placeholder" />

    <p>
      <a href="#">Pellentesque sollicitudin</a> nunc quis nisl condimentum, ac
      iaculis libero feugiat.
      <strong>Nullam ultrices purus a nulla dignissim hendrerit.</strong> In
      molestie consectetur est quis pulvinar.
    </p>

    <p>
      Vivamus ac erat eu est lobortis commodo. Orci varius natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. In nulla turpis,
      <strong>mollis et est tempor</strong>, dignissim aliquam metus. Proin eu
      arcu quis erat mollis pulvinar. Vivamus at facilisis neque.
    </p>

    <p>
      Integer bibendum laoreet erat, quis vulputate mauris bibendum nec. Class
      aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
      himenaeos. Nam ut est in arcu interdum hendrerit.
    </p>
  </section>
  <section>
    <header>
      <h2>A summary of sorts</h2>

      <p>Nunc facilisis augue quis ex porta aliquam.</p>
    </header>

    <img src="#" alt="Placeholder" />

    <p>
      <strong
        >Fusce nisi enim, venenatis a est vel, varius placerat lacus.</strong
      >
      Nunc tempus rutrum nisl bibendum aliquet. Pellentesque vitae nunc sed nisl
      tincidunt elementum a sit amet nisi. Morbi pretium at dolor in pulvinar.
      Curabitur dapibus eleifend accumsan.
    </p>

    <p>
      Donec rhoncus, leo vitae mollis maximus, tellus lorem interdum arcu, eu
      <em>tempor lectus libero in risus</em>. Ut sit amet magna vitae mauris
      tempor bibendum. <a href="#">Integer id mauris ut ex mattis finibus.</a>
    </p>

    <p>
      Curabitur dui felis, elementum et tellus id, blandit facilisis lorem.
      Aliquam sed posuere ligula, at auctor ipsum. Morbi dignissim accumsan
      tellus pretium iaculis.
    </p>
  </section>
</article>
```

### CSS

The `.back-to-top` link is given a `position` value of `fixed`, placed at the bottom-right corner of the viewport, and moved off the viewport using a `translate` value of `80px 0`. A `transition` value will animate the `translate` and `background-color` when either value changes.

```css
/* General styling */

* {
  box-sizing: border-box;
}

html {
  font-family: "Helvetica", "Arial", sans-serif;
  height: 100%;
}

body {
  height: inherit;
  width: 100%;
  max-width: 540px;
  padding: 20px;
  margin: 0 auto;
}

p {
  line-height: 1.5;
}

img {
  display: block;
  width: 90%;
  margin: 30px auto;
  padding: 20px;
  border: 2px solid gray;
  aspect-ratio: 3/2;
}
```

```css
.back-to-top {
  width: 64px;
  height: 64px;
  color: white;
  text-align: center;
  position: fixed;
  bottom: 10px;
  right: 10px;
  translate: 80px 0;
  transition:
    0.4s translate,
    0.2s background-color;
}
```

```css
.back-to-top {
  text-decoration: none;
  border-radius: 50%;
  border: 1px solid #00000077;
  background-color: #00000077;
  color: white;
  font-size: 3rem;
  text-shadow: 0 0 2px black;
  padding-bottom: 10px;
}

.back-to-top:hover,
.back-to-top:focus {
  background: #00000099;
}
```

The scroll container in this example is the `<html>` element itself, denoted as a scroll-state query container with a `container-type` value of `scroll-state`. The `container-name` isn't strictly necessary but is useful in cases where the code is added to a codebase with multiple scroll-state query containers targeted with different queries.

```css
html {
  container-type: scroll-state;
  container-name: scroller;
}
```

Next, we define a `@container` block that sets the container name targeted by this query, and the query itself — `scrollable: top`. This query applies the rules contained inside the block only if the `<html>` element can be scrolled toward its top edge — in other words, if the container has previously been scrolled downwards. If that is the case, `translate: 0 0` is applied to the `.back-to-top` link, which transitions it back on-screen.

```css
@container scroller scroll-state(scrollable: top) {
  .back-to-top {
    translate: 0 0;
  }
}
```

We've hidden the rest of the example CSS for brevity.

### Result

Try scrolling the document down, and note how the "back-to-top" link appears as a result, animating smoothly from the right side of the viewport due to the `transition`. If you scroll back to the top by activating the link or manually scrolling, the "back-to-top" link transitions off-screen.
