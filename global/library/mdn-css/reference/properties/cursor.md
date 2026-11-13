---
title: "`cursor` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/cursor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `cursor` CSS property

The **`cursor`** CSS property sets the mouse cursor, if any, to show when the mouse pointer is over an element.

The cursor setting should inform users of the mouse operations that can be performed at the current location, including: text selection, activating help or context menus, copying content, resizing tables, and so on.
You can specify either the _type_ of cursor using a keyword, or load a specific icon to use (with optional fallback images and mandatory keyword as a final fallback).

```css
cursor: pointer;
```

```css
cursor: help;
```

```css
cursor: wait;
```

```css
cursor: crosshair;
```

```css
cursor: not-allowed;
```

```css
cursor: zoom-in;
```

```html
<section class="default-example container" id="default-example">
  <div id="example-element">
    Move over this element to see the cursor style.
  </div>
</section>
```

```css
#example-element {
  display: flex;
  background-color: #1766aa;
  color: white;
  height: 180px;
  width: 360px;
  justify-content: center;
  align-items: center;
  font-size: 14pt;
  padding: 5px;
}
```

## Syntax

```css
/* Keyword values */
cursor: auto;
cursor: pointer;
/* … */
cursor: zoom-out;

/* URL with mandatory keyword fallback */
cursor: url("hand.cur"), pointer;

/* URL and coordinates, with mandatory keyword fallback */
cursor:
  url("cursor_1.png") 4 12,
  auto;
cursor:
  url("cursor_2.png") 2 2,
  pointer;

/* URLs and fallback URLs (some with coordinates), with mandatory keyword fallback */
cursor:
  url("cursor_1.svg") 4 5,
  url("cursor_2.svg"),
  /* …, */ url("cursor_n.cur") 5 5,
  progress;

/* Global values */
cursor: inherit;
cursor: initial;
cursor: revert;
cursor: revert-layer;
cursor: unset;
```

The `cursor` property is specified as zero or more `<url>` values, separated by commas, followed by a single mandatory keyword value.
Each `<url>` should point to an image file.
The browser will try to load the first image specified, falling back to the next if it can't, and falling back to the keyword value if no images could be loaded (or if none were specified).

Each `<url>` may be optionally followed by a pair of space-separated numbers, which set the `<x>` and `<y>` coordinates of the cursor's hotspot relative to the top-left corner of the image.

### Values

- `<url>` (optional)
    A `url()` or a comma separated list `url(), url(), …`, pointing to an image file.
    More than one `<url>` may be provided as fallbacks, in case some cursor image types are not supported.
    A non-URL fallback (one or more of the keyword values) _must_ be at the end of the fallback list.
- `<x>`, `<y>` (optional)
    Optional x- and y-coordinates indicating the cursor hotspot; the precise position within the cursor that is being pointed to.

    The numbers are in units of image pixels.
    They are relative to the top left corner of the image, which corresponds to `0 0`, and are clamped within the boundaries of the cursor image.
    If these values are not specified, they may be read from the file itself, and will otherwise default to the top-left corner of the image.

