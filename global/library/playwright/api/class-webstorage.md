---
title: "class: WebStorage"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-webstorage.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: WebStorage
* since: v1.61

WebStorage exposes the page's `localStorage` or `sessionStorage` for the current origin via an async,
browser-consistent API.

Instances are accessed through [`property: Page.localStorage`] and [`property: Page.sessionStorage`].

```js
await page.goto('https://example.com');
await page.localStorage.setItem('<example-value>', '<example-value>');
const token = await page.localStorage.getItem('<example-value>');
const all = await page.localStorage.items();
await page.localStorage.removeItem('<example-value>');
await page.localStorage.clear();
```

```python
await page.goto("https://example.com")
await page.local_storage.set_item("<example-value>", "<example-value>")
token = await page.local_storage.get_item("<example-value>")
all = await page.local_storage.items()
await page.local_storage.remove_item("<example-value>")
await page.local_storage.clear()
```

```python
page.goto("https://example.com")
page.local_storage.set_item("<example-value>", "<example-value>")
token = page.local_storage.get_item("<example-value>")
all = page.local_storage.items()
page.local_storage.remove_item("<example-value>")
page.local_storage.clear()
```

```java
page.navigate("https://example.com");
page.localStorage().setItem("<example-value>", "<example-value>");
String token = page.localStorage().getItem("<example-value>");
List<WebStorageItem> all = page.localStorage().items();
page.localStorage().removeItem("<example-value>");
page.localStorage().clear();
```

```csharp
await page.GotoAsync("https://example.com");
await page.LocalStorage.SetItemAsync("<example-value>", "<example-value>");
var token = await page.LocalStorage.GetItemAsync("<example-value>");
var all = await page.LocalStorage.ItemsAsync();
await page.LocalStorage.RemoveItemAsync("<example-value>");
await page.LocalStorage.ClearAsync();
```

## async method: WebStorage.items
* since: v1.61
- returns: "WebStorageItem" <[Array]<[Object]>>
  - `name` <[string]>
  - `value` <[string]>

Returns all items in the storage as name/value pairs.

## async method: WebStorage.getItem
* since: v1.61
- returns: <[null]|[string]>

Returns the value for the given [`param: WebStorage.getItem.name`] if present.

### param: WebStorage.getItem.name
* since: v1.61
- `name` <[string]>

Name of the item to retrieve.

## async method: WebStorage.setItem
* since: v1.61

Sets the value for the given [`param: WebStorage.setItem.name`]. Overwrites any existing value for that name.

### param: WebStorage.setItem.name
* since: v1.61
- `name` <[string]>

Name of the item to set.

### param: WebStorage.setItem.value
* since: v1.61
- `value` <[string]>

New value for the item.

## async method: WebStorage.removeItem
* since: v1.61

Removes the item with the given [`param: WebStorage.removeItem.name`]. No-op if the item is absent.

### param: WebStorage.removeItem.name
* since: v1.61
- `name` <[string]>

Name of the item to remove.

## async method: WebStorage.clear
* since: v1.61

Removes all items from the storage.
