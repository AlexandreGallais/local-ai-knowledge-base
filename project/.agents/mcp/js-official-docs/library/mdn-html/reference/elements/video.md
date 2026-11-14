---
title: "`<video>` HTML video embed element (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/video/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<video>` HTML video embed element

The **``** HTML element embeds a media player which supports video playback into the document. You can use `` for audio content as well, but the `<audio>` element may provide a more appropriate user experience.

```html
<video controls width="250">
  <source src="/shared-assets/videos/flower.webm" type="video/webm" />

  <source src="/shared-assets/videos/flower.mp4" type="video/mp4" />

  Download the
  <a href="/shared-assets/videos/flower.webm">WEBM</a>
  or
  <a href="/shared-assets/videos/flower.mp4">MP4</a>
  video.
</video>
```

The above example shows how to use the `` tags is shown as a fallback in browsers that don't support the element.

## Attributes

Like all other HTML elements, this element supports the global attributes.

- `autoplay`
    A Boolean attribute; if specified, the video automatically begins to play back as soon as it can without stopping to finish loading the data.

    > **Note:**
    > Modern browsers block audio (or videos with an unmuted audio track) from autoplaying, as sites that automatically play audio can be an unpleasant experience for users. See our autoplay guide for additional information about how to properly use autoplay.

    To disable video autoplay, `autoplay="false"` will not work; the video will autoplay if the attribute is there in the `` tag at all. To remove autoplay, the attribute needs to be removed altogether.

    > **Note:**
    > Videos with the `loading="lazy"` attribute set will not start downloading and autoplaying until the element is near or within the viewport.

- `controls`
    If this attribute is present, the browser will offer controls to allow the user to control video playback, including volume, seeking, and pause/resume playback.
- `controlslist`
    The `controlslist` attribute, when specified, helps the browser select what controls to show for the `video` element whenever the browser shows its own set of controls (that is, when the `controls` attribute is specified).

    The allowed values are `nodownload`, `nofullscreen` and `noremoteplayback`.

    Use the `disablepictureinpicture` attribute if you want to disable the Picture-In-Picture mode (and the control).

- `crossorigin`
    This enumerated attribute indicates whether to use CORS to fetch the related video. CORS-enabled resources can be reused in the `<canvas>` element without being _tainted_. The allowed values are:
    - `anonymous`
        Sends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the resource will be _tainted_, and its usage restricted.
    - `use-credentials`
        Sends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the resource will be _tainted_ and its usage restricted.

    When not present, the resource is fetched without a CORS request (i.e., without sending the `Origin:` HTTP header), preventing its non-tainted use in `<canvas>` elements. If invalid, it is handled as if the enumerated keyword `anonymous` was used. See CORS settings attributes for additional information.

- `disablepictureinpicture`
    Prevents the browser from suggesting a Picture-in-Picture context menu or to request Picture-in-Picture automatically in some cases.
- `disableremoteplayback`
    A Boolean attribute used to disable the capability of remote playback in devices that are attached using wired (HDMI, DVI, etc.) and wireless technologies (Miracast, Chromecast, DLNA, AirPlay, etc.).

    In Safari, you can use `x-webkit-airplay="deny"` as a fallback.

- `height`
    The height of the video's display area, in CSS pixels (absolute values only; no percentages).

- `loading` (experimental)
    Indicates how the browser should load the video (including any poster image):
    - `eager`
        Loads the video immediately, regardless of whether or not the video is currently within the visible viewport (this is the default value).
    - `lazy`
        Defers loading the video until it reaches a calculated distance from the viewport, as defined by the browser.

        Lazy loading avoids the network and storage bandwidth required to handle the video until it's reasonably certain that it will be needed. This improves the performance in most typical use cases.

        While explicit `width` and `height` attributes are recommended for all videos to avoid layout shift, they are especially important for lazy-loaded ones. Lazy-loaded videos will never be loaded if they do not intersect a visible part of an element, even if loading them would change that, because unloaded videos have a `width` and `height` of `0`. It creates an even more disruptive user experience when the content visible in the viewport reflows in the middle of reading it.

        Lazy-loaded videos located in the visual viewport may not yet be visible when the Window `load` event is fired. This is because the event is fired based on eager-loaded videos — lazy-loaded videos are not considered even if they are located within the visual viewport upon initial page load.

        Loading is only deferred when JavaScript is enabled. This is an anti-tracking measure, because if a user agent supported lazy loading when scripting is disabled, it would still be possible for a site to track a user's approximate scroll position throughout a session, by strategically placing videos in a page's markup such that a server can track how many videos are requested and when.

        > **Note:**
        > The `loading="lazy"` attribute also impacts the `autoplay`, `poster`, and `preload` attributes, as described in each of those sections of the page.

- `loop`
    A Boolean attribute; if specified, the browser will automatically seek back to the start upon reaching the end of the video.

- `muted`
    A Boolean attribute that indicates the default audio mute setting contained in the video. If set, the audio will be initially silenced. Its default value is `false`, meaning the audio will be heard when the video is played.

    > **Note:**
    > To unmute, setting `muted="false"` will not work; the audio will be muted if the attribute is present at all. To unmute, the attribute must be removed entirely.

- `playsinline`
    A Boolean attribute indicating that the video is to be played "inline", that is, within the element's playback area. Note that the absence of this attribute _does not_ imply that the video will always be played in fullscreen.

- `poster`
    A URL for an image to be shown while the video is downloading. If this attribute isn't specified, nothing is displayed until the first frame is available, then the first frame is shown as the poster frame.

    > **Note:**
    > Videos with the `loading="lazy"` attribute set will only download the `poster` resource once the video is near or within the viewport.

- `preload`
    This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience regarding what content is loaded before the video is played. It may have one of the following values:
    - `none`: Indicates that the video should not be preloaded.
    - `metadata`: Indicates that only video metadata (e.g., length) is fetched.
    - `auto`: Indicates that the whole video file can be downloaded, even if the user is not expected to use it.
    - _empty string_: A synonym of the `auto` value.

    The default value is different for each browser. The spec advises it to be set to `metadata`.

    > **Note:**
    >
    > - Videos with the `loading="lazy"` attribute set will only apply the `preload` behavior once the video is near or within the viewport.
    > - The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the video for playback.
    > - The specification does not force the browser to follow the value of this attribute; it is a mere hint.

- `src`
    The URL of the video to embed. This is optional; you may instead use the `` element within the video block to specify the video to embed.
- `width`
    The width of the video's display area, in CSS pixels (absolute values only; no percentages).

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
    The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the `load()` method is called to reload it.
- `ended`
    Playback has stopped because the end of the media was reached.
- `error`
    An error occurred while fetching the media data, or the type of the resource is not a supported media format.
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
- `progress`
    Fired periodically as the browser loads a resource.
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
