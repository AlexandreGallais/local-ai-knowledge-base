---
title: "PluginArray"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pluginarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PluginArray

The `PluginArray` interface is used to store a list of `Plugin` objects; it's returned by the `navigator.plugins` property. The `PluginArray` is not a JavaScript array, but has the `length` property and supports accessing individual items using bracket notation (`plugins[2]`), as well as via `item(index)` and `namedItem("name")` methods.

> **Note:**
> Own properties of `PluginArray` objects are no longer enumerable in the latest browser versions.

## Instance properties

- `PluginArray.length` (read-only) (deprecated)
    The number of plugins in the array.

## Instance methods

- `PluginArray.item` (deprecated)
    Returns the `Plugin` at the specified index into the array.
- `PluginArray.namedItem` (deprecated)
    Returns the `Plugin` with the specified name.
- `PluginArray.refresh` (deprecated)
    Refreshes all plugins on the current page, optionally reloading documents.

## Examples

The following example function returns the version of the Shockwave Flash plugin.

```js
const pluginsLength = navigator.plugins.length;

document.body.innerHTML =
  `${pluginsLength} Plugin(s)<br>` +
  `<table id="pluginTable"><thead>` +
  `<tr><th>Name</th><th>Filename</th><th>description</th><th>version</th></tr>` +
  `</thead><tbody></tbody></table>`;

const table = document.getElementById("pluginTable");

for (let i = 0; i < pluginsLength; i++) {
  let newRow = table.insertRow();
  newRow.insertCell().textContent = navigator.plugins[i].name;
  newRow.insertCell().textContent = navigator.plugins[i].filename;
  newRow.insertCell().textContent = navigator.plugins[i].description;
  newRow.insertCell().textContent = navigator.plugins[i].version ?? "";
}
```

The following example displays information about the installed plugin(s).

```js
const pluginsLength = navigator.plugins.length;

document.write(
  `${pluginsLength.toString()} Plugin(s)<br>` +
    `Name | Filename | description<br>`,
);

for (let i = 0; i < pluginsLength; i++) {
  document.write(
    `${navigator.plugins[i].name} | ${navigator.plugins[i].filename} | ${navigator.plugins[i].description} | ${navigator.plugins[i].version}<br>`,
  );
}
```

## Browser compatibility

In addition to listing each plugin as a pseudo-array by zero-indexed numeric properties, Firefox provides properties that are the plugin name directly on the PluginArray object.
