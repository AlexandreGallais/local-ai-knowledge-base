---
title: "Object class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Object.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Object class (part 2 of 5)

## Object.Equals(Object) method

```csharp
public virtual bool Equals (object? obj);
```

Determines whether the specified object is equal to the current object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified object  is equal to the current object; otherwise, `false`.

This article pertains to the `Equals` method.

The type of comparison between the current instance and the `obj` parameter depends on whether the current instance is a reference type or a value type.

- If the current instance is a reference type, the `Equals` method tests for reference equality, and a call to the `Equals` method is equivalent to a call to the `Object.ReferenceEquals` method. Reference equality means that the object variables that are compared refer to the same object. The following example illustrates the result of such a comparison. It defines a reference type and creates two instances, `person1a` and `person2`, that have the same value. It also assigns `person1a` to another object variable, `person1b`. As the output from the example shows, `person1a` and `person1b` are equal because they reference the same object. However, `person1a` and `person2` are not equal, although they have the same value.

_Code sample not included: ~/snippets/csharp/System/Object/Equals/equals_ref.cs._

- If the current instance is a value type, the `Equals` method tests for value equality. Value equality means the following:

- The two objects are of the same type. As the following example shows, a `Byte` object that has a value of 12 does not equal an `Int32` object that has a value of 12, because the two objects have different runtime types.

_Code sample not included: ~/snippets/csharp/System/Object/Equals/equals_val1.cs._

- The values of the public and private fields of the two objects are equal. The following example tests for value equality. It defines a value type and creates two values, `person1` and `person2`, that have the same value for `personName`. As the output from the example shows, `person1` and `person2` are equal because they have the same value.

_Code sample not included: ~/snippets/csharp/System/Object/Equals/equals_val2.cs._

Because the `Object` class is the base class for all types in .NET, the `Equals` method provides the default equality comparison for all other types. However, types often override the `Object.Equals` method to implement value equality. For more information, see the Notes for Callers and Notes for Inheritors sections.

#### Notes for the Windows Runtime

When you call the `Equals` method overload on a class in the Windows Runtime, it provides the default behavior for classes that don't override `Equals`. This is part of the support that .NET provides for the Windows Runtime (see .NET Support for Windows Store Apps and Windows Runtime). Classes in the Windows Runtime don't inherit `Object`, and currently don't implement an `Equals` method. However, they appear to have `Object.ToString`, `Equals`, and `Object.GetHashCode` methods when you use them in your C# or Visual Basic code, and .NET provides the default behavior for these methods.

> **Note:**
> Windows Runtime classes that are written in C# or Visual Basic can override the `Equals` method overload.

#### Notes for callers

Derived classes frequently override the `Equals` method to implement value equality. In addition, types also frequently provide an additional strongly typed overload to the `Equals` method, typically by implementing the `IEquatable<T>` interface. When you call the `Equals` method to test for equality, you should know whether the current instance overrides `Object.Equals` and understand how a particular call to an `Equals` method is resolved. Otherwise, you may be performing a test for equality that is different from what you intended, and the method may return an unexpected value.

The following example provides an illustration. It instantiates three `StringBuilder` objects with identical strings, and then makes four calls to `Equals` methods. The first method call returns `true`, and the remaining three return `false`.

_Code sample not included: ~/snippets/csharp/System/Object/Equals/equalssb1.cs._

In the first case, the strongly typed `Equals` method overload, which tests for value equality, is called. Because the strings assigned to the two `StringBuilder` objects are equal, the method returns `true`. However, `StringBuilder` does not override `Equals`. Because of this, when the `StringBuilder` object is cast to an `Object`, when a `StringBuilder` instance is assigned to a variable of type `Object`, and when the `Equals` method is passed two `StringBuilder` objects, the default `Equals` method is called. Because `StringBuilder` is a reference type, this is equivalent to passing the two `StringBuilder` objects to the `Object.ReferenceEquals` method. Although all three `StringBuilder` objects contain identical strings, they refer to three distinct objects. As a result, these three method calls return `false`.

