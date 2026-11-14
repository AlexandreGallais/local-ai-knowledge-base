---
title: "Interactivity API | Browser Mode (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/browser/interactivity.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Interactivity API

Vitest implements a subset of `@testing-library/user-event` APIs using Chrome DevTools Protocol or webdriver instead of faking events which makes the browser behaviour more reliable and consistent with how users interact with a page.

```ts
import { userEvent } from 'vitest/browser'

await userEvent.click(document.querySelector('.button'))
```

Almost every `userEvent` method inherits its provider options.

## userEvent.setup

```ts
function setup(): UserEvent
```

Creates a new user event instance. This is useful if you need to keep the state of keyboard to press and release buttons correctly.

**Warning:**
Unlike `@testing-library/user-event`, the default `userEvent` instance from `vitest/browser` is created once, not every time its methods are called! You can see the difference in how it works in this snippet:

```ts
import { userEvent as vitestUserEvent } from 'vitest/browser'
import { userEvent as originalUserEvent } from '@testing-library/user-event'

await vitestUserEvent.keyboard('{Shift}') // press shift without releasing
await vitestUserEvent.keyboard('{/Shift}') // releases shift

await originalUserEvent.keyboard('{Shift}') // press shift without releasing
await originalUserEvent.keyboard('{/Shift}') // DID NOT release shift because the state is different
```

This behaviour is more useful because we do not emulate the keyboard, we actually press the Shift, so keeping the original behaviour would cause unexpected issues when typing in the field.

**Warning:**
With `playwright` and `webdriverio` providers, interactions are performed by the underlying browser driver. That means some interaction state, like pressed keys or pointer position and the resulting hover state, can persist between tests in the same file.

Vitest resets unreleased keyboard state automatically before starting each test case, but pointer position and the resulting hover state are not reset automatically since resetting pointer position can be expensive.

This applies both to `userEvent.*` calls and locator shortcuts like `locator.click()` or `locator.hover()`, because they use the same underlying interaction state.

If your tests depend on a neutral hover state, reset it explicitly, for example in `beforeEach`:

```ts
import { beforeEach } from 'vitest'
import { userEvent } from 'vitest/browser'

beforeEach(async () => {
  await userEvent.unhover(document.body)
})
```

## userEvent.click

```ts
function click(
  element: Element | Locator,
  options?: UserEventClickOptions,
): Promise<void>
```

Click on an element. Inherits provider's options. Please refer to your provider's documentation for detailed explanation about how this method works.

```ts
import { page, userEvent } from 'vitest/browser'

test('clicks on an element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })

  await userEvent.click(logo)
  // or you can access it directly on the locator
  await logo.click()

  // With WebdriverIO, this uses either ElementClick (with no arguments) or
  // actions (with arguments). Use an empty object to force the use of actions.
  await logo.click({})
})
```

### Clicking with a modifier

With either WebdriverIO or Playwright:

```ts
await userEvent.keyboard('{Shift>}')
// By using an empty object as the option, this opts in to using a chain of actions
// instead of an ElementClick in webdriver.
// Firefox has a bug that makes this necessary.
// Follow https://bugzilla.mozilla.org/show_bug.cgi?id=1456642 to know when this
// will be fixed.
await userEvent.click(element, {})
await userEvent.keyboard('{/Shift}')
```

With Playwright:

```ts
await userEvent.click(element, { modifiers: ['Shift'] })
```

References:

- Playwright `locator.click` API
- WebdriverIO `element.click` API
- testing-library `click` API

## userEvent.dblClick

```ts
function dblClick(
  element: Element | Locator,
  options?: UserEventDoubleClickOptions,
): Promise<void>
```

Triggers a double click event on an element.

Please refer to your provider's documentation for detailed explanation about how this method works.

```ts
import { page, userEvent } from 'vitest/browser'

test('triggers a double click on an element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })

  await userEvent.dblClick(logo)
  // or you can access it directly on the locator
  await logo.dblClick()
})
```

References:

- Playwright `locator.dblclick` API
- WebdriverIO `element.doubleClick` API
- testing-library `dblClick` API

## userEvent.tripleClick

```ts
function tripleClick(
  element: Element | Locator,
  options?: UserEventTripleClickOptions,
): Promise<void>
```

Triggers a triple click event on an element. Since there is no `tripleclick` in browser api, this method will fire three click events in a row, and so you must check click event detail to filter the event: `evt.detail === 3`.

Please refer to your provider's documentation for detailed explanation about how this method works.

