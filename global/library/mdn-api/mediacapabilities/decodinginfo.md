---
title: "MediaCapabilities: decodingInfo() method (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediacapabilities/decodinginfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaCapabilities: decodingInfo() method

The **`decodingInfo()`** method of the `MediaCapabilities` interface returns a promise that fulfills with information about how well the user agent can decode/display media with a given configuration.

The resolved object contains three boolean properties `supported`, `smooth`, and `powerefficient`, which indicate whether decoding the media described would be supported, and if so, whether decoding would be smooth and power-efficient.

The method can also be used to test the user agent capabilities for decoding media encoded with a key <example-value>, but only when called in the main thread and in a secure context.
If the configuration passed in the `configuration.keySystemConfiguration` property is supported for decoding the data, the resolved promise also includes a `MediaKeySystemAccess` object that can be used to create a `MediaKeys` object to set up encrypted playback.

> **Note:**
> Calling `decodingInfo()` with this property may result in user-visible effects, such as asking for permission to access one or more system resources.
> As such, this function should only be called when the application is ready to create and use a `MediaKeys` object with the provided configuration.

## Syntax

```js
decodingInfo(configuration)
```

### Parameters

- `configuration`
    An object with a property `type`, _either_ a `video` or `audio` property containing a configuration of the appropriate type, and optionally a `keySystemConfiguration` when decoding media encrypted with a key <example-value>:
    - `type`
        The type of media being tested. This takes one of three values:
        - `file`
            Represents a configuration that is meant to be used for a plain file playback.
        - `media-source`
            Represents a configuration that is meant to be used for playback of a `MediaSource`.
        - `webrtc`
            Represents a configuration that is meant to be received using `RTCPeerConnection` (not allowed when `keySystemConfiguration` is set).

    - `video`
        Configuration object for a video media source.
        This has the following properties:
        - `contentType`
            String containing a valid video MIME type, and (optionally) a `codecs` parameter.
        - `width`
            The width of the video.
        - `height`
            The height of the video.
        - `bitrate`
            The number of bits used to encode one second of the video file.
        - `framerate`
            The number of frames making up one second of video playback.

    - `audio`
        Configuration object for an audio media source.
        This has the following properties:
        - `contentType`
            String containing a valid audio MIME type, and (optionally) a `codecs` parameter.
        - `channels`
            The number of channels used by the audio track.
        - `bitrate`
            The number of bits used to encode one second of the audio file.
        - `samplerate`
            The number of audio samples making up one second of the audio file.

    - `keySystemConfiguration` (optional)
        Object specifying the key <example-value> configuration for encrypted media.

        > **Note:**
        > `Navigator.requestMediaKeySystemAccess()` takes arrays some of the same data types in its `supportedConfigurations` argument.

        If specified, the `type` must be `media-source` or `file` (not `webrtc`).
        This has the following properties:
        - `keySystem`
            A string identifying the media key system.
            For example `org.w3.clearkey` or `com.widevine.alpha`.

        - `initDataType` (optional)
            A string indicating the data type name the initialization data format, such as `"cenc"`, `"keyids"` and `"webm"`.
            Allowed names are defined in the Encrypted Media Extensions Initialization Data Format Registry.

        - `distinctiveIdentifier` (optional)
            A string indicating whether the implementation may use "distinctive identifiers" (or distinctive permanent identifiers) for any operations associated with any object created from this configuration.
            The allowed values are:
            - `required`
                The returned object must support this feature.
            - `optional`
                The returned object may support this feature.
                This is the default
            - `not-allowed`
                The returned object must not support or use this feature.

        - `persistentState` (optional)
            A string indicating whether the returned object must be able to persist session data or any other type of state.
            The allowed values are:
            - `required`
                The returned object must support this feature.
            - `optional`
                The returned object may support this feature.
                This is the default
            - `not-allowed`
                The returned object must not support or use this feature.
                Only "temporary" sessions may be created when persistent state is not allowed.

        - `sessionTypes` (optional)
            An array of strings indicating the session types that must be supported.
            Permitted values include:
            - `temporary`
                A session for which the license, key(s) and record of or data related to the session are not persisted.
                The application does not need to manage such storage.
                Implementations must support this option, and it is the default.
            - `persistent-license`
                A session for which the license (and potentially other data related to the session) will be persisted.
                A record of the license and associated keys persists even if the license is destroyed, providing an attestation that the license and key(s) it contains are no longer usable by the client.

        - `audio` (optional)
            The audio key <example-value> track configuration associated with the `audio` configuration above.
            If set, then the `audio` configuration must also be set.
            - `encryptionScheme`
                The encryption scheme associated with the content type, such as `cenc`, `cbcs`, `cbcs-1-9`.
                This value should be set by an application (it defaults to `null`, indicating that any encryption scheme may be used).
            - `robustness`
                The robustness level associated with the content type.
                The empty string indicates that any ability to decrypt and decode the content type is acceptable.

        - `video` (optional)
            The video key <example-value> track configuration associated with the `video` configuration above.
            If set, then the `video` configuration must also be set.
            - `encryptionScheme`
                The encryption scheme associated with the content type, such as `cenc`, `cbcs`, `cbcs-1-9`.
                This value should be set by an application (it defaults to `null`, indicating that any encryption scheme may be used).
            - `robustness`
                The robustness level associated with the content type.
                The empty string indicates that any ability to decrypt and decode the content type is acceptable.

### Return value

A `Promise` fulfilling with an object containing the following attributes:

- `supported`
    `true` if the media content can be decoded at all. Otherwise, it is `false`.
- `smooth`
    `true` if playback of the media can be played at the frame rate specified by the configuration without needing to drop frames. Otherwise it is `false`.
- `powerEfficient`
    `true` if playback of the media will be power efficient. Otherwise, it is `false`.
- `keySystemAccess`
    A `MediaKeySystemAccess` that can be used to create a `MediaKeys` object to set up encrypted playback, or `null` if decoding is not supported using the supplied configuration.

Browsers will report a supported media configuration as `smooth` and `powerEfficient` until stats on this device have been recorded.
All supported audio codecs report `powerEfficient` as true.

### Exceptions

- `TypeError`
    Thrown if the `configuration` passed to the `decodingInfo()` method is invalid, either because the type is not video or audio, the `contentType` is not a valid codec MIME type, the media decoding configuration is not a valid value for the `type` (file, media-source, or webrtc), or any other error in the media configuration passed to the method, including omitting any values.

- `InvalidStateError` `DOMException`
    The method is called in a worker when `configuration.keySystemConfiguration` is defined.

- `SecurityError` `DOMException`
    The method is called outside of a secure context and `configuration.keySystemConfiguration` is defined.

## Usage notes

### Comparison with Navigator.requestMediaKeySystemAccess()

`decodingInfo()` and the `Navigator.requestMediaKeySystemAccess()` method of the Encrypted Media Extensions API reflect fundamentally different approaches for selecting a configuration for decoding encrypted media.

The configuration parameter for `Navigator.requestMediaKeySystemAccess()` takes an array of possible configurations and allows the system to choose the one that it considers appropriate.

By contrast, `decodingInfo()` takes one configuration at a time.
The expectation is that the caller will execute `decodingInfo()` multiple times, starting with the most preferred configurations and stopping as soon as it finds a configuration that meets application requirements for being smooth, power-efficient, or both.
In other words, the selection decision is devolved to the caller.
