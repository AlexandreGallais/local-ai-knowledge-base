---
title: "`rule-width` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/rule-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rule-width` CSS property

The **`rule-width`** CSS shorthand property defines the widths of any lines drawn in the gutters of multi-row grid, flex, and multi-col layouts, setting the widths of the column and row rules to the same value.

```css
rule-width: thin;
```

```css
rule-width: thin, thick;
```

```css
rule-width: 1px, 10px;
```

```css
rule-width: repeat(2, thin, thick), 10px;
```

```css
rule-width: thick, repeat(auto, 1px, 2px), thick;
```

```html
<section id="default-example">
  <div id="example-element">
    <i>A</i>
    <i>B</i>
    <i>C</i>
    <i>D</i>
    <i>E</i>
    <i>F</i>
    <i>G</i>
    <i>H</i>
    <i>I</i>
    <i>J</i>
    <i>K</i>
    <i>L</i>
    <i>M</i>
    <i>N</i>
    <i>O</i>
    <i>P</i>
    <i>Q</i>
    <i>R</i>
    <i>S</i>
    <i>T</i>
    <i>U</i>
    <i>V</i>
    <i>W</i>
    <i>X</i>
    <i>Y</i>
    <i>Z</i>
  </div>
</section>
```

```css
#example-element {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  rule: solid magenta;
}
#example-element i {
  padding: 5px;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `column-rule-width`
- `row-rule-width`

## Syntax

```css
/* Keyword values */
rule-width: thin;
rule-width: medium;
rule-width: thick;
rule-width: thin, medium, thick;
rule-width: thick, repeat(5, thin), thick;
rule-width: thick, repeat(auto, thin, medium), thick;

/* Length values */
rule-width: 1px;
rule-width: 5px;
rule-width: 1px, 3px, 5px;
rule-width: 5px, repeat(auto, 1px), 10px, 15px;
rule-width: 5px, repeat(5, 1px, 3px), 5px;

/* Global values */
rule-width: inherit;
rule-width: initial;
rule-width: revert;
rule-width: revert-layer;
rule-width: unset;
```

### Values

The `rule-width` property accepts a comma-separated list of values, including:

- `<line-width>`
    A `line-width`: This can be one of the keywords `thin`, `medium`, or `thick`, or a positive `length` value, representing the width of the line. The default value is `medium`.

- `<repeat-line-width>`
    A `repeat()` function, with the first argument being an `<integer>` of `1` or more, and one or more `<line-width>` values as subsequent arguments. The integer defines the number of times the `<line-width>` values should be repeated.

- `<auto-repeat-line-width>`
    A `repeat()` function, with `auto` as the first argument and one or more `<line-width>` values as subsequent arguments. The provided `<line-width>` values are repeated as many times as needed to fill in values for any rules that are not explicitly specified by other components of the property value.

## Description

The `rule-width` shorthand property defines the widths of rule lines drawn in the gaps between columns and rows in multi-column, flex, and grid containers with more than one row or column.

The value is a comma-separated list of components, which can include `<line-width>`, `<repeat-line-width>`, and `<auto-repeat-line-width>` types.

The `rule-width` property, along with the `rule-color` and `rule-style` properties, can be set using the `rule` shorthand.

If the property value consists of only one `<line-width>`, all the row and column rules will be that width. If we declare the following, all rules will be `3px`:

```css
rule-width: 3px;
```

When multiple `<line-width>` values are declared, they will be applied to rules in the order specified. If there are more rules than `<line-width>` values, the list of line widths is repeated until every rule has a width. If we declare the following, for example, every odd horizontal and vertical rule will be `thin`, and every even rule will be `1em`.

```css
rule-width: thin, 1em;
```

### Repeated line widths

The `repeat()` function, with an integer of `1` or greater as the first argument, can be used to repeat a valid list of CSS `<line-width>` values passed as subsequent arguments the specified number of times. This allows the same widths to be repeated a set number of times without repeating the values. The following declarations are equivalent:

```css
rule-width: 1rem, thick, thin, thick, thin, thick, thin;
rule-width: 1rem, repeat(3, thick, thin);
```

You can use any `<line-width>` values, including custom properties that resolve to a `<line-width>`. Using `repeat()` can make values easier to write, especially when using complex length calculations. It enables a recurring pattern to be written using a single function, regardless of the number of columns or rows.

### Auto-repeating line widths

The `repeat()` function also accepts `auto` as the first argument instead of a positive integer. With `auto` as the first argument, the list of `<line-width>` values passed as subsequent arguments will be repeated as many times as needed to fill in values for any rules that are not explicitly specified by other components of the property value.

```css
rule-width: thin, repeat(auto, medium), thin;
```

In this case, the first and last column and row rules will always be `thin`, and all other rules will be `medium`. If there are only 2 or 3 columns and rows, there will be no medium-sized rules.

The `auto` keyword within the `repeat()` function creates an auto-repeater that fills in values for column and row rules that would not otherwise receive values from other parts of the list, preventing the list from being cycled. At most, only one `repeat(auto, <width>)` can be present in a `rule-width` value.

## Examples

### Basic <example-value>

In this example, we define a single width for the lines drawn between the columns and rows of items in a grid container.

#### HTML

We create a list of 75 items. Most of the HTML is hidden for brevity.

```html
<ul>
  <li>1</li>
  <li>2</li>
  ...
  <li>74</li>
  <li>75</li>
