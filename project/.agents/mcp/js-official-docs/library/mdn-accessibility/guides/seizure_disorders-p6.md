---
title: "Web accessibility for seizures and physical reactions (part 6 of 6)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/seizure_disorders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web accessibility for seizures and physical reactions (part 6 of 6)

## Developmental & Experimental Features

### Media Queries Level 5

EnvironmentMQ (Planned in Media Queries Level 5)

- `light-level`
    `light-level` has three valid values: dim, normal, and washed. Interestingly, the specification refrains from actually defining the three levels in terms of a measurement of lux, because devices with a light sensor usually adjust the brightness of the screen automatically. The specifications also note the difference in technology, such as e-ink, which remains readable in bright daylight, versus liquid crystals, which do not.
- `environment-blending`
    From W3C's Draft document, Media Queries Level 5: _"The `environment-blending` media feature is used to query the characteristics of the user's display so the author can adjust the style of the document. An author might choose to adjust the visuals and/or layout of the page depending on the display technology to increase the appeal or improve legibility."_

#### User Preference Media Features (Planned in Media Queries Level 5)

User Preference Media Features in W3C Editor's Draft Media Queries Level 5 are especially promising in providing user control over media. Here are some highlights:

- `inverted-colors`
    According to the section, User Preference Media Features, "The `inverted-colors` media feature indicates whether the content is displayed normally, or whether colors have been inverted."
- `forced-colors`
    In `forced-colors-mode`, the user agent enforces the user's preferred color palette on the page, overriding the author's chosen colors. From W3C's Draft document, Media Queries Level 5 section on forced-colors: _"The forced-colors media feature is used to detect if the user agent has enabled a forced colors mode where it enforces a user-chosen limited color palette on the page"._ The user will need to be made aware of this ability, and it will need to play nice with the appropriate value for the prefers-color-scheme media query.
- `light-level`
    From W3C's Draft document, Media Queries Level 5 section on light-level: _"The `light-level` media feature is used to query about the ambient light-level in which the device is used, to allow the author to adjust style of the document in response."_ This will be a godsend to those who have motor-skills problems, or for some with cognitive difficulties, who cannot find the right "button" to change their screen settings.
- prefers-contrast
    From W3C's Draft document, Media Queries Level 5 section on `prefers-contrast`: _"The `prefers-contrast` media feature is used to detect if the user has requested the system increase or decrease the amount of contrast between adjacent colors. For example, many users have difficulty reading text that has a small difference in contrast to the text background and would prefer a larger contrast."_ Sometimes there can be such a thing as too much contrast; a halo effect around text can occur in such situations and actually reduce legibility. Putting the amount of contrast in the user's control is a definite gift for accessibility.

#### `MediaQueryList` Interface

Section 4.2 from the CSSWG.org drafts integrates with the event loop defined in HTML. HTML for the `MediaQueryList` object. See the MDN document, MediaQueryList for more information.

#### Personalization Help and Support

The requirement for the `literal` property is taken from WAI-Adapt: Help and Support.

**Requirement:** Some users cannot understand non-literal text and icons such as metaphors, idioms etc. The `literal` property is intended to identify text or images as non-literal and allows the author to explain non-literal text and images to users.

## See also

### MDN

- Accessibility: What users can do to browse more safely
- Accessibility: Understanding color and luminance
- Applying SVG effects to HTML Content
- Basic <example-value> (Canvas Tutorial)
- Canvas API
- CanvasRenderingContext2D.drawImage()
- `<color>`
- Document Object Model
- MediaQueryList
- Using dynamic styling information
- WebGL: 2D and 3D graphics for the web
- WebVR API

### Color

- Color Tutorial: describing color Tom Jewett
- Formula to Determine Brightness of RGB color Stack Exchange Discussion Thread
- How the Color Red Influences Our Behavior Scientific American By Susana Martinez-Conde, Stephen L. Macknik on November 1, 2014

### Discussions

- Problems with WCAG 2.0 Flash Definition #553
- WCAG 2.1 Understanding 2.3.1 - missing/vague dimension definitions #585

### Epilepsy and Seizures

- Shedding Light on Photosensitivity, One of Epilepsy's Most Complex Conditions Epilepsy Foundation: _"Certain individuals are born with special sensitivity to flashing lights or contrasting visual patterns, such as stripes, grids and checkerboards. Because of this condition, their brain will produce seizure-like discharges when exposed to this type of visual stimulation."_
- Gamma oscillations and photosensitive epilepsy Current Biology Volume 27, Issue 9, 8 May 2017, Pages R336-R338: _"Certain visual images, even in the absence of motion or flicker, can trigger seizures in patients with photosensitive epilepsy."_
- Photosensitive Seizures. Cedars-Sinai "_Photosensitive seizures are triggered by flashing or flickering lights. These seizures can also be triggered by certain patterns such as stripes._"
- Photic-and pattern-induced seizures: expert consensus of the Epilepsy Foundation of America Working Group Eplepsia 2005 Sept, 46(9):1423-5 PubMed.gov NCBI Harding G, Wilkins AJ, Erba G, Barkley GL, Fisher RS; Epilepsy Foundation of America Working Group.

### GPII

- Accessibility Master List Gregg Vanderheiden Ph.D. Editor

### ISO

- IEC 61966-2-2:2003(en) Multimedia systems and equipment — Colour measurement and management — Part 2-2: Colour management — Extended RGB color space — scRGB

### Photosensitive Epilepsy Analysis Tool

Along with the Harding tool, is generally recognized to be one of the two "gold standards" for analyzing flashes.

- Trace Research and Development Center
- Using PEAT To Create Seizureless Web Animations

### W3C

- WAI-Adapt Explainer
- WAI-Adapt: Tools Module Working Draft
- Three Flashes or Below Threshold Understanding SC 2.3.1 Understanding WCAG 2.0 (Older, but contains some explanations of references made in the WCAG 2.1 criteria)
- Three Flashes or Below Threshold Understanding Success Criterion 2.3.1 Understanding WCAG 2.1
- Understanding Success Criteria 1.4.3: Contrast (Minimum)
- Web Accessibility Initiative (WAI)
- Web Content Accessibility Guidelines (WCAG) 2.2 definition of relative luminance
