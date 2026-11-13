---
title: "MediaError: code property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediaerror/code/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaError: code property

The read-only property **`MediaError.code`** returns a numeric
value which represents the kind of error that occurred on a media element. To get a text
string with specific diagnostic information, see `MediaError.message`.

## Value

A numeric value indicating the general type of error which occurred. The possible
values are described below, in Media error code constants.

### Media error code constants

       | Name
       | Value
       | Description

       | `MEDIA_ERR_ABORTED`
       | `1`
       |
        The fetching of the associated resource was aborted by the user's
        request.

       | `MEDIA_ERR_NETWORK`
       | `2`
       |
        Some kind of network error occurred which prevented the media from being
        successfully fetched, despite having previously been available.

       | `MEDIA_ERR_DECODE`
       | `3`
       |
        Despite having previously been determined to be usable, an error
        occurred while trying to decode the media resource, resulting in an
        error.

       | `MEDIA_ERR_SRC_NOT_SUPPORTED`
       | `4`
       |
        The associated resource or media provider object (such as a
        `MediaStream`) has been found to be unsuitable.

## Examples

This example creates a `` element, establishes an error handler
for it, and then sets the element's `src` attribute to the
video resource to present in the element. The error handler outputs a message

```js
const obj = document.createElement("video");
obj.onerror = () => {
  console.error(`Error with media: ${obj.error.code}`);
};
obj.src = "https://example.com/blahblah.mp4";
```

## See also

- `MediaError`: Interface used to define the `MediaError.code` property
