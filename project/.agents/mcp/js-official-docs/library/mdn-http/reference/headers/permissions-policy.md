---
title: "Permissions-Policy header (part 1 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

The HTTP **`Permissions-Policy`** response header provides a mechanism to allow and deny the use of browser features in a document or within any `` elements in the document.

Violations of a policy can be reported using the Reporting API.
Reports may be sent to a server indicated by name in a per-directive `report-to` parameter, or otherwise to the server endpoint named `"default"` (the mapping between server endpoint names and URLs is set using the `Reporting-Endpoints` HTTP response header).
Reports can also be observed in the page for which the policy is being enforced using a `ReportingObserver`.
The format of the report and additional detail is provided in `PermissionsPolicyViolationReport`.

For more information, see the main Permissions Policy article.

       | Header type
       | Response header

## Syntax

```http
# Single directive
Permissions-Policy: <directive>=<allowlist>

# Single directive with reporting endpoint
Permissions-Policy: <directive>=<allowlist>;report-to=<endpoint>

# Multiple directives, with and without server reporting endpoints
Permissions-Policy: <directive>=<allowlist>, <directive>=<allowlist>;report-to=<endpoint>, ...
```

The header can be used to set the allowlists for one or more directives, and optionally a per-directive `report-to` parameter indicating the server endpoint to send policy violation reports to.
The entries for each directive are comma separated.

- `<directive>`
    The Permissions Policy directive to apply the `allowlist` to. See Directives below for a list of the permitted directive names.
- `<allowlist>`
    An allowlist is a list of origins that takes one or more of the following values contained in parentheses, separated by spaces:
    - `*` (wildcard)
        The feature will be allowed in this document, and all nested browsing contexts (``s) regardless of their origin.
    - `()` (empty allowlist)
        The feature is disabled in top-level and nested browsing contexts. The equivalent for `` `allow` attributes is `'none'`.
    - `self`
        The feature will be allowed in this document, and in all nested browsing contexts (``s) in the same origin only. The feature is not allowed in cross-origin documents in nested browsing contexts. `self` can be considered shorthand for `https://your-site.example.com`. The equivalent for `` `allow` attributes is `self`.
    - `src`
        The feature will be allowed in this ``, as long as the document loaded into it comes from the same origin as the URL in its `<src>` attribute. This value is only used in the `` `allow` attribute, and is the _default_ value for a feature listed without an explicit allowlist value — for example, `allow="geolocation"` is equivalent to `allow="geolocation 'src'"`.
    - `"<origin>"`
        The feature is allowed for specific origins (for example, `"https://a.example.com"`). Origins should be separated by spaces. Note that origins in `` allow attributes are not quoted.

    The values `*` and `()` may only be used on their own, while `self` and `src` may be used in combination with one or more origins.

    > **Note:**
    > Directives have a default allowlist, which applies when the directive is not explicitly listed in a policy; the specific default for each directive is given on its directive reference page.
    > See Default allowlists for how this interacts with the `Permissions-Policy` header and the `` `allow` attribute.

- `report-to=<endpoint>` (optional)
    The `report-to` parameter can be used to indicate the name of a reporting endpoint where reports will be sent if there is a policy violation for the associated directive.
    The endpoint name and its associated URL must be specified in a separate `Reporting-Endpoints` HTTP response header.

    If omitted, reports will be send to the `default` reporting endpoint if one has been defined.
    See Reporting API for more information.

Where supported, you can include wildcards in Permissions Policy origins.
This means that instead of having to explicitly specify several different subdomains in an allowlist, you can specify them all in a single origin with a wildcard.

So instead of:

```http
("https://example.com" "https://a.example.com" "https://b.example.com" "https://c.example.com")
```

You can specify:

```http
("https://example.com" "https://*.example.com")
```

> **Note:**
> `"https://*.example.com"` does not match `"https://example.com"`.

## Directives

- `accelerometer` (experimental)
    Controls whether the current document is allowed to gather information about the acceleration of the device through the `Accelerometer` interface.

- `ambient-light-sensor` (experimental)
    Controls whether the current document is allowed to gather information about the amount of light in the environment around the device through the `AmbientLightSensor` interface.

