---
title: "Document: browsingTopics() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/browsingtopics/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: browsingTopics() method

> **Warning:**
> This feature is currently opposed by two browser vendors. See the Standards positions section below for details of opposition.

> **Note:**
> An Enrollment process is required to use this feature in your applications.

The `browsingTopics()` method of the `Document` interface returns a promise that fulfills with an array of objects representing the top topics for the user, one from each of the last three epochs. These topics could then be returned to the ad tech platform in a subsequent fetch request. By default, the method also causes the browser to record the current page visit as observed by the caller, so the page's hostname can later be used in topics calculation.

> **Note:**
> `browsingTopics()` does not rely on HTTP headers to send topics and mark topics as observed like the other Topics API enabling features, but it is somewhat less performant. You are advised to use one of the HTTP header-using features, falling back to `browsingTopics()` only in situations where the headers cannot be modified.

## Syntax

```js
browsingTopics()
browsingTopics(options)
```

### Parameters

- `options` (optional)
    An options object, which can contain the following properties:
    - `skipObservation`
        A boolean value that, if set to `true`, causes the browser to _not_ observe topics when `browsingTopics()` is invoked. The default is `false`, which causes topics to be observed.

### Return value

A `Promise` that fulfills with an array of up to three objects representing the current user's selected topics for the last three epochs. Each object contains the following properties:

- `configVersion`
    A string identifying the algorithm (other than the model part) used to calculate the topic.
- `modelVersion`
    A string representing the model used to classify a string (such as a web page's hostname) into topic IDs.
- `taxonomyVersion`
    A string representing the taxonomy version used.
- `topic`
    A number representing the ID of the topic, which can be used by the browser to retrieve the topic from the taxonomy (see an example taxonomy of interests).
- `version`
    The `configVersion`, `modelVersion`, and `taxonomyVersion`, concatenated with colons (`:`) between each.

The exact property values may vary by browser implementation. An example object from Chrome might look as follows:

```json
{
  "configVersion": "chrome.1",
  "modelVersion": "1",
  "taxonomyVersion": "1",
  "topic": 43,
  "version": "chrome.1:1:1"
}
```

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if:
    - Usage of the Topics API is disallowed by a `browsing-topics` Permissions Policy.
    - The calling site does not have the Topics API included in a successful privacy sandbox enrollment process.

## Examples

```js
// Get an array of top topics for this user
const topics = await document.browsingTopics();

// Request an ad creative
const response = await fetch("https://ads.example/get-creative", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(topics),
});

// Get the JSON from the response
const creative = await response.json();

// Display ad
```

## Specifications

This feature is not part of an official standard, although it is specified in the Topics API Unofficial Proposal Draft.

## See also

- Topics API
