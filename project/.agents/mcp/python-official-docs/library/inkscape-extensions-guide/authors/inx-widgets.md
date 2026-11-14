---
title: "INX widgets and parameters (part 1 of 2)"
tool: "inkscape-extensions-guide"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/docs/authors/inx-widgets.rst"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# INX widgets and parameters

This page contains the reference documentation for INX widgets and
parameters. Their primary goal is to make it easy to design GUIs for
Inkscape Extensions using the built-in `INX
extension descriptor format <INX_extension_descriptor_format>`__,
although (invisible) parameters can also be used for extensions that
don't need to show a user interface.

## Introduction

Extension GUIs consists of an arbitrary number of GUI elements,
so-called Widgets. These can be simple text labels, boxes
and spacers to control layout or more complex UI elements like images.

A special class of Widgets are Parameters. They differ
from other Widgets in that they have a user-settable value, for example
a boolean (implemented as checkbox) or integer (implemented as number
entry). The value of each Parameter is passed to the extension on
execution and can be used to control its behavior.

All Widgets are described using an easy-to-learn XML schema with
predefined tags and attributes which are described in detail below.

### Available Widgets

A general Widget takes the form

```
<widget_name attribute1="value1" attribute2="value2" ...>value</widget_name>
```

where `widget_name` specifies the name of the widget and is one of the
following:

- `label`since 1.0
- `hbox`since 1.0/`vbox`since 1.0
- `separator`since 1.0/`spacer`since 1.0
- `image`since 1.0
- `param` (for all Parameter types)

### Available Parameter types

A general Parameter takes the form

```
<param type="parameter_type" attribute1="value1" atribute2="value2" ...>value</param >
```

where `parameter_type` specifies the type of the parameter and is one
of the following:

- `bool`since 1.0
- `int`
- `float`
- `string`
- `path`since 1.0
- `optiongroup`
- `notebook`
- `color`

If a parameter is made invisible (see `gui-hidden` attribute in the
next section) it will not be shown in the GUI
but it's value is still passed to an extension. This is useful if you
want to hardcode parameter value the user should not be able to change.
If all parameters (and potential widgets) are invisible, Inkscape will
not show a GUI and execute the extension immediately instead, but will
still pass the values of the invisible parameters.

## Common attributes

### For all widgets

```text
+------------------+------------------+------------------+------------------+
| Attribute        | Allowed          | Default          | Required?        |
| name             | value(s)         | value            |                  |
+==================+==================+==================+==================+
| ``gui-hidden``   | ``true``,        |                  |                  |
|                  | ``false``        | ``false``        | optional         |
+------------------+------------------+------------------+------------------+
| If set to ``true`` the Widget is hidden from the GUI (primarily used to   |
| add hidden parameters that are passed to the extension but are not        |
| supposed to be editable by the user.)                                     |
|                                                                           |
| *Note: If there are* **no** *visible parameters defined in a GUI, the     |
| extension is executed immediately without showing a dialog.*              |
+------------------+------------------+------------------+------------------+
| ``indent``       | ``0,1,2,…``      | ``0``            | optional         |
+------------------+------------------+------------------+------------------+
| Sets indentation level of the parameter. Increasing indentation adds      |
| padding to the start of the line.                                         |
+------------------+------------------+------------------+------------------+
```

### Only for Parameters

