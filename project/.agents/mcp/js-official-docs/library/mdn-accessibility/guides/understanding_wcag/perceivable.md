---
title: "Perceivable (part 1 of 2)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/understanding_wcag/perceivable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Perceivable

This article provides practical advice on how to write your web content so that it conforms to the success criteria outlined in the **Perceivable** principle of the Web Content Accessibility Guidelines (WCAG) 2.0 and 2.1. Perceivable states that users must be able to perceive it in some way, using one or more of their senses.

> **Note:**
> To read the W3C definitions for Perceivable and its guidelines and success criteria, see Principle 1: Perceivable - Information and user interface components must be presentable to users in ways they can perceive.

## Guideline 1.1 — Providing text alternatives for non-text content

The key here is that text can be converted to other forms that people with disabilities can use. For example, it can be spoken by a screen reader, converted to large print, or represented on a braille display. Non-text content refers to multimedia such as images, audio, and video.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 1.1.1 Provide text equivalents (A)
       |
        All images that convey meaningful content should be given suitable
        alternative text.

       |
        Text alternatives.

       |
        Complex images or charts should have an accessible alternative provided,
        either on the same page or via a link. Use a regular link instead of
        a `longdesc` attribute.

       |

          A text description may work, or an accessible data table (see
          HTML table accessibility). See W3C's
          Image Description Extension (longdesc)
          for the argument against `longdesc`.

       |
        Multimedia content (i.e., audio or video) should at least have a
        descriptive identification available, such as a caption or similar.

       |

          See Text alternatives
          for static caption options, and
          Audio transcripts,
          Video text tracks
          for other alternatives.

       |
        UI controls such as form elements and buttons should have text labels
        that describe their purpose.

       |
        Buttons are simple—you should make sure the button text describes the
        function of the button (e.g., <code
          >&#x3C;button>Upload image&#x3C;/button></code
        >). For more information on other UI controls, see
        Use semantic UI controls where possible.

       |
        Implement decorative (non-content) images, video, etc., in a way that is
        invisible to assistive technology, so it doesn't confuse users.

       |

          Decorative images should be implemented using CSS background images
          (see
          Backgrounds and borders). If you have to include an image via an
          `` element, give it a blank alt
          (`alt=""`). Otherwise, screen readers may try to read out
          the filepath, etc.

          If you are including background video or audio that autoplays, make it
          as unobtrusive as possible. Don't make it look/sound like content, and
          provide a control to turn it off. Ideally, don't include it at all.

> **Note:**
> Also see the WCAG description for Guideline 1.1: Text alternatives.

## Guideline 1.2 — Providing text alternatives for time-based media

