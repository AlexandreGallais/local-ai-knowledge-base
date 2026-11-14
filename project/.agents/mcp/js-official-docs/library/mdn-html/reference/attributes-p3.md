---
title: "HTML attribute reference (part 3 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTML attribute reference (part 3 of 3)

| `<form>`
       |
        Defines which HTTP method to use when
        submitting the form. Can be `GET` (default) or
        `POST`.

       |
        <code>min</code>

       |
        ``,
        `<meter>`

       | Indicates the minimum value allowed.

       |
        <code>multiple</code>

       |
        ``,
        `<select>`

       |
        Indicates whether multiple values can be entered in an input of the type
        `email` or `file`.

       |
        <code>muted</code>

       |
        `<audio>`,
        ``

       |
        Indicates whether the audio will be initially silenced on page load.

       |
        <code>name</code>

       |
        ``, `<form>`,
        `<fieldset>`,
        ``,
        ``,
        `<object>`,
        `<output>`,
        `<select>`,
        `<textarea>`,
        `<map>`, `<meta>`,
        `<param>`

       |
        Name of the element. For example used by the server to identify the
        fields in form submits.

       |
        <code>novalidate</code>

       | `<form>`
       |
        This attribute indicates that the form shouldn't be validated when
        submitted.

       |
        <code>open</code>

       |
        ``,
        `<dialog>`

       |
        Indicates whether the contents are currently visible (in the case of
        a `&#x3C;details>` element) or whether the dialog is active
        and can be interacted with (in the case of a
        `&#x3C;dialog>` element).

       |
        <code>optimum</code>

       | `<meter>`
       | Indicates the optimal numeric value.

       |
        <code>pattern</code>

       | ``
       |
        Defines a regular expression which the element's value will be validated
        against.

       |
        <code>ping</code>

       | ``, `<area>`
       |
        The `ping` attribute specifies a space-separated list of URLs
        to be notified if a user follows the hyperlink.

       |
        <code>placeholder</code>

       |
        ``,
        `<textarea>`

       | Provides a hint to the user of what can be entered in the field.

       |
        <code>playsinline</code>

       |
        ``

       | A Boolean attribute indicating that the video is to be played "inline"; that is, within the element's playback area. Note that the absence of this attribute does not imply that the video will always be played in fullscreen.

       |
        <code>poster</code>

       | ``
       |
        A URL indicating a poster frame to show until the user plays or seeks.

       |
        <code>preload</code>

       |
        `<audio>`,
        ``

       |
        Indicates whether the whole resource, parts of it or nothing should be
        preloaded.

       |
        <code>readonly</code>

       |
        ``,
        `<textarea>`

       | Indicates whether the element can be edited.

       |
        <code>referrerpolicy</code>

       |
        ``, `<area>`,
        ``, ``,
        `<link>`, `<script>`

       | Specifies which referrer is sent when fetching the resource.

       |
        <code>rel</code>

       |
        ``, `<area>`,
        `<link>`

       |
        Specifies the relationship of the target object to the link object.

       |
        <code>required</code>

       |
        ``,
        `<select>`,
        `<textarea>`

       | Indicates whether this element is required to fill out or not.

       |
        <code>reversed</code>

       | ``
       |
        Indicates whether the list should be displayed in a descending order
        instead of an ascending order.

       |
        <code>role</code>

       | Global attribute
       | Defines an explicit role for an element for use by assistive technologies.

       |
        <code>rows</code>

       | `<textarea>`
       | Defines the number of rows in a text area.

       |
        <code>rowspan</code>

       |
        ` | `, ` | `

       | Defines the number of rows a table cell should span over.

       |
        <code>sandbox</code>

       | ``
       |
        Stops a document loaded in an iframe from using certain features (such
        as submitting forms or opening new windows).

       |
        <code>scope</code>

       | ` | `
       |
        Defines the cells that the header test (defined in the
        `th` element) relates to.

       |
        <code>selected</code>

       | `<option>`
       | Defines a value which will be selected on page load.

       |
        <code>shape</code>

       | ``, `<area>`
       |

       |
        <code>size</code>

       |
        ``,
        `<select>`

       |
        Defines the width of the element (in pixels). If the element's
        `type` attribute is `text` or
        `password` then it's the number of characters.

       |
        <code>sizes</code>

       |
        `<link>`, ``,
        ``

       |

       |
        <code>slot</code>

       |
        Global attribute

       | Assigns a slot in a shadow DOM shadow tree to an element.

       |
        <code>span</code>

       |
        ``,
        ``

       |

       |
        <code>spellcheck</code>

       |
        Global attribute

       | Indicates whether spell checking is allowed for the element.

       |
        <code>src</code>

       |
        `<audio>`,
        ``,
        ``, ``,
        ``,
        `<script>`,
        ``,
        `<track>`,
        ``

       | The URL of the embeddable content.

       |
        <code>srcdoc</code>

       | ``
       |

       |
        <code>srclang</code>

       | `<track>`
       |

       |
        <code>srcset</code>

       |
        ``, ``

       | One or more responsive image candidates.

       |
        <code>start</code>

       | ``
       | Defines the first number if other than 1.

       |
        <code>step</code>

       | ``
       |

       |
        <code>style</code>

       |
        Global attribute

       | Defines CSS styles which will override styles previously set.

       |
        <code>summary</code>
        (deprecated)

       | ``
       |

       |
        <code>tabindex</code>

       |
        Global attribute

       |
        Overrides the browser's default tab order and follows the one specified
        instead.

       |
        <code>target</code>

       |
        ``, `<area>`,
        `<base>`, `<form>`

       |
        Specifies where to open the linked document (in the case of an
        `&#x3C;a>` element) or where to display the response received
        (in the case of a `&#x3C;form>` element)

       |
        <code>title</code>

       |
        Global attribute

       | Text to be displayed in a tooltip when hovering over the element.

       |
        <code>translate</code>

       |
        Global attribute

       |
        Specify whether an element's attribute values and the values of its
        <code>Text</code> node
        children are to be translated when the page is localized, or whether to
        leave them unchanged.

       |
        <code>type</code>

       |
        ``,
        ``,
        ``,
        `<object>`,
        ``,
        `<script>`,
        ``,
        `<style>`, `<menu>`,
        `<link>`

       | Defines the type of the element.

       |
        <code>usemap</code>

       |
        ``, ``,
        `<object>`

       |

       |
        <code>value</code>

       |
        ``, `<data>`,
        ``, ``,
        `<meter>`,
        `<option>`,
        `<progress>`,
        `<param>`

       |
        Defines a default value which will be displayed in the element on page
        load.

       |
        <code>width</code>

       |
        `<canvas>`,
        ``,
        ``, ``,
        ``,
        `<object>`,
        ``

       |

          For the elements listed here, this establishes the element's width.

            Note: For all other instances, such as
            ``, this is a legacy attribute, in
            which case the CSS `width` property should be
            used instead.

       |
        <code>wrap</code>

       | `<textarea>`
       | Indicates whether the text should be wrapped.

