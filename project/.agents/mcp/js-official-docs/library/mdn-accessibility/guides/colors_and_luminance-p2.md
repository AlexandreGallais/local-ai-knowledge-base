---
title: "Web Accessibility: Understanding Colors and Luminance (part 2 of 3)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/colors_and_luminance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Accessibility: Understanding Colors and Luminance (part 2 of 3)

## Luminance and Contrast

### Contrast

The contrast between colors ("hues") is a critical component, but the use of color ("hues") alone is not enough to create accessible content. As mentioned before, any calculation of contrast must include luminance.

In addition, the "shape" of the text itself will matter. Thin letters will be harder to read than thick ones; all typefaces need space to "breathe" for human perception.

### Contrast and font size

WCAG contrast guidelines define "large" text as text that is `18pt` (approximately `24px`) or larger when `font-weight` is `normal` and `14pt` (approximately `18.7px`) for `bold` text. Stating:

_Text that is larger and has wider character strokes is easier to read at lower contrast. Therefore, the contrast requirement for larger text is lower. This allows authors to use a wider range of color choices for large text, which is helpful for the design of pages, particularly titles._

While larger text does not require as great color contrast with its background as smaller text, increasing font size is not a panacea.

"Normal" print is usually considered 11.5pt to 12pt, equivalent to 16px on screen. While smaller font may be legible — a user can make out letters at \~70% accuracy — that is not readable. A 16px font size is generally readable for people with normal vision. Someone with 20/40 needs twice that, about a 31px font. This is why the WCAG guidelines require that users have the ability to zoom any text larger.

While a text displayed too small is hard to read, so is a text that is too large. For users with 20/20 vision, with a text size greater than approximately 96px, reading speed decreases. Also, when there is a large disparity between the smallest and largest font size on a page, the larger text will become less readable if users enlarge the smaller text on the page, as most browsers zoom all text as the user zooms.

In general, for accessibility purposes, the more contrast, the better. That changes with animation. "Safer" animation means images with less contrast, not more. For more on color contrast in animation, see Three Flashes or Below Threshold Understanding SC 2.3.1

Also, note that icons need sufficient contrast for perception. See WCAG 2.1 technique G207

### Luminance

It is the difference in the luminance of a color that enables us to see the contrast. Relative luminance is defined in WCAG as "the relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white."

This statement is of course accurate, but may be confusing when used in reference to the RGB color space, which is an integer between 0 and 255. White has 100% relative luminance, black has 0% relative luminance (in most but not all literature). Interpreting for the W3C standard above, that would mean that white, normalized to 1, would have an RGB value of `rgb(255 255 255)` and black, normalized to 0, would have an RGB value of `rgb(0 0 0)`. Note that black and white can also be written as `rgb(100% 100% 100%)` and `rgb(0% 0% 0%)` respectively, which may be more intuitive.

So, where do these numbers of 0 to 255 come from? Historically, graphics engines stored the color channels as a single byte, which means a range of integers between 0 and 255.

The luminances of the primary colors are different. Yellow has a greater luminance than blue, for example. This was done by way of design, _to achieve white alignment of the monitor_, according to the NASA document, "Luminance Contrast in Color Graphics"

A color contrast ratio is meaningless without its luminance component, and once luminance is established, the color contrast ratio can be established.

Where human perception is concerned, a difference in luminance matters more than a color difference. This is important, as luminance contrast enables the development of content that even those with color blindness can see. With this understanding, luminance may be manipulated so that colors that are difficult to see because of their low luminance could be made more legible by placing these colors against another with contrasting luminance. An interesting study by NASA on the color blue, for example, noted that this color, which has low luminance, can be made legible if _care was taken to achieve adequate luminance contrast_ (From the article, Designing with blue)

Calculations for relative luminance are not casual ones. Luckily, there are online luminance and contrast checkers available, and even instructions on how to calculate relative luminance.

## Perceiving color

