---
title: "Grids, logical values, and writing modes (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/grid_layout/logical_values_and_writing_modes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Grids, logical values, and writing modes (part 2 of 2)

## Mixed writing modes and grid layout

In addition to displaying documents using the correct writing mode for the language, writing modes can be used creatively within documents that are otherwise `ltr`. In this example, we have a grid layout with a set of links down one side. We use writing modes (`writing-mode: vertical-lr`) to turn these on their side in the column track:

```css
.wrapper {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr auto;
  font:
    1em "Helvetica",
    "Arial",
    sans-serif;
}
nav {
  writing-mode: vertical-lr;
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 1em;
  display: flex;
  justify-content: space-between;
}
nav a {
  text-decoration: none;
}
```

```html
<div class="wrapper">
  <div class="content">
    <p>
      Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce
      kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus
      winter purslane kale. Celery potato scallion desert raisin horseradish
      spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo
      shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea.
      Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi
      beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki
      bean chickweed potato bell pepper artichoke.
    </p>
    <p>
      Nori grape silver beet broccoli kombu beet greens fava bean potato
      quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil
      turnip greens parsnip. Sea lettuce water chestnut eggplant winter purslane
      fennel azuki bean earthnut pea sierra leone bologi leek soko chicory
      celtuce parsley jícama salsify.
    </p>
  </div>
  <nav>
    <ul>
      <li><a href="">Link 1</a></li>
      <li><a href="">Link 2</a></li>
      <li><a href="">Link 3</a></li>
    </ul>
  </nav>
</div>
```

## Physical values and logical properties

If you combine logical grid properties with physical properties, remember that physical properties will not change according to writing mode. In our Aligning items in CSS grid layout guide, we use auto margins to push one item away from the others; this employs physical properties. There are logical property equivalents for most physical properties, which respect writing modes in the same way as grid placement and alignment properties and values.

Similarly, when using absolute positioning within a grid area, you can use logical inset properties to place items inside the grid area. When mixing logical and physical properties or values, be aware of the tension between them. For example, you may need to change your CSS to cope with a switch from `ltr` to `rtl`. Your understanding of block and inline through grid will help you to understand CSS logical properties and values.
