---
title: "Browser Mode | Guide (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/browser/index.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Browser Mode {#browser-mode}

This page provides information about the browser mode feature in the Vitest API, which allows you to run your tests in the browser natively, providing access to browser globals like window and document.

**Tip:**
If you are looking for documentation for `expect`, `vi` or any general API like test projects or type testing, refer to the "Getting Started" guide.

## Installation

For easier setup, you can use `vitest init browser` command to install required dependencies and create browser configuration.

::: code-group

```bash
npx vitest init browser
```

```bash
yarn exec vitest init browser
```

```bash
pnpx vitest init browser
```

```bash
bunx vitest init browser
```

### Manual Installation

You can also install packages manually. Vitest always requires a provider to be defined. You can chose either `preview`, `playwright` or `webdriverio`.

If you want to just preview how your tests look, you can use the `preview` provider:

::: code-group

```bash
npm install -D vitest @vitest/browser-preview
```

```bash
yarn add -D vitest vite @vitest/browser-preview
```

```bash
pnpm add -D vitest @vitest/browser-preview
```

```bash
bun add -D vitest @vitest/browser-preview
```

**Warning:**
However, to run tests in CI you need to install either `playwright` or `webdriverio`. We also recommend switching to either one of them for testing locally instead of using the default `preview` provider since it relies on simulating events instead of using Chrome DevTools Protocol.

If you don't already use one of these tools, we recommend starting with Playwright because it supports parallel execution, which makes your tests run faster.

::: tabs key:<example-value>
== Playwright
Playwright is a framework for Web Testing and Automation.

::: code-group

```bash
npm install -D vitest @vitest/browser-playwright
```

```bash
yarn add -D vitest vite @vitest/browser-playwright
```

```bash
pnpm add -D vitest @vitest/browser-playwright
```

```bash
bun add -D vitest @vitest/browser-playwright
```

== WebdriverIO

WebdriverIO allows you to run tests locally using the WebDriver protocol.

::: code-group

```bash
npm install -D vitest @vitest/browser-webdriverio
```

```bash
yarn add -D vitest vite @vitest/browser-webdriverio
```

```bash
pnpm add -D vitest @vitest/browser-webdriverio
```

```bash
bun add -D vitest @vitest/browser-webdriverio
```

## Configuration

To activate browser mode in your Vitest configuration, set the `browser.enabled` field to `true` in your Vitest configuration file. Here is an example configuration using the browser field:

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      // at least one instance is required
      instances: [
        { browser: 'chromium' },
      ],
    },
  }
})
```

**Info:**
Vitest assigns port `23315` to avoid conflicts with the development server, allowing you to run both in parallel. You can change that with the `api` option. The port is bound when the first browser is launched, or on startup if `api` or `ui` is enabled.

If you have not used Vite before, make sure you have your framework's plugin installed and specified in the config. Some frameworks might require extra configuration to work - check their Vite related documentation to be sure.

::: code-group

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

```ts
import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [svelte()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

```ts
import { defineConfig } from 'vitest/config'
import solidPlugin from 'vite-plugin-solid'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

```ts
import { defineConfig } from 'vitest/config'
import marko from '@marko/vite'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [marko()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    }
  }
})
```

```ts
import { defineConfig } from 'vitest/config'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { playwright } from '@vitest/browser-playwright'

// optional, run the tests in SSR mode
import { testSSR } from 'vitest-browser-qwik/ssr-plugin'

export default defineConfig({
  plugins: [testSSR(), qwikVite()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }]
    },
  },
})
```

If you need to run some tests using Node-based runner, you can define a `projects` option with separate configurations for different testing strategies:

{#projects-config}

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          // an example of file based convention,
          // you don't have to follow it
          include: [
            'tests/unit/**/*.{test,spec}.ts',
            'tests/**/*.unit.{test,spec}.ts',
          ],
          name: 'unit',
          environment: 'node',
        },
      },
      {
        test: {
          // an example of file based convention,
          // you don't have to follow it
          include: [
            'tests/browser/**/*.{test,spec}.ts',
            'tests/**/*.browser.{test,spec}.ts',
          ],
          name: 'browser',
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [
              { browser: 'chromium' },
            ],
          },
        },
      },
    ],
  },
})
```

