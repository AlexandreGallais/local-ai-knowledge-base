---
title: "Browser Mode | Guide (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/browser/index.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Browser Mode | Guide (part 2 of 2)

## Examples

By default, you don't need any external packages to work with the Browser Mode:

```js
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from './my-render-function.js'

test('properly handles form inputs', async () => {
  render() // mount DOM elements

  // Asserts initial state.
  await expect.element(page.getByText('Hi, my name is Alice')).toBeInTheDocument()

  // Get the input DOM node by querying the associated label.
  const usernameInput = page.getByLabelText(/username/i)

  // Type the name into the input. This already validates that the input
  // is filled correctly, no need to check the value manually.
  await usernameInput.fill('Bob')

  await expect.element(page.getByText('Hi, my name is Bob')).toBeInTheDocument()
})
```

However, Vitest also provides packages to render components for several popular frameworks out of the box:

- `vitest-browser-vue` to render vue components
- `vitest-browser-svelte` to render svelte components
- `vitest-browser-react` to render react components
- `vitest-browser-angular` to render Angular components

Community packages are available for other frameworks:

- `vitest-browser-lit` to render lit components
- `vitest-browser-preact` to render preact components
- `vitest-browser-qwik` to render qwik components

If your framework is not represented, feel free to create your own package - it is a simple wrapper around the framework renderer and `page.elementLocator` API. We will add a link to it on this page. Make sure it has a name starting with `vitest-browser-`.

Besides rendering components and locating elements, you will also need to make assertions. Vitest forks the `@testing-library/jest-dom` library to provide a wide range of DOM assertions out of the box. Read more at the Assertions API.

```ts
import { expect } from 'vitest'
import { page } from 'vitest/browser'
// element is rendered correctly
await expect.element(page.getByText('Hello World')).toBeInTheDocument()
```

Vitest exposes a Context API with a small set of utilities that might be useful to you in tests. For example, if you need to make an interaction, like clicking an element or typing text into an input, you can use `userEvent` from `vitest/browser`. Read more at the Interactivity API.

```ts
import { page, userEvent } from 'vitest/browser'
await userEvent.fill(page.getByLabelText(/username/i), 'Alice')
// or just locator.fill
await page.getByLabelText(/username/i).fill('Alice')
```

::: code-group

```ts
import { render } from 'vitest-browser-vue'
import Component from './Component.vue'

test('properly handles v-model', async () => {
  const screen = await render(Component)

  // Asserts initial state.
  await expect.element(screen.getByText('Hi, my name is Alice')).toBeInTheDocument()

  // Get the input DOM node by querying the associated label.
  const usernameInput = screen.getByLabelText(/username/i)

  // Type the name into the input. This already validates that the input
  // is filled correctly, no need to check the value manually.
  await usernameInput.fill('Bob')

  await expect.element(screen.getByText('Hi, my name is Bob')).toBeInTheDocument()
})
```

```ts
import { render } from 'vitest-browser-svelte'
import { expect, test } from 'vitest'

import Greeter from './greeter.svelte'

test('greeting appears on click', async () => {
  const screen = await render(Greeter, { name: 'World' })

  const button = screen.getByRole('button')
  await button.click()
  const greeting = screen.getByText(/hello world/iu)

  await expect.element(greeting).toBeInTheDocument()
})
```

```tsx
import { render } from 'vitest-browser-react'
import Fetch from './fetch'

test('loads and displays greeting', async () => {
  // Render a React element into the DOM
  const screen = render(<Fetch url="/greeting" />)

  await screen.getByText('Load Greeting').click()
  // wait before throwing an error if it cannot find an element
  const heading = screen.getByRole('heading')

  // assert that the alert message is correct
  await expect.element(heading).toHaveTextContent('hello there')
  await expect.element(screen.getByRole('button')).toBeDisabled()
})
```

```ts
import { render } from 'vitest-browser-lit'
import { html } from 'lit'
import './greeter-button'

test('greeting appears on click', async () => {
  const screen = render(html`<greeter-button name="World"></greeter-button>`)

  const button = screen.getByRole('button')
  await button.click()
  const greeting = screen.getByText(/hello world/iu)

  await expect.element(greeting).toBeInTheDocument()
})
```

