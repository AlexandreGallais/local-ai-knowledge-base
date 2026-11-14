---
title: "Attribute and Namespace Node Navigation Using XPathNavigator"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/attribute-and-namespace-node-navigation-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Attribute and Namespace Node Navigation Using XPathNavigator

The `System.Xml.XPath.XPathNavigator` class provides two sets of navigation methods, the first set, found in the Node Set Navigation Using XPathNavigator topic, are used to navigate *node sets* in an `System.Xml.XPath.XPathDocument` or `System.Xml.XmlDocument` object. The second set, described in this topic, are used to navigate *attribute and namespace nodes* in an `System.Xml.XPath.XPathDocument` or `System.Xml.XmlDocument` object.

## Attribute Node Navigation

 Attributes are properties of an element, not children of an element. This distinction is important, because of the methods of the `System.Xml.XPath.XPathNavigator` class used to navigate sibling, parent, and child nodes.

 For example, the `System.Xml.XPath.XPathNavigator.MoveToPrevious*` and `System.Xml.XPath.XPathNavigator.MoveToNext*` methods are not used to navigate from an element to an attribute or between attributes. Instead, attributes have distinct methods of navigation.

 The following are the attribute navigation methods of the `System.Xml.XPath.XPathNavigator` class.

- `System.Xml.XPath.XPathNavigator.MoveToAttribute*`

- `System.Xml.XPath.XPathNavigator.MoveToFirstAttribute*`

- `System.Xml.XPath.XPathNavigator.MoveToNextAttribute*`

 When the current node is an element, you can use the `System.Xml.XPath.XPathNavigator.HasAttributes` property to see if there are any attributes associated with the element. After it is known that an element has attributes, there are multiple methods for accessing attributes. To retrieve a single attribute from the element, use the `System.Xml.XPath.XPathNavigator.GetAttribute*` method. To move the `System.Xml.XPath.XPathNavigator` to a particular attribute, use the `System.Xml.XPath.XPathNavigator.MoveToAttribute*` method. You can also iterate over each attribute of an element by using the `System.Xml.XPath.XPathNavigator.MoveToFirstAttribute*` method, followed by multiple calls to the `System.Xml.XPath.XPathNavigator.MoveToNextAttribute*` method.

> **Note:**
> When the `System.Xml.XPath.XPathNavigator` object is positioned on an attribute or namespace node, the `System.Xml.XPath.XPathNavigator.MoveToChild*`, `System.Xml.XPath.XPathNavigator.MoveToFirst*`, `System.Xml.XPath.XPathNavigator.MoveToFirstChild*`, `System.Xml.XPath.XPathNavigator.MoveToFollowing*`, `System.Xml.XPath.XPathNavigator.MoveToId*`, `System.Xml.XPath.XPathNavigator.MoveToNext*` and `System.Xml.XPath.XPathNavigator.MoveToPrevious*` methods always return `false`, and have no effect on the position of the `System.Xml.XPath.XPathNavigator`. The exceptions are the `System.Xml.XPath.XPathNavigator.MoveTo*`, `System.Xml.XPath.XPathNavigator.MoveToParent*`, and `System.Xml.XPath.XPathNavigator.MoveToRoot*` methods.

## Namespace Node Navigation

 Each element has an associated set of namespace nodes, one for each distinct namespace prefix that is bound to a namespace URI in scope for the element (including the XML prefix bound to the `http://www.w3.org/XML/1998/namespace` namespace, which is implicitly declared in every XML document) and one for the default namespace if one is in scope for the element. The element is the parent of each of these namespace nodes; however, a namespace node is not a child of its parent element.

 As with attributes, the `System.Xml.XPath.XPathNavigator.MoveToPrevious*` and `System.Xml.XPath.XPathNavigator.MoveToNext*` methods are not used to navigate from an element to a namespace node, or between namespace nodes. Instead, namespace nodes have distinct methods of navigation.

 The following are the namespace navigation methods of the `System.Xml.XPath.XPathNavigator` class.

- `System.Xml.XPath.XPathNavigator.MoveToNamespace*`

- `System.Xml.XPath.XPathNavigator.MoveToFirstNamespace*`

- `System.Xml.XPath.XPathNavigator.MoveToNextNamespace*`

 There is always at least one namespace node in scope for any element in an XML document. This is the namespace node with the prefix `xml` and namespace URI `http://www.w3.org/XML/1998/namespace`. To retrieve a namespace URI in scope given a particular prefix, use the `System.Xml.XPath.XPathNavigator.GetNamespace*` method. To move the `System.Xml.XPath.XPathNavigator` object to a particular namespace node, use the `System.Xml.XPath.XPathNavigator.MoveToNamespace*` method. You can also iterate over each namespace node in scope for an element by using the `System.Xml.XPath.XPathNavigator.MoveToFirstNamespace*` method followed by multiple calls to the `System.Xml.XPath.XPathNavigator.MoveToNextNamespace*` method.

