---
title: "Understandable (part 2 of 2)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/understanding_wcag/understandable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understandable (part 2 of 2)

## Guideline 3.3 — Input Assistance: Help users avoid and correct mistakes

This guideline centers around helping users enter correct information when required with the minimum of mistakes.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 3.3.1 Error Identification (A)
       |

          When a user is filling out a form or choosing between options, any
          error that is detected should be clearly reported to the user, along
          with the form control that the error relates to.

          It is advisable to implement client-side error detection and handling,
          via HTML form validation features, and/or JavaScript, whatever is
          best for your situation. When an error is detected, an intuitive error
          message should be shown next to the form input that is at fault to
          help the user correct their inputs. For screen reader users, you can
          use aria live regions to alert the user to a change on the page.

            Note: Server-side validation should always be
            used alongside client-side validation. Client-side validation is too
            easy to turn off or otherwise get around, so it can't be relied on
            alone.

       |
        See
        Form data validation
        for comprehensive validation information, and
        WAI-ARIA: Dynamic content updates
        for information on live regions.

       | 3.3.2 Labels or Instructions (A)
       |

          Clear instructions should be provided when data input is required.
          When a short instruction or prompt is required, you can use
          `` elements for single inputs like name
          or age, a combination or ``s and
          `<fieldset>`s/`<legend>`s
          for multiple inputs that go together (like the elements of a date of
          birth or postal address).

          When more complex explanation is required, you can always include
          explanatory paragraphs too, or maybe you need to try to make your
          forms more intuitive.

       |

            Use meaningful text labels

            How to structure an HTML form

            Text labels and names

       | 3.3.3 Error Suggestion (AA)
       |

          When an error is detected and suggestions for correction are known,
          provide these to the user (e.g., suggesting alternatives when the user
          is choosing a user name and has selected one that is already taken),
          unless doing so would cause a security issue (e.g., when entering a
          password) or context problem (e.g., they are trying to answer a
          question in a quiz app).

          In such cases, when this is appropriate, you'll probably use a
          combination of JavaScript and server-side functionality to check if
          the entry is correct, and if not, what viable suggestions can be given
          to the user. Such suggestions should be displayed usefully in context,
          just like error messages (see 3.3.1).

       | No tutorial suggestions yet.

       | 3.3.4 Error Prevention (Legal, Financial, Data) (AA)
       |

          In the case of forms involved with entry of sensitive data (such as
          legal agreements, e-commerce transactions, or personal data), at least
          one of the following should be true:

          Submissions are reversible.

            Data is checked for errors, and the user is given an opportunity to
            correct them.

            A mechanism is available for confirming and correcting information
            before final submission.

       |

          Reversible — for any view where data can be entered,
          provide an equivalent view that allows you to edit or even delete an
          entry, as appropriate (for example, see
          Django web framework).

          Checking data — as covered in 3.3.1, a combination of
          client-side and server-side validation should be used to detect errors
          and display helpful messages to the user to allow them to correct
          their inputs.

          Confirm and correct — where appropriate, after
          filling in a series of form fields to perform a task (such as buying a
          product), the user should be shown a confirmation screen where they
          can review their inputs and correct anything that doesn't look right.
          This pattern is commonly used on e-commerce sites like Amazon.

       | 3.3.5 Context-sensitive help is available (AAA)
       |
        Provide instructions and other appropriate cues in context to aid form
        completion and submission.

       |
        This really just builds on 3.3.1 and other similar criteria but requires
        more thorough contextual help information and services, e.g., providing a
        dedicated link to a help page or service on each page, providing
        examples showing what successful completion should look like.

       | 3.3.6 Error Prevention (All) (AAA)
       |
        This principle builds on 3.3.4, extending its requirements to all user
        input situations, not just ones involving sensitive data.

       | Again, see 3.3.4.

       |  3.3.7 Redundant entry (A)
       |
      Information that is required that was previously entered or provided by the user in the same process or user flow is either auto-populated or made selectable to the user from a list of options, unless re-entering the information is essential or required for security reasons, or if the information is no longer valid.

       | Check out Understanding redundant entry to learn more.

       |  3.3.8 Accessible authentication (Minimum) (AA)

       |
Cognitive function tests, like remembering a password, are not required for any step in an authentication process unless an alternative is provided, such as an object or personal content (e.g., images, videos, and audio) recognition, or a mechanism to assist (e.g., copy and paste and autosave passwords).

       |  Check out the  accessible authentication documentation for this standard to learn more.

  |  3.3.9 Accessible Authentication (Enhanced) (AAA)
     |
A cognitive function test, like remembering a password, must not be required for any step in an authentication process without providing an alternative that does not rely on a cognitive function test or provides a mechanism to assist the user in completing the cognitive function test. Authentication tests that require the user to recognize objects or identify non-text content the user provided to the website are allowed.

 |  Check out the enhanced accessible authentication documentation (AAA) to learn more.

> **Note:**
> Also see the WCAG description for Guideline 3.3 Input Assistance: Help users avoid and correct mistakes.

## See also

- WCAG
  1. Perceivable
  2. Operable
  3. Understandable
  4. Robust
