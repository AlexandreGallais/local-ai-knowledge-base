---
title: "Creating CSS carousels (part 1 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/overflow/carousels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Creating CSS carousels

The CSS overflow module defines features enabling the creation of flexible pure-CSS carousels with browser-generated and developer-styled scroll buttons and scroll markers. This guide explains how to create a carousel using these features.

## Carousel concepts

**Carousels** are a common feature on the web. They typically take the form of a scrolling content area containing several items, such as presentation slides, ads, headline news stories, or key <example-value> features.

Users can move through the items by clicking or activating navigational buttons or by swiping. The navigation usually includes:

- **scroll buttons**
    Generally "previous" and "next" buttons or links.
- **scroll markers**
    A series of button or link icons, each representing one or more items depending on how many items are shown at each scroll position within the carousel.

A key <example-value> of carousels is **pagination** — the items feel like separate pieces of content that are moved between rather than forming one continuous section of content. You might show one item at a time or several items on each carousel "page". When several items are visible, you might show an entirely new group of items each time the "next" or "previous" button is pressed. Alternatively, you could add a single new item to one end of the list while moving the item at the other end out of view.

Carousels can be quite brittle and challenging to implement with JavaScript. They require scripts to associate scroll markers with the items they represent while continuously updating the scroll buttons to keep them operating correctly.

Fortunately, we can create carousels with associated controls without the use of JavaScript, using CSS carousel features.

## CSS carousel features

The CSS carousel features provide pseudo-elements and pseudo-classes that enable the creation of carousels using only CSS and HTML, with the browser handling most of the scrolling and link references in a flexible and consistent manner. These features are as follows:

- `::scroll-button()`
    Generated inside a scroll container, these pseudo-elements represent scroll buttons, which scroll the container in a specified direction.
- `::scroll-marker-group`
    Generated inside a scroll container; used to collect together and lay out scroll markers.
- `::scroll-marker`
    Generated inside the children of a scroll container ancestor or within a scroll container's columns, to represent their scroll markers. These can be selected to scroll the container to their associated child elements or column, and are collected inside the scroll container's `::scroll-marker-group` for layout purposes.
- `:target-current`
    Used to select the currently active scroll marker and style it. The ability to style the active scroll marker is important for both usability and accessibility.
- `:target-before` and `:target-after`
    Used to select and style scroll markers before and after the currently active scroll marker, respectively. They are useful for styling navigation items that come before and after the active navigation position, indicating items the user has already viewed and those that are still to come.
- `::column`
    Represents the individual columns generated when a container is set to display its content in multiple columns via CSS multi-column layout. The `::column` pseudo-element can be used in conjunction with `::scroll-marker` to generate a scroll marker for each column.
