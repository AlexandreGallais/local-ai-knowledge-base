---
title: "ValueTuple struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ValueTuple.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueTuple struct

Namespace: `System`

```csharp
public struct ValueTuple : IComparable, IComparable<ValueTuple>, IEquatable<ValueTuple>, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable, System.Runtime.CompilerServices.ITuple
```

Provides static methods for creating value tuples.

For more information about this API, see Value tuples.

## ValueTuple.System.Runtime.CompilerServices.ITuple.Item property

```csharp
object? System.Runtime.CompilerServices.ITuple.Item[int index] { get; }
```

Returns an `IndexOutOfRangeException`. There are no elements in a `ValueTuple`.

Parameters:

- `index`: There is no acceptable value for `index`.

Returns: An `IndexOutOfRangeException`.

Exceptions:

- `IndexOutOfRangeException`: There is no acceptable value for `index`.

To be added.

## ValueTuple.System.Runtime.CompilerServices.ITuple.Length property

```csharp
int System.Runtime.CompilerServices.ITuple.Length { get; }
```

Gets the length of this `ValueTuple` instance, which is always 0. There are no elements in a `ValueTuple`.

Returns: 0, the number of elements in this `ValueTuple` instance.

To be added.

## ValueTuple.CompareTo(ValueTuple) method

```csharp
public int CompareTo (ValueTuple other);
```

Compares the current `ValueTuple` instance to a specified `ValueTuple` instance.

Parameters:

- `other`: The object to compare with the current instance.

Returns: This method always returns 0.

Exceptions:

- `ArgumentException`: `other` is not a `ValueTuple` instance.

Because a `ValueTuple` instance has no elements, any two `ValueTuple` instances are considered to be equivalent.

## ValueTuple.Create() method

```csharp
public static ValueTuple Create ();
```

Creates a new value tuple with zero components.

Returns: A new value tuple with no components.

To be added.

## ValueTuple.Create<T1>(T1) method

```csharp
public static (T1) Create<T1> (T1 item1);
```

Creates a new value tuple with 1 component (a singleton).

Parameters:

- `T1`: The type of the value tuple's only component.
- `item1`: The value of the value tuple's only component.

Returns: A value tuple with 1 component.

#### Remarks
`ValueTuple.Create` is a helper method that you can call to instantiate a 1-component value tuple without having to explicitly specify the type of its component.

## ValueTuple.Create<T1,T2>(T1, T2) method

```csharp
public static (T1, T2) Create<T1,T2> (T1 item1, T2 item2);
```

Creates a new value tuple with 2 components (a pair).

Parameters:

- `T1`: The type of the value tuple's first component.
- `T2`: The type of the value tuple's second component.
- `item1`: The value of the value tuple's first component.
- `item2`: The value of the value tuple's second component.

Returns: A value tuple with 2 components.

#### Remarks
`ValueTuple.Create` is a helper method that you can call to instantiate an 2-component value tuple without having to explicitly specify the types of its components.

## ValueTuple.Create<T1,T2,T3>(T1, T2, T3) method

```csharp
public static (T1, T2, T3) Create<T1,T2,T3> (T1 item1, T2 item2, T3 item3);
```

Creates a new value tuple with 3 components (a triple).

Parameters:

- `T1`: The type of the value tuple's first component.
- `T2`: The type of the value tuple's second component.
- `T3`: The type of the value tuple's third component.
- `item1`: The value of the value tuple's first component.
- `item2`: The value of the value tuple's second component.
- `item3`: The value of the value tuple's third component.

Returns: A value tuple with 3 components.

#### Remarks
`ValueTuple.Create` is a helper method that you can call to instantiate an 3-component value tuple without having to explicitly specify the types of its components.

## ValueTuple.Create<T1,T2,T3,T4>(T1, T2, T3, T4) method

```csharp
public static (T1, T2, T3, T4) Create<T1,T2,T3,T4> (T1 item1, T2 item2, T3 item3, T4 item4);
```

