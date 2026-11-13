---
title: "HTML cheatsheet for syntax and common tasks"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/guides/cheatsheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTML cheatsheet for syntax and common tasks

While using HTML it can be very handy to have an easy way to remember how to use HTML tags properly and how to apply them. MDN provides you with extended HTML reference documentation as well as a deep instructional set of HTML guides. However, in many cases we just need some quick hints as we go. That's the whole purpose of the cheat sheet, to give you some quick accurate ready to use code snippets for common usages.

> **Note:**
> HTML tags must be used for their semantic value, not their appearance. It's always possible to totally change the look and feel of a given tag using CSS so, when using HTML, take the time to focus on the meaning rather than the appearance.

## Inline elements

An "element" is a single part of a webpage. Some elements are large and hold smaller elements like containers. Some elements are small and are "nested" inside larger ones. By default, "inline elements" appear next to one another in a webpage. They take up only as much width as they need in a page and fit together horizontally like words in a sentence or books shelved side-by-side in a row. All inline elements can be placed within the `<body>` element.

  Inline elements: usage and examples

       | Usage
       | Element
       | Example

       | A link
       | ``
       |
        <pre class="brush: html">
&#x3C;a href="https://example.org">
A link to example.org&#x3C;/a>.</pre
        >

       | An image
       | ``
       |
        <pre class="brush: html">&#x3C;img src="beast.png" width="50" /></pre>

       | An inline container
       | ``
       |
        <pre class="brush: html">
Used to group elements: for example,
to &#x3C;span style="color:blue">style
them&#x3C;/span>.</pre
        >

       | Emphasize text
       | ``
       |
        <pre class="brush: html">&#x3C;em>I'm posh&#x3C;/em>.</pre>

       | Italic text
       | ``
       |
        <pre class="brush: html">
Mark a phrase in &#x3C;i>italics&#x3C;/i>.</pre
        >

       | Bold text
       | ``
       |
        <pre class="brush: html">Bold &#x3C;b>a word or phrase&#x3C;/b>.</pre>

       | Important text
       | ``
       |
        <pre class="brush: html">&#x3C;strong>I'm important!&#x3C;/strong></pre>

       | Highlight text
       | ``
       |
        <pre class="brush: html">&#x3C;mark>Notice me!&#x3C;/mark></pre>

       | Strikethrough text
       | ``
       |
        <pre class="brush: html">&#x3C;s>I'm irrelevant.&#x3C;/s></pre>

       | Subscript
       | ``
       |
        <pre class="brush: html">H&#x3C;sub>2&#x3C;/sub>O</pre>

       | Small text
       | ``
       |
        <pre class="brush: html">
Used to represent the &#x3C;small>small
print &#x3C;/small>of a document.</pre
        >

       | Address
       | `<address>`
       |
        <pre class="brush: html">
&#x3C;address>Main street 67&#x3C;/address></pre
        >

       | Textual citation
       | ``
       |
        <pre class="brush: html">
For more monsters,
see &#x3C;cite>The Monster Book of Monsters&#x3C;/cite>.</pre
        >

       | Superscript
       | ``
       |
        <pre class="brush: html">x&#x3C;sup>2&#x3C;/sup></pre>

       | Inline quotation
       | `<q>`
       |
        <pre class="brush: html">&#x3C;q>Me?&#x3C;/q>, she said.</pre>

       | A line break
       | ``
       |
        <pre class="brush: html">Line 1&#x3C;br />Line 2</pre>

       | A possible line break
       | ``
       |
        <pre class="brush: html">
&#x3C;div style="width: 200px">
  Llanfair&#x3C;wbr />pwllgwyngyll&#x3C;wbr />gogerychwyrndrobwllllantysiliogogogoch.
&#x3C;/div></pre
        >

       | Date
       | `<time>`
       |
        <pre class="brush: html">
Used to format the date. For example:
&#x3C;time datetime="2020-05-24">
published on 23-05-2020&#x3C;/time>.</pre
        >

       | Code format
       | `<code>`
       |
        <pre class="brush: html">
This text is in normal format,
but &#x3C;code>this text is in code
format&#x3C;/code>.</pre
        >

       | Audio
       | `<audio>`
       |
        <pre class="brush: html">
&#x3C;audio controls>
  &#x3C;source src="/shared-assets/audio/t-rex-roar.mp3" type="audio/mpeg" />
&#x3C;/audio>
        </pre>

       | Video
       | ``
       |
        <pre class="brush: html">
&#x3C;video controls width="250"
  src="/shared-assets/videos/flower.webm" >
  &#x3C;a href="/shared-assets/videos/flower.webm">Download WebM video&#x3C;/a>
&#x3C;/video></pre
        >

## Block elements

"Block elements," on the other hand, take up the entire width of a webpage. They also take up a full line of a webpage; they do not fit together side-by-side. Instead, they stack like paragraphs in an essay or toy blocks in a tower.

> **Note:**
> Because this cheat sheet is limited to a few elements representing specific structures or having special semantics, the `div` element is intentionally not included — because the `div` element doesn't represent anything and doesn't have any special semantics.

       | Usage
       | Element
       | Example

       | A simple paragraph
       | ``
       |
        <pre class="brush: html">
&#x3C;p>I'm a paragraph&#x3C;/p>
&#x3C;p>I'm another paragraph&#x3C;/p></pre
        >

       | An extended quotation
       | ``
       |
        <pre class="brush: html">
They said:
&#x3C;blockquote>The blockquote element indicates
an extended quotation.&#x3C;/blockquote></pre
        >

       | Additional information
       | ``
       |
        <pre class="brush: html">
&#x3C;details>
  &#x3C;summary>HTML Cheat Sheet&#x3C;/summary>
  &#x3C;p>Inline elements&#x3C;/p>
  &#x3C;p>Block elements&#x3C;/p>
&#x3C;/details></pre
        >

       | An unordered list
       | ``
       |
        <pre class="brush: html">&#x3C;ul>
  &#x3C;li>I'm an item&#x3C;/li>
  &#x3C;li>I'm another item&#x3C;/li>
&#x3C;/ul></pre>

       | An ordered list
       | ``
       |
        <pre class="brush: html">&#x3C;ol>
  &#x3C;li>I'm the first item&#x3C;/li>
  &#x3C;li>I'm the second item&#x3C;/li>
&#x3C;/ol></pre>

       | A definition list
       | ``
       |
        <pre class="brush: html">&#x3C;dl>
  &#x3C;dt>A Term&#x3C;/dt>
  &#x3C;dd>Definition of a term&#x3C;/dd>
  &#x3C;dt>Another Term&#x3C;/dt>
  &#x3C;dd>Definition of another term&#x3C;/dd>
&#x3C;/dl></pre>

       | A horizontal rule
       | ``
       |
        <pre class="brush: html">before&#x3C;hr />after</pre>

       | Text Heading
       |
        `<<h1>-<h6>>`

       |
        <pre class="brush: html">
&#x3C;h1> This is Heading 1 &#x3C;/h1>
&#x3C;h2> This is Heading 2 &#x3C;/h2>
&#x3C;h3> This is Heading 3 &#x3C;/h3>
&#x3C;h4> This is Heading 4 &#x3C;/h4>
&#x3C;h5> This is Heading 5 &#x3C;/h5>
&#x3C;h6> This is Heading 6 &#x3C;/h6></pre
        >
