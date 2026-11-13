---
title: "Web accessibility for seizures and physical reactions (part 3 of 6)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/seizure_disorders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web accessibility for seizures and physical reactions (part 3 of 6)

## Measuring to prevent harm

Measuring the potential for harm is a good starting point. Factors considered within tests include color, luminosity, size, contrast, and in cases of animation, frequency. WCAG 2.1 provides guidance for evaluating content.

In August, 2004, the Epilepsy Foundation of America convened a workshop to begin to develop an expert consensus on photosensitive seizures. The following, expert, and authoritative information is from: Photic- and pattern-induced seizures: expert consensus of the Epilepsy Foundation of America Working Group.

> A flash is a potential hazard if it has luminance ≥20 cd/m2, occurs at a frequency of ≥3 Hz, and occupies a solid visual angle of ≥0.006 steradians (approximately 10% of the central visual field or 25% of screen area at typical viewing distances). A transition to or from saturated red also is considered a risk. A pattern with the potential for provoking seizures contains clearly discernible stripes, numbering more than five light-dark pairs of stripes in any orientation. When the light-dark stripes of any pattern collectively subtend at the eye from the minimal-expected viewing distance a solid angle of >0.006 steradians, the luminance of the lightest stripe is >50 cd/m2, and the pattern is presented for ≥0.5 s, then the pattern should display no more than five light-dark pairs of stripes, if the stripes change direction, oscillate, flash, or reverse in contrast; if the pattern is unchanging or smoothly drifting in one direction, no more than eight stripes. These principles are easier to apply in the case of fixed media, for example, a prerecorded TV show, which can be analyzed frame-by-frame, as compared with interactive media.

The "cd/m2" refers to candela per square meter. So for the web developer, how does this relate to measurements for color, luminance, and saturation?

The candela is a SI unit (International System of units) of luminous intensity. It's a photometric term, and photometry deals with the measurement of visible light as perceived by human eyes. Wikipedia's article on "Candela per square metre" puts it in terms of what we are familiar with as developers: on a display device, and in the RGB space. This is helpful, because there's a specific standard assumed to be used on monitors, printers, and the Internet, and it is the **sRGB** (standard Red Green Blue).

> As a measure of light emitted per unit area, this unit is frequently used to specify the brightness of a display device. The sRGB spec for monitors targets 80 cd/m2. Typically, calibrated monitors should have a brightness of 120 cd/m2. Most consumer desktop liquid crystal displays have luminances of 200 to 300 cd/m2. High-definition televisions range from 450 to about 1500 cd/m2.

The takeaway is that the **sRGB** color space is a common touch point between research, assessment tools, and developers, since it is easily converted from the commonly used Hex code.

### Human physiology and psychology as a consideration

Many experts work to quantify and measure to the greatest extent possible the kinds of web content that can serve as triggers for seizures. That said, it can't be forgotten that color is as much about human perception in the brain as it is the measurement of light coming from a computer screen.

In addition to the psychological variances, there are also physiological differences among us. There will be variances and nuances as to how a real human being perceives, and responds to, color and light. For example, Tom Jewett, Lecturer Emeritus of Computer Sciences at Cal State University Long Beach, notes the following concerning lightness in the HSL color scale _"…The distinction between levels of lightness is not actually linear as the HSL scale would imply; we are much more sensitive to changes in lighter values than to darker ones."_

It's important to understand that light and its measurements are linear, but human vision and human perception are not. Investigation and discussion is ongoing as to how to relate the machine measurement of light as it passes from a computer screen, through the distance to the human eye, filtered by human vision, and then manipulated through the human brain.

Even age and sex can play a role. According to the Epilepsy Foundation's article, "Shedding Light on Photosensitivity, One of Epilepsy's Most Complex Conditions", _"Children and adolescents are more prone than adults to have an abnormal response to light stimulation, and the first light-induced seizure almost always occurs before age 20"._ The article follows with this statistic: _"Girls (60 percent) are more often affected than boys (40 percent), although seizures are more frequent in boys because they are more likely to be playing video games. Video games often contain potentially provocative light stimulation"_.

**User testing is very problematic**. Naturally, no one wants to subject a seizure-prone individual to user testing. It's dangerous. To that point, one of the most ethical thing that developers and designers can do is use tools that have been developed by experts in the field who have worked hand-in-hand with physicians to develop the tool. As of this writing, there are two commonly available tools that have been ethically and professionally developed by researchers and physicians for film/videos: **PEAT**, and the **Harding Test**.

### Photosensitive Epilepsy Analysis Tool (PEAT)

The Trace Research and Development Center has set a gold standard for a Photosensitive Epilepsy Analysis Tool, and they've made a point to make it **_free_** to download. PEAT can help authors determine whether animations or video in their content are likely to cause seizures. Please note the restriction on its use: **_Use of PEAT to assess material commercially produced for television broadcast, film, home entertainment, or gaming industries is prohibited. Use the Harding Test or other tools for commercial purposes._**

To get a free copy of the University of Maryland's Photosensitive Epilepsy Analysis Tool, visit the Trace Research & Development Center.

### The Harding Test

As use of the PEAT tool is prohibited for commercial use, television programmers can use the Harding Test at HardingTest.com. The Harding Test is another gold standard. Television programmers in various countries must pass this test before being able to broadcast, so the group at HardingTest.com provides both analysis and certification of video content.
