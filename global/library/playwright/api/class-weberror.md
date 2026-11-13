---
title: "class: WebError"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-weberror.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: WebError
* since: v1.38

[WebError] class represents an unhandled exception thrown in the page. It is dispatched via the [`event: BrowserContext.webError`] event.

```js
// Log all uncaught errors to the terminal
context.on('weberror', webError => {
  console.log(`Uncaught exception: "${webError.error()}"`);
});

// Navigate to a page with an exception.
await page.goto('data:text/html,<script>throw new Error("Test")</script>');
```

```java
// Log all uncaught errors to the terminal
context.onWebError(webError -> {
  System.out.println("Uncaught exception: " + webError.error());
});

// Navigate to a page with an exception.
page.navigate("data:text/html,<script>throw new Error('Test')</script>");
```

```python
# Log all uncaught errors to the terminal
context.on("weberror", lambda web_error: print(f"uncaught exception: {web_error.error}"))

# Navigate to a page with an exception.
await page.goto("data:text/html,<script>throw new Error('test')</script>")
```

```python
# Log all uncaught errors to the terminal
context.on("weberror", lambda web_error: print(f"uncaught exception: {web_error.error}"))

# Navigate to a page with an exception.
page.goto("data:text/html,<script>throw new Error('test')</script>")
```

```csharp
// Log all uncaught errors to the terminal
context.WebError += (_, webError) =>
{
  Console.WriteLine("Uncaught exception: " + webError.Error);
};
```

## method: WebError.page
* since: v1.38
- returns: <[null]|[Page]>

The page that produced this unhandled exception, if any.

## method: WebError.error
* since: v1.38
- returns: <[Error]>

Unhandled error that was thrown.

## method: WebError.error
* since: v1.38
* langs: java, csharp
- returns: <[string]>

Unhandled error that was thrown.

## method: WebError.location
* since: v1.60
- returns: "WebErrorLocation" <[Object]>
  - `url` <[string]> URL of the resource.
  - `line` <[int]> 0-based line number in the resource.
  - `column` <[int]> 0-based column number in the resource.
