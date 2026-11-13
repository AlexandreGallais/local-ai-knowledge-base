---
title: "Attr"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/attr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Attr

The **`Attr`** interface represents one of an element's attributes as an object. In most situations, you will directly retrieve the attribute value as a string (e.g., `Element.getAttribute()`), but some cases may require interacting with `Attr` instances (e.g., `Element.getAttributeNode()`).

The core idea of an object of type `Attr` is the association between a _name_ and a _value_. An attribute may also be part of a _namespace_ and, in this case, it also has a URI identifying the namespace, and a prefix that is an abbreviation for the namespace.

The name is deemed _local_ when it ignores the eventual namespace prefix and deemed _qualified_ when it includes the prefix of the namespace, if any, separated from the local name by a colon (`:`). We have three cases: an attribute outside of a namespace, an attribute inside a namespace without a prefix defined, an attribute inside a namespace with a prefix:

| Attribute | Namespace name | Namespace prefix | Attribute local name | Attribute qualified name |
| --------- | -------------- | ---------------- | -------------------- | ------------------------ |
| `myAttr`  | _none_         | _none_           | `myAttr`             | `myAttr`                 |
| `myAttr`  | `mynamespace`  | _none_           | `myAttr`             | `myAttr`                 |
| `myAttr`  | `mynamespace`  | `myns`           | `myAttr`             | `myns:myAttr`            |

> **Note:**
> This interface represents only attributes present in the tree representation of an SVG, HTML, or MathML `Element`. It doesn't represent the properties of the interface associated with that element, such as the properties of `HTMLTableElement` for a `` element. (See this article for more information about attributes and how they are _reflected_ into properties.)

## Instance properties

_This interface also inherits the properties of its parent interfaces, `Node` and `EventTarget`._

- `localName` (read-only)
    A string representing the local part of the qualified name of the attribute.
- `name` (read-only)
    The attribute's _qualified name_. If the attribute is not in a namespace, it will be the same as `localName` property.
- `namespaceURI` (read-only)
    A string representing the URI of the namespace of the attribute, or `null` if there is no namespace.
- `ownerElement` (read-only)
    The `Element` the attribute belongs to.
- `prefix` (read-only)
    A string representing the namespace prefix of the attribute, or `null` if a namespace without prefix or no namespace are specified.
- `specified` (read-only) (deprecated)
    This property always returns `true`.
- `value`
    The attribute's value, a string that can be set and get using this property.

## Instance methods

_This interface has no specific methods, but inherits the methods of its parent interfaces, `Node` and `EventTarget`._

## See also

- Other nodes are `CDATASection`, `CharacterData`, `Comment`, `Document`, `Element`, `ProcessingInstruction`, and `Text`.
