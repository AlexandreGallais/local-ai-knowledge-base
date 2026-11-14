---
title: "xml.etree.ElementTree --- The ElementTree XML API (part 2 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/xml.etree.elementtree.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# xml.etree.ElementTree --- The ElementTree XML API (part 2 of 5)

## XPath support

This module provides limited support for
XPath expressions for locating elements in a
tree.  The goal is to support a small subset of the abbreviated syntax; a full
XPath engine is outside the scope of the module.

### Example

Here's an example that demonstrates some of the XPath capabilities of the
module.  We'll be using the `countrydata` XML document from the
Parsing XML section:

```
import xml.etree.ElementTree as ET

root = ET.fromstring(countrydata)

# Top-level elements
root.findall(".")

# All 'neighbor' grand-children of 'country' children of the top-level
# elements
root.findall("./country/neighbor")

# Nodes with name='Singapore' that have a 'year' child
root.findall(".//year/..[@name='Singapore']")

# 'year' nodes that are children of nodes with name='Singapore'
root.findall(".//*[@name='Singapore']/year")

# All 'neighbor' nodes that are the second child of their parent
root.findall(".//neighbor[2]")
```

For XML with namespaces, use the usual qualified `{namespace}tag` notation:

```
# All dublin-core "title" tags in the document
root.findall(".//{http://purl.org/dc/elements/1.1/}title")
```

### Supported XPath syntax

```text
+-----------------------+------------------------------------------------------+
| Syntax                | Meaning                                              |
+=======================+======================================================+
| ``tag``               | Selects all child elements with the given tag.       |
|                       | For example, ``spam`` selects all child elements     |
|                       | named ``spam``, and ``spam/egg`` selects all         |
|                       | grandchildren named ``egg`` in all children named    |
|                       | ``spam``.  ``{namespace}*`` selects all tags in the  |
|                       | given namespace, ``{*}spam`` selects tags named      |
|                       | ``spam`` in any (or no) namespace, and ``{}*``       |
|                       | only selects tags that are not in a namespace.       |
|                       |                                                      |
|                       | .. versionchanged:: 3.8                              |
|                       |    Support for star-wildcards was added.             |
+-----------------------+------------------------------------------------------+
| ``*``                 | Selects all child elements, including comments and   |
|                       | processing instructions.  For example, ``*/egg``     |
|                       | selects all grandchildren named ``egg``.             |
+-----------------------+------------------------------------------------------+
| ``.``                 | Selects the current node.  This is mostly useful     |
|                       | at the beginning of the path, to indicate that it's  |
|                       | a relative path.                                     |
+-----------------------+------------------------------------------------------+
| ``//``                | Selects all subelements, on all levels beneath the   |
|                       | current  element.  For example, ``.//egg`` selects   |
|                       | all ``egg`` elements in the entire tree.             |
+-----------------------+------------------------------------------------------+
| ``..``                | Selects the parent element.  Returns ``None`` if the |
|                       | path attempts to reach the ancestors of the start    |
|                       | element (the element ``find`` was called on).        |
+-----------------------+------------------------------------------------------+
| ``[@attrib]``         | Selects all elements that have the given attribute.  |
+-----------------------+------------------------------------------------------+
| ``[@attrib='value']`` | Selects all elements for which the given attribute   |
|                       | has the given value.  The value cannot contain       |
|                       | quotes.                                              |
+-----------------------+------------------------------------------------------+
| ``[@attrib!='value']``| Selects all elements for which the given attribute   |
|                       | does not have the given value. The value cannot      |
|                       | contain quotes.                                      |
|                       |                                                      |
|                       | .. versionadded:: 3.10                               |
+-----------------------+------------------------------------------------------+
| ``[tag]``             | Selects all elements that have a child named         |
|                       | ``tag``.  Only immediate children are supported.     |
+-----------------------+------------------------------------------------------+
| ``[.='text']``        | Selects all elements whose complete text content,    |
|                       | including descendants, equals the given ``text``.    |
|                       |                                                      |
|                       | .. versionadded:: 3.7                                |
+-----------------------+------------------------------------------------------+
| ``[.!='text']``       | Selects all elements whose complete text content,    |
|                       | including descendants, does not equal the given      |
|                       | ``text``.                                            |
|                       |                                                      |
|                       | .. versionadded:: 3.10                               |
+-----------------------+------------------------------------------------------+
| ``[tag='text']``      | Selects all elements that have a child named         |
|                       | ``tag`` whose complete text content, including       |
|                       | descendants, equals the given ``text``.              |
+-----------------------+------------------------------------------------------+
| ``[tag!='text']``     | Selects all elements that have a child named         |
|                       | ``tag`` whose complete text content, including       |
|                       | descendants, does not equal the given ``text``.      |
|                       |                                                      |
|                       | .. versionadded:: 3.10                               |
+-----------------------+------------------------------------------------------+
| ``[position]``        | Selects all elements that are located at the given   |
|                       | position.  The position can be either an integer     |
|                       | (1 is the first position), the expression ``last()`` |
|                       | (for the last position), or a position relative to   |
|                       | the last position (e.g. ``last()-1``).               |
+-----------------------+------------------------------------------------------+
```

Predicates (expressions within square brackets) must be preceded by a tag
name, an asterisk, or another predicate.  `position` predicates must be
preceded by a tag name.
