---
title: "ContentIndex: getAll() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contentindex/getall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContentIndex: getAll() method

The **`getAll()`** method of the
`ContentIndex` interface returns a `Promise` that resolves with
an iterable list of content index entries.

## Syntax

```js
getAll()
```

### Parameters

None.

### Return value

Returns a `Promise` that resolves with an `Array` of
`contentDescription` items.

- `contentDescription`
    Each item returned is an `Object` containing the following data:
    - `id`
        A unique `String` identifier.
    - `title`
        A `String` title of the item.
        Used in user-visible lists of content.
    - `description`
        A `String` description of the item.
        Used in user-visible lists of content.
    - `url`
        A `String` containing the URL of the corresponding HTML document.
        Needs to be under the scope of the current service worker.
    - `category` (optional)
        A `String` defining the category of content.
        Can be:
        - `''` An empty `String`, this is the default.
        - `homepage`
        - `article`
        - `video`
        - `audio`

    - `icons` (optional)
        An `Array` of image resources, defined as an `Object` with the following data:
        - `src`
            A URL `String` of the source image.
        - `sizes` (optional)
            A `String` representation of the image size.
        - `type` (optional)
            The MIME type of the image.
        - `label` (optional)
            A string representing the accessible name of the icon.

### Exceptions

No exceptions are thrown. If there are no items in the Content Index, an empty
`Array` is returned.

## Examples

The below example shows an asynchronous function that retrieves items within the
content index and iterates over each entry, building
a list for the interface.

```js
async function createReadingList() {
  // access our service worker registration
  const registration = await navigator.serviceWorker.ready;

  // get our index entries
  const entries = await registration.index.getAll();

  // create a containing element
  const readingListElem = document.createElement("div");

  // test for entries
  if (entries.length === 0) {
    // if there are no entries, display a message
    const message = document.createElement("p");
    message.innerText =
      "You currently have no articles saved for offline reading.";

    readingListElem.append(message);
  } else {
    // if entries are present, display in a list of links to the content
    const listElem = document.createElement("ul");

    for (const entry of entries) {
      const listItem = document.createElement("li");

      const anchorElem = document.createElement("a");
      anchorElem.innerText = entry.title;
      anchorElem.setAttribute("href", entry.url);

      listElem.append(listItem);
    }

    readingListElem.append(listElem);
  }
}
```

## See also

- An introductory article on the Content Index API
- Service Worker API, along with information about Cache and CacheStorage
