---
title: "ARIA: aria-autocomplete attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-autocomplete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-autocomplete attribute

The `aria-autocomplete` attribute indicates whether inputting text could trigger display of one or more predictions of the user's intended value for a `combobox`, `searchbox`, or `textbox` and specifies how predictions will be presented if they are made.

## Description

Autocompletion is user interface feature wherein inline suggestions are made as a user types in an input. Suggested text for completing the value of the field dynamically appears in the field after the input cursor, and the suggested value becomes the value if the user performs an action, such as tabbing, that causes focus to leave the field.

The `aria-autocomplete` property describes the type of autocompletion interaction model a textbox, searchbox, or combobox will use when dynamically helping users complete text input. It distinguishes between two models: the **inline** model (`aria-autocomplete="inline"`), which presents a single predicted value and the **list** model (`aria-autocomplete="list"`), which presents a collection of possible values in a separate element that pops up next to or below the text input, similar to a `<datalist>`. A third value, `aria-autocomplete="both"` is for when the interface will present a list while also including a predicted value. The default is `none`, meaning the textbox, searchbox, or combobox will not provide an auto complete value.

The `aria-autocomplete` property only describes the type of predictive behavior for an input element for assistive technologies; it doesn't provide the functionality. The actual autocompletion should be provided using HTML attributes or JavaScript.

If the suggested autocomplete value provides suggested values that aren't dependent on the input provided by the user, consider omitting autocomplete for everyone. For example, a searchbox input displaying unfiltered recent search terms may be helpful to a marketing team on an e-commerce site, but likely isn't helpful for the screen reader user. When it is best to not specify a value for `aria-autocomplete` or to set the value to the `none` default, likely your non-assistive technology users also don't need the experience.

When implementing autocomplete functionality, ensure the suggested portion of the value is presented as selected text to enable distinguishing between a user's input and the suggestion. Make sure that when the suggested value is not the desired value, users can easily delete the suggestion or replace it by continuing to type.

When implementing a list of values, DOM focus should remain on the text input while the suggestion list is displayed.

- include `aria-controls` with the value of the id of the suggested list of values.
- include `aria-haspopup` matching the role of the element that contains the collection of suggested values.
- manage focus, if required, including using `aria-activedescendant` if the collection container supports.
- use the `aria-expanded` state on the element with role `combobox` to communicate that the list is displayed.

If an autocomplete list value is automatically accepted when the field loses focus, the list must be contained in a role that supports `aria-activedescendant`, with the value of `aria-activedescendant` on the input field dynamically adjusted to refer to the element containing the selected suggestion.

## Values

- `none` (default)
    When a user is providing input, no automatic suggestion is displayed.
- `inline`
    `aria-autocomplete="inline"` text suggesting one way to complete the provided input may be dynamically inserted after the caret.
- `list`
    `aria-autocomplete="list"` When a user is providing input, an element containing a collection of values that could complete the provided input may be displayed.
- `both`
    `aria-autocomplete="both"` an input to offer both models at the same time. When a user is providing input, an element containing a collection of values that could complete the provided input may be displayed. If displayed, one value in the collection is automatically selected, and the text needed to complete the automatically selected value appears after the caret in the input.

## Associated roles

Used in roles:

- `combobox` role
- `textbox` role
- inherits from `searchbox` role

## See also

- `combobox` role
- `textbox` role
- `searchbox` role
- `<datalist>` element and the ` list` attribute
- `aria-controls` attribute
- `aria-haspopup` attribute
- `aria-activedescendant` attribute
- `aria-expanded` attribute
- Editable Combobox With Both List and Inline Autocomplete Example
- Event.ariaAutoComplete
