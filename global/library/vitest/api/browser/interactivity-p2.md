---
title: "Interactivity API | Browser Mode (part 2 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/browser/interactivity.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Interactivity API | Browser Mode (part 2 of 2)

## userEvent.clear

```ts
function clear(element: Element | Locator, options?: UserEventClearOptions): Promise<void>
```

This method clears the input element content.

```ts
import { page, userEvent } from 'vitest/browser'

test('clears input', async () => {
  const input = page.getByRole('input')

  await userEvent.fill(input, 'foo')
  expect(input).toHaveValue('foo')

  await userEvent.clear(input)
  // or you can access it directly on the locator
  await input.clear()

  expect(input).toHaveValue('')
})
```

References:

- Playwright `locator.clear` API
- WebdriverIO `element.clearValue` API
- testing-library `clear` API

## userEvent.selectOptions

```ts
function selectOptions(
  element: Element | Locator,
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

The `userEvent.selectOptions` allows selecting a value in a `<select>` element.

**Warning:**
If select element doesn't have `multiple` attribute, Vitest will select only the first element in the array.

Unlike `@testing-library`, Vitest doesn't support listbox at the moment, but we plan to add support for it in the future.

```ts
import { page, userEvent } from 'vitest/browser'

test('clears input', async () => {
  const select = page.getByRole('select')

  await userEvent.selectOptions(select, 'Option 1')
  // or you can access it directly on the locator
  await select.selectOptions('Option 1')

  expect(select).toHaveValue('option-1')

  await userEvent.selectOptions(select, 'option-1')
  expect(select).toHaveValue('option-1')

  await userEvent.selectOptions(select, [
    page.getByRole('option', { name: 'Option 1' }),
    page.getByRole('option', { name: 'Option 2' }),
  ])
  expect(select).toHaveValue(['option-1', 'option-2'])
})
```

**Warning:**
`webdriverio` provider doesn't support selecting multiple elements because it doesn't provide API to do so.

References:

- Playwright `locator.selectOption` API
- WebdriverIO `element.selectByIndex` API
- testing-library `selectOptions` API

## userEvent.hover

```ts
function hover(
  element: Element | Locator,
  options?: UserEventHoverOptions,
): Promise<void>
```

This method moves the cursor position to the selected element. Please refer to your provider's documentation for detailed explanation about how this method works.

**Warning:**
If you are using `webdriverio` provider, the cursor will move to the center of the element by default.

If you are using `playwright` provider, the cursor moves to "some" visible point of the element.

```ts
import { page, userEvent } from 'vitest/browser'

test('hovers logo element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })

  await userEvent.hover(logo)
  // or you can access it directly on the locator
  await logo.hover()
})
```

References:

- Playwright `locator.hover` API
- WebdriverIO `element.moveTo` API
- testing-library `hover` API

## userEvent.unhover

```ts
function unhover(
  element: Element | Locator,
  options?: UserEventHoverOptions,
): Promise<void>
```

This works the same as `userEvent.hover`, but moves the cursor to the `document.body` element instead.

**Warning:**
By default, the cursor position is in "some" visible place (in `playwright` provider) or in the center (in `webdriverio` provider) of the body element, so if the currently hovered element is already in the same position, this method will have no effect.

```ts
import { page, userEvent } from 'vitest/browser'

test('unhover logo element', async () => {
  const logo = page.getByRole('img', { name: /logo/ })

  await userEvent.unhover(logo)
  // or you can access it directly on the locator
  await logo.unhover()
})
```

References:

- Playwright `locator.hover` API
- WebdriverIO `element.moveTo` API
- testing-library `hover` API

## userEvent.upload

```ts
function upload(
  element: Element | Locator,
  files: string[] | string | File[] | File,
  options?: UserEventUploadOptions,
): Promise<void>
```

Change a file input element to have the specified files.

```ts
import { page, userEvent } from 'vitest/browser'

test('can upload a file', async () => {
  const input = page.getByRole('button', { name: /Upload files/ })

  const file = new File(['file'], 'file.png', { type: 'image/png' })

  await userEvent.upload(input, file)
  // or you can access it directly on the locator
  await input.upload(file)

  // you can also use file paths relative to the root of the project
  await userEvent.upload(input, './fixtures/file.png')
})
```

**Warning:**
`webdriverio` provider supports this command only in `chrome` and `edge` browsers. It also only supports string types at the moment.

References:

- Playwright `locator.setInputFiles` API
- WebdriverIO `browser.uploadFile` API
- testing-library `upload` API

## userEvent.dragAndDrop

```ts
function dragAndDrop(
  source: Element | Locator,
  target: Element | Locator,
  options?: UserEventDragAndDropOptions,
): Promise<void>
```

Drags the source element on top of the target element. Don't forget that the `source` element has to have the `draggable` attribute set to `true`.

```ts
import { page, userEvent } from 'vitest/browser'

test('drag and drop works', async () => {
  const source = page.getByRole('img', { name: /logo/ })
  const target = page.getByTestId('logo-target')

  await userEvent.dragAndDrop(source, target)
  // or you can access it directly on the locator
  await source.dropTo(target)

  await expect.element(target).toHaveTextContent('Logo is processed')
})
```

**Warning:**
This API is not supported by the default `preview` provider.

References:

- Playwright `frame.dragAndDrop` API
- WebdriverIO `element.dragAndDrop` API

## userEvent.copy

```ts
function copy(): Promise<void>
```

Copy the selected text to the clipboard.

```js
import { page, userEvent } from 'vitest/browser'

test('copy and paste', async () => {
  // write to 'source'
  await userEvent.click(page.getByPlaceholder('source'))
  await userEvent.keyboard('hello')

  // select and copy 'source'
  await userEvent.dblClick(page.getByPlaceholder('source'))
  await userEvent.copy()

  // paste to 'target'
  await userEvent.click(page.getByPlaceholder('target'))
  await userEvent.paste()

  await expect.element(page.getByPlaceholder('source')).toHaveTextContent('hello')
  await expect.element(page.getByPlaceholder('target')).toHaveTextContent('hello')
})
```

References:

- testing-library `copy` API

## userEvent.cut

```ts
function cut(): Promise<void>
```

Cut the selected text to the clipboard.

```js
import { page, userEvent } from 'vitest/browser'

test('copy and paste', async () => {
  // write to 'source'
  await userEvent.click(page.getByPlaceholder('source'))
  await userEvent.keyboard('hello')

  // select and cut 'source'
  await userEvent.dblClick(page.getByPlaceholder('source'))
  await userEvent.cut()

  // paste to 'target'
  await userEvent.click(page.getByPlaceholder('target'))
  await userEvent.paste()

  await expect.element(page.getByPlaceholder('source')).toHaveTextContent('')
  await expect.element(page.getByPlaceholder('target')).toHaveTextContent('hello')
})
```

References:

- testing-library `cut` API

## userEvent.paste

```ts
function paste(): Promise<void>
```

Paste the text from the clipboard. See `userEvent.copy` and `userEvent.cut` for usage examples.

References:

- testing-library `paste` API
