---
title: "ContentIndex"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contentindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContentIndex

The **`ContentIndex`** interface of the Content Index API allows developers to register their offline enabled content with the browser.

## Instance properties

There are no properties of this interface.

## Instance methods

- `ContentIndex.add()` (experimental)
    Registers an item with the content index.
- `ContentIndex.delete()` (experimental)
    Unregisters an item from the currently indexed content.
- `ContentIndex.getAll()` (experimental)
    Returns a `Promise` that resolves with an iterable list of content index entries.

## Examples

### Feature detection and interface access

Here we get a reference to the `ServiceWorkerRegistration`, then check for the `index` property, which gives us access to the content index interface.

```js
// reference registration
const registration = await navigator.serviceWorker.ready;

// feature detection
if ("index" in registration) {
  // Content Index API functionality
  const contentIndex = registration.index;
}
```

### Adding to the content index

Here we're declaring an item in the correct format and creating an asynchronous function which uses the `add()` method to register it with the content index.

```js
// our content
const item = {
  id: "post-1",
  url: "/posts/amet.html",
  title: "Amet consectetur adipisicing",
  description:
    "Repellat et quia iste possimus ducimus aliquid a aut eaque nostrum.",
  icons: [
    {
      src: "/media/dark.png",
      sizes: "128x128",
      type: "image/png",
    },
  ],
  category: "article",
};

// our asynchronous function to add indexed content
async function registerContent(data) {
  const registration = await navigator.serviceWorker.ready;

  // feature detect Content Index
  if (!registration.index) {
    return;
  }

  // register content
  try {
    await registration.index.add(data);
  } catch (e) {
    console.log("Failed to register content: ", e.message);
  }
}
```

### Retrieving items within the current index

The below example shows an asynchronous function that retrieves items within the content index and iterates over each entry, building a list for the interface.

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

### Unregistering indexed content

Below is an asynchronous function, that removes an item from the content index.

```js
async function unregisterContent(article) {
  // reference registration
  const registration = await navigator.serviceWorker.ready;

  // feature detect Content Index
  if (!registration.index) return;

  // unregister content from index
  await registration.index.delete(article.id);
}
```

All the above methods are available within the scope of the service worker. They are accessible from the `WorkerGlobalScope.self` property:

```js
// service worker script

self.registration.index.add(item);

self.registration.index.delete(item.id);

const contentIndexItems = self.registration.index.getAll();
```

## See also

- An introductory article on the Content Index API
- Service Worker API, along with information about Cache and CacheStorage
