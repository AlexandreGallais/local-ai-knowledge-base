---
title: "FencedFrameConfig"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fencedframeconfig/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FencedFrameConfig

The **`FencedFrameConfig`** interface represents the navigation of a `<fencedframe>`, i.e., what content will be displayed in it.

`FencedFrameConfig` objects cannot be constructed manually via JavaScript. They are returned from a source such as the Protected Audience API and set as the value of `HTMLFencedFrameElement.config`.

A `FencedFrameConfig` object instance has an exposed method, but it also maps to internal config information containing opaque properties not accessible from JavaScript. This includes information such as the source of the loaded content and interest groups for advertising purposes. It is key to how fenced frames help to implement key use cases while respecting user privacy.

## Instance methods

- `setSharedStorageContext()` (deprecated)
    Passes in data from the embedding document to the `<fencedframe>`'s shared storage.

## Examples

### Basic usage

To set what content will be shown in a `<fencedframe>`, a utilizing API (such as Protected Audience or Shared Storage) generates a `FencedFrameConfig` object, which is then set as the value of the `<fencedframe>`'s `config` property.

The following example gets a `FencedFrameConfig` from a Protected Audience API's ad auction, which is then used to display the winning ad in a `<fencedframe>`:

```js
const frameConfig = await navigator.runAdAuction({
  // … auction configuration
  resolveToConfig: true,
});

const frame = document.createElement("fencedframe");
frame.config = frameConfig;
```

> **Note:**
> `resolveToConfig: true` must be passed in to the `runAdAuction()` call to obtain a `FencedFrameConfig` object. If it is not set, the resulting `Promise` will resolve to a URN that can only be used in an ``.

### Passing contextual data via `setSharedStorageContext()`

You can use the Private Aggregation API to create reports that combine event-level data inside fenced frames with contextual data from the embedding document. `setSharedStorageContext()` can be used to pass <example-value> data from the embedder to shared storage worklets initiated by the Protected Audience API.

In the following example, we store data from both the embedding page and the fenced frame in shared storage.

In the embedding page, we will set a mock event ID as the shared storage context using `setSharedStorageContext()`:

```js
const frameConfig = await navigator.runAdAuction({ resolveToConfig: true });

// Data from the embedder that you want to pass to the shared storage worklet
frameConfig.setSharedStorageContext("some-event-id");

const frame = document.createElement("fencedframe");
frame.config = frameConfig;
```

Inside the fenced frame, we add the worklet module with `window.sharedStorage.worklet.addModule()`, and then send the event-level data into the shared storage worklet using `window.sharedStorage.run()` (this is unrelated to the contextual data from the embedding document):

```js
const frameData = {
  // Data available only inside the fenced frame
};

await window.sharedStorage.worklet.addModule("reporting-worklet.js");

await window.sharedStorage.run("send-report", {
  data: {
    frameData,
  },
});
```

In the `reporting-worklet.js` worklet, we read the embedding document's event ID from `sharedStorage.context` and the frame's event-level data from the data object, then report them through Private Aggregation:

```js
class ReportingOperation {
  convertEventIdToBucket(eventId) {
    // …
  }
  convertEventPayloadToValue(info) {
    // …
  }

  async run(data) {
    // Data from the embedder
    const eventId = sharedStorage.context;

    // Data from the fenced frame
    const eventPayload = data.frameData;

    privateAggregation.sendHistogramReport({
      bucket: convertEventIdToBucket(eventId),
      value: convertEventPayloadToValue(eventPayload),
    });
  }
}

register("send-report", ReportingOperation);
```

## See also

- Fenced frames on privacysandbox.google.com
- The Privacy Sandbox on privacysandbox.google.com