## Content versus IDL attributes

In HTML, most attributes have two faces: the **content attribute** and the **IDL (Interface Definition Language) attribute**.

The content attribute is the attribute as you set it from the content (the HTML code) and you can set it or get it via `element.setAttribute()` or `element.getAttribute()`. The content attribute is always a string even when the expected value should be an integer. For example, to set an `` element's `maxlength` to 42 using the content attribute, you have to call `setAttribute("maxlength", "42")` on that element.

The IDL attribute is also known as a JavaScript property. These are the attributes you can read or set using JavaScript properties like `element.foo`. The IDL attribute is always going to use (but might transform) the underlying content attribute to return a value when you get it and is going to save something in the content attribute when you set it. In other words, the IDL attributes, in essence, reflect the content attributes.

Most of the time, IDL attributes will return their values as they are really used. For example, the default `type` for `` elements is "text", so if you set `input.type="foobar"`, the `` element will be of type text (in the appearance and the behavior) but the "type" content attribute's value will be "foobar". However, the `type` IDL attribute will return the string "text".

IDL attributes are not always strings; for example, `input.maxlength` is a number (a signed long). When using IDL attributes, you read or set values of the desired type, so `input.maxlength` is always going to return a number and when you set `input.maxlength`, it wants a number. If you pass <example-value> type, it is automatically converted to a number as specified by the standard JavaScript rules for type conversion.

IDL attributes can reflect other types such as unsigned long, URLs, booleans, etc. Unfortunately, there are no clear rules and the way IDL attributes behave in conjunction with their corresponding content attributes depends on the attribute. Most of the time, it will follow the rules laid out in the specification, but sometimes it doesn't. HTML specifications try to make this as developer-friendly as possible, but for various reasons (mostly historical), some attributes behave oddly (`select.size`, for example) and you should read the specifications to understand how exactly they behave.

## Boolean Attributes

Some content attributes (e.g., `required`, `readonly`, `disabled`) are called boolean attributes. If a boolean attribute is present, its value is **true**, and if it's absent, its value is **false**.

HTML defines restrictions on the allowed values of boolean attributes: If the attribute is present, its value must either be the empty string (equivalently, the attribute may have an unassigned value), or a value that is an ASCII case-insensitive match for the attribute's canonical name, with no leading or trailing whitespace. The following examples are valid ways to mark up a boolean attribute:

```html
<div itemscope>This is valid HTML but invalid XML.</div>
<div itemscope=itemscope>This is also valid HTML but invalid XML.</div>
<div itemscope="">This is valid HTML and also valid XML.</div>
<div itemscope="itemscope">
  This is also valid HTML and XML, but perhaps a bit verbose.
</div>
```

To be clear, the values `"true"` and `"false"` are not allowed on boolean attributes. To represent a false value, the attribute has to be omitted altogether. This restriction clears up some common misunderstandings: With `checked="false"` for example, the element's `checked` attribute would be interpreted as **true** because the attribute is present.

## Event handler attributes

> **Warning:**
> The use of event handler content attributes is discouraged. The mix of HTML and JavaScript often produces unmaintainable code, and the execution of event handler attributes may also be blocked by content security policies.

> **Warning:**
> While not visible by calling the `Function.prototype.toString()` method on the handler, event handler attributes will implicitly wrap code inside of 2 `with` statements, and may produce unexpected results. For example:
>
> ```html
> Bad Example
> ```
>
> Essentially becomes:
>
> ```js example-bad
> function onclick(event) {
>   with (this.ownerDocument) {
>     with (this) {
>       console.log(new URL(location)); // 'URL' now resolves to document.URL instead of window.URL
>       // TypeError: URL is not a constructor
>     }
>   }
> }
> ```

In addition to the attributes listed in the table above, global event handlers — such as `onclick` — can also be specified as content attributes on all elements.

All event handler attributes accept a string. The string will be used to synthesize a JavaScript function like `function name(/*args*/) {body}`, where `name` is the attribute's name, and `body` is the attribute's value. The handler receives the same parameters as its JavaScript event handler counterpart — most handlers receive only one `event` parameter, while `onerror` receives five: `event`, `source`, `lineno`, `colno`, `error`. This means you can, in general, use the `event` variable within the attribute.

```html
<div onclick="console.log(event)">Click me!</div>
<!-- The synthesized handler has a name; you can reference itself -->
<div onclick="console.log(onclick)">Click me!</div>
```

## See also

- HTML elements
