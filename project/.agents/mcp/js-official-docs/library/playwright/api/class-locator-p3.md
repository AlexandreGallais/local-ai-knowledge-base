---
title: "class: Locator (part 3 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-locator.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Locator (part 3 of 6)

## method: Locator.contentFrame
* since: v1.43
- returns: <[FrameLocator]>

Returns a [FrameLocator] object pointing to the same `iframe` as this locator.

Useful when you have a [Locator] object obtained somewhere, and later on would like to interact with the content inside the frame.

For a reverse operation, use [`method: FrameLocator.owner`].

**Usage**

```js
const locator = page.locator('iframe[name="embedded"]');
// ...
const frameLocator = locator.contentFrame();
await frameLocator.getByRole('button').click();
```

```java
Locator locator = page.locator("iframe[name=\"embedded\"]");
// ...
FrameLocator frameLocator = locator.contentFrame();
frameLocator.getByRole(AriaRole.BUTTON).click();
```

```python
locator = page.locator("iframe[name=\"embedded\"]")
# ...
frame_locator = locator.content_frame
await frame_locator.get_by_role("button").click()
```

```python
locator = page.locator("iframe[name=\"embedded\"]")
# ...
frame_locator = locator.content_frame
frame_locator.get_by_role("button").click()
```

```csharp
var locator = Page.Locator("iframe[name=\"embedded\"]");
// ...
var frameLocator = locator.ContentFrame;
await frameLocator.GetByRole(AriaRole.Button).ClickAsync();
```

## async method: Locator.evaluate
* since: v1.14
- returns: <[Serializable]>

Execute JavaScript code in the page, taking the matching element as an argument.

**Details**

Returns the return value of [`param: expression`], called with the matching element as a first argument, and [`param: arg`] as a second argument.

If [`param: expression`] returns a [Promise], this method will wait for the promise to resolve and return its value.

If [`param: expression`] throws or rejects, this method throws.

**Usage**

Passing argument to [`param: expression`]:

```js
const result = await page.getByTestId('myId').evaluate((element, [x, y]) => {
  return element.textContent + ' ' + x * y;
}, [7, 8]);
console.log(result); // prints "myId text 56"
```

```java
Object result = page.getByTestId("myId").evaluate("(element, [x, y]) => {\n" +
  "  return element.textContent + ' ' + x * y;\n" +
  "}", Arrays.asList(7, 8));
System.out.println(result); // prints "myId text 56"
```

```python
result = await page.get_by_testid("myId").evaluate("(element, [x, y]) => element.textContent + ' ' + x * y", [7, 8])
print(result) # prints "myId text 56"
```

```python
result = page.get_by_testid("myId").evaluate("(element, [x, y]) => element.textContent + ' ' + x * y", [7, 8])
print(result) # prints "myId text 56"
```

```csharp
var result = await page.GetByTestId("myId").EvaluateAsync<string>("(element, [x, y]) => element.textContent + ' ' + x * y)", new[] { 7, 8 });
Console.WriteLine(result); // prints "myId text 56"
```

### param: Locator.evaluate.expression = %%-evaluate-expression-%%
* since: v1.14

### param: Locator.evaluate.expression = %%-js-evaluate-pagefunction-%%
* since: v1.14

### param: Locator.evaluate.arg
* since: v1.14
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Locator.evaluate.exposeFunctions = %%-js-evaluate-expose-functions-%%
* since: v1.62

### option: Locator.evaluate.timeout
* since: v1.14
* langs: python, java, csharp
- `timeout` <[float]>

Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

### option: Locator.evaluate.timeout
* since: v1.14
* langs: js
- `timeout` <[float]>

Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `0` - no timeout.

## async method: Locator.evaluateAll
* since: v1.14
- returns: <[Serializable]>

Execute JavaScript code in the page, taking all matching elements as an argument.

**Details**

Returns the return value of [`param: expression`], called with an array of all matching elements as a first argument, and [`param: arg`] as a second argument.

If [`param: expression`] returns a [Promise], this method will wait for the promise to resolve and return its value.

If [`param: expression`] throws or rejects, this method throws.

**Usage**

