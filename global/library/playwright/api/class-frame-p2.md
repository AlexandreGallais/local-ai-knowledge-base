---
title: "class: Frame (part 2 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-frame.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Frame (part 2 of 5)

## async method: Frame.dragAndDrop
* since: v1.13

### param: Frame.dragAndDrop.source = %%-input-source-%%
* since: v1.13

### param: Frame.dragAndDrop.target = %%-input-target-%%
* since: v1.13

### option: Frame.dragAndDrop.force = %%-input-force-%%
* since: v1.13

### option: Frame.dragAndDrop.scroll = %%-input-scroll-%%
* since: v1.62

### option: Frame.dragAndDrop.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.13

### option: Frame.dragAndDrop.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.dragAndDrop.timeout = %%-input-timeout-%%
* since: v1.13

### option: Frame.dragAndDrop.timeout = %%-input-timeout-js-%%
* since: v1.13

### option: Frame.dragAndDrop.trial = %%-input-trial-%%
* since: v1.13

### option: Frame.dragAndDrop.sourcePosition = %%-input-source-position-%%
* since: v1.14

### option: Frame.dragAndDrop.targetPosition = %%-input-target-position-%%
* since: v1.14

### option: Frame.dragAndDrop.steps = %%-input-drag-steps-%%
* since: v1.57

## async method: Frame.evalOnSelector
* since: v1.9
* discouraged: This method does not wait for the element to pass the actionability
  checks and therefore can lead to the flaky tests. Use [`method: Locator.evaluate`], other [Locator] helper methods or web-first assertions instead.
* langs:
  - alias-python: eval_on_selector
  - alias-js: $eval
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

The method finds an element matching the specified selector within the frame and passes it as a first argument to
[`param: expression`]. If no
elements match the selector, the method throws an error.

If [`param: expression`] returns a [Promise], then [`method: Frame.evalOnSelector`] would wait for the promise to resolve and return its
value.

**Usage**

```js
const searchValue = await frame.$eval('#search', el => el.value);
const preloadHref = await frame.$eval('link[rel=preload]', el => el.href);
const html = await frame.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');
```

