---
title: "Prepare component for translation (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/i18n/prepare.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Prepare component for translation

To prepare your project for translation, complete the following actions.

- Use the `i18n` attribute to mark text in component templates
- Use the `i18n-` attribute to mark attribute text strings in component templates
- Use the `$localize` tagged message string to mark text strings in component code

## Mark text in component template

In a component template, the i18n metadata is the value of the `i18n` attribute.

```html
<element i18n="{i18n_metadata}">{string_to_translate}</element>
```

Use the `i18n` attribute to mark a static text message in your component templates for translation.
Place it on every element tag that contains fixed text you want to translate.

HELPFUL: The `i18n` attribute is a custom attribute that the Angular tools and compilers recognize.

### `i18n` example

The following `<h1>` tag displays a simple English language greeting, "Hello i18n!".

File: `app.component.html`

```html
<h1>Hello i18n!</h1>
```

To mark the greeting for translation, add the `i18n` attribute to the `<h1>` tag.

File: `app.component.html`

```html
<h1 i18n>Hello i18n!</h1>
```

### using conditional statement with `i18n`

The following `` tag will display translated text as part of `div` and `aria-label` based on toggle status

    File: `app.component.html`

```html
<button type="button" (click)="toggleDisplay()">Toggle</button>
<div i18n [attr.aria-label]="toggleAriaLabel()">{{ toggle() }}</div>
```
    File: `app.component.ts`

```ts
import {Component, computed, signal} from '@angular/core';
import {$localize} from '@angular/localize/init';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  minutes = 0;
  gender = 'female';
  fly = true;
  logo = '${this.baseUrl}/angular.svg';
  readonly toggle = signal(false);
  readonly toggleAriaLabel = computed(() => {
    return this.toggle()
      ? $localize`:Toggle Button|A button to toggle status:Show`
      : $localize`:Toggle Button|A button to toggle status:Hide`;
  });

  inc(i: number) {
    this.minutes = Math.min(5, Math.max(0, this.minutes + i));
  }
  male() {
    this.gender = 'male';
  }
  female() {
    this.gender = 'female';
  }
  other() {
    this.gender = 'other';
  }
  toggleDisplay() {
    this.toggle.update((toggle) => !toggle);
  }
}
```

### Translate inline text without HTML element

Use the `<ng-container>` element to associate a translation behavior for specific text without changing the way text is displayed.

HELPFUL: Each HTML element creates a new DOM element.
To avoid creating a new DOM element, wrap the text in an `<ng-container>` element.
The following example shows the `<ng-container>` element transformed into a non-displayed HTML comment.

```html
<ng-container i18n>I don't output any element</ng-container>
```

### Name the interpolation placeholder

By default, Angular generates a placeholder name for each interpolation in a translated message. To give it a meaningful name that helps translators understand the context, add an `//i18n(ph="name")` comment inside the interpolation.

```html
<element i18n>{{ expression //i18n(ph="placeholder_name") }}</element>
```

For example:

```html
<p i18n>Hello, {{ username //i18n(ph="name") }}!</p>
```

This is the template equivalent of naming a placeholder in component code with `$localize`:

```ts
$localize`Hello, ${username}:name:!`;
```

## Mark element attributes for translations

In a component template, the i18n metadata is the value of the `i18n-{attribute_name}` attribute.

```html
<element i18n-{attribute_name}="{i18n_metadata}" {attribute_name}="{attribute_value}" />
```

The attributes of HTML elements include text that should be translated along with the rest of the displayed text in the component template.

Use `i18n-{attribute_name}` with any attribute of any element and replace `{attribute_name}` with the name of the attribute.
Use the following syntax to assign a meaning, description, and custom ID.

```html
i18n-{attribute_name}="{meaning}|{description}@@{id}"
```

### `i18n-title` example

To translate the title of an image, review this example.
The following example displays an image with a `title` attribute.

File: `app.component.html`

```html
<img [src]="logo" title="Angular logo" alt="Angular logo" />
```

To mark the title attribute for translation, complete the following action.

Add the `i18n-title` attribute

The following example displays how to mark the `title` attribute on the `img` tag by adding `i18n-title`.

File: `app.component.html`

```html
<img [src]="logo" i18n-title title="Angular logo" alt="Angular logo" />
```

## Mark text in component code

In component code, the translation source text and the metadata are surrounded by backtick \(`&#96;`\) characters.

Use the `$localize` tagged message string to mark a string in your code for translation.

```ts
$localize`string_to_translate`;
```

The i18n metadata is surrounded by colon \(`:`\) characters and prepends the translation source text.

```ts
$localize`:{i18n_metadata}:string_to_translate`;
```

### Include interpolated text

Include interpolations in a `$localize` tagged message string.

```ts
$localize`string_to_translate ${variable_name}`;
```

### Name the interpolation placeholder {#name-the-interpolation-placeholder-in-code}

```ts
$localize`string_to_translate ${variable_name}:placeholder_name:`;
```

### Conditional syntax for translations

```ts
return this.show ? $localize`Show Tabs` : $localize`Hide tabs`;
```

## i18n metadata for translation

```html
{meaning}|{description}@@{custom_id}
```

The following parameters provide context and additional information to reduce confusion for your translator.

| Metadata parameter | Details                                                               |
| :----------------- | :-------------------------------------------------------------------- |
| Custom ID          | Provide a custom identifier                                           |
| Description        | Provide additional information or context                             |
| Meaning            | Provide the meaning or intent of the text within the specific context |

For additional information about custom IDs, see Manage marked text with custom IDs.

### Add helpful descriptions and meanings

To translate a text message accurately, provide additional information or context for the translator.

Add a _description_ of the text message as the value of the `i18n` attribute or `$localize` tagged message string.

The following example shows the value of the `i18n` attribute.

File: `app.component.html`

```html
<h1 i18n="An introduction header for this sample">Hello i18n!</h1>
```

The following example shows the value of the `$localize` tagged message string with a description.

```ts
$localize`:An introduction header for this sample:Hello i18n!`;
```

The translator may also need to know the meaning or intent of the text message within this particular application context, in order to translate it the same way as other text with the same meaning.
Start the `i18n` attribute value with the _meaning_ and separate it from the _description_ with the `|` character: `{meaning}|{description}`.

#### `h1` example

For example, you may want to specify that the `<h1>` tag is a site header that you need translated the same way, whether it is used as a header or referenced in another section of text.

The following example shows how to specify that the `<h1>` tag must be translated as a header or referenced elsewhere.

File: `app.component.html`

```html
<h1 i18n="site header|An introduction header for this sample">Hello i18n!</h1>
```

The result is any text marked with `site header`, as the _meaning_ is translated exactly the same way.

The following code example shows the value of the `$localize` tagged message string with a meaning and a description.

```ts
$localize`:site header|An introduction header for this sample:Hello i18n!`;
```

**How meanings control text extraction and merges**

The Angular extraction tool generates a translation unit entry for each `i18n` attribute in a template.
The Angular extraction tool assigns each translation unit a unique ID based on its source text and _meaning_. The _description_ does not affect the ID.

HELPFUL: For more information about the Angular extraction tool, see Work with translation files.

The same text elements with different _meanings_ are extracted with different IDs.
For example, if the word "right" uses the following two definitions in two different locations, the word is translated differently and merged back into the application as different translation entries.

- `correct` as in "you are right"
- `direction` as in "turn right"

If the same text elements meet the following conditions, the text elements are extracted only once and use the same ID.

- Same meaning or definition
- Different descriptions

That one translation entry is merged back into the application wherever the same text elements appear.
