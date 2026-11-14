---
title: "`<track>` HTML embed text track element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/track/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<track>` HTML embed text track element

The **`<track>`** HTML element is used as a child of the media elements, `<audio>` and ``.
Each track element lets you specify a timed text track (or time-based data) that can be displayed in parallel with the media element, for example to overlay subtitles or closed captions on top of a video or alongside audio tracks.

Multiple tracks can be specified for a media element, containing different kinds of timed text data, or timed text data that has been translated for different locales.
The data that is used will either be the track that has been set to be the default, or a kind and translation based on user preferences.

The tracks are formatted in WebVTT format (`.vtt` files) — Web Video Text Tracks.

```html
<video controls src="/shared-assets/videos/friday.mp4">
  <track
    default
    kind="captions"
    srclang="en"
    label="English"
    src="/shared-assets/misc/friday.vtt" />
  Download the
  <a href="/shared-assets/videos/friday.mp4">MP4</a>
  video, and
  <a href="/shared-assets/misc/friday.vtt">subtitles</a>.
</video>
```

```css
video {
  width: 250px;
}

video::cue {
  font-size: 1rem;
}
```

## Attributes

This element includes the global attributes.

- `default`
    This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element.
- `kind`
    How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute contains an invalid value, it will use `metadata`.
    The following keywords are allowed:
    - `subtitles`
        Subtitles provide transcription or translation of the dialog. They are suitable for when the sound is available but not understood, such as speech or text that is not English in an English language film. Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene. Subtitles' information complements the audio and video. It is often embedded in the video itself, but can also be provided separately, especially for whole-film translations.
    - `captions`
        Closed captions provide transcription or translation of the dialog, sound effects, relevant musical cues, and other relevant audio information, such as the cue's source (e.g., character, environment). They are suitable for when sound is unavailable or not clearly audible (e.g., because it is muted, drowned-out by ambient noise, or because the user is deaf).
    - `descriptions`
        Descriptions summarize the _video_ component of the media resource. They are intended to be synthesized as audio when the visual component is obscured, unavailable, or not usable (e.g., because the user is interacting with the application without a screen while driving, or because the user is blind).
    - `chapters`
        Chapter titles are intended to be used when the user is navigating the media resource.
    - `metadata`
        Tracks used by scripts. Not visible to the user.

- `label`
    A user-readable title of the text track which is used by the browser when listing available text tracks.
- `src`
    Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the `<audio>` or `` parent element of the `track` element has a `crossorigin` attribute.
- `srclang`
    Language of the track text data. It must be a valid BCP 47 language tag. If the `kind` attribute is set to `subtitles`, then `srclang` must be defined.

## Usage notes

### Track data types

The type of data that `track` adds to the media is set in the `kind` attribute, which can take values of `subtitles`, `captions`, `chapters` or `metadata`. The element points to a source file containing timed text that the browser exposes when the user requests additional data.

A media element cannot have more than one `track` with the same `kind`, `srclang`, and `label`.

### Detecting cue changes

The underlying `TextTrack`, indicated by the `track` property, receives a `cuechange` event every time the currently-presented cue is changed. This happens even if the track isn't associated with a media element.

If the track _is_ associated with a media element, using the `<track>` element as a child of the `<audio>` or `` element, the `cuechange` event is also sent to the `HTMLTrackElement`.

```js
let textTrackElem = document.getElementById("text-track");

textTrackElem.addEventListener("cuechange", (event) => {
  let cues = event.target.track.activeCues;
});
```

### Adding text tracks programmatically

The JavaScript interface that represents the `<track>` element is `HTMLTrackElement`.
The text track associated with an element can be obtained from the `HTMLTrackElement.track` property, and is of type `TextTrack`.

`TextTrack` objects also can be added to a `HTMLVideoElement` or `HTMLAudioElement` elements using the `HTMLMediaElement.addTextTrack()` method.
The `TextTrack` objects associated with a media element stored in a `TextTrackList`, which can be retrieved using the `HTMLMediaElement.textTracks` property.

## Examples

```html
<video controls poster="/images/sample.gif">
  <source src="sample.mp4" type="video/mp4" />
  <source src="sample.ogv" type="video/ogv" />
  <track kind="captions" src="sampleCaptions.vtt" srclang="en" />
  <track kind="chapters" src="sampleChapters.vtt" srclang="en" />
  <track kind="subtitles" src="sampleSubtitles_de.vtt" srclang="de" />
  <track kind="subtitles" src="sampleSubtitles_en.vtt" srclang="en" />
  <track kind="subtitles" src="sampleSubtitles_ja.vtt" srclang="ja" />
  <track kind="subtitles" src="sampleSubtitles_oz.vtt" srclang="oz" />
  <track kind="metadata" src="keyStage1.vtt" srclang="en" label="Key Stage 1" />
  <track kind="metadata" src="keyStage2.vtt" srclang="en" label="Key Stage 2" />
  <track kind="metadata" src="keyStage3.vtt" srclang="en" label="Key Stage 3" />
  <!-- Fallback -->
  …
</video>
```

## Technical summary

       |
        Content categories

       | None

       | Permitted content
       | None; it is a void element.

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       |

          A media element, `<audio>` or ``.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLTrackElement`

## See also

- WebVTT text track format
- `HTMLMediaElement.textTracks`
