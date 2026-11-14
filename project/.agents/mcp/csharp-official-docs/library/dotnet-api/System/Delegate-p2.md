---
title: "Delegate class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Delegate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Delegate class (part 2 of 7)

#### Determine the methods a delegate can represent

Another useful way to think of the flexibility provided by the `CreateDelegate` overload is that any given delegate can represent four different combinations of method signature and method kind (static versus instance). Consider a delegate type `D` with one argument of type `C`. The following describes the methods `D` can represent, ignoring the return type since it must match in all cases:

- `D` can represent any instance method that has exactly one argument of type `C`, regardless of what type the instance method belongs to. When `Delegate.CreateDelegate` is called, `firstArgument` is an instance of the type `method` belongs to, and the resulting delegate is said to be closed over that instance. (Trivially, `D` can also be closed over a null reference if `firstArgument` is a null reference.)

- `D` can represent an instance method of `C` that has no arguments. When `Delegate.CreateDelegate` is called, `firstArgument` is a null reference. The resulting delegate represents an open instance method, and an instance of `C` must be supplied each time it is invoked.

- `D` can represent a static method that takes one argument of type `C`, and that method can belong to any type. When `Delegate.CreateDelegate` is called, `firstArgument` is a null reference. The resulting delegate represents an open static method, and an instance of `C` must be supplied each time it is invoked.

- `D` can represent a static method that belongs to type `F` and has two arguments, of type `F` and type `C`. When `Delegate.CreateDelegate` is called, `firstArgument` is an instance of `F`. The resulting delegate represents a static method that is closed over that instance of `F`. Note that in the case where `F` and `C` are the same type, the static method has two arguments of that type. (In this case, `D` is closed over a null reference if `firstArgument` is a null reference.)

## Delegate.Delegate(Object, String) constructor

```csharp
protected Delegate (object target, string method);
```

Initializes a delegate that invokes the specified instance method on the specified class instance.

Parameters:

- `target`: The class instance on which the delegate invokes `method`.
- `method`: The name of the instance method that the delegate represents.

Exceptions:

- `ArgumentNullException`: `target` is `null`.

-or-

`method` is `null`.
- `ArgumentException`: There was an error binding to the target method.

#### Remarks
This constructor cannot be used in application code. To create a delegate by specifying the name of an instance method, use an overload of the `Delegate.CreateDelegate` method that specifies a method name and a target object. For example, the `CreateDelegate` method overload creates a delegate for an instance method with a specified name.

This constructor creates delegates for instance methods only. An instance method is a method that is associated with an instance of a class; a static method is a method that is associated with the class itself.

## Delegate.Delegate(Type, String) constructor

```csharp
protected Delegate (Type target, string method);
```

Initializes a delegate that invokes the specified static method from the specified class.

Parameters:

- `target`: The `Type` representing the class that defines `method`.
- `method`: The name of the static method that the delegate represents.

Exceptions:

- `ArgumentNullException`: `target` is `null`.

-or-

`method` is `null`.
- `ArgumentException`: `target` is not a `RuntimeType`.

-or-

`target` represents an open generic type.

#### Remarks
This constructor cannot be used in application code. To create a delegate by specifying the name of a static method, use an overload of the `Delegate.CreateDelegate` method that specifies a method name but does not specify a target object. For example, the `CreateDelegate` method overload creates a static delegate for a method with a specified name.

This constructor creates delegates for static methods only. An instance method is a method that is associated with an instance of a class; a static method is a method that is associated with the class itself.

## Delegate.HasSingleTarget property

```csharp
public bool HasSingleTarget { get; }
```

Gets a value that indicates whether the `Delegate` has a single invocation target.

Returns: `true` if the `Delegate` has a single invocation target.

To be added.

## Delegate.Method property

```csharp
public System.Reflection.MethodInfo Method { get; }
```

Gets the method represented by the delegate.

Returns: A `MethodInfo` describing the method represented by the delegate.

Exceptions:

- `MemberAccessException`: The caller does not have access to the method represented by the delegate (for example, if the method is private).

To be added.

## Delegate.Target property

```csharp
public object? Target { get; }
```

Gets the class instance on which the current delegate invokes the instance method.

Returns: The object on which the current delegate invokes the instance method, if the delegate represents an instance method; `null` if the delegate represents a static method.

#### Remarks
An instance method is a method that is associated with an instance of a class; a static method is a method that is associated with the class itself.

If the delegate invokes one or more instance methods, this property returns the target of the last instance method in the invocation list.

