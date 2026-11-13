---
title: "How to write a LINQ to XML axis method - LINQ to XML (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/write-linq-xml-axis-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to write a LINQ to XML axis method (LINQ to XML)

An XML axis method retrieves a collection of XML elements from an XML document or ancestor element. You can write your own axis methods to retrieve collections from an XML tree. One of the best ways to do this is to write an extension method that returns a collection of elements or attributes. You can write your extension method to return specific subsets of elements or attributes, based on the requirements of your application. This article provides an example for C# and Visual Basic.
