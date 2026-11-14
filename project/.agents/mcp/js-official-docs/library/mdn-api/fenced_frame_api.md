---
title: "Fenced Frame API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fenced_frame_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Fenced Frame API

> **Warning:**
> This feature is currently opposed by one browser vendor.
> See the Standards positions section below for details.

The **Fenced Frame API** provides functionality for controlling content embedded in `<fencedframe>` elements.

## Concepts and usage

One major source of privacy and security problems on the web is content embedded in `` elements. Historically ``s have been used to set third-party cookies, which can be used to share information and track users across sites. In addition, content embedded in an `` can communicate with its embedding document (for example, using `Window.postMessage()`).

The embedding document can also use scripting to read various forms of information from the `` — for example you can potentially get significant tracking/fingerprinting data from reading the embedded URL from the `src` property, especially if it contains URL parameters. The `` can also access the embedding context's DOM, and vice versa.

Most modern browsers are working on mechanisms to partition storage so that cookie data can no longer be used for tracking (for example see Cookies Having Independent Partitioned State (CHIPS) or Firefox State Partitioning).

`<fencedframe>` elements aim to solve another piece of this puzzle — they are very similar to ``s in form and function, except that:

- Communication cannot be shared between the `<fencedframe>` content and its embedding site.
- A `<fencedframe>` can access cross-site data, but only in a very specific set of controlled circumstances that preserve user privacy.
- A `<fencedframe>` cannot be freely manipulated or have its data accessed via regular scripting (for example reading or setting the source URL). `<fencedframe>` content can only be embedded via specific APIs.
- A `<fencedframe>` cannot access the embedding context's DOM, nor can the embedding context access the `<fencedframe>`'s DOM.

For more information about the communication model of fenced frames, read the communication with embedded frames guide.

### Use cases

`<fencedframe>`s are used by other APIs to embed different types of cross-site content or collect data, fulfilling different use cases in a privacy-preserving manner. Most of these previously relied on third-party cookies or other mechanisms that were bad for privacy.

- The Shared Storage API provides access to unpartitioned cross-site data in a secure environment, calculating and/or displaying results in a `<fencedframe>`. For example:
  - Advertisers can measure the reach of an ad, or serve subsequent ads based on which ones users have already seen on other sites.
  - Developers can do A/B testing, showing variants to a user based on a group they are assigned to, or based on how many users have seen each one already.
  - Businesses can customize the user's experience based on what they have seen on other sites. For example, if they have already purchased membership, you might not want to show them membership sign-up ads across your other properties.
- The Protected Audience API allows developers to implement interest group-based advertising, namely remarketing and custom audience use cases. It can evaluate multiple bids for ad space and display the winning ad in a `<fencedframe>`.
- The Private Aggregation API can gather data from `<fencedframe>`s (originating from shared storage or the Protected Audience API) and create aggregated reports.

## How do `<fencedframe>`s work?

As mentioned above, you don't control the content embedded in a `<fencedframe>` directly via regular script.

To set what content will be shown in a `<fencedframe>`, a utilizing API (such as Protected Audience or Shared Storage) generates a `FencedFrameConfig` object, which is then set via JavaScript as the value of the `<fencedframe>`'s `HTMLFencedFrameElement.config` property.

The following example gets a `FencedFrameConfig` from a Protected Audience API's ad auction, which is then used to display the winning ad in a `<fencedframe>`:

```js
const frameConfig = await navigator.runAdAuction({
  // … auction configuration
  resolveToConfig: true,
});

const frame = document.createElement("fencedframe");
frame.config = frameConfig;
```

`resolveToConfig: true` must be passed in to the `runAdAuction()` call to obtain a `FencedFrameConfig` object. If `resolveToConfig` is set to `false`, the resulting `Promise` will resolve to an opaque URN (for example `urn:uuid:c36973b5-e5d9-de59-e4c4-364f137b3c7a`) that can only be used in an ``.

Either way, the browser stores a URL containing the target location of the content to embed — mapped to the opaque URN, or the `FencedFrameConfig`'s internal `url` property. The URL value cannot be read by JavaScript running in the embedding context.

> **Note:**
> Support is provided for opaque URNs in ``s to ease migration of existing implementations over to privacy sandbox APIs. This support is intended to be temporary and will be removed in the future as adoption grows.

