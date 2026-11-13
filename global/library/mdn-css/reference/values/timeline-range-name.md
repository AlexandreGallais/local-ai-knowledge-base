---
title: "`<timeline-range-name>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/timeline-range-name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<timeline-range-name>` CSS type

The **`<timeline-range-name>`** enumerated data type is a CSS identifier representing one of the predefined named timeline ranges inside a view progress timeline.

The `<timeline-range-name>` keyword values are used in keyframe selectors and the following longhand and shorthand properties:

- `animation-range-end`
- `animation-range-start`
- `animation-range` shorthand
- `timeline-trigger-activation-range-end`
- `timeline-trigger-activation-range-start`
- `timeline-trigger-activation-range` shorthand
- `timeline-trigger-active-range-end`
- `timeline-trigger-active-range-start`
- `timeline-trigger-active-range` shorthand

## Syntax

Valid `<timeline-range-name>` values:

- `cover`
    Represents the full range of a view progress timeline, from the point where the subject element's start border edge first enters the scrollport's view progress visibility range (`0%` progress) to the point where the end border edge has completely left it (`100%` progress). This is the default range for view progress timelines.

- `contain`
    Represents the range of a view progress timeline where the subject element is fully contained by, or fully contains, the view progress visibility range within the scrollport
    - If the subject element is smaller than the scrollport, it ranges from the point where the subject element is first completely contained by the scroll port (`0%` progress), to the point where it is no longer completely contained by the scroll port (`100%` progress).
    - If the subject element is larger than the scrollport, it ranges from the point where the subject element first completely covers the scroll port (`0%` progress), to the point where it no longer completely covers the scrollport (`100%` progress).

- `entry`
    Represents the range of a view progress timeline from the point where the subject element first starts to enter the scroll port, to the point where it has completely entered the scrollport. `0%` is equivalent to `0%` of the `cover` range. `100%` is equivalent to `0%` of the `contain` range.

- `exit`
    Represents the range of a view progress timeline from the point where the subject element first starts to exit the scroll port, to the point where it has completely exited the scrollport. `0%` is equivalent to `100%` of the `contain` range. `100%` is equivalent to `100%` of the `cover` range.

- `entry-crossing`
    Represents the range during which the principal box crosses the end border edge. The start (0% progress) of the range occurs when the start border edge of the element's principal box coincides with the end edge of its view progress visibility range. The end (100%) of the range is the point at which the end border edge of the element's principal box coincides with the end edge of its view progress visibility range. The size of the range is the size of the element's principal box in the scroll direction.

- `exit-crossing`
    Represents the range where the principal box crosses the start border edge. The range start (0% progress) occurs when the start border edge of the element's principal box coincides with the start edge of its view progress visibility range. The range end (100% progress) is the point at which the end border edge of the element's principal box coincides with the start edge of its view progress visibility range. The size of the range is the size of the element's principal box in the scroll direction.

- `scroll`
    Represents the full range of the scroll container on which the view progress timeline is defined. The range start (0% progress) and end (100% progress) occur at the very start and end positions of the scroll container underlying the view progress timeline. This is the default range for scroll progress timelines.

## Examples

See the View timeline range visualizer.

## See also

- `animation-range-start`, `animation-range-end`, `animation-range`
- `animation-timeline`
- `scroll-timeline`
- `view-timeline-inset`
- `scroll()`, `view()`
- Understanding timeline range names
- Scroll-driven animation timelines
- CSS scroll-driven animations module
- CSS animation triggers module
- View timeline range visualizer