</ul>
```

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
  <li>10</li>
  <li>11</li>
  <li>12</li>
  <li>13</li>
  <li>14</li>
  <li>15</li>
  <li>16</li>
  <li>17</li>
  <li>18</li>
  <li>19</li>
  <li>20</li>
  <li>21</li>
  <li>22</li>
  <li>23</li>
  <li>24</li>
  <li>25</li>
  <li>26</li>
  <li>27</li>
  <li>28</li>
  <li>29</li>
  <li>30</li>
  <li>31</li>
  <li>32</li>
  <li>33</li>
  <li>34</li>
  <li>35</li>
  <li>36</li>
  <li>37</li>
  <li>38</li>
  <li>39</li>
  <li>40</li>
  <li>41</li>
  <li>42</li>
  <li>43</li>
  <li>44</li>
  <li>45</li>
  <li>46</li>
  <li>47</li>
  <li>48</li>
  <li>49</li>
  <li>50</li>
  <li>51</li>
  <li>52</li>
  <li>53</li>
  <li>54</li>
  <li>55</li>
  <li>56</li>
  <li>57</li>
  <li>58</li>
  <li>59</li>
  <li>60</li>
  <li>61</li>
  <li>62</li>
  <li>63</li>
  <li>64</li>
  <li>65</li>
  <li>66</li>
  <li>67</li>
  <li>68</li>
  <li>69</li>
  <li>70</li>
  <li>71</li>
  <li>72</li>
  <li>73</li>
  <li>74</li>
  <li>75</li>
</ul>
```

#### CSS

We define the unordered list to be a 10-column grid container. We include a `gap` of `5px` to provide enough room between the items to fit our `3px` dashed red rule:

```css
ul {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  list-style-type: none;
  gap: 5px;
  rule-style: dashed;
  rule-color: red;
  rule-width: 3px;
}
li {
  text-align: center;
  aspect-ratio: 1;
}
```

```css
@layer no-support {
  @supports not (rule-width: medium) {
    body::before {
      content: "Your browser doesn't support the rule-width property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

### Repeating values

This example demonstrates how, when there are fewer values in the list of widths than column or row rules, the values are repeated.

#### CSS

Using the same HTML and CSS as in the previous example, we include three comma-separated widths as the `rule-width`.

```css
ul {
  rule-width: thin, 6px, 12px;
}
```

#### Result

As the grid container has 8 rows and 10 columns, there are seven and nine gutters in each direction, respectively, so the sequence of three `<line-width>` values is repeated in both directions.

### Using the `repeat()` function

This example demonstrates using the `repeat()` function within the `rule-width` property value and how this function can help reduce the verbosity of value declarations.

#### CSS

We use the same HTML and CSS as in the previous examples. In addition, we declare two custom properties, which we use in a `repeat()` function inside our `rule-width` value. The `repeat()` function sets a list of two `<line-width>` values to repeat 3 times.

```css
ul {
  --base: 0.5vw;
  --secondary: 1vw;
  rule-width:
    15px,
    repeat(
      4,
      min(calc(var(--base) + 3px), 10px),
      abs(calc(var(--secondary) - 2px))
    ),
    15px;
}
```

#### Result

The `repeat()` function repeats two width values four times, creating a list of ten width values. As there are fewer column and row gutters than total widths, the last values in the list are discarded.

### Using `auto` within `repeat()`

This example demonstrates using `auto` instead of an integer within the `repeat()` function.

#### CSS

Using `repeat(auto, <line-width>)`, we set all column and row rules to `1px`, except the first and last, which we set to `5px`.

```css
ul {
  rule-width: 5px, repeat(auto, 1px), 5px;
}
```

#### Result

```css
@layer no-support {
  @supports not (rule-width: thin, thick) {
    body::before {
      content: "Your browser doesn't support the rule-width property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

## See also

- `rule-color`
- `rule-style`
- `column-rule-width`
- `row-rule-width`
- `rule` shorthand
- Defining CSS gaps
- CSS gaps module
