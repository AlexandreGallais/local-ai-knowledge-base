---
title: "Web accessibility for seizures and physical reactions (part 4 of 6)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/seizure_disorders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web accessibility for seizures and physical reactions (part 4 of 6)

## Accessibility Solutions for Developers

All animations are potentially dangerous. As designers and developers our responsibility is to ensure we do no harm either intentionally or unintentionally. If we must include something that has the potential to cause harm, it is vital to prevent users from accidentally encountering the harmful content, and to provide ways for users to prevent and control animations mitigating potential harm.

### What the web developer can do

#### Do no harm

WCAG Guideline 2.3 Seizures and Physical Reactions provides an overview: _"Do not design content in a way that is known to cause seizures or physical reactions"_. Don't include animation that a user cannot control. Don't design with patterns known to cause problems. If you must include a gif or png with flashing in it, record it in a video format instead so that controls are available to the user. Give the user the ability to avoid it, turn it off, or render it less harmful.

#### Understand malice

As a developer or designer, ask yourself if strobing content really needs to be on your webpage. Even if handled properly, there are those who may download offending content from your site and weaponize it. It is believed the first documented attempt at using computers to effect physical harm via animation began Saturday, March 22, 2008: The Epilepsy Foundation's website was hacked via posts with flashing images and links falsely claiming to be helpful. Users with vestibular disorders who were seeking help from the site were affected.

A series of legal considerations are underway after journalist Kurt Eichenwald, a known epileptic, suffered a seizure after being sent an animated gif in December 2016: the flashing gif carried the message, _"You deserve a seizure for your posts"_.

#### Control exposure, control access

Controlling exposure to the page is key to ensuring that someone susceptible to seizures is not exposed to it accidentally. WCAG notes that a single object can make the entire page unusable.

If you believe you may have an image or animation that may cause seizures, control access to it by first displaying a warning about the content, and then putting it in a location where the user must opt in to it, such as clicking a button, or ensuring that the link to the page has a distinct and obvious warning.

Consider setting crawl directives for search engines to hint that they shouldn't include potentially harmful resources in their search indexes.
You can do this using metadata in a `<meta name="robots">` element with restrictive rules like `noindex, nofollow`.
By not indexing the page (`noindex`) and not following links on the page (`nofollow`), the likelihood that users will stumble upon it via search will be reduced:

```html
<html lang="en">
  <head>
    <title>…</title>
    <meta name="robots" content="noindex, nofollow" />
  </head>
  <body>
    …
  </body>
</html>
```

For non-HTML resources, you can set crawl directives in a `X-Robots-Tag` HTTP response header:

```http
X-Robots-Tag: noindex
```

### Animated GIFs

All image types are potentially dangerous, however, animated GIFs deserve special mention because of their ubiquity, and the fact that the animation speed is actually controlled within the GIF file itself.

#### Detect if a GIF is animated

- The animated-gif-detector npm package allows for the ability to determine animate _as early as possible_ in a given HTTP request.
- Zakirt provides a gist for animated-gif-detect.js

With animated GIFs, ensure animation is inactive until the user chooses to activate it. For example, the user must push a button or check a box in order to start the animation.

### Videos

As in the case of animated GIFs, the user must push a button or check a box in order to start the animation. There are many ways to do this, such as NOT adding the `autoplay` attribute to ``, or setting `animation-play-state` to `paused` as an initial state. To see a powerful example of how this can actually work see the article by Kirupa, "Toggling Animations On and Off". Kirupa uses the `animation-play-state` in concert with `transition`, `transform`, and `prefers-reduced-motion` to create a very accessible experience under the user's control.

`animation-play-state` is a CSS property that sets whether an animation is running or paused.

```css
div {
  animation-play-state: paused;
}
```

CSS transitions can be used to set the duration to zero for the initial stage of animation.

```css
div {
  transition-duration: 0s;
}
```

### Ensure the user can also stop animations as well as start them

A `` element with no attributes will not play automatically, and will also have no controls. Ensure that you add the `controls` attribute to the video element so that the user can stop the video as well as start it.

```html
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.ogg" type="video/ogg" />
  Your browser does not support the video tag.
</video>
```

#### Programmatically ensure controls are available

The `HTMLMediaElement.controls` property reflects the `controls` HTML attribute, which controls whether user interface controls for playing the media item will be displayed.

##### Video

To ensure that a video has controls that a user can access, ensure that you add the word "controls" to HTML video and audio elements.

``

