---
title: "Visual Regression Testing (part 1 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/browser/visual-regression-testing.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Visual Regression Testing

Vitest can run visual regression tests out of the box. It captures screenshots of your UI components and pages, then compares them against reference images to detect unintended visual changes.

Unlike functional tests that verify behavior, visual tests catch styling issues, layout shifts, and rendering problems that might otherwise go unnoticed without thorough manual testing.

## Why visual regression testing?

Visual bugs don’t throw errors, they just look wrong. That’s where visual testing comes in.

- That button still submits the form... but why is it hot pink now?
- The text fits perfectly... until someone views it on mobile
- Everything works great... except those two containers are outside the viewport
- That careful CSS refactor works... but broke the layout on a page no one tests

Visual regression testing acts as a safety net for your UI, automatically catching these visual changes before they reach production.

## Example

Visual regression testing in Vitest can be done through the `toMatchScreenshot` assertion:

```ts
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'

test('button renders in default state', async () => {
  // render your component

  // capture and compare screenshot
  await expect(page.getByRole('button')).toMatchScreenshot()
})
```

## Getting started

**Tip:**
**Visual regression tests are most reliable when run in a standardized and tightly controlled environment**. This is also why Docker containers, CI-only visual testing workflows, or cloud services are strongly recommended.

### Environmental stability

Visual regression tests are **sensitive to environmental differences** because rendering is not perfectly deterministic across environments and depends on multiple factors:

- GPU, drivers, and hardware acceleration
- Operating System
- Font rendering pipelines
- Browser, browser versions, and settings
- Whether the browser is running headless or headed
- Screen scaling, color profiles, and display settings
- ...and occasionally what feels like the phase of the moon <MoonPhase />

In practice, even seemingly identical environments can occasionally produce subtle rendering differences.

### Not a replacement for behavior testing

When a visual test fails alongside behavior tests, it's harder to tell what's actually broken or why. Visual failures are also expected during intentional UI work, but a failing unit test usually is not. Keeping them separate means each suite can fail loudly for the right reasons.

It's worth calling out that **`toMatchScreenshot` is not a substitute for proper assertions**.

A test that renders a button and just takes a screenshot is just documenting the current state. There's no way to tell from a screenshot whether users can interact with the button. **Visual tests work best as a complementary layer on top of behavior tests, not a replacement for them**.

Put another way, **visual testing doesn't tell you why something renders the way it does**. It just tells you that something rendered a certain way, or a different way than it did last time.

For example, take a business requirement to sort recent purchases in a table by purchase date. If you're looking only at the visual regression tests, you might notice that the same items from the last test are in a different order. This could be because you just introduced the sorting or because the sorting is broken. Either way, you don't know why the order is different just by looking at the UI. Someone could dismiss the visual diff as noise because the table "looks the same", even though the ordering logic is now broken. Now you have a broken business requirement in production.

### Project structure

Separating your visual suite from other tests gives you cleaner failure signals and a more deliberate update workflow. The recommended setup uses projects with a `[name].vrt.test.[ext]` naming convention to keep them distinct, and runs them in headless mode for consistency. As the browser instance might have a different default size, it also sets a specific viewport size.

```ts
import { defaultExclude, defineConfig } from 'vitest/config'

const vrtPattern = '**/*.vrt.test.[tj]s?(x)'

export default defineConfig({
  test: {
    // ...other configurations
    projects: [
      {
        test: {
          name: 'unit',
          exclude: [vrtPattern, ...defaultExclude],
        },
      },
      {
        test: {
          name: 'vrt',
          browser: {
            headless: true,
            instances: [
              {
                browser: '[browser-name]',
                viewport: { width: 1280, height: 720 },
              },
            ],
          },
          include: [vrtPattern],
        },
      },
    ],
  },
})
```

With this configuration in place, add scripts to launch each project separately:

```json
{
  "scripts": {
    "test:unit": "vitest --project unit",
    "test:visual": "vitest --project vrt"
  }
}
```

### Creating references

When you run a visual test for the first time, Vitest creates a reference (also called baseline) screenshot and fails the test with the following error message:

