---
title: "`lang` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/lang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `lang` HTML global attribute

The **`lang`** global attribute helps define the language of an element: the language that non-editable elements are written in, or the language that the editable elements should be written in by the user. The attribute contains a single BCP 47 language tag.

> **Note:**
> The language is in an unknown state if there's no indication of language anywhere. It is recommended to always specify an appropriate value for this attribute, especially due to accessibility concerns.

```html
<p>This paragraph is English, but the language is not specifically defined.</p>

<p lang="en-GB">This paragraph is defined as British English.</p>

<p lang="fr">Ce paragraphe est défini en français.</p>
```

```css
p::before {
  padding-right: 5px;
}

[lang="en-GB"]::before {
  content: "(In British English) ";
}

[lang="fr"]::before {
  content: "(In French) ";
}
```

## Values

The attribute contains a single BCP 47 language tag. If the attribute value is the _empty string_ (`lang=""`), the language is set to _unknown_; if the language tag is not valid according to BCP47, it is set to _invalid_.

If the `xml:lang` attribute is also specified, the HTML spec requires the `lang` and `xml:lang` attributes' values to be equal case-insensitively. The `xml:lang` attribute takes priority.

For the CSS pseudo-class `:lang`, two invalid language names are different if their names are different. So while `:lang(es)` matches both `lang="es-ES"` and `lang="es-419"`, `:lang(xyzzy)` would _not_ match `lang="xyzzy-Zorp!"`.

### Inheritance

If an element has no `lang` or `xml:lang` attribute, it inherits the language of its parent element, or the `host` if the parent node is a `ShadowRoot`. If no ancestor sets a language, the language can also be specified by `<meta http-equiv="content-language">` or the HTTP `Content-Language` header. If no single content language can be determined from these cues, the default is the empty string (with _unknown_ as the content language).

## Accessibility concerns

WCAG Success Criterion 3.1.1 **requires** that a page language is specified in a way which may be 'programmatically determined' (i.e., via the **`lang`** attribute).

WCAG Success Criterion 3.1.2 requires that pages with **parts** in different languages have the languages of those parts specified too. Again, the **`lang`** attribute is the correct mechanism for this.

The purpose of these requirements is primarily to allow assistive technologies such as screen readers to invoke the correct pronunciation.

For example, the language menu on this site (MDN) includes a **`lang`** attribute for each entry:

```html
<div class="dropdown-container language-menu">
  <button
    id="header-language-menu"
    type="button"
    class="dropdown-menu-label"
    aria-haspopup="true"
    aria-owns="language-menu"
    aria-label="Current language is English. Choose your preferred language.">
    English
    <span class="dropdown-arrow-down" aria-hidden="true">▼</span>
  </button>
  <ul
    id="language-menu"
    class="dropdown-menu-items right show"
    aria-expanded="true"
    role="menu">
    <li role="menuitem">
      <a
        href="/ca/docs/Web/HTML/Reference/Global_attributes/lang"
        title="Catalan">
        <bdi lang="ca">Català</bdi>
      </a>
    </li>
    <li role="menuitem">
      <a
        href="/de/docs/Web/HTML/Reference/Global_attributes/lang"
        title="German">
        <bdi lang="de">Deutsch</bdi>
      </a>
    </li>
    <li role="menuitem">
      <a
        href="/es/docs/Web/HTML/Reference/Global_attributes/lang"
        title="Spanish">
        <bdi lang="es">Español</bdi>
      </a>
    </li>
    <li role="menuitem">
      <a
        href="/fr/docs/Web/HTML/Reference/Global_attributes/lang"
        title="French">
        <bdi lang="fr">Français</bdi>
      </a>
    </li>
    <li role="menuitem">
      <a
        href="/ja/docs/Web/HTML/Reference/Global_attributes/lang"
        title="Japanese">
        <bdi lang="ja">日本語</bdi>
      </a>
    </li>
    <li role="menuitem">
      <a
        href="/ko/docs/Web/HTML/Reference/Global_attributes/lang"
        title="Korean">
        <bdi lang="ko">한국어</bdi>
      </a>
    </li>
    <li role="menuitem">
      <a
        href="/pt-BR/docs/Web/HTML/Reference/Global_attributes/lang"
        title="Portuguese (Brazilian)">
        <bdi lang="pt-BR">Português (do&nbsp;Brasil)</bdi>
      </a>
    </li>
    <li role="menuitem">
      <a
        href="/ru/docs/Web/HTML/Reference/Global_attributes/lang"
        title="Russian">
        <bdi lang="ru">Русский</bdi>
      </a>
    </li>
    <li role="menuitem">
      <a
        href="/uk/docs/Web/HTML/Reference/Global_attributes/lang"
        title="Ukrainian">
        <bdi lang="uk">Українська</bdi>
      </a>
    </li>
    <li role="menuitem">
      <a
        href="/zh-CN/docs/Web/HTML/Reference/Global_attributes/lang"
        title="Chinese (Simplified)">
        <bdi lang="zh-Hans">中文 (简体)</bdi>
      </a>
    </li>
    <li>
      <a
        href="/en-US/docs/Web/HTML/Reference/Global_attributes/lang"
        rel="nofollow"
        id="translations-add">
        Add a translation
      </a>
    </li>
  </ul>
</div>
```

## See also

- All global attributes.
- `Content-Language` HTTP Header
- HTML `translate` attribute
