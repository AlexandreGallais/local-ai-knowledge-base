---
title: "Using the Translator and Language Detector APIs (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/translator_and_language_detector_apis/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Translator and Language Detector APIs

The Translator and Language Detector APIs provide asynchronous (`Promise`-based) mechanisms for a website to detect languages and translate text via the browser's own internal AI model. This is useful and efficient because the browser handles the service, rather than the developer having to rely on the user downloading AI models, or host or pay for a cloud-based translation service.
This article explains how to use these APIs.

## Detecting a language

All of the language detection functionality is accessed through the `LanguageDetector` interface.

The first step in getting the AI model to detect a language is to create a `LanguageDetector` object instance. This is done using the `LanguageDetector.create()` static method, which takes an options object as an argument:

```js
const detector = await LanguageDetector.create({
  expectedInputLanguages: ["en-US", "zh"],
});
```

The `expectedInputLanguages` property specifies the languages you are expecting to feed into the detector, to help improve the accuracy of the language detection.

> **Note:**
> Different implementations will likely support different languages.

When you've created a `LanguageDetector` instance, you can use it to detect a language by calling the `LanguageDetector.detect()` instance method on it, passing it the text to check as an argument.

```js
const results = await detector.detect(myTextString);
```

This method returns an array of objects representing the detected potential language matches.
Each one contains:

- A string containing a BCP 47 language tag representing the detected language.
- A number between 0 and 1 representing a confidence score for that match.

So for example:

```js
results.forEach((result) => {
  console.log(`${result.detectedLanguage}: ${result.confidence}`);
});

// Results in logs like this:
// la: 0.8359838724136353
// es: 0.017705978825688362
// sv: 0.012977192178368568
// en: 0.011148443445563316
// und: 0.0003214875760022551
```

> **Note:**
> The last array element always represents a confidence score for the `und` language — this is an abbreviation of "undetermined", and represents the probability that the text is not written in a language the model knows.

## Creating a translation

Translation follows a very similar pattern to language detection. A `Translator` object instance is created using the `Translator.create()` static method, which takes an options object that must contain at least a `sourceLanguage` and `targetLanguage`:

```js
const translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "ja",
});
```

The translation is then created by calling the `Translator.translate()` instance method, which is passed the text string to translate as an argument:

```js
const translation = await translator.translate(myTextString);
```

This returns a string containing the translation.

There is also a streaming version of the `translate()` method available — `Translator.translateStreaming()` — that allows you to return the translation as a `ReadableStream`. This can be useful when translating very large bodies of text:

```js
const stream = translator.translateStreaming(myTextString);
let translation = "";

for await (const chunk of stream) {
  translation += chunk;
}

console.log("Stream complete");
console.log(translation);
```

## Checking configuration support

Before creating a `LanguageDetector` or `Translator` object, you can check whether your desired language configuration is supported by the current browser using the `LanguageDetector.availability()` and `Translator.availability()` static methods. For example:

```js
const detectorAvailability = await LanguageDetector.availability({
  expectedInputLanguages: ["en-US", "ja"],
});

const translatorAvailability = await Translator.availability({
  sourceLanguage: "en",
  targetLanguage: "ja",
});
```

These methods return an enumerated value indicating whether support is, or will be available for the specified set of options:

- `downloadable` means that the implementation supports the requested options, but needs to download a model or some fine-tuning data.
- `downloading` means that the implementation supports the requested options, but needs to finish an ongoing download.
- `available` means that the implementation supports the requested options without requiring any new downloads.
- `unavailable` means that the implementation doesn't support the requested options.

If a download is required, it will be started automatically by the browser once a `LanguageDetector` or `Translator` instance is created using the relevant `create()` method. You can track download progress automatically using a monitor.

## Canceling operations and destroying instances

You can cancel a pending detection or translation operation using an `AbortController`, with the associated `AbortSignal` being included inside the method options object as a `signal` property value. For example, aborting a `Translator.create()` operation would look like this:

```js
const controller = new AbortController();

const translator = await Translator.create({
  sourceLanguage: detectedLanguage,
  targetLanguage: formData.get("translateLanguage"),
  signal: controller.signal,
});

// ...

controller.abort();
```

After a `LanguageDetector` or `Translator` instance has been created, you can release its assigned resources and stop any further activity by calling its `LanguageDetector.destroy()`/`Translator.destroy()` method. You are encouraged to do this after you've finished with the object as it can consume a lot of resources.

```js
translator.destroy();
detector.destroy();
```

If a `create()` call has an associated `AbortController`, and you call its `AbortController.abort()` method after the `create()` call has succeeded, it will have the same effect as calling `destroy()` on the resulting `LanguageDetector` or `Translator` object.

## Monitoring download progress

If the AI model for a particular detection or translation is downloading (`availability()` returns `downloadable` and `downloading`), it is helpful to provide the user with feedback to tell them how long they need to wait before the operation completes.

The `Translator` and `LanguageDetector` `create()` methods can accept a `monitor` property, the value of which is a callback function that takes a `CreateMonitor` instance as an argument. `CreateMonitor` has a `downloadprogress` event available, which fires when progress is made on downloading the AI model.

You can use this event to expose loading progress data:

```js
translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "ja",
  monitor(monitor) {
    monitor.addEventListener("downloadprogress", (e) => {
      console.log(`Downloaded ${Math.floor(e.loaded * 100)}%`);
    });
  },
});
```

If the specified languages are not supported, a download will not be initiated, and a `NotSupportedError` `DOMException` will be thrown.

## Usage quotas

Some implementations have an input quota that governs how many operations a website can request in a given period. The total quota can be accessed via the `Translator.inputQuota`/`LanguageDetector.inputQuota` properties, while the quota usage for a particular translation or language detection can be returned using the `Translator.measureInputUsage()`/`LanguageDetector.measureInputUsage()` methods:

For example, the below snippet returns the total input quota via `Translator.inputQuota` and the input quota usage for a translating a particular text string via `Translator.measureInputUsage()`.

We then test to see if the individual input usage for that string is greater than the total available quota. If so, we throw an appropriate error; it not, we commence translating the string using `translate()`.

```js
const translator = await Translator.create({
  sourceLanguage: "en",
  targetLanguage: "ja",
});

const totalInputQuota = translator.inputQuota;
const inputUsage = await translator.measureInputUsage(myTextString);

if (inputUsage > totalInputQuota) {
  throw new Error("Insufficient quota to translate.");
} else {
  console.log("Quota available to translate.");
  const translation = await translator.translate(myTextString);
  // ...
}
```

If you try to run a language detection or translation operation that exceeds the available quota, a `QuotaExceededError` `DOMException` will be thrown.