```text
+------------------------+------------------------+------------------------+------------------------+
| Attribute name         | Allowed value(s)       | Default value          | Required?              |
+========================+========================+========================+========================+
| ``name``               | *(text)*               | --                     | required               |
+------------------------+------------------------+------------------------+------------------------+
| Used as an identifier of the parameter. It has to be unique since the value of this attribute is  |
| used to save and transmit parameter values internally!                                            |
+------------------------+------------------------+------------------------+------------------------+
| ``type``               | see `above <#apt>`__   | --                     | required               |
+------------------------+------------------------+------------------------+------------------------+
| Determines the type of the parameter, see the extensive description of                            |
| `Parameters <#parameters>`__ below.                                                               |
+------------------------+------------------------+------------------------+------------------------+
| ``gui-text``           | *(text)*               | --                     | required *(visible     | 
|                        |                        |                        | parameters)*, optional |
|                        |                        |                        | *(hidden parameters* + |
|                        |                        |                        | ``notebooks`` *)*      |
+------------------------+------------------------+------------------------+------------------------+
| Label shown for the parameter in the GUI.                                                         |
+------------------------+------------------------+------------------------+------------------------+
| ``gui-description``    | *(text)*               | --                     | optional               |
+------------------------+------------------------+------------------------+------------------------+
| Tooltip shown for the parameter when the user hovers the mouse cursor over the active area of the |
| parameter in question.                                                                            |
+------------------------+------------------------+------------------------+------------------------+
```

## Widgets

### `hbox` / `vbox`

Creates a container for other widgets. No visual rendering but provides a possibility to align and
layout other widgets. Child widgets are either added in horizontal (`hbox`) or vertical
(`vbox`) direction.

```xml
<hbox>…</hbox>
<vbox>…</vbox>
```

A box can contain an arbitrary number of other widgets and parameters (including other boxes) to
fine-tune the layout of the GUI.

*Note*: When you start with an empty extension GUI, you're basically starting with a `vbox`.
Also `notebook` pages behave like vertically oriented boxes.

### `image`

Creates a widget displaying an image. The content of the node specifies
the path of the image file (ideally specify a path relative to the .inx
file itself).

```xml
<image>path/to/image.svg</image>
```

By default the image will be rendered at it's actual size. Use
attributes `width/heigth` to override the default size (in this case
*both* attributes need to be supplied; units are pixels).

Images are aligned in the horizontal center of the current box; different alignment
can be realized by wrapping the image in a hbox and adding a
spacer with `size="expand"`
before (for right alignment) or after (for left alignment) of the image.

*Implementation note: Loadable image formats are determined by GdkPixbuf
and therefore system-specific. PNG should always work and is the safe
choice. SVG should mostly work and is the preferred choice for obvious
reasons.*

### `label`

Creates a widget showing text. The content of the node corresponds to
the text content that will be rendered.

```xml
<label>Some text here.</label>
```

*Note: Labels are intended to provide additional information / help. For
labeling parameters use the* `gui-text` *attribute; for short help texts
that are specific to a single parameter prefer* `gui-description` *which
will render as a tooltip.*

- When setting the attribute `appearance="header"` the text is styled
as a heading and can be used as another possibility to group
parameters.
- | When setting the attribute `appearance="url"` the text is rendered
as a clickable link.
| *Note: The text is escaped and used as the link target as-is.
Creating a link text that differs from the URL is prevented for
security reasons.*
- When setting the attribute `xml:space="preserve"` any white-space
(spaces, tabs, line-breaks, etc.) in the label will be preserved,
allowing to format the label accordingly. By default all
leading/tailing and intermediary whitespace is collapsed into a
single space character.

### `separator`

Creates a separator for visual separation of other widgets. Renders as a
horizontal/vertical line.

```xml
<separator />
```

The direction of the separator will automatically adjust depending on
direction of the current container (vertical for "empty" extension GUIs
and `notebook` pages; vertical/horizontal for `vbox` and `hbox`
respectively).

### `spacer`

Creates a spacer for visual separation of other widgets. No visual
rendering but provides variable spacing.

```xml
<spacer />
```

The direction of the spacer will automatically adjust depending on
direction of the current container (vertical for "empty" extension GUIs
and `notebook` pages; vertical/horizontal for `vbox` and `hbox`
respectively).

Use the `size` attribute to set the spacing in pixels (default:
`size="10"`). The special value `expand` results in a spacer that
grows dynamically and always uses up as much space as possible (useful
for aligning content).