```html
<video controls>
  <source src="myVideo.mp4" type="video/mp4" />
  <source src="myVideo.webm" type="video/webm" />
  <p>
    Your browser doesn't support HTML video. Here is a
    <a href="myVideo.mp4">link to the video</a> instead.
  </p>
</video>
```

##### Audio

Taking that same example and applying it to audio:

`<audio controls>`

```html
<audio controls>
  <source src="myAudio.ogg" type="audio/ogg" />
  <source src="myAudio.mp3" type="audio/mpeg" />
  <p>
    Your browser does not support the audio element. Here is a
    <a href="myAudio.mp3">link to the audio</a> instead.
  </p>
</audio>
```

##### Audio as part of Video

Note that the audio in videos can be controlled by the `muted` content attribute, even though the content is within the `` element rather than the `<audio>` element. This example is from the section on muted media attribute description from the HTML Living Standard. It explains that the video will autoplay quietly in the background until the user takes action to unmute the audio.

```html
<video src="adverts.cgi?kind=video" controls autoplay loop muted></video>
```

### Control speed

This seems obvious, but because there are so many MIME types, the mechanisms for handling them varies greatly, and for that reason there's not a one-size-fits-all solution to the problem. This is further complicated by the fact that even how files are classified complicates how they should be handled. For example, the .gif file format is usually understood to be an image, but is also considered a video file format in some circles because of its ability to be animated. For a comprehensive listing of media types, please visit IANA.org's page for Media Types.

The methods for sniffing them out is not a casual exercise. You may be interested in following the MIME Sniffing standard at whatwg.org. Just about every kind of image can be animated; how they are animated varies, and therefore, the control of the animation varies.

#### Commonly animated file types

- **Bitmap**: Animation
- **Canvas**: MDN's tutorial on Canvas has a great section on basic animations. `setInterval()` is a mainstay in Canvas animation, but it is also interesting to see how it interacts with screen refresh. See the article, "Controlling fps with requestAnimationFrame?" in which they discuss the nuts and bolts of implementing `requestAnimationFrame` against the backdrop of screen refresh.
- **GIFs (Raster)**: Tough to crack because control for their animation resides within the gif files themselves. For information about controlling the speed of GIFs see W3C's "G152: Setting animated gif images to stop blinking after n cycles (within 5 seconds)". A great Stack Overflow article on the subject is, "Can you control GIF animation with JavaScript?"
- **GIFV (Raster)**: Considered a variant, video version of GIF. The format is not standardized, and must reference a "real" video file (e.g., a .webm file) which must exist elsewhere.
- **JPG (Raster)**
- **MNG (Raster)**: Multiple-image Network Graphics is a graphics file format for animated images. Also considered by some to be a video format.
- **PNG, APNG (Raster)**: Portable Network Graphics and Animated Portable Network Graphics may both be animated.
- **SVGs (Vector)**: The MDN document, "SVG: Scalable Vector Graphics", notes that _"SVG is a text-based open Web standard. It is explicitly designed to work with other web standards such as CSS, DOM, and SMIL."_ SVGs can be used as an image like in this example: ``. This means that SVG appearance and animation can be controlled through CSS keyframes and animations. For interaction with JavaScript, see the MDN documents on SVG Interfaces and Applying SVG effects to HTML content.
- **Voxel (Raster)**: Three-dimensional voxel raster graphics are employed in video games, as well as in medical imaging.

#### Text can also be animated

Translations and transformations can animate text in a div, and do harm. Moving text can induce seizures for the same reasons that moving images do, so avoid animating your text. It's a good idea to avoid using moving text anyhow, as many screen readers cannot read moving text and it's bad user experience even for those with no vision or vestibular issues.

### CSS for animation

In the style sheet or within the `<style>` element, many options can combine together to create a powerful experience for the user. We've already mentioned the `animation` property earlier in this document. It's actually shorthand for all animation properties, including:

- `animation-play-state`
- `animation-duration` has a value of `<time>`; this is the duration an animation takes to complete one cycle. This may be specified in either seconds `(s)` or milliseconds `(ms)`. A default value of `0s` indicates no animation should occur.
- `animation-timing-function`

The animation property is already powerful on its own, but combined with other properties and queries such as `prefers-reduced-motion`, a powerful set of options can be set up for the user. Setting `animation-duration` and `transition-duration` properties to a short duration rather than setting them to `animation: none` and `transition: none`, enables a safeguard to prevent issues in any case there is a dependency on the animation to run.
