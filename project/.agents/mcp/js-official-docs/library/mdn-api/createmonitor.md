---
title: "CreateMonitor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/createmonitor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CreateMonitor

The **`CreateMonitor`** interface provides information on the progress of an AI model download, for example a language pack or some fine-tuning data.

It can be used via:

- `LanguageDetector.create()`
- `LanguageModel.create()`
- `Summarizer.create()`
- `Translator.create()`

## Events

_Inherits events from its parent, `EventTarget`._

- `downloadprogress` (experimental)
    Fired when progress is made on the AI model download.

## Examples

### Basic `CreateMonitor` usage

A `CreateMonitor` instance is used via the `monitor` property of an AI API's `create()` method (`Summarizer.create()` is shown below). The `monitor` property takes a callback function as a value, the argument of which is the `CreateMonitor` instance. You can then monitor download progress via the instance's `downloadprogress` event.

```js
const summarizer = await Summarizer.create({
  sharedContext:
    "A general summary to help a user decide if the text is worth reading",
  monitor(monitor) {
    monitor.addEventListener("downloadprogress", (e) => {
      console.log(`download progress: ${e.loaded}/${e.total}`);
    });
  },
});

const summary = await summarizer.summarize(myText);
```

## See also

- Using the Prompt API
- Using the Summarizer API
- Using the Translator and Language Detector APIs
- Web AI demos on chrome.dev.