Color is our perception of the narrow band of visible light, from red through yellow and green to blue. Our sensitivity to these various hues of color are not equal. The light sensitive cells in our eyes, called cones, are tuned to perceive some colors more than others. About 65% of cones are _most_ sensitive to a yellow/green, but also respond to red (we'll call these "red" cones). 30% are green sensitive, and only 5% are blue sensitive. While there are far fewer blue-sensitive cones than the other two types, these cones are very sensitive, which partially makes up for their smaller numbers.

Deep, pure blue is perceived differently than other colors as blue cones do not contribute to luminance and we have far fewer blue cones than red or green.

On the left is the central cone mosaic of standard vision, and on the right is that of someone with protanopia, a form of color vision deficiency, where they are missing the red cones. (Illustration by Mark Fairchild of RIT, Wikimedia Commons)

The red and the green cones join together to create luminance, which we can think of as lightness/darkness without regard to hue. Separately, the red, green, and blue cones allow for standard vision to perceive millions of colors. For accessibility, it's important to know that our brain processes luminance separately from color (hue and colorfulness).

Luminance provides for fine vision details, including differentiating edges and text. Hue and colorfulness carry a third of the detail of luminance. Image data compression takes advantage of this fact. As an example, h.264 video codec samples color at a fourth of the resolution of the luminance.

For accessibility, this means that luminance contrast is critically important for text. Color, as in hue and colorfulness, is important for _distinguishing_ items such as different lines on a map or bars in a graph.

Another essential point to consider is the color or luminance that is surrounding a color. Colors appear differently depending on what is surrounding them. In the following image, both the yellow dots and the gray squares are the same sRGB color. Context-sensitive color perception makes them appear different; your brain's image processing adjusts the perception based on what it thinks is in shadow or not.

The yellow dots in this image are identical colors on your monitor, but they appear different due to context. (Image D.Lyon)

Our contrast, lightness, and color perception are affected by the context of the nearby colors and other features of a design or image. This makes predicting contrast challenging. It is not merely a mathematical ratio between two colors.

To summarize, color is as much about human physiology and perception in the brain as it is about measuring light from a computer screen. It's also important to understand that the ambient light environment affects the ability to perceive color and contrast. Light and its measurements are linear, but human vision and perception are not.

## Adaptation

Our eyes don't adapt equally, in the same way, going from light areas to dark ones and vice versa. This is due to the physiological ways our eyes are built. This affects the ability of a user to read text against a background. At least two kinds of adaptation take place: local adaptation and adaptation to an ambient environment.

Local adaptation occurs right on the "page" a reader is looking at. For example, if you have blue text within a gray "highlighted" area, your eyes will perceive that exact blue text with a gray highlight differently if it is in a black ``, or a white one. This is called _local_ adaptation. This difference in the ability to perceive the text is affected even though the room's ambient lighting does not change.

The implication is that web developers who seek to improve the legibility of text against a background can take advantage of the principles of local adaptation.

Dark adaptation to low luminance is slow. When you come in from outside, where the sun is bright, and walk into a dark room, you are experiencing dark adaptation. It can take a few minutes to adjust to this.

Light adaptation is the reverse. Going from a dark room into bright sunlight is quicker but can also hurt.

The implication is that web developers who seek to improve the legibility of text in which the ambient conditions of a room have changed can take advantage of the `AmbientLightSensor` interface and the `prefers-contrast` media query.

## Saturation

Saturation deserves a special mention in discussions about color ("hues") and accessibility. Generally speaking, most focus is on luminance when attempting to ensure enough contrast between text and its background or evaluating the possibility of inducing seizures in those sensitive to photosensitive seizures. One aspect of color ("hues"), independent of luminance, deserves special attention as it applies to accessibility: the concept of saturation. This is due to its ability to cause seizures in those susceptible to photosensitive seizures, regardless of color's luminance. As discussed in the particular case of red, Harding et al. 2005 noted that, _irrespective of luminance, a transition to or from a saturated red is also considered a risk_.

Saturation is sometimes described as the "purity" or "intensity" of a color. Although these are good definitions for "pigments" in an artist's paint set, they are not as accurate as color definitions from a computer screen.

When it comes to color on a monitor, saturated colors are of a particular wavelength. While the definition of saturation for each color space may differ, saturation is readily measured. The key is to know which color space you are working in and be ready to convert it if necessary.

The color spaces most frequently considered when discussing photosensitivity are the RGB, HSL, and HSV, also known as HSB, color spaces. The HSV color space, which stands for _hue_, _saturation_, and _value_, and the synonym HSB, which stands for _hue_, _saturation_, and _brightness_, are represented in CSS as `color_value/hwb` for _hue_, _whiteness_, and _blackness_.

It's important to know what color space you're working with. For example, saturated colors have a lightness of `0.5` in HSL, while in HWB, they have a value `1`. Saturation in the RGB color space is usually indicated by an RGB value of `255` or `100%` for the color in question. For example, a saturated red of hex value `#ff0000` has an RGB value of `rgb(255 0 0)` and an HSL value of `hsl(0 100% 50%)`. A different saturated red with a hex value of `#ff3300` has an RGB value of `rgb(255 51 0)` and an HSL value of `hsl(12 100% 50%)`. Both are "saturated" reds. They are two different "hues" but are both considered to be a saturated color.

Saturation is not brightness. Brightness refers to how much white or black is mixed in with a color. One can decrease saturation by adding white, black, or gray to the color; to take the example further, brightness can be increased by adding white, reducing saturation. A typical example is to add white to red to get the color pink. Pink is considered a desaturated red.

### Saturation and luminance

There is a loss of saturation at the extremes of luminance and the extremes of black and white. In NASA's effect of luminance on saturation, they point out that there is a loss of saturation at low luminances, and also, "…the loss of saturation at high luminances–the colors converge on white."

## Color combinations

Contrast alone is not enough when it comes to accessibility considerations. In the case of animation, certain color combinations are more likely to cause photosensitive seizures to those who are susceptible to them than others. For example, alternating flashes between red and blue is more problematic than alternating flashes between green and blue. It has been theorized that this is because the "red" sensitive cones of our eyes, which tend to cluster around the fovea (near the center), are physically located at a different location than the "blue" sensitive cones of our eyes, which are located away from the fovea and towards the rims. The electrical signals from the eye to the brain have much to resolve between them as the information is processed in our brains.

Some colors more likely to cause epileptic seizures. Complexities underlying brain dynamics can be modulated by some color combinations more than the others. For example, red-blue flickering stimulus causes larger cortical excitation than red-green or blue-green stimulus.

Certain color combinations can be very problematic on a computer monitor or mobile device, and some color combinations can interfere with some impairments. The combination of red/blue is one such example.

- Never rely on hue alone for differentiating details. Adequate luminance contrast is required.
- The green in a monitor makes up the vast majority of luminance (light), so it will usually be a significant part of the lighter colors.

### Working with blue

Some people cannot differentiate between all colors. Some colors, such as pure blue, are low in luminance. Colors that are low in luminance should be the darker of contrasting colors. Blue is also very low in resolution. There are far fewer blue cones, and they are scattered in our peripheral vision and not present in our central vision. The human eye sees blue at a lower resolution than green and red.

This leads to some blue color use guidelines:

- Pure blues should typically be the darkest of two colors.
- When using blue as the lighter of the two colors, add green to increase contrast and improve readability.

The nature of blue light causes it to focus at a different location on the retina than red, so a pure red and a pure blue color that are immediately adjacent and touching may "shimmer" when next to each other.
