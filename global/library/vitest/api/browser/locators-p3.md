---
title: "Locators | Browser Mode (part 3 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/browser/locators.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Locators | Browser Mode (part 3 of 4)

## Methods

All methods are asynchronous and must be awaited. Since Vitest 3, tests will fail if a method is not awaited.

**Tip:**
If fake timers are enabled, these methods advance them while they run. See Automatic Advancing for details.

### click

```ts
function click(options?: UserEventClickOptions): Promise<void>
```

Click on an element. You can use the options to set the cursor position.

```ts
import { page } from 'vitest/browser'

await page.getByRole('img', { name: 'Rose' }).click()
```

- See more at `userEvent.click`

### dblClick

```ts
function dblClick(options?: UserEventDoubleClickOptions): Promise<void>
```

Triggers a double click event on an element. You can use the options to set the cursor position.

```ts
import { page } from 'vitest/browser'

await page.getByRole('img', { name: 'Rose' }).dblClick()
```

- See more at `userEvent.dblClick`

### tripleClick

```ts
function tripleClick(options?: UserEventTripleClickOptions): Promise<void>
```

Triggers a triple click event on an element. Since there is no `tripleclick` in browser api, this method will fire three click events in a row.

```ts
import { page } from 'vitest/browser'

await page.getByRole('img', { name: 'Rose' }).tripleClick()
```

- See more at `userEvent.tripleClick`

### wheel <Version>4.1.0</Version> {#wheel}

```ts
function wheel(options: UserEventWheelOptions): Promise<void>
```

Triggers a `wheel` event on an element. You can use the options to choose a general scroll `direction` or a precise `delta` value.

```ts
import { page } from 'vitest/browser'

// Scroll right
await page.getByRole('tablist').wheel({ direction: 'right' })
```

- See more at `userEvent.wheel`

### clear

```ts
function clear(options?: UserEventClearOptions): Promise<void>
```

Clears the input element content.

```ts
import { page } from 'vitest/browser'

await page.getByRole('textbox', { name: 'Full Name' }).clear()
```

- See more at `userEvent.clear`

### hover

```ts
function hover(options?: UserEventHoverOptions): Promise<void>
```

Moves the cursor position to the selected element.

```ts
import { page } from 'vitest/browser'

await page.getByRole('img', { name: 'Rose' }).hover()
```

- See more at `userEvent.hover`

### unhover

```ts
function unhover(options?: UserEventHoverOptions): Promise<void>
```

This works the same as `locator.hover`, but moves the cursor to the `document.body` element instead.

```ts
import { page } from 'vitest/browser'

await page.getByRole('img', { name: 'Rose' }).unhover()
```

- See more at `userEvent.unhover`

### fill

```ts
function fill(text: string, options?: UserEventFillOptions): Promise<void>
```

Sets the value of the current `input`, `textarea` or `contenteditable` element.

```ts
import { page } from 'vitest/browser'

await page.getByRole('input', { name: 'Full Name' }).fill('Mr. Bean')
```

- See more at `userEvent.fill`

### dropTo

```ts
function dropTo(
  target: Locator,
  options?: UserEventDragAndDropOptions,
): Promise<void>
```

Drags the current element to the target location.

```ts
import { page } from 'vitest/browser'

const paris = page.getByText('Paris')
const france = page.getByText('France')

await paris.dropTo(france)
```

- See more at `userEvent.dragAndDrop`

### selectOptions

```ts
function selectOptions(
  values:
    | HTMLElement
    | HTMLElement[]
    | Locator
    | Locator[]
    | string
    | string[],
  options?: UserEventSelectOptions,
): Promise<void>
```

Choose one or more values from a `<select>` element.

```ts
import { page } from 'vitest/browser'

const languages = page.getByRole('select', { name: 'Languages' })

await languages.selectOptions('EN')
await languages.selectOptions(['ES', 'FR'])
await languages.selectOptions([
  languages.getByRole('option', { name: 'Spanish' }),
  languages.getByRole('option', { name: 'French' }),
])
```

- See more at `userEvent.selectOptions`

### screenshot

```ts
function screenshot(options: LocatorScreenshotOptions & { save: false }): Promise<string>
function screenshot(options: LocatorScreenshotOptions & { base64: true }): Promise<{
  path: string
  base64: string
}>
function screenshot(options?: LocatorScreenshotOptions & { base64?: false }): Promise<string>
```

Creates a screenshot of the element matching the locator's selector.

You can specify the save location for the screenshot using the `path` option, which is relative to the current test file. If the `path` option is not set, Vitest will default to using `browser.screenshotDirectory` (`__screenshot__` by default), along with the names of the file and the test to determine the screenshot's filepath.

