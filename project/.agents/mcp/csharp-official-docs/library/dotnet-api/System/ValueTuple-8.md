---
title: "ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest> struct (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ValueTuple`8.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest> struct

Namespace: `System`

```csharp
public struct ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest> : IComparable, IComparable<(T1, T2, T3, T4, T5, T6, T7, TRest)>, IEquatable<(T1, T2, T3, T4, T5, T6, T7, TRest)>, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable, System.Runtime.CompilerServices.ITuple where TRest : struct
```

Represents an *n*-value tuple, where *n* is 8 or greater.

Parameters:

- `T1`: The type of the value tuple's first element.
- `T2`: The type of the value tuple's second element.
- `T3`: The type of the value tuple's third element.
- `T4`: The type of the value tuple's fourth element.
- `T5`: The type of the value tuple's fifth element.
- `T6`: The type of the value tuple's sixth element.
- `T7`: The type of the value tuple's seventh element.
- `TRest`: Any generic value tuple instance that defines the types of the tuple's remaining elements.

For more information about this API, see Value tuples.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.ValueTuple(T1, T2, T3, T4, T5, T6, T7, TRest) constructor

```csharp
public ValueTuple (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5, T6 item6, T7 item7, TRest rest);
```

Initializes a new `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance.

Parameters:

- `item1`: The value tuple's first element.
- `item2`: The value tuple's second element.
- `item3`: The value tuple's third element.
- `item4`: The value tuple's fourth element.
- `item5`: The value tuple's fifth element.
- `item6`: The value tuple's sixth element.
- `item7`: The value tuple's seventh element.
- `rest`: An instance of any value tuple type that contains the values of the value's tuple's remaining elements.

Exceptions:

- `ArgumentException`: `rest` is not a generic value tuple type.

#### Remarks
In addition to using your language's build-in support for tuples, you can also create a value tuple by calling the static `Create<T1,T2,T3,T4,T5,T6,T7,T8>` method without having to explicitly specify the types of its elements.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Runtime.CompilerServices.ITuple.Item property

```csharp
object? System.Runtime.CompilerServices.ITuple.Item[int index] { get; }
```

Gets the value of the specified `ValueTuple` element.

Parameters:

- `index`: The value of the specified `ValueTuple` element. `index` can range from 0 for `Item1` to one less than the number of elements in the `ValueTuple`.

Returns: The value of the `ValueTuple` element at the specified position.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than 0.

-or-

`index` is greater than or equal to `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>.System#Runtime#CompilerServices#ITuple#Length`.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Item` property is an explicit interface implementation. To call it, you must cast or convert the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` object to an `ITuple` interface object.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Runtime.CompilerServices.ITuple.Length property

```csharp
int System.Runtime.CompilerServices.ITuple.Length { get; }
```

Gets the number of elements in the `ValueTuple`.

Returns: The number of elements in the `ValueTuple`.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Length` property is an explicit interface implementation. To call it, you must cast or convert the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` object to an `ITuple` interface object.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.CompareTo(ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>) method

```csharp
public int CompareTo ((T1, T2, T3, T4, T5, T6, T7, TRest) other);
```

Compares the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance to a specified `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance.

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

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
The `obj` argument is considered to be equal to the current instance under the following conditions:

- It is a `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` value type.

- Its components are of the same types as those of the current instance.

- Its components are equal to those of the current instance. Equality is determined by the default equality comparer for each component.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Equals(ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>) method

```csharp
public bool Equals ((T1, T2, T3, T4, T5, T6, T7, TRest) other);
```

Returns a value that indicates whether the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is equal to a specified `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance.

Parameters:

- `other`: The value tuple to compare with this instance.

Returns: `true` if the current instance is equal to the specified tuple; otherwise, `false`.

#### Remarks
The `other` argument is considered to be equal to the current instance under the following conditions:

- Its components are of the same types as those of the current instance.

- Its components are equal to those of the current instance. Equality is determined by the default equality comparer for each component.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Calculates the hash code for the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance.

Returns: The hash code for the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Compares the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance to a specified object by using a specified comparer and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

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

Exceptions:

- `ArgumentException`: `other` is not a `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` object.

