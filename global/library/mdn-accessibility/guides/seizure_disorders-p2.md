---
title: "Web accessibility for seizures and physical reactions (part 2 of 6)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/seizure_disorders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web accessibility for seizures and physical reactions (part 2 of 6)

## Flashing, blinking, & flickering

Although "flashing" and "blinking" are sometimes used interchangeably, they are not the same. According to the W3C, blinking is a distraction problem, whereas flashing refers to content that occurs more than 3 times per second, and which is sufficiently large and bright. Section 508 prohibits flickering effects with a frequency greater than 3 Hz (flickers per second) and lower than 55 Hz. The Epilepsy Foundation's article "Shedding Light on Photosensitivity, One of Epilepsy's Most Complex Conditions" notes that _"Generally, flashing lights between the frequencies of five to 30 flashes per second (Hertz) are most likely to trigger seizures. In order to be safe, the consensus recommends that photosensitive individuals should not be exposed to flashes greater than three per second."_ For some people, however, flashing/blinking can cause symptoms at less than 3 Hz.

It's important to note that not all flashing and blinking is bad. NASA, in its document titled, "Blinking, Flashing, and Temporal Response" notes that blinking and flashing can be powerful tools for drawing attention—as is necessary for warning buttons (this assumes that users can still see the screen while elements are flashing, which is not always true). For some users, blinking buttons also caution that they must be used sparingly, and with care. As it applies to web design, systems that alert company employees to danger by "hijacking" the screen to provide a flashing warning of emergency need to take into consideration the rate, size, and luminosity changes on the screen as these warnings are flashed.

### Flashing and flickering—how is danger quantified?

According to the article "Photic- and pattern-induced seizures: expert consensus of the Epilepsy Foundation of America Working Group", _"A flash is a potential hazard if it has luminance ≥20 cd/m2, occurs at a frequency of ≥3 Hz, and occupies a solid visual angle of ≥0.006 steradians (approximately 10% of the central visual field or 25% of screen area at typical viewing distances)."_

How far is a typical viewing distance? The recommendation considered for a typical viewing distance at the time of writing was "_the area can be taken as applying to an area >25% of the area of a television screen, assuming standard viewing distances of ≥2 m (∼9 feet)"_. Much has changed since that time, and we are now much closer to our screen.

Certain colors, and/or combinations of colors, also matter. "Certain Colors More Likely To Cause Epileptic Fits, Researchers Find" notes that _"…complexities underlying brain dynamics could be modulated by certain color combinations more than the others, for example, red-blue flickering stimulus causes larger cortical excitation than red-green or blue-green stimulus."_

### Flashing & flashing red

WCAG 2.3.1 general flash and red flash thresholds are defined as follows:

- A **general flash** is defined as a pair of opposing changes in relative luminance of 10% or more of the maximum relative luminance where the relative luminance of the darker image is below 0.80, and where "a pair of opposing changes" is an increase followed by a decrease, or a decrease followed by an increase;
- A **red flash** is defined as any pair of opposing transitions involving a saturated red.

These standards are based on earlier research. In 2004, The Epilepsy Foundation of America convened a workshop developed a consensus on photosensitive seizures, stating _"A flash is a potential hazard if it has luminance at least 20 cd/m2, occurs at a frequency of least 3 Hz, and occupies a solid visual angle of at least 0.006 steradians (about 10% of the central visual field or 25% of screen area at typical viewing distances)."_ The transition to or from a saturated red is important and constitutes a risk on its own: "_Irrespective of luminance, a transition to or from a saturated red is also considered a risk._"

### Size and distance

#### How big? It depends

"Relative" size and distance both matter. According to PEAT, _"The combined area of flashes occurring concurrently occupies no more than a total of one quarter of any 341 x 256 pixel rectangle anywhere on the displayed screen area when the content is viewed at 1024 by 768 pixels."_

The point that the field of vision is an important consideration arises in the article addressing WCAG 2.3.1 continues: "_The 1024 x 768 screen is used as the reference screen resolution for the evaluation. The 341 x 256 pixel block represents a 10 degree viewport at a typical viewing distance. (The 10 degree field is taken from the original specifications and represents the central vision portion of the eye, where people are most susceptible to photo stimuli.)_"

