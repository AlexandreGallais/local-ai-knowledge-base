---
title: "Document: evaluate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/evaluate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: evaluate() method

The **`evaluate()`** method of the `Document` interface selects elements based on the XPath
expression given in parameters.

XPath expressions can be evaluated on both HTML and XML documents.

## Syntax

```js
evaluate(xpathExpression, contextNode, namespaceResolver, resultType, result)
```

### Parameters

- `xpathExpression`
    A string representing the _xpath_ to be evaluated.
- `contextNode`
    The _context node_ for the query.
    It's common to pass `document` as the context node.
- `namespaceResolver` (optional)
    A function that will be passed any namespace prefixes
    and should return a string representing the namespace URI associated with that prefix.
    It will be used to resolve prefixes within the _xpath_ itself,
    so that they can be matched with the document.
    The value `null` is common for HTML documents or when no namespace prefixes are used.
    If omitted, it defaults to `null`.
- `resultType` (optional)
    An integer that corresponds to the type of `XPathResult` to return.
    If omitted, it defaults to `ANY_TYPE` (`0`).
    The following values are possible:
    - `ANY_TYPE` (`0`)
        Whatever type naturally results from the given expression.
    - `NUMBER_TYPE` (`1`)
        A result set containing a single number. Useful, for example, in an
        _xpath_ expression using the `count()` function.
    - `STRING_TYPE` (`2`)
        A result set containing a single string.
    - `BOOLEAN_TYPE` (`3`)
        A result set containing a single boolean value. Useful, for example, an
        _xpath_ expression using the `not()` function.
    - `UNORDERED_NODE_ITERATOR_TYPE` (`4`)
        A result set containing all the nodes matching the expression. The nodes
        in the result set are not necessarily in the same order they appear in
        the document.
        > **Note:**
        > Results of this type contain references to nodes in the document.
        > Modifying a node will invalidate the iterator.
        > After modifying a node, attempting to iterate through the results will result in an error.
    - `ORDERED_NODE_ITERATOR_TYPE` (`5`)
        A result set containing all the nodes matching the expression. The nodes
        in the result set are in the same order they appear in the document.
        > **Note:**
        > Results of this type contain references to nodes in the document.
        > Modifying a node will invalidate the iterator.
        > After modifying a node, attempting to iterate through the results will result in an error.
    - `UNORDERED_NODE_SNAPSHOT_TYPE` (`6`)
        A result set containing snapshots of all the nodes matching the
        expression. The nodes in the result set are not necessarily in the same
        order they appear in the document.
        > **Note:**
        > Results of this type are snapshots, which are essentially lists of matched nodes.
        > You can make changes to the document by altering snapshot nodes.
        > Modifying the document doesn't invalidate the snapshot;
        > however, if the document is changed, the snapshot may not correspond to the current state of the document,
        > since nodes may have moved, been changed, added, or removed.
    - `ORDERED_NODE_SNAPSHOT_TYPE` (`7`)
        A result set containing snapshots of all the nodes matching the
        expression. The nodes in the result set are in the same order they
        appear in the document.
        > **Note:**
        > Results of this type are snapshots, which are essentially lists of matched nodes.
        > You can make changes to the document by altering snapshot nodes.
        > Modifying the document doesn't invalidate the snapshot;
        > however, if the document is changed, the snapshot may not correspond to the current state of the document,
        > since nodes may have moved, been changed, added, or removed.
    - `ANY_UNORDERED_NODE_TYPE` (`8`)
        A result set containing any single node that matches the expression. The
        node is not necessarily the first node in the document that matches the
        expression.
    - `FIRST_ORDERED_NODE_TYPE` (`9`)
        A result set containing the first node in the document that matches the
        expression.

- `result` (optional)
    An existing `XPathResult` to use for the results. If set to `null` or omitted, the method will create and return a new `XPathResult`.

### Return value

An `XPathResult` linking to the selected nodes. If `result` was `null`, it is a new object,
if not, it is the same object as the one passed as the `result` parameter.

## Examples

### Finding all H2 headings by XPath

```js
const headings = document.evaluate(
  "/html/body//h2",
  document,
  null,
  XPathResult.ANY_TYPE,
  null,
);
/* Search the document for all h2 elements.
 * The result will likely be an unordered node iterator. */
let thisHeading = headings.iterateNext();
let alertText = "Level 2 headings in this document are:\n";
while (thisHeading) {
  alertText += `${thisHeading.textContent}\n`;
  thisHeading = headings.iterateNext();
}
alert(alertText); // Alerts the text of all h2 elements
```

Note, in the above example, a more verbose _xpath_ is preferred over common shortcuts
such as `//h2`. Generally, more specific _xpath_ selectors, as in the above
example, usually give a significant performance improvement, especially on very large
documents. This is because the evaluation of the query does not waste time
visiting unnecessary nodes. Using // is generally slow as it visits _every_
node from the root and all subnodes looking for possible matches.

Further optimization can be achieved by careful use of the context parameter. For
example, if you know the content you are looking for is somewhere inside the body tag,
you can use this:

```js
document.evaluate(".//h2", document.body, null, XPathResult.ANY_TYPE, null);
```

Notice in the above `document.body` has been used as the context instead of
`document` so the _xpath_ starts from the body element. (In this example, the
`"."` is important to indicate that the querying should start from the
context node, document.body. If the "." was left out (leaving `//h2`) the
query would start from the root node (`html`) which would be more
wasteful.)

See Introduction to using XPath in JavaScript for more information.

### Getting element by xml:id

This function is a replacement for `Document.getElementById()` for when you need to search by `xml:id` instead.

```js
function getElementByIdWrapper(xmlDoc, id) {
  return xmlDoc.evaluate(
    `//*[@xml:id="${id}"]`,
    xmlDoc,
    () => "http://www.w3.org/XML/1998/namespace",
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue;
}
```

## See also

- `Document.createExpression()`
- `XPathResult`
