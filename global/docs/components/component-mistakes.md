---
id: component-mistakes
title: "Component mistakes a model makes"
topic: components
summary: The ARIA and semantic mistakes models make in own components, each with why it is wrong and what to write instead.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT, written for this base; facts summarized from the ARIA Authoring Practices (W3C), MDN (CC BY-SA 2.5) and published studies
---

# Component mistakes a model makes

Studies of 2025 and 2026 agree: models do well on contrast and alternative texts, badly on ARIA and
semantics, and accessibility instructions alone help little; a check loop helps. [S4] Hence the lint and
the tests of `testing-a11y.md`.

## Mistakes and fixes (wrong, why, write instead)

| Wrong | Why | Write instead |
| --- | --- | --- |
| A clickable `div` instead of a button | No keyboard, no role | The native element [S1] |
| A role set without its keyboard | The role promises the behavior | The whole keyboard of the pattern [S1] |
| Menu roles for site navigation | Promises an application keyboard | A list of links, disclosure buttons [S3] |
| A switch or toggle label that changes with its state | The state is already announced | A fixed label [S1] |
| `aria-selected` and `aria-checked` together; `false` forgotten | Ambiguous state | One of them, `false` on the others [S1] |
| `aria-expanded` on a node without children | Wrong announcement | On parents only [S1] |
| A positive `tabindex` | Breaks the order | `0` or `-1` [S1] |
| `tabindex` on `<dialog>`; the `open` attribute instead of `showModal()` | No real modal | `showModal()` [S2] |
| `aria-modal` on a window that blocks nothing | Hides the rest from some users | Only if the rest is blocked [S1] |
| A tooltip with a link, `title`, `aria-haspopup` | Unreachable or badly announced | Text only, `aria-describedby` [S1] |
| A live region created with its content | Nothing is announced | The empty region first [S2] |
| `role="alert"` plus `aria-live` | Read twice | One or the other [S2] |
| An alert that takes the focus | Interrupts the task | Leave the focus [S1] |
| `meter` for a progress | Wrong role | `<progress>` [S2] |
| `aria-sort` on several columns | One sort only is expressed | One column [S1] |
| Focus lost on `body` after closing | The user is lost | Back to the trigger [S1] |
| A click on an option lost: the list closes first | The click takes the focus from the combobox | `preventDefault()` on `mousedown` of the list |
| `@HostBinding`, `@HostListener` | Old | `host` |
| Writing into an `input()` | Read only | `model()` |
| The same attribute bound in the template and in `host` | Result depends on order | One place |
| Importing Material, CDK or Angular Aria | Forbidden in this base | An own component |
| "Accessible" because axe passes | The tool sees only part | Keyboard trial and review [S4] |

## Sources

- [S1] W3C WAI, 2026, ARIA Authoring Practices Guide: "Read Me First", patterns and keyboard practice.
- [S2] MDN contributors, 2026, "<dialog>", "ARIA live regions", "<meter>", MDN Web Docs.
- [S3] A. Roselli, 2017, updated 2026-09-30, "Don't Use ARIA Menu Roles for Site Nav", adrianroselli.com.
- [S4] H. Suh et al., 2025, "Human or LLM? A Comparative Study on Accessible Code Generation Capability", arXiv:2503.15885 (preprint); T. Calò et al., 2026, "Measuring the Semantic Accessibility Gap in LLM-Generated Web UIs", CHI EA '26; Y. Ma et al., 2026, "Prompt and Circumstance: Evaluating Accessibility in LLM-Generated HTML Form Components", ASSETS '26.
