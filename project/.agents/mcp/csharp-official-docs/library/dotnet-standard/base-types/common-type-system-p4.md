---
title: "Common Type System (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/common-type-system.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Common Type System (part 4 of 4)

## Characteristics of type members

The common type system allows type members to have a variety of characteristics; however, languages are not required to support all these characteristics. The following table describes member characteristics.

|Characteristic|Can apply to|Description|
|--------------------|------------------|-----------------|
|abstract|Methods, properties, and events|The type does not supply the method's implementation. Types that inherit or implement abstract methods must supply an implementation for the method. The only exception is when the derived type is itself an abstract type. All abstract methods are virtual.|
|private, family, assembly, family and assembly, family or assembly, or public|All|Defines the accessibility of the member: private Accessible only from within the same type as the member, or within a nested type. family Accessible from within the same type as the member, and from derived types that inherit from it. assembly Accessible only in the assembly in which the type is defined. family and assembly Accessible only from types that qualify for both family and assembly access. family or assembly Accessible only from types that qualify for either family or assembly access. public Accessible from any type.|
|final|Methods, properties, and events|The virtual method cannot be overridden in a derived type.|
|initialize-only|Fields|The value can only be initialized, and cannot be written after initialization.|
|instance|Fields, methods, properties, and events|If a member is not marked as `static` (C# and C++), `Shared` (Visual Basic), `virtual` (C# and C++), or `Overridable` (Visual Basic), it is an instance member (there is no instance keyword). There will be as many copies of such members in memory as there are objects that use it.|
|literal|Fields|The value assigned to the field is a fixed value, known at compile time, of a built-in value type. Literal fields are sometimes referred to as constants.|
|newslot or override|All|Defines how the member interacts with inherited members that have the same signature: newslot Hides inherited members that have the same signature. override Replaces the definition of an inherited virtual method. The default is newslot.|
|static|Fields, methods, properties, and events|The member belongs to the type it is defined on, not to a particular instance of the type; the member exists even if an instance of the type is not created, and it is shared among all instances of the type.|
|virtual|Methods, properties, and events|The method can be implemented by a derived type and can be invoked either statically or dynamically. If dynamic invocation is used, the type of the instance that makes the call at runtime (rather than the type known at compile time) determines which implementation of the method is called. To invoke a virtual method statically, the variable might have to be cast to a type that uses the desired version of the method.|

### Overloading

Each type member has a unique signature. Method signatures consist of the method name and a parameter list (the order and types of the method's arguments). Multiple methods with the same name can be defined within a type as long as their signatures differ. When two or more methods with the same name are defined, the method is said to be overloaded. For example, in `System.Char`, the `System.Char.IsDigit*` method is overloaded. One method takes a `System.Char`. The other method takes a `System.String` and an `System.Int32`.

> **Note:**
> The return type is not considered part of a method's signature. That is, methods cannot be overloaded if they differ only by return type.

### Inherit, override, and hide members

A derived type inherits all members of its base type; that is, these members are defined on, and available to, the derived type. The behavior or qualities of inherited members can be modified in two ways:

- A derived type can hide an inherited member by defining a new member with the same signature. This might be done to make a previously public member private or to define new behavior for an inherited method that is marked as `sealed`.

- A derived type can override an inherited virtual method. The overriding method provides a new definition of the method that will be invoked based on the type of the value at runtime rather than the type of the variable known at compile time. A method can override a virtual method only if the virtual method is not marked as `sealed` and the new method is at least as accessible as the virtual method.

## See also

- .NET API Browser
- Common Language Runtime
- Type Conversion in .NET
