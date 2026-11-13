---
title: "`:lang()` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_lang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:lang()` CSS pseudo-class

The **`:lang()`** CSS pseudo-class matches elements based on the language they are determined to be in.

```css
*:lang(en-US) {
  outline: 2px solid deeppink;
}
```

```html
<p lang="en-US">
  Music during road trips and long commutes aren't a problem, but using
  headphones isn't the best thing to do while driving in your car.
</p>

<p lang="pl-PL">
  Gdy widzimy znak z narysowaną czaszką i napisem
  <strong lang="en-US">DANGER</strong> to lepiej nie wchodzić do środka.
</p>
```

> **Note:**
> In HTML, the language is determined by a combination of the `lang` attribute, the `<meta>` element, and possibly by information from the protocol (such as HTTP headers). For other document types there may be other document methods for determining the language.

## Syntax

```plain
:lang(<language-code> [,<language-code> ]*) {
  /* ... */
}
```

### Parameters

- `<language-code>`
    A comma-separated list of one or more `<string>`s that target elements based on the BCP 47 language tags set in their `lang` attributes.
    Matching by language range is case-insensitive.

## Description

When selecting languages, there is implicit wildcard matching, so `:lang(de-DE)` will match `de-DE`, `de-DE-1996`, `de-Latn-DE`, `de-Latf-DE`, and `de-Latn-DE-1996`.
Explicitly using wildcards must include a full match of a language subtag, so `:lang("*-F*")` is invalid but `:lang("*-Fr")` is valid.

## Examples

### Matching children of a given language

In this example, the `:lang()` pseudo-class is used to match the parents of quote elements (`<q>`) using child combinators. Note that this doesn't illustrate the only way to do this, and that the best method to use depends on the type of document. Also note that Unicode values are used to specify some of the special quote characters.

#### HTML

```html
<div lang="en">
  <q>This English quote has a <q>nested</q> quote inside.</q>
</div>
<div lang="fr">
  <q>This French quote has a <q>nested</q> quote inside.</q>
</div>
<div lang="de">
  <q>This German quote has a <q>nested</q> quote inside.</q>
</div>
```

#### CSS

```css
:lang(en) > q {
  quotes: "\201C" "\201D" "\2018" "\2019";
}
:lang(fr) > q {
  quotes: "« " " »";
}
:lang(de) > q {
  quotes: "»" "«" "\2039" "\203A";
}
```

#### Result

### Matching multiple languages

The following example shows how to match multiple languages by providing a comma-separated list of language codes.
It's also possible to use a wildcard to match languages in a given language range.

```css
p {
  margin: 0;
}
```

#### HTML

```html
<p lang="nl">Dit is een Nederlandse paragraaf.</p>
<p lang="de">Dies ist ein deutscher Satz.</p>
<p lang="en">This is an English sentence.</p>
<p lang="en-GB">Matching the language range of English.</p>
<p lang="fr">Ceci est un paragraphe français.</p>
<p lang="fr-Latn-FR">Ceci est un paragraphe français en latin.</p>
```

#### CSS

```css
/* Matches nl and de */
:lang("nl", "de") {
  color: green;
}

/* Omitting quotes & case-insensitive matching */
:lang(EN, FR) {
  color: blue;
}

/* Wildcard matching a language range */
:lang("*-Latn") {
  color: red;
}
```

#### Result

## See also

- The `:dir` pseudo-class that matches by directionality of text
- HTML `lang` attribute
- HTML `translate` attribute
- BCP 47 language tag
