---
title: "LINQ to XML axes overview - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/linq-xml-axes-overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# LINQ to XML axes overview

After you've created an XML tree or loaded an XML document into an XML tree, you can query it to find elements and attributes and retrieve their values. You retrieve collections through the *axis methods*, also called *axes*. Some of the axes are methods in the `System.Xml.Linq.XElement` and `System.Xml.Linq.XDocument` classes that return `System.Collections.Generic.IEnumerable`1` collections. Some of the axes are extension methods in the `System.Xml.Linq.Extensions` class. The axes that are implemented as extension methods operate on collections and return collections.

As described in XElement class overview, an `System.Xml.Linq.XElement` object represents a single element node. The content of an element can be complex (sometimes called structured content), or it can be a simple element. A simple element can be empty or can contain a value. If the node contains structured content, you can use the various axis methods to retrieve enumerations of descendant elements. The most commonly used axis methods are `System.Xml.Linq.XContainer.Elements*` and `System.Xml.Linq.XContainer.Descendants*`.

In addition to the axis methods, which return collections, there are two more methods that you'll commonly use in LINQ to XML queries. The `System.Xml.Linq.XContainer.Element*` method returns a single `System.Xml.Linq.XElement`. The `System.Xml.Linq.XElement.Attribute*` method returns a single `System.Xml.Linq.XAttribute`.

For many purposes, LINQ queries provide the most powerful way to examine a tree, extract data from it, and transform it. LINQ queries operate on objects that implement `System.Collections.Generic.IEnumerable`1`, and the LINQ to XML axes return `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` collections, and `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XAttribute` collections. You need these collections to do your queries.

In addition to the axis methods that retrieve collections of elements and attributes, there are axis methods that allow you to iterate through the tree in great detail. For example, instead of dealing with elements and attributes, you can work with the nodes of the tree. Nodes are a finer level of granularity than elements and attributes. When working with nodes, you can examine XML comments, text nodes, processing instructions, and more. This functionality is important, for example, to someone who is writing a word processor and wants to save documents as XML. However, the majority of XML programmers are primarily concerned with elements, attributes, and their values.

## Methods for retrieving a collection of elements

The following is a summary of the methods of the `System.Xml.Linq.XElement` class (or its base classes) that you call on an `System.Xml.Linq.XElement` to return a collection of elements.

|Method|Description|
|------------|-----------------|
|`System.Xml.Linq.XNode.Ancestors*`|Returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the ancestors of this element. An overload returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the ancestors that have the specified `System.Xml.Linq.XName`.|
|`System.Xml.Linq.XContainer.Descendants*`|Returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the descendants of this element. An overload returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the descendants that have the specified `System.Xml.Linq.XName`.|
|`System.Xml.Linq.XContainer.Elements*`|Returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the child elements of this element. An overload returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the child elements that have the specified `System.Xml.Linq.XName`.|
|`System.Xml.Linq.XNode.ElementsAfterSelf*`|Returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the elements that come after this element. An overload returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the elements after this element that have the specified `System.Xml.Linq.XName`.|
|`System.Xml.Linq.XNode.ElementsBeforeSelf*`|Returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the elements that come before this element. An overload returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the elements before this element that have the specified `System.Xml.Linq.XName`.|
|`System.Xml.Linq.XElement.AncestorsAndSelf*`|Returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of this element and its ancestors. An overload returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the elements that have the specified `System.Xml.Linq.XName`.|
|`System.Xml.Linq.XElement.DescendantsAndSelf*`|Returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of this element and its descendants. An overload returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XElement` of the elements that have the specified `System.Xml.Linq.XName`.|

## Method for retrieving a single element

The following method retrieves a single child from an `System.Xml.Linq.XElement` object.

|Method|Description|
|------------|-----------------|
|`System.Xml.Linq.XContainer.Element*`|Returns the first child `System.Xml.Linq.XElement` object that has the specified `System.Xml.Linq.XName`.|

## Method for retrieving a collection of attributes

The following method retrieves attributes from an `System.Xml.Linq.XElement` object.

|Method|Description|
|------------|-----------------|
|`System.Xml.Linq.XElement.Attributes*`|Returns an `System.Collections.Generic.IEnumerable`1` of `System.Xml.Linq.XAttribute` of all of the attributes.|

## Method for retrieving a single attribute

The following method retrieves a single attribute from an `System.Xml.Linq.XElement` object.

|Method|Description|
|------------|-----------------|
|`System.Xml.Linq.XElement.Attribute*`|Returns the `System.Xml.Linq.XAttribute` that has the specified `System.Xml.Linq.XName`.|
