---
title: "Tuple<T1> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1> class

Namespace: `System`

```csharp
public class Tuple<T1> : IComparable, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable, System.Runtime.CompilerServices.ITuple
```

Represents a 1-tuple, or singleton.

Parameters:

- `T1`: The type of the tuple's only component.

#### Remarks
A tuple is a data structure that has a specific number and sequence of values. The `Tuple<T>` class represents a 1-tuple, or singleton, which is a tuple that has a single component. A singleton is used comparatively rarely in application development.

You can instantiate a `Tuple<T>` object by calling either the `Tuple<T>.%23ctor` constructor or the static `Tuple.Create` method. You can retrieve the value of the tuple's single component by using the read-only `Tuple<T>.Item1` instance property.

## Tuple<T1>.Tuple(T1) constructor

```csharp
public Tuple (T1 item1);
```

Initializes a new instance of the `Tuple<T>` class.

Parameters:

- `item1`: The value of the tuple's only component.

#### Remarks
You can also use the static `Tuple.Create` method to instantiate a 1-tuple object without having to explicitly specify the type of its component. The following example uses the `Tuple.Create` method to instantiate a 1-tuple whose component is of type `Int32`.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This is equivalent to the following call to the `Tuple<T>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple<T1>.Item1 property

```csharp
public T1 Item1 { get; }
```

Gets the value of the `Tuple<T>` object's single component.

Returns: The value of the current `Tuple<T>` object's single component.

#### Remarks
You can determine the type of the `Tuple<T>.Item1` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item1` property.

- By retrieving the `Type` object that represents the `Tuple<T>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

The example illustrates both approaches.

#### Examples
The following example displays information about two singletons and their components.

_Code sample not included: ~/snippets/csharp/System/TupleT1/Item1/item1.cs._

## Tuple<T1>.System.Runtime.CompilerServices.ITuple.Item property

```csharp
object? System.Runtime.CompilerServices.ITuple.Item[int index] { get; }
```

Gets the value of the `Tuple` element.

Parameters:

- `index`: The index of the `Tuple` element. `index` must be 0.

Returns: The value of the `Tuple` element.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than 0 or greater than 0.

The `System%23Runtime%23CompilerServices%23ITuple%23Item` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T>` object to an `ITuple` interface object.

## Tuple<T1>.System.Runtime.CompilerServices.ITuple.Length property

```csharp
int System.Runtime.CompilerServices.ITuple.Length { get; }
```

Gets the number of elements in the `Tuple`.

Returns: 1, the number of elements in a `Tuple<T>` object.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Length` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T>` object to an `ITuple` interface object.

## Tuple<T1>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current `Tuple<T>` object is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
The `obj` parameter is considered to be equal to the current instance under the following conditions:

- It is a `Tuple<T>` object.

- Its single component is of the same type as the current instance.

- Its single component is equal to that of the current instance. Equality is determined by the default object equality comparer for each component.

#### Examples
The following example calls the `Equals` method to compare a `Tuple<T>` object whose component is a `Double` value with three `Tuple<T>` objects whose components have the following characteristics:

- Same type (`Double`) and same value.

- Same type (`Double`), but different value.

- Different type (`Single`), but same value.

_Code sample not included: ~/snippets/csharp/System/TupleT1/Equals/equals1.cs._

## Tuple<T1>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `Tuple<T>` object.

Returns: A 32-bit signed integer hash code.

To be added.

## Tuple<T1>.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Compares the current `Tuple<T>` object to a specified object by using a specified comparer, and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

Parameters:

- `other`: An object to compare with the current instance.
- `comparer`: An object that provides custom rules for comparison.

Returns: A signed integer that indicates the relative position of this instance and `other` in the sort order, as shown in the following table.

-  A negative integer

:  This instance precedes `other`.

-  Zero

:  This instance and `other` have the same position in the sort order.

-  A positive integer

:  This instance follows `other`.

Exceptions:

- `ArgumentException`: `other` is not a `Tuple<T>` object.

#### Remarks
Although this method can be called directly, it is most commonly called by collection sorting methods that include `IComparer` parameters to order the members of a collection. For example, it is called by the `Sort` method and the `SortedList.Add` method of a `SortedList` object that is instantiated by using the `%23ctor` constructor.

> **Caution:**
>  The `Tuple<T>.System%23Collections%23IStructuralComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Tuple<T>.System%23Collections%23IStructuralEquatable%23Equals` method.