Creates a new value tuple with 4 components (a quadruple).

Parameters:

- `T1`: The type of the value tuple's first component.
- `T2`: The type of the value tuple's second component.
- `T3`: The type of the value tuple's third component.
- `T4`: The type of the value tuple's fourth component.
- `item1`: The value of the value tuple's first component.
- `item2`: The value of the value tuple's second component.
- `item3`: The value of the value tuple's third component.
- `item4`: The value of the value tuple's fourth component.

Returns: A value tuple with 4 components.

#### Remarks
`ValueTuple.Create` is a helper method that you can call to instantiate an 4-component value tuple without having to explicitly specify the types of its components.

## ValueTuple.Create<T1,T2,T3,T4,T5>(T1, T2, T3, T4, T5) method

```csharp
public static (T1, T2, T3, T4, T5) Create<T1,T2,T3,T4,T5> (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5);
```

Creates a new value tuple with 5 components (a quintuple).

Parameters:

- `T1`: The type of the value tuple's first component.
- `T2`: The type of the value tuple's second component.
- `T3`: The type of the value tuple's third component.
- `T4`: The type of the value tuple's fourth component.
- `T5`: The type of the value tuple's fifth component.
- `item1`: The value of the value tuple's first component.
- `item2`: The value of the value tuple's second component.
- `item3`: The value of the value tuple's third component.
- `item4`: The value of the value tuple's fourth component.
- `item5`: The value of the value tuple's fifth component.

Returns: A value tuple with 5 components.

#### Remarks
`ValueTuple.Create` is a helper method that you can call to instantiate a 5-component value tuple without having to explicitly specify the types of its components.

## ValueTuple.Create<T1,T2,T3,T4,T5,T6>(T1, T2, T3, T4, T5, T6) method

```csharp
public static (T1, T2, T3, T4, T5, T6) Create<T1,T2,T3,T4,T5,T6> (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6);
```

Creates a new value tuple with 6 components (a sexuple).

Parameters:

- `T1`: The type of the value tuple's first component.
- `T2`: The type of the value tuple's second component.
- `T3`: The type of the value tuple's third component.
- `T4`: The type of the value tuple's fourth component.
- `T5`: The type of the value tuple's fifth component.
- `T6`: The type of the value tuple's sixth component.
- `item1`: The value of the value tuple's first component.
- `item2`: The value of the value tuple's second component.
- `item3`: The value of the value tuple's third component.
- `item4`: The value of the value tuple's fourth component.
- `item5`: The value of the value tuple's fifth component.
- `item6`: The value of the value tuple's sixth component.

Returns: A value tuple with 6 components.

#### Remarks
`ValueTuple.Create` is a helper method that you can call to instantiate a 6-component value tuple without having to explicitly specify the types of its components.

