---
title: "Web accessibility for seizures and physical reactions (part 5 of 6)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/seizure_disorders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web accessibility for seizures and physical reactions (part 5 of 6)

### JavaScript animation

JavaScript is often used to control `<canvas>` elements and SVGs. Most JavaScript code that applies to HTML video also applies to audio. `HTMLMediaElement.playbackRate` is used to implement user controls for the playback rate for both video and audio. A value of 1.0 is default and considered normal speed; a value of 0.5 is half the speed, a value of 2.0 is twice the speed. A negative number plays the video or audio backwards. Set the playback rate property: `HTMLMediaElement.playbackRate = playbackSpeed`.

document.getAnimations() is an experimental technology, and includes CSS Animations, CSS Transitions, and Web Animations. The MDN page on Document.getAnimations() provides the following code sample of how to slow down all animations on a page to half speed:

```js
document.getAnimations().forEach((animation) => {
  animation.playbackRate *= 0.5;
});
```

#### Image sources for animation

One of the easiest ways is to start with an image that is already in existence, using it as an image source, and then animating it. Remember, you can use GIFs, JPGs, PNGs, SVGs and other file types here as an image source, as long as they are allowed file types—and sizes—in your environment. SVGs are often not allowed, due to security concerns. The MDN document, Basic <example-value>, provides outstanding examples of this, using multiple image sources for the sun, earth, and moon, and using several canvas methods to control the speed and animation of the earth as it orbits around the sun, and the moon as it orbits around the earth. Use the codepen available with this tutorial to adjust `ctx.rotate` in the code to see how the animation is affected when changes are made.

#### If you absolutely, positively must use a flashing animation…

Make sure it has a control on it. Make sure it is turned off when the viewer first encounters it, and that a user must opt-in to see the animation.

An example of a format that has no controls available to the user is a gif file. Animation speed is controlled within the gif image itself. Converting an animated gif to video enables controls to be put on the animation, and gives the user agency. There are many free online converters available for use, such as EZGif and GIF to MP4.

#### Set user expectations

Give users a heads-up as to what will happen before they click on that link. Describe the animation that is to follow. See WCAG 2.2 Success Criterion 3.2.5 Change on Request.

#### Keep it small

If you absolutely positively must have flashing, keep it small. Generally speaking, limit the size of the flash to an area approximately 341 by 256 pixels or less. This pixel size assumes that a viewer is at a typical distance from the screen. As mentioned earlier, this size may be too big if the image is to be viewed at close range, such as in a VR headset. WebVR is an open specification that makes it possible to experience VR in your browser. WebVR can be experienced on phone, computer or headset.

If you are designing for a game or VR that uses an ocular mask, **or CAN be used by an ocular mask**, such as in Firefox Reality (a browser for virtual reality), ensure that the size of the rectangle is much smaller than 341 by 256 pixels, because the image is much closer to a user's eyes.

#### Reduce contrast

