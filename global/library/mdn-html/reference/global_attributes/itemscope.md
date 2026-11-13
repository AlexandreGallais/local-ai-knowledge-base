---
title: "`itemscope` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/itemscope/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `itemscope` HTML global attribute

**`itemscope`** is a boolean global attribute that defines the scope of associated metadata. Specifying the **`itemscope`** attribute for an element creates a new item, which results in a number of name-value pairs that are associated with the element.

A related attribute, `itemtype`, is used to specify the valid URL of a vocabulary (such as schema.org) that describes the item and its properties context. In each of the following examples, the vocabulary is from schema.org.

Every HTML element may have an `itemscope` attribute specified. An `itemscope` element that does not have an associated `itemtype` must have an associated `itemref`.

> **Note:**
> Find more about `itemtype` attributes at <https://schema.org/Thing>

## Usage notes

### itemscope id attributes

When you specify the `itemscope` attribute for an element, a new item is created. The item consists of a group of name-value pairs. For elements with an `itemscope` attribute and an `itemtype` attribute, you may also specify an `id` attribute. You can use the `id` attribute to set a global identifier for the new item. A global identifier allows the item to relate to other items found on pages across the Web.

## Examples

### Representing structured data for a movie

The following example specifies the `itemtype` as "http\://schema.org/Movie", and specifies four related `itemprop` attributes.

       | itemscope
       | Itemtype
       | Movie

       | itemprop
       | (itemprop name)
       | (itemprop value)

       | itemprop
       | director
       | James Cameron

       | itemprop
       | genre
       | Science Fiction

       | itemprop
       | name
       | Avatar

       | itemprop
       | Trailer
       | https://youtu.be/0AY1XIkX7bY

```html
<div itemscope itemtype="https://schema.org/Movie">
  <h1 itemprop="name">Avatar</h1>
  <span>
    Director: <span itemprop="director">James Cameron</span> (born August 16,
    1954)
  </span>
  <span itemprop="genre">Science fiction</span>
  <a href="https://youtu.be/0AY1XIkX7bY" itemprop="trailer">Trailer</a>
</div>
```

### Representing structured data for a recipe

There are four `itemscope` attributes in the following example. Each `itemscope` attribute sets the scope of its corresponding `itemtype` attribute. The `itemtype`s, `Recipe`, `AggregateRating`, and `NutritionInformation` in the following example are part of the schema.org structured data for a recipe, as specified by the first `itemtype`, `http://schema.org/Recipe`.

       | itemscope
       | itemtype
       | Recipe

       | itemprop
       | name
       | Grandma's Holiday Apple Pie

       | itemprop
       | image
       | https://c1.staticflickr.com/1/30/42759561_8631e2f905_n.jpg

       | itemprop
       | datePublished
       | 2022-11-05

       | itemprop
       | description
       |
        This is my grandmother's apple pie recipe. I like to add a dash of
        nutmeg.

       | itemprop
       | prepTime
       | PT30M

       | itemprop
       | cookTime
       | PT1H

       | itemprop
       | totalTime
       | PT1H30M

       | itemprop
       | recipeYield
       | 1 9" pie (8 servings)

       | itemprop
       | recipeIngredient
       | Thinly-sliced apples: 6 cups

       | itemprop
       | recipeIngredient
       | White sugar: 3/4 cup

       | itemprop
       | recipeInstructions
       |
        1. Cut and peel apples 2. Mix sugar and cinnamon. Use additional sugar
        for tart apples.

       | itemprop
       | author [Person]

       | itemprop
       | name
       | Carol Smith

       | itemscope
       | itemprop[itemtype]
       | aggregateRating [AggregateRating]

       | itemprop
       | ratingValue
       | 4.0

       | itemprop
       | reviewCount
       | 35

       | itemscope
       | itemprop[itemtype]
       | nutrition [NutritionInformation]

       | itemprop
       | servingSize
       | 1 medium slice

       | itemprop
       | calories
       | 250 cal

       | itemprop
       | fatContent
       | 12 g

> **Note:**
> A handy tool for extracting microdata structures from HTML is Google's Rich Results Testing Tool. Try it on the HTML shown here.

#### HTML

```html
<div itemscope itemtype="https://schema.org/Recipe">
  <h2 itemprop="name">Grandma's Holiday Apple Pie</h2>
  <img
    itemprop="image"
    src="https://c1.staticflickr.com/1/30/42759561_8631e2f905_n.jpg"
    width="50"
    height="50" />
  <p>
    By
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
      <span itemprop="name">Carol Smith</span>
    </span>
  </p>
  <p>
    Published:
    <time datetime="2022-11-05" itemprop="datePublished">
      November 5, 20022
    </time>
  </p>
  <span itemprop="description">
    This is my grandmother's apple pie recipe. I like to add a dash of nutmeg.
  </span>
  <br />
  <span
    itemprop="aggregateRating"
    itemscope
    itemtype="https://schema.org/AggregateRating">
    <span itemprop="ratingValue">4.0</span> stars based on
    <span itemprop="reviewCount">35</span> reviews
  </span>
  <br />
  Prep time: <time datetime="PT30M" itemprop="prepTime">30 min</time>
  <br />
  Cook time: <time datetime="PT1H" itemprop="cookTime">1 hour</time>
  <br />
  Total time: <time datetime="PT1H30M" itemprop="totalTime">1 hour 30 min</time>
  <br />
  Yield: <span itemprop="recipeYield">1 9" pie (8 servings)</span>
  <br />
  <span
    itemprop="nutrition"
    itemscope
    itemtype="https://schema.org/NutritionInformation">
    Serving size: <span itemprop="servingSize">1 medium slice</span><br />
    Calories per serving: <span itemprop="calories">250 cal</span><br />
    Fat per serving: <span itemprop="fatContent">12 g</span><br />
  </span>
  <p>
    Ingredients:<br />
    <span itemprop="recipeIngredient">Thinly-sliced apples: 6 cups<br /></span>
    <span itemprop="recipeIngredient">White sugar: 3/4 cup<br /></span>
    …
  </p>
  Directions: <br />
  <div itemprop="recipeInstructions">
    1. Cut and peel apples<br />
    2. Mix sugar and cinnamon. Use additional sugar for tart apples. <br />
    …
  </div>
</div>
```

#### Result

## See also

- Other different global attributes
- Other microdata related global attributes:
  - `itemid`
  - `itemprop`
  - `itemref`
  - `itemtype`