Time-based media refers to multimedia with a duration, such as audio and video. Note that if the audio/video serves as an alternative to existing text content, you don't need to provide another text alternative.

        | Success criteria
        | How to conform to the criteria
        | Practical resource

        | 1.2.1 Provide alternatives for pre-recorded audio-only and video-only content (A)
        | A transcript should be provided for prerecorded audio-only media, and a transcript or audio description should be provided for prerecorded video-only media (i.e., silent video).
        | See Audio transcripts for transcript information. No audio description tutorial is available yet.

        | 1.2.2 Provide captions for web-based video (A)
        | You should provide captions for video presented on the web (e.g., HTML video). This is for the benefit of people who can't hear the audio part of the video.
        | See Video text tracks for HTML video captions. See also Add your own subtitles & closed captions (YouTube).

        | 1.2.3 Provide text transcript or audio description for web-based video (A)
        | You should provide text transcripts or audio descriptions for video presented on the web (e.g., HTML video. This is for the benefit of people who can't see the visual part of the video, and don't get the full content from the audio alone.
        | See Audio transcripts for transcript information. No audio description tutorial is available yet.

        | 1.2.4 Provide captions for live audio (AA)
        | You should provide synchronized captions for all live multimedia that contains audio (e.g., video conferences, live audio broadcasts).
        |

        | 1.2.5 Provide audio descriptions for prerecorded video (AA)
        | Audio descriptions should be provided for prerecorded video, but only where the existing audio does not convey the full meaning expressed by the video.
        |

        | 1.2.6 Provide sign language equivalent to prerecorded audio (AAA)
        | An equivalent sign language video should be provided for any prerecorded content containing audio.
        |

        | 1.2.7 Provide extended video with audio descriptions (AAA)
        | Where audio descriptions cannot be provided (see 1.2.5) due to video timing issues (e.g., there are no suitable pauses in the content in which to insert the audio descriptions), an alternative version of the video should be provided that includes inserted pauses (and audio descriptions).
        |

        | 1.2.8 Provide an alternative for prerecorded media (AAA)
        | For all content that features video, a descriptive text transcript should be provided, for example a script of the movie you are watching. This is for the benefit of hearing-impaired viewers who cannot hear the content.
        | See Audio transcripts for transcript information.

        | 1.2.9 Provide a transcript for live audio (AAA)
        | For any live audio content being broadcast, a descriptive text should be provided, for example a script of the play or musical you are listening to. This is for the benefit of hearing-impaired viewers who cannot hear the content.
        | See Audio transcripts for transcript information.

> **Note:**
> Also see the WCAG description for Guideline 1.2: Time-based Media: Provide alternatives for time-based media.

## Guideline 1.3 — Create content that can be presented in different ways

This guideline refers to the ability of content to be consumed by users in multiple ways, accommodating their differing needs.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 1.3.1 Info and relationships (A)
       |

          Any content structure—or visual relationship made between content—can
          also be determined programmatically, or be inferred from text
          description. The main situations in which this is relevant are:

            Text labels and the form elements they describe. These are
            associated unambiguously using the ``
            element, which can be picked up by screen readers, etc.

            Image alt text. Content images should have text available that
            clearly describes the image's contents, which can be
            programmatically associated with it (e.g., alt text),
            or otherwise is easy to associate (e.g., describes it and is sat
            right next to it). This should mean that the full meaning can still
            be inferred even if you can't see the image.

            Lists. If the order of list items is important, use an ordered list
            (``).

       |
        The whole of

          HTML: A good basis for accessibility
          is packed with information about this, but you should particularly
          refer to
          Good semantics,
          Use semantic UI controls where possible, and
          Text alternatives.

       | 1.3.2 Meaningful content sequence (A)
       |
        A sensible, logical reading order should be easy to determine for any
        content, even if it is visually presented in an unusual way. The order
        should be made obvious by use of correct semantic elements (e.g.,
        headings, paragraphs), with CSS being used to create any unusual layout
        styles, irrespective of the markup.

       |
        Again, refer to
        HTML: A good basis for accessibility.

       | 1.3.3 Sensory characteristics (A)
       |

          Instructions for operating controls or understanding content do not
          rely on a single sense. This may prove inaccessible to people with a
          disability related to that sense, or a device that does not support
          that sense. So, for example:

            "Click the round button to continue"The button should be
            clearly labeled so that it is obvious that it is the button you
            need to press. If there are multiple buttons, make sure they are all
            clearly labeled to distinguish their function.

            "Listen to the audio instructions for guidance"This is
            obviously problematic—audio will be inaccessible to those with
            hearing impairments, whereas text can be read, but also spoken by a
            screen reader if required.

            "Swipe from the right-hand side of the screen to reveal the menu"Some
            users might not be able to swipe the screen, either due to
            disability or because their device does not support touch. An
            alternative should be provided, such as a keyboard shortcut or
            button that can be activated by keyboard or other means.

            Note: Conveying instructions solely by color is
            related, but covered in a different guideline — 1.4.1.

       |

       |
        1.3.4 Orientation (AA)

       |
        Content does not restrict its view and operation to a single display
        orientation, such as portrait or landscape, unless a specific display
        orientation is essential.

       |

          Understanding Orientation

       |
        1.3.5 Identify Input Purpose (AA)

       |

          Follow the list of
          53 input fields
          to programmatically identify the purpose of a field.

       |
        Understanding Identify Input Purpose

       |
        1.3.6 Identify Purpose (AAA)

       |
        In content implemented using markup languages, the purpose of user
        interface components, icons, and regions can be programmatically
        determined.

       |
        Understanding Identify Purpose

> **Note:**
> Also see the WCAG description for Guideline 1.3: Adaptable: Create content that can be presented in different ways without losing information or structure.