Normally, higher contrast is a good thing when it comes to accessibility. The greater the contrast of a text color to its background (technically called _luminosity contrast ratio,_ according to W3.org's page on Colors with Good Contrast, the easier such content is to read. Users with low vision are especially appreciative of efforts to ensure high contrast of text against its background. When the content is animated, however, **_reducing_** contrast is actually a way to reduce the likelihood that the animated content will cause seizures. Drop the contrast ratio if three flashes within one second are detected.

The contrast ratio is defined in WCAG 2.2 as follows:

- _contrast ratio_
    (L1 + 0.05) / (L2 + 0.05), where
    - L1 is the relative luminance of the lighter of the colors, and
    - L2 is the relative luminance of the darker of the colors.

It's best if you can adjust the contrast before it is uploaded or published to the web. For videos and animated GIFs, the Adobe Suite of products is a phenomenal resource for traditional images. Also for images, an online tool available is pinetools.com's Brightness and contrast online. If you intend to make animated GIFs, for example, start with one that has a lower contrast ratio.

JavaScript is also an option for reducing contrast dynamically. Here's a code example from the section titled, "Example: Setting the background color of a paragraph". Notice that the color in the example is described in the **RGB** color space.

**HTML Content (link to source page)**

```html
<body>
  <input type="button" value="Set paragraph background color" />
  <p>hi</p>
  <p>hello</p>
</body>
```

**JavaScript Content (link to source page)**

```js
function setBackground() {
  // now, get all the p elements in the document
  const paragraphs = document.getElementsByTagName("p");

  // get the second paragraph from the list
  const secondParagraph = paragraphs[1];

  // set the inline style
  secondParagraph.style.background = "red";
}

document.querySelector("input").addEventListener("click", setBackground);
```

#### Avoid fully saturated reds for flashing content

As mentioned earlier in this document, the Epilepsy Foundation of America convened a workshop in August 2004 to begin to develop an expert consensus on photosensitive seizures. Among their results was the understanding that _"A flash is a potential hazard if it has luminance at least 20 cd/m2, occurs at a frequency of least 3 Hz, and occupies a solid visual angle of at least 0.006 steradians (about 10% of the central visual field or 25% of screen area at typical viewing distances). A transition to or from saturated red also is considered a risk."_ They also note in that same consensus: _"Irrespective of luminance, a transition to or from a saturated red is also considered a risk."_

### Provide alternative CSS styles

With the understanding that much of animation and flashing can be controlled via CSS methods, it's important to explore ways to make alternative options available to users, and to make the control of these options convenient and visible.

#### Alternative Style Sheets

Modern browsers will display the alternate CSS available in alternate style sheets if the users know where to look for them. In some cases, the alternate styles are revealed when the users go through the View menu, in other cases they are manifested in the settings, sometimes both. Not all users know to look for these options via the browser or settings, so it's worth considering doing things the old-fashioned way, with obvious buttons or links to change the style so that users can see them. Doing so won't conflict with, or override, the browser's ability to read the alternate style sheets, or the ability of the user to set preferences in the settings.

It's important to know that certain users, such as those who rely on speech-recognition systems, often depend on legacy buttons and links because their disability prevents them from using a mouse, or to be able to take advantage of touch events on mobile tablets.

Common ways to include the alternative stylesheets into your HTML documents are to use the `<link>` element, and `@import`.

#### The `<link>` element

Use the `<link>` element, alongside with and together with the attributes of `rel="alternate stylesheet"` and for title, `title="…"` in the `<head>` section of the webpage.

```html
<head>
  <title>Home Page</title>
  <link href="main.css" rel="stylesheet" title="Default Style" />
  <link
    href="alternate1.css"
    rel="alternate stylesheet"
    title="Alternate One" />
  <link
    href="alternate2.css"
    rel="alternate stylesheet"
    title="Alternate Two" />
</head>
```

**`@import`** is also a way to incorporate style sheets, but it is not quite as well supported as the `<link>` element.

```css
@import "alternate1.css";
@import "alternate2.css";
```

By using alternate style sheets (remember to add the titles) you are setting it up for users to be able to use their browsers to choose alternate styles.

### Dynamic Style Switching

One problem with relying on the browser to reveal alternative styles is that not all users are technically savvy enough to discover the alternate styles. Or, because of their disability, are not able to. Buttons or links make it obvious that options are available to many grateful users. There's a multitude of ways to add toggle buttons to allow the user to switch to the different style sheets. That said, the use of alternative style sheets are not the only option. Another option is to manipulate the style of the page itself. According to the MDN document, Using dynamic styling information, _"where possible, it really is best practice to dynamically manipulate classes via the `className` property since the ultimate appearance of all of the styling hooks can be controlled in a single stylesheet"._ One of the best examples around as to how to do this is from the W3C's page, "C29: Using a style switcher to provide a conforming alternate version".

### Extreme Cases: Text-Only Alternatives

A separate, alternative stylesheet that prevents images from being displayed is easy to make. It's a draconian solution; but it is one that is sometimes necessary for school teachers and other public servants who must serve those with extreme sensitivities. These public servants can ask their developers to develop a special alternative style sheet using `display: none`. Here's how to do it via CSS:

```css
img {
  display: none;
}
```

#### Take advantage of media queries with `<style>`

In setting up media queries, you are enabling controls by the user; these controls are made available in the browser or in the OS. See the MDN document, Accessibility: What users can do to browse more safely to see more details of how a user accesses the controls.

#### `prefers-reduced-motion`

Support for `prefers-reduced-motion` in modern browsers is growing.

```css
@media screen and (prefers-reduced-motion: reduce) {
}
@media screen and (prefers-reduced-motion) {
}
```

To see a great example of how to use the code `prefers-reduced-motion`, visit the MDN document, `prefers-reduced-motion`, or see the example below from the section on "New in Chrome 74".

```css
button {
  animation: vibrate 0.3s linear infinite both;
}

@media (prefers-reduced-motion: reduce) {
  button {
    animation: none;
  }
}
```

#### `prefers-color-scheme`

This can be useful if the ambient light API is not available. Support is emerging.

```css
@media (prefers-color-scheme: dark) {
  /* adjust styles for dark mode */
}
```

#### Window.matchMedia()

There is a powerful tool available to developers via Window.matchMedia(). A great resource is MDN's document on `Window.matchMedia()`.

#### Media update feature

The more often the screen is refreshed, the more stable it appears to the human eye, and the less it "flickers". The vast majority of modern technology refreshes at a rate that does not cause problems with photosensitivity. However, not everybody is wealthy enough to be able to afford the most recent technology: older or underpowered computers can have low refresh rates. AbilityNet's Factsheet (November 2015) Computers and Epilepsy describes more of the details on refresh rates.

A very old article, Tech Republic's "Epilepsy and CRT/LCD screen flicker", had an interesting response concerning the refresh rates in Hz:

- _"This effect is noticeable, and documented, up to 70 Hz."_
- _"These studies would seem to indicate that you should stay away from refresh rates under 70 Hz, and use a rate not divisible by 10."_

Eric Bailey, of CSS-Tricks, found an innovative use the update feature which, used in combination with animation-duration or transition-duration, to conclude at a rate that is imperceptible to the human eye. In other words, Eric's techniques address the refresh-rate problem. The CSS below is from the CSS-Tricks article, " Revisiting prefers-reduced-motion, the reduced motion media query".

```css
@media screen and (prefers-reduced-motion: reduce), (update: slow) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important; /* Hat tip Nick/cssremedy (https://css-tricks.com/revisiting-prefers-reduced-motion/#comment-1700170) */
    transition-duration: 0.001ms !important;
  }
}
```

The `update` media feature is used to query the ability of the output device to modify the appearance of content once it has been rendered. It has the values of "none", "slow", and "fast".
