---
title: "Web accessibility for seizures and physical reactions (part 1 of 6)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/seizure_disorders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web accessibility for seizures and physical reactions

This article introduces concepts behind making web content accessible for those with vestibular disorders, and how to measure and prevent content leading to seizures and/or other physical reactions.

## Overview

### Seizures

Seizures caused by light are known as photosensitive epilepsy. Content that flickers, flashes, or blinks can trigger photosensitive epilepsy. Web technologies that use video, animated GIFs, animated PNGs, animated SVGs, Canvas, and CSS or JavaScript animations can all produce content that may induce seizures or other incapacitating physical reactions. Certain visual patterns, especially stripes, can also cause physical reactions even though they are not animated. Photosensitive epilepsy is actually a kind of "reflex epilepsy"—seizures occurring in response to a trigger. In the case of photosensitive epilepsy, seizures are triggered specifically by flashing lights, but other types of reflex epilepsies may be triggered by the act of reading or by noises. Patterns and images can also trigger epilepsy.

The fact that static images may cause seizures and other disorders is documented in articles such as "Gamma Oscillations and photosensitive epilepsy", where it is noted "_Certain visual images, even in the absence of motion or flicker, can trigger seizures in patients with photosensitive epilepsy_". The Epilepsy Foundation, in its article, "Shedding Light on Photosensitivity, One of Epilepsy's Most Complex Conditions" talks about static images and patterns: "_Static or moving patterns of discernible light and dark stripes have the same effect as flashing lights because of the alternation of dark and bright areas."_ The Epilepsy Foundation of America Working Group is able to "quantify" the problem a little: _"A pattern with the potential for provoking seizures contains clearly discernible stripes, numbering more than five light-dark pairs of stripes in any orientation_". In addition to stripes, checkered patterns have also been known to cause photosensitive seizures, according to Cedars-Sinai.

Although static images are possible as triggers, they are less consistent. The trigger that is well established and strong is flashing/strobe lights. Dr. Selim Benbadis of USF's Comprehensive Epilepsy Program notes, _"The only thing that is really documented is flashing lights, which can trigger seizures in patients with photosensitive epilepsy. Only a few types of epilepsies are photosensitive though, and the vast majority of epilepsies are not."_ In addition to seizures brought about by photosensitivity, listening to certain pieces of music can also trigger what are called musicogenic seizures, although these types of seizures seem to be much more rare. For a great introduction on the topic of musicogenic seizures, visit Epilepsy Ontario's web page on Musicogenic Seizures.

Seizures and epilepsy are not the same. In its article "A Revised Definition of Epilepsy", the Epilepsy Foundation notes that "_a seizure is an event and epilepsy is the disease involving recurrent unprovoked seizures_." According to the Epilepsy Foundation's page "How Serious Are Seizures?", _"Sudden unexpected death in epilepsy (SUDEP) is likely the most common disease-related cause of death in people with epilepsy. It is not frequent but it is a very real problem and people need to be aware of its risk"_.

The point is, seizures most definitely can be and are fatal, and developers and designers are incredibly important for making the web a safer place for those with sensitivities to photosensitive or musicogenic triggers.

Seizures can be fatal, but even the ones that are "only" debilitating can be of such severity that they render the user incapacitated. Other disorders, such as disorientation, nausea, vomiting, and more can also be so severe that the user is unable to function. The Epilepsy Foundation's article, "Photosensitivity and Seizures", provides a list of triggers that may cause seizures in photosensitive people; here's an excerpt from that list:

- Television screens or computer monitors due to the flicker or rolling images.
- Certain video games or TV broadcasts containing rapid flashes or alternating patterns of different colors.
- Intense strobe lights like visual fire alarms.
- Natural light, such as sunlight, especially when shimmering off water, flickering through trees or through the slats of Venetian blinds.
- Certain visual patterns, especially stripes of contrasting colors.

That same article continues that many factors must combine to trigger the photosensitive reaction. Of note is that it includes the wavelength of light as a possible factor; wavelengths in the red part of the spectrum seem to be especially problematic. In the article, "Understanding WCAG 2.0 Three Flashes or Below Threshold" notes generally that: _"Individuals who have photosensitive seizure disorders can have a seizure triggered by content that flashes at certain frequencies for more than a few flashes"_ and goes on to note, very specifically that: "_People are even more sensitive to red flashing than to other colors, so a special test is provided for saturated red flashing_".

You don't even need an image or video to cause harm. A `` element set to change color and luminosity at high frequency, easily done via JavaScript, can cause real harm. And, flickering can occur everywhere. For example, "spinners" commonly used to display while pages load can easily "flicker" while spinning.

Additional concerns exist for individuals with motor-skill problems. For example, the page for Trace Research & Development Center's Photosensitive Epilepsy Analysis Tool notes that _"Photosensitive seizures can be provoked by certain types of flashing in web or computer content, including mouse-overs that cause large areas of the screen to rapidly flash on and off repeatedly"_.

### Other physical reactions

Nausea, vertigo (or dizziness), and disorientation are very nonspecific symptoms associated with all kinds of diseases and not particularly suggestive of seizures (except maybe disorientation, which is seen in seizures). However, seizures are not the only adverse physical response possible from flashing, flickering, blinking, and other such stimuli. In 1997, a Japanese cartoon featured an animated "virus bomb". Some of the children watching the cartoon reacted by having seizures, others by suffering nausea, shaking, and vomiting blood. The reactions from the children were so severe, they had to be rushed to the emergency room. The physical disorders listed below are all possible consequences: each of these physical reactions may be so severe as to be incapacitating.

- Seizures
- Vestibular Disorders
- Migraines
- Nausea
- Vomiting
