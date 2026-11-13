---
title: "Component testing (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-components-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Component testing (part 2 of 2)

## Migration from the experimental packages

The experimental packages compiled JSX in the test file and marshalled it into the browser. The gallery pattern moves the scenario into a story export that runs natively in the browser. Here is how the concepts map:

| `@playwright/experimental-ct-*` | Story gallery |
|---|---|
| `mount()` | Stateful story: the story provides `onClick` and records the effect into a hidden input; the test asserts with `toHaveValue()` |
| Plain data props from the test | Unchanged in spirit: `mount(id, props)` |
| JSX children / slots from the test | One story export per composition (Vue: a `.story.vue` file for slot-heavy scenarios) |
| `component.update()` | `component.update({ count: 2 })` |
| `component.unmount()` | `component.unmount()` |
| `beforeMount` / `afterMount` hooks | The body of the gallery's `window.mount` (global), or story decorators (per-story) |
| `hooksConfig` per-test variation | Props: `mount('App/Routing', { route: '/dashboard' })`, interpreted by the story |
| `router` fixture / MSW handlers in Node.js | [`method: Page.route`] in the test, or MSW `setupWorker` inside a story |
| `playwright/index.html` (styles, theme) | The gallery's `index.html` and entry module imports |
| `ctViteConfig`, `ctPort`, `ctTemplateDir` | Gone — the gallery runs through your own dev server; the port lives in `webServer` and `baseURL` |
| `defineConfig` from the ct package | Plain `defineConfig` from `@playwright/test` |

A typical spec migrates like this:

```js
import { test, expect } from '@playwright/experimental-ct-react';
import Button from '../src/components/Button';

test('counts clicks', async ({ mount }) => {
  let clicks = 0;
  const component = await mount(<Button title='Submit' onClick={() => ++clicks} />);
  await component.getByRole('button').click();
  expect(clicks).toBe(1);
});
```

```js
import { useState } from 'react';
import { Button } from './Button';

export const CountsClicks = () => {
  const [clicks, setClicks] = useState(0);
  return <>
    <Button title='Submit' onClick={() => setClicks(count => count + 1)} />
    <form hidden><input data-testid='click-count' readOnly value={String(clicks)} /></form>
  </>;
};
```

```js
import { test, expect } from '@playwright/test';

test('counts clicks', async ({ mount }) => {
  const component = await mount('components/Button/CountsClicks');
  await component.getByRole('button').click();
  await expect(component.getByTestId('click-count')).toHaveValue('1');
});
```

Migrate incrementally: while pinned to Playwright 1.62, set up the gallery and the `components` project alongside the old CT project, port spec by spec, then drop the `@playwright/experimental-ct-*` dependency along with `playwright/index.html`, `playwright/index.ts` and `playwright/.cache` and upgrade.

Things to watch for:

- **Story ids are strings.** Renaming or moving a story breaks specs at runtime, not compile time. Using `mount<typeof Story>` at least ties the props to the story at compile time.
- **Per-test JSX is gone.** A test that built a different JSX tree per test becomes one story export per composition — which is the point: every composition worth testing is worth naming and reviewing.

## Frequently asked questions

### How do I access the component's methods or its instance?

Accessing a component's internal methods or its instance within test code is neither recommended nor supported. Instead, focus on observing and interacting with the component from a user's perspective — click it, look at the page, and record internal effects into the DOM through the story. Tests become less fragile and more valuable when they avoid implementation details. If a test fails when run from a user's perspective, it likely means the automated test has uncovered a genuine bug.

### Can I keep using my bundler plugins, aliases and CSS setup?

Yes — that is the core of the design. The gallery is served by your own dev server, so whatever your app can render, your stories can render. There is no second bundler config to keep in sync.

### What about frameworks other than React and Vue?

Ask your coding agent to implement the gallery contract for your framework: resolve a story id to a component, render it into `#root`, reuse the root across calls so `update()` preserves state. The `mount` fixture does not know or care which framework is on the other side.
