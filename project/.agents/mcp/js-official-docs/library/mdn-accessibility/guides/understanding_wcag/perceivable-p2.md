---
title: "Perceivable (part 2 of 2)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/understanding_wcag/perceivable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Perceivable (part 2 of 2)

## Guideline 1.4: Make it easier for users to see and hear content including separating foreground from background

This guideline relates to making sure core content is easy to discern from backgrounds and other decoration. The classic example is color (both color contrast and use of color to convey instructions), but it applies in other situations too.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 1.4.1 Use of color (A)
       |

          Color should not be solely relied upon to convey information. For
          example, in forms, you should never mark required fields purely with a
          color (like red). Instead (or as well as), something like an asterisk
          with a label of "required" would be more appropriate.

       |
        See
        Use of color,
        Color and color contrast,
        and
        Multiple labels.

       | 1.4.2 Audio controls (A)
       |
        For any audio that plays for longer than three seconds, provide
        accessible controls to play and pause the audio/video, and mute/adjust
        volume.

       |
        Use native `<button>`s to provide accessible keyboard
        controls, as shown in
        Video player styling basics.

       | 1.4.3 Minimum contrast (AA)
       |

          The color contrast between background and foreground content should be
          at a minimum level to ensure legibility:

            Text and its background should have a contrast ratio of at least
            4.5:1.

            Heading (or just larger) text should have a ratio of at least 3:1.
            Larger text is defined as at least 18pt, or 14pt bold.

       |
        See
        Color contrast and
        Color and color contrast.

       | 1.4.4 Resize text (AA)
       |
        The page should be readable and usable when the text size is doubled.
        This means that designs should be responsive, so that when the text size
        is increased, the content is still accessible.

       |

       | 1.4.5 Images of text (AA)
       |
        Images should NOT be used to present content where text would do the
        job. For example, if an image is mostly textual, it could be represented
        using text as well as images.

       |

       | 1.4.6 Enhanced contrast (AAA)
       |
        This follows, and builds on, criterion 1.4.3.

            Text and its background should have a contrast ratio of at least
            7:1.

            Heading (or just larger) text should have a ratio of at least 4.5:1.
            Larger text is defined as at least 18pt, or 14pt bold.

       |
        See
        Color and color contrast.

       | 1.4.7 Low or no background audio (AAA)
       |
        Prerecorded audio recordings that primarily feature speech should have
        minimal background noise, so the content can be easily understood.

       |

       | 1.4.8 Visual presentation (AAA)
       |
        For text content presentation, the following should be true:

          Foreground and background colors should be user-selectable.

            Text blocks should be no wider than 80 characters (or glyphs), for
            maximum readability.

            Text should not be fully justified (e.g., <code
              >text-align: justify;</code
            >).

            Line height should be at least 1.5 times the text size within
            paragraphs (e.g., `line-height: 1.5;`), and at least 2.25
            times the text size between paragraphs (e.g., <code
              >padding: 2.25rem;</code
            >).

            When the text size is doubled, the content should not need to be
            scrolled.

       |

       | 1.4.9 Images of text (No Exception) (AAA)
       |
        Text should not be presented as part of an image unless it is purely
        decoration (i.e., it does not convey any content) or cannot be presented
        in any other way.

       |

       |
        1.4.10 Reflow (AA)

       |

            No horizontal scrolling for left-to-right languages (like English)
            or right-to-left languages (like Arabic)

            No vertical scrolling for top-to-bottom languages (like Japanese)

            Except for parts of the content which require two-dimensional layout
            for usage or meaning (like a large data table)

       |
        Understanding Reflow

       |
        1.4.11 Non-Text Contrast(AA)

       |
        Minimum color contrast ratio of 3:1 for user interface components and
        graphical objects.

       |
        Understanding Non-Text Contrast

       |
        1.4.12 Text Spacing (AA)

       |

          No loss of content or functionality occurs when the following styles
          are applied:

            Line height (line spacing) to at least 1.5 times the font size

            Spacing following paragraphs to at least 2 times the font size

            Letter spacing (tracking) to at least 0.12 times the font size

          Word spacing to at least 0.16 times the font size

       |
        Understanding Text Spacing

       |
        1.4.13 Content on Hover or Focus (AA)

       |

          While additional content may appear and disappear in coordination with
          hover and keyboard focus, this success criterion specifies three
          conditions that must be met:

          dismissible (can be closed/removed)

            hoverable (the additional content does not disappear when the
            pointer is over it)

            persistent (the additional content does not disappear without user
            action)

       |
        Understanding Content on Hover or Focus

> **Note:**
> Also see the WCAG description for Guideline 1.4: Distinguishable: Make it easier for users to see and hear content including separating foreground from background.

## See also

- WCAG
  1. Perceivable
  2. Operable
  3. Understandable
  4. Robust
