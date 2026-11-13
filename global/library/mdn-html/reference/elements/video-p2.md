---
title: "`<video>` HTML video embed element (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/video/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<video>` HTML video embed element (part 2 of 2)

## Usage notes

Browsers don't all support the same video formats; you can provide multiple sources inside nested `` elements, and the browser will then use the first one it understands.

```html
<video controls>
  <source src="myVideo.webm" type="video/webm" />
  <source src="myVideo.mp4" type="video/mp4" />
  <p>
    Your browser doesn't support HTML video. Here is a
    <a href="myVideo.mp4" download="myVideo.mp4">link to the video</a> instead.
  </p>
</video>
```

When using `` elements, the browser attempts to load each source sequentially. If a source fails (e.g., due to an invalid URL or unsupported format), the next source is attempted, and so on. An `error` event fires on the `` element after all sources have failed; `error` events are not fired on each individual `` element.

We offer a substantive and thorough guide to media file types and the guide to the codecs supported for video. Also available is a guide to audio codecs that can be used with them.

Other usage notes:

- If you don't specify the `controls` attribute, the video won't include the browser's default controls; you can create your own custom controls using JavaScript and the `HTMLMediaElement` API. See Creating a cross-browser video player for more details.
- To allow precise control over your video (and audio) content, `HTMLMediaElement`s fire many different events. In addition to providing controllability, these events let you monitor the progress of both download and playback of the media, as well as the playback state and position.
- You can use the `object-position` property to adjust the positioning of the video within the element's frame, and the `object-fit` property to control how the video's size is adjusted to fit within the frame.
- To show subtitles/captions along with your video, you can use some JavaScript along with the `<track>` element and the WebVTT format. See Adding captions and subtitles to HTML video for more information.
- You can play audio files using a `` element. This can be useful if, for example, you need to perform audio with a WebVTT transcript, since the `<audio>` element doesn't allow captions using WebVTT.
- To test the fallback content on browsers that support the element, you can replace `` with a non-existing element like `<notavideo>`.

A good general source of information on using HTML `` is the HTML video and audio beginner's tutorial.

### Styling with CSS

The `` element is a replaced element — its `display` value is `inline` by default — but its default width and height in the viewport is defined by the video being embedded.

There are no special considerations for styling ``; a common strategy is to give it a `display` value of `block` to make it easier to position, size, etc., and then provide styling and layout information as required. Video player styling basics provides some useful styling techniques.

### Adding subtitles and other timed text tracks

Timed text tracks for subtitles, closed captions, chapter headings, and so on, can be added declaratively by nesting the `<track>` element.
The tracks are specified in Web Video Text Tracks File Format (WebVTT) (`.vtt` files).

For example, the HTML below includes the file "captions.vtt", which will be used to overlay closed captions on the video if captions are enabled by the user.

```html
<video controls src="video.webm">
  <track default kind="captions" src="captions.vtt" />
</video>
```

Timed text tracks can also be added programmatically using the WebVTT API.

### Detecting track addition and removal

You can detect when tracks are added to and removed from a `` element using the `addtrack` and `removetrack` events. However, these events aren't sent directly to the `` element itself.
Instead, they're sent to the track list object within the `` element's `HTMLMediaElement` that corresponds to the type of track that was added to the element:

- `HTMLMediaElement.audioTracks`
    An `AudioTrackList` containing all of the media element's audio tracks.
    Add a listener for `addtrack` to this object to be notified when new audio tracks are added to the element.
- `HTMLMediaElement.videoTracks`
    A `VideoTrackList` containing all of the media element's video tracks.
    Add an `addtrack` listener to this object to be notified when video tracks are added to the element.
- `HTMLMediaElement.textTracks`
    A `TextTrackList` containing all of the media element's text tracks (which are used for subtitles, closed captions, and so on).
    Add an `addtrack` listener to this object to be notified when text tracks are added to the element.

For example, to detect when audio tracks are added to or removed from a `` element, you can use code like this:

```js
const elem = document.querySelector("video");

elem.audioTracks.onaddtrack = (event) => {
  trackEditor.addTrack(event.track);
};

elem.audioTracks.onremovetrack = (event) => {
  trackEditor.removeTrack(event.track);
};
```

This code watches for audio tracks to be added to and removed from the element, and calls a hypothetical function on a track editor to register and remove the track from the editor's list of available tracks.

You can also use `addEventListener()` to listen for the `addtrack` and `removetrack` events.

### Server support for video

If the MIME type for the video is not set correctly on the server, the video may not show or show a gray box containing an X (if JavaScript is enabled).