```java
String searchValue = (String) frame.evalOnSelector("#search", "el => el.value");
String preloadHref = (String) frame.evalOnSelector("link[rel=preload]", "el => el.href");
String html = (String) frame.evalOnSelector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

```python
search_value = await frame.eval_on_selector("#search", "el => el.value")
preload_href = await frame.eval_on_selector("link[rel=preload]", "el => el.href")
html = await frame.eval_on_selector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello")
```

```python
search_value = frame.eval_on_selector("#search", "el => el.value")
preload_href = frame.eval_on_selector("link[rel=preload]", "el => el.href")
html = frame.eval_on_selector(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello")
```

```csharp
var searchValue = await frame.EvalOnSelectorAsync<string>("#search", "el => el.value");
var preloadHref = await frame.EvalOnSelectorAsync<string>("link[rel=preload]", "el => el.href");
var html = await frame.EvalOnSelectorAsync(".main-container", "(e, suffix) => e.outerHTML + suffix", "hello");
```

### param: Frame.evalOnSelector.selector = %%-query-selector-%%
* since: v1.9

### param: Frame.evalOnSelector.expression = %%-evaluate-expression-%%
* since: v1.9

### param: Frame.evalOnSelector.expression = %%-js-evalonselector-pagefunction-%%
* since: v1.9

### param: Frame.evalOnSelector.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Frame.evalOnSelector.strict = %%-input-strict-%%
* since: v1.14

## async method: Frame.evalOnSelectorAll
* since: v1.9
* discouraged: In most cases, [`method: Locator.evaluateAll`],
  other [Locator] helper methods and web-first assertions do a better job.
* langs:
  - alias-python: eval_on_selector_all
  - alias-js: $$eval
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

The method finds all elements matching the specified selector within the frame and passes an array of matched elements
as a first argument to [`param: expression`].

If [`param: expression`] returns a [Promise], then [`method: Frame.evalOnSelectorAll`] would wait for the promise to resolve and return its
value.

**Usage**

```js
const divsCounts = await frame.$$eval('div', (divs, min) => divs.length >= min, 10);
```

```java
boolean divsCounts = (boolean) page.evalOnSelectorAll("div", "(divs, min) => divs.length >= min", 10);
```

```python
divs_counts = await frame.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

```python
divs_counts = frame.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
```

```csharp
var divsCount = await frame.EvalOnSelectorAllAsync<bool>("div", "(divs, min) => divs.length >= min", 10);
```

### param: Frame.evalOnSelectorAll.selector = %%-query-selector-%%
* since: v1.9

### param: Frame.evalOnSelectorAll.expression = %%-evaluate-expression-%%
* since: v1.9

### param: Frame.evalOnSelectorAll.expression = %%-js-evalonselectorall-pagefunction-%%
* since: v1.9

### param: Frame.evalOnSelectorAll.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: Frame.evaluate
* since: v1.8
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

If the function passed to the [`method: Frame.evaluate`] returns a [Promise], then [`method: Frame.evaluate`] would wait for the promise to
resolve and return its value.

If the function passed to the [`method: Frame.evaluate`] returns a non-[Serializable] value, then
[`method: Frame.evaluate`] returns `undefined`. Playwright also supports transferring some
additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

**Usage**

```js
const result = await frame.evaluate(([x, y]) => {
  return Promise.resolve(x * y);
}, [7, 8]);
console.log(result); // prints "56"
```

```java
Object result = frame.evaluate("([x, y]) => {\n" +
  "  return Promise.resolve(x * y);\n" +
  "}", Arrays.asList(7, 8));
System.out.println(result); // prints "56"
```

```python
result = await frame.evaluate("([x, y]) => Promise.resolve(x * y)", [7, 8])
print(result) # prints "56"
```

```python
result = frame.evaluate("([x, y]) => Promise.resolve(x * y)", [7, 8])
print(result) # prints "56"
```

```csharp
var result = await frame.EvaluateAsync<int>("([x, y]) => Promise.resolve(x * y)", new[] { 7, 8 });
Console.WriteLine(result);
```

A string can also be passed in instead of a function.

```js
console.log(await frame.evaluate('1 + 2')); // prints "3"
```

```java
System.out.println(frame.evaluate("1 + 2")); // prints "3"
```

```python
print(await frame.evaluate("1 + 2")) # prints "3"
x = 10
print(await frame.evaluate(f"1 + {x}")) # prints "11"
```

```python
print(frame.evaluate("1 + 2")) # prints "3"
x = 10
print(frame.evaluate(f"1 + {x}")) # prints "11"
```

```csharp
Console.WriteLine(await frame.EvaluateAsync<int>("1 + 2")); // prints "3"
```

[ElementHandle] instances can be passed as an argument to the [`method: Frame.evaluate`]:

```js
const bodyHandle = await frame.evaluateHandle('document.body');
const html = await frame.evaluate(([body, suffix]) =>
  body.innerHTML + suffix, [bodyHandle, 'hello'],
);
await bodyHandle.dispose();
```

```java
ElementHandle bodyHandle = frame.evaluateHandle("document.body");
String html = (String) frame.evaluate("([body, suffix]) => body.innerHTML + suffix", Arrays.asList(bodyHandle, "hello"));
bodyHandle.dispose();
```

```python
body_handle = await frame.evaluate_handle("document.body")
html = await frame.evaluate("([body, suffix]) => body.innerHTML + suffix", [body_handle, "hello"])
await body_handle.dispose()
```

```python
body_handle = frame.evaluate_handle("document.body")
html = frame.evaluate("([body, suffix]) => body.innerHTML + suffix", [body_handle, "hello"])
body_handle.dispose()
```

```csharp
var bodyHandle = await frame.EvaluateHandleAsync("document.body");
var html = await frame.EvaluateAsync<string>("([body, suffix]) => body.innerHTML + suffix", new object [] { bodyHandle, "hello" });
await bodyHandle.DisposeAsync();
```

### param: Frame.evaluate.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Frame.evaluate.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Frame.evaluate.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Frame.evaluate.exposeFunctions = %%-js-evaluate-expose-functions-%%
* since: v1.62

## async method: Frame.evaluateHandle
* since: v1.8
- returns: <[JSHandle]>

Returns the return value of [`param: expression`] as a [JSHandle].

The only difference between [`method: Frame.evaluate`] and [`method: Frame.evaluateHandle`] is that
[`method: Frame.evaluateHandle`] returns [JSHandle].

If the function, passed to the [`method: Frame.evaluateHandle`], returns a [Promise], then
[`method: Frame.evaluateHandle`] would wait for the promise to resolve and return its value.

**Usage**

```js
// Handle for the window object
const aWindowHandle = await frame.evaluateHandle(() => Promise.resolve(window));
```

```java
// Handle for the window object.
JSHandle aWindowHandle = frame.evaluateHandle("() => Promise.resolve(window)");
```

```python
a_window_handle = await frame.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

```python
a_window_handle = frame.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

```csharp
// Handle for the window object.
var aWindowHandle = await frame.EvaluateHandleAsync("() => Promise.resolve(window)");
```

A string can also be passed in instead of a function.

```js
const aHandle = await frame.evaluateHandle('document'); // Handle for the 'document'.
```

```java
JSHandle aHandle = frame.evaluateHandle("document"); // Handle for the "document".
```

```python
a_handle = await frame.evaluate_handle("document") # handle for the "document"
```

```python
a_handle = frame.evaluate_handle("document") # handle for the "document"
```

```csharp
var docHandle = await frame.EvaluateHandleAsync("document"); // Handle for the `document`
```

[JSHandle] instances can be passed as an argument to the [`method: Frame.evaluateHandle`]:

```js
const aHandle = await frame.evaluateHandle(() => document.body);
const resultHandle = await frame.evaluateHandle(([body, suffix]) =>
  body.innerHTML + suffix, [aHandle, 'hello'],
);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

```java
JSHandle aHandle = frame.evaluateHandle("() => document.body");
JSHandle resultHandle = frame.evaluateHandle("([body, suffix]) => body.innerHTML + suffix", Arrays.asList(aHandle, "hello"));
System.out.println(resultHandle.jsonValue());
resultHandle.dispose();
```

```python
a_handle = await frame.evaluate_handle("document.body")
result_handle = await frame.evaluate_handle("body => body.innerHTML", a_handle)
print(await result_handle.json_value())
await result_handle.dispose()
```

```python
a_handle = frame.evaluate_handle("document.body")
result_handle = frame.evaluate_handle("body => body.innerHTML", a_handle)
print(result_handle.json_value())
result_handle.dispose()
```

```csharp
var handle = await frame.EvaluateHandleAsync("() => document.body");
var resultHandle = await frame.EvaluateHandleAsync("([body, suffix]) => body.innerHTML + suffix", new object[] { handle, "hello" });
Console.WriteLine(await resultHandle.JsonValueAsync<string>());
await resultHandle.DisposeAsync();
```

### param: Frame.evaluateHandle.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Frame.evaluateHandle.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Frame.evaluateHandle.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Frame.evaluateHandle.exposeFunctions = %%-js-evaluate-expose-functions-%%
* since: v1.62

## async method: Frame.fill
* since: v1.8
* discouraged: Use locator-based [`method: Locator.fill`] instead. Read more about locators.

This method waits for an element matching [`param: selector`], waits for actionability checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an ``, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `` element that has an associated control, the control will be filled instead.

To send fine-grained keyboard events, use [`method: Locator.pressSequentially`].

### param: Frame.fill.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.fill.value
* since: v1.8
- `value` <[string]>

Value to fill for the ``, `<textarea>` or `[contenteditable]` element.

### option: Frame.fill.force = %%-input-force-%%
* since: v1.13

### option: Frame.fill.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.fill.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.fill.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.fill.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.focus
* since: v1.8
* discouraged: Use locator-based [`method: Locator.focus`] instead. Read more about locators.

This method fetches an element with [`param: selector`] and focuses it. If there's no element matching
[`param: selector`], the method waits until a matching element appears in the DOM.

### param: Frame.focus.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.focus.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.focus.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.focus.timeout = %%-input-timeout-js-%%
* since: v1.8