```ts
import { page, userEvent } from 'vitest/browser'

test('triggers a triple click on an element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })
  let tripleClickFired = false
  logo.addEventListener('click', (evt) => {
    if (evt.detail === 3) {
      tripleClickFired = true
    }
  })

  await userEvent.tripleClick(logo)
  // or you can access it directly on the locator
  await logo.tripleClick()

  expect(tripleClickFired).toBe(true)
})
```

References:

- Playwright `locator.click` API: implemented via `click` with `clickCount: 3` .
- WebdriverIO `browser.action` API: implemented via actions api with `move` plus three `down + up + pause` events in a row
- testing-library `tripleClick` API

## userEvent.wheel <Version>4.1.0</Version> {#userevent-wheel}

```ts
function wheel(
  element: Element | Locator,
  options: UserEventWheelOptions,
): Promise<void>
```

Triggers a `wheel` event on an element.

You can specify the scroll amount using either `delta` for precise pixel-based control, or `direction` for simpler directional scrolling (`up`, `down`, `left`, `right`). When you need to trigger multiple wheel events, use the `times` option rather than calling the method multiple times for better performance.

```ts
import { page, userEvent } from 'vitest/browser'

test('scroll using delta values', async () => {
  const tablist = page.getByRole('tablist')

  // Scroll right by 100 pixels
  await userEvent.wheel(tablist, { delta: { x: 100 } })

  // Scroll down by 50 pixels
  await userEvent.wheel(tablist, { delta: { y: 50 } })

  // Scroll diagonally 2 times
  await userEvent.wheel(tablist, { delta: { x: 50, y: 100 }, times: 2 })
})

test('scroll using direction', async () => {
  const tablist = page.getByRole('tablist')

  // Scroll right 5 times
  await userEvent.wheel(tablist, { direction: 'right', times: 5 })

  // Scroll left once
  await userEvent.wheel(tablist, { direction: 'left' })
})
```

Wheel events can also be triggered directly from locators:

```ts
import { page } from 'vitest/browser'

await page.getByRole('tablist').wheel({ direction: 'right' })
```

**Warning:**
This method is intended for testing UI that explicitly listens to `wheel` events (e.g., custom zoom controls, horizontal tab scrolling, canvas interactions). If you need to scroll the page to bring an element into view, rely on the built-in automatic scrolling functionality provided by other `userEvent` methods or locator actions instead.

## userEvent.pointer <Version type="experimental">5.1.0</Version> <Experimental /> {#userevent-pointer}

```ts
function pointer(options: UserEventPointerInput): Promise<void>
```

Performs one or more pointer actions. Pass a key <example-value>, an action object, or an array of strings and objects. Key <example-value> use user-event `pointer` syntax. For example, `[MouseLeft]` presses and releases the left mouse button, `[MouseLeft>]` keeps it pressed, and `[/MouseLeft]` releases it.

**Tip:**
The `pointer` method is a low-level API for composing complex pointer interactions and performing actions that dedicated methods do not support, such as dragging an element to a precise position.

For one-off actions, prefer the equivalent dedicated method because in most cases they are simpler to use. For example, if you just want to click an element once, use `userEvent.click`.

An action object accepts `keys`, `target`, and `coords`. An object without `keys` only moves the pointer.

The pointer position persists between `userEvent.pointer` calls on the same `userEvent` instance. This means that if an action omits both `target` and `coords`, it uses the position from the previous action.

**Warning:**
When the Browser UI is enabled, the test iframe can be scaled to fit the available space. Vitest adjusts pointer coordinates to account for the scaling, but browser pixel rounding can cause the resulting event coordinates to differ by several _iframe pixels_. **Avoid relying on exact coordinates in this mode**.

```ts
import { page, userEvent } from 'vitest/browser'

test('drags an element with pointer actions', async () => {
  const source = page.getByTestId('source')
  const target = page.getByTestId('target')

  await userEvent.pointer([
    { target: source, keys: '[MouseLeft>]' },
    { target, coords: { x: 10, y: 10 }, keys: '[/MouseLeft]' },
  ])
})
```

**Provider support and differences from user-event**
This API is not consistently supported across providers, and its behavior can differ from the `user-event` library.

- The `playwright` provider does not support touch pointer keys such as `TouchA`.
- The `webdriverio` provider does not support this method at all.
- The `preview` provider simulates events using `@testing-library/user-event`.

Vitest does not support the `node` and `offset` fields used for text selection and only accepts `x` and `y` values in `coords`.

Without `target`, `coords` values are considered coordinates relative to the viewport. With `target`, they are offsets from its top-left corner. Unlike user-event, where coordinates paired with a target describe the final pointer position rather than an offset. When `coords` is provided, an omitted axis defaults to `0`.

References:

- testing-library `pointer` API

## userEvent.fill