This pixel area ratio calculates for relative size, but distance also matters.

Distance matters because it affects the total field of vision. When viewers wear ocular masks for gaming, the field of vision is likely enveloped in its entirety by the screen. WebXR is an open specification that makes it possible to experience VR in your browser, which can be experienced on phone, computer or headset. The concern about flashing images in an ocular mask is a growing one, since the mask is so close to the eyes.

Research generally indicates that VR usage may actually be safer than normal screen consumption, due to higher refresh rates. As Fisher et al. 2022 summarizes, _"The limited data so far available raise no special seizure concerns in terms of VR technology, although this view may change with more experience. Certain types of VR content, including bright flashes, provocative patterns, or color changes would be expected to provoke seizures, just as they do in the real world."_

(Note that some users will not be able to see with blinking cursors, and may get migraines, motion sickness, and disorientation, although blinking cursors occupy a much smaller area of the screen.)

### Patterns, and parallax

Contrasting dark and light geometric patterns are a known culprit; stripes and checks are the best known examples. The Epilepsy Foundation of America Working Group lists how many light-dark pairs of stripes are likely to provoke seizures, and, in what conditions. If a pattern is unchanging and straight, eight lines is the maximum allowable, but if it undulates, no more than five lines.

Parallax effects can cause disorientation. Use parallax effects with caution; if you must use them, ensure the user has a control to turn them off.

"A pattern with the potential for provoking seizures contains clearly discernible stripes, numbering more than five light-dark pairs of stripes in any orientation. When the light-dark stripes of any pattern collectively subtend at the eye from the minimal-expected viewing distance a solid angle of >0.006 steradians, the luminance of the lightest stripe is >50 cd/m2, and the pattern is presented for ≥0.5 s, then the pattern should display no more than five light-dark pairs of stripes, if the stripes change direction, oscillate, flash, or reverse in contrast; if the pattern is unchanging or smoothly drifting in one direction, no more than eight stripes."

Not all is known, and even with the metrics listed above, additional factors come into play. For example, going from a smaller area to a larger one increases the likelihood that the brain responds, as well as increasing contrast, and increasing spatial frequency from a low to middle. It's also known, although the reasoning is not understood behind it, that going from basic <example-value> (for example, stripes) to a multiple one (for example, the checkered pattern that emerges when laying one set of stripes on top of, but perpendicular to, the original set) affects the brain.

### Colors

Understanding color is important for accessibility. See understanding colors and luminance as it relates to web accessibility and accessibility in general.

How the color relates to its background—usually framed in terms of contrast—and how drastically the color changes frame to frame in animation is important. For more on this, see Three Flashes or Below Threshold Understanding SC 2.3.1.

#### The Special Case of Red

It has been demonstrated that some colors are more likely to cause epileptic fits than others. Human physiology and psychology are affected by the color red in general. Its power to influence behavior has even been noted in animals.

- **Red Desaturation tests:** The human eye is so sensitively tuned to red that ophthalmologists set up a test using it. The Red desaturation test assesses the integrity of the optic nerve. For more information as to how an ophthalmologist uses this test, see Red Desaturation.
- **Red Environment:** Studies have shown that for those who suffer Traumatic Brain Injury, cognitive function is reduced in a red environment.

Saturated Red is a special, dangerous case, and there are special tests for it. In addition to a red environment affecting the cognitive function of those with Traumatic Brain Injury, color in the red spectrum wavelength seems to require special concern and special tests. Dr. Gregg Vanderheiden, when testing the Photosensitive Epilepsy Analysis Tool, noted that the seizure rates were much higher than expected. They found that we are much more sensitive to saturated red flashing. (See the video, The Photosensitive Epilepsy Analysis Tool.)

#### Websafe does not mean seizure-safe

Note that the color **#990000** is considered "**websafe**". That does _not_ mean it is "safe for not causing seizures", it only means that the color may be "safely" reproduced accurately by the technology used to generate color on screens.
