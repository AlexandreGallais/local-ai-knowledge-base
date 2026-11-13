---
title: "Internationalization (part 3 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/internationalization/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Internationalization (part 3 of 4)

### Number formatting

Number formatting is done with the `Intl.NumberFormat` object. The `NumberFormat` object accepts inputs in the form of numbers, strings, or `BigInt` values. Passing a string or `BigInt` instead of a number allows you to format numbers that are too large or too small to be represented precisely as a JavaScript number.

Common use cases of localized number formatting are as follows:

- Output the number in another numbering system (script), such as Chinese, Arabic, or Roman.
- Output the number with locale-specific conventions, such as the decimal symbol ("." in English, but "," in many European cultures), or digit grouping (3 digits in English, but may be 4 or 2 in other cultures, and may use ",", " ", or ".").
- Output the number with exponential notation such as "3.7 million" or "2 thousand".
- Output the number as a currency, applying specific currency symbols and rounding rules. For example, monetary values less than one cent in the U.S. or less than one yen in Japan may not be meaningful to display.
- Output the number as a percentage, applying locale-specific conversion and formatting rules.
- Output the number with units, such as "meters" or "liters", with translated unit names.

To decide what the formatted string looks like, you first choose the numbering system (which affects the characters used for the digits). The purpose of a numbering system is already discussed in locale information. Another option you need to decide is the `style`, which sets the context for what the number represents, and potentially affects other options' default values. It is one of `"decimal"`, `"percent"`, `"currency"`, or `"unit"`. If you want to format currencies, then you also need to provide the `currency` option. If you want to format units, then you also need to provide the `unit` option.

```js
const results = [];
for (const options of [
  { style: "decimal" }, // Format the number as a dimensionless decimal
  { style: "percent" }, // Format the number as a percentage; it is multiplied by 100
  { style: "currency", currency: "USD" }, // Format the number as a US dollar amount
  { style: "unit", unit: "meter" }, // Format the number as a length in meters
]) {
  const nf = new Intl.NumberFormat("en-US", options);
  results.push({ style: options.style, output: nf.format(1234567.89) });
}
console.table(results);
```

The output looks like:

| style      | output           |
| ---------- | ---------------- |
| 'decimal'  | '1,234,567.89'   |
| 'percent'  | '123,456,789%'   |
| 'currency' | '$1,234,567.89'  |
| 'unit'     | '1,234,567.89 m' |

The next group of options all specify what the numeric part should look like. First, you may want to represent extremely large values in a more readable way. You can set the `notation` option to `"scientific"` or `"engineering"`, which both use the `1.23e+6` notation. The difference is that the latter uses multiples of 3 for the exponent, keeping the mantissa (the part before the `e` symbol) between 1 and 1000, while the former can use any integer for the exponent, keeping the mantissa between 1 and 10. You can also set `notation` to `"compact"` to use a more human-readable notation.

```js
const results = [];
for (const options of [
  { notation: "scientific" },
  { notation: "engineering" },
  { notation: "compact", compactDisplay: "short" }, // "short" is default
  { notation: "compact", compactDisplay: "long" },
]) {
  const nf = new Intl.NumberFormat("en-US", options);
  results.push({
    notation: options.compactDisplay
      ? `${options.notation}-${options.compactDisplay}`
      : options.notation,
    output: nf.format(12000),
  });
}
console.table(results);
```

The output looks like:

| notation        | output        |
| --------------- | ------------- |
| 'scientific'    | '1.2E4'       |
| 'engineering'   | '12E3'        |
| 'compact-short' | '12K'         |
| 'compact-long'  | '12 thousand' |

Then, you may want to round the number (if you specified `notation`, then just the mantissa part), so you don't display a number that's too long. These are the digit options, which include:

- `minimumIntegerDigits`
- `minimumFractionDigits`
- `maximumFractionDigits`
- `minimumSignificantDigits`
- `maximumSignificantDigits`
- `roundingPriority`
- `roundingIncrement`
- `roundingMode`

The exact interaction of these options is quite complex and not worth covering here. You should read the digit options reference for more detail. Nevertheless, the general idea is straightforward: we first find the number of decimal places we want to keep, then we round excess decimal places off, either rounding down or up, depending on the value of the last digit.