```js
const locator = page.locator('div');
const moreThanTen = await locator.evaluateAll((divs, min) => divs.length > min, 10);
```

```java
Locator locator = page.locator("div");
boolean moreThanTen = (boolean) locator.evaluateAll("(divs, min) => divs.length > min", 10);
```

```python
locator = page.locator("div")
more_than_ten = await locator.evaluate_all("(divs, min) => divs.length > min", 10)
```

```python
locator = page.locator("div")
more_than_ten = locator.evaluate_all("(divs, min) => divs.length > min", 10)
```

```csharp
var locator = page.Locator("div");
var moreThanTen = await locator.EvaluateAllAsync<bool>("(divs, min) => divs.length > min", 10);
```

### param: Locator.evaluateAll.expression = %%-evaluate-expression-%%
* since: v1.14

### param: Locator.evaluateAll.expression = %%-js-evaluate-pagefunction-%%
* since: v1.14

### param: Locator.evaluateAll.arg
* since: v1.14
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Locator.evaluateHandle
* since: v1.14
- returns: <[JSHandle]>

Execute JavaScript code in the page, taking the matching element as an argument, and return a [JSHandle] with the result.

**Details**

Returns the return value of [`param: expression`] as a[JSHandle], called with the matching element as a first argument, and [`param: arg`] as a second argument.

The only difference between [`method: Locator.evaluate`] and [`method: Locator.evaluateHandle`] is that [`method: Locator.evaluateHandle`] returns [JSHandle].

If [`param: expression`] returns a [Promise], this method will wait for the promise to resolve and return its value.

If [`param: expression`] throws or rejects, this method throws.

See [`method: Page.evaluateHandle`] for more details.

### param: Locator.evaluateHandle.expression = %%-evaluate-expression-%%
* since: v1.14

### param: Locator.evaluateHandle.expression = %%-js-evaluate-pagefunction-%%
* since: v1.14

### param: Locator.evaluateHandle.arg
* since: v1.14
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Locator.evaluateHandle.exposeFunctions = %%-js-evaluate-expose-functions-%%
* since: v1.62

### option: Locator.evaluateHandle.timeout
* since: v1.14
* langs: python, java, csharp
- `timeout` <[float]>

Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

### option: Locator.evaluateHandle.timeout
* since: v1.14
* langs: js
- `timeout` <[float]>

Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `0` - no timeout.

## async method: Locator.fill
* since: v1.14

Set a value to the input field.

**Usage**

```js
await page.getByRole('textbox').fill('example value');
```

```java
page.getByRole(AriaRole.TEXTBOX).fill("example value");
```

```python
await page.get_by_role("textbox").fill("example value")
```

```python
page.get_by_role("textbox").fill("example value")
```

```csharp
await page.GetByRole(AriaRole.Textbox).FillAsync("example value");
```

**Details**

This method waits for actionability checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an ``, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `` element that has an associated control, the control will be filled instead.

To send fine-grained keyboard events, use [`method: Locator.pressSequentially`].

### param: Locator.fill.value
* since: v1.14
- `value` <[string]>

Value to set for the ``, `<textarea>` or `[contenteditable]` element.

### option: Locator.fill.force = %%-input-force-%%
* since: v1.14

### option: Locator.fill.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.fill.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.fill.timeout = %%-input-timeout-js-%%
* since: v1.14

## method: Locator.filter
* since: v1.22
- returns: <[Locator]>

This method narrows existing locator according to the options, for example filters by text.
It can be chained to filter multiple times.

**Usage**

```js
const rowLocator = page.locator('tr');
// ...
await rowLocator
    .filter({ hasText: 'text in column 1' })
    .filter({ has: page.getByRole('button', { name: 'column 2 button' }) })
    .screenshot();
```

```java
Locator rowLocator = page.locator("tr");
// ...
rowLocator
    .filter(new Locator.FilterOptions().setHasText("text in column 1"))
    .filter(new Locator.FilterOptions().setHas(
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("column 2 button"))
    ))
    .screenshot();
```

