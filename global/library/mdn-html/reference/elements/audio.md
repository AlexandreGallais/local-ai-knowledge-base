---
title: "`<audio>` HTML embed audio element (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/audio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<audio>` HTML embed audio element

The **`<audio>`** HTML element is used to embed sound content in documents. It may contain one or more audio sources, represented using the `src` attribute or the `` element: the browser will choose the most suitable one.
It can also be the destination for streamed media, using a `MediaStream`.

```html
<figure>
  <figcaption>Listen to the T-Rex:</figcaption>
  <audio controls src="/shared-assets/audio/t-rex-roar.mp3"></audio>
  <a href="/shared-assets/audio/t-rex-roar.mp3"> Download audio </a>
</figure>
```

```css
figure {
  margin: 0;
}
```

The above example shows basic usage of the `` tags is shown as a fallback in browsers that don't support the element.

## Attributes

This element's attributes include the global attributes.

- `autoplay`
    A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.

    > **Note:**
    > Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible.
    > If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it).
    > However, this can be useful when creating media elements whose source will be set at a later time, under user control.
    > See our autoplay guide for additional information about how to properly use autoplay.

    > **Note:**
    > Audio with the `loading="lazy"` attribute set will not start downloading and autoplaying until the controls for the media are near or within the viewport. Lazy-loaded audio without the `controls` attribute will not autoplay.

- `controls`
    If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback.

- `controlslist`
    The `controlslist` attribute, when specified, helps the browser select what controls to show for the `audio` element whenever the browser shows its own set of controls (that is, when the `controls` attribute is specified).

    The allowed values are `nodownload`, `nofullscreen` and `noremoteplayback`.

- `crossorigin`
    This enumerated attribute indicates whether to use CORS to fetch the related audio file. CORS-enabled resources can be reused in the `<canvas>` element without being _tainted_. The allowed values are:
    - `anonymous`
        Sends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the resource will be _tainted_, and its usage restricted.
    - `use-credentials`
        Sends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the resource will be _tainted_ and its usage restricted.

    When not present, the resource is fetched without a CORS request (i.e., without sending the `Origin:` HTTP header), preventing its non-tainted use in `<canvas>` elements. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See CORS settings attributes for additional information.

- `disableremoteplayback`
    A Boolean attribute used to disable the capability of remote playback in devices that are attached using wired (HDMI, DVI, etc.) and wireless technologies (Miracast, Chromecast, DLNA, AirPlay, etc.). See the proposed Remote Playback API specification for more information.

    In Safari, you can use `x-webkit-airplay="deny"` as a fallback.

- `loading` (experimental)
    Indicates how the browser should load the audio:
    - `eager`
        Loads the audio immediately, regardless of whether or not the audio is currently within the visible viewport (this is the default value).
    - `lazy`
        Defers loading the audio until the controls reach a calculated distance from the viewport, as defined by the browser.

        > **Note:**
        > In order for audio elements to intersect visibly with the viewport, they need to be visible. Browsers use the `controls` attribute to make audio elements visible, so it's needed for lazy loading. Lazy-loaded audio without the `controls` attribute will not load.

        Lazy loading avoids the network and storage bandwidth required to handle the audio until it's reasonably certain that it will be needed. This improves the performance in most typical use cases.

        Lazy-loaded audio located in the visual viewport may not yet be downloaded when the Window `load` event is fired. This is because the event is fired based on eager-loaded audio only — lazy-loaded audio is not considered even if it is located within the visual viewport upon initial page load.

        Loading is only deferred when JavaScript is enabled. This is an anti-tracking measure, because if a user agent supported lazy loading when scripting is disabled, it would still be possible for a site to track a user's approximate scroll position throughout a session, by strategically placing audio in a page's markup such that a server can track how many audio requests are made and when.

        > **Note:**
        > The `loading="lazy"` attribute also impacts the `autoplay` attribute as described in that section of this page.

- `loop`
    A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio.

- `muted`
    A Boolean attribute that indicates the default audio mute setting contained in the audio. If set, the audio will be initially silenced. Its default value is `false`, meaning the audio will be heard when the audio is played.

    > **Note:**
    > To unmute, setting `muted="false"` will not work; the audio will be muted if the attribute is present at all. To unmute, the attribute must be removed entirely.

- `preload`
    This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:
    - `none`: Indicates that the audio should not be preloaded.
    - `metadata`: Indicates that only audio metadata (e.g., length) is fetched.
    - `auto`: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.
    - _empty string_: A synonym of the `auto` value.

    The default value is different for each browser. The spec advises it to be set to `metadata`.

    > **Note:**
    >
    > - Audio with the `loading="lazy"` attribute set will only apply the `preload` behavior once the audio controls are near or within the viewport.
    > - The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.
    > - The browser is not forced by the specification to follow the value of this attribute; it is a mere hint.

- `src`
    The URL of the audio to embed. This is subject to HTTP access controls. This is optional; you may instead use the `` element within the audio block to specify the audio to embed.

## Events

- `audioprocess` (deprecated)
    The input buffer of a `ScriptProcessorNode` is ready to be processed.
- `canplay`
    The browser can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.
- `canplaythrough`
    The browser estimates it can play the media up to its end without stopping for content buffering.
- `complete`
    The rendering of an `OfflineAudioContext` is terminated.
- `durationchange`
    The `duration` attribute has been updated.
- `emptied`
    The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the `HTMLMediaElement.load` method is called to reload it.
- `ended`
    Playback has stopped because the end of the media was reached.
- `loadeddata`
    The first frame of the media has finished loading.
- `loadedmetadata`
    The metadata has been loaded.
- `loadstart`
    Fired when the browser has started to load the resource.
- `pause`
    Playback has been paused.
- `play`
    Playback has begun.
- `playing`
    Playback is ready to start after having been paused or delayed due to lack of data.
- `ratechange`
    The playback rate has changed.
- `seeked`
    A _seek_ operation completed.
- `seeking`
    A _seek_ operation began.
- `stalled`
    The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
- `suspend`
    Media data loading has been suspended.
- `timeupdate`
    The time indicated by the `currentTime` attribute has been updated.
- `volumechange`
    The volume has changed.
- `waiting`
    Playback has stopped because of a temporary lack of data.