```js
const results = [];
for (const options of [
  { minimumFractionDigits: 4, maximumFractionDigits: 4 },
  { minimumSignificantDigits: 4, maximumSignificantDigits: 4 },
  { minimumFractionDigits: 0, maximumFractionDigits: 0, roundingMode: "floor" },
  {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    roundingMode: "floor",
    roundingIncrement: 10,
  },
]) {
  const nf = new Intl.NumberFormat("en-US", options);
  results.push({
    options,
    output: nf.format(1234.56789),
  });
}
console.table(results);
```

The output looks like this:

| options                                                                                                | output       |
| ------------------------------------------------------------------------------------------------------ | ------------ |
| `{ minimumFractionDigits: 4, maximumFractionDigits: 4 }`                                               | '1,234.5679' |
| `{ minimumSignificantDigits: 4, maximumSignificantDigits: 4 }`                                         | '1,235'      |
| `{ minimumFractionDigits: 0, maximumFractionDigits: 0, roundingMode: "floor" }`                        | '1,234'      |
| `{ minimumFractionDigits: 0, maximumFractionDigits: 0, roundingMode: "floor", roundingIncrement: 10 }` | '1,230'      |

There are other customization options. For example, you can use the `useGrouping` and `signDisplay` options to customize whether and how to show the group separators (like "," in "1,234,567.89") and the sign. However, note that the characters used for the group separator, decimal point, and sign are locale-specific, so you can't customize them directly.

Apart from `format()`, there's a second important method, `formatRange()`, which formats a range of numbers. It takes two number representations, formats each one, joins them with a range separator (like the en-dash), and potentially deduplicates the common parts.

```js
const heightRange = {
  min: 1.63,
  max: 1.95,
};

const nf = new Intl.NumberFormat("en-US", { style: "unit", unit: "meter" });
console.log(nf.formatRange(heightRange.min, heightRange.max));
// 1.63–1.95 m
```

### List formatting

You may already have written code that does this:

```js
const fruits = ["apple", "banana", "cherry"];
console.log(`I like ${fruits.join(", ")}.`);
// I like apple, banana, cherry.
```

This code is not internationalized. In some languages, the list separator is not a comma. In _most_ languages (including English), you need a conjunction before the last item. But even just adding an "and" manually doesn't make it correct among all English speakers, because there's the debate of Oxford commas in English: "apple, banana, and cherry" vs. "apple, banana and cherry".

The `Intl.ListFormat` object solves this problem. It takes an array of strings and joins them in a locale-specific way such that the result represents a conjunction (and), disjunction (or), or a list of units.

```js
const fruits = ["apple", "banana", "cherry"];
const lf = new Intl.ListFormat("en-US", { style: "long", type: "conjunction" });
console.log(`I like ${lf.format(fruits)}.`);
// I like apple, banana, and cherry.

const lf = new Intl.ListFormat("en-US", { style: "long", type: "disjunction" });
console.log(`I can give you ${lf.format(fruits)}.`);
// I can give you apple, banana, or cherry.
```

Check `Intl.ListFormat()` for more examples and options.

### Relative time formatting

`Intl.RelativeTimeFormat` formats a time difference. The `RelativeTimeFormat` object takes relative times in the form of two arguments: a number (with any sign) and a time unit, such as `"day"`, `"hour"`, or `"minute"`.

It does several things at once:

- It localizes and pluralizes the time unit, such as "1 day" vs. "2 days", like in number formatting.
- It chooses the appropriate phrase for past and future times, such as "in 1 day" vs. "1 day ago".
- It may select a special phrase for some time units, such as "1 day ago" vs. "yesterday".

```js
const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
console.log(rtf.format(1, "day")); // tomorrow
console.log(rtf.format(2, "day")); // in 2 days
console.log(rtf.format(-1, "hour")); // 1 hour ago
```

Check `Intl.RelativeTimeFormat()` for more examples and options.

### Duration formatting

`Intl.DurationFormat` provides duration formatting, such as "3 hours, 4 minutes, 5 seconds". It is not a primitive operation with its own formatter: it uses `Intl.NumberFormat` and `Intl.ListFormat` internally to format each duration component, then joins them with a list separator. The `DurationFormat` object takes durations in the form of a `Temporal.Duration` object, or a plain object with the same properties.