If you also need the content of the screenshot, you can specify `base64: true` to return it alongside the filepath where the screenshot is saved.

```ts
import { page } from 'vitest/browser'

const button = page.getByRole('button', { name: 'Click Me!' })

const path = await button.screenshot()

const { path, base64 } = await button.screenshot({
  path: './button-click-me.png',
  base64: true, // also return base64 string
})
// path - fullpath to the screenshot
// bas64 - base64 encoded string of the screenshot
```

**WARNING <Version>3.2.0</Version>**
Note that `screenshot` will always return a base64 string if `save` is set to `false`.
The `path` is also ignored in that case.

### mark

```ts
function mark(name: string, options?: { stack?: string; kind?: BrowserTraceEntryKind }): Promise<void>
```

Adds a named marker to the trace timeline and uses the current locator as marker context.

Pass `options.stack` to override the callsite location in trace metadata. This is useful for wrapper libraries that need to preserve the end-user source location.

Pass `options.kind` to categorize your marker as specific type, for example as `'action'`.

```ts
import { page } from 'vitest/browser'

const submitButton = page.getByRole('button', { name: 'Submit' })

await submitButton.mark('before submit')
await submitButton.click()
await submitButton.mark('after submit')
```

**Tip:**
This method is useful only when `browser.trace` is enabled.

### query

```ts
function query(): Element | null
```

This method returns a single element matching the locator's selector or `null` if no element is found.

If multiple elements match the selector, this method will throw an error. Use `.elements()` when you need all matching DOM Elements or `.all()` if you need an array of locators matching the selector.

**Danger:**
This is an escape hatch for external APIs that do not support locators. Prefer using locator methods instead.

Consider the following DOM structure:

```html
<div>Hello <span>World</span></div>
<div>Hello</div>
```

These locators will not throw an error:

```ts
page.getByText('Hello World').query() // ✅ HTMLDivElement
page.getByText('Hello Germany').query() // ✅ null
page.getByText('World').query() // ✅ HTMLSpanElement
page.getByText('Hello', { exact: true }).query() // ✅ HTMLSpanElement
```

These locators will throw an error:

```ts
// returns multiple elements
page.getByText('Hello').query() // ❌
page.getByText(/^Hello/).query() // ❌
```

### element

```ts
function element(): Element
```

This method returns a single element matching the locator's selector.

If _no element_ matches the selector, an error is thrown. Consider using `.query()` when you just need to check if the element exists.

If _multiple elements_ match the selector, an error is thrown. Use `.elements()` when you need all matching DOM Elements or `.all()` if you need an array of locators matching the selector.

**Danger:**
This is an escape hatch for external APIs that do not support locators. Prefer using locator methods instead.

It is called automatically when locator is used with `expect.element` every time the assertion is retried:

```ts
await expect.element(page.getByRole('button')).toBeDisabled()
```

Consider the following DOM structure:

```html
<div>Hello <span>World</span></div>
<div>Hello Germany</div>
<div>Hello</div>
```

These locators will not throw an error:

```ts
page.getByText('Hello World').element() // ✅
page.getByText('Hello Germany').element() // ✅
page.getByText('World').element() // ✅
page.getByText('Hello', { exact: true }).element() // ✅
```

These locators will throw an error:

```ts
// returns multiple elements
page.getByText('Hello').element() // ❌
page.getByText(/^Hello/).element() // ❌

// returns no elements
page.getByText('Hello USA').element() // ❌
```

### elements

```ts
function elements(): Element[]
```

This method returns an array of elements matching the locator's selector.

This function never throws an error. If there are no elements matching the selector, this method will return an empty array.

Consider the following DOM structure:

```html
<div>Hello <span>World</span></div>
<div>Hello</div>
```

These locators will always succeed:

```ts
page.getByText('Hello World').elements() // ✅ [HTMLElement]
page.getByText('World').elements() // ✅ [HTMLElement]
page.getByText('Hello', { exact: true }).elements() // ✅ [HTMLElement]
page.getByText('Hello').elements() // ✅ [HTMLElement, HTMLElement]
page.getByText('Hello USA').elements() // ✅ []
```

### findElement <Version>4.1.0</Version> {#findelement}

```ts
function findElement(
  options?: SelectorOptions
): Promise<HTMLElement | SVGElement>
```

**WARNING**
This is an escape hatch for cases where you need the raw DOM element — for example, to pass it to a third-party library like FormKit that doesn't accept Vitest locators. If you are interacting with the element yourself, use other builtin methods instead.

