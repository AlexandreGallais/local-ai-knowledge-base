---
title: "INX widgets and parameters (part 2 of 2)"
tool: "inkscape-extensions-guide"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/docs/authors/inx-widgets.rst"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# INX widgets and parameters (part 2 of 2)

## Parameters

### `bool`

> *Added in version 1.0.*

Creates a checkbox to set a **boolean value**. Allowed values are
`true` or `false` (default value: `true`).

```xml
<param name="name" type="bool" gui-text="Some label text">false</param>
```

### `color`

Creates a control to select an **RGBA color value**. Values should be
given in hexadecimal notation, e.g. `0xff0000ff` for red with full
opacity (default value: `0x000000ff`)

```xml
<param name="name" type="color" gui-text="Some label text">0x000000ff</param>
```

Use `appearance="colorbutton"` for a simple button that opens a
simplified color picker. Otherwise a full ColorNotebook will be
rendered.

> *Changed in version 1.0.*
> *Implementation note:* colors values are internally treated as 32-bit
> unsigned integers (unsigned long). Acceptable default values include
> everything the standard library function `strtoul` understands (since Inkscape 1.0).
> Earlier Inkscape version only handled decimal numbers. The value passed
> to the extension script will also be a decimal number.

### `float`

Creates a input to enter a **floating point number**. Limit the input
range with the `min` and `max` attributes; set the number of decimal
places with the `precision` attribute. (defaults: `min="0"`,
`max="10"` and `precision="1"`; default value: 0)

```xml
<param name="name" type="float" precision="1" min="0" max="100" 
gui-text="Float Parameter">1.234</param>
```

Use the attribute `appearance="full"` to create a slider with which
the value can be adjusted dynamically over the full range.

### `int`

Creates a textbox input to enter an **integer number**. Limit the input
range with the `min` and `max` attributes. (defaults: `min="0"`
and `max="10"`; default value: 0)

```xml
<param name="name" type="int" min="1" max="100" gui-text="Integer Parameter">1</param>
```

Use the attribute `appearance="full"` to create a slider with which
the value can be adjusted dynamically over the full range.

### `notebook`

Creates a set of pages (aka tab control). The user can switch between
individual pages. Each page can contain an arbitrary set of other
Widgets and Parameters. Individual pages are created with the element.

The **returned value** for `notebook` parameters is the value of the
`name` attribute of the selected . By default the first page is
selected.

Notebooks can be used to show widgets based on an option; that option
would be implemented as notebook.

```xml
<param name="name" type="notebook">
    <page name="page_1" gui-text="First page">
        …
    </page>
    <page name="page_2" gui-text="Second page">
        …
    </page>
</param>
```

### `optiongroup`

Creates a control that allows to select one option **one option** from a
set of multiple choices. The different choices are created with
elements.

The **returned value** for `optiongroup` type parameters is the value
of the `value` attribute of the selected . By default the first is
selected.

```xml
<param name="name" type="optiongroup" appearance="radio/combo"
gui-text="Some label text">
   <option value="1">First option</option>
   <option value="2">Second option</option>
</param>
```

> *Added in version 1.0.*
> Set the attribute `appearance="radio"` to render radio buttons
> (default). Set the attribute `appearance="combo"` to display a
> drop-down list instead.

### `path`

> *Added in version 1.0.*

Creates a control to choose a **path**. Paths can either be entered
manually or by using the file chooser that can be opened using the
ellipsis button.

The `mode` attribute allows to set behavior of the file chooser (i.e.
if files or folders can be selected, if they need to exist previously
and if multiple selections are possible). The `filetypes` attribute
holds a comma-separated list of file extensions and restricts the
selectable file types in file picker mode.

```
<param type="path" name="varname" gui-text="label" mode="$mode" [filetypes="$filetypes"]/>
```

Possible values for the `mode` attribute:

- `file` - select a single existing file
- `files` - select multiple existing files
- `folder` - select a single existing folder
- `folders` - select multiple existing folders
- `file_new` - select a single new file name
- `file_new` - select a single new folder name

Examples

- Files:

- Choose a file, with file type restriction (optional):

```xml
<param name="my_file" type="path" mode="file" filetypes="png,jpg" gui-text="A file:">my/path/to/file.png</param>
```

- Choose multiple files (file type restriction possible, too):

```xml
<param name="my_files" type="path" mode="files" gui-text="Multiple files:">my/path/to/file.png</param>
```

- Create a new file:

```xml
<param name="my_new_file" type="path" mode="file_new" filetypes="png" gui-text="A new file:">my/path/to/file.png</param>
```

- Folders:

- Choose a folder:

```xml
<param name="my_folder" type="path" mode="folder" gui-text="A folder:">my/path/</param> 
```

- Choose multiple folders:

```xml
<param name="my_folders" type="path" mode="folders" gui-text="Folders:">my/path/</param>
```

- Create a new folder:

```xml
<param name="my_new_folder" type="path" mode="folder_new" filetypes="png" gui-text="A new folder:">my/path/</param>
```

*Implementation note:* Existence of paths are not checked before passing
them to the extension, so extension authors need to implement suitable
error handling, especially in case of manual path entry. For multiple
selections the individual paths are joined using the pipe character
("|") and passed to the extension as a single string.

### `string`

Creates a input to enter a **string**. Limit the number of characters
the user is allowed to enter with the `max-length` attribute.
(defaults: no character limit; default value: empty string)

```xml
<param name="name" type="string" gui-text="Some text label">Some default text</param>
```

> *Added in version 1.0.*
> Set the attribute `appearance="multiline"` to render a multi-line
> input. Line-breaks will be encoded as literal `\n` in the value passed
> to the extension.
