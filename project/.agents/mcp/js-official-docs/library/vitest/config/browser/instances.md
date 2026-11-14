---
title: "browser.instances | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/browser/instances.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# browser.instances

- **Type:** `BrowserConfig`
- **Default:** `[]`

Defines multiple browser setups. Every config has to have at least a `browser` field.

You can specify most of the project options (not marked with a <CRoot /> icon) and some of the `browser` options like `browser.testerHtmlPath`.

**Warning:**
Every browser config inherits options from the root config:

```ts
export default defineConfig({
  test: {
    setupFile: ['./root-setup-file.js'],
    browser: {
      enabled: true,
      testerHtmlPath: './custom-path.html',
      instances: [
        {
          // will have both setup files: "root" and "browser"
          setupFile: ['./browser-setup-file.js'],
          // implicitly has "testerHtmlPath" from the root config // [!code warning]
          // testerHtmlPath: './custom-path.html', // [!code warning]
        },
      ],
    },
  },
})
```

For more examples, refer to the "Multiple Setups" guide.

The `globalSetup` files of the config that defines `instances` run once for all of them, not once per instance, and receive the project of that config. Values they provide with `project.provide` are available in every instance. Global setup files defined in an instance run only for that instance.

List of available `browser` options:

- `browser` (the name of the browser)
- `headless`
- `locators`
- `viewport`
- `testerHtmlPath`
- `screenshotDirectory`
- `screenshotFailures`
- `provider`

Under the hood, Vitest transforms these instances into separate test projects sharing a single Vite server for better caching performance.
