---
title: "Using container scroll-state queries (part 2 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/conditional_rules/container_scroll-state_queries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using container scroll-state queries (part 2 of 4)

## Using `scrolled` queries

Scroll-state `scrolled` queries, written as `scroll-state(scrolled: <keyword>)`, test whether a container's scrolling ancestor was most recently scrolled in the given direction. If not, the query returns false.

The keyword value indicates the direction you are testing. For example:

- `block-start`: Tests whether the container was most recently scrolled towards its block-start edge.
- `right`: Tests whether the container was most recently scrolled towards its right-hand edge.
- `y`: Tests whether the container was most recently scrolled up or down along the y axis.
- `none`: Tests whether the container is not a scroll container or has not been scrolled in any direction since rendering.

If the test returns true, the rules inside the `@container` block are applied to the descendants of the matching scroll container.

Let's look at an example of a scroll container with a `scrolled` query that displays top and bottom content "bars" only when the user is scrolling up or down, respectively.

### HTML

In our HTML, we have an `` element containing enough content to cause the document to scroll, preceded by two `` elements that represent our top and bottom "bars":

```html
<div class="bar" id="top-bar">You're currently scrolling towards the top.</div>
<div class="bar" id="bottom-bar">
  You're currently scrolling towards the bottom.
</div>
<article>
  <h1>Document with scrolled container query</h1>
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
<div class="bar" id="top-bar">You're currently scrolling towards the top.</div>
<div class="bar" id="bottom-bar">
  You're currently scrolling towards the bottom.
</div>
<article>
  <h1>Document with scrolled container query</h1>
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

The "bars" are given some rudimentary styling. Most significantly, they are given a `position` value of `fixed`, which we offset from either side using `left` and `right` values.

```css
/* General styling */

* {
  box-sizing: border-box;
}

html {
  font-family: "Arial", sans-serif;
  height: 100%;
}

body {
  height: inherit;
  width: 90%;
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
.bar {
  border-radius: 10px;
  border: 1px solid black;
  background-color: #00000099;
  padding: 10px;
  color: white;
  text-shadow: 1px 1px 1px black;
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  left: 5px;
  right: 5px;
}
```

Next, we set negative `top` and `bottom` length values on the top and bottom bars so they are hidden above and below the viewport by default. We add a `transition` to smoothly animate them into view when their `translate` values change.

```css
#top-bar {
  top: -50px;
  transition: 0.6s translate;
}

#bottom-bar {
  bottom: -50px;
  transition: 0.6s translate;
}
```

The scroll container in this example is the `<html>` element itself, denoted as a scroll-state query container with a `container-type` value of `scroll-state`. The `container-name` isn't strictly necessary, but it is useful when a codebase has multiple scroll-state query containers targeted with different queries.

```css
html {
  container-type: scroll-state;
  container-name: scroller;
}
```

Next, we define two `@container` blocks, both of which target the `scroller` container name. The first block defines a query `scrolled: block-end` and the second defines a query `scrolled: block-start`. Respectively, these queries apply the rules contained within their block only if the `<html>` element was most recently scrolled toward its block-end edge or block-start edge. In other words, when the container is scrolled down or up. When either condition becomes true, the bar referenced inside the block has a `translate` value set to cause it to transition on-screen. The bar referenced in the `@condition` that is no longer true transitions off-screen.

```css
@container scroller scroll-state(scrolled: block-start) {
  #top-bar {
    translate: 0 55px;
  }
}

@container scroller scroll-state(scrolled: block-end) {
  #bottom-bar {
    translate: 0 -55px;
  }
}
```

We've hidden the rest of the example CSS for brevity.

### Result

Try scrolling the document up and down, and note how the different bars appear as a result, animating smoothly on- and off-screen.
