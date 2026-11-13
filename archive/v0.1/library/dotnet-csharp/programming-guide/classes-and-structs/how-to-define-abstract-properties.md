---
title: "How to define abstract properties (part 1 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/how-to-define-abstract-properties.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to define abstract properties (C# Programming Guide)

The following example shows how to define abstract properties. An abstract property declaration does not provide an implementation of the property accessors -- it declares that the class supports properties, but leaves the accessor implementation to derived classes. The following example demonstrates how to implement the abstract properties inherited from a base class.

 This sample consists of three files, each of which is compiled individually and its resulting assembly is referenced by the next compilation:

- abstractshape.cs: the `Shape` class that contains an abstract `Area` property.

- shapes.cs: The subclasses of the `Shape` class.

- shapetest.cs: A test program to display the areas of some `Shape`-derived objects.

 To compile the example, use the following command:

 `csc abstractshape.cs shapes.cs shapetest.cs`

 This will create the executable file shapetest.exe.
