---
title: "Prepare component for translation (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/i18n/prepare.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Prepare component for translation (part 2 of 2)

## ICU expressions

ICU expressions help you mark alternate text in component templates to meet conditions.
An ICU expression includes a component property, an ICU clause, and the case statements surrounded by open curly brace \(`{`\) and close curly brace \(`}`\) characters.

```html
{ component_property, icu_clause, case_statements }
```

The component property defines the variable.
An ICU clause defines the type of conditional text.

| ICU clause                                                           | Details                                                             |
| :------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `plural`                        | Mark the use of plural numbers                                      |
| `select` | Mark choices for alternate text based on your defined string values |

To simplify translation, use International Components for Unicode clauses \(ICU clauses\) with regular expressions.

HELPFUL: The ICU clauses adhere to the ICU Message Format specified in the CLDR pluralization rules.

### Mark plurals

Different languages have different pluralization rules that increase the difficulty of translation.
Because other locales express cardinality differently, you may need to set pluralization categories that do not align with English.
Use the `plural` clause to mark expressions that may not be meaningful if translated word-for-word.

```html
{ component_property, plural, pluralization_categories }
```

After the pluralization category, enter the default text \(English\) surrounded by open curly brace \(`{`\) and close curly brace \(`}`\) characters.

```html
pluralization_category { }
```

The following pluralization categories are available for English and may change based on the locale.

| Pluralization category | Details                    | Example                    |
| :--------------------- | :------------------------- | :------------------------- |
| `zero`                 | Quantity is zero           | `=0 { }`  `zero { }` |
| `one`                  | Quantity is 1              | `=1 { }`  `one { }`  |
| `two`                  | Quantity is 2              | `=2 { }`  `two { }`  |
| `few`                  | Quantity is 2 or more      | `few { }`                  |
| `many`                 | Quantity is a large number | `many { }`                 |
| `other`                | The default quantity       | `other { }`                |

If none of the pluralization categories match, Angular uses `other` to match the standard fallback for a missing category.

```html
other { default_quantity }
```

HELPFUL: For more information about pluralization categories, see Choosing plural category names in the CLDR - Unicode Common Locale Data Repository.

**Background: Locales may not support some pluralization categories**

Many locales don't support some of the pluralization categories.
The default locale \(`en-US`\) uses a very simple `plural()` function that doesn't support the `few` pluralization category.
Another locale with a simple `plural()` function is `es`.
The following code example shows the en-US `plural()` function.

```ts
/* eslint-disable */
function plural(n: number): number {
  let i = Math.floor(Math.abs(n)),
    v = n.toString().replace(/^[^.]*\.?/, '').length;
  if (i === 1 && v === 0) return 1;
  return 5;
}
```

The `plural()` function only returns 1 \(`one`\) or 5 \(`other`\).
The `few` category never matches.

#### `minutes` example

If you want to display the following phrase in English, where `x` is a number.

```html
updated x minutes ago
```

And you also want to display the following phrases based on the cardinality of `x`.

```html
updated just now
```

```html
updated one minute ago
```

Use HTML markup and interpolations.
The following code example shows how to use the `plural` clause to express the previous three situations in a `` element.

File: `app.component.html`

```html
<span i18n
  >Updated
  {minutes, plural, =0 {just now} =1 {one minute ago} other {{{ minutes }} minutes ago}}</span
>
```

Review the following details in the previous code example.

| Parameters                        | Details                                                                                                               |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `minutes`                         | The first parameter specifies the component property is `minutes` and determines the number of minutes.               |
| `plural`                          | The second parameter specifies the ICU clause is `plural`.                                                            |
| `=0 {just now}`                   | For zero minutes, the pluralization category is `=0`. The value is `just now`.                                        |
| `=1 {one minute}`                 | For one minute, the pluralization category is `=1`. The value is `one minute`.                                        |
| `other {{{minutes}} minutes ago}` | For any unmatched cardinality, the default pluralization category is `other`. The value is `{{minutes}} minutes ago`. |

`{{minutes}}` is an interpolation.

### Mark alternates and nested expressions

The `select` clause marks choices for alternate text based on your defined string values.

```html
{ component_property, select, selection_categories }
```

Translate all of the alternates to display alternate text based on the value of a variable.

After the selection category, enter the text \(English\) surrounded by open curly brace \(`{`\) and close curly brace \(`}`\) characters.

```html
selection_category { text }
```

Different locales have different grammatical constructions that increase the difficulty of translation.
Use HTML markup.
If none of the selection categories match, Angular uses `other` to match the standard fallback for a missing category.

```html
other { default_value }
```

#### `gender` example

If you want to display the following phrase in English.

```html
The author is other
```

And you also want to display the following phrases based on the `gender` property of the component.

```html
The author is female
```

```html
The author is male
```

The following code example shows how to bind the `gender` property of the component and use the `select` clause to express the previous three situations in a `` element.

The `gender` property binds the outputs to each of following string values.

| Value  | English value |
| :----- | :------------ |
| female | `female`      |
| male   | `male`        |
| other  | `other`       |

The `select` clause maps the values to the appropriate translations.
The following code example shows `gender` property used with the select clause.

File: `app.component.html`

```html
<span i18n>The author is {gender, select, male {male} female {female} other {other}}</span>
```

#### `gender` and `minutes` example

Combine different clauses together, such as the `plural` and `select` clauses.
The following code example shows nested clauses based on the `gender` and `minutes` examples.

File: `app.component.html`

```html
<span i18n
  >Updated:
  {minutes, plural,
    =0 {just now}
    =1 {one minute ago}
    other {{{ minutes }} minutes ago by {gender, select, male {male} female {female} other {other}}}
  }
</span>
```

## What's next

  - Work with translation files
