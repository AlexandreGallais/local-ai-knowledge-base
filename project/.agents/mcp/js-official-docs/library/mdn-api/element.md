---
title: "Element (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element

**`Element`** is the most general base class from which all element objects (i.e., objects that represent elements) in a `Document` inherit. It only has methods and properties common to all kinds of elements. More specific classes inherit from `Element`.

For example, the `HTMLElement` interface is the base interface for HTML elements. Similarly, the `SVGElement` interface is the basis for all SVG elements, and the `MathMLElement` interface is the base interface for MathML elements. Most functionality is specified further down the class hierarchy.

Languages outside the realm of the Web platform, like XUL through the `XULElement` interface, also implement `Element`.

## Instance properties

_`Element` inherits properties from its parent interface, `Node`, and by extension that interface's parent, `EventTarget`._

- `Element.activeViewTransition` (read-only) (experimental)
    Returns a `ViewTransition` instance representing the view transition currently active on an element.
- `Element.assignedSlot` (read-only)
    Returns a `HTMLSlotElement` representing the `<slot>` the node is inserted in.
- `Element.attributes` (read-only)
    Returns a `NamedNodeMap` object containing the assigned attributes of the corresponding HTML element.
- `Element.childElementCount` (read-only)
    Returns the number of child elements of this element.
- `Element.children` (read-only)
    Returns the child elements of this element.
- `Element.classList` (read-only)
    Returns a `DOMTokenList` containing the list of class attributes.
- `Element.className`
    A string representing the class of the element.
- `Element.clientHeight` (read-only)
    Returns a number representing the inner height of the element.
- `Element.clientLeft` (read-only)
    Returns a number representing the width of the left border of the element.
- `Element.clientTop` (read-only)
    Returns a number representing the width of the top border of the element.
- `Element.clientWidth` (read-only)
    Returns a number representing the inner width of the element.
- `Element.currentCSSZoom` (read-only)
    A number indicating the effective zoom size of the element, or 1.0 if the element is not rendered.
- `Element.customElementRegistry` (read-only)
    The `CustomElementRegistry` object associated with this element, or `null` if one has not been set.
- `Element.elementTiming` (experimental)
    A string reflecting the `elementtiming` attribute which marks an element for observation in the `PerformanceElementTiming` API.
- `Element.firstElementChild` (read-only)
    Returns the first child element of this element.
- `Element.id`
    A string representing the id of the element.
- `Element.innerHTML`
    A string representing the markup of the element's content.
- `Element.lastElementChild` (read-only)
    Returns the last child element of this element.
- `Element.localName` (read-only)
    A string representing the local part of the qualified name of the element.
- `Element.namespaceURI` (read-only)
    The namespace URI of the element, or `null` if it is no namespace.
- `Element.nextElementSibling` (read-only)
    An `Element`, the element immediately following the given one in the tree, or `null` if there's no sibling node.
- `Element.outerHTML`
    A string representing the markup of the element including its content. When used as a setter, replaces the element with nodes parsed from the given string.
- `Element.part` (read-only)
    Represents the part identifier(s) of the element (i.e., set using the `part` attribute), returned as a `DOMTokenList`.
- `Element.prefix` (read-only)
    A string representing the namespace prefix of the element, or `null` if no prefix is specified.
- `Element.previousElementSibling` (read-only)
    An `Element`, the element immediately preceding the given one in the tree, or `null` if there is no sibling element.
- `Element.scrollHeight` (read-only)
    Returns a number representing the scroll view height of an element.
- `Element.scrollLeft`
    A number representing the left scroll offset of the element.
- `Element.scrollLeftMax` (non-standard) (read-only)
    Returns a number representing the maximum left scroll offset possible for the element.
- `Element.scrollTop`
    A number representing number of pixels the top of the element is scrolled vertically.
- `Element.scrollTopMax` (non-standard) (read-only)
    Returns a number representing the maximum top scroll offset possible for the element.
- `Element.scrollWidth` (read-only)
    Returns a number representing the scroll view width of the element.
