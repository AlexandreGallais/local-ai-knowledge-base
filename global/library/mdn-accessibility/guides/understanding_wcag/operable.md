---
title: "Operable (part 1 of 2)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/understanding_wcag/operable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Operable

This article provides practical advice on how to write your web content so that it conforms to the success criteria outlined in the **Operable** principle of the Web Content Accessibility Guidelines (WCAG) 2.0 and 2.1. Operable states that user interface components and navigation must be operable.

> **Note:**
> To read the W3C definitions for Operable and its guidelines and success criteria, see Principle 2: Operable — User interface components and navigation must be operable.

## Guideline 2.1 — Keyboard Accessible: Make all functionality available from a keyboard

This guideline covers the necessity of making core website functionality available via a keyboard in addition to other means (e.g., mouse), so that users that rely on keyboard controls can access them.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 2.1.1 Keyboard (A)
       |
        All functionality should be accessible using keyboard controls, unless
        it cannot be done using the keyboard (e.g., freehand drawing). Built-in
        controls should be used where possible (e.g., tabbing through form
        controls), and you should only build in custom functionality where
        needed.

       |
        See
        Use semantic UI controls where possible
        and
        Building keyboard accessibility back in

       | 2.1.2 No keyboard trap (A)
       |

          When entering a section of functionality using the keyboard, you
          should be able to get out of that section again using only the
          keyboard. For example, if you press `Enter`/`Return`
          on a focused button to open an options window, you should be able to
          close that window again and return to the main content using the
          keyboard.

          This is very important so that keyboard users do not get trapped on
          specific sections of your apps.

       |

       | 2.1.3 Keyboard — all functionality (AAA)
       |
        This is a further step beyond criterion 2.1.1. To achieve AAA
        conformance, all functionality should be accessible using keyboard
        controls — with no exceptions.

       |
        See
        Use semantic UI controls where possible
        and
        Building keyboard accessibility back in

       |
        2.1.4 Character Key <example-value> (A)

       |
        If a single character key <example-value> exists, then at least one of the
        following is true: single character key <example-value> can be turned off,
        remapped or are only active when the relevant user interface component
        is in focus.

       |
        Understanding Character Key <example-value>

> **Note:**
> Also see the WCAG description for Guideline 2.1 Keyboard Accessible: Make all functionality available from a keyboard.

## Guideline 2.2 — Enough Time: Provide users enough time to read and use content

This guideline covers situations in which functionality may have a time limit. For example, purchases sometimes need to be completed within a time limit for security reasons.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 2.2.1 Timing is adjustable (A)
       |

          For functionality with time limits (e.g., completing a hotel or flight
          booking often has a time limit), the user should be given controls to
          allow them to adjust, extend or turn off the time limit.

          Exceptions to this are activities with time limits longer than 20
          hours, real-time events (e.g., live multiplayer games), and any other
          activity that requires a time limit and would be invalidated if it
          were turned off.

       |

       | 2.2.2 Pausing, stopping, hiding (A)
       |

          For moving/blinking content that starts automatically, lasts longer
          than 5 seconds, and is shown alongside other content, controls should
          be provided to pause, stop, or hide it. This does not apply to
          moving/blinking content that is essential to the experience. Examples
          include scrolling text and videos.

          For auto-updating information that starts automatically and is shown
          alongside other content, controls should be provided to pause, stop,
          or hide it, or to control the frequency of updates. This does not
          apply to auto-updating content that is essential to the experience.
          Examples include carousels or rotating announcements.

       |

       | 2.2.3 No time limits (AAA)
       |
        This builds on criteria 2.2.1, stating that content that wants to pass
        AAA conformance should have no time limits.

       |

       | 2.2.4 Suppress interruptions (AAA)
       |
        Any interruptions such as alerts or interstitial adverts should have
        functionality available to suppress or postpone them, unless it is an
        emergency alert.

       |

       | 2.2.5 Re-authenticating (AAA)
       |
        If an authentication session expires during usage of a web app, the user
        can re-authenticate and continue their usage without losing any data.

       |

       |
        2.2.6 Timeouts (AAA)

       |

          If there is a timeout (caused by user inactivity) warn users at the
          start of a process so they will not be surprised that a timeout exists
          (or only allow the timeout to occur after 20 hours of inactivity).

       |
        Understanding Timeouts

> **Note:**
> Also see the WCAG description for Guideline 2.2 Enough Time: Provide users enough time to read and use content.

## Guideline 2.3 — Seizures and Physical Reactions: Do not design content in a way that is known to cause seizures or physical reactions

This refers to content that, if not changed, could cause seizures in users with conditions such as epilepsy OR could cause physical reactions (like dizziness) for users with conditions such as vestibular disorders.

     | Success criteria
     | How to conform to the criteria
     | Practical resource

       | 2.3.1 Three flashes, or below threshold (A)
       | Content doesn't contain any aspect that Flashes more than three times per second, or flashing content is below acceptable flash and red flash thresholds.
       |

       | 2.3.2 Three flashes (AAA)
       | Content doesn't contain any aspect that Flashes more than three times per second.
       |

       | 2.3.3 Animations from Interactions (AAA)
       | Allow users to disable animations from interactions (unless the animation is essential).
       | Understanding Animations from Interactions

> **Note:**
> Also see the WCAG description for Guideline 2.3 Seizures and Physical Reactions: Do not design content in a way that is known to cause seizures or physical reactions.

## Guideline 2.4 — Navigable: Provide ways to help users navigate, find content, and determine where they are

