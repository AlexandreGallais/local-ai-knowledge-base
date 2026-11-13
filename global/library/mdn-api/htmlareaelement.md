---
title: "HTMLAreaElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement

The **`HTMLAreaElement`** interface provides special properties and methods (beyond those of the regular object `HTMLElement` interface it also has available to it by inheritance) for manipulating the layout and presentation of `<area>` elements.

## Instance properties

_Inherits properties from its parent `HTMLElement`._

- `HTMLAreaElement.alt`
    A string that reflects the `alt` HTML attribute, containing alternative text for the element.
- `HTMLAreaElement.coords`
    A string that reflects the `coords` HTML attribute, containing coordinates to define the hot-spot region.
- `HTMLAreaElement.download`
    A string indicating that the linked resource is intended to be downloaded rather than displayed in the browser. The value represent the proposed name of the file. If the name is not a valid filename of the underlying OS, browser will adjust it accordingly.
- `HTMLAreaElement.hash`
    A string containing the fragment identifier (including the leading hash mark (#)), if any, in the referenced URL.
- `HTMLAreaElement.host`
    A string containing the hostname and port (if it's not the default port) in the referenced URL.
- `HTMLAreaElement.hostname`
    A string containing the hostname in the referenced URL.
- `HTMLAreaElement.href`
    A string containing that reflects the `href` HTML attribute, containing a valid URL of a linked resource.
- `HTMLAreaElement.interestForElement` (experimental) (non-standard)
    Gets or sets the target element of an interest invoker, in cases where the associated `<area>` element is specified as an interest invoker.
- `HTMLAreaElement.noHref` (deprecated)
    A boolean flag indicating if the area is inactive (`true`) or active (`false`).
- `HTMLAreaElement.origin` (read-only)
    Returns a string containing the origin of the URL, that is its scheme, its domain and its port.
- `HTMLAreaElement.password`
    A string containing the password <example-value> before the domain name.
- `HTMLAreaElement.pathname`
    A string containing the path name component, if any, of the referenced URL.
- `HTMLAreaElement.ping`
    A space-separated list of URLs. When the link is followed, the browser will send `POST` requests with the body PING to the URLs.
- `HTMLAreaElement.port`
    A string containing the port component, if any, of the referenced URL.
- `HTMLAreaElement.protocol`
    A string containing the protocol component (including trailing colon `':'`), of the referenced URL.
- `HTMLAreaElement.referrerPolicy`
    A string that reflects the `referrerpolicy` HTML attribute indicating which referrer to use when fetching the linked resource.
- `HTMLAreaElement.rel`
    A string that reflects the `rel` HTML attribute, indicating relationships of the current document to the linked resource.
- `HTMLAreaElement.relList` (read-only)
    Returns a `DOMTokenList` that reflects the `rel` HTML attribute, indicating relationships of the current document to the linked resource, as a list of tokens.
- `HTMLAreaElement.search`
    A string containing the search element (including leading question mark `'?'`), if any, of the referenced URL.
- `HTMLAreaElement.shape`
    A string that reflects the `shape` HTML attribute, indicating the shape of the hot-spot, limited to known values.
- `HTMLAreaElement.target`
    A string that reflects the `target` HTML attribute, indicating the browsing context in which to open the linked resource.
- `HTMLAreaElement.username`
    A string containing the username specified before the domain name.

## Instance methods

_Inherits methods from its parent, `HTMLElement`._

- `HTMLAreaElement.toString()`
    Returns a string containing the whole URL. It is a synonym for `HTMLAreaElement.href`.

## See also

- HTML element implementing this interface: `<area>`