- `Element.shadowRoot` (read-only)
    Returns the open shadow root that is hosted by the element, or null if no open shadow root is present.
- `Element.slot`
    Returns the name of the shadow DOM slot the element is inserted in.
- `Element.tagName` (read-only)
    Returns a string with the name of the tag for the given element.

### Instance properties included from ARIA

_The `Element` interface also includes the following properties._

- `Element.ariaAtomic`
    A string reflecting the `aria-atomic` attribute, which indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the `aria-relevant` attribute.
- `Element.ariaAutoComplete`
    A string reflecting the `aria-autocomplete` attribute, which indicates whether inputting text could trigger display of one or more predictions of the user's intended value for a combobox, searchbox, or textbox and specifies how predictions would be presented if they were made.
- `Element.ariaBrailleLabel`
    A string reflecting the `aria-braillelabel` attribute, which defines the braille label of the element.
- `Element.ariaBrailleRoleDescription`
    A string reflecting the `aria-brailleroledescription` attribute, which defines the ARIA braille role description of the element.
- `Element.ariaBusy`
    A string reflecting the `aria-busy` attribute, which indicates whether an element is being modified, as assistive technologies may want to wait until the modifications are complete before exposing them to the user.
- `Element.ariaChecked`
    A string reflecting the `aria-checked` attribute, which indicates the current "checked" state of checkboxes, radio buttons, and other widgets that have a checked state.
- `Element.ariaColCount`
    A string reflecting the `aria-colcount` attribute, which defines the number of columns in a table, grid, or treegrid.
- `Element.ariaColIndex`
    A string reflecting the `aria-colindex` attribute, which defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
- `Element.ariaColIndexText`
    A string reflecting the `aria-colindextext` attribute, which defines a human-readable text alternative of aria-colindex.
- `Element.ariaColSpan`
    A string reflecting the `aria-colspan` attribute, which defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
- `Element.ariaCurrent`
    A string reflecting the `aria-current` attribute, which indicates the element that represents the current item within a container or set of related elements.
- `Element.ariaDescription`
    A string reflecting the `aria-description` attribute, which defines a string value that describes or annotates the current element.
- `Element.ariaDisabled`
    A string reflecting the `aria-disabled` attribute, which indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
- `Element.ariaExpanded`
    A string reflecting the `aria-expanded` attribute, which indicates whether a grouping element owned or controlled by this element is expanded or collapsed.
- `Element.ariaHasPopup`
    A string reflecting the `aria-haspopup` attribute, which indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.
- `Element.ariaHidden`
    A string reflecting the `aria-hidden` attribute, which indicates whether the element is exposed to an accessibility API.
- `Element.ariaInvalid`
    A string reflecting the `aria-invalid` attribute, which indicates the entered value does not conform to the format expected by the application.
- `Element.ariaKeyShortcuts`
    A string reflecting the `aria-keyshortcuts` attribute, which indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.
- `Element.ariaLabel`
    A string reflecting the `aria-label` attribute, which defines a string value that labels the current element.
- `Element.ariaLevel`
    A string reflecting the `aria-level` attribute, which defines the hierarchical level of an element within a structure.
- `Element.ariaLive`
    A string reflecting the `aria-live` attribute, which indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.
- `Element.ariaModal`
    A string reflecting the `aria-modal` attribute, which indicates whether an element is modal when displayed.
- `Element.ariaMultiLine`
    A string reflecting the `aria-multiline` attribute, which indicates whether a text box accepts multiple lines of input or only a single line.
- `Element.ariaMultiSelectable`
    A string reflecting the `aria-multiselectable` attribute, which indicates that the user may select more than one item from the current selectable descendants.
- `Element.ariaOrientation`
    A string reflecting the `aria-orientation` attribute, which indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.
- `Element.ariaPlaceholder`
    A string reflecting the `aria-placeholder` attribute, which defines a short hint intended to aid the user with data entry when the control has no value.
- `Element.ariaPosInSet`
    A string reflecting the `aria-posinset` attribute, which defines an element's number or position in the current set of listitems or treeitems.
