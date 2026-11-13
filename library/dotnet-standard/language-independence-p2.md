---
title: "Language independence and language-independent components (part 2 of 8)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/language-independence.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Language independence and language-independent components (part 2 of 8)

## CLS compliance rules

This section discusses the rules for creating a CLS-compliant component. For a complete list of rules, see Partition I, Clause 11 of the ECMA-335 Standard: Common Language Infrastructure.

> **Note:**
> The Common Language Specification discusses each rule for CLS compliance as it applies to consumers (developers who are programmatically accessing a component that is CLS-compliant), frameworks (developers who are using a language compiler to create CLS-compliant libraries), and extenders (developers who are creating a tool such as a language compiler or a code parser that creates CLS-compliant components). This article focuses on the rules as they apply to frameworks. Note, though, that some of the rules that apply to extenders may also apply to assemblies that are created using Reflection.Emit.

To design a component that's language independent, you only need to apply the rules for CLS compliance to your component's public interface. Your private implementation does not have to conform to the specification.

> **Important:**
> The rules for CLS compliance apply only to a component's public interface, not to its private implementation.

For example, unsigned integers other than `System.Byte` are not CLS-compliant. Because the `Person` class in the following example exposes an `Age` property of type `System.UInt16`, the following code displays a compiler warning.

```csharp
using System;

[assembly: CLSCompliant(true)]

public class Person
{
   private UInt16 personAge = 0;

   public UInt16 Age
   { get { return personAge; } }
}
// The attempt to compile the example displays the following compiler warning:
//    Public1.cs(10,18): warning CS3003: Type of 'Person.Age' is not CLS-compliant
```

You can make the `Person` class CLS-compliant by changing the type of the `Age` property from `System.UInt16` to `System.Int16`, which is a CLS-compliant, 16-bit signed integer. You don't have to change the type of the private `personAge` field.

```csharp
using System;

[assembly: CLSCompliant(true)]

public class Person
{
   private UInt16 personAge = 0;

   public Int16 Age => (Int16)personAge; 
}
```

A library's public interface consists of the following:

* Definitions of public classes.

* Definitions of the public members of public classes, and definitions of members accessible to derived classes (that is, protected members).

* Parameters and return types of public methods of public classes, and parameters and return types of methods accessible to derived classes.

The rules for CLS compliance are listed in the following table. The text of the rules is taken verbatim from the ECMA-335 Standard: Common Language Infrastructure, which is Copyright 2012 by Ecma International. More detailed information about these rules is found in the following sections.

