---
title: "ValueTuple<T1,T2,T3,T4,T5,T6> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ValueTuple`6.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueTuple<T1,T2,T3,T4,T5,T6> struct

Namespace: `System`

```csharp
public struct ValueTuple<T1,T2,T3,T4,T5,T6> : IComparable, IComparable<(T1, T2, T3, T4, T5, T6)>, IEquatable<(T1, T2, T3, T4, T5, T6)>, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable, System.Runtime.CompilerServices.ITuple
```

Represents a value tuple with 6 components.

Parameters:

- `T1`: The type of the value tuple's first element.
- `T2`: The type of the value tuple's second element.
- `T3`: The type of the value tuple's third element.
- `T4`: The type of the value tuple's fourth element.
- `T5`: The type of the value tuple's fifth element.
- `T6`: The type of the value tuple's sixth element.

For more information about this API, see Value tuples.

## ValueTuple<T1,T2,T3,T4,T5,T6>.ValueTuple(T1, T2, T3, T4, T5, T6) constructor

```csharp
public ValueTuple (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6);
```

Initializes a new `ValueTuple<T1,T2,T3,T4,T5,T6>` instance.

Parameters:

- `item1`: The value tuple's first element.
- `item2`: The value tuple's second element.
- `item3`: The value tuple's third element.
- `item4`: The value tuple's fourth element.
- `item5`: The value tuple's fifth element.
- `item6`: The value tuple's sixth element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.System.Runtime.CompilerServices.ITuple.Item property

```csharp
object? System.Runtime.CompilerServices.ITuple.Item[int index] { get; }
```

Gets the value of the specified `ValueTuple` element.

Parameters:

- `index`: The index of the specified `ValueTuple` element. `index` can range from 0 to 5.

Returns: The value of the `ValueTuple` element at the specified position.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than 0 or greater than 5.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Item` property is an explicit interface implementation. To call it, you must cast or convert the `ValueTuple<T1,T2,T3,T4,T5,T6>` object to an `ITuple` interface object.

## ValueTuple<T1,T2,T3,T4,T5,T6>.System.Runtime.CompilerServices.ITuple.Length property

```csharp
int System.Runtime.CompilerServices.ITuple.Length { get; }
```

Gets the number of elements in the `ValueTuple`.

Returns: 6, the number of elements in a `ValueTuple<T1,T2,T3,T4,T5,T6>` object.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Length` property is an explicit interface implementation. To call it, you must cast or convert the `ValueTuple<T1,T2,T3,T4,T5,T6>` object to an `ITuple` interface object.

## ValueTuple<T1,T2,T3,T4,T5,T6>.CompareTo(ValueTuple<T1,T2,T3,T4,T5,T6>) method

```csharp
public int CompareTo ((T1, T2, T3, T4, T5, T6) other);
```

Compares the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance to a specified `ValueTuple<T1,T2,T3,T4,T5,T6>` instance.

Parameters:

- `other`: The tuple to compare with this instance.

Returns: A signed integer that indicates the relative position of this instance and `other` in the sort order, as shown in the following table.

-  A negative integer

:  This instance precedes `other`.

-  Zero

:  This instance and `other` have the same position in the sort order.

-  A positive integer

:  This instance follows `other`.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
The `obj` argument is considered to be equal to the current instance under the following conditions:

- It is a `ValueTuple<T1,T2,T3,T4,T5,T6>` value type.

- Its components are of the same types as those of the current instance.

- Its components are equal to those of the current instance. Equality is determined by the default equality comparer for each component.

## ValueTuple<T1,T2,T3,T4,T5,T6>.Equals(ValueTuple<T1,T2,T3,T4,T5,T6>) method

```csharp
public bool Equals ((T1, T2, T3, T4, T5, T6) other);
```

Returns a value that indicates whether the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance is equal to a specified `ValueTuple<T1,T2,T3,T4,T5,T6>` instance.

Parameters:

- `other`: The value tuple to compare with this instance.

Returns: `true` if the current instance is equal to the specified tuple; otherwise, `false`.

#### Remarks
The `other` argument is considered to be equal to the current instance under the following conditions:

- Its components are of the same types as those of the current instance.

- Its components are equal to those of the current instance. Equality is determined by the default equality comparer for each component.

## ValueTuple<T1,T2,T3,T4,T5,T6>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Calculates the hash code for the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance.

Returns: The hash code for the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Compares the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance to a specified object by using a specified comparer and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

Parameters:

- `other`: The object to compare with the current instance.
- `comparer`: An object that provides custom rules for comparison.

Returns: A signed integer that indicates the relative position of this instance and `other` in the sort order, as shown in the following table.

-  A negative integer

:  This instance precedes `other`.

-  Zero

:  This instance and `other` have the same position in the sort order.

-  A positive integer

:  This instance follows `other`.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Returns a value that indicates whether the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance is equal to a specified object based on a specified comparison method.

Parameters:

- `other`: The object to compare with this instance.
- `comparer`: An object that defines the method to use to evaluate whether the two objects are equal.

Returns: `true` if the current instance is equal to the specified objects; otherwise, `false`.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Calculates the hash code for the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance by using a specified computation method.

Parameters:

- `comparer`: An object whose `IEqualityComparer.GetHashCode` method calculates the hash code of the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance.

Returns: A 32-bit signed integer hash code.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object other);
```

Compares the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance to a specified object by using a specified comparer and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

Parameters:

- `other`: The object to compare with the current instance.

Returns: A signed integer that indicates the relative position of this instance and `other` in the sort order, as shown in the following table.

-  A negative integer

:  This instance precedes `other`.

-  Zero

:  This instance and `other` have the same position in the sort order.

-  A positive integer

:  This instance follows `other`.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the value of this `ValueTuple<T1,T2,T3,T4,T5,T6>` instance.

Returns: The string representation of this `ValueTuple<T1,T2,T3,T4,T5,T6>` instance.

#### Remarks
The string returned by this method takes the form (*Item1*, *Item2*, *Item3*, *Item4*, *Item5*, *Item6*, where *Item1*, *Item2*, *Item3*, *Item4*, *Item5*, and *Item6* represent the values of the `Item1`, `Item2`, `Item3`, `Item4`, `Item5`, and `Item6` fields. If any of the field values is `null`, it is represented as `Empty`.

## ValueTuple<T1,T2,T3,T4,T5,T6>.Item1 field

```csharp
public T1 Item1;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance's first element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.Item2 field

```csharp
public T2 Item2;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance's second element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.Item3 field

```csharp
public T3 Item3;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance's third element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.Item4 field

```csharp
public T4 Item4;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance's fourth element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.Item5 field

```csharp
public T5 Item5;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance's fifth element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6>.Item6 field

```csharp
public T6 Item6;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6>` instance's sixth element.

To be added.