- `Element.ariaPressed`
    A string reflecting the `aria-pressed` attribute, which indicates the current "pressed" state of toggle buttons.
- `Element.ariaReadOnly`
    A string reflecting the `aria-readonly` attribute, which indicates that the element is not editable, but is otherwise operable.
- `Element.ariaRelevant` (non-standard)
    A string reflecting the `aria-relevant` attribute, which indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. This is used to describe what changes in an `aria-live` region are relevant and should be announced.
- `Element.ariaRequired`
    A string reflecting the `aria-required` attribute, which indicates that user input is required on the element before a form may be submitted.
- `Element.ariaRoleDescription`
    A string reflecting the `aria-roledescription` attribute, which defines a human-readable, author-localized description for the role of an element.
- `Element.ariaRowCount`
    A string reflecting the `aria-rowcount` attribute, which defines the total number of rows in a table, grid, or treegrid.
- `Element.ariaRowIndex`
    A string reflecting the `aria-rowindex` attribute, which defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
- `Element.ariaRowIndexText`
    A string reflecting the `aria-rowindextext` attribute, which defines a human-readable text alternative of aria-rowindex.
- `Element.ariaRowSpan`
    A string reflecting the `aria-rowspan` attribute, which defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
- `Element.ariaSelected`
    A string reflecting the `aria-selected` attribute, which indicates the current "selected" state of elements that have a selected state.
- `Element.ariaSetSize`
    A string reflecting the `aria-setsize` attribute, which defines the number of items in the current set of listitems or treeitems.
- `Element.ariaSort`
    A string reflecting the `aria-sort` attribute, which indicates if items in a table or grid are sorted in ascending or descending order.
- `Element.ariaValueMax`
    A string reflecting the `aria-valueMax` attribute, which defines the maximum allowed value for a range widget.
- `Element.ariaValueMin`
    A string reflecting the `aria-valueMin` attribute, which defines the minimum allowed value for a range widget.
- `Element.ariaValueNow`
    A string reflecting the `aria-valueNow` attribute, which defines the current value for a range widget.
- `Element.ariaValueText`
    A string reflecting the `aria-valuetext` attribute, which defines the human-readable text alternative of `aria-valuenow` for a range widget.
- `Element.role`
    A string reflecting the explicitly set `role` attribute, which provides the semantic role of the element.

#### Instance properties reflected from ARIA element references

The properties reflect the elements specified by `id` reference in the corresponding attributes, but with some caveats. See Reflected element references in the _Reflected attributes_ guide for more information.

- `Element.ariaActiveDescendantElement`
    An element that represents the current active element when focus is on a `composite` widget, `combobox`, `textbox`, `group`, or `application`.
    Reflects the `aria-activedescendant` attribute.
- `Element.ariaControlsElements`
    An array of elements whose contents or presence are controlled by the element it is applied to.
    Reflects the `aria-controls` attribute.
- `Element.ariaDescribedByElements`
    An array of elements that contain the accessible description for the element it is applied to.
    Reflects the `aria-describedby` attribute.
- `Element.ariaDetailsElements`
    An array of elements that provide accessible details for the element it is applied to.
    Reflects the `aria-details` attribute.
- `Element.ariaErrorMessageElements`
    An array of elements that provide an error message for the element it is applied to.
    Reflects the `aria-errormessage` attribute.
- `Element.ariaFlowToElements`
    An array of elements that identify the next element (or elements) in an alternate reading order of content, overriding the general default reading order at the user's discretion.
    Reflects the `aria-flowto` attribute.
- `Element.ariaLabelledByElements`
    An array of elements that provide the accessible name for the element it is applied to.
    Reflects the `aria-labelledby` attribute.
- `Element.ariaOwnsElements`
    An array of elements owned by the element this is applied to.
    This is used to define a visual, functional, or contextual relationship between a parent and its child elements when the DOM hierarchy cannot be used to represent the relationship.
    Reflects the `aria-owns` attribute.
