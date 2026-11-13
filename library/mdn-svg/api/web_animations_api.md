---
title: "Web Animations API"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/web_animations_api/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Web Animations API

The **Web Animations API** allows for synchronizing and timing changes to the presentation of a Web page, i.e., animation of DOM elements. It does so by combining two models: the Timing Model and the Animation Model.

## Concepts and usage

The Web Animations API provides a common language for browsers and developers to describe animations on DOM elements. To get more information on the concepts behind the API and how to use it, read Using the Web Animations API.

### Accessibility

Blinking and flashing animation can be problematic for people with cognitive concerns such as Attention Deficit Hyperactivity Disorder (ADHD). Additionally, certain kinds of motion can be a trigger for Vestibular disorders, epilepsy, and migraine, and Scotopic sensitivity.

Consider providing a mechanism for pausing or disabling animation, as well as using the Reduced Motion Media Query (or equivalent user agent client hint `Sec-CH-Prefers-Reduced-Motion`) to create a complementary experience for users who have expressed a preference for no animated experiences.

- Designing Safer Web Animation For Motion Sensitivity · An A List Apart Article
- An Introduction to the Reduced Motion Media Query | CSS-Tricks
- Responsive Design for Motion | WebKit
- MDN Understanding WCAG, Guideline 2.2 explanations
- Understanding Success Criterion 2.2.2 | W3C Understanding WCAG 2.0

## Web Animations interfaces

- `Animation`
    Provides playback controls and a timeline for an animation node or source. Can take an object created with the `KeyframeEffect()` constructor.
- `KeyframeEffect`
    Describes sets of animatable properties and values, called **keyframes** and their timing options. These can then be played using the `Animation()` constructor.
- `AnimationTimeline`
    Represents the timeline of animation. This interface exists to define timeline features (inherited by `DocumentTimeline` and future timeline objects) and is not itself accessed by developers.
- `AnimationEvent`
    Part of the CSS Animations module, capturing the animation name and elapsed time.
- `DocumentTimeline`
    Represents animation timelines, including the default document timeline (accessed using the `Document.timeline` property).

## Extensions to other interfaces

The Web Animations API adds features to `document` and `element`.

### Extensions to the `Document` interface

- `document.timeline`
    The `DocumentTimeline` object representing the default document timeline.
- `document.getAnimations()`
    Returns an Array of `Animation` objects currently in effect on elements in the `document`.

### Extensions to the `Element` interface

- `Element.animate()`
    A shortcut method for creating and playing an animation on an element. It returns the created `Animation` object instance.
- `Element.getAnimations()`
    Returns an Array of `Animation` objects currently affecting an element or which are scheduled to do so in the future.

## See also

- CSS `animation` shorthand property
- CSS `animation-timeline` property
- Using the Web Animations API
- Using CSS animations
- CSS animations module
- CSS scroll-driven animations module
