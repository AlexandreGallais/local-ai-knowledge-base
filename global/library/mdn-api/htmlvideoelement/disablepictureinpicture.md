---
title: "HTMLVideoElement: disablePictureInPicture property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/disablepictureinpicture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: disablePictureInPicture property

The **`disablePictureInPicture`** property of the `HTMLVideoElement` interface reflects the `disablepictureinpicture` HTML attribute indicating whether the picture-in-picture feature is disabled for the current element.

This value only represents a request from the website to the user agent.
User configuration may change the eventual behavior—for example, Firefox users can change the `media.videocontrols.picture-in-picture.respect-disablePictureInPicture` setting to ignore the request to disable PiP.

## Value

A boolean value that is `true` if the picture-in-picture feature is disabled for this element.

When `true`, the user agent will not suggest picture-in-picture to users, or request it automatically.