```
expect(element).toMatchScreenshot()

No existing reference screenshot found; a new one was created. Review it before running tests again.

Reference screenshot:
  tests/__screenshots__/button.vrt.test.ts/button-default-state-chromium-darwin.png
```

This is normal. Check that the screenshot looks right, then run the test again. Vitest will now compare future runs against this baseline.

**Tip:**
Reference screenshots live in `__screenshots__` folders next to your tests. **Commit them to your repository.**

### Screenshot organization

By default, screenshots are organized as:

```
.
├── __screenshots__
│   └── test-file.vrt.test.ts
│       ├── test-name-chromium-darwin.png
│       ├── test-name-firefox-linux.png
│       └── test-name-webkit-win32.png
└── test-file.vrt.test.ts
```

The naming convention includes:

- **Test name**: either the first argument of the `toMatchScreenshot()` call, or automatically generated from the test's name.
- **Browser name**: depends on the configured browser provider, for example `chrome`, `chromium`, `firefox` or `webkit`.
- **Platform**: `aix`, `darwin`, `freebsd`, `linux`, `openbsd`, `sunos`, or `win32`.

This ensures screenshots from different environments don't overwrite each other.

### Updating references

When you intentionally change your UI, you'll need to update the reference screenshots just as you would update snapshots:

```bash
$ vitest --project vrt --update
```

Review updated screenshots before committing to make sure changes are intentional.

**Stale screenshots**
Note that **screenshots for deleted or renamed tests aren't removed automatically**. Clean up the `__screenshots__` folder manually when you remove or rename tests, otherwise stale references will accumulate over time.

### Debugging failed tests

When a visual test fails, Vitest provides three images to help debug:

1. **Reference screenshot**: the expected baseline image
2. **Actual screenshot**: what was captured during the test
3. **Diff image**: highlights the differences; only generated when the screenshots have the same dimensions (behavior may vary with custom matchers)

You'll see something like this in the CLI output:

```
expect(element).toMatchScreenshot()

Screenshot does not match the stored reference.
245 pixels (ratio 0.03) differ.

Reference screenshot:
  tests/__screenshots__/button.vrt.test.ts/button-chromium-darwin.png

Actual screenshot:
  tests/.vitest/attachments/button.vrt.test.ts/button-chromium-darwin-actual.png

Diff image:
  tests/.vitest/attachments/button.vrt.test.ts/button-chromium-darwin-diff.png
```

While in UI mode, Vitest shows a tabbed diff view with an A/B slider as shown below.

An example of the visual regression diff UI, showing the "Diff", "Reference", "Actual", and "Slider" tabs, and how the slider reveals unexpected visual changes in a component.

#### Understanding the diff image

- **Red pixels** are areas that differ between reference and actual
- **Yellow pixels** are anti-aliasing differences (when anti-alias is not ignored)
- **Transparent/original** are unchanged areas

**Tip:**
If the diff is mostly red, something's really wrong. If it's speckled with a few red pixels around text, you probably just need to bump your threshold.

## Configuring the `toMatchScreenshot` assertion

It's possible to configure the `toMatchScreenshot` assertion either globally, by changing its default options, or on a per-test basis.

To change the defaults, you have to change the Vitest config:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            // 0-1, how different can colors be?
            threshold: 0.2,
            // 1% of pixels can differ
            allowedMismatchedPixelRatio: 0.01,
          },
        },
      },
    },
  },
})
```

For more fine-grained control, override global settings in specific tests by passing options directly to the assertion:

```ts
await expect(element).toMatchScreenshot('button', {
  comparatorName: 'pixelmatch',
  comparatorOptions: {
    // more lax comparison for text-heavy elements
    allowedMismatchedPixelRatio: 0.1,
  },
})
```

## Third-party comparators

Vitest ships with `pixelmatch` as its built-in comparator. It's fast, compares images pixel-by-pixel, has no native dependencies, and handles the majority of cases well. Perceptual comparators aren't included by default because they bring heavier dependencies and there's no clear single "best one" to pick as different algorithms make different trade-offs, but the comparator API exists precisely to let you plug in whatever fits your needs. This decision may change as the ecosystem matures, though.

For use cases where pixel-level diffing produces excessive noise, a perceptual or structural similarity comparator may be a better fit. These compare images more like a human would, tolerating minor rendering differences while still detecting meaningful visual changes.

There are many algorithms, so these are a useful starting point:

- `@blazediff/ssim`, SSIM (Structural Similarity Index) implementations for perceptual image quality assessment. It offers standard SSIM, MS-SSIM (Multi-Scale SSIM), and Hitchhiker’s SSIM for various use cases
- `@blazediff/gmsd`, a single-threaded GMSD (Gradient Magnitude Similarity Deviation) metric for perceptual image quality assessment, good for CI environments

To use one, install and register it:

```ts
import ssim from '@blazediff/ssim/ssim'
import type { SsimOptionsExtended } from '@blazediff/ssim/ssim'
import { defineConfig } from 'vitest/config'