> **Note:**
> When the `System.Xml.XPath.XPathNavigator` object is positioned on an attribute or namespace node, the `System.Xml.XPath.XPathNavigator.MoveToChild*`, `System.Xml.XPath.XPathNavigator.MoveToFirst*`, `System.Xml.XPath.XPathNavigator.MoveToFirstChild*`, `System.Xml.XPath.XPathNavigator.MoveToFollowing*`, `System.Xml.XPath.XPathNavigator.MoveToId*`, `System.Xml.XPath.XPathNavigator.MoveToNext*` and `System.Xml.XPath.XPathNavigator.MoveToPrevious*` methods always return `false`, and have no effect on the position of the `System.Xml.XPath.XPathNavigator`. The exceptions are the `System.Xml.XPath.XPathNavigator.MoveTo*`, `System.Xml.XPath.XPathNavigator.MoveToParent*`, and `System.Xml.XPath.XPathNavigator.MoveToRoot*` methods.

### The XPathNamespaceScope Enumeration

 When navigating namespace nodes the `System.Xml.XPath.XPathNavigator.MoveToFirstNamespace*` and `System.Xml.XPath.XPathNavigator.MoveToNextNamespace*` methods can be called with an `System.Xml.XPath.XPathNamespaceScope` parameter. These methods behave differently than their counterparts called with no parameters. The `System.Xml.XPath.XPathNamespaceScope` enumeration has values of `System.Xml.XPath.XPathNamespaceScope.All`, `System.Xml.XPath.XPathNamespaceScope.ExcludeXml`, or `System.Xml.XPath.XPathNamespaceScope.Local`.

 The following examples show what namespaces are returned by the `System.Xml.XPath.XPathNavigator.MoveToFirstNamespace*` and `System.Xml.XPath.XPathNavigator.MoveToNextNamespace*` methods at various scopes in an XML document.

```xml
<root>
    <element1 xmlns="http://www.contoso.com" xmlns:books="http://www.contoso.com/books">
        <element2 />
    </element1>
</root>
```

 The namespace sequence (the namespace the `System.Xml.XPath.XPathNavigator` is positioned upon after calling the `System.Xml.XPath.XPathNavigator.MoveToFirstNamespace*` method followed by a series of calls to the `System.Xml.XPath.XPathNavigator.MoveToNextNamespace*` method) is as follows.

- When positioned on `element2`: `xmlns:books="http://www.contoso.com/books"`, `xmlns="http://www.contoso.com"`, and `xmlns:xml="http://www.w3.org/XML/1998/namespace"`.

- When positioned on `element1`: `xmlns:books="http://www.contoso.com/books"`, `xmlns="http://www.contoso.com"`, and `xmlns:xml="http://www.w3.org/XML/1998/namespace"`.

- When positioned on `root`: `xmlns:xml="http://www.w3.org/XML/1998/namespace".`

> **Note:**
> The `System.Xml.XPath.XPathNavigator` class returns namespace nodes in reverse document order. Therefore, `System.Xml.XPath.XPathNavigator.MoveToFirstNamespace*` essentially moves to the last namespace node in the current scope.

 The following examples show what namespaces are returned by the `System.Xml.XPath.XPathNavigator.MoveToFirstNamespace*` and `System.Xml.XPath.XPathNavigator.MoveToNextNamespace*` methods with the `System.Xml.XPath.XPathNamespaceScope` enumeration specified at various scopes in an XML document.

```xml
<root xmlns="http://www.contoso.com" xmlns:a="http://www.contoso.com/a" xmlns:b="http://www.contoso.com/b">
    <child1 xmlns="" xmlns:a="urn:a">
        <child2 xmlns:c="urn:c" />
    </child1>
</root>
```

 When positioned on `child2`, the namespace sequence (the namespace the `System.Xml.XPath.XPathNavigator` is positioned upon after calling the `System.Xml.XPath.XPathNavigator.MoveToFirstNamespace*` method followed by a series of calls to the `System.Xml.XPath.XPathNavigator.MoveToNextNamespace*` method) is as follows.

- `System.Xml.XPath.XPathNamespaceScope.All`: `xmlns:c="urn:c"`, `xmlns:a="urn:a"`, `xmlns=""`, `xmlns:b="http://www.contoso.com/b"`, `xmlns:a="http://www.contoso.com/a"`, `xmlns="http://www.contoso.com"`, and `xmlns:xml="http://www.w3.org/XML/1998/namespace"`.

- `System.Xml.XPath.XPathNamespaceScope.ExcludeXml`: `xmlns:c="urn:c"`, `xmlns:a="urn:a"`, `xmlns=""`, `xmlns:b="http://www.contoso.com/b"`, `xmlns:a="http://www.contoso.com/a"`, and `xmlns="http://www.contoso.com"`.

- `System.Xml.XPath.XPathNamespaceScope.Local`: `xmlns:c="urn:c"`.

> **Note:**
> The `System.Xml.XPath.XPathNavigator` class returns namespace nodes in reverse document order. Therefore, `System.Xml.XPath.XPathNavigator.MoveToFirstNamespace*` essentially moves to the last namespace node in the current scope.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Node Set Navigation Using XPathNavigator
- Extract XML Data Using XPathNavigator
- Accessing Strongly Typed XML Data Using XPathNavigator
