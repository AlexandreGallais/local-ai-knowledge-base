---
title: "Document (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document

The **`Document`** interface represents any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree.

The DOM tree includes elements such as `<body>` and ``, among many others. It provides functionality globally to the document, like how to obtain the page's URL and create new elements in the document.

The `Document` interface describes the common properties and methods for any kind of document. Depending on the document's type (e.g., HTML, XML, SVG, …), a larger API is available: HTML documents, served with the `"text/html"` content type, also implement the `HTMLDocument` interface, whereas XML and SVG documents implement the `XMLDocument` interface.

## Constructor

- `Document()`
    Creates a new `Document` object.

## Instance properties

_This interface also inherits from the `Node` and `EventTarget` interfaces._

- `Document.activeElement` (read-only)
    Returns the `Element` that currently has focus.
- `Document.activeViewTransition` (read-only)
    Returns a `ViewTransition` instance representing the view transition currently active on the document, or `null` if there is no active view transition.
- `Document.adoptedStyleSheets`
    Add an array of constructed stylesheets to be used by the document.
    These stylesheets may also be shared with shadow DOM subtrees of the same document.
- `Document.body`
    Returns the `<body>` or `<frameset>` node of the current document.
- `Document.characterSet` (read-only)
    Returns the character set being used by the document.
- `Document.childElementCount` (read-only)
    Returns the number of child elements of the current document.
- `Document.children` (read-only)
    Returns the child elements of the current document.
- `Document.compatMode` (read-only)
    Indicates whether the document is rendered in _quirks_ or _strict_ mode.
- `Document.contentType` (read-only)
    Returns the Content-Type from the MIME Header of the current document.
- `Document.currentScript` (read-only)
    Returns the `<script>` element whose script is currently being processed and isn't a JavaScript module.
- `Document.customElementRegistry` (read-only)
    The `CustomElementRegistry` object associated with this document, or `null` if one has not been set.
- `Document.doctype` (read-only)
    Returns the Document Type Definition (DTD) of the current document.
- `Document.documentElement` (read-only)
    Returns the `Element` that is a direct child of the document. For HTML documents, this is normally the `HTMLHtmlElement` object representing the document's `<html>` element.
- `Document.documentURI` (read-only)
    Returns the document location as a string.
- `Document.embeds` (read-only)
    Returns an `HTMLCollection` of the embedded `` elements in the document.
- `Document.featurePolicy` (experimental) (read-only) (non-standard)
    Returns the `FeaturePolicy` interface with the feature policies applied to the document.
- `Document.firstElementChild` (read-only)
    Returns the first child element of the current document.
- `Document.fonts` (read-only)
    Returns the `FontFaceSet` interface of the current document.
- `Document.forms` (read-only)
    Returns an `HTMLCollection` of the `<form>` elements in the document.
- `Document.fragmentDirective` (read-only)
    Returns the `FragmentDirective` for the current document.
- `Document.fullscreenElement` (read-only)
    The element that's currently in fullscreen mode for this document.
- `Document.head` (read-only)
    Returns the `<head>` element of the current document.
- `Document.hidden` (read-only)
    Returns a Boolean value indicating if the page is considered hidden or not.
- `Document.images` (read-only)
    Returns an `HTMLCollection` of the images in the document.
- `Document.implementation` (read-only)
    Returns the DOM implementation associated with the current document.
- `Document.lastElementChild` (read-only)
    Returns the last child element of the current document.
- `Document.links` (read-only)
    Returns an `HTMLCollection` of the hyperlinks in the document.
- `Document.pictureInPictureElement` (read-only)
    Returns the `Element` currently being presented in picture-in-picture mode in this document.
- `Document.pictureInPictureEnabled` (read-only)
    Returns true if the picture-in-picture feature is enabled.
- `Document.plugins` (read-only)
    Returns an `HTMLCollection` of the available plugins.
- `Document.pointerLockElement` (read-only)
    Returns the element set as the target for mouse events while the pointer is locked. `null` if lock is pending, pointer is unlocked, or if the target is in another document.
- `Document.prerendering` (read-only) (experimental)
    Returns a boolean that indicates whether the document is currently in the process of prerendering, as initiated via the Speculation Rules API.
- `Document.scripts` (read-only)
    Returns an `HTMLCollection` of the `<script>` elements in the document.
- `Document.scrollingElement` (read-only)
    Returns a reference to the `Element` that scrolls the document.
- `Document.styleSheets` (read-only)
    Returns a `StyleSheetList` of `CSSStyleSheet` objects for stylesheets explicitly linked into, or embedded in a document.
- `Document.timeline` (read-only)
    Returns timeline as a special instance of `DocumentTimeline` that is automatically created on page load.