Category | See | Rule | Rule Number
-------- | --- | ---- | -----------
Accessibility | Member accessibility | Accessibility shall not be changed when overriding inherited methods, except when overriding a method inherited from a different assembly with accessibility `family-or-assembly`. In this case, the override shall have accessibility `family`. | 10
Accessibility | Member accessibility | The visibility and accessibility of types and members shall be such that types in the signature of any member shall be visible and accessible whenever the member itself is visible and accessible. For example, a public method that is visible outside its assembly shall not have an argument whose type is visible only within the assembly. The visibility and accessibility of types composing an instantiated generic type used in the signature of any member shall be visible and accessible whenever the member itself is visible and accessible. For example, an instantiated generic type present in the signature of a member that is visible outside its assembly shall not have a generic argument whose type is visible only within the assembly. | 12
Arrays | Arrays | Arrays shall have elements with a CLS-compliant type, and all dimensions of the array shall have lower bounds of zero. Only the fact that an item is an array and the element type of the array shall be required to distinguish between overloads. When overloading is based on two or more array types, the element types shall be named types. | 16
Attributes | Attributes | Attributes shall be of type `System.Attribute`, or a type inheriting from it.| 41
Attributes | Attributes|The CLS only allows a subset of the encodings of custom attributes. The only types that shall appear in these encodings are (see Partition IV): `System.Type`, `System.String`, `System.Char`, `System.Boolean`, `System.Byte`, `System.Int16`, `System.Int32`, `System.Int64`, `System.Single`, `System.Double`, and any enumeration type based on a CLS-compliant base integer type. | 34
Attributes | Attributes | The CLS does not allow publicly visible required modifiers (`modreq`, see Partition II), but does allow optional modifiers (`modopt`, see Partition II) it does not understand. | 35
Constructors | Constructors | An object constructor shall call some instance constructor of its base class before any access occurs to inherited instance data. (This does not apply to value types, which need not have constructors.)  | 21
Constructors | Constructors | An object constructor shall not be called except as part of the creation of an object, and an object shall not be initialized twice. | 22
Enumerations | Enumerations | The underlying type of an enum shall be a built-in CLS integer type, the name of the field shall be "value__", and that field shall be marked `RTSpecialName`. |  7
Enumerations | Enumerations | There are two distinct kinds of enums, indicated by the presence or absence of the `System.FlagsAttribute` (see Partition IV Library) custom attribute. One represents named integer values; the other represents named bit flags that can be combined to generate an unnamed value. The value of an `enum` is not limited to the specified values. |  8
Enumerations | Enumerations | Literal static fields of an enum shall have the type of the enum itself. |  9
Events | Events | The methods that implement an event shall be marked `SpecialName` in the metadata. |29
Events | Events | The accessibility of an event and of its accessors shall be identical. |30
Events | Events | The `add` and `remove` methods for an event shall both either be present or absent. |31
Events | Events | The `add` and `remove` methods for an event shall each take one parameter whose type defines the type of the event and that shall be derived from System.Delegate. |32
Events | Events | Events shall adhere to a specific naming pattern. The SpecialName attribute referred to in CLS rule 29 shall be ignored in appropriate name comparisons and shall adhere to identifier rules.  |33
Exceptions | Exceptions | Objects that are thrown shall be of type System.Exception or a type inheriting from it. Nonetheless, CLS-compliant methods are not required to block the propagation of other types of exceptions. | 40
General | CLS compliance rules | CLS rules apply only to those parts of a type that are accessible or visible outside of the defining assembly. | 1
General | CLS compliance rules | Members of non-CLS compliant types shall not be marked CLS-compliant. | 2
Generics | Generic types and members | Nested types shall have at least as many generic parameters as the enclosing type. Generic parameters in a nested type correspond by position to the generic parameters in its enclosing type.  | 42
Generics | Generic types and members | The name of a generic type shall encode the number of type parameters declared on the non-nested type, or newly introduced to the type if nested, according to the rules defined above. | 43
Generics | Generic types and members | A generic type shall redeclare sufficient constraints to guarantee that any constraints on the base type, or interfaces would be satisfied by the generic type constraints. | 44
Generics | Generic types and members | Types used as constraints on generic parameters shall themselves be CLS-compliant. | 45
Generics | Generic types and members | The visibility and accessibility of members (including nested types) in an instantiated generic type shall be considered to be scoped to the specific instantiation rather than the generic type declaration as a whole. Assuming this, the visibility and accessibility rules of CLS rule 12 still apply. | 46
Generics | Generic types and members | For each abstract or virtual generic method, there shall be a default concrete (nonabstract) implementation | 47
Interfaces | Interfaces | CLS-compliant interfaces shall not require the definition of non-CLS compliant methods in order to implement them. | 18
Interfaces | Interfaces | CLS-compliant interfaces shall not define static methods, nor shall they define fields. | 19
Members | Type members in general | Global static fields and methods are not CLS-compliant. | 36
Members | -- | The value of a literal static is specified by using field initialization metadata. A CLS-compliant literal must have a value specified in field initialization metadata that is of exactly the same type as the literal (or of the underlying type, if that literal is an `enum`). | 13
Members | Type members in general | The vararg constraint is not part of the CLS, and the only calling convention supported by the CLS is the standard managed calling convention. | 15
Naming conventions | Naming conventions | Assemblies shall follow Annex 7 of Technical Report 15 of the Unicode Standard3.0 governing the set of characters permitted to start and be included in identifiers, available online at Unicode Normalization Forms. Identifiers shall be in the canonical format defined by Unicode Normalization Form C. For CLS purposes, two identifiers are the same if their lowercase mappings (as specified by the Unicode locale-insensitive, one-to-one lowercase mappings) are the same. That is, for two identifiers to be considered different under the CLS they shall differ in more than simply their case. However, in order to override an inherited definition the CLI requires the precise encoding of the original declaration be used. | 4
Overloading | Naming conventions | All names introduced in a CLS-compliant scope shall be distinct independent of kind, except where the names are identical and resolved via overloading. That is, while the CTS allows a single type to use the same name for a method and a field, the CLS does not. | 5
Overloading | Naming conventions | Fields and nested types shall be distinct by identifier comparison alone, even though the CTS allows distinct signatures to be distinguished. Methods, properties, and events that have the same name (by identifier comparison) shall differ by more than just the return type, except as specified in CLS Rule 39 | 6
Overloading | Overloads | Only properties and methods can be overloaded. | 37
Overloading | Overloads |Properties and methods can be overloaded based only on the number and types of their parameters, except the conversion operators named `op_Implicit` and `op_Explicit`, which can also be overloaded based on their return type. | 38
Overloading | -- | If two or more CLS-compliant methods declared in a type have the same name and, for a specific set of type instantiations, they have the same parameter and return types, then all these methods shall be semantically equivalent at those type instantiations. | 48
Properties | Properties | The methods that implement the getter and setter methods of a property shall be marked `SpecialName` in the metadata. | 24
Properties | Properties | A property's accessors shall all be static, all be virtual, or all be instance. | 26
Properties | Properties | The type of a property shall be the return type of the getter and the type of the last argument of the setter. The types of the parameters of the property shall be the types of the parameters to the getter and the types of all but the final parameter of the setter. All of these types shall be CLS-compliant, and shall not be managed pointers (that is, shall not be passed by reference). | 27
Properties | Properties | Properties shall adhere to a specific naming pattern. The `SpecialName` attribute referred to in CLS rule 24 shall be ignored in appropriate name comparisons and shall adhere to identifier rules. A property shall have a getter method, a setter method, or both. | 28
Type conversion | Type conversion | If either op_Implicit or op_Explicit is provided, an alternate means of providing the coercion shall be provided. | 39
Types | Types and type member signatures | Boxed value types are not CLS-compliant. | 3
Types | Types and type member signatures | All types appearing in a signature shall be CLS-compliant. All types composing an instantiated generic type shall be CLS-compliant. | 11
Types | Types and type member signatures | Typed references are not CLS-compliant. | 14
Types | Types and type member signatures | Unmanaged pointer types are not CLS-compliant. | 17
Types | Types and type member signatures | CLS-compliant classes, value types, and interfaces shall not require the implementation of non-CLS-compliant members | 20
Types | Types and type member signatures | System.Object is CLS-compliant. Any other CLS-compliant class shall inherit from a CLS-compliant class. | 23

Index to subsections:

* Types and type member signatures
* Naming conventions
* Type conversion
* Arrays
* Interfaces
* Enumerations
* Type members in general
* Member accessibility
* Generic types and members
* Constructors
* Properties
* Events
* Overloads
* Exceptions
* Attributes