## Browser Option Types

The browser option in Vitest depends on the provider. Vitest will fail, if you pass `--browser` and don't specify its name in the config file. Available options:

- `webdriverio` supports these browsers:
  - `firefox`
  - `chrome`
  - `edge`
  - `safari`
- `playwright` supports these browsers:
  - `firefox`
  - `webkit`
  - `chromium`

## Browser Compatibility

Vitest uses Vite dev server to run your tests, so we only support features specified in the `esbuild.target` option (`esnext` by default).

By default, Vite targets browsers which support the native ES Modules, native ESM dynamic import, and `import.meta`. On top of that, we utilize `BroadcastChannel` to communicate between iframes and `WeakRef` with `FinalizationRegistry` to track mocks without preventing garbage collection:

- Chrome >=87
- Firefox >=79
- Safari >=15.4
- Edge >=88

## Running Tests

When you specify a browser name in the browser option, Vitest will try to run the specified browser using `preview` by default, and then run the tests there. If you don't want to use `preview`, you can configure the custom browser provider by using `browser.provider` option.

To specify a browser using the CLI, use the `--browser` flag followed by the browser name, like this:

```sh
npx vitest --browser=chromium
```

Or you can provide browser options to CLI with dot notation:

```sh
npx vitest --browser.headless
```

**Warning:**
Since Vitest 3.2, if you don't have the `browser` option in your config but specify the `--browser` flag, Vitest will fail because it can't assume that config is meant for the browser and not Node.js tests.

By default, Vitest will automatically open the browser UI for development. Your tests will run inside an iframe in the center. You can configure the viewport by selecting the preferred dimensions, calling `page.viewport` inside the test, or setting default values in the config.

For an alternative debugging model that captures DOM snapshots for every test instead of showing a live iframe, see Trace View.

## Headless

Headless mode is another option available in the browser mode. In headless mode, the browser runs in the background without a user interface, which makes it useful for running automated tests. The headless option in Vitest can be set to a boolean value to enable or disable headless mode.

When using headless mode, Vitest won't open the browser UI automatically. If you want to continue using a UI but have tests run headlessly, you can install the `@vitest/ui` package and pass the `--ui` flag when running Vitest. See Headless Mode and UI for what each option controls and how their defaults interact.

Here's an example configuration enabling headless mode:

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
    },
  }
})
```

You can also set headless mode using the `--browser.headless` flag in the CLI, like this:

```sh
npx vitest --browser.headless
```

In this case, Vitest will run in headless mode using the Chrome browser.

**Warning:**
Headless mode is not available by default. You need to use either `playwright` or `webdriverio` providers to enable this feature.

### Headless Mode and UI {#headless-mode-and-ui}

Three options decide what you see during a browser mode run:

- `browser.headless` controls whether the browser that runs the tests has a visible window.
- `browser.ui` controls whether the browser UI is rendered inside that browser, with the test iframe in the center.
- The top-level `--ui` flag controls whether Vitest UI is served by Vitest and opened in your default browser, separately from the browser that runs the tests.

`browser.headless` defaults to `true` in CI, and `browser.ui` defaults to `true` when the browser is headed and Vitest is not running in CI. The following table lists common setups:

| Goal                                        | Settings                  | Result                                                                                                 |
| ------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| Develop locally                             | defaults                  | The browser window shows the browser UI.                                                               |
| Watch tests in a plain browser window       | `--browser.ui=false`      | The browser window shows only the test iframe at its configured viewport size, without the browser UI. |
| Run in CI                                   | defaults                  | No window is shown, and results are reported in the terminal.                                          |
| Use Vitest UI with a headless browser       | `--ui --browser.headless` | Vitest UI shows the results, and tests run in a headless browser.                                      |
| Use Vitest UI with a visible browser window | `--ui --browser.ui=false` | Vitest UI shows the results, and tests run in a separate browser window without the browser UI.        |

Passing `--ui` alone keeps the browser UI in the headed browser window, so set `--browser.ui=false` to use only Vitest UI.
