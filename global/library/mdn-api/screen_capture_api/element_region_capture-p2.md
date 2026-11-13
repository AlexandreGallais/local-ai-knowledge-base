---
title: "Using the Element Capture and Region Capture APIs (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen_capture_api/element_region_capture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Element Capture and Region Capture APIs (part 2 of 2)

## Taking a screenshot

To save a still screenshot without displaying a video, use `ImageCapture.grabFrame()` to obtain an `ImageBitmap` directly from the captured track. You can draw this bitmap to a canvas and encode it as a PNG using `HTMLCanvasElement.toBlob()`.

The following variation uses Element Capture to take a screenshot of the `demo` element when the user clicks a button. It requires support for both Element Capture and `ImageCapture.grabFrame()`. It uses the same `#demo` CSS from Restrictions on the Element Capture API.

```html
<button id="screenshot">Save screenshot</button>
<a id="download" download="screenshot.png" hidden>Download screenshot</a>
<div id="demo">
  <h2>Some kind of demo</h2>
  <p>This is the content to capture.</p>
</div>
```

The click handler requests screen-sharing permission, restricts the track to the target element, and grabs one frame. The `finally` block stops sharing and releases the bitmap even if an error occurs.

```js
const screenshotElem = document.getElementById("screenshot");
const downloadElem = document.getElementById("download");
const demoElem = document.getElementById("demo");
let screenshotURL;

screenshotElem.addEventListener("click", async () => {
  screenshotElem.disabled = true;
  let stream;
  let bitmap;

  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
      preferCurrentTab: true,
    });
    const [track] = stream.getVideoTracks();
    const restrictionTarget = await RestrictionTarget.fromElement(demoElem);
    await track.restrictTo(restrictionTarget);
    bitmap = await new ImageCapture(track).grabFrame();

    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext("2d").drawImage(bitmap, 0, 0);
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });
    if (!blob) {
      throw new Error("Could not create the screenshot.");
    }

    if (screenshotURL) {
      URL.revokeObjectURL(screenshotURL);
    }
    screenshotURL = URL.createObjectURL(blob);
    downloadElem.href = screenshotURL;
    downloadElem.hidden = false;
    downloadElem.click();
  } catch (err) {
    console.error(err);
  } finally {
    stream?.getTracks().forEach((track) => track.stop());
    bitmap?.close();
    screenshotElem.disabled = false;
  }
});
```

See the demo at Element Capture screenshot example (also see the source code). Click **Save screenshot** and select the tab containing the example in the browser's sharing dialog. Once the PNG is ready, the code initiates its download. The download link also remains available to save the image again. Its blob URL is retained until another screenshot replaces it.

To use Region Capture instead, replace the `RestrictionTarget.fromElement()` and `restrictTo()` calls with:

```js
const cropTarget = await CropTarget.fromElement(demoElem);
await track.cropTo(cropTarget);
```

## See also

- Capture a video stream from any element on developer.chrome.com (2025)
- Better tab sharing with Region Capture on developer.chrome.com (2023)
