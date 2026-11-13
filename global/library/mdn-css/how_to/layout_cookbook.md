---
title: "CSS layout cookbook"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/how_to/layout_cookbook/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS layout cookbook

The CSS layout cookbook aims to bring together recipes for common layout patterns, things you might need to implement in your own sites. In addition to providing code you can use as a starting point in your projects, these recipes highlight the different ways layout specifications can be used, and the choices you can make as a developer.

> **Note:**
> If you are new to CSS layout then you might first like to take a look at our CSS layout learning module, as this will give you the basic <example-value> you need to make use of the recipes here.

## The Recipes

| Recipe                                | Description                                                                                              | Layout Methods                                                                         |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Media objects        | A two-column box with an image on one side and descriptive text on the other, e.g., a social media post. | CSS grid, `float` fallback, `fit-content` sizing |
| Columns                    | When to choose multi-column layout, flexbox or grid for your columns.                                    | CSS grid, Multicol, Flexbox                         |
| Center an element           | How to center an item horizontally and vertically.                                                       | Flexbox, Box Alignment                                     |
| Sticky footers      | Creating a footer which sits at the bottom of the container or viewport when the content is shorter.     | CSS grid, Flexbox                                               |
| Split navigation  | A navigation pattern where some links are visually separated from the others.                            | Flexbox, `margin`                                              |
| Breadcrumb navigation   | Creating a list of links to allow the visitor to navigate back up through the page hierarchy.            | Flexbox                                                                     |
| List group with badges | A list of items with a badge to display a count.                                                         | Flexbox, Box Alignment                                     |
| Pagination              | Links to pages of content (such as search results).                                                      | Flexbox, Box Alignment                                     |
| Card                          | A card component, which displays in a grid of cards.                                                     | Grid Layout                                                                |
| Grid wrapper          | For aligning grid content within a central wrapper, while also allowing items to break out.              | CSS grid                                                                   |

## Contribute a Recipe

As with all of MDN we would love you to contribute a recipe in the same format as the ones shown above. See the guide for adding Layout Cookbook recipes for a template and guidelines for writing your own example.