This method returns an element matching the locator. Unlike `.element()`, this method will wait and retry until a matching element appears in the DOM, using increasing intervals (0, 20, 50, 100, 100, 500ms).

If _no element_ is found before the timeout, an error is thrown. By default, the timeout matches the test timeout.

If _multiple elements_ match the selector and `strict` is `true` (the default), an error is thrown immediately without retrying. Set `strict` to `false` to return the first matching element instead.

It accepts options:

- `timeout: number` - How long to wait in milliseconds until at least one element is found. By default, this shares timeout with the test.
- `strict: boolean` - When `true` (default), throws an error if multiple elements match the locator. When `false`, returns the first matching element.

Consider the following DOM structure:

```html
<div>Hello <span>World</span></div>
<div>Hello Germany</div>
<div>Hello</div>
```

These locators will resolve successfully:

```ts
await page.getByText('Hello World').findElement() // ✅ HTMLDivElement
await page.getByText('World').findElement() // ✅ HTMLSpanElement
await page.getByText('Hello Germany').findElement() // ✅ HTMLDivElement
```

These locators will throw an error:

```ts
// multiple elements match, strict mode rejects
await page.getByText('Hello').findElement() // ❌
await page.getByText(/^Hello/).findElement() // ❌

// no matching element before timeout
await page.getByText('Hello USA').findElement() // ❌
```

Using `strict: false` to allow multiple matches:

```ts
// returns the first matching element instead of throwing
await page.getByText('Hello').findElement({ strict: false }) // ✅ HTMLDivElement
```

### all

```ts
function all(): Locator[]
```

This method returns an array of new locators that match the selector.

Internally, this method calls `.elements` and wraps every element using `page.elementLocator`.

- See `locator.elements()`

### serialize

```ts
function serialize(): SerializedLocator
```

Returns a JSON-serializable representation of the locator. The returned object has two fields:

- `selector`: the provider-specific selector string used to query the element at runtime.
- `locator`: a human-readable description of the locator (e.g. `getByRole('button')`), used for error messages and tracing. Equivalent to calling `asLocator()`.

This is primarily intended for forwarding a locator to a browser command, which runs in Node and cannot receive a live `Locator` instance:

```ts
import { commands, page } from 'vitest/browser'

await commands.myCommand(page.getByRole('button').serialize())
```

**Tip:**
Vitest automatically serializes any `Locator` argument passed to a command, so calling `serialize()` explicitly is rarely necessary. You can also use `JSON.stringify(locator)` (it calls `toJSON` internally), which produces the same result.

### toJSON

```ts
function toJSON(): SerializedLocator
```

Alias of `serialize`. Defined so that `JSON.stringify(locator)` and structured-clone-based transports return a `SerializedLocator` object.

### asLocator

```ts
function asLocator(): string
```

Returns a human-readable description of the locator using the JavaScript locator syntax (e.g. `getByRole('button', { name: 'Submit' })`). This is the same string exposed as the `locator` field of `serialize()` and is used in error messages and traces.

```ts
import { page } from 'vitest/browser'

const button = page.getByRole('button', { name: 'Submit' })
button.asLocator() // "getByRole('button', { name: 'Submit' })"
```

**Tip:**
Use `selector` when you need the provider-specific string to forward to a browser command. Use `asLocator()` only for diagnostic output. The returned string is not meant to be re-used to query elements.

## Properties

### selector

The `selector` is a string that will be used to locate the element by the browser provider. Playwright will use a `playwright` locator syntax, and `preview` and `webdriverio` will use CSS.

**Danger:**
You should not use this string in your test code. The `selector` string should only be used when working with the Commands API:

```ts
import type { BrowserCommand } from 'vitest/node'
import type { SerializedLocator } from '@vitest/browser'

const test: BrowserCommand<SerializedLocator> = function test(context, { selector }) {
  // playwright
  await context.iframe.locator(selector).click()
  // webdriverio
  await context.browser.$(selector).click()
}
```

```ts
import { test } from 'vitest'
import { commands, page } from 'vitest/browser'

test('works correctly', async () => {
  await commands.test(page.getByText('Hello').serialize()) // ✅
  // vitest will automatically unwrap it to a SerializedLocator
  await commands.test(page.getByText('Hello')) // ✅
})
```

### length

This getter returns a number of elements that this locator is matching. It is equivalent to calling `locator.elements().length`.

Consider the following DOM structure:

```html
<button>Click Me!</button>
<button>Don't click me!</button>
```

This property will always succeed:

```ts
page.getByRole('button').length // ✅ 2
page.getByRole('button', { title: 'Click Me!' }).length // ✅ 1
page.getByRole('alert').length // ✅ 0
```
