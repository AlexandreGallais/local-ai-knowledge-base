---
title: "`itemid` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/itemid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `itemid` HTML global attribute

The **`itemid`** global attribute provides microdata in the form of a unique, global identifier of an item.

An `itemid` attribute can only be specified for an element that has both `itemscope` and `itemtype` attributes. Also, `itemid` can only be specified on elements that possess an `itemscope` attribute whose corresponding `itemtype` refers to or defines a vocabulary that supports global identifiers.

The exact meaning of an `itemtype`'s global identifier is provided by the definition of that identifier within the specified vocabulary. The vocabulary defines whether several items with the same global identifier can coexist and, if so, how items with the same identifier are handled.

> **Note:**
> The WHATWG definition specifies that an `itemid` must be a URL. However, the following example correctly illustrates that a URN may also be used. This inconsistency may reflect the incomplete nature of the Microdata specification.

## Examples

### Representing structured data for a book

This example uses microdata attributes to represent the following structured data:

       | itemscope
       | itemtype: itemid
       | https://schema.org/Book: urn:isbn:0-374-22848-5

       | itemprop
       | title
       | Owls of the Eastern Ice

       | itemprop
       | author
       | Jonathan C Slaght

       | itemprop
       | datePublished
       | 2020-08-04

#### HTML

```html
<dl
  itemscope
  itemtype="https://schema.org/Book"
  itemid="urn:isbn:0-374-22848-5<">
  <dt>Title</dt>
  <dd itemprop="title">Owls of the Eastern Ice</dd>
  <dt>Author</dt>
  <dd itemprop="author">Jonathan C Slaght</dd>
  <dt>Publication date</dt>
  <dd>
    <time itemprop="datePublished" datetime="2020-08-04">August 4 2020</time>
  </dd>
</dl>
```

#### Result

## See also

- All global attributes.
- Other microdata related global attributes:
  - `itemprop`
  - `itemref`
  - `itemscope`
  - `itemtype`