If you use Apache Web Server to serve WebM videos, you can fix this problem by adding the video file type extensions to the `video/webm` MIME type (the most common WebM file extension is `.webm`). To do this, edit the `mime.types` file in `/etc/apache` or use the `AddType` configuration directive in `httpd.conf`:

```plain
AddType video/webm .webm
```

Your web host may provide an easy interface to MIME type configuration changes for new technologies until a global update naturally occurs.

## Accessibility

Videos should provide both captions and transcripts that accurately describe their content (see Adding captions and subtitles to HTML video for more information on how to implement these). Captions allow people who are experiencing hearing loss to understand a video's audio content as the video is being played, while transcripts allow people who need additional time to be able to review audio content at a pace and format that is comfortable for them.

It's worth noting that while you can caption audio-only media, you can only do so when playing audio in a `` element since the video region of the element is used to present the captions. This is one of the special scenarios in which it's useful to play audio in a video element.

If automatic captioning services are used, it is important to review the generated content to ensure it accurately represents the source video.

In addition to spoken dialog, subtitles and transcripts should also identify music and sound effects that communicate important information. This includes emotion and tone:

```plain
14
00:03:14 --> 00:03:18
[Dramatic rock music]

15
00:03:19 --> 00:03:21
[whispering] What's that off in the distance?

16
00:03:22 --> 00:03:24
It's… it's a…

16 00:03:25 --> 00:03:32
[Loud thumping]
[Dishes clattering]
```

Captions should not obstruct the main subject of the video. They can be positioned using the `align` VTT cue setting.

- Web Video Text Tracks Format (WebVTT)
- WebAIM: Captions, Transcripts, and Audio Descriptions
- MDN Understanding WCAG, Guideline 1.2 explanations
- Understanding Success Criterion 1.2.1 | W3C Understanding WCAG 2.0
- Understanding Success Criterion 1.2.2 | W3C Understanding WCAG 2.0

## Examples

### Single source

This example plays a video when activated, providing the user with the browser's default video controls to control playback.

#### HTML

```html
<!-- Basic video example -->
<!-- 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation. Hosted by archive.org -->
<!-- Poster from peach.blender.org -->
<video
  controls
  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  width="620">
  Sorry, your browser doesn't support embedded videos, but don't worry, you can
  <a href="https://archive.org/details/BigBuckBunny_124">download it</a>
  and watch it with your favorite video player!
</video>
```

#### Result

Until the video starts playing, the image provided in the `poster` attribute is displayed in its place. If the browser doesn't support video playback, it displays the fallback text.

### Multiple sources

This example builds on the last one, offering three different sources for the media; this allows the video to be watched regardless of which video codecs are supported by the browser.

#### HTML

```html
<!-- Using multiple sources as fallbacks for a video tag -->
<!-- 'Elephants Dream' by Orange Open Movie Project Studio, licensed under CC-3.0, hosted by archive.org -->
<!-- Poster hosted by Wikimedia -->
<video
  width="620"
  controls
  poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg">
  <source
    src="https://archive.org/download/ElephantsDream/ed_hd.avi"
    type="video/avi" />
  <source
    src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
    type="video/mp4" />

  Sorry, your browser doesn't support embedded videos, but don't worry, you can
  <a
    href="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
    download="ed_1024_512kb.mp4">
    download the MP4
  </a>
  and watch it with your favorite video player!
</video>
```

#### Result

First AVI is tried. If that can't be played, MP4 is tried. A fallback message is displayed if the video element isn't supported, but not if all sources fail.

Some media file types let you provide more specific information using the `codecs` parameter as part of the file's type string. For example, `video/webm; codecs="vp8, vorbis"` says that the file is a WebM video using VP8 for its video and Vorbis for audio.

## Technical summary

       |
        Content categories

       |
        Flow content, phrasing content, embedded content. If it has a `controls` attribute: interactive content and palpable content.

       | Permitted content
       |

          If the element has a `src`
          attribute: zero or more `<track>` elements, followed by transparent content that contains no media elements–that is no `<audio>` or `<video>`.

          Else: zero or more `` elements, followed by zero or more `<track>` elements, followed by transparent content that contains no media elements–that is no `<audio>` or `<video>`.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       | Any element that accepts embedded content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | `application`

       | DOM interface
       | `HTMLVideoElement`

## See also

- Guide to media types and formats on the web
  - Media container formats (file types)
  - Web video codec guide
  - Web audio codec guide

- Positioning and sizing the picture within its frame: `object-position` and `object-fit`
- `<audio>`
- HTML video and audio
- Manipulating video using canvas
- Configuring servers for Ogg media
