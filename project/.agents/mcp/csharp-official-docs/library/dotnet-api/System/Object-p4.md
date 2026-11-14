---
title: "Object class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Object.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Object class (part 4 of 5)

## Object.GetType() method

```csharp
public Type GetType ();
```

Gets the `Type` of the current instance.

Returns: The exact runtime type of the current instance.

#### Remarks
Because `Object` is the base class for all types in the .NET type system, the `Object.GetType` method can be used to return `Type` objects that represent all .NET types. .NET recognizes the following five categories of types:

- Classes, which are derived from `Object`.
- Value types, which are derived from `ValueType`.
- Interfaces, which are derived from `Object`.
- Enumerations, which are derived from `Enum`.
- Delegates, which are derived from `MulticastDelegate`.

For two objects `x` and `y` that have identical runtime types, `Object.ReferenceEquals(x.GetType(),y.GetType())` returns `true`. The following example uses the `Object.GetType` method with the `Object.ReferenceEquals` method to determine whether one numeric value is the same type as two other numeric values.

_Code sample not included: ~/snippets/csharp/System/Object/GetType/gettype1.cs._

> **Note:**
>  To determine whether an object is a specific type, you can use your language's type comparison keyword or construct. For example, you can use the `TypeOf…Is` construct in Visual Basic or the `is` keyword in C#.

The `Object.GetType` method is inherited by all types that derive from `Object`. This means that, in addition to using your own language's comparison keyword, you can use the `Object.GetType` method to determine the type of a particular object, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Object/GetType/GetTypeEx2.cs._

The `Type` object exposes the metadata associated with the class of the current `Object`.

#### Examples

The following code example demonstrates that `Object.GetType` returns the runtime type of the current instance.

_Code sample not included: ~/snippets/csharp/System/Object/GetType/gettype.cs._

## Object.MemberwiseClone() method

```csharp
protected object MemberwiseClone ();
```

Creates a shallow copy of the current `Object`.

Returns: A shallow copy of the current `Object`.

#### Remarks
The `Object.MemberwiseClone` method creates a shallow copy by creating a new object, and then copying the nonstatic fields of the current object to the new object. If a field is a value type, a bit-by-bit copy of the field is performed. If a field is a reference type, the reference is copied but the referred object is not; therefore, the original object and its clone refer to the same object.

To illustrate the difference between a shallow and a deep copy operation, consider an object called X that references objects A and B. Object B, in turn, references object C. A shallow copy of X creates new object X2 that also references objects A and B. In contrast, a deep copy of X creates a new object X2 that references the new objects A2 and B2, which are copies of A and B. B2, in turn, references the new object C2, which is a copy of C.

There are numerous ways to implement a deep copy operation if the shallow copy operation performed by the `Object.MemberwiseClone` method doesn't meet your needs. These include the following:

- Call a class constructor of the object to be copied to create a second object with property values taken from the first object. This assumes that the values of an object are entirely defined by its class constructor.
- Call the `Object.MemberwiseClone` method to create a shallow copy of an object, and then assign new objects whose values are the same as the original object to any properties or fields whose values are reference types. The `DeepCopy` method in the example illustrates this approach.
- Serialize the object to be deep copied, and then restore the serialized data to a different object variable.
- Use reflection with recursion to perform the deep copy operation.

#### Examples
The following example illustrates the `Object.MemberwiseClone` method. It defines a `ShallowCopy` method that calls the `Object.MemberwiseClone` method to perform a shallow copy operation on a `Person` object. It also defines a `DeepCopy` method that performs a deep copy operation on a `Person` object.

_Code sample not included: ~/snippets/csharp/System/Object/MemberwiseClone/memberwiseclone1.cs._

In this example, the `Person.IdInfo` property returns an `IdInfo` object. As the output from the example shows, when a `Person` object is cloned by calling the `Object.MemberwiseClone` method, the cloned `Person` object is an independent copy of the original object, except that they share the same `Person.IdInfo` object reference. As a result, modifying the clone's `Person.IdInfo` property changes the original object's `Person.IdInfo` property. On the other hand, when a deep copy operation is performed, the cloned `Person` object, including its `Person.IdInfo` property, can be modified without affecting the original object.

## Object.ReferenceEquals(Object, Object) method

```csharp
public static bool ReferenceEquals (object? objA, object? objB);
```

Determines whether the specified `Object` instances are the same instance.

Parameters:

- `objA`: The first object to compare.
- `objB`: The second object  to compare.

Returns: `true` if `objA` is the same instance as `objB` or if both are **null**; otherwise, `false`.

#### Remarks
Unlike the `Object.Equals` method and the equality operator, the `Object.ReferenceEquals` method cannot be overridden. Because of this, if you want to test two object references for equality and you are unsure about the implementation of the `Equals` method, you can call the `Object.ReferenceEquals` method.

However, the return value of the `Object.ReferenceEquals` method may appear to be anomalous in these two scenarios:

- When comparing value types. If `objA` and `objB` are value types, they are boxed before they are passed to the `Object.ReferenceEquals` method. This means that if both `objA` and `objB` represent the same instance of a value type, the `Object.ReferenceEquals` method nevertheless returns `false`, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Object/ReferenceEquals/referenceequals4.cs._

For information on boxing value types, see Boxing and Unboxing.

- When comparing strings. If `objA` and `objB` are strings, the `Object.ReferenceEquals` method returns `true` if the string is interned. It does not perform a test for value equality.  In the following example, `s1` and `s2` are equal because they are two instances of a single interned string. However, `s3` and `s4` are not equal, because although they have identical string values, that string is not interned.

_Code sample not included: ~/snippets/csharp/System/Object/ReferenceEquals/referenceequalsa.cs._

For more information about string interning, see `String.IsInterned`.

#### Examples

The following example uses `Object.ReferenceEquals` to determine if two objects are the same instance.

_Code sample not included: ~/snippets/csharp/System/Object/ReferenceEquals/referenceequals.cs._