- `aria-notify` (experimental)
    Controls whether the current document is allowed to use the `ariaNotify()` method to fire screen reader announcements.

- `attribution-reporting` (deprecated) (non-standard)
    Controls whether the current document is allowed to use the Attribution Reporting API.

- `autoplay` (experimental)
    Controls whether the current document is allowed to autoplay media requested through the `HTMLMediaElement` interface. When this policy is disabled and there were no user gestures, the `Promise` returned by `HTMLMediaElement.play()` will reject with a `NotAllowedError` `DOMException`. The autoplay attribute on `<audio>` and `` elements will be ignored.

- `bluetooth` (experimental)
    Controls whether the use of the Web Bluetooth API is allowed. When this policy is disabled, the methods of the `Bluetooth` object returned by `Navigator.bluetooth` will either return `false` or reject the returned `Promise` with a `SecurityError` `DOMException`.

- `browsing-topics` (deprecated) (non-standard)
    Controls access to the Topics API. Where a policy specifically disallows the use of the Topics API, any attempts to call the `Document.browsingTopics()` method or send a request with a `Sec-Browsing-Topics` header will fail with a `NotAllowedError` `DOMException`.

- `camera` (experimental)
    Controls whether the current document is allowed to use video input devices.
    The `Promise` returned by `getUserMedia()` will reject with a `NotAllowedError` `DOMException` if the permission is not allowed.

- `captured-surface-control` (experimental)
    Controls whether or not the document is permitted to use the Captured Surface Control API.
    The promise returned by the API's main methods will reject with a `NotAllowedError` `DOMException` if the permission is not allowed.

- `ch-ua-high-entropy-values` (experimental)
    Controls whether or not the document is permitted to use the `NavigatorUAData.getHighEntropyValues()` method to retrieve high-entropy user-agent data.
    If the permission is not allowed, the method will only return the `brands`, `mobile`, and `platform` low-entropy data.

- `compute-pressure` (experimental)
    Controls access to the Compute Pressure API.

- `cross-origin-isolated` (experimental)
    Controls whether the current document can be treated as `cross-origin isolated`.

- `deferred-fetch` (experimental)
    Controls the allocation of the top-level origin's `fetchLater()` quota.

- `deferred-fetch-minimal` (experimental)
    Controls the allocation of the shared cross-origin subframe `fetchLater()` quota.

- `display-capture` (experimental)
    Controls whether or not the current document is permitted to use the `getDisplayMedia()` method to capture screen contents. When this policy is disabled, the promise returned by `getDisplayMedia()` will reject with a `NotAllowedError` `DOMException` if permission is not obtained to capture the display's contents.

- `encrypted-media` (experimental)
    Controls whether the current document is allowed to use the Encrypted Media Extensions API (EME). When this policy is disabled, the `Promise` returned by `Navigator.requestMediaKeySystemAccess()` will reject with a `SecurityError` `DOMException`.

- `fullscreen` (experimental)
    Controls whether the current document is allowed to use `Element.requestFullscreen()`. When this policy is disabled, the returned `Promise` rejects with a `TypeError`.

- `gamepad` (experimental)
    Controls whether the current document is allowed to use the Gamepad API.
    When this policy is disabled, calls to `Navigator.getGamepads()` will throw a `SecurityError` `DOMException`, and the `gamepadconnected` and `gamepaddisconnected` events will not fire.

- `geolocation` (experimental)
    Controls whether the current document is allowed to use the `Geolocation` Interface. When this policy is disabled, calls to `getCurrentPosition()` and `watchPosition()` will cause those functions' callbacks to be invoked with a `GeolocationPositionError` code of `PERMISSION_DENIED`.

- `gyroscope` (experimental)
    Controls whether the current document is allowed to gather information about the orientation of the device through the `Gyroscope` interface.

- `hid` (experimental)
    Controls whether the current document is allowed to use the `WebHID API` to connect to uncommon or exotic human interface devices such as alternative keyboards or gamepads.

- `identity-credentials-get` (experimental)
    Controls whether the current document is allowed to use the Federated Credential <example-value> API (FedCM).

- `idle-detection` (experimental)
    Controls whether the current document is allowed to use the `Idle Detection API` to detect when users are interacting with their devices, for example to report "available"/"away" status in chat applications.

