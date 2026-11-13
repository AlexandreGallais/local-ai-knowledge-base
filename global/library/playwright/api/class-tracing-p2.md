---
title: "class: Tracing (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-tracing.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Tracing (part 2 of 2)

## async method: Tracing.group
* since: v1.49
- returns: <[Disposable]>

:::caution
Use `test.step` instead when available.
:::

Creates a new group within the trace, assigning any subsequent API calls to this group, until [`method: Tracing.groupEnd`] is called. Groups can be nested and will be visible in the trace viewer.

**Usage**

```js
// use test.step instead
await test.step('Log in', async () => {
  // ...
});
```

```java
// All actions between group and groupEnd
// will be shown in the trace viewer as a group.
page.context().tracing().group("Open Playwright.dev > API");
page.navigate("https://playwright.dev/");
page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("API")).click();
page.context().tracing().groupEnd();
```

```python
# All actions between group and group_end
# will be shown in the trace viewer as a group.
page.context.tracing.group("Open Playwright.dev > API")
page.goto("https://playwright.dev/")
page.get_by_role("link", name="API").click()
page.context.tracing.group_end()
```

```python
# All actions between group and group_end
# will be shown in the trace viewer as a group.
await page.context.tracing.group("Open Playwright.dev > API")
await page.goto("https://playwright.dev/")
await page.get_by_role("link", name="API").click()
await page.context.tracing.group_end()
```

```csharp
// All actions between GroupAsync and GroupEndAsync
// will be shown in the trace viewer as a group.
await Page.Context.Tracing.GroupAsync("Open Playwright.dev > API");
await Page.GotoAsync("https://playwright.dev/");
await Page.GetByRole(AriaRole.Link, new() { Name = "API" }).ClickAsync();
await Page.Context.Tracing.GroupEndAsync();
```

### param: Tracing.group.name
* since: v1.49
- `name` <[string]>

Group name shown in the trace viewer.

### option: Tracing.group.location
* since: v1.49
- `location` "Location" ?<[Object]>
  - `file` <[string]>
  - `line` ?<[int]>
  - `column` ?<[int]>

Specifies a custom location for the group to be shown in the trace viewer. Defaults to the location of the [`method: Tracing.group`] call.

## async method: Tracing.groupEnd
* since: v1.49

Closes the last group created by [`method: Tracing.group`].

## async method: Tracing.stop
* since: v1.12

Stop tracing.

### option: Tracing.stop.path
* since: v1.12
- `path` <[path]>

Export trace into the file with the given path.

## async method: Tracing.stopChunk
* since: v1.15

Stop the trace chunk. See [`method: Tracing.startChunk`] for more details about multiple trace chunks.

### option: Tracing.stopChunk.path
* since: v1.15
- `path` <[path]>

Export trace collected since the last [`method: Tracing.startChunk`] call into the file with the given path.

## async method: Tracing.stopHar
* since: v1.60

Stop HAR recording and save the HAR file to the path given to [`method: Tracing.startHar`].
