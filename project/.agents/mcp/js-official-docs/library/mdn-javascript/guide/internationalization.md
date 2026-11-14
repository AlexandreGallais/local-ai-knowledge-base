---
title: "Internationalization (part 1 of 4)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/internationalization/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Internationalization

The `Intl` object is the namespace for the ECMAScript Internationalization API, which provides a wide range of locale- and culture-sensitive data and operations.

## Overview

The `Intl` object is very use-case driven. It provides a separate object for each use case that requires locale-specific logic. Currently, it provides the following functionalities:

- Getting information about a locale using `Intl.Locale`.
- Formatting data using `Intl.DateTimeFormat`, `Intl.DurationFormat`, `Intl.ListFormat`, `Intl.NumberFormat`, and `Intl.RelativeTimeFormat`.
- Collation (i.e., comparing strings for sorting or searching) using `Intl.Collator`.
- Selecting plural forms using `Intl.PluralRules`.
- Segmenting text into units such as words, sentences, or graphemes using `Intl.Segmenter`.
- Getting the displayed name for currencies, languages, scripts, regions, and time zones using `Intl.DisplayNames`.

Most `Intl` APIs share a similar design (`Intl.Locale` is the only exception). You start by constructing an instance with the desired locale and options. This defines a set of rules for the desired operation (formatting, collation, segmentation, etc.). Then, when you call the method on the instance, such as `format()`, `compare()`, or `segment()`, the object applies the specified rule to the passed data.

```js
// 1. Construct a formatter object, specifying the locale and formatting options:
const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// 2. Use the `format` method of the formatter object to format a number:
console.log(price.format(5.259)); // $5.26
```

The general signature of the constructor is:

```js
new Intl.SomeObject(locales, options)
```

- `locales` (optional)
    A string with a BCP 47 language tag or an `Intl.Locale` instance, or an array of such locale identifiers. The runtime's default locale is used when `undefined` is passed or when none of the specified locale identifiers is supported. For the general form and interpretation of the `locales` argument, see the parameter description on the `Intl` main page.
- `options` (optional)
    An object containing properties that customize specific aspects of the operation, which is key to understanding how to use each `Intl` object.

## Locale information

Locales underlie all behaviors of `Intl`. A _locale_ is a set of conventions, represented in the `Intl` API by the `Intl.Locale` object. All `Intl` constructors that accept language tags also accept `Intl.Locale` objects.

Each locale is primarily defined by four things: a `language`, a `script`, a `region`, and sometimes some `variants`. When connected together by `-` in that order, they form a BCP 47 language tag.

- The language is the most important part of the locale and is mandatory. When given a single language, like `en` or `fr`, there are algorithms to infer the rest of the information (see `Intl.Locale.prototype.maximize()`).
- However, you often want to specify the region as well, because conventions can differ drastically between regions that speak the same language. For example, the date format in the US is MM/DD/YYYY, whereas in the UK it is DD/MM/YYYY, so specifying `en-US` or `en-GB` is important.
- You can also specify a script. The script is the writing system, or the characters used to transcribe the language. In practice, the script is often unnecessary, because the language used in a certain region is only written in one script. However, there are exceptions such as the Serbian language, which can be written in both the Latin and Cyrillic scripts (`sr-Latn` and `sr-Cyrl`), or the Chinese language, which can be written in both the Simplified and Traditional scripts (`zh-Hans` and `zh-Hant`).
- The variants are rarely used. Usually, they denote different orthographies; for example, German has the `1901` and `1996` orthography variants, which are written as `de-1901` and `de-1996`.

```js
// These two are equivalent when passed to other Intl APIs
const locale1 = new Intl.Locale("en-US");
const locale2 = new Intl.Locale("en-Latn-US");

console.log(locale1.language, locale1.script, locale1.region); // "en", undefined, "US"
console.log(locale2.language, locale2.script, locale2.region); // "en", "Latn", "US"
```

