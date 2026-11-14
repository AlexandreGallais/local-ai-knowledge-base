---
title: "ValueType class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ValueType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueType class

Namespace: `System`

```csharp
public abstract class ValueType
```

Provides the base class for value types.

#### Remarks
`ValueType` overrides the virtual methods from `Object` with more appropriate implementations for value types. See also `Enum`, which inherits from `ValueType`.

Data types are separated into value types and reference types. Value types are either stack-allocated or allocated inline in a structure. Reference types are heap-allocated. Both reference and value types are derived from the ultimate base class `Object`. In cases where it is necessary for a value type to behave like an object, a wrapper that makes the value type look like a reference object is allocated on the heap, and the value type's value is copied into it. The wrapper is marked so the system knows that it contains a value type. This process is known as boxing, and the reverse process is known as unboxing. Boxing and unboxing allow any type to be treated as an object.

Although `ValueType` is the implicit base class for value types, you cannot create a class that inherits from `ValueType` directly. Instead, individual compilers provide a language keyword or construct (such as `struct` in C# and `Structure`…`End Structure` in Visual Basic) to support the creation of value types.

Aside from serving as the base class for value types in .NET, the `ValueType` structure is generally not used directly in code. However, it can be used as a parameter in method calls to restrict possible arguments to value types instead of all objects, or to permit a method to handle a number of different value types. The following example illustrates how `ValueType` prevents reference types from being passed to methods. It defines a class named `Utility` that contains four methods: `IsNumeric`, which indicates whether its argument is a number; `IsInteger`, which indicates whether its argument is an integer; `IsFloat`, which indicates whether its argument is a floating-point number; and `Compare`, which indicates the relationship between two numeric values. In each case, the method parameters are of type `ValueType`, and reference types are prevented from being passed to the methods.

_Code sample not included: ~/snippets/csharp/System/ValueType/Overview/example1.cs._

The following example illustrates calls to the methods of the `Utility` class.

_Code sample not included: ~/snippets/csharp/System/ValueType/Overview/example1.cs._

## ValueType.ValueType() constructor

```csharp
protected ValueType ();
```

Initializes a new instance of the `ValueType` class.

To be added.

## ValueType.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if `obj` and this instance are the same type and represent the same value; otherwise, `false`.

The `Equals` method overrides `Equals` and provides the default implementation of value equality for all value types in .NET.

The default implementation calls `Equals` on each field of the current instance and `obj` and returns `true` if all fields are equal.

.NET 9 and later, the default implementation of `Equals` throws `NotSupportedException` if `InlineArrayAttribute` is applied to the type.

> **Important:**
> Particularly if your value type contains fields that are reference types, you should override the `Equals` method. This can improve performance and enable you to more closely represent the meaning of equality for the type.

#### Notes for the Windows Runtime

When you call the `ValueType.Equals` method on a Windows Runtime structure, it provides the default behavior for value types that don't override `ValueType.Equals`. This is part of the support that .NET provides for the Windows Runtime (see .NET Support for Windows Store Apps and Windows Runtime). Windows Runtime structures can't override `ValueType.Equals`, even if they're written with C# or Visual Basic, because they can't have methods. (In addition, structures in the Windows Runtime itself don't inherit `ValueType`.) However, they appear to have `ValueType.ToString`, `ValueType.Equals`, and `ValueType.GetHashCode` methods when you use them in your C# or Visual Basic code, and .NET provides the default behavior for these methods.

The following example demonstrates how the `ValueType.Equals` method can be overridden by a derived value type.

_Code sample not included: ~/snippets/csharp/System/ValueType/Equals/source.cs._

## ValueType.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer that is the hash code for this instance.

The `ValueType.GetHashCode` method applies to types derived from `ValueType`. One or more fields of the derived type is used to calculate the return value. If you call the derived type's `GetHashCode` method, the return value is not likely to be suitable for use as a key in a hash table. Additionally, if the value of one or more of those fields changes, the return value might become unsuitable for use as a key in a hash table. In either case, consider writing your own implementation of the `ValueType.GetHashCode` method that more closely represents the concept of a hash code for the type.

For more information, see `Object.GetHashCode`, and `Hashtable`.

.NET 9 and later, the default implementation of `ValueType.GetHashCode` throws `NotSupportedException` if `InlineArrayAttribute` is applied to the type.

#### Notes for the Windows Runtime

When you call the `ValueType.GetHashCode` method on a Windows Runtime structure, it provides the default behavior for value types that don't override `ValueType.GetHashCode`. This is part of the support that .NET provides for the Windows Runtime (see .NET Support for Windows Store Apps and Windows Runtime). Windows Runtime structures can't override `ValueType.GetHashCode`, even if they're written with C# or Visual Basic, because they can't have methods. (In addition, structures in the Windows Runtime itself don't inherit `ValueType`.) However, they appear to have `ValueType.ToString`, `ValueType.Equals`, and `ValueType.GetHashCode` methods when you use them in your C# or Visual Basic code, and .NET provides the default behavior for these methods.

The following example demonstrates how the `ValueType.GetHashCode` method can be overridden by a derived value type.

_Code sample not included: ~/snippets/csharp/System/ValueType/Equals/source.cs._

## ValueType.ToString() method

```csharp
public override string? ToString ();
```

Returns the fully qualified type name of this instance.

Returns: The fully qualified type name.

#### Remarks

The `ValueType.ToString` method overrides the `Object.ToString` method and provides the default implementation of the `ToString` method for value types. (Value types are types defined by the `struct` keyword in C#, and by the `Structure`...`End Structure` construct in Visual Basic.) Functionally, however, the implementation is that same as that of `Object.ToString`: the method returns the fully qualified type name.

Value types defined by the `struct` keyword in C# and the `Structure`...`End Structure` construct in Visual Basic <example-value> override the `ValueType.ToString` method to provide a more meaningful string representation of the value type. The following example illustrates the difference. It defines two value types, `EmployeeA` and `EmployeeB`, creates an instance of each, and calls its `ToString` method. Because the `EmployeeA` structure does not override the `ValueType.ToString` method, it displays only the fully qualified type name. The `EmployeeB.ToString` method, on the other hand, provides meaningful information about the object.

_Code sample not included: ~/snippets/csharp/System/ValueType/ToString/ToString2.cs._

Note that, although enumeration types are also value types, they derive from the `Enum` class, which overrides  `ValueType.ToString`.

#### Notes for the Windows Runtime

When you call the `ValueType.ToString` method on a Windows Runtime structure, it provides the default behavior for value types that don't override `ValueType.ToString`. This is part of the support that .NET provides for the Windows Runtime (see .NET Support for Windows Store Apps and Windows Runtime). Windows Runtime structures can't override `ValueType.ToString`, even if they're written with C# or Visual Basic, because they can't have methods. (In addition, structures in the Windows Runtime itself don't inherit `ValueType`.) However, they appear to have `ValueType.ToString`, `ValueType.Equals`, and `ValueType.GetHashCode` methods when you use them in your C# or Visual Basic code, and .NET provides the default behavior for these methods.
