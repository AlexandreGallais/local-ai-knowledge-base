---
title: "How to define abstract properties"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/classes-and-structs/how-to-define-abstract-properties.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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

## Examples

 This file declares the `Shape` class that contains the `Area` property of the type `double`.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs._

- Modifiers on the property are placed on the property declaration itself. For example:

    ```csharp
    public abstract double Area  
    ```  

- When declaring an abstract property (such as `Area` in this example), you simply indicate what property accessors are available, but do not implement them. In this example, only a get accessor is available, so the property is read-only.

 The following code shows three subclasses of `Shape` and how they override the `Area` property to provide their own implementation.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs._

 The following code shows a test program that creates a number of `Shape`-derived objects and prints out their areas.

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs._

## See also

- The C# type system
- Abstract and Sealed Classes and Class Members
- Properties
