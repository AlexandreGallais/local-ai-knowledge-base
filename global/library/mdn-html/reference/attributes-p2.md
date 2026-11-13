---
title: "HTML attribute reference (part 2 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTML attribute reference (part 2 of 3)

## Attribute list

       | Attribute Name
       | Elements
       | Description

       |
        <code>accept</code>

       |
        `<form>`, ``

       | List of types the server accepts, typically a file type.

       |
        <code>accept-charset</code>

       | `<form>`
       | The character set, which if provided must be `"UTF-8"`.

       |
        <code>accesskey</code>

       |
        Global attribute

       | Keyboard shortcut to activate or add focus to the element.

       |
        <code>action</code>

       | `<form>`
       |
        The URI of a program that processes the information submitted via the
        form.

       |
        `align` (deprecated)

       |
        ``, ``,
        ``,
        ``, ``,
        ``, ``,
        ``, ` | `,
        ``, ` | `,
        ``, ``

       | Specifies the horizontal alignment of the element.

       |
        <code>allow</code>

       | ``
       | Specifies a feature-policy for the iframe.

       |
        <code>alpha</code>

       | ``
       | Allow the user to select a color's opacity on a `type="color"` input.

       |
        <code>alt</code>

       |
        `<area>`,
        ``, ``

       | Alternative text in case an image can't be displayed.

       |
        <code>aria-*</code>

       |
        All elements

       |
        Modifies an element's state or properties in the accessibility tree. Applicability depends on the specific ARIA attribute.

       |
        <code>as</code>

       |
        `<link>`

       | Specifies the type of content being loaded by the link.

       |
        <code>async</code>

       | `<script>`
       | Executes the script asynchronously.

       |
        <code>autocapitalize</code>

       |
        Global attribute

       |
        Sets whether input is automatically capitalized when entered by user

       |
        <code>autocomplete</code>

       |
        `<form>`, ``,
        `<select>`,
        `<textarea>`

       |
        Indicates whether controls in this form can by default have their values
        automatically completed by the browser.

       |
        <code>autoplay</code>

       |
        `<audio>`,
        ``

       | The audio or video should play as soon as possible.

       | `background`
       |
        `<body>`, ``,
        ` | `, ` | `

       |
        Specifies the URL of an image file.

            Note: Although browsers and email clients may still
            support this attribute, it is obsolete. Use CSS
            `background-image` instead.

       | `bgcolor`
       |
        `<body>`, ``,
        ``,
        `<marquee>`,
        ``,
        ``,
        ``, ` | `,
        ` | `, ``

       |
        Background color of the element.

            Note: This is a legacy attribute. Please use the
            CSS `background-color` property instead.

       | `border`
       |
        ``, `<object>`,
        ``

       |
        The border width.

            Note: This is a legacy attribute. Please use the
            CSS `border` property instead.

       |
        <code>capture</code>

       | ``
       |
        From the Media Capture specification,
        specifies a new file can be captured.

       |
        <code>charset</code>

       |
        `<meta>`

       | Declares the character encoding of the page or script.

       |
        <code>checked</code>

       |
        ``

       | Indicates whether the element should be checked on page load.

       |
        <code>cite</code>

       |
        ``,
        ``, ``,
        `<q>`

       | Contains a URI which points to the source of the quote or change.

       |
        <code>class</code>

       |
        Global attribute

       | Often used with CSS to style elements with common properties.

       | `color`
       |
        ``, ``

       |

          This attribute sets the text color using either a named color or a
          color specified in the hexadecimal #RRGGBB format.

            Note: This is a legacy attribute. Please use the
            CSS `color` property instead.

       |
        <code>colorspace</code>

       | ``
       | Defines the color space that is used by a `type="color"` input.

       |
        <code>cols</code>

       | `<textarea>`
       | Defines the number of columns in a textarea.

       |
        <code>colspan</code>

       |
        ` | `, ` | `

       |
        The colspan attribute defines the number of columns a cell should span.

       |
        <code>content</code>

       | `<meta>`
       |
        A value associated with `http-equiv` or
        `name` depending on the context.

       |
        <code>contenteditable</code>

       |
        Global attribute

       | Indicates whether the element's content is editable.

       |
        <code>controls</code>

       |
        `<audio>`,
        ``

       |
        Indicates whether the browser should show playback controls to the user.

       |
        <code>coords</code>

       | `<area>`
       |
        A set of values specifying the coordinates of the hot-spot region.

       |
        <code>crossorigin</code>

       |
        `<audio>`, ``,
        `<link>`, `<script>`,
        ``

       | How the element handles cross-origin requests

       |
        <code>csp</code>
        (experimental)

       | ``
       |
        Specifies the Content Security Policy that an embedded document must
        agree to enforce upon itself.

       |
        <code>data</code>

       | `<object>`
       | Specifies the URL of the resource.

       |
        <code>data-*</code>

       |
        Global attribute

       | Lets you attach custom attributes to an HTML element.

       |
        <code>datetime</code>

       |
        ``, ``,
        `<time>`

       | Indicates the date and time associated with the element.

       |
        <code>decoding</code>

       | ``
       | Indicates the preferred method to decode the image.

       |
        <code>default</code>

       | `<track>`
       |
        Indicates that the track should be enabled unless the user's preferences
        indicate something different.

       |
        <code>defer</code>

       | `<script>`
       |
        Indicates that the script should be executed after the page has been
        parsed.

       |
        <code>dir</code>

       |
        Global attribute

       |
        Defines the text direction. Allowed values are ltr (Left-To-Right) or
        rtl (Right-To-Left)

       |
        <code>dirname</code>

       |
        ``,
        `<textarea>`

       |

       |
        <code>disabled</code>

       |
        ``,
        `<fieldset>`,
        ``,
        `<optgroup>`,
        `<option>`,
        `<select>`,
        `<textarea>`

       | Indicates whether the user can interact with the element.

       |
        <code>download</code>

       | ``, `<area>`
       |
        Indicates that the hyperlink is to be used for downloading a resource.

       |
        <code>draggable</code>

       |
        Global attribute

       | Defines whether the element can be dragged.

       |
        <code>enctype</code>

       | `<form>`
       |
        Defines the content type of the form data when the
        `method` is POST.

       |
        <code>enterkeyhint</code>

       |
        `<textarea>`,
        `contenteditable`

       |
        The `enterkeyhint`
        specifies what action label (or icon) to present for the enter key on
        virtual keyboards. The attribute can be used with form controls (such as
        the value of `textarea` elements), or in elements in an
        editing host (e.g., using `contenteditable` attribute).

       |
        <code>elementtiming</code>

       |
        ``,
        `<image>` elements inside an ``,
        poster images of `` elements,
        elements which have a `background-image`,
        and elements containing text nodes, such as a ``

       |
        Indicates that an element is flagged for tracking by `PerformanceObserver` objects using the `"element"` type. For more details, see the `PerformanceElementTiming` interface.

       |
        <code>fetchpriority</code>

       |
        ``,
        `<link>`,
        `<script>`

       | Signals that fetching a particular image early in the loading process has more or less impact on user experience than a browser can reasonably infer when assigning an internal priority.

       |
        <code>for</code>

       |
        ``,
        `<output>`

       | Describes elements which belongs to this one.

       |
        <code>form</code>

       |
        ``,
        `<fieldset>`,
        ``,
        `<object>`,
        `<output>`,
        `<select>`,
        `<textarea>`

       | Indicates the form that is the owner of the element.

       |
        <code>formaction</code>

       |
        ``,
        ``

       |
        Indicates the action of the element, overriding the action defined in
        the `<form>`.

       |
        <code>formenctype</code>

       |
        ``,
        ``

       |
        If the button/input is a submit button (e.g., `type="submit"`),
        this attribute sets the encoding type to use during form submission. If
        this attribute is specified, it overrides the
        `enctype` attribute of the button's
        form owner.

       |
        <code>formmethod</code>

       |
        ``,
        ``

       |
        If the button/input is a submit button (e.g., `type="submit"`),
        this attribute sets the submission method to use during form submission
        (`GET`, `POST`, etc.). If this attribute is
        specified, it overrides the `method` attribute of the
        button's form owner.

       |
        <code>formnovalidate</code>

       |
        ``,
        ``

       |
        If the button/input is a submit button (e.g., `type="submit"`),
        this boolean attribute specifies that the form is not to be validated
        when it is submitted. If this attribute is specified, it overrides the
        `novalidate` attribute of the button's
        form owner.

       |
        <code>formtarget</code>

       |
        ``,
        ``

       |
        If the button/input is a submit button (e.g., `type="submit"`),
        this attribute specifies the browsing context (for example, tab, window,
        or inline frame) in which to display the response that is received after
        submitting the form. If this attribute is specified, it overrides the
        `target` attribute of the button's
        form owner.

       |
        <code>headers</code>

       |
        ` | `, ` | `

       |
        IDs of the `&#x3C;th>` elements which applies to this
        element.

       | `height`
       |
        `<canvas>`,
        ``,
        ``, ``,
        ``,
        `<object>`,
        ``

       |

          Specifies the height of elements listed here. For all other elements,
          use the CSS `height` property.

            Note: In some instances, such as
            ``, this is a legacy attribute, in
            which case the CSS `height` property should
            be used instead.

       |
        <code>hidden</code>

       |
        Global attribute

       |
        Prevents rendering of given element, while keeping child elements, e.g.
        script elements, active.

       |
        <code>high</code>

       | `<meter>`
       | Indicates the lower bound of the upper range.

       |
        <code>href</code>

       |
        ``, `<area>`,
        `<base>`, `<link>`

       | The URL of a linked resource.

       |
        <code>hreflang</code>

       |
        ``, `<link>`

       | Specifies the language of the linked resource.

       |
        <code>http-equiv</code>

       | `<meta>`
       | Defines a pragma directive.

       |
        <code>id</code>

       |
        Global attribute

       |
        Often used with CSS to style a specific element. The value of this
        attribute must be unique.

       |
        <code>integrity</code>

       |
        `<link>`, `<script>`

       |

          This attribute contains one or more hashes of the resource, and is used to ensure that the content of the resource is what the developer expects it to be, and has not been replaced with a malicious copy in a supply chain attack.
          See Subresource Integrity.

       |
        `inputmode`

       |
        `<textarea>`,
        `contenteditable`

       |
        Provides a hint as to the type of data that might be entered by the user
        while editing the element or its contents. The attribute can be used
        with form controls (such as the value of
        `textarea` elements), or in elements in an editing host
        (e.g., using `contenteditable` attribute).

       |
        <code>ismap</code>

       | ``
       | Indicates that the image is part of a server-side image map.

       |
        <code>itemprop</code>

       |
        Global attribute

       |

       |
        <code>kind</code>

       | `<track>`
       | Specifies the kind of text track.

       |
        <code>label</code>

       |
        `<optgroup>`,
        `<option>`,
        `<track>`

       | Specifies a user-readable title of the element.

       |
        <code>lang</code>

       |
        Global attribute

       | Defines the language used in the element.

       |
        <code>language</code>
        (deprecated)

       | `<script>`
       | Defines the script language used in the element.

       | `loading`
       |
        ``, ``

       |
        Indicates if the element should be loaded lazily
        (`loading="lazy"`) or loaded immediately
        (`loading="eager"`).

       |
        <code>list</code>

       | ``
       | Identifies a list of pre-defined options to suggest to the user.

       |
        <code>loop</code>

       |
        `<audio>`,
        `<marquee>`,
        ``

       |
        Indicates whether the media should start playing from the start when
        it's finished.

       |
        <code>low</code>

       | `<meter>`
       | Indicates the upper bound of the lower range.

       |
        <code>max</code>

       |
        ``,
        `<meter>`,
        `<progress>`

       | Indicates the maximum value allowed.

       |
        <code>maxlength</code>

       |
        ``,
        `<textarea>`

       | Defines the maximum number of characters allowed in the element.

       |
        <code>minlength</code>

       |
        ``,
        `<textarea>`

       | Defines the minimum number of characters allowed in the element.

       |
        <code>media</code>

       |
        ``, `<area>`,
        `<link>`, ``,
        `<style>`

       |
        Specifies a hint of the media for which the linked resource was
        designed.

       |
        <code>method</code>