- `language-detector` (experimental)
    Controls access to the language detection functionality of the Translator and Language Detector APIs.

- `language-model` (experimental)
    Controls access to the Prompt API.

- `local-fonts` (experimental)
    Controls whether the current document is allowed to gather data on the user's locally-installed fonts via the `Window.queryLocalFonts()` method (see also the `Local Font Access API`).

- `local-network` (experimental)
    Controls whether the current document is allowed to make network requests to local addresses.

- `local-network-access` (experimental)
    Controls whether the current document is allowed to make network requests to local and loopback addresses. This policy directive is an alias for the more granular `local-network` and `loopback-network` directives.

- `loopback-network` (experimental)
    Controls whether the current document is allowed to make network requests to loopback addresses.

- `magnetometer` (experimental)
    Controls whether the current document is allowed to gather information about the orientation of the device through the `Magnetometer` interface.

- `microphone` (experimental)
    Controls whether the current document is allowed to use audio input devices. When this policy is disabled, the `Promise` returned by `MediaDevices.getUserMedia()` will reject with a `NotAllowedError` `DOMException`.

- `midi` (experimental)
    Controls whether the current document is allowed to use the Web MIDI API. When this policy is disabled, the `Promise` returned by `Navigator.requestMIDIAccess()` will reject with a `SecurityError` `DOMException`.

- `on-device-speech-recognition` (experimental)
    Controls access to the on-device speech recognition functionality of the Web Speech API.

- `otp-credentials` (experimental)
    Controls whether the current document is allowed to use the WebOTP API to request a one-time password (OTP) from a specially-formatted SMS message sent by the app's server, i.e., via `navigator.credentials.get({otp: ..., ...})`.

- `payment` (experimental)
    Controls whether the current document is allowed to use the Payment Request API. When this policy is enabled, the `PaymentRequest()` constructor will throw a `SecurityError` `DOMException`.

- `picture-in-picture` (experimental)
    Controls whether the current document is allowed to play a video in a Picture-in-Picture mode via the corresponding API.

- `private-state-token-issuance` (experimental)
    Controls usage of private state token `token-request` operations.

- `private-state-token-redemption` (experimental)
    Controls usage of private state token `token-redemption` and `send-redemption-record` operations.

- `publickey-credentials-create` (experimental)
    Controls whether the current document is allowed to use the Web Authentication API to create new asymmetric key <example-value>, i.e., via `navigator.credentials.create({publicKey: ..., ...})`.

- `publickey-credentials-get` (experimental)
    Controls whether the current document is allowed to use the Web Authentication API to retrieve already stored public-key <example-value>, i.e., via `navigator.credentials.get({publicKey: ..., ...})`.

- `screen-wake-lock` (experimental)
    Controls whether the current document is allowed to use Screen Wake Lock API to indicate that device should not turn off or dim the screen.

- `serial` (experimental)
    Controls whether the current document is allowed to use the `Web Serial API` to communicate with serial devices, either directly connected via a serial port, or via USB or Bluetooth devices emulating a serial port.

- `speaker-selection` (experimental)
    Controls whether the current document is allowed to use the Audio Output Devices API to list and select speakers.

- `storage-access` (experimental)
    Controls whether a document loaded in a third-party context (i.e., embedded in an ``) is allowed to use the `Storage Access API` to request access to unpartitioned cookies.

- `translator` (experimental)
    Controls access to the translation functionality of the Translator and Language Detector APIs.

- `summarizer` (experimental)
    Controls access to the Summarizer API.

- `unload` (experimental) (non-standard)
    Controls whether the current document is allowed to run `unload` event handlers.

- `usb` (experimental)
    Controls whether the current document is allowed to use the WebUSB API.

- `web-share` (experimental)
    Controls whether or not the current document is allowed to use the `Navigator.share()` of Web Share API to share text, links, images, and other content to arbitrary destinations of user's choice, e.g., mobile apps.

- `window-management` (experimental)
    Controls whether or not the current document is allowed to use the Window Management API to manage windows on multiple displays.

- `xr-spatial-tracking` (experimental)
    Controls whether or not the current document is allowed to use the WebXR Device API to interact with a WebXR session.
