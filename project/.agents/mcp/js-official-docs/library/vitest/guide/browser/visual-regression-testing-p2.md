---
title: "Visual Regression Testing (part 2 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/browser/visual-regression-testing.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Visual Regression Testing (part 2 of 4)

## Common issues and solutions

### False positives from font rendering

Font availability and rendering varies significantly between systems. Some possible solutions might be to:

- Use web fonts and wait for them to load:

  ```ts
  // wait for fonts to load
  await document.fonts.ready

  // continue with your tests
  ```

- Increase comparison threshold for text-heavy areas:

  ```ts
  await expect(
    page.getByRole('article', { name: 'How to grow tomatoes' })
  ).toMatchScreenshot({
    comparatorName: 'pixelmatch',
    comparatorOptions: {
      // 10% of the pixels are allowed to change
      allowedMismatchedPixelRatio: 0.1,
    },
  })
  ```

- Consider a shared environment setup for consistent font rendering.

### Flaky tests or different screenshot sizes

If tests pass and fail randomly, or if screenshots have different dimensions between runs:

- Wait for everything to load, including loading indicators
- Set explicit viewport sizes: `await page.viewport(1920, 1080)`
- Check for responsive behavior at viewport boundaries
- Check for unintended animations or transitions
- Increase test timeout for large screenshots
- Consider a shared environment setup
