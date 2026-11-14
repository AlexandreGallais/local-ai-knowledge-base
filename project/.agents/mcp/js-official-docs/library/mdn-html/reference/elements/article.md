---
title: "`<article>` HTML article contents element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/article/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<article>` HTML article contents element

The **``** HTML element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.

```html
<article class="forecast">
  <h1>Weather forecast for Seattle</h1>
  <article class="day-forecast">
    <h2>03 March 2018</h2>
    <p>Rain.</p>
  </article>
  <article class="day-forecast">
    <h2>04 March 2018</h2>
    <p>Periods of rain.</p>
  </article>
  <article class="day-forecast">
    <h2>05 March 2018</h2>
    <p>Heavy rain.</p>
  </article>
</article>
```

```css
.forecast {
  margin: 0;
  padding: 0.3rem;
  background-color: #eeeeee;
}

.forecast > h1,
.day-forecast {
  margin: 0.5rem;
  padding: 0.3rem;
  font-size: 1.2rem;
}

.day-forecast {
  background: right/contain content-box border-box no-repeat
    url("/shared-assets/images/examples/rain.svg") white;
}

.day-forecast > h2,
.day-forecast > p {
  margin: 0.2rem;
  font-size: 1rem;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

A given document can have multiple articles in it; for example, on a blog that shows the text of each article one after another as the reader scrolls, each post would be contained in an `` element, possibly with one or more ``s within.

- Each `` should be identified, typically by including a heading (`<h1>` - `<h6>` element) as a child of the `` element.
- When an `` element is nested, the inner element represents an article related to the outer element. For example, the comments of a blog post can be `` elements nested in the `` representing the blog post.
- Author information of an `` element can be provided through the `<address>` element, but it doesn't apply to nested `` elements.
- The publication date and time of an `` element can be described using the `datetime` attribute of a `<time>` element.

## Examples

```html
<article class="film_review">
  <h2>Jurassic Park</h2>
  <section class="main_review">
    <h3>Review</h3>
    <p>Dinos were great!</p>
  </section>
  <section class="user_reviews">
    <h3>User reviews</h3>
    <article class="user_review">
      <h4>Too scary!</h4>
      <p>Way too scary for me.</p>
      <footer>
        <p>
          Posted on
          <time datetime="2015-05-16 19:00">May 16</time>
          by Lisa.
        </p>
      </footer>
    </article>
    <article class="user_review">
      <h4>Love the dinos!</h4>
      <p>I agree, dinos are my favorite.</p>
      <footer>
        <p>
          Posted on
          <time datetime="2015-05-17 19:00">May 17</time>
          by Tom.
        </p>
      </footer>
    </article>
  </section>
  <footer>
    <p>
      Posted on
      <time datetime="2015-05-15 19:00">May 15</time>
      by Staff.
    </p>
  </footer>
</article>
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        sectioning content,
        palpable content

       | Permitted content
       |
        Flow content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content. Note that an `&#x3C;article>` element must not be a
        descendant of an `<address>` element.

       | Implicit ARIA role
       |
        <code
          >article</code
        >

       | Permitted ARIA roles
       |
        `application`, `document`,
        `feed`, `main`,
        `none`, `presentation`,
        `region`

       | DOM interface
       | `HTMLElement`

## See also

- Other section-related elements: `<body>`, ``, ``, ``, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<hgroup>`, ``, ``, `<address>`
- Using HTML sections and outlines