Apart from customizing the numbering system, the duration formatting options decides whether or not to show each component, and how long they should be.

```js
console.log(
  new Intl.DurationFormat("en-US", {
    style: "long",
  }).format({ hours: 3, minutes: 4, seconds: 5 }),
);
// 3 hours, 4 minutes, and 5 seconds
```

Check `Intl.DurationFormat()` for more examples and options.

## Collation

The `Intl.Collator` object is useful for comparing and sorting strings. It takes two strings and returns a number indicating their relative order, in the same way as the `compareFn` argument of the `Array.prototype.sort` method.

There are many reasons why you should not use JavaScript operators like `===` or `>` to compare user-facing strings:

- Irrelevant orthographic variants: For example, in English, "naïve" and "naive" are just alternative spellings of the same word and should be treated as equal.
- Ignoring case: Often, you want to ignore case when comparing strings. For example, "apple" and "Apple" should be treated as equal.
- Unicode code point order doesn't make sense: Comparison operators like `>` compare by Unicode code point order, which is not the same as the order of characters in a dictionary. For example, "ï" comes after "z" in code point order, but you would want it to be ordered next to "i" in a dictionary.
- Unicode normalization: The same character may have multiple representations in Unicode. For example, "ñ" can be represented as a single character or as "n" followed by a combining tilde. (See `String.prototype.normalize()`.) These should be treated as equal.
- Number comparison: Numbers in strings should be compared as numbers, not as strings. For example, you would want "test-10" to come after "test-2".

There are two distinct use cases for collation: **sorting** and **searching**. Sorting is when you have a list of strings and you want to order them according to some rule. Searching is when you have a list of strings and you want to find a string that matches a query. When searching, you should only pay attention to whether the comparison result is zero (equal) or not, not the sign of the result.

There are many different ways to sort, even within the same locale. For example, there are two different sort orders in German, _phonebook_ and _dictionary_. Phonebook sort emphasizes sound — as if "ä", "ö", and so on were expanded to "ae", "oe", and so on before sorting.

```js
const names = ["Hochberg", "Hönigswald", "Holzman"];

const germanPhonebook = new Intl.Collator("de-DE-u-co-phonebk");

// as if sorting ["Hochberg", "Hoenigswald", "Holzman"]:
console.log(names.sort(germanPhonebook.compare));
// ['Hochberg', 'Hönigswald', 'Holzman']
```

Some German words conjugate with extra umlauts, so in dictionaries it's sensible to order ignoring umlauts (except when ordering words differing _only_ by umlauts: _schon_ before _schön_).

```js
const germanDictionary = new Intl.Collator("de-DE-u-co-dict");

// as if sorting ["Hochberg", "Honigswald", "Holzman"]:
console.log(names.sort(germanDictionary.compare).join(", "));
// "Hochberg, Holzman, Hönigswald"
```

## Plural rules

The `Intl.PluralRules` object is useful for selecting the correct plural form of a word. It doesn't automatically pluralize words for you (for example, you can't pass it "apple" and expect "apples" back), but it tells you which plural form to use based on a number. You may already be doing this:

```js
function formatMessage(n) {
  return `You have ${n} ${n === 1 ? "apple" : "apples"}.`;
}
```

But this is hard to generalize across languages, especially those with many plural forms. You can see `Intl.PluralRules` for a general introduction to plural rules. Here, we just demonstrate a few common use cases.

```js
const prCard = new Intl.PluralRules("en-US");
const prOrd = new Intl.PluralRules("en-US", { type: "ordinal" });

const englishOrdinalSuffixes = {
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
};

const catPlural = {
  one: "cat",
  other: "cats",
};

function formatMessage(n1, n2) {
  return `The ${n1}${englishOrdinalSuffixes[prOrd.select(n1)]} U.S. president had ${n2} ${catPlural[prCard.select(n2)]}.`;
}

console.log(formatMessage(42, 1)); // The 42nd U.S. president had 1 cat.
console.log(formatMessage(45, 0)); // The 45th U.S. president had 0 cats.
```