#### Remarks
This member is an explicit interface implementation. It can only be used when the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is cast to an  `IStructuralComparable` interface.

This method lets you define customized comparisons of `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects. For example, you can use this method to order `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects based on the value of a specific component.

Although this method can be called directly, it is most commonly called by collection-sorting methods that include `IComparer` parameters to order the members of a collection. For example, it is called by the `Sort` method and the `SortedList.Add` method of a `SortedList` object that is instantiated by using the `%23ctor` constructor.

> **Caution:**
>  The `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>.System%23Collections%23IStructuralComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>.System%23Collections%23IStructuralEquatable%23Equals` method.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Returns a value that indicates whether the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is equal to a specified object based on a specified comparison method.

Parameters:

- `other`: The object to compare with this instance.
- `comparer`: An object that defines the method to use to evaluate whether the two objects are equal.

Returns: `true` if the current instance is equal to the specified objects; otherwise, `false`.

#### Remarks
This member is an explicit interface implementation. It can only be used when the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is cast to an  `IStructuralEquatable` interface.

The `IEqualityComparer.Equals` implementation is called only if `other` is not `null`, and if it can be successfully cast to a `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` object that has the same total number of components (including those in nested tuple objects) of the same types as the current instance. The `Equals` method first passes the `Item1` values of the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects to be compared to the `IEqualityComparer.Equals` implementation. If this method call returns `true`, the method is called again and passed the `Item2` values of the two `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects. This continues until the method call returns `false` when it compares a specific pair of values, or the two `Rest` values are passed to the method.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Calculates the hash code for the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance by using a specified computation method.

Parameters:

- `comparer`: An object whose `IEqualityComparer.GetHashCode` method calculates the hash code of the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance.

Returns: A 32-bit signed integer hash code.

#### Remarks
This member is an explicit interface implementation. It can only be used when the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is cast to an  `IStructuralEquatable` interface.  The method simply wraps a call to the `comparer` object's `IEqualityComparer.GetHashCode` implementation.

The algorithm used to compute the hash code should return the same hash code for two `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` objects that are considered to be equal.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object other);
```

Compares the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` object to a specified object and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

Parameters:

- `other`: An object to compare with the current instance.

Returns: A signed integer that indicates the relative position of this instance and `other` in the sort order, as shown in the following table.

-  A negative integer

:  This instance precedes `other`.

-  Zero

:  This instance and `other` have the same position in the sort order.

-  A positive integer

:  This instance follows `other`.

Exceptions:

- `ArgumentException`: `other` is not a `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance is cast to an `IComparable` interface.

This method provides the `IComparable.CompareTo` implementation for the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` structure. Although the method can be called directly, it is most commonly called by the default overloads of collection-sorting methods, such as `Sort` and `SortedList.Add`, to order the members of a collection.

> **Caution:**
>  The `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>.System%23IComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Equals` method.

This method uses the default object comparer to compare each component.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the value of this `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance.

Returns: The string representation of this `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance.

#### Remarks
The string returned by this method takes the form (*Item1*, *Item2*, *Item3*, *Item4*, *Item5*, *Item6*, *Item7*, *Item8*…), where *Item1*, *Item2*, *Item3*, *Item4*, *Item5*, *Item6*, and *Item7* represent the values of the `Item1`, `Item2`, `Item3`, `Item4`, `Item5`, `Item6`, and `Item7` fields. *Item8* represents the value of the `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance's `Next.Item1` field. The value of any additional nested elements follows *Item8*. If any of the field values is `null`, it is represented as `Empty`.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item1 field

```csharp
public T1 Item1;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance's first element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item2 field

```csharp
public T2 Item2;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance's second element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item3 field

```csharp
public T3 Item3;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance's third element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item4 field

```csharp
public T4 Item4;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance's fourth element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item5 field

```csharp
public T5 Item5;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance's fifth element.

To be added.

## ValueTuple<T1,T2,T3,T4,T5,T6,T7,TRest>.Item6 field

```csharp
public T6 Item6;
```

Gets the value of the current `ValueTuple<T1,T2,T3,T4,T5,T6,T7,T8>` instance's sixth element.

To be added.
