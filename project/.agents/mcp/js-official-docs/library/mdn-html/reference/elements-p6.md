---
title: "HTML elements reference (part 6 of 7)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTML elements reference (part 6 of 7)

## Table content

The elements here are used to create and handle tabular data.

| Element                     | Description                                                                                                                                                                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ``  | Specifies the caption (or title) of a table.                                                                                                                                                                                                                                                                           |
| ``      | Defines one or more columns in a column group represented by its implicit or explicit parent `` element. The `` element is only valid as a child of a `` element that has no `span` attribute defined. |
| `` | Defines a group of columns within a table.                                                                                                                                                                                                                                                                             |
| ``    | Represents tabular data—that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.                                                                                                                                                                              |
| ``    | Encapsulates a set of table rows (`` elements), indicating that they comprise the body of a table's (main) data.                                                                                                                                                                                    |
| ` | `       | A child of the `` element, it defines a cell of a table that contains data.                                                                                                                                                                                                                         |
| ``    | Encapsulates a set of table rows (`` elements), indicating that they comprise the foot of a table with information about the table's columns. This is usually a summary of the columns, e.g., a sum of the given numbers in a column.                                                               |
| ` | `       | A child of the `` element, it defines a cell as the header of a group of table cells. The nature of this group can be explicitly defined by the `scope` and `headers` attributes.         |
| ``    | Encapsulates a set of table rows (`` elements), indicating that they comprise the head of a table with information about the table's columns. This is usually in the form of column headers (` | ` elements).                                                                       |
| ``       | Defines a row of cells in a table. The row's cells can then be established using a mix of ` | ` (data cell) and ` | ` (header cell) elements.                                                                                                                                          |

## Forms

HTML provides several elements that can be used together to create forms that the user can fill out and submit to the website or application. Further information about this available in the HTML forms guide.

| Element                            | Description                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ``          | An interactive element activated by a user with a mouse, keyboard, finger, voice command, or other assistive technology. Once activated, it performs an action, such as submitting a form or opening a dialog.                                                                                       |
| `<datalist>`        | Contains a set of `<option>` elements that represent the permissible or recommended options available to choose from within other controls.                                                                                                                                                                                                 |
| `<fieldset>`        | Used to group several controls as well as labels (``) within a web form.                                                                                                                                                                                                                                                             |
| `<form>`            | Represents a document section containing interactive controls for submitting information.                                                                                                                                                                                                                                                                  |
| ``           | Used to create interactive controls for web-based forms to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent. The `` element is one of the most powerful and complex in all of HTML due to the sheer number of combinations of input types and attributes. |
| ``           | Represents a caption for an item in a user interface.                                                                                                                                                                                                                                                                                                      |
| `<legend>`          | Represents a caption for the content of its parent `<fieldset>`.                                                                                                                                                                                                                                                                            |
| `<meter>`           | Represents either a scalar value within a known range or a fractional value.                                                                                                                                                                                                                                                                               |
| `<optgroup>`        | Creates a grouping of options within a `<select>` element.                                                                                                                                                                                                                                                                                  |
| `<option>`          | Used to define an item contained in a `<select>`, an `<optgroup>`, or a `<datalist>` element. As such, `<option>` can represent menu items in popups and other lists of items in an HTML document.                                                                                                            |
| `<output>`          | Container element into which a site or app can inject the results of a calculation or the outcome of a user action.                                                                                                                                                                                                                                        |
| `<progress>`        | Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.                                                                                                                                                                                                                                                    |
| `<select>`          | Represents a control that provides a menu of options.                                                                                                                                                                                                                                                                                                      |
| `<selectedcontent>` | Displays the content of the currently selected `<option>` inside a closed `<select>` element.                                                                                                                                                                                                                                                              |
| `<textarea>`        | Represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example, a comment on a review or feedback form.                                                                                                                                                                 |

## Interactive elements

HTML offers a selection of elements that help to create interactive user interface objects.

| Element                                                | Description                                                                                                                                                                                          |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ``                             | Creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label must be provided using the `<summary>` element.  |
| `<dialog>`                              | Represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.                                                                                        |
| `<geolocation>` (experimental) | Creates an interactive control for the user to share their geolocation data with the page.                                                                                                           |
| `<summary>`                             | Specifies a summary, caption, or legend for a details element's disclosure box. Clicking the `<summary>` element toggles the state of the parent `` element open and closed. |

## Web Components

Web Components is an HTML-related technology that makes it possible to, essentially, create and use custom elements as if it were regular HTML. In addition, you can create custom versions of standard HTML elements.

| Element                     | Description                                                                                                                                                                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<slot>`     | Part of the Web Components technology suite, this element is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together. |
| `<template>` | A mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.                                                                                     |
