---
title: "Object and collection initializers (part 2 of 20)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/object-and-collection-initializers.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Object and collection initializers (part 2 of 20)

## Object initializers

Object initializers let you assign values to any accessible fields or properties of an object when you create it. You don't need to invoke a constructor and then use assignment statements. The object initializer syntax enables you to specify arguments for a constructor or omit the arguments and parentheses. For guidance on using object initializers consistently, see Use object initializers (style rule IDE0017). The following example shows how to use an object initializer with a named type, `Cat`, and how to invoke the parameterless constructor. Note the use of automatically implemented properties in the `Cat` class. For more information, see Automatically implemented properties.
