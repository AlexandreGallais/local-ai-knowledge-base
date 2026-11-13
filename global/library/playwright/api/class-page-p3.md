---
title: "class: Page (part 3 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 3 of 14)

## async method: Page.dragAndDrop
* since: v1.13

This method drags the source element to the target element.
It will first move to the source element, perform a `mousedown`,
then move to the target element and perform a `mouseup`.

**Usage**

```js
await page.dragAndDrop('#source', '#target');
// or specify exact positions relative to the top-left corners of the elements:
await page.dragAndDrop('#source', '#target', {
  sourcePosition: { x: 34, y: 7 },
  targetPosition: { x: 10, y: 20 },
});
```

```java
page.dragAndDrop("#source", "#target");
// or specify exact positions relative to the top-left corners of the elements:
page.dragAndDrop("#source", "#target", new Page.DragAndDropOptions()
  .setSourcePosition(34, 7).setTargetPosition(10, 20));
```

```python
await page.drag_and_drop("#source", "#target")
# or specify exact positions relative to the top-left corners of the elements:
await page.drag_and_drop(
  "#source",
  "#target",
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

```python
page.drag_and_drop("#source", "#target")
# or specify exact positions relative to the top-left corners of the elements:
page.drag_and_drop(
  "#source",
  "#target",
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

```csharp
await Page.DragAndDropAsync("#source", "#target");
// or specify exact positions relative to the top-left corners of the elements:
await Page.DragAndDropAsync("#source", "#target", new()
{
    SourcePosition = new() { X = 34, Y = 7 },
    TargetPosition = new() { X = 10, Y = 20 },
});
```

### param: Page.dragAndDrop.source = %%-input-source-%%
* since: v1.13

### param: Page.dragAndDrop.target = %%-input-target-%%
* since: v1.13

### option: Page.dragAndDrop.force = %%-input-force-%%
* since: v1.13

### option: Page.dragAndDrop.scroll = %%-input-scroll-%%
* since: v1.62

### option: Page.dragAndDrop.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.13

### option: Page.dragAndDrop.strict = %%-input-strict-%%
* since: v1.14

### option: Page.dragAndDrop.timeout = %%-input-timeout-%%
* since: v1.13

### option: Page.dragAndDrop.timeout = %%-input-timeout-js-%%
* since: v1.13

### option: Page.dragAndDrop.trial = %%-input-trial-%%
* since: v1.13

### option: Page.dragAndDrop.sourcePosition = %%-input-source-position-%%
* since: v1.14

### option: Page.dragAndDrop.targetPosition = %%-input-target-position-%%
* since: v1.14

### option: Page.dragAndDrop.steps = %%-input-drag-steps-%%
* since: v1.57

## async method: Page.emulateMedia
* since: v1.8

This method changes the `CSS media type` through the `media` argument, and/or the `'prefers-colors-scheme'` media feature, using the `colorScheme` argument.

**Usage**

```js
await page.evaluate(() => matchMedia('screen').matches);
// → true
await page.evaluate(() => matchMedia('print').matches);
// → false

await page.emulateMedia({ media: 'print' });
await page.evaluate(() => matchMedia('screen').matches);
// → false
await page.evaluate(() => matchMedia('print').matches);
// → true

await page.emulateMedia({});
await page.evaluate(() => matchMedia('screen').matches);
// → true
await page.evaluate(() => matchMedia('print').matches);
// → false
```

```java
page.evaluate("() => matchMedia('screen').matches");
// → true
page.evaluate("() => matchMedia('print').matches");
// → false

page.emulateMedia(new Page.EmulateMediaOptions().setMedia(Media.PRINT));
page.evaluate("() => matchMedia('screen').matches");
// → false
page.evaluate("() => matchMedia('print').matches");
// → true

page.emulateMedia(new Page.EmulateMediaOptions());
page.evaluate("() => matchMedia('screen').matches");
// → true
page.evaluate("() => matchMedia('print').matches");
// → false
```

```python
await page.evaluate("matchMedia('screen').matches")
# → True
await page.evaluate("matchMedia('print').matches")
# → False

await page.emulate_media(media="print")
await page.evaluate("matchMedia('screen').matches")
# → False
await page.evaluate("matchMedia('print').matches")
# → True

await page.emulate_media()
await page.evaluate("matchMedia('screen').matches")
# → True
await page.evaluate("matchMedia('print').matches")
# → False
```

```python
page.evaluate("matchMedia('screen').matches")
# → True
page.evaluate("matchMedia('print').matches")
# → False

page.emulate_media(media="print")
page.evaluate("matchMedia('screen').matches")
# → False
page.evaluate("matchMedia('print').matches")
# → True

page.emulate_media()
page.evaluate("matchMedia('screen').matches")
# → True
page.evaluate("matchMedia('print').matches")
# → False
```

```csharp
await page.EvaluateAsync("() => matchMedia('screen').matches");
// → true
await page.EvaluateAsync("() => matchMedia('print').matches");
// → false

await page.EmulateMediaAsync(new() { Media = Media.Print });
await page.EvaluateAsync("() => matchMedia('screen').matches");
// → false
await page.EvaluateAsync("() => matchMedia('print').matches");
// → true

await page.EmulateMediaAsync(new() { Media = Media.Screen });
await page.EvaluateAsync("() => matchMedia('screen').matches");
// → true
await page.EvaluateAsync("() => matchMedia('print').matches");
// → false
```

```js
await page.emulateMedia({ colorScheme: 'dark' });
await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches);
// → true
await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches);
// → false
```

```java
page.emulateMedia(new Page.EmulateMediaOptions().setColorScheme(ColorScheme.DARK));
page.evaluate("() => matchMedia('(prefers-color-scheme: dark)').matches");
// → true
page.evaluate("() => matchMedia('(prefers-color-scheme: light)').matches");
// → false
```

```python
await page.emulate_media(color_scheme="dark")
await page.evaluate("matchMedia('(prefers-color-scheme: dark)').matches")
# → True
await page.evaluate("matchMedia('(prefers-color-scheme: light)').matches")
# → False
```

```python
page.emulate_media(color_scheme="dark")
page.evaluate("matchMedia('(prefers-color-scheme: dark)').matches")
# → True
page.evaluate("matchMedia('(prefers-color-scheme: light)').matches")
# → False
```

```csharp
await page.EmulateMediaAsync(new() { ColorScheme = ColorScheme.Dark });
await page.EvaluateAsync("matchMedia('(prefers-color-scheme: dark)').matches");
// → true
await page.EvaluateAsync("matchMedia('(prefers-color-scheme: light)').matches");
// → false
```

### option: Page.emulateMedia.media
* since: v1.9
* langs: js, java
- `media` "Media" <null|"screen"|"print">

Changes the CSS media type of the page. The only allowed values are `'screen'`, `'print'` and `null`.
Passing `null` disables CSS media emulation.

### option: Page.emulateMedia.media
* since: v1.9
* langs: csharp, python
- `media` "Media" <"screen"|"print"|"null">

Changes the CSS media type of the page. The only allowed values are `'Screen'`, `'Print'` and `'Null'`.
Passing `'Null'` disables CSS media emulation.

### option: Page.emulateMedia.colorScheme
* since: v1.9
* langs: js, java
- `colorScheme` "ColorScheme" <null|"light"|"dark"|"no-preference">

Emulates prefers-colors-scheme media feature, supported values are `'light'` and `'dark'`. Passing
`null` disables color scheme emulation. `'no-preference'` is deprecated.

### option: Page.emulateMedia.colorScheme
* since: v1.9
* langs: csharp, python
- `colorScheme` "ColorScheme" <"light"|"dark"|"no-preference"|"null">

Emulates prefers-colors-scheme media feature, supported values are `'light'` and `'dark'`. Passing
`'Null'` disables color scheme emulation. `'no-preference'` is deprecated.

### option: Page.emulateMedia.reducedMotion
* since: v1.12
* langs: js, java
- `reducedMotion` "ReducedMotion" <null|"reduce"|"no-preference">

Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. Passing `null` disables reduced motion emulation.

### option: Page.emulateMedia.reducedMotion
* since: v1.12
* langs: csharp, python
- `reducedMotion` "ReducedMotion" <"reduce"|"no-preference"|"null">

Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. Passing `null` disables reduced motion emulation.

### option: Page.emulateMedia.forcedColors
* since: v1.15
* langs: js, java
- `forcedColors` "ForcedColors" <null|"active"|"none">

Emulates `'forced-colors'` media feature, supported values are `'active'` and `'none'`. Passing `null` disables forced colors emulation.

### option: Page.emulateMedia.forcedColors
* since: v1.15
* langs: csharp, python
- `forcedColors` "ForcedColors" <"active"|"none"|"null">

### option: Page.emulateMedia.contrast
* since: v1.51
* langs: js, java
- `contrast` "Contrast" <null|"no-preference"|"more">

Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. Passing `null` disables contrast emulation.

### option: Page.emulateMedia.contrast
* since: v1.51
* langs: csharp, python
- `contrast` "Contrast" <"no-preference"|"more"|"null">

## async method: Page.evalOnSelector
* since: v1.9
* discouraged: This method does not wait for the element to pass <example-value>
  checks and therefore can lead to the flaky tests. Use [`method: Locator.evaluate`],
  other [Locator] helper methods or web-first assertions instead.
* langs:
  - alias-python: eval_on_selector
  - alias-js: $eval
- returns: <[Serializable]>

The method finds an element matching the specified selector within the page and passes it as a first argument to
[`param: expression`]. If no elements match the selector, the method throws an error. Returns the value of
[`param: expression`].

If [`param: expression`] returns a [Promise], then [`method: Page.evalOnSelector`] would wait for the promise to resolve and
return its value.

**Usage**

```js
const searchValue = await page.$eval('#search', el => el.value);
const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
const html = await page.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
// In TypeScript, this example requires an explicit type annotation (HTMLLinkElement) on el:
const preloadHrefTS = await page.$eval('link[rel=preload]', (el: HTMLLinkElement) => el.href);
```

```java
String searchValue = (String) page.evalOnSelector("#search", "el => el.value");
String preloadHref = (String) page.evalOnSelector("link[rel=preload]", "el => el.href");
String html = (String) page.evalOnSelector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

```python
search_value = await page.eval_on_selector("#search", "el => el.value")
preload_href = await page.eval_on_selector("link[rel=preload]", "el => el.href")
html = await page.eval_on_selector(".main-container", "(e, suffix) => e.outer_html + suffix", "hello")
```

```python
search_value = page.eval_on_selector("#search", "el => el.value")
preload_href = page.eval_on_selector("link[rel=preload]", "el => el.href")
html = page.eval_on_selector(".main-container", "(e, suffix) => e.outer_html + suffix", "hello")
```

```csharp
var searchValue = await page.EvalOnSelectorAsync<string>("#search", "el => el.value");
var preloadHref = await page.EvalOnSelectorAsync<string>("link[rel=preload]", "el => el.href");
var html = await page.EvalOnSelectorAsync(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

### param: Page.evalOnSelector.selector = %%-query-selector-%%
* since: v1.9

### param: Page.evalOnSelector.expression = %%-evaluate-expression-%%
* since: v1.9

### param: Page.evalOnSelector.expression = %%-js-evalonselector-pagefunction-%%
* since: v1.9

### param: Page.evalOnSelector.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Page.evalOnSelector.strict = %%-input-strict-%%
* since: v1.14

## async method: Page.evalOnSelectorAll
* since: v1.9
* discouraged: In most cases, [`method: Locator.evaluateAll`],
  other [Locator] helper methods and web-first assertions do a better job.
* langs:
  - alias-python: eval_on_selector_all
  - alias-js: $$eval
- returns: <[Serializable]>

The method finds all elements matching the specified selector within the page and passes an array of matched elements as
a first argument to [`param: expression`]. Returns the result of [`param: expression`] invocation.

If [`param: expression`] returns a [Promise], then [`method: Page.evalOnSelectorAll`] would wait for the promise to resolve and
return its value.

**Usage**

```js
const divCounts = await page.$$eval('div', (divs, min) => divs.length >= min, 10);
```

```java
boolean divCounts = (boolean) page.evalOnSelectorAll("div", "(divs, min) => divs.length >= min", 10);
```

```python
div_counts = await page.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

```python
div_counts = page.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

```csharp
var divsCount = await page.EvalOnSelectorAllAsync<bool>("div", "(divs, min) => divs.length >= min", 10);
```

### param: Page.evalOnSelectorAll.selector = %%-query-selector-%%
* since: v1.9

### param: Page.evalOnSelectorAll.expression = %%-evaluate-expression-%%
* since: v1.9

### param: Page.evalOnSelectorAll.expression = %%-js-evalonselectorall-pagefunction-%%
* since: v1.9

### param: Page.evalOnSelectorAll.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].
