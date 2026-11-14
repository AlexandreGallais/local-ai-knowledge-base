---
title: "Response: bodyUsed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/bodyused/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: bodyUsed property

The **`bodyUsed`** read-only property of the `Response` interface is a boolean value that indicates whether the body has been read yet.

## Value

A boolean value.

## Examples

### Checking `bodyUsed`

This example illustrates that reading the body of a response changes the value of `bodyUsed` from `false` to `true`.

The example contains an empty image.

When the example's JavaScript runs, we fetch an image and assigns the returned promise to a variable `responsePromise`.

When the user clicks "Use response", we check whether the response has been used already. If it has, we print a message. If it has not, we read the response body and used it to provide a value for the image's `src` attribute.

#### HTML

```html
<p><button id="use">Use response</button> <button id="reset">Reset</button></p>
<p><img id="my-image" src="" width="150" /></p>
<pre id="log"></pre>
```

#### JavaScript

```js
const useResponse = document.querySelector("#use");
const reset = document.querySelector("#reset");
const myImage = document.querySelector("#my-image");
const log = document.querySelector("#log");

const responsePromise = fetch(
  "/shared-assets/images/examples/firefox-logo.svg",
);

useResponse.addEventListener("click", async () => {
  const response = await responsePromise;
  if (response.bodyUsed) {
    log.textContent = "Body has already been used!";
  } else {
    const result = await response.blob();
    const objectURL = URL.createObjectURL(result);
    myImage.src = objectURL;
  }
});

reset.addEventListener("click", () => {
  document.location.reload();
});
```

#### Result

Initially there is no value for the image. If you click "Use response" once, then `bodyUsed` is `false`, so we read the response and set the image. If you then click "Use response" again, then `bodyUsed` is `true`, and we print the message.

Click "Reset" to reload the example, so you can try again.

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