You can compare the current object to another object for reference equality by calling the `Object.ReferenceEquals` method. In Visual Basic, you can also use the `is` keyword (for example, `If Me Is otherObject Then ...`).

#### Notes for inheritors

When you define your own type, that type inherits the functionality defined by the `Equals` method of its base type. The following table lists the default implementation of the `Equals` method for the major categories of types in .NET.

|Type category|Equality defined by|Comments|
|-------------------|-------------------------|--------------|
|Class derived directly from `Object`|`Equals`|Reference equality; equivalent to calling `Object.ReferenceEquals`.|
|Structure|`ValueType.Equals`|Value equality; either direct byte-by-byte comparison or field-by-field comparison using reflection.|
|Enumeration|`Enum.Equals`|Values must have the same enumeration type and the same underlying value.|
|Delegate|`MulticastDelegate.Equals`|Delegates must have the same type with identical invocation lists.|
|Interface|`Equals`|Reference equality.|

For a value type, you should always override `Object.Equals`, because tests for equality that rely on reflection offer poor performance. You can also override the default implementation of `Object.Equals` for reference types to test for value equality instead of reference equality and to define the precise meaning of value equality. Such implementations of `Object.Equals` return `true` if the two objects have the same value, even if they are not the same instance. The type's implementer decides what constitutes an object's value, but it is typically some or all the data stored in the instance variables of the object. For example, the value of a `String` object is based on the characters of the string; the `Equals` method overrides the `Equals` method to return `true` for any two string instances that contain the same characters in the same order.

The following example shows how to override the `Equals` method to test for value equality. It overrides the `Object.Equals` method for a person type. If the type used its base class implementation of equality, two instances would be equal only if they referenced a single object. In this example, two instances are equal if they have the same identifier value.

_Code sample not included: ~/snippets/csharp/System/Object/Equals/equalsoverride.cs._

In addition to overriding `Object.Equals`, you can implement the `IEquatable<T>` interface to provide a strongly typed test for equality.

The following statements must be true for all implementations of the `Equals` method. In the list, `x`, `y`, and `z` represent object references that are not **null**.

- `x.Equals(x)` returns `true`.

- `x.Equals(y)` returns the same value as `y.Equals(x)`.

- `x.Equals(y)` returns `true` if both `x` and `y` are `NaN`.

- If `(x.Equals(y) && y.Equals(z))` returns `true`, then `x.Equals(z)` returns `true`.

- Successive calls to `x.Equals(y)` return the same value as long as the objects referenced by `x` and `y` are not modified.

- `x.Equals(null)` returns `false`.

Implementations of `Object.Equals` must not throw exceptions; they should always return a value. For example, if `obj` is `null`, the `Object.Equals` method should return `false` instead of throwing an `ArgumentNullException`.

Follow these guidelines when overriding `Equals`:

- Types that implement `IComparable` must override `Equals`.

- Types that override `Equals` must also override `Object.GetHashCode`; otherwise, hash tables  might not work correctly.

- You should consider implementing the `IEquatable<T>` interface to support strongly typed tests for equality. Your `IEquatable<T>.Equals` implementation should return results that are consistent with `Object.Equals`.

- If your programming language supports operator overloading and you overload the equality operator for a given type, you must also override the `Equals` method to return the same result as the equality operator. This  helps ensure that class library code that uses `Object.Equals` (such as `ArrayList` and `Hashtable`) behaves in a manner that is consistent with the way the equality operator is used by application code.

#### Guidelines for reference types

The following guidelines apply to overriding `Equals` for a reference type:

- Consider overriding `Object.Equals` if the semantics of the type are based on the fact that the type represents some value(s).

