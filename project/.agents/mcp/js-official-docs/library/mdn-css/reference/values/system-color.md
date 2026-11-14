---
title: "`<system-color>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/system-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<system-color>` CSS type

The **`<system-color>`** CSS data type usually reflects the default color choices used for the different parts of a web page.

However, user agents can provide an accessibility feature called _forced colors mode_, in which colors are restricted into a user- and user agent-defined palette, overriding the author's choice of colors in certain properties. In forced colors mode, `<system-color>` exposes the chosen colors, so that the rest of the page can integrate with them. An example of forced colors mode is high contrast mode on Windows.

In forced colors mode, authors should use colors from the `<system-color>` type for all properties that are _not_ in the set of properties whose colors are overridden. This ensures that the page consistently uses the same color palette across all properties.

Authors can detect forced colors mode using the `forced-colors` media feature.

A `<system-color>` value can be used anywhere a `<color>` can be used.

## Syntax

Note that these keywords are _case insensitive_, but are listed here with mixed case for readability.

Depending on your settings, the sample colors displayed in the table may change. You can also view this page with different browsers, operating systems, and system settings, to check the differences.

       | Keyword
       | Description
       | Sample

       | `AccentColor`
       | Background of accented user interface controls.
       |

       | `AccentColorText`
       | Text of accented user interface controls.
       |

       | `ActiveText`
       | Text of active links.
       |

       | `ButtonBorder`
       | Base border color of controls.
       |

       | `ButtonFace`
       | Background color of controls.
       |

       | `ButtonText`
       | Text color of controls.
       |

       | `Canvas`
       | Background of application content or documents.
       |

       | `CanvasText`
       | Text color in application content or documents.
       |

       | `Field`
       | Background of input fields.
       |

       | `FieldText`
       | Text in input fields.
       |

       | `GrayText`
       | Text color for disabled items (for example, a disabled control).
       |

       | `Highlight`
       | Background of selected items.
       |

       | `HighlightText`
       | Text color of selected items.
       |

       | `LinkText`
       | Text of non-active, non-visited links.
       |

       | `Mark`
       | Background of text that has been specially marked (such as by the HTML `mark` element).
       |

       | `MarkText`
       | Text that has been specially marked (such as by the HTML `mark` element).
       |

       | `SelectedItem`
       | Background of selected items, for example, a selected checkbox.
       |

       | `SelectedItemText`
       | Text of selected items.
       |

       | `VisitedText`
       | Text of visited links.
       |

> **Note:**
> To reduce the risk of fingerprinting, some browsers return a fixed value for `AccentColor` and `AccentColorText` unless they are used in certain restricted circumstances. See browser compatibility for details.

### Deprecated system color keywords

The following keywords were defined in earlier versions of the CSS Color Module. They are now deprecated for use on public web pages.

       | Keyword
       | Description
       | Replacement
       | Sample

       | `ActiveBorder`
       | Active window border
       | `ButtonBorder`
       |

       | `ActiveCaption`
       | Active window caption. Should be used with `CaptionText` as foreground color.
       | `Canvas`
       |

       | `AppWorkspace`
       | Background color of multiple document interface.
       | `Canvas`
       |

       | `Background`
       | Desktop background.
       | `Canvas`
       |

       | `ButtonHighlight`
       | The color of the border facing the light source for 3-D elements that appear 3-D due to that layer of surrounding border.
       | `ButtonFace`
       |

       | `ButtonShadow`
       | The color of the border away from the light source for 3-D elements that appear 3-D due to that layer of surrounding border.
       | `ButtonFace`
       |

       | `CaptionText`
       | Text in caption, size box, and scrollbar arrow box. Should be used with the `ActiveCaption` background color.
       | `CanvasText`
       |

       | `InactiveBorder`
       | Inactive window border.
       | `ButtonBorder`
       |

       | `InactiveCaption`
       | Inactive window caption. Should be used with the `InactiveCaptionText` foreground color.
       | `Canvas`
       |

       | `InactiveCaptionText`
       | Color of text in an inactive caption. Should be used with the `InactiveCaption` background color.
       | `GrayText`
       |

       | `InfoBackground`
       | Background color for tooltip controls. Should be used with the `InfoText` foreground color.
       | `Canvas`
       |

       | `InfoText`
       | Text color for tooltip controls. Should be used with the `InfoBackground` background color.
       | `CanvasText`
       |

       | `Menu`
       | Menu background. Should be used with the `MenuText` or `-moz-MenuBarText` foreground color.
       | `Canvas`
       |

       | `MenuText`
       | Text in menus. Should be used with the `Menu` background color.
       | `CanvasText`
       |

       | `Scrollbar`
       | Background color of scroll bars.
       | `Canvas`
       |

       | `ThreeDDarkShadow`
       | The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.
       | `ButtonBorder`
       |

       | `ThreeDFace`
       | The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border. Should be used with the `ButtonText` foreground color.
       | `ButtonFace`
       |

       | `ThreeDHighlight`
       | The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.
       | `ButtonBorder`
       |

       | `ThreeDLightShadow`
       | The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.
       | `ButtonBorder`
       |

       | `ThreeDShadow`
       | The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.
       | `ButtonBorder`
       |

       | `Window`
       | Window background. Should be used with the `WindowText` foreground color.
       | `Canvas`
       |

       | `WindowFrame`
       | Window frame.
       | `ButtonBorder`
       |

       | `WindowText`
       | Text in windows. Should be used with the `Window` background color.
       | `CanvasText`
       |

## Examples

### Using system colors

In this example we have a button that normally gets its contrast using the `box-shadow` property. In forced colors mode, `box-shadow` is forced to `none`, so the example uses the `forced-colors` media feature to ensure there is a border of the appropriate color (`ButtonBorder` in this case).

#### HTML

```html
<button class="button">Press me!</button>
```

#### CSS

```css
.button {
  border: 0;
  padding: 10px;
  box-shadow:
    -2px -2px 5px gray,
    2px 2px 5px gray;
}

@media (forced-colors: active) {
  .button {
    /* Use a border instead, since box-shadow
    is forced to 'none' in forced-colors mode */
    border: 2px ButtonBorder solid;
  }
}
```

#### Result

## See also

- `<color>`: the data type these keywords belong to
