---
title: "Using microformats in HTML (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/guides/microformats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using microformats in HTML

_Microformats_ are standards used to embed semantics and structured data in HTML, and provide an API to be used by social web applications, search engines, aggregators, and other tools. These minimal patterns of HTML are used for marking up entities that range from fundamental to domain-specific information, such as people, organizations, events, and locations.

- To create a microformats object, `h-*` class names are used in the class attribute.
- To add a property to an object, the `p-*`, `u-*`, `dt-*`, `e-*` class names are used on one of the object's descendants.

Microformats use supporting vocabularies to describe objects and name-value pairs to assign values to their properties. The properties are carried in class attributes that can be added to any HTML element, while the data values re-use HTML element content and semantic attributes.

Microformats2 (sometimes referred to as mf2) is an update to microformats that provides a method of annotating HTML structured syntax and vocabularies than previous approaches of using RDFa and microdata. These previous approaches require learning new attributes.

There are open source parsing libraries for most languages for microformats2.

## How Microformats Work

An author of a webpage can add microformats to their HTML. For example if they wanted to identify themselves they could use an h-card such as:

### HTML Example

```html
<a class="h-card" href="https://alice.example.com">Alice Blogger</a>
```

When a parser encounters this data, it will know that this page contains a "card" which describes a person or organization named `Alice Blogger` with a URL of `https://alice.example.com/`. The parser makes this data available via APIs that can be used for different applications. For example, an application could scan a page for a h-card to use as profile information for someone who has signed up to a service.

As in this example, some markup patterns require only a single microformat root class name, which parsers use to find a few generic properties such as `name`, `url`, `photo`.

## Microformats Use Cases

Microformats have numerous use cases. First, the Webmention standard uses microformats to provide a way in which messages and comments can be sent from one site to another. The Webmention specification defines specific attributes that sites may publish and consume to create a rich, interoperable way of publishing messages and comments. Microformats can also be used with Webmentions to enable sending social reactions such as likes, reposts, and bookmarks from one site to another.

Microformats also enable easy syndication across sites. An aggregator could parse a page with published microformats to look for information such as a post title, a post body, and the author of a post. This aggregator could then use the semantic information gathered to render a result on their site. For instance, news aggregators and community posting boards could facilitate submissions and use microformats to exact relevant content from a page. Further, a website could use microformats to send crafted requests to third-parties to publish content, such as social networks.

All major search engines support reading and interpreting microformats. Search engines benefit greatly from direct access to this structured data because it allows them to understand the information on web pages. With this information, search engines can provide more relevant results to users. Some search engines may render special snippets such as star ratings on a search result page based on the data provided in microformats.

In addition to being machine-readable, microformats are designed to be easily read by humans. This approach makes it easy for people to understand and maintain microformats data.

## Microformats Prefixes

All microformats consist of a root, and a collection of properties. Properties are all optional and potentially multivalued - applications needing a singular value may use the first instance of a property. Hierarchical data is represented with nested microformats, typically as property values themselves.

All microformats class names use prefixes. Prefixes are **syntax independent of vocabularies**, which are developed separately.

- **"h-\*" for root class names**, e.g., "h-card", "h-entry", "h-feed", and many more. These top-level root classes usually indicate a type and corresponding expected vocabulary of properties. For example:
  - h-card describes a person or organization
  - h-entry describes episodic or date stamped online content like a blog post
  - h-feed describes a stream or feed of posts
  - You can find many more vocabularies on the microformats2 wiki.

- **"p-\*" for plain (text) properties**, e.g., "p-name", "p-summary"
  - Generic plain text parsing, element text in general. On certain HTML elements, use special attributes first, e.g., img/alt, abbr/title.

- **"u-\*" for URL properties**, e.g., "u-url", "u-photo", "u-logo"
  - Special parsing: element attributes a/href, img/src, object/data etc. attributes over element contents.

- **"dt-\*" for datetime properties**, e.g., "dt-start", "dt-end", "dt-bday"
  - Special parsing: time element datetime attribute, value-class-pattern and separate date time value parsing for readability.

- **"e-\*" for element tree properties** where the entire contained element hierarchy is the value, e.g., "e-content". The "e-" prefix can also be mnemonically remembered as "element tree", "embedded markup", or "encapsulated markup".