declare module 'vitest/browser' {
  interface ScreenshotComparatorRegistry {
    'standard-ssim': SsimOptionsExtended & {
      threshold?: number
    }
  }
}

export default defineConfig({
  test: {
    browser: {
      expect: {
        toMatchScreenshot: {
          comparators: {
            // naive implementation, always check the library's docs
            'standard-ssim': (
              reference,
              actual,
              { createDiff, ...options }
            ) => {
              const diffBuffer = createDiff
                ? new Uint8Array(reference.data.length)
                : undefined

              const output = ssim(
                reference.data,
                actual.data,
                diffBuffer,
                reference.metadata.width,
                reference.metadata.height,
                options,
              )

              const pass = <example-value> >= (options.threshold ?? 0.95)

              return {
                pass,
                diff: diffBuffer ?? null,
                message: pass ? null : `SSIM score: ${output}.`,
              }
            },
          },
        },
      },
    },
  },
})
```

Once registered, the comparator can be referenced by name in your config or on a per-test basis:

:::code-group

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      expect: {
        toMatchScreenshot: {
          comparatorName: 'standard-ssim',
        },
      },
    },
  },
})
```

```ts
await expect(button).toMatchScreenshot('button', {
  comparatorName: 'standard-ssim',
})
```

## Best practices

### Test specific elements

Unless you explicitly want to test the whole page, prefer capturing specific components to reduce false positives:

```ts
// ❌ Captures entire page; prone to unrelated changes
await expect(page).toMatchScreenshot()

// ✅ Captures only the component under test
await expect(
  page.getByRole('article', { name: 'Tote bag' })
).toMatchScreenshot()
```

### Handle dynamic content

Dynamic content like timestamps, user data, or random values will cause tests to fail. Either mock the underlying data sources or mask them using the `mask` option in `screenshotOptions` when using the Playwright provider.

```ts
const profile = page.getByRole(
  'article',
  { name: 'Gracie\'s profile' },
)

await expect(profile).toMatchScreenshot({
  screenshotOptions: {
    mask: [profile.getByRole('status')],
  },
})
```

### Disable animations

**Tip:**
When using the Playwright provider, animations are automatically disabled when using the built-in assertion: the `animations` option's value in `screenshotOptions` is set to `"disabled"` by default.

If you prefer to disable all animations to save some execution time, continue reading.

Animations can cause flaky tests. Disable them during testing by injecting a custom CSS snippet using `setupFiles` or directly in your tests:

```ts
const stylesheet = document.createElement('style')

stylesheet.textContent = /* css */`
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
`

document.head.appendChild(stylesheet)
```

Alternatively, you can declare the CSS in a custom HTML template by using `browser.testerHtmlPath`.

### Set appropriate thresholds

Tuning thresholds is tricky. It depends on the content, test environment, what's acceptable for your app, and might also change based on the test.

Vitest does not define a default tolerance for mismatched pixels. The appropriate value depends on your application and environment. The recommendation is to use `allowedMismatchedPixelRatio`, so that the threshold is computed on the size of the screenshot and not a fixed number.

When setting both `allowedMismatchedPixelRatio` and `allowedMismatchedPixels`, Vitest uses whichever limit is stricter.

### Use Git LFS

Store reference screenshots in Git LFS if you plan to have a large test suite.
