---
title: "How to list all nodes in a tree - LINQ to XML (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/list-all-nodes-tree.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to list all nodes in a tree (LINQ to XML)

Sometimes, it's helpful to list all nodes in a tree – for example, to learn exactly how a method or property affects the tree. The following example for C# and Visual Basic lists the nodes of a tree. Each node is represented by an XPath expression that specifies the location of the node in the tree.

> **Note:**
> It's not particularly helpful to execute XPath expressions using LINQ to XML. LINQ to XML queries perform better than XPath expressions and are much more powerful. However, as a way to identify nodes in the XML tree, XPath works well.