A locale also contains a set of conventions used by that particular culture:

 | Use case | Property | Description | Extension subtag

 | Date/time formatting
 | `calendar`
 | Used to group days into years, months, and weeks, and to assign names to them. For example, the `gregory` date "2022-01-01" becomes "28 Tevet 5782" in the `hebrew` calendar.
 | `ca`

 | `hourCycle`
 | Decides if times are displayed in 12-hour or 24-hour format, and whether the smallest hour number is 0 or 1.
 | `hc`

 | Number formatting, including dates, times, durations, etc.
 | `numberingSystem`
 | Transforms numbers into a locale-specific notation. The regular `0123456789` system is called `latn` (Latin). Often, each script has a numbering system that is just a digit-by-digit translation, but some scripts have more than one numbering system, some may not typically write numbers in that script (for example, Chinese has its own `hanidec` numbering system, but most texts use the standard `latn` system), and others may require special conversion algorithms (for example, Roman numerals — `roman`).
 | `nu`

 | Collation
 | `collation`
 | Defines the generic collation algorithm. For example, if you use the German `phonebk` collation, then "ä" is treated as "ae", and will be sorted between "ad" and "af".
 | `co`

 | `caseFirst`
 | Decides whether uppercase or lowercase letters should be sorted first, or if casing is ignored.
 | `kf`

 | `numeric`
 | Decides whether numbers are sorted as numbers or as strings. For example, if true, "10" will be sorted after "2".
 | `kn`

You can explicitly specify these properties when constructing the `Intl.Locale` or passing language tags to other `Intl` constructors. There are two ways to do this — append them to the language tag or specify them as options.

- To append them to the language tag, you first append the string `-u` (meaning "Unicode extension"), then the extension subtag as given above, then the value.
- To specify them as options, you just add the property name as given above, together with its value, to the `options` object.

Using `Intl.DateTimeFormat` as an example, both of the following lines create a formatter that formats dates in the Hebrew calendar:

```js
const df1 = new Intl.DateTimeFormat("en-US-u-ca-hebrew");
const df2 = new Intl.DateTimeFormat("en-US", { calendar: "hebrew" });
```

Unrecognized properties are ignored, so you can use the same syntax as above with `Intl.NumberFormat`, but it won't do anything different than just passing `en-US`, because number formatting doesn't use the `calendar` property.

It is tricky to get the default values of these locale conventions. `new Intl.Locale("en-US").calendar` returns `undefined`, because the `Locale` object only contains the information you passed to it. The default calendar is theoretically dependent on what API you are using the calendar with, so to get the default calendar of `en-US` as used by `Intl.DateTimeFormat`, you can use its `resolvedOptions()` method. The same goes for other properties.

```js
const locale = new Intl.Locale("en-US");
console.log(locale.calendar); // undefined; it's not provided
console.log(new Intl.DateTimeFormat(locale).resolvedOptions().calendar); // "gregory"
```

`Intl.Locale` objects do two things simultaneously: they represent a parsed BCP 47 language tag (as demonstrated above), and they provide information about that locale. All of its properties, like `calendar`, are extracted from the input only, without querying any data source about default values. On the other hand, it has a group of methods for querying real-world information about the locale. For example, the `getCalendars()`, `getHourCycles()`, `getNumberingSystems()`, and `getCollations()` methods complement the `calendar`, `hourCycle`, `numberingSystem`, and `collation` properties, and each returns an array of preferred values for that property.

```js
const locale = new Intl.Locale("ar-EG");
console.log(locale.getCalendars()); // ['gregory', 'coptic', 'islamic', 'islamic-civil', 'islamic-tbla']
```

`Intl.Locale` instances also contain other methods that expose useful information, such as `getTextInfo()`, `getTimeZones()`, and `getWeekInfo()`.

## Figuring out the locale

A shared concern for internationalization is: how do I know what locale to use?

The most obvious answer is "what the user prefers." Browsers expose the user's language preferences through the `navigator.languages` property. This is an array of language identifiers that can be directly passed to the formatter constructor—more on this later. The user can configure this list in their browser settings. You can also pass an empty array or `undefined`, which both cause the browser's default locale to be used.

