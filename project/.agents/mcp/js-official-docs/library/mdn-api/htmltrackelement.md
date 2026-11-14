---
title: "HTMLTrackElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltrackelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTrackElement

The **`HTMLTrackElement`** interface represents an HTML `<track>` element within the DOM. This element can be used as a child of either `<audio>` or `` to specify a text track containing information such as closed captions or subtitles.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLTrackElement.kind`
    A string that reflects the `kind` HTML attribute, indicating how the text track is meant to be used. Possible values are: `subtitles`, `captions`, `descriptions`, `chapters`, or `metadata`.
- `HTMLTrackElement.src`
    A string that reflects the `src` HTML attribute, indicating the address of the text track data.
- `HTMLTrackElement.srclang`
    A string that reflects the `srclang` HTML attribute, indicating the language of the text track data.
- `HTMLTrackElement.label`
    A string that reflects the `label` HTML attribute, indicating a user-readable title for the track.
- `HTMLTrackElement.default`
    A boolean value reflecting the `default` attribute, indicating that the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate.
- `HTMLTrackElement.readyState` (read-only)
    Returns an `unsigned short` that show the readiness state of the track:

    | Constant  | Value | Description                                                                                                                                                                              |
    | --------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `NONE`    | 0     | Indicates that the text track's cues have not been obtained.                                                                                                                             |
    | `LOADING` | 1     | Indicates that the text track is loading and there have been no fatal errors encountered so far. Further cues might still be added to the track by the parser.                           |
    | `LOADED`  | 2     | Indicates that the text track has been loaded with no fatal errors.                                                                                                                      |
    | `ERROR`   | 3     | Indicates that the text track was enabled, but when the user agent attempted to obtain it, this failed in some way. Some or all of the cues are likely missing and will not be obtained. |

- `HTMLTrackElement.track` (read-only)
    Returns `TextTrack` is the track element's text track data.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## Events

_Inherits events from its parent, `HTMLElement`._

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface:

- `cuechange`
    Sent when the underlying `TextTrack` has changed the currently-presented cues. This event is always sent to the `TextTrack` but is _also_ sent to the `HTMLTrackElement` if one is associated with the track.
    You may also use the `oncuechange` event handler to establish a handler for this event.

## Usage notes

### Loading of the track's text resource

The WebVTT or TTML data describing the actual cues for the text track isn't loaded if the track's `mode` is initially in the `disabled` state. If you need to be able to perform any processing on the track after the `<track>` is set up, you should instead ensure that the track's `mode` is either `hidden` (if you don't want it to start out being presented to the user) or `showing` (to initially display the track). You can then change the mode as desired later.

## See also

- The HTML element implementing this interface: `<track>`.