```tsx
import { render } from 'vitest-browser-preact'
import { createElement } from 'preact'
import Greeting from '.Greeting'

test('greeting appears on click', async () => {
  const screen = render(<Greeting />)

  const button = screen.getByRole('button')
  await button.click()
  const greeting = screen.getByText(/hello world/iu)

  await expect.element(greeting).toBeInTheDocument()
})
```

```tsx
import { render } from 'vitest-browser-qwik'
import Greeting from './greeting'

test('greeting appears on click', async () => {
  // renderSSR and renderHook are also available
  const screen = render(<Greeting />)

  const button = screen.getByRole('button')
  await button.click()
  const greeting = screen.getByText(/hello world/iu)

  await expect.element(greeting).toBeInTheDocument()
})
```

Vitest doesn't support all frameworks out of the box, but you can use external tools to run tests with these frameworks. We also encourage the community to create their own `vitest-browser` wrappers - if you have one, feel free to add it to the examples above.

For unsupported frameworks, we recommend using `testing-library` packages:

- `@solidjs/testing-library` to render solid components
- `@marko/testing-library` to render marko components

You can also see more examples in `browser-examples` repository.

**Warning:**
`testing-library` provides a package `@testing-library/user-event`. We do not recommend using it directly because it simulates events instead of actually triggering them - instead, use `userEvent` imported from `vitest/browser` that uses Chrome DevTools Protocol or Webdriver (depending on the provider) under the hood.

::: code-group

```tsx
// based on @testing-library/solid API
// https://testing-library.com/docs/solid-testing-library/api

import { render } from '@testing-library/solid'

it('uses params', async () => {
  const App = () => (
    <>
      <Route
        path="/ids/:id"
        component={() => (
          <p>
            Id:
            {useParams()?.id}
          </p>
        )}
      />
      <Route path="/" component={() => <p>Start</p>} />
    </>
  )
  const { baseElement } = render(() => <App />, { location: 'ids/1234' })
  const screen = page.elementLocator(baseElement)

  await expect.screen(screen.getByText('Id: 1234')).toBeInTheDocument()
})
```

```ts
// based on @testing-library/marko API
// https://testing-library.com/docs/marko-testing-library/api

import { render, screen } from '@marko/testing-library'
import Greeting from './greeting.marko'

test('renders a message', async () => {
  const { baseElement } = await render(Greeting, { name: 'Marko' })
  const screen = page.elementLocator(baseElement)
  await expect.element(screen.getByText(/Marko/)).toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h1>Hello, Marko!</h1>
  `)
})
```

## Limitations

### Thread Blocking Dialogs

When using Vitest Browser, it's important to note that thread blocking dialogs like `alert`, `confirm` or `print` cannot be used natively. This is because they block the web page, which means Vitest cannot continue communicating with the page, causing the execution to hang.

In such situations, Vitest provides default mocks with default returned values for these APIs. This ensures that if the user accidentally uses synchronous popup web APIs, the execution would not hang. However, it's still recommended for the user to mock these web APIs for a better experience. Read more in Mocking.

### Spying on Module Exports

Browser Mode uses the browser's native ESM support to serve modules. The module namespace object is sealed and can't be reconfigured, unlike in Node.js tests where Vitest can patch the Module Runner. This means you can't call `vi.spyOn` on an imported object:

```ts
import { vi } from 'vitest'
import * as module from './module.js'

vi.spyOn(module, 'method') // ❌ throws an error
```

To bypass this limitation, Vitest supports `{ spy: true }` option in `vi.mock('./module.js')`. This will automatically spy on every export in the module without replacing them with fake ones.

```ts
import { vi } from 'vitest'
import * as module from './module.js'

vi.mock('./module.js', { spy: true })

vi.mocked(module.method).mockImplementation(() => {
  // ...
})
```

However, the only way to mock exported _variables_ is to export a method that will change the internal value:

::: code-group

```js
export let MODE = 'test'
export function changeMode(newMode) {
  MODE = newMode
}
```

```js
import { expect } from 'vitest'
import { changeMode, MODE } from './module.js'

changeMode('production')
expect(MODE).toBe('production')
```