```js
const numberFormatter = new Intl.NumberFormat(navigator.languages);
console.log(numberFormatter.format(1234567.89));

const numberFormatter2 = new Intl.NumberFormat([]);
```

However, this may not always provide the most desirable result. Strings formatted by `Intl` formatters represent a tiny fraction of text displayed on your site; most localized content is provided by you, the site developer. For example, suppose your site is only offered in two languages: English and French. If a Japanese user visits your site and expects to use your site in English, they will be baffled when they see the English text interleaved with numbers and dates in Japanese!

Usually, you don't want to use the browser's default language. Rather, you want to use the same language that the rest of your site is offered in. Suppose your site has a language switcher that stores the user's choice somewhere — you could directly use that.

```js
// Suppose this can be changed by some site-wide control
const userSettings = {
  locale: "en-US",
  colorMode: "dark",
};
const numberFormatter = new Intl.NumberFormat(userSettings.locale);
console.log(numberFormatter.format(1234567.89));
```

If your site has a backend that dynamically selects the language based on the user's `Accept-Language` header and sends back different HTML based on that, you could also use the HTML element's `HTMLElement.lang` property: `new Intl.NumberFormat(document.documentElement.lang)`.

If your site is only offered in one language, you could also hardcode the locale in your code: `new Intl.NumberFormat("en-US")`.

As previously mentioned, you can also pass an array of locales to the constructor, representing a list of fallback choices. The first example using `navigator.languages` is an example of this: if the first user-configured locale is not supported for the particular operation, the next one is tried, and so on, until we find a requested locale for which the runtime has data. You can do this manually as well. In the example below, we specify a list of locales in decreasing order of specificity which all represent languages likely to be understood by a Hong Kong Chinese speaker, so the formatter picks the most specific one that it supports.

```js
const numberFormatter = new Intl.NumberFormat([
  "yue-Hant",
  "zh-Hant-HK",
  "zh-Hant",
  "zh",
]);
```

There is no API for listing all supported locales, but there are a few methods for handling the locale list:

- `Intl.getCanonicalLocales()`: This function takes a list of locale identifiers and returns a list of canonicalized locale identifiers. This is useful for understanding the canonicalization process for each `Intl` constructor.
- The `supportedLocalesOf()` static method on each `Intl` object (like `Intl.DateTimeFormat.supportedLocalesOf()`): This method takes the same arguments as the constructor (`locales` and `options`) and returns a subset of the given locale tags that match the given data. This is useful for understanding which locales are supported by the runtime for a particular operation, for example, to show a language switcher containing only the supported languages.

## Understanding the return value

The second shared concern for all objects is "what does the method return?" This is a hard question to answer beyond the structure or type of the returned value because there's no normative specification saying what _exactly_ should be returned. Most of the time, the result of a method is consistent. However, the output may vary between implementations, even within the same locale — output variations are by design and allowed by the specification. It may also not be what you expect. For example, the string returned by `format()` may use non-breaking spaces or be surrounded by bidirectional control characters. You should not compare the results of any `Intl` method to hardcoded constants; they should only be displayed to users.

Of course, this answer seems unsatisfactory, because most developers do wish to control what the output looks like—at least, you don't want your user to be confused by nonsensical output. Here are some guidelines if you do want to conduct testing, whether automated or manual:

- Test all locales that your user may use. This is easier if you have a fixed set of supported locales (for example via a language switcher). If you are using whatever the user prefers, you may pick a few common ones for your users, but bear in mind that what the user sees could vary. You can usually mock user preference via the test runner's configuration or mocking the `Intl` constructors.
- Test on multiple JavaScript engines. The `Intl` API is directly implemented by the JavaScript engine, so for example you should expect Node.js and Chrome (which both use V8) to have the same output, while Firefox (which uses SpiderMonkey) may have a different output. Although all engines likely use the CLDR data, they usually postprocess it in different ways. Some browser build settings (for reducing the install size, for example) may also affect what locales and options are supported.
- Don't assume the output. This means you shouldn't write the output by hand, such as `expect(result).toBe("foo")`. Instead, use snapshot testing or copy the string value from the output of a test run.