## Delegate.Clone() method

```csharp
public virtual object Clone ();
```

Creates a shallow copy of the delegate.

Returns: A shallow copy of the delegate.

#### Remarks
The clone has the same `Type`, target, method, and invocation list as the original delegate.

A shallow copy creates a new instance of the same type as the original object, and then copies the nonstatic fields of the original object. If the field is a value type, a bit-by-bit copy of the field is performed. If the field is a reference type, the reference is copied but the referred object is not; therefore, the reference in the original object and the reference in the clone point to the same object. In contrast, a deep copy of an object duplicates everything directly or indirectly referenced by the fields in the object.

## Delegate.Combine(Delegate[]) method

```csharp
public static Delegate? Combine (params Delegate?[]? delegates);
```

Concatenates the invocation lists of an array of delegates.

Parameters:

- `delegates`: The array of delegates to combine.

Returns: A new delegate with an invocation list that concatenates the invocation lists of the delegates in the `delegates` array. Returns `null` if `delegates` is `null`, if `delegates` contains zero elements, or if every entry in `delegates` is `null`.

Exceptions:

- `ArgumentException`: Not all the non-null entries in `delegates` are instances of the same delegate type.

#### Remarks
If the `delegates` array contains entries that are `null`, those entries are ignored.

The invocation list can contain duplicate entries; that is, entries that refer to the same method on the same object.

> **Note:**
> Generic delegates that are assignment-compatible because of variance are not necessarily combinable. To be combinable, the types must match exactly. For example, suppose that a class named `Derived` is derived from a class named `Base`. A delegate of type `Action<Base>` (`Action(Of Base)` in Visual Basic) can be assigned to a variable of type `Action<Derived>`, as explained in Covariance and Contravariance, but the two delegates cannot be combined because the types do not match exactly.

`Delegate.Combine` is useful for creating event handlers that call multiple methods each time an event occurs.

## Delegate.Combine(Delegate>) method

```csharp
public static Delegate? Combine (scoped ReadOnlySpan<Delegate?> delegates);
```

Concatenates the invocation lists of an span of delegates.

Parameters:

- `delegates`: The span of delegates to combine.

Returns: A new delegate with an invocation list that concatenates the invocation lists of the delegates in the `delegates` span.
Returns `null` if `delegates` is `null`, if `delegates` contains zero elements, or if every entry in `delegates` is `null`.

To be added.

## Delegate.Combine(Delegate, Delegate) method

```csharp
public static Delegate? Combine (Delegate? a, Delegate? b);
```

Concatenates the invocation lists of two delegates.

Parameters:

- `a`: The delegate whose invocation list comes first.
- `b`: The delegate whose invocation list comes last.

Returns: A new delegate with an invocation list that concatenates the invocation lists of `a` and `b` in that order. Returns `a` if `b` is `null`, returns `b` if `a` is a null reference, and returns a null reference if both `a` and `b` are null references.

Exceptions:

- `ArgumentException`: Both `a` and `b` are not `null`, and `a` and `b` are not instances of the same delegate type.

#### Remarks
The invocation list can contain duplicate entries; that is, entries that refer to the same method on the same object.

> **Note:**
> Generic delegates that are assignment-compatible because of variance are not necessarily combinable. To be combinable, the types must match exactly. For example, suppose that a class named `Derived` is derived from a class named `Base`. A delegate of type `Action<Base>` (`Action(Of Base)` in Visual Basic) can be assigned to a variable of type `Action<Derived>`, as explained in Covariance and Contravariance, but the two delegates cannot be combined because the types do not match exactly.

`Delegate.Combine` is useful for creating event handlers that call multiple methods each time an event occurs.

## Delegate.CombineImpl(Delegate) method

```csharp
protected virtual Delegate CombineImpl (Delegate? d);
```

Concatenates the invocation lists of the specified multicast (combinable) delegate and the current multicast (combinable) delegate.

Parameters:

- `d`: The multicast (combinable) delegate whose invocation list to append to the end of the invocation list of the current multicast (combinable) delegate.

Returns: A new multicast (combinable) delegate with an invocation list that concatenates the invocation list of the current multicast (combinable) delegate and the invocation list of `d`, or the current multicast (combinable) delegate if `d` is `null`.

Exceptions:

- `MulticastNotSupportedException`: Always thrown.

#### Remarks
This method applies only if the current delegate is multicast (combinable).

The current implementation simply throws a `MulticastNotSupportedException`.

The invocation list can contain duplicate entries; that is, entries that refer to the same method on the same object.