The conformance criteria under this guideline relate to ways in which users can be expected to orientate themselves, and find the content and functionality they are looking for on the current page or other pages of the site.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 2.4.1 Bypass <example-value> (A)
       |

          A mechanism should be provided that allows the user to skip straight
          to the main content or functionality available on the page, past the
          repeated features (such as the company logo or navigation). This is
          often achieved using "skip links" — links put at the top of the page
          source that link to the main content and are hidden by CSS.

          If a proper structure of headings and semantic containers is provided
          to navigate with (for example ``,
          ``, etc.), then an added "skip link" is
          not needed.

       | Need to add a section on "skip links".

       | 2.4.2 Include page title (A)
       |
        Each web page should include an informative
        `<title>`, the content of which describes the
        page's content/purpose.

       |
        See
        Adding a title.

       | 2.4.3 Logical focus order (A)
       |
        The "tabbing order" of focusable page features (e.g., links, buttons,
        form inputs) makes logical sense, meaning that the page is still usable
        by non-sighted/keyboard users.

       |
        See
        Use semantic UI controls where possible
        for general advice on tabbing to controls. If you need to place elements
        in an unusual layout, it is better to make sure the source order is
        sensible, then use CSS features like
        positioning
        to handle the layout.

       | 2.4.4 Link purpose (in context) (A)
       |
        The purpose/destination of a link can be determined from the link text,
        or from its surroundings (e.g., the surrounding text). Exceptions are
        where the link purpose is ambiguous to all users (see
        ambiguous to users in general
        for a useful explanation of this).

       |
        See
        Use meaningful text labels. Also note that you should minimize instances where multiple copies of
        the same text are linked to different places. This can cause problems
        for screen reader users, who will often bring up a list of the links out
        of context — several links all labeled "click here", "click here",
        "click here" would be confusing.

       | 2.4.5 Multiple navigation mechanisms (AA)
       |

          You should provide at least two general navigation mechanisms to find
          pages on your website, for example navigation menu, breadcrumb trail,
          site search, site map, list of related links, etc.

          The only exception to this is where a page is one step in a process,
          so should only logically have links to the previous and next steps.

       |
        Most of these mechanisms can be created using fully supported HTML features, for
        example see
        Search field,
        Creating a navigation menu,
        Styling links as buttons.

       | 2.4.6 Headings and labels (AA)
       |
        Heading (e.g., `<<h2>>`) and
        `` elements clearly describe the purpose
        of the content and form elements they are supposed to be describing.

       |

          See
          Use semantic UI controls where possible,
          Use meaningful text labels,
          The basics of headings and paragraphs,
          The &#x3C;label> element.

          Note that you should avoid duplicating headings or labels (e.g.
          multiple instances of "Further information"), unless the structure
          allows you to differentiate between them easily.

       | 2.4.7 Visible focus for focusable elements (AA)
       |
        When tabbing through focusable elements such as links or form inputs,
        there should be a visual indicator to show you which element currently
        has focus. This is usually a dotted or blue outline by default
        (depending on browser, platform, etc.), but this can be overridden by
        CSS.

       |
        See
        Use semantic UI controls where possible.

       | 2.4.8 Location within site (AAA)
       |
        When on a page inside a complex site or set of steps, the user should be
        given an indicator of where they are in the site, for example a
        breadcrumb trail, sitemap or text such as "Form page 2 of 10".

       |

       | 2.4.9 Link purpose (link only) (AAA)
       |
        This criterion builds on 2.4.4, stating that to conform to AAA, the
        purpose/destination of a link should be determinable from the link text
        alone, even if out of context.

       |
        See
        Use meaningful text labels. Also note that you should minimize instances where multiple copies of
        the same text are linked to different places. This can cause problems
        for screen reader users, who will often bring up a list of the links out
        of context — several links all labeled "click here", "click here",
        "click here" would be confusing.

       | 2.4.10 Section headings (AAA)
       |

          As well as creating a useful document structure, headings should also
          accurately describe and break up content areas into logical sections.

          Note that this criterion refers to headings and titles in general web
          content (e.g., headings within text content). Headings and titles for
          user interfaces are a special case covered in criterion 4.1.2.

       |

          See
          The basics of headings and paragraphs.

     |  2.4.11 Focus not obscured (Minimum) (AA)
     |
     When a user interface component receives keyboard focus, the component is not entirely hidden due to containing author-created content.
     Note: If the interface's content can be repositioned by the user, then only the initial position of the user-movable content is considered for testing to conform to this standard. Also, content opened by the user may obscure the component receiving focus. Furthermore, if the user can reveal the focused component without changing keyboard focus, the component with focus is not considered hidden for conformance and testing purposes.

     |
     Check out Understanding focus not obscured (Minimum) to learn more about this standard.

     |  2.4.12 Focus not obscured (Enhanced) (AAA)
     |
     Follows the rules as 2.4.11 except when a user interface component receives focus, no part of the component can be hidden by author-created content. If the interface is configurable, only the initial positions of user-movable content are considered for testing and meeting of this standard.

     |
     Check out Understanding focus not obscured (Enhanced) (Level AAA) to learn more about this standard.

   |  2.4.13 Focus appearance (AAA)
   |
    When the keyboard focus indicator is visible, the area of the focus indicator meets all the following:

      Must be at least as large as the area of a `2px` thick perimeter of the unfocused component or sub-component, which includes component's content, border, and background, excluding outer shadows or glow effects.
      Needs to have a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states

     The exceptions to this are:

      The focus indicator is determined by the user and cannot be adjusted by the author.
      The focus indicator and the indicator's background color are not modified by the author.

   |
     Check out Understanding focus appearance (Level AAA) to learn more about this standard.

> **Note:**
> Also see the WCAG description for Guideline 2.4 Navigable: Provide ways to help users navigate, find content, and determine where they are.