```ts
function fill(
  element: Element | Locator,
  text: string,
): Promise<void>
```

Set a value to the `input`/`textarea`/`contenteditable` field. This will remove any existing text in the input before setting the new value.

```ts
import { page, userEvent } from 'vitest/browser'

test('update input', async () => {
  const input = page.getByRole('input')

  await userEvent.fill(input, 'foo') // input.value == foo
  await userEvent.fill(input, '{{a[[') // input.value == {{a[[
  await userEvent.fill(input, '{Shift}') // input.value == {Shift}

  // or you can access it directly on the locator
  await input.fill('foo') // input.value == foo
})
```

This methods focuses the element, fills it and triggers an `input` event after filling. You can use an empty string to clear the field.

**Tip:**
This API is faster than using `userEvent.type` or `userEvent.keyboard`, but it **doesn't support** user-event `keyboard` syntax (e.g., `{Shift}{selectall}`).

We recommend using this API over `userEvent.type` in situations when you don't need to enter special characters or have granular control over keypress events.

References:

- Playwright `locator.fill` API
- WebdriverIO `element.setValue` API
- testing-library `type` API

## userEvent.keyboard

```ts
function keyboard(text: string): Promise<void>
```

The `userEvent.keyboard` allows you to trigger keyboard strokes. If any input has a focus, it will type characters into that input. Otherwise, it will trigger keyboard events on the currently focused element (`document.body` if there are no focused elements).

This API supports user-event `keyboard` syntax. Common special keys that can be referenced inside the braces include:

- **Modifiers:** `{Shift}`, `{Control}`, `{Alt}`, `{Meta}`
- **Navigation:** `{ArrowUp}`, `{ArrowDown}`, `{ArrowLeft}`, `{ArrowRight}`, `{Home}`, `{End}`, `{PageUp}`, `{PageDown}`
- **Editing:** `{Backspace}`, `{Delete}`, `{Insert}`, `{Tab}`, `{Enter}`, `{Escape}`
- **Function keys:** `{F1}` through `{F12}`

Note: The exact set of supported keys may vary depending on the underlying browser provider (Playwright vs WebdriverIO). If a key press doesn't trigger the expected behavior, consult your provider's documentation or file an issue.

```ts
import { userEvent } from 'vitest/browser'

test('trigger keystrokes', async () => {
  await userEvent.keyboard('foo') // translates to: f, o, o
  await userEvent.keyboard('{{a[[') // translates to: {, a, [
  await userEvent.keyboard('{Shift}{f}{o}{o}') // translates to: Shift, f, o, o
  await userEvent.keyboard('{a>5}') // press a without releasing it and trigger 5 keydown
  await userEvent.keyboard('{a>5/}') // press a for 5 keydown and then release it
})
```

References:

- Playwright `Keyboard` API
- WebdriverIO `action('key')` API
- testing-library `type` API

## userEvent.tab

```ts
function tab(options?: UserEventTabOptions): Promise<void>
```

Sends a `Tab` key event. This is a shorthand for `userEvent.keyboard('{tab}')`.

```ts
import { page, userEvent } from 'vitest/browser'

test('tab works', async () => {
  const [input1, input2] = page.getByRole('input').elements()

  expect(input1).toHaveFocus()

  await userEvent.tab()

  expect(input2).toHaveFocus()

  await userEvent.tab({ shift: true })

  expect(input1).toHaveFocus()
})
```

References:

- Playwright `Keyboard` API
- WebdriverIO `action('key')` API
- testing-library `tab` API

## userEvent.type

```ts
function type(
  element: Element | Locator,
  text: string,
  options?: UserEventTypeOptions,
): Promise<void>
```

**Warning:**
If you don't rely on special characters (e.g., `{shift}` or `{selectall}`), it is recommended to use `userEvent.fill` instead for better performance.

The `type` method implements `@testing-library/user-event`'s `type` utility built on top of `keyboard` API.

This function allows you to type characters into an `input`/`textarea`/`contenteditable` element. It supports user-event `keyboard` syntax.

If you just need to press characters without an input, use `userEvent.keyboard` API.

```ts
import { page, userEvent } from 'vitest/browser'

test('update input', async () => {
  const input = page.getByRole('input')

  await userEvent.type(input, 'foo') // input.value == foo
  await userEvent.type(input, '{{a[[') // input.value == foo{a[
  await userEvent.type(input, '{Shift}') // input.value == foo{a[
})
```

**Info:**
Vitest doesn't expose `.type` method on the locator like `input.type` because it exists only for compatibility with the `userEvent` library. Consider using `.fill` instead as it is faster.

References:

- Playwright `locator.press` API
- WebdriverIO `action('key')` API
- testing-library `type` API
