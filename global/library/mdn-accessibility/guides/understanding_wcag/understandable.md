---
title: "Understandable (part 1 of 2)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/understanding_wcag/understandable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understandable

This article provides practical advice on how to write your web content so that it conforms to the success criteria outlined in the **Understandable** principle of the Web Content Accessibility Guidelines (WCAG) 2.0 and 2.1. Understandable states that information and the operation of user interface must be understandable.

> **Note:**
> To read the W3C definitions for Understandable and its guidelines and success criteria, see Principle 3: Understandable — Information and the operation of user interface must be understandable.

## Guideline 3.1 — Readable: Make text content readable and understandable

This guideline focuses on making text content as understandable as possible.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 3.1.1 Language of Page (A)
       |
        The default human language of each web page should be detectable via
        code. This is essential for purposes like making sure the reader has
        arrived at a page written in a language suitable for them. The simplest
        way to achieve this is to set the lang
        attribute on the page's `<html>` element, giving
        it a value equal to the language code that best represents the language
        the page is written in.

       |
        See
        Setting the primary language of the document.

       | 3.1.2 Language of Parts (AA)
       |

          In cases where the content of a page includes words or phrases that
          are in a different language to the primary language, use the
          lang attribute on an element wrapped
          around the term in question (e.g., a ``
          if no semantic element is available) to set an appropriate language
          for it.

          You don't need to set a different language for words or phrases that
          are the same regardless of language (for example proper names,
          technical terms that aren't part of a specific language).

       |

       | 3.1.3 Unusual Words (AAA)
       |
        Where technical terms, jargon, or idioms/slang are used, definitions
        should be provided for such phrases/words. Your site should provide a
        glossary that contains definitions of such words/terms that you can then
        link to when they appear, or at the very least provide definitions
        somewhere in the surrounding text, or in a
        description list
        at the bottom of the page.

       |

       | 3.1.4 Abbreviations (AAA)
       |

          Where abbreviations are used, you should provide an expansion of them,
          or a definition as required.

          The `` element is often thought of as
          the preferred way to provide an expansion for an abbreviation — it
          takes a title attribute that contains the
          expansion, and this appears when the acronym is moused over. However,
          the title contents are not accessible via keyboard, nor are they
          reliably read out by screen readers. A better way to handle this is to
          again provide links to glossary pages containing the acronym expansion
          and explanation, or at the very least include them in the surrounding
          text in context.

       |
        See
        Abbreviations.

       | 3.1.5 Reading Level (AAA)
       |

          If text is provided that requires a higher reading level that lower
          secondary education level (typically children around 11-14 years old),
          provide supplementary explainer material to help people who can't read
          it, or provide an alternative version that is written at lower
          secondary level.

          This doesn't mean that all subject matter should be understood by
          everyone, but that the style of writing should be accessible by
          everyone. It is better to just write all content at lower secondary
          level, even technical documentation like programming tutorials, unless
          there is a good reason not to (e.g., an alternative style for poetic
          effect), or they have to be written in a strict style (e.g., W3C
          specs).

       |

       | 3.1.6 Pronunciation (AAA)
       |

          A mechanism should be provided to give users access to pronunciation
          of words where they are is needed to understand the content fully.

          The HTML `<audio>` element can be used to
          create a control that allows the reader to play back an audio file
          containing the correct pronunciation, and it also makes sense to
          include a textual pronunciation guide after difficult words, in the
          same way that you find in dictionary entries.

       |
        See
        Video and audio content, and
        Pronunciation Guide for English Dictionary

> **Note:**
> Also see the WCAG description for Guideline 3.1 Readable: Make text content readable and understandable.

## Guideline 3.2 — Predictable: Make Web pages appear and operate in predictable ways

This guideline focuses on making user interfaces intuitive and understandable.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 3.2.1 On Focus (A)
       |

          When a control or other page feature receives focus, it should not
          change the context in a way that may confuse or disorientate the user.

          This is a matter of sensible design — people don't want interfaces to
          surprise them; they want things to be intuitive and behave as
          expected. For example, focusing a navigation menu option should not
          change the displayed page — it should be activated before the display
          changes.

       |
        `Element`'s `focus` event contains some
        useful information. Also see
        Building keyboard accessibility back in
        for some useful implementation ideas.

       | 3.2.2 On Input (A)
       |

          When data is inputted into a control, or a setting is changed, context
          should not be changed unexpectedly. The user should be warned/advised
          of the impending change before it occurs.

          Again, sensible design should be implemented. For example, if pressing
          a button causes the application to exit the current view, the user
          should be asked to confirm this action, save their work if
          appropriate, etc.

       |
        The `input` event is useful here.

       | 3.2.3 Consistent Navigation (AA)
       |

          Navigation menu/control style and positioning should be consistent
          between different pages or views of a web page, and the existing items
          should appear in the same order, even if for example new items are
          added. If the user has initiated a change, e.g., choosing a different
          color scheme or position for the navigation, their choice should be
          respected across all pages.

          Again, sensible design — make the navigation controls the same across
          all pages or views.

       |
        See
        Structure page sections logically
        for information on modern markup for layouts. See also
        Styling links as buttons
        for a useful accessible navigation menu example.

       | 3.2.4 Consistent Identification (AA)
       |

          Controls or components that have the same functionality should be
          identified in the same way across different pages or views. A currency
          converter appearing on every page of a world travel site for example
          should be exactly the same, semantically and in terms of labels.

        Again, sensible design!

       |
        "Labels" can refer to descriptive information in text content, or HTML
        form labels. See
        Use meaningful text labels
        for more information.

       | 3.2.5 Change on Request (AAA)
       |

          Changes in context that could possibly confuse or disorient users
          should only occur only when requested by the user, OR the user should
          be able to turn them off.

          If you need to have something that significantly changes the current
          view (e.g., content or controls), let the user control when they want
          that change to occur (e.g., what page to show, when to advance to the
          next photo in the gallery...)

          If you need to have something like a carousel on a page, provide an
          option to stop it automatically advancing. Better to avoid such
          functionality if possible.

       |  3.2.6 Consistent help (A)
       |   Web pages that contain help mechanisms, including self-help options and human contact details, that are repeated on multiple web pages, need to place those mechanisms in the same order on all pages, unless a change is initiated by the user.
       |   Check out the consistent help documentation for this standard to learn more.

> **Note:**
> Also see the WCAG description for Guideline 3.2 Predictable: Make Web pages appear and operate in predictable ways.
