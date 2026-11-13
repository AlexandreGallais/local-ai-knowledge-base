---
title: "Web Accessibility: Understanding Colors and Luminance (part 3 of 3)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/colors_and_luminance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Accessibility: Understanding Colors and Luminance (part 3 of 3)

## The special case of red

Not all colors ("hue") are processed similarly by our brains. Human physiology and psychology are affected by the color red, generally speaking, in ways different from that of other colors. We respond physiologically as well as psychologically to colors. For example, it has been demonstrated that some colors are more likely to cause epileptic fits than others. Some devices offer a "grayscale" setting as an accessibility option which can help people who are photo-sensitive. To mimic the grayscale setting, use the CSS `filter` property with a `filter-function/grayscale` or `filter-function/saturate` `filter-function`.

### Saturated red

"Saturated Red" is a special, dangerous case, and there are special tests for it.

The concept of color saturation is a difficult one to understand when only looking at numbers and terminology, so consider looking at the image below to illustrate the concept of saturation in a color:

!Red Saturation from Wikimedia Commons svg saved as png Attribution: Datumizer [CC0]

The same "color" proceeds from least saturated on the left-hand side to most saturated on the right-hand side.

_More than one "red" color may be considered a "saturated" red._ For example, the color `#990000` at `hsl(0 100% 30%)` is fully saturated but is less bright than the colors described above. Similarly, the color `#8b0000` also has a saturation of 100%.

Not all saturated reds may be represented well in the RGB spectrum or other spectrums commonly used in web development. According to Wikipedia's page on "Shades of Red", the color "Carmine" is a saturated red which, in its pigment form, mostly contains red light with wavelengths longer than 600nm; the article makes the special note that Carmine "is close to the extreme spectrum. This places it far beyond standard gamuts (RGB and CMYK), and its given RGB value is a poor approximation only."

### Saturated red flashing

In addition to a red environment affecting the cognitive function of those with traumatic brain injury, color in the red spectrum wavelength requires special attention and tests.

Gregg Vanderheiden, when testing the _Photosensitive epilepsy analysis tool_, noted seizure rates were much higher than expected. They found that we are much more sensitive to saturated red flashing. (See the video, The Photosensitive epilepsy analysis tool.)

### Flashing and seizures

Continuous flashing brighter/darker at rates higher than three flashes per second has been shown to induce photic seizures in some people. It has also been found that specific, very regular, high-contrast patterns, such as parallel white and black stripes, can also induce seizures.

Harding et al. 2005 present several fundamental guidelines:

1. Single, double, or triple flashes in one second are acceptable, but a sequence of flashes is not recommended when more than three flashes happen within one second.
2. When displaying light and dark stripes, the pattern should display no more than five light–dark pairs of stripes, if the stripes change direction, oscillate, flash, or reverse in contrast or eight light–dark pairs of stripes, if the pattern is unchanging or continuously and smoothly drifting in one direction.

For more recommendations, see the paper Photic- and Pattern-induced Seizures: Expert Consensus of the Epilepsy Foundation of America.

## Psychophysical aspects of color

Color as in hues and saturation can affect our mood, and enhance — or de-enhance — our interactive experiences.

### Examples of color's effect beyond vision

- **Color can be culturally dependent:** A Cross-Cultural Study of the Affective Meanings of Color
- **Color affects our emotions:** Color and emotion: effects of hue, saturation, and brightness
- **Higher contrasts can also have a positive effect on our emotions:** Emotion Variation from Controlling Contrast of Visual Contents through EEG-Based Deep Emotion Recognition
- **Some colors can affect our perception of time:** Color and time perception: Evidence for temporal overestimation of blue stimuli
- **Blue also has a significant effect on brightness and glare:** Blue and glare & brightness
- **Red tinted glasses can provide increased happiness or joy:** Looking Through "Rose-Tinted" Glasses: The Influence of Tint on Visual Affective Processing
- **Red is well known to have significant effects on our behavior:** How the Color Red Influences Our Behavior, Scientific American, S. Martinez-Conde, Stephen L. Macknik
- **Red Environment:** Studies have shown that for those who suffer Traumatic Brain Injury, cognitive function is reduced in a red environment.

## See also

- Accessibility
- Accessibility learning path
- CSS `color` property
- CSS `<color>` data type
- Web accessibility for seizures and physical reactions
- How the Color Red Influences Our Behavior Scientific American By Susana Martinez-Conde, Stephen L. Macknik on November 1, 2014
- Red Desaturation The human eye is so sensitively "tuned" to red, that ophthalmologists set up a test using it, assessing the integrity of the optic nerve.
- Photic- and pattern-induced seizures: expert consensus of the Epilepsy Foundation of America Working Group
