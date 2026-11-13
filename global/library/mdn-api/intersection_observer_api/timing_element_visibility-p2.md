---
title: "Timing element visibility with the Intersection Observer API (part 2 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersection_observer_api/timing_element_visibility/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Timing element visibility with the Intersection Observer API (part 2 of 4)

## Building the site

### Site structure: The HTML

The site's structure is not too complicated. We'll be using CSS Grid to style and lay out the site, so we can be pretty straightforward here:

```html
<div class="wrapper">
  <header>
    <h1>A Fake Blog</h1>
    <h2>Showing Intersection Observer in action!</h2>
  </header>

  <aside>
    <nav>
      <ul>
        <li><a href="#link1">A link</a></li>
        <li><a href="#link2">Another link</a></li>
        <li><a href="#link3">One more link</a></li>
      </ul>
    </nav>
  </aside>

  <main>…</main>
</div>
```

This is the framework for the entire site. At the top is the site's header region, contained within a `` block. Below that, we define the site's sidebar as a list of links within an `` block.

Finally comes the main body. We start with an empty `` element here. This box will be populated using script later.

### Styling the site with CSS

With the structure of the site defined, we turn to the styling for the site. Let's look at the style for each component of the page individually.

#### The basics

We provide styles for the `<body>` and `` elements to define the site's background as well as the grid the various parts of the site will be placed in.

```css
body {
  font-family: "Open Sans", "Helvetica", "Arial", sans-serif;
  background-color: aliceblue;
}

.wrapper {
  display: grid;
  grid-template-columns: auto minmax(min-content, 1fr);
  grid-template-rows: auto minmax(min-content, 1fr);
  max-width: 700px;
  margin: 0 auto;
  background-color: aliceblue;
}
```

The site's `<body>` is configured here to use one of a number of common sans-serif fonts, and to use `"aliceblue"` as the background color. Then the `"wrapper"` class is defined; it wraps the entire blog, including the header, sidebar, and body content (articles and ads).

The wrapper establishes a CSS grid with two columns and two rows. The first column (sized automatically based on its content) is used for the sidebar and the second column (which will be used for body content) is sized to be at least the width of the contents of the column and at most all remaining available space.

The first row will be used specially for the site header. The rows are sized the same way as the columns: the first one is automatically sized and the second one uses the remaining space, but at least enough space to provide room for all elements within it.

The wrapper's width is fixed at 700px so that it will fit in the available space when presented inline on MDN below.

#### The header

The header is fairly simple, since for this example all it contains is some text. Its style looks like this:

```css
header {
  grid-column: 1 / -1;
  grid-row: 1;
  background-color: aliceblue;
}
```

`grid-row` is set to 1, since we want the header to be placed in the top row of the site's grid. More interesting is our use of `grid-column` here; here we specify that we want the column to start in the first column and ends in the first column past the last grid line—in other words, the header spans across all of the columns within the grid. Perfect for our needs.

#### The sidebar

Our sidebar is used to present links to other pages on the site. None of them work in our example here, but they exist to help with the presentation of a blog-like experience. The sidebar is represented using an `` element, and is styled as follows:

```css
aside {
  grid-column: 1;
  grid-row: 2;
  background-color: cornsilk;
  padding: 5px 10px;
}

aside ul {
  padding-left: 0;
}

aside ul li {
  list-style: none;
}

aside ul li a {
  text-decoration: none;
}
```

The most important thing to note here is that the `grid-column` is set to 1, to place the sidebar on the left-hand side of the screen. If you change this to -1, it will appear on the right (although some other elements will need some adjustments made to their margins to get the spacing just right). The `grid-row` is set to 2, to place it alongside the site body.

#### The content body

Speaking of the site's body: the main content of the site is kept in a `` element. The following style is applied to that:

```css
main {
  grid-column: 2;
  grid-row: 2;
  margin: 0;
  margin-left: 16px;
  font-size: 16px;
}
```

The primary feature here is that the grid position is set to place the body content in column 2, row 2.

#### Articles

Each article is contained in an `` element, styled like this:

```css
article {
  background-color: white;
  padding: 6px;
}

article:not(:last-child) {
  margin-bottom: 8px;
}

article h2 {
  margin-top: 0;
}
```

This creates article boxes with a white background which float atop the blue background, with a small margin around the article. Every article which isn't the last item in the container has an 8px bottom margin to space things apart.

#### Ads

Finally, the ads have the following initial styling. Individual ads may customize the style somewhat, as we'll see later.

```css
.ad {
  height: 96px;
  padding: 6px;
  border-color: #555555;
  border-style: solid;
  border-width: 1px;
}

.ad:not(:last-child) {
  margin-bottom: 8px;
}

.ad h2 {
  margin-top: 0;
}

.ad div {
  position: relative;
  float: right;
  padding: 0 4px;
  height: 20px;
  width: 120px;
  font-size: 14px;
  bottom: 30px;
  border: 1px solid black;
  background-color: rgb(255 255 255 / 50%);
}
```

There's nothing magic in here. It's fairly basic CSS.
