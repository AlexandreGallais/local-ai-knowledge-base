---
title: "Operable (part 2 of 2)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/understanding_wcag/operable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Operable (part 2 of 2)

## Guideline 2.5 Input Modalities: Make it easier for users to operate functionality through various inputs beyond keyboard

The conformance criteria under this guideline ensures that users are able to interact with digital technology using different input methods beyond a keyboard or mouse (including touchscreen, voice, device motion, or alternative input devices).

    | Success criteria
    | How to conform to the criteria
    | Practical resource

    | 2.5.1 Pointer Gestures (A)
    | All functionality that can be operated with a pointer can be operated with single-point actions. Path-based or multi-point gestures are not required to operate any functionality. Exceptions exist.
    | Understanding Pointer Gestures

    | 2.5.2 Pointer Cancellation (A)
    | For functionality that can be operated using a single-pointer at least one of the following is true: no down-event, abort/undo, up reversal or essential.
    | Understanding Pointer Cancellation

    | 2.5.3 Label in Name (A)
    | For each user interface component that includes a visible text label, make sure the accessible name matches (or includes) the visible text in the label.
    | Understanding Label in Name

    | 2.5.4 Motion Actuation (A)
    | Ensure that for functionality that can be triggered by a) device motion (like shaking, tilting) or b) user gestures detected by device sensors (including a camera) that both of the following are true: 1) motion actuation can be disabled, and 2) the functionality can be operated without using device motion or user gestures. Exceptions exist.
    | Understanding Motion Actuation

    | 2.5.5 Target Size (AAA)
    | The size of an actionable item's touch target must be at least 44 CSS pixels in both width and height. Exceptions exist.
    | Understanding Target Size

    | 2.5.6 Concurrent Input Mechanisms (AAA)
    | Make sure people can use and switch between different modes of input when interacting with digital content including touchscreen, keyboard, mouse, voice commands, or alternative input devices. An essential exception exists.
    | Understanding Concurrent Input Mechanism

  |  2.5.8 Target size minimum (AA)
  |  Target size for pointer inputs should be at least `24px` wide by `24px` tall except for the following areas:

   Spacing:Targets that are less than `24px x 24px` are positioned so that if a `24px` diameter circle is centered on each target's bounding box, the circles do not intersect with any other target or the circle for another undersized target.
   Equivalent: A separate control that achieves the same function that meets this standard is available on the same page.
   Inline: The target is located within a line of text with its size constrained by the line height or surrounding non-target text.
   User agent control: The target's size is determined by the user agent and has not been modified by the author.
   Essential: A particular presentation of the target is essential or legally required for the information being conveyed.

  |  Check out Understanding target size minimum

> **Note:**
> Also see the WCAG description for Guideline 2.5: Input Modalities: Make it easier for users to operate functionality through various inputs beyond keyboard.

## See also

- WCAG
  1. Perceivable
  2. Operable
  3. Understandable
  4. Robust
