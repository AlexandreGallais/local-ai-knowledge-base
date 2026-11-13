---
title: "`<input>` HTML input element (part 7 of 7)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input>` HTML input element (part 7 of 7)

## Technical summary

       |
        Content categories

       |
        Flow content, listed, submittable, resettable, form-associated element,
        phrasing content. If the `type` is not
        `hidden`, then labelable element, palpable content.

       | Permitted content
       | None; it is a void element.

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |

            `type=button`:
            <code
              >button</code>

            `type=checkbox`:
            <code>checkbox</code>

            `type=email`

                with no `list` attribute:
                <code
                  >textbox</code>

                with `list` attribute: `combobox`

            `type=image`:
            <code
              >button</code>

            `type=number`: `spinbutton`

          `type=radio`: `radio`
          `type=range`: `slider`

            `type=reset`:
            <code>button</code>

            `type=search`

                with no `list` attribute: `searchbox`

                with `list` attribute: `combobox`

            `type=submit`:
            <code
              >button</code>

            `type=tel`

                with no `list` attribute:
                <code>textbox</code>

                with `list` attribute: `combobox`

            `type=text`

                with no `list` attribute:
                <code>textbox</code>

                with `list` attribute: `combobox`

            `type=url`

                with no `list` attribute:
                <code
                  >textbox</code>

                with `list` attribute: `combobox`

            `type=color|date|datetime-local|file|hidden|month|password|time|week`:
            no corresponding role

       | Permitted ARIA roles
       |

            `type=button`: `checkbox`,
            `combobox`,
            `link`,
            `menuitem`,
            `menuitemcheckbox`,
            `menuitemradio`,
            `option`, `radio`,
            `switch`, `tab`

            `type=checkbox`: `button` when used
            with `aria-pressed`,
            `menuitemcheckbox`,
            `option`, `switch`

            `type=image`: `link`,
            `menuitem`,
            `menuitemcheckbox`,
            `menuitemradio`,
            `radio`, `switch`

            `type=radio`: `menuitemradio`

            `type=text` with no `list` attribute:
            `combobox`, `searchbox`,
            `spinbutton`

            `type=color|date|datetime-local|email|file|hidden|`
              `month|number|password|range|reset|search|submit|tel|url|week`
            or `text` with `list` attribute: no
            `role` permitted

       | DOM interface
       | `HTMLInputElement`

## See also

- CSS `appearance` property
- Your first HTML form
- How to structure an HTML form
- The native form widgets
- Sending form data
- Form constraint validation
- Styling HTML forms