> **Note:**
> `FencedFrameConfig` has a `setSharedStorageContext()` method that is used to pass in data from the embedding document to the `<fencedframe>`'s shared storage. It could for example be accessed in a `Worklet` via the `<fencedframe>` and used to generate a report. See the Shared Storage API for more details.

### Accessing fenced frame functionality on the `Fence` object

Inside documents embedded in `<fencedframe>`s, JavaScript has access to a `Window.fence` property that returns a `Fence` instance for that document. This object contains several functions specifically relevant to fenced frame API functionality.
For example, `Fence.reportEvent()` provides a way to trigger the submission of report data via a beacon to one or more specified URLs, in order to report ad views and clicks.

### Permissions policy

Only specific features designed to be used in `<fencedframe>`s can be enabled via permissions policies set on them; other policy-controlled features are not available in this context. See Permissions policies available to fenced frames for more details.

### HTTP headers

A `Sec-Fetch-Dest` header with a value of `fencedframe` will be set for any requests made from inside a `<fencedframe>`, including child ``s embedded within a `<fencedframe>`.

```http
Sec-Fetch-Dest: fencedframe
```

The server must set a `Supports-Loading-Mode` response header with a value of `fenced-frame` for any document intended to be loaded into a `<fencedframe>`, or `` embedded within a `<fencedframe>`.

```http
Supports-Loading-Mode: fenced-frame
```

Other effects of fenced frames on HTTP headers are as follows:

- User-agent client hints are not available inside fenced frames because they rely on permissions policy delegation, which could be used to leak data.
- Strict `Cross-Origin-Opener-Policy` settings are enforced on new browsing contexts opened from inside fenced frames, otherwise they could be used to leak information to other origins. Any new window opened from inside a fenced frame will have `rel="noopener"` and `Cross-Origin-Opener-Policy: same-origin` set to ensure that `Window.opener` returns `null` and place it in its own browsing context group.
- `Content-Security-Policy: fenced-frame-src` has been added for specifying valid sources for nested browsing contexts loaded into `<fencedframe>` elements.
- `Content-Security-Policy: sandbox` custom settings cannot be inherited by fenced frames, to mitigate privacy issues. For a fenced frame to load, you need to specify no `sandbox` CSP (which implies the below values), or specify the following sandbox values:
  - `allow-same-origin`
  - `allow-forms`
  - `allow-scripts`
  - `allow-popups`
  - `allow-popups-to-escape-sandbox`
  - `allow-top-navigation-by-user-activation`

### `beforeunload` and `unload` events

`beforeunload` and `unload` events do not fire on fenced frames, because they can leak information in the form of a page deletion timestamp. Implementations aim to eliminate as many potential leakages as possible.

## Interfaces

- `FencedFrameConfig`
    Represents the navigation of a `<fencedframe>`, i.e., what content will be displayed in it. A `FencedFrameConfig` is returned from a source such as the Protected Audience API and set as the value of `HTMLFencedFrameElement.config`.
- `Fence`
    Contains several functions relevant to fenced frame functionality. Available only to documents embedded inside a `<fencedframe>`.
- `HTMLFencedFrameElement`
    Represents a `<fencedframe>` element in JavaScript and provides properties to configure it.

### Extensions to other interfaces

- `Navigator.deprecatedReplaceInURN()`
    Substitutes specified strings inside the mapped URL corresponding to a given opaque URN or `FencedFrameConfig`'s internal `url` property.
- `Window.fence`
    Returns a `Fence` object instance for the current document context. Available only to documents embedded inside a `<fencedframe>`.

## Enrollment and local testing

Certain API features that create `FencedFrameConfig`s such as `Navigator.runAdAuction()` (Protected Audience API) and `WindowSharedStorage.selectURL()` (Shared Storage API), as well as other features such as `Fence.reportEvent()`, require you to enroll your site in a privacy sandbox enrollment process. If you don't do this, the API calls will fail with a console warning.

> **Note:**
> In Chrome, you can still test your fenced frame code locally without enrollment. To allow local testing, enable the following Chrome developer flag:
>
> `chrome://flags/#privacy-sandbox-enrollment-overrides`

## Examples

The following demos all make use of `<fencedframe>`s:

- Shared Storage API demos (which also includes some Private Aggregation API examples)
- Protected Audience API demo

## Specifications

### Standards positions

One browser vendor opposes this specification.
Known standards positions are as follows:

- Mozilla (Firefox): Negative

## See also

- Fenced frames on privacysandbox.google.com
- The Privacy Sandbox on privacysandbox.google.com