#### Examples
The following example defines a generic class named `DescendingComparer` that implements the `IComparer<T>` interface. `DescendingComparer` sorts objects in descending rather than ascending order by reversing the value returned by the default comparer for a particular type. An instance of the generic `DescendingComparer` class is then passed to the `Sort` method to sort an array of `Tuple<T>` objects in descending order. Note that the example does not directly call the `Tuple<T>.System%23Collections%23IStructuralComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1/System.Collections.IStructuralComparable.CompareTo/compareto2.cs._

## Tuple<T1>.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Returns a value that indicates whether the current `Tuple<T>` object is equal to a specified object based on a specified comparison method.

Parameters:

- `other`: The object to compare with this instance.
- `comparer`: An object that defines the method to use to evaluate whether the two objects are equal.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T>` instance is cast to an `IStructuralEquatable` interface.

The `IEqualityComparer.Equals` implementation is called only if `other` is not `null`, and if it can be successfully cast (in C#) or converted (in Visual Basic) to a `Tuple<T>` object whose single component is of the same type as the current instance. The method is passed the `Tuple<T>.Item1` component of the current instance and the `Tuple<T>.Item1` component of the `Tuple<T>` object represented by the `other` parameter.

#### Examples
The following example defines an `IEqualityComparer` implementation that considers two floating-point values to be equal if they are approximately equal to each other (that is, if one value is within .01 percent of the other).

_Code sample not included: ~/snippets/csharp/System/TupleT1/Equals/equals2.cs._

## Tuple<T1>.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Calculates the hash code for the current `Tuple<T>` object by using a specified computation method.

Parameters:

- `comparer`: An object whose `IEqualityComparer.GetHashCode` method calculates the hash code of the current `Tuple<T>` object.

Returns: A 32-bit signed integer hash code.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T>` instance is cast to an `IStructuralEquatable` interface.

The method simply wraps a call to the `comparer` object's `IEqualityComparer.GetHashCode` implementation.

The algorithm used to compute the hash code should return the same hash code for two `Tuple<T>` objects that are considered to be equal.

## Tuple<T1>.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object obj);
```

Compares the current `Tuple<T>` object to a specified object, and returns an integer that indicates whether the current object is before, after, or in the same position as the specified object in the sort order.

Parameters:

- `obj`: An object to compare with the current instance.

Returns: A signed integer that indicates the relative position of this instance and `obj` in the sort order, as shown in the following table.

-  A negative integer

:  This instance precedes `obj`.

-  Zero

:  This instance and `obj` have the same position in the sort order.

-  A positive integer

:  This instance follows `obj`.

Exceptions:

- `ArgumentException`: `obj` is not a `Tuple<T>` object.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Tuple<T>` instance is cast to an `IComparable` interface.

This method provides the `IComparable.CompareTo` implementation for the `Tuple<T>` class. Although the method can be called directly, it is most commonly called by the default overloads of collection sorting methods, such as `Sort` and `SortedList.Add`, to order the members of a collection.

> **Caution:**
>  The `Tuple<T>.System%23IComparable%23CompareTo` method is intended for use in sorting operations. It should not be used when the primary purpose of a comparison is to determine whether two objects are equal. To determine whether two objects are equal, call the `Tuple<T>.Equals` method.

The `Tuple<T>.System%23IComparable%23CompareTo` method uses the default object  comparer.

#### Examples
The following example creates an array of singletons whose component is a `Double` value. It displays the value of each tuple component in unsorted order, sorts the array, and then displays the values in sorted order. Note that the example does not directly call the `Tuple<T>.System%23IComparable%23CompareTo` method. This method is called implicitly by the `Sort` method for each element in the array.

_Code sample not included: ~/snippets/csharp/System/TupleT1/System.Collections.IStructuralComparable.CompareTo/compareto1.cs._

## Tuple<T1>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the value of this `Tuple<T>` instance.

Returns: The string representation of this `Tuple<T>` object.

#### Remarks
The string returned by this method takes the form (*Item1*), where *Item1* represents the value of the `Item1` property. If the value of `Item1` is `null`, it is represented as `Empty`.

#### Examples
The following example illustrates the `Tuple<T>.ToString` method.

_Code sample not included: ~/snippets/csharp/System/TupleT1/ToString/tostring1.cs._