- `Document.visibilityState` (read-only)
    Returns a `string` denoting the visibility state of the document. Possible values are `visible`, `hidden`, and `unloaded`.

### Extensions for HTMLDocument

_The `Document` interface for HTML documents inherits from the `HTMLDocument` interface or is extended for such documents._

- `Document.cookie`
    Returns a semicolon-separated list of the cookies for that document or sets a single cookie.
- `Document.defaultView` (read-only)
    Returns a reference to the window object.
- `Document.designMode`
    Gets/sets the ability to edit the whole document.
- `Document.dir`
    Gets/sets directionality (rtl/ltr) of the document.
- `Document.fullscreenEnabled` (read-only)
    Indicates whether fullscreen mode is available.
- `Document.lastModified` (read-only)
    Returns the date on which the document was last modified.
- `Document.location` (read-only)
    Returns the URI of the current document.
- `Document.readyState` (read-only)
    Returns loading status of the document.
- `Document.referrer` (read-only)
    Returns the URI of the page that linked to this page.
- `Document.title`
    Sets or gets the title of the current document.
- `Document.URL` (read-only)
    Returns the document location as a string.
- Named properties
    Some elements in the document are also exposed as properties:
    - For each ``, `<form>`, ``, ``, and `<object>` element, its `name` (if non-empty) is exposed.
      For example, if the document contains `<form name="my_form">`, then `document["my_form"]` (and its equivalent `document.my_form`) returns a reference to that element.
    - For each `<object>` element, its `id` (if non-empty) is exposed.
    - For each `` element with non-empty `name`, its `id` (if non-empty) is exposed.

    If a property corresponds to a single element, that element is directly returned. If that single element is an iframe, then its `contentWindow` is returned instead. If the property corresponds to multiple elements, then an `HTMLCollection` is returned containing all of them.

### Deprecated properties

- `Document.alinkColor` (deprecated)
    Returns or sets the color of active links in the document body.
- `Document.all` (read-only) (deprecated)
    Provides access to all elements in the document — it returns an `HTMLAllCollection` rooted at the document node. This is a legacy, non-standard property and should not be used.
- `Document.anchors` (deprecated) (read-only)
    Returns a list of all of the anchors in the document.
- `Document.applets` (deprecated) (read-only)
    Returns an empty `HTMLCollection`. Legacy property that used to return the list of applets within a document.
- `Document.bgColor` (deprecated)
    Gets/sets the background color of the current document.
- `Document.charset` (deprecated) (read-only)
    Alias of `Document.characterSet`. Use this property instead.
- `Document.domain` (deprecated)
    Gets/sets the domain of the current document.
- `Document.fgColor` (deprecated)
    Gets/sets the foreground color, or text color, of the current document.
- `Document.fullscreen` (read-only) (deprecated)
    Returns `true` when the document is in fullscreen mode.
- `Document.inputEncoding` (deprecated) (read-only)
    Alias of `Document.characterSet`. Use this property instead.
- `Document.lastStyleSheetSet` (deprecated) (read-only) (non-standard)
    Returns the name of the style sheet set that was last enabled. Has the value `null` until the style sheet is changed by setting the value of `selectedStyleSheetSet`.
- `Document.linkColor` (deprecated)
    Gets/sets the color of hyperlinks in the document.
- `Document.preferredStyleSheetSet` (deprecated) (read-only) (non-standard)
    Returns the preferred style sheet set as specified by the page author.
- `Document.rootElement` (read-only) (deprecated)
    Like `Document.documentElement`, but only for `` root elements. Use this property instead.
- `Document.selectedStyleSheetSet` (deprecated) (non-standard)
    Returns which style sheet set is currently in use.
- `Document.styleSheetSets` (deprecated) (read-only) (non-standard)
    Returns a list of the style sheet sets available on the document.
- `Document.vlinkColor` (deprecated)
    Gets/sets the color of visited hyperlinks.
- `Document.xmlEncoding` (read-only) (deprecated)
    Returns the encoding as determined by the XML declaration.
- `Document.xmlStandalone` (deprecated)
    Returns `true` if the XML declaration specifies the document to be standalone (_e.g.,_ An external part of the DTD affects the document's content), else `false`.
- `Document.xmlVersion` (deprecated)
    Returns the version number as specified in the XML declaration or `"1.0"` if the declaration is absent.

## Static methods

_This interface also inherits from the `Node` and `EventTarget` interfaces._

- `Document.parseHTML()`
    Creates a new `Document` object from a string of HTML in an XSS-safe manner with sanitization.
- `Document.parseHTMLUnsafe()`
    Creates a new `Document` object from a string of HTML without performing sanitization.
    The string may contain declarative shadow roots.
