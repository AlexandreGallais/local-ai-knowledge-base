---
title: "jsonc/vue-custom-block/no-parsing-error"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/vue-custom-block/no-parsing-error.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/vue-custom-block/no-parsing-error

> disallow parsing errors in Vue custom blocks

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.

## :book: Rule Details

This rule reports JSON parsing errors in Vue custom blocks.

<eslint-code-block parser="vue-eslint-parser" file-name="sample.vue" language="html">

```vue
<i18n>
{ "foo": }
</i18n>

<my-block lang="json">
{ "foo": }
</my-block>

<script>
/* eslint jsonc/vue-custom-block/no-parsing-error: 'error' */
</script>
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.8.0

## :mag: Implementation

- Rule source
- Test source
