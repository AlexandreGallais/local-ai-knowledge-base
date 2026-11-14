---
title: "How to override the ToString method"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/classes-and-structs/how-to-override-the-tostring-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to override the ToString method (C# Programming Guide)

Every class or struct in C# implicitly inherits the `System.Object` class. Therefore, every object in C# gets the `System.Object.ToString*` method, which returns a string representation of that object. For example, all variables of type `int` have a `ToString` method, which enables them to return their contents as a string:

 _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs._

 When you create a custom class or struct, you should override the `System.Object.ToString*` method in order to provide information about your type to client code.

 For information about how to use format strings and other types of custom formatting with the `ToString` method, see Formatting Types.

> **Important:**
> When you decide what information to provide through this method, consider whether your class or struct will ever be used by untrusted code. Be careful to ensure that you do not provide any information that could be exploited by malicious code.

To override the `ToString` method in your class or struct:

1. Declare a `ToString` method with the following modifiers and return type:

    ```csharp
    public override string ToString(){}
    ```

2. Implement the method so that it returns a string.

     The following example returns the name of the class in addition to the data specific to a particular instance of the class.

     _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs._

     You can test the `ToString` method as shown in the following code example:

     _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/csProgGuideInheritance/CS/Inheritance.cs._

## See also

- `System.IFormattable`
- The C# type system
- Strings
- string
- override
- virtual
- Formatting Types