- `keyword`
    A keyword value _must_ be specified, indicating either the type of cursor to use, or the fallback cursor to use if all specified icons fail to load.

    The available keywords are listed in the table below. Other than `none`, which means no cursor, there is an image showing how the cursors used to be rendered. You can hover your mouse over the table rows to see the effect of the different cursor keyword values on your browser today.

           | Category
           | Keyword
           | Example
           | Description

           | General
           | `auto`
           |
           |
            The UA will determine the cursor to display based on the current context. E.g., equivalent to `text` when hovering text.

           | `default`
           |
           | The platform-dependent default cursor. Typically an arrow.

           | `none`
           |
           | No cursor is rendered.

           | Links &#x26; status
           | `context-menu`
           |
           | A context menu is available.

           | `help`
           |
           | Help information is available.

           | `pointer`
           |
           |
            The cursor is a pointer that indicates a link. Typically an image of a pointing hand.

           | `progress`
           |
           |
            The program is busy in the background, but the user can still interact
            with the interface (in contrast to `wait`).

           | `wait`
           |
           |
            The program is busy, and the user can't interact with the interface (in contrast to `progress`).
            Sometimes an image of an hourglass or a watch.

           | Selection
           | `cell`
           |
           | The table cell or set of cells can be selected.

           | `crosshair`
           |
           | Cross cursor, often used to indicate selection in a bitmap.

           | `text`
           |
           | The text can be selected. Typically the shape of an I-beam.

           | `vertical-text`
           |
           |
            The vertical text can be selected. Typically the shape of a sideways I-beam.

           | Drag &#x26; drop
           | `alias`
           |
           | An alias or shortcut is to be created.

           | `copy`
           |
           | Something is to be copied.

           | `move`
           |
           | Something is to be moved.

           | `no-drop`
           |

           |
            An item may not be dropped at the current location.Firefox bug 275173:
            On Windows and macOS, `no-drop` is the same as `not-allowed`.

           | `not-allowed`
           |
           | The requested action will not be carried out.

           | `grab`
           |
           | Something can be grabbed (dragged to be moved).

           | `grabbing`
           |
           | Something is being grabbed (dragged to be moved).

           |
            Resizing &#x26; scrolling

           | `all-scroll`
           |
           |
            Something can be scrolled in any direction (panned).Firefox bug 275174:
            On Windows, `all-scroll` is the same as `move`.

           | `col-resize`
           |
           |
            The item/column can be resized horizontally.
            Often rendered as arrows pointing left and right with a vertical bar separating them.

           | `row-resize`
           |
           |
            The item/row can be resized vertically.
            Often rendered as arrows pointing up and down with a horizontal bar separating them.

           | `n-resize`
           |

           |
            Some edge is to be moved. For example, the `se-resize` cursor is used when the movement starts from the south-east corner of the box.
            In some environments, an equivalent bidirectional resize cursor is shown.
            For example, `n-resize` and `s-resize` are the same as `ns-resize`.

           | `e-resize`
           |

           | `s-resize`
           |

           | `w-resize`
           |

           | `ne-resize`
           |

           | `nw-resize`
           |

           | `se-resize`
           |

           | `sw-resize`
           |

           | `ew-resize`
           |
           | Bidirectional resize cursor.

           | `ns-resize`
           |

           | `nesw-resize`
           |

           | `nwse-resize`
           |

           | Zooming
           | `zoom-in`
           |
           |
            Something can be zoomed (magnified) in or out.

           | `zoom-out`
           |

## Usage notes

### Icon size limits

While the specification does not limit the `cursor` image size, user agents commonly restrict them to avoid potential misuse.
For example, on Firefox and Chromium cursor images are restricted to 128x128 pixels by default, but it is recommended to limit the cursor image size to 32x32 pixels. Cursor changes using images that are larger than the user-agent maximum supported size will generally just be ignored.

### Supported image file formats

User agents are required by the specification to support PNG files, SVG v1.1 files in secure static mode that contain a natural size, and any other non-animated image file formats that they support for images in other properties.
Desktop browsers also broadly support the `.cur` file format.

The specification further indicates that user agents _should_ also support SVG v1.1 files in secure animated mode that contain a natural size, along with any other animated images file formats they support for images in other properties.
User agents _may_ support both static and animated SVG images that do not contain a natural size.

### iPadOS

iPadOS supports pointer devices like trackpads and mouses. By default, the iPad cursor is displayed as a circle, and the only supported value that will change an appearance of the pointer is `text`.

### Other notes

Cursor changes that intersect toolbar areas are commonly blocked to avoid spoofing.

## Examples

### Setting cursor types

```css
.foo {
  cursor: crosshair;
}

.bar {
  cursor: zoom-in;
}

/* A fallback keyword value is required when using a URL */
.baz {
  cursor: url("hyper.cur"), auto;
}
```

## See also

- `pointer-events`
- `<url>` type
- SVG `cursor` attribute
