---
title: "Manage marked text with custom IDs"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/i18n/manage-marked-text.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Manage marked text with custom IDs

The Angular extractor generates a file with a translation unit entry each of the following instances.

- Each `i18n` attribute in a component template
- Each `$localize` tagged message string in component code

As described in How meanings control text extraction and merges, Angular assigns each translation unit a unique ID.

The following example displays translation units with unique IDs.

File: `messages.fr.xlf`

```
<trans-unit id="ba0cc104d3d69bf669f97b8d96a4c5d8d9559aa3" datatype="html">
```

When you change the translatable text, the extractor generates a new ID for that translation unit.
In most cases, changes in the source text also require a change to the translation.
Therefore, using a new ID keeps the text change in sync with translations.

However, some translation systems require a specific form or syntax for the ID.
To address the requirement, use a custom ID to mark text.
Most developers don't need to use a custom ID.
If you want to use a unique syntax to convey additional metadata, use a custom ID.
Additional metadata may include the library, component, or area of the application in which the text appears.

To specify a custom ID in the `i18n` attribute or `$localize` tagged message string, use the `@@` prefix.
The following example defines the `introductionHeader` custom ID in a heading element.

File: `app.component.html`

```html
<h1 i18n="@@introductionHeader">Hello i18n!</h1>
```

The following example defines the `introductionHeader` custom ID for a variable.

```ts
variableText1 = $localize`:@@introductionHeader:Hello i18n!`;
```

When you specify a custom ID, the extractor generates a translation unit with the custom ID.

File: `messages.fr.xlf`

```
<trans-unit id="introductionHeader" datatype="html">
```

If you change the text, the extractor does not change the ID.
As a result, you don't have to take the extra step to update the translation.
The drawback of using custom IDs is that if you change the text, your translation may be out-of-sync with the newly changed source text.

## Use a custom ID with a description

Use a custom ID in combination with a description and a meaning to further help the translator.

The following example includes a description, followed by the custom ID.

File: `app.component.html`

```html
<h1 i18n="An introduction header for this sample@@introductionHeader">Hello i18n!</h1>
```

The following example defines the `introductionHeader` custom ID and description for a variable.

```ts
variableText2 = $localize`:An introduction header for this sample@@introductionHeader:Hello i18n!`;
```

The following example adds a meaning.

File: `app.component.html`

```html
<h1 i18n="site header|An introduction header for this sample@@introductionHeader">Hello i18n!</h1>
```

The following example defines the `introductionHeader` custom ID for a variable.

```ts
variableText3 = $localize`:site header|An introduction header for this sample@@introductionHeader:Hello i18n!`;
```

### Define unique custom IDs

Be sure to define custom IDs that are unique.
If you use the same ID for two different text elements, the extraction tool extracts only the first one, and Angular uses the translation in place of both original text elements.

For example, in the following code snippet the same `myId` custom ID is defined for two different text elements.

File: `app.component.html`

```html
<h3 i18n="@@myId">Hello</h3>
<!-- ... -->
<p i18n="@@myId">Good bye</p>
```

The following displays the translation in French.

File: `src/locale/messages.fr.xlf`

```
<trans-unit id="myId" datatype="html">
  <source>Hello</source>
  <target state="new">Bonjour</target>
</trans-unit>
```

Both elements now use the same translation \(`Bonjour`\), because both were defined with the same custom ID.

```html
<h3>Bonjour</h3>
<!-- ... -->
<p>Bonjour</p>
```