- Most reference types must not overload the equality operator, even if they override `Object.Equals`. However, if you are implementing a reference type that is intended to have value semantics, such as a complex number type, you must override the equality operator.

- You should not override `Object.Equals` on a mutable reference type. This is because overriding `Object.Equals` requires that you also override the `Object.GetHashCode` method, as discussed in the previous section. This means that the hash code of an instance of a mutable reference type can change during its lifetime, which can cause the object to be lost in a hash table.

#### Guidelines for value types

The following guidelines apply to overriding `Equals` for a value type:

- If you are defining a value type that includes one or more fields whose values are reference types, you should override `Equals`. The `Equals` implementation provided by `ValueType` performs a byte-by-byte comparison for value types whose fields are all value types, but it uses reflection to perform a field-by-field comparison of value types whose fields include reference types.

- If you override `Object.Equals` and your development language supports operator overloading, you must overload the equality operator.

- You should implement the `IEquatable<T>` interface. Calling the strongly typed `IEquatable<T>.Equals` method avoids boxing the `obj` argument.

#### Examples

The following examples show a base point type that overrides the `Object.Equals` method to provide value equality, and a derived 3D point type. Because the base type overrides `Equals` to test for value equality, the default `Equals` implementation is not called. The derived type's `Equals` method calls the base type's `Equals` method to compare the coordinates defined by the base type.

_Code sample not included: ~/snippets/csharp/System/Object/Equals/equals2.cs._

The base point type's `Equals` method checks that the `obj` argument is compatible with the type and compares the x-coordinate and y-coordinate. The C# and Visual Basic <example-value> also check that both objects have the same runtime type.

The `Point3D.Equals` method first checks that `obj` is a `Point3D` instance. It then calls the base point type's `Equals` method to compare the x-coordinate and y-coordinate. Only if that method returns `true` does `Point3D.Equals` compare the z-coordinate.

The following example defines a `Rectangle` class that internally implements a rectangle as two `Point` objects. The `Rectangle` class also overrides `Equals` to provide for value equality.

_Code sample not included: ~/snippets/csharp/System/Object/Equals/equals3.cs._

Some languages such as C# and Visual Basic <example-value> operator overloading. When a type overloads the equality operator, it must also override the `Equals` method to provide the same functionality. This is typically accomplished by writing the `Equals` method in terms of the overloaded equality operator, as in the following example.

_Code sample not included: ~/snippets/csharp/System/Object/Equals/equals4.cs._

Because `Complex` is a value type, it cannot be derived from. Therefore, the override to `Equals` method need not call `Object.GetType` to determine the precise runtime type of each object, but can instead use the `is` operator in C# or the `TypeOf` operator in Visual Basic to check the type of the `obj` parameter.

## Object.Equals(Object, Object) method

```csharp
public static bool Equals (object? objA, object? objB);
```

Determines whether the specified object instances are considered equal.

Parameters:

- `objA`: The first object to compare.
- `objB`: The second object to compare.

Returns: `true` if the objects are considered equal; otherwise, `false`. If both `objA` and `objB` are **null**, the method returns `true`.

#### Remarks
The static `Equals` method indicates whether two objects, `objA` and  `objB`, are equal. It also enables you to test objects whose value is **null** for equality. It compares `objA` and `objB` for equality as follows:

- It determines whether the two objects represent the same object reference. If they do, the method returns `true`. This test is equivalent to calling the `Object.ReferenceEquals` method. In addition, if both `objA` and `objB` are **null**, the method returns `true`.

- It determines whether either `objA` or `objB` is **null**. If so, it returns `false`.

- If the two objects do not represent the same object reference and neither is **null**, it calls `objA`.`Equals`(`objB`) and returns the result. This means that if `objA` overrides the `Equals` method, this override is called.

#### Examples
The following example illustrates the `Equals` method and compares it with the `Object.ReferenceEquals` method.

_Code sample not included: ~/snippets/csharp/System/Object/Equals/equals_static2.cs._