```python
row_locator = page.locator("tr")
# ...
await row_locator.filter(has_text="text in column 1").filter(
    has=page.get_by_role("button", name="column 2 button")
).screenshot()

```

```python
row_locator = page.locator("tr")
# ...
row_locator.filter(has_text="text in column 1").filter(
    has=page.get_by_role("button", name="column 2 button")
).screenshot()
```

```csharp
var rowLocator = page.Locator("tr");
// ...
await rowLocator
    .Filter(new() { HasText = "text in column 1" })
    .Filter(new() {
        Has = page.GetByRole(AriaRole.Button, new() { Name = "column 2 button" } )
    })
    .ScreenshotAsync();
```

### option: Locator.filter.-inline- = %%-locator-options-list-v1.14-%%
* since: v1.22

### option: Locator.filter.hasNot = %%-locator-option-has-not-%%
* since: v1.33

### option: Locator.filter.hasNotText = %%-locator-option-has-not-text-%%
* since: v1.33

### option: Locator.filter.visible = %%-locator-option-visible-%%
* since: v1.51

## method: Locator.first
* since: v1.14
- returns: <[Locator]>

Returns locator to the first matching element.

## async method: Locator.focus
* since: v1.14

Calls focus on the matching element.

### option: Locator.focus.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.focus.timeout = %%-input-timeout-js-%%
* since: v1.14

## method: Locator.frameLocator
* since: v1.17
- returns: <[FrameLocator]>

When working with iframes, you can create a frame locator that will enter the iframe and allow locating elements
in that iframe:

**Usage**

```js
const locator = page.frameLocator('iframe').getByText('Submit');
await locator.click();
```

```java
Locator locator = page.frameLocator("iframe").getByText("Submit");
locator.click();
```

```python
locator = page.frame_locator("iframe").get_by_text("Submit")
await locator.click()
```

```python
locator = page.frame_locator("iframe").get_by_text("Submit")
locator.click()
```

```csharp
var locator = page.FrameLocator("iframe").GetByText("Submit");
await locator.ClickAsync();
```

### param: Locator.frameLocator.selector = %%-find-selector-%%
* since: v1.17

## async method: Locator.getAttribute
* since: v1.14
- returns: <[null]|[string]>

Returns the matching element's attribute value.

:::warning[Asserting attributes]
If you need to assert an element's attribute, prefer [`method: LocatorAssertions.toHaveAttribute`] to avoid flakiness. See assertions guide for more details.
:::

### param: Locator.getAttribute.name
* since: v1.14
- `name` <[string]>

Attribute name to get the value for.

### option: Locator.getAttribute.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.getAttribute.timeout = %%-input-timeout-js-%%
* since: v1.14

## method: Locator.getByAltText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-alt-text-%%

## method: Locator.getByLabel
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-label-text-%%

## method: Locator.getByPlaceholder
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-placeholder-text-%%

## method: Locator.getByRole
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-role-%%

### param: Locator.getByRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.27

### option: Locator.getByRole.-inline- = %%-locator-get-by-role-option-list-v1.27-%%
* since: v1.27

## method: Locator.getByTestId
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-test-id-%%

### param: Locator.getByTestId.testId = %%-locator-get-by-test-id-test-id-%%
* since: v1.27

## method: Locator.getByText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-text-%%

## method: Locator.getByTitle
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-title-%%

## async method: Locator.hideHighlight
* since: v1.60

Hides the element highlight previously added by [`method: Locator.highlight`].

## async method: Locator.highlight
* since: v1.20
- returns: <[Disposable]>

Highlight the corresponding element(s) on the screen. Useful for debugging, don't commit the code that uses [`method: Locator.highlight`].

### option: Locator.highlight.style
* since: v1.60
* langs: js
- `style` <[string]|[Object]<[string], [string]|[number]>>

Inline CSS applied to the highlight overlay, e.g.

```js
await locator.highlight({ style: 'outline: 2px dashed red' });
await locator.highlight({ style: { color: 'red' } });
```

### option: Locator.highlight.style
* since: v1.60
* langs: java, python, csharp
- `style` <[string]>

Additional inline CSS applied to the highlight overlay, e.g. `"outline: 2px dashed red"`.
