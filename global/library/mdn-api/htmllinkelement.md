---
title: "HTMLLinkElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement

The **`HTMLLinkElement`** interface represents reference information for external resources and the relationship of those resources to a document and vice versa (corresponds to `<link>` element; not to be confused with ``, which is represented by `HTMLAnchorElement`). This object inherits all of the properties and methods of the `HTMLElement` interface.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLLinkElement.as`
    A string representing the type of content being loaded by the HTML link when `rel="preload"` or `rel="modulepreload"`.
- `HTMLLinkElement.blocking`
    A string indicating that certain operations should be blocked on the fetching of an external resource. It reflects the `blocking` attribute of the `<link>` element.
- `HTMLLinkElement.crossOrigin`
    A string that corresponds to the CORS setting for this link element. See CORS settings attributes for details.
- `HTMLLinkElement.disabled`
    A boolean value which represents whether the link is disabled; currently only used with style sheet links.
- `HTMLLinkElement.fetchPriority`
    An optional string representing a hint given to the browser on how it should prioritize fetching of a preload relative to other resources of the same type. If this value is provided, it must be one of the possible permitted values: `high` to fetch at a higher priority, `low` to fetch at a lower priority, or `auto` to indicate no preference (which is the default).
- `HTMLLinkElement.href`
    A string representing the URI for the target resource.
- `HTMLLinkElement.hreflang`
    A string representing the language code for the linked resource.
- `HTMLLinkElement.imageSizes`
    A string reflecting the `imagesizes` HTML attribute; a list of comma-separated image conditions and sizes.
- `HTMLLinkElement.imageSrcset`
    A string reflecting the `imagesrcset` HTML attribute; a comma-separated list of image candidate strings.
- `HTMLLinkElement.integrity`
    A string that contains inline metadata that a browser can use to verify that a fetched resource has been delivered without unexpected manipulation. It reflects the `integrity` attribute of the `<link>` element.
- `HTMLLinkElement.media`
    A string representing a list of one or more media formats to which the resource applies. It reflects the `media` attribute of the `<link>` element.
- `HTMLLinkElement.referrerPolicy`
    A string that reflects the `referrerpolicy` HTML attribute indicating which referrer to use.
- `HTMLLinkElement.rel`
    A string representing the forward relationship of the linked resource from the document to the resource.
- `HTMLLinkElement.relList` (read-only)
    A `DOMTokenList` that reflects the `rel` HTML attribute, as a list of tokens.
- `HTMLLinkElement.sizes` (read-only)
    A `DOMTokenList` that reflects the `sizes` HTML attribute, as a list of tokens.
- `HTMLLinkElement.sheet` (read-only)
    Returns the `CSSStyleSheet` object associated with the given element, or `null` if there is none.
- `HTMLLinkElement.type`
    A string representing the MIME type of the linked resource.

### Obsolete properties

- `HTMLLinkElement.charset` (deprecated)
    A string representing the character encoding for the target resource.
- `HTMLLinkElement.rev` (deprecated)
    A string representing the reverse relationship of the linked resource from the resource to the document.

    > **Note:**
    > Currently the W3C HTML 5.2 spec states that `rev` is no longer obsolete, whereas the WHATWG living standard still has it labeled obsolete. Until this discrepancy is resolved, you should still assume it is obsolete.

- `HTMLLinkElement.target` (deprecated)
    A string representing the name of the target frame to which the resource applies.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## See also

- The HTML element implementing this interface: `<link>`.