## ValueTuple.Create<T1,T2,T3,T4,T5,T6,T7>(T1, T2, T3, T4, T5, T6, T7) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7) Create<T1,T2,T3,T4,T5,T6,T7> (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6, T7 item7);
```

Creates a new value tuple with 7 components (a septuple).

Parameters:

- `T1`: The type of the value tuple's first component.
- `T2`: The type of the value tuple's second component.
- `T3`: The type of the value tuple's third component.
- `T4`: The type of the value tuple's fourth component.
- `T5`: The type of the value tuple's fifth component.
- `T6`: The type of the value tuple's sixth component.
- `T7`: The type of the value tuple's seventh component.
- `item1`: The value of the value tuple's first component.
- `item2`: The value of the value tuple's second component.
- `item3`: The value of the value tuple's third component.
- `item4`: The value of the value tuple's fourth component.
- `item5`: The value of the value tuple's fifth component.
- `item6`: The value of the value tuple's sixth component.
- `item7`: The value of the value tuple's seventh component.

Returns: A value tuple with 7 components.

#### Remarks
`ValueTuple.Create` is a helper method that you can call to instantiate an 7-component value tuple without having to explicitly specify the types of its components.

## ValueTuple.Create<T1,T2,T3,T4,T5,T6,T7,T8>(T1, T2, T3, T4, T5, T6, T7, T8) method

```csharp
public static (T1, T2, T3, T4, T5, T6, T7, T8) Create<T1,T2,T3,T4,T5,T6,T7,T8> (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6, T7 item7, T8 item8);
```

Creates a new value tuple with 8 components (an octuple).

Parameters:

- `T1`: The type of the value tuple's first component.
- `T2`: The type of the value tuple's second component.
- `T3`: The type of the value tuple's third component.
- `T4`: The type of the value tuple's fourth component.
- `T5`: The type of the value tuple's fifth component.
- `T6`: The type of the value tuple's sixth component.
- `T7`: The type of the value tuple's seventh component.
- `T8`: The type of the value tuple's eighth component.
- `item1`: The value of the value tuple's first component.
- `item2`: The value of the value tuple's second component.
- `item3`: The value of the value tuple's third component.
- `item4`: The value of the value tuple's fourth component.
- `item5`: The value of the value tuple's fifth component.
- `item6`: The value of the value tuple's sixth component.
- `item7`: The value of the value tuple's seventh component.
- `item8`: The value of the value tuple's eighth component.

Returns: A value tuple with 8 components.

#### Remarks
`ValueTuple.Create` is a helper method that you can call to instantiate an 8-component value tuple without having to explicitly specify the types of its components.

> **Note:**
>  You must call the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>.%23ctor` constructor to create a tuple with nine or more components unless your language provides a special syntax for this purpose. The static methods of the `ValueTuple` structure cannot be used to create a tuple with nine or more components.

## ValueTuple.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current `ValueTuple` instance is equal to a specified object.

Parameters:

- `obj`: The object to compare to the current instance.

Returns: `true` if `obj` is a `ValueTuple` instance; otherwise, `false`.

To be added.

## ValueTuple.Equals(ValueTuple) method

```csharp
public bool Equals (ValueTuple other);
```

Determines whether two `ValueTuple` instances are equal. This method always returns `true`.

Parameters:

- `other`: The value tuple to compare with the current instance.

Returns: This method always returns `true`.

To be added.

## ValueTuple.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `ValueTuple` instance.

Returns: This method always return 0.

To be added.

## ValueTuple.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Compares the current `ValueTuple` instance to a specified object.

Parameters:

- `other`: The object to compare with the current instance.
- `comparer`: An object that provides custom rules for comparison. This parameter is ignored.

Returns: Returns 0 if `other` is a `ValueTuple` instance and 1 if `other` is `null`.

Exceptions:

- `ArgumentException`: `other` is not a `ValueTuple` instance.

To be added.

## ValueTuple.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Returns a value that indicates whether the current `ValueTuple` instance is equal to a specified object based on a specified comparison method.

Parameters:

- `other`: The object to compare with this instance.
- `comparer`: An object that defines the method to use to evaluate whether the two objects are equal.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
This member is an explicit interface implementation. It can only be used when the `ValueTuple`t> instance is cast to an `IStructuralEquatable` interface. The `IEqualityComparer.Equals` implementation is called only if `other` is not `null`, and if it can be successfully cast to a `ValueTuple` object.

## ValueTuple.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Returns the hash code for this `ValueTuple` instance.

Parameters:

- `comparer`: An object whose `IEqualityComparer.GetHashCode` method computes the hash code. This parameter is ignored.

Returns: The hash code for this `ValueTuple` instance.

To be added.

## ValueTuple.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object other);
```

Compares this `ValueTuple` instance with a specified object and returns an indication of their relative values.

Parameters:

- `other`: The object to compare with the current instance.

Returns: 0 if `other` is a `ValueTuple` instance; otherwise, 1 if `other` is `null`.

Exceptions:

- `ArgumentException`: `other` is not a `ValueTuple` instance.

To be added.

## ValueTuple.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of this `ValueTuple` instance.

Returns: This method always returns "()".

#### Remarks

The string returned by this method takes the form `()`.
