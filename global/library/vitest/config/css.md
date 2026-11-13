---
title: "css | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/css.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# css

- **Type:** `boolean | { include?, exclude?, modules? }`

Configure if CSS should be processed. When excluded, CSS files will be replaced with empty strings to bypass the subsequent processing. CSS Modules will return a proxy to not affect runtime.

**Warning:**
This option is not applied to browser tests.

## css.include

- **Type:** `RegExp | RegExp[]`
- **Default:** `[]`

RegExp pattern for files that should return actual CSS and will be processed by Vite pipeline.

**Tip:**
To process all CSS files, use `/.+/`.

## css.exclude

- **Type:** `RegExp | RegExp[]`
- **Default:** `[]`

RegExp pattern for files that will return an empty CSS file.

## css.modules

- **Type:** `{ classNameStrategy? }`
- **Default:** `{}`

### css.modules.classNameStrategy

- **Type:** `'stable' | 'scoped' | 'non-scoped'`
- **Default:** `'stable'`

If you decide to process CSS files, you can configure if class names inside CSS modules should be scoped. You can choose one of the options:

- `stable`: class names will be generated as `_${name}_${hashedFilename}`, which means that generated class will stay the same, if CSS content is changed, but will change, if the name of the file is modified, or file is moved to another folder. This setting is useful, if you use snapshot feature.
- `scoped`: class names will be generated as usual, respecting `css.modules.generateScopedName` method, if you have one and CSS processing is enabled. By default, filename will be generated as `_${name}_${hash}`, where hash includes filename and content of the file.
- `non-scoped`: class names will not be hashed.

**Warning:**
By default, Vitest exports a proxy, bypassing CSS Modules processing. If you rely on CSS properties on your classes, you have to enable CSS processing using `include` option.
