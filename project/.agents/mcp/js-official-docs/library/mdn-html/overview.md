---
title: "HTML: HyperText Markup Language"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTML: HyperText Markup Language

**HTML** (HyperText Markup Language) is the most basic <example-value> block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript).

"Hypertext" refers to text containing links that connect web pages to one another, either within a single website or between websites. Links are a fundamental aspect of the Web. By uploading content to the Internet and linking it to pages created by other people, you become an active participant in the World Wide Web.

HTML uses "markup" to annotate text, images, and other content for display in a Web browser. HTML markup includes special "elements" such as `<head>`, `<title>`, `<body>`, ``, ``, ``, ``, ``, ``, ``, ``, ``, `<audio>`, `<canvas>`, `<datalist>`, ``, ``, ``, `<search>`, `<output>`, `<progress>`, ``, ``, ``, `` and many others.

An HTML element is set off from other text in a document by "tags", which consist of the element name surrounded by `<` and `>`. The name of an element inside a tag is case-insensitive. That is, it can be written in uppercase, lowercase, or a mixture. For example, the `<title>` tag can be written as `<Title>`, `<TITLE>`, or in any other way. However, the convention and recommended practice is to write tags in lowercase.

The articles below can help you learn more about HTML.

## Beginner's tutorials

Our learn web development core modules contain modern, up-to-date tutorials covering HTML fundamentals.

- Your first website: Creating the content
    This article provides a brief tour of what HTML is and how to use it, aimed at people who are completely new to web development.
- Structuring content with HTML
    This module covers the basics of the HTML language, before looking at key areas such as document structure, links, lists, images, forms, and more.
- HTML forms
    Forms are a very important part of the Web — these provide much of the functionality you need for interacting with websites, e.g., registering and logging in, sending feedback, buying products, and more. This module gets you started with creating the client-side/front-end parts of forms.

## Guides

The HTML guides help you build with HTML on the web. They cover topics such as forms, CORS, content preloading, and responsive images.

- HTML cheatsheet for syntax and common tasks
    Quick reference for common HTML syntax and tasks.
- Using HTML comments ``
    HTML comments are used to add explanatory notes to the markup or to prevent the browser from interpreting specific parts of the document.
- Using HTML form validation and the Constraint Validation API
    HTML5 introduced constraint validation to ease form validation on the client side. Basic <example-value> can be checked without JavaScript by setting attributes on form elements.
- Content categories
    HTML is comprised of several kinds of content, each of which is allowed to be used in certain contexts and is disallowed in others. Similarly, each context has a set of other content categories it can contain and elements that can or can't be used in them. This is a guide to these categories.
- Using date and time formats in HTML
    Certain HTML elements use date and/or time values. This guide describes the formats of the strings that specify these values.
- Using microdata in HTML
    Microdata is used to nest metadata within existing content on web pages. Search engines and web crawlers can extract and process microdata to provide a richer browsing experience.
- Using microformats in HTML
    Microformats are standards used to embed semantics and structured data in HTML for use by social web applications, search engines, aggregators, and other tools.
- Understanding quirks and standards modes
    Historical information on quirks mode and standards mode.
- Using responsive images in HTML
    Learn about responsive images that work well on devices with widely differing screen sizes, resolutions, and other features, improving performance across different devices.
- Media types and formats on the web
    The `<audio>` and `` elements allow you to play audio and video media natively within your content without the need for external software support.

## How to

- Define terms with HTML
    HTML provides several ways to convey description semantics, whether inline or as structured glossaries. This article shows how to properly mark up keywords when defining them.
- Use data attributes
    HTML5 is designed with extensibility in mind for data that should be associated with a particular element but need not have any defined meaning. `data-*` attributes allow us to store extra information on standard, semantic HTML elements.
- Use cross-origin images in a canvas
    Some HTML elements that provide support for CORS, such as `` or ``, have a `crossorigin` attribute (`crossOrigin` property), which lets you configure the CORS requests for the element's fetched data.
- Add a hitmap on top of an image
    Image maps allow hyperlinks to be associated with different parts of an image. This article shows how to create and implement them.
- Author fast-loading HTML pages
    These tips are based on common knowledge and experimentation. An optimized web page not only provides for a more responsive site for your visitors but also reduces the load on your web servers and internet connection.
- Add JavaScript to your web page
    This article explains how to add JavaScript code to an HTML file.

## Reference

HTML consists of **elements**, each of which may be modified by some number of **attributes**. HTML documents are connected to each other with **links**. Browse the complete HTML reference documentation.

- HTML elements
    Reference for all HTML elements.
- HTML attributes
    Reference for all HTML attributes. Attributes are additional values that configure elements or adjust their behavior in various ways.
- Global attributes
    Reference for global attributes that may be specified on all HTML elements, _even those not specified in the standard_. This means that any non-standard elements must still permit these attributes, even though those elements make the document HTML5-noncompliant.

### Attributes by element

- Input types
    Used to create interactive controls for web-based forms.
- Script types
    Indicates the type of script represented by the element.
- meta name
    Provides metadata in name-value pairs for the whole page.

### Attribute values

- rel keywords
    Defines the relationship between a linked resource and the current document.

## Related topics

- Applying color to HTML elements using CSS
    This article covers most of the ways you use CSS to add color to HTML content, listing what parts of HTML documents can be colored and what CSS properties to use when doing so.
