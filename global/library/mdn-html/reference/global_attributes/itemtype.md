---
title: "`itemtype` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/itemtype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `itemtype` HTML global attribute

The global attribute **`itemtype`** specifies the URL of the vocabulary that will be used to define `itemprop`'s (item properties) in the data structure.

`itemscope` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active.

Google and other major search engines support the schema.org vocabulary for structured data. This vocabulary defines a standard set of type names and property names. For example, `MusicEvent` indicates a concert performance, with `startDate` and `location` properties specifying the concert's key details. In this case, `MusicEvent` would be the URL used by `itemtype`, with `startDate` and location as `itemprop`'s which `MusicEvent` defines.

> **Note:**
> More about `itemtype` attributes can be found at <https://schema.org/Thing>

- The **itemtype** attribute must have a value that is an unordered set of unique tokens which are case-sensitive, each is a valid and absolute URL, and all defined to use the same vocabulary. The attribute's value must have at least one token.
- The item types must all be types defined in applicable specifications (such as schema.org), and must all be defined to use the same vocabulary.
- The itemtype attribute can only be specified on elements which have an itemscope attribute specified.
- The itemid attribute can only be specified on elements which have both an itemscope attribute and an itemtype attribute specified. They must only be specified on elements with an itemscope attribute, whose itemtype attribute specifies a vocabulary not supporting global identifiers for items, as defined by that vocabulary's specification.
- The exact meaning of a global identifier is determined by the vocabulary's specification. It is left to such specifications to define whether multiple items of the same global identifier (whether on the same page or different pages) are allowed to exist, and what processing rules for that vocabulary are, with respect to handling the case of multiple items with the same ID.

## Examples

### Representing structured data for a product

This example uses microdata attributes to represent structured data for a product, as follows:

       | itemscope
       | itemtype
       | Product (https://schema.org/Product)

       | itemprop
       | name
       | Executive Anvil

       | itemprop
       | image
       |
        https://pixabay.com/static/uploads/photo/2015/09/05/18/15/suitcase-924605_960_720.png

       | itemprop
       | description
       |
        Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for
        the business traveler looking for something to drop from a height.

       | itemprop
       | mpn
       | 925872

       | itemprop
       | brand [Thing]
       |

       | itemprop
       | name
       | ACME

       | itemscope
       | itemprop[itemtype]
       | aggregateRating[AggregateRating]
       |

       | itemprop
       | ratingValue
       | 4.4

       | itemprop
       | reviewCount
       | 89

       | itemprop
       | offers [Offer]
       | https://schema.org/Offer

       | itemprop
       | priceCurrency
       | USD

       | itemprop
       | price
       | 119.99

       | itemprop
       | priceValidUntil
       | 2020-11-05

       | itemprop
       | itemCondition
       | https://schema.org/UsedCondition

       | itemprop
       | availability
       | https://schema.org/InStock

       | itemscope
       | itemprop[itemtype]
       | seller [Organization]
       | https://schema.org/Organization

       | itemprop
       | name
       | Executive Objects

> **Note:**
> A handy tool for extracting microdata structures from HTML is Google's Structured Data Testing Tool. Try it on the HTML shown here.

#### HTML

```html
<div itemscope itemtype="https://schema.org/Product">
  <span itemprop="brand">ACME<br /></span>
  <span itemprop="name">Executive Anvil<br /></span>
  <img
    itemprop="image"
    src="https://pixabay.com/static/uploads/photo/2015/09/05/18/15/suitcase-924605_960_720.png"
    width="50"
    height="50"
    alt="Executive Anvil logo" /><br />

  <span itemprop="description">
    Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the
    business traveler looking for something to drop from a height.
    <br />
  </span>

  Product #: <span itemprop="mpn">925872<br /></span>
  <span
    itemprop="aggregateRating"
    itemscope
    itemtype="https://schema.org/AggregateRating">
    Rating: <span itemprop="ratingValue">4.4</span> stars, based on
    <span itemprop="reviewCount">89 </span> reviews
  </span>
  <p>
    <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
      Regular price: $179.99<br />
      <meta itemprop="priceCurrency" content="USD" />
      <span itemprop="price">Sale price: $119.99<br /></span>
      (Sale ends
      <time itemprop="priceValidUntil" datetime="2020-11-05">5 November!</time>)
      <br />
      Available from:
      <span
        itemprop="seller"
        itemscope
        itemtype="https://schema.org/Organization">
        <span itemprop="name">Executive Objects<br /></span>
      </span>
      Condition:
      <link
        itemprop="itemCondition"
        href="https://schema.org/UsedCondition" />Previously owned, in excellent
      condition<br />
      <link itemprop="availability" href="https://schema.org/InStock" />In
      stock! Order now!
    </span>
  </p>
</div>
```

#### Result

## See also

- Other different global attributes
- Other microdata related global attributes:
  - `itemid`
  - `itemprop`
  - `itemref`
  - `itemscope`
