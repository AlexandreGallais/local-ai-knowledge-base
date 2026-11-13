---
title: "`rule-style` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/rule-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rule-style` CSS property

The **`rule-style`** CSS shorthand property defines the line style of the lines drawn between columns and rows in multi-column grid, flex, and multi-col layouts, setting the styles of the column and row rules to the same value.

```css
rule-style: solid;
```

```css
rule-style: dashed, dotted;
```

```css
rule-style: repeat(2, inset, dashed, double);
```

```css
rule-style: solid, repeat(auto, double), solid;
```

```css
rule-style: hidden;
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
  rule: solid rebeccapurple 7px;
  gap: 7px;
}
#example-element i {
  padding: 5px;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `column-rule-style`
- `row-rule-style`

## Syntax

```css
/* One value */
rule-style: none;
rule-style: hidden;
rule-style: dotted;
rule-style: dashed;
rule-style: solid;
rule-style: double;
rule-style: groove;
rule-style: ridge;
rule-style: inset;
rule-style: outset;

/* Multiple values */
rule-style: groove, double, dashed;
rule-style: solid, repeat(5, ridge), solid;
rule-style: dotted, repeat(auto, inset, outset), dotted;

/* Global values */
rule-style: inherit;
rule-style: initial;
rule-style: revert;
rule-style: revert-layer;
rule-style: unset;
```

### Values

The `rule-style` property accepts a comma-separated list of values, including:

- `<line-style>`
    A `<line-style>`: one of `none`, `hidden`, `dotted`, `dashed`, `solid`, `double`, `groove`, `ridge`, `inset`, or `outset`. The default value is `none`.

- `<repeat-line-style>`
    A `repeat()` function, with the first argument being an `<integer>` of `1` or more, and subsequent arguments being `<line-style>` values. The integer specifies how many times the `<line-style>` values should be repeated.

- `<auto-repeat-line-style>`
    A `repeat()` function, with `auto` as the first argument and one or more `<line-style>` values as subsequent arguments. The provided `<line-style>` values are repeated as many times as needed to fill in values for any rules that are not explicitly specified by other components of the property value.

## Description

The `rule-style` property defines the line style of any column and row rule lines drawn in the gaps between columns and rows in multi-column, flex, and grid containers with more than one column or row.

The `rule-style` sets both the `column-rule-style` and `row-rule-style` properties to the same value.
The `rule-style` property, along with the `rule-color` and `rule-width` properties, can also be set using the `rule` shorthand.

The value is a comma-separated list of components, which can include `<line-style>`, `<repeat-line-style>`, and `<auto-repeat-line-style>` types.

If the property value has only one `<line-style>`, all the column and row rules will be that style. If we declare the following, all column and row rules will be `double`:

```css
rule-style: double;
```

When multiple `<line-style>` values are declared, they will be applied to rules in the order specified. If there are more rules than `<line-style>` values, the list of line styles is repeated until every column and row rule has a style. For example, if we declare the following, every odd rule will be `double`, and every even rule will be `inset`.

```css
rule-style: double, inset;
```

### Repeated line styles

The `repeat()` function, with an integer of `1` or greater as the first argument, can be used to repeat a valid list of CSS `<line-style>` values passed as subsequent arguments the specified number of times. This allows the same style to be repeated a set number of times without repeating the same value. You can include `<line-style>` keyword values or custom properties that resolve to a valid `<line-style>`. Using `repeat()` can make values easier to write, enabling recurring patterns to be written using a single function, regardless of the number of columns or rows. The following declarations are equivalent:

```css
rule-style: solid, outset, inset, outset, inset, outset, inset;
rule-style: solid, repeat(3, outset, inset);
```

This creates a list of seven styles. If the number of styles in the `rule-style` value's style list exceeds the number of gaps between columns or rows, the excess style values are ignored. If the container has three columns or rows, the rule in the first gutter will be `solid` and the second `outset`.

If there are more gutters than styles, the list of styles is repeated. If the container has 8, 15, 22, or 29 columns or rows, this sequence of styles will be repeated one, two, three, or four times, respectively, with the last rule being `inset`.

### Auto-repeating line styles

The `repeat()` function also accepts `auto` as the first argument instead of a positive integer. With `auto` as the first argument, the `<line-style>` values passed as subsequent parameters will be repeated as many times as needed to fill in values for any rules that are not explicitly specified by other components of the property value.

The `auto` keyword within the `repeat()` function creates an auto repeater that fills in values for column and row rules that would not otherwise receive values from other parts of the list, preventing the list from being cycled. Only one `repeat(auto, <line-style>)` is allowed within a `rule-style` value.

```css
rule-style: solid, repeat(auto, dotted), solid;
```

In this case, it doesn't matter if the container has 8, 15, 22, or 29 columns or rows; the first and last rules will always be `solid`, and all the other rules will be `dotted`. If there are only 2 or 3 columns and rows, there will be no dotted rules.

## Examples

### Basic usage

In this example, we define a single `<line-style>` for the lines drawn between the columns and rows of items in a grid container.

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

We define the unordered list as a 10-column container, creating columns and rows with the `grid-template-columns` property; we then set `list-style-type` to `none` to remove the bullets. We include a `gap` of `5px` to provide enough room between the columns and rows to fit our `thick dashed orange` rule.

```css
ul {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  list-style-type: none;
  gap: 5px;
  rule-width: thick;
  rule-color: orange;

  rule-style: dashed;
}
li {
  text-align: center;
  aspect-ratio: 1;
}
```

```css
@layer no-support {
  @supports not (rule-style: solid) {
    body::before {
      content: "Your browser doesn't support the rule-style property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

### Multiple values

This example demonstrates using multiple `<line-style>` values as a property value, and what happens when more `<line-style>` values are specified than there are gutters to style.

We set the `rule-style` property to be a comma-separated list of all the possible `<line-style>` values.

```css
ul {
  rule-style:
    dotted, dashed, solid, double, groove, ridge, inset, outset, none, hidden;
}
```

#### Result

There are more values than gutters for both the rows and columns; the last values are not used in each case.

### Repeating values

This example demonstrates how, when there are fewer values in the list of styles than column and row rules, the values are repeated.

#### CSS

Using the same HTML and CSS as in the previous example, we include three comma-separated styles as the `rule-style` value:

```css
ul {
  rule-style: solid, groove, double;
}
```

#### Result

### Using the `repeat()` function

This example demonstrates using the `repeat()` function within the `rule-style` property value.

#### CSS

We use the same HTML and CSS as in the previous examples. We include a `repeat()` function that sets a list of two `<line-style>` values to be repeated 3 times.

```css
ul {
  rule-style: solid, repeat(3, inset, outset), solid;
}
```

#### Result

The `repeat()` function repeats two style values three times, creating a list of eight style values. The styles are repeated for the columns; however, the last values in the list are discarded for the rows.

### Using `auto` within `repeat()`

This example demonstrates using `auto` instead of an integer within the `repeat()` function.

#### CSS

Using `repeat(auto, <line-style>)`, we set all column and row rules to `groove`, except the first and last, which we set to `solid`.

```css
ul {
  rule-style: solid, repeat(auto, groove), solid;
}
```

#### Result

Even though there are more column rule lines than row rule lines, the `<auto-repeat-line-color>` enables the creation of this symmetric effect.

```css
@layer no-support {
  @supports not (rule-style: solid, groove) {
    body::before {
      content: "Your browser doesn't support multiple values for the rule-style property";
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
- `rule-width`
- `column-rule-style`
- `row-rule-style`
- `rule` shorthand
- Defining CSS gaps
- CSS gaps module
