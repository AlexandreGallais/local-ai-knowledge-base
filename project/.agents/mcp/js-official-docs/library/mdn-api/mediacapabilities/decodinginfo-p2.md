---
title: "MediaCapabilities: decodingInfo() method (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediacapabilities/decodinginfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaCapabilities: decodingInfo() method (part 2 of 2)

## Examples

### Getting decoding information for unencrypted media files

This example shows how to create a media configuration for an audio file and then use it in `MediaCapabilities.decodingInfo()`.

```css
#log {
  height: 100px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```html
<pre id="log"></pre>
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

```js
// Create media configuration to be tested
const audioConfig = {
  type: "file", // or 'media-source' or 'webrtc'
  audio: {
    contentType: "audio/ogg; codecs=vorbis", // valid content type
    channels: 2, // audio channels used by the track
    bitrate: 132700, // number of bits used to encode 1s of audio
    samplerate: 5200, // number of audio samples making up that 1s.
  },
};

// check support and performance
navigator.mediaCapabilities.decodingInfo(audioConfig).then((result) => {
  if (result.supported) {
    log(
      `The audio configuration is supported${result.smooth ? ", smooth" : ", not smooth"}${result.powerEfficient ? ", power efficient" : ", not power efficient"}.`,
    );
  } else {
    log("The audio configuration is not supported");
  }
});
```

Similarly, the code below shows the configuration for a video file.

```js
const videoConfig = {
  type: "file",
  video: {
    contentType: "video/webm;codecs=vp8", // valid content type
    width: 800, // width of the video
    height: 600, // height of the video
    bitrate: 10000, // number of bits used to encode 1s of video
    framerate: 30, // number of frames making up that 1s.
  },
};

// check support and performance
navigator.mediaCapabilities.decodingInfo(videoConfig).then((result) => {
  if (result.supported) {
    log(
      `The video configuration is supported${result.smooth ? ", smooth" : ", not smooth"}${result.powerEfficient ? ", power efficient" : ", not power efficient"}.`,
    );
  } else {
    log("The video configuration is not supported");
  }
});
```

### Getting decoding information for encrypted media

This example shows how you might use `decodingInfo()` to select a media configuration for encrypted content.

As in the previous example we define a media configuration, but this time we use the `type` of `media-source` (rather than `file`), and specify both audio and video content.
We also specify a simple `keySystemConfiguration`.

```css
#log {
  height: 100px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```html
<pre id="log"></pre>
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

```js
const encryptedMediaConfig = {
  type: "media-source", // or 'file'
  audio: {
    contentType: "audio/webm; codecs=opus",
    channels: 2, // audio channels used by the track
    bitrate: 132700, // number of bits used to encode 1s of audio
    samplerate: 48000, // number of audio samples making up that 1s.
  },
  video: {
    contentType: 'video/webm; codecs="vp09.00.10.08"',
    width: 800, // width of the video
    height: 600, // height of the video
    bitrate: 10000, // number of bits used to encode 1s of video
    framerate: 30, // number of frames making up that 1s.
  },
  keySystemConfiguration: {
    keySystem: "org.w3.clearkey",
    initDataType: "webm",
    distinctiveIdentifier: "required",
  },
};
```

In the previous example we used promise chaining, to wait on the result.
Here we've chosen to use `async` and `await` to wait on the result, and then log it.

```js
getDecodingInfo(encryptedMediaConfig);

async function getDecodingInfo(mediaConfig) {
  const result = await navigator.mediaCapabilities.decodingInfo(mediaConfig);
  console.log(result);
  if (!result.supported) {
    log("This encrypted media configuration is not supported.");
    return;
  }

  // keySystemAccess is returned if decoding encrypted media is supported
  // This can be used to decrypt and playback the media
  if (!result.keySystemAccess) {
    log("Encrypted media support is not available.");
    return;
  }

  log(
    `The encrypted media configuration is supported${result.smooth ? ", smooth" : ", not smooth"}${result.powerEfficient ? ", power efficient" : ", not power efficient"}.`,
  );
}
```

The log output is shown below.

### Iterating through decoding information for encrypted media

The previous example showed how you can use `decodingInfo()` to get information for just one configuration.
In reality the method would normally be called iteratively with a number of configurations, selecting the first supported configuration that matches the application's criteria for smooth playing or power efficiency.
The way this works is described below.

Assuming we already have an `Array` of media configurations named `orderedMediaConfigs`, which we have ordered from most to least wanted, we can use the `Array.prototype.map()` to call `decodingInfo()` for each configuration and get an array containing all the returned `Promise` objects.

```js
const capabilitiesPromises = orderedMediaConfigs.map((mediaConfig) =>
  navigator.mediaCapabilities.decodingInfo(mediaConfig),
);
```

We then use a `for await...of` loop to iterate the promises as they resolve.
In the loop we store the last supported configuration to `nonSmoothConfig`, and we exit the loop as soon as we find a smooth configuration, setting this as our `bestConfig`.

```js
// Assume this app wants a supported && smooth config.
let bestConfig = null;
let nonSmoothConfig = null;
for await (const mediaCapabilityInfo of capabilitiesPromises) {
  if (!mediaCapabilityInfo.supported) continue;

  if (!mediaCapabilityInfo.smooth) {
    nonSmoothConfig = mediaCapabilityInfo;
    continue;
  }

  bestConfig = mediaCapabilityInfo;
  break;
}
```

If we found a smooth and supported configuration while looping (`bestConfig`) we use it to create our media keys and decode the media.
If we didn't discover any smooth configurations we might instead use `nonSmoothConfig` to decode the media.
This will be the supported configuration that was found last, which because of the way we ordered the original `orderedMediaConfigs`, should be the one with the lowest framerate.

```js
let keys = null;
if (bestConfig) {
  keys = await bestConfig.keySystemAccess.createMediaKeys();
  // … use keys to decode media using best config
} else if (nonSmoothConfig) {
  console.log(
    "No smooth configs found. Using lowest resolution configuration!",
  );
  keys = await nonSmoothConfig.keySystemAccess.createMediaKeys();
  // … use keys to decode media using lowest framerate config
} else {
  console.log("No supported configs!");
  // Fail!
}
```

If there are no supported configuration, we have no choice but to fail and notify the user.

## See also

- `MediaCapabilities.encodingInfo()`
- `HTMLMediaElement.canPlayType()` for file
- `MediaSource.isTypeSupported()` for media-source
- `Navigator.requestMediaKeySystemAccess()`
