---
title: "Tuple<T1,T2,T3,T4,T5> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Tuple`5.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Tuple<T1,T2,T3,T4,T5> class

Namespace: `System`

```csharp
public class Tuple<T1,T2,T3,T4,T5> : IComparable, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable, System.Runtime.CompilerServices.ITuple
```

Represents a 5-tuple, or quintuple.

Parameters:

- `T1`: The type of the tuple's first component.
- `T2`: The type of the tuple's second component.
- `T3`: The type of the tuple's third component.
- `T4`: The type of the tuple's fourth component.
- `T5`: The type of the tuple's fifth component.

#### Remarks
A tuple is a data structure that has a specific number and sequence of values. The `Tuple<T1,T2,T3,T4,T5>` class represents a 5-tuple, or quintuple, which is a tuple that has five components.

You can instantiate a `Tuple<T1,T2,T3,T4,T5>` object by calling either the `Tuple<T1,T2,T3,T4,T5>.%23ctor` constructor or the static `Create<T1,T2,T3,T4,T5>` method. You can retrieve the value of the tuple's components by using the read-only `Tuple<T1,T2,T3,T4,T5>.Item1`, `Tuple<T1,T2,T3,T4,T5>.Item2`, `Tuple<T1,T2,T3,T4,T5>.Item3`, `Tuple<T1,T2,T3,T4,T5>.Item4`, and `Tuple<T1,T2,T3,T4,T5>.Item5` instance properties.

Tuples are commonly used in four different ways:

- To represent a single set of data. For example, a tuple can represent a database record, and its components can represent individual fields of the record.

- To provide easy access to, and manipulation of, a data set. The following example defines an array of `Tuple<T1,T2,T3,T4,T5>` objects that contain the names of running backs in American football, the number of games in which they played, and the number of carries, total yards gained, and touchdowns scored during those games. The array is passed to the `ComputeStatistics` method, which calculates each running back's number of carries per game, average yards per game, average yards per carry, and average number of touchdowns per attempt.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/Overview/example1.cs._

- To return multiple values from a method without the use of `out` parameters (in C#) or `ByRef` parameters (in Visual Basic). For example, the previous example returns its computed statistics, along with the name of the player, in an array of `Tuple<T1,T2,T3,T4,T5>` objects.

- To pass <example-value> values to a method through a single parameter. For example, the `Start` method has a single parameter that lets you supply one value to the method that the thread executes at startup. If you supply a `Tuple<T1,T2,T3,T4,T5>` object as the method argument, you can supply the thread's startup routine with five items of data.

## Tuple<T1,T2,T3,T4,T5>.Tuple(T1, T2, T3, T4, T5) constructor

```csharp
public Tuple (T1 item1, T2 item2, T3 item3, T4 item4, T5 item5);
```

Initializes a new instance of the `Tuple<T1,T2,T3,T4,T5>` class.

Parameters:

- `item1`: The value of the tuple's first component.
- `item2`: The value of the tuple's second component.
- `item3`: The value of the tuple's third component.
- `item4`: The value of the tuple's fourth component.
- `item5`: The value of the tuple's fifth component.

#### Remarks
You can also use the static `Create<T1,T2,T3,T4,T5>` method to instantiate a 5-tuple object without having to explicitly specify the types of its components. The following example uses the `Create<T1,T2,T3,T4,T5>` method to instantiate a 5-tuple whose first component is of type `String` and its remaining four components are of type `Int32`.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

This is equivalent to the following call to the `Tuple<T1,T2,T3,T4,T5>.%23ctor` class constructor.

_Code sample not included: ~/snippets/csharp/System/Tuple/Overview/create1.cs._

## Tuple<T1,T2,T3,T4,T5>.Item1 property

```csharp
public T1 Item1 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5>` object's first component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5>` object's first component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4,T5>.Item1` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item1` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4,T5>` object, and retrieving the first element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5>` objects whose components contain the name of a state in the United States, its population in 1990 and 2000, its population change in this 10-year period, and the percentage change in its population. It then iterates through the array and displays the value of each component in a tuple.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5>.Item2 property

```csharp
public T2 Item2 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5>` object's second component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5>` object's second component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4>.Item2` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item2` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4>` object, and retrieving the second element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5>` objects whose components contain the name of a state in the United States, its population in 1990 and 2000, its population change in this 10-year period, and the percentage change in its population. It then iterates through the array and displays the value of each component in a tuple.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5>.Item3 property

```csharp
public T3 Item3 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5>` object's third component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5>` object's third component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4>.Item2` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item2` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4>` object, and retrieving the second element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5>` objects whose components contain the name of a state in the United States, its population in 1990 and 2000, its population change in this 10-year period, and the percentage change in its population. It then iterates through the array and displays the value of each component in a tuple.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5>.Item4 property

```csharp
public T4 Item4 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5>` object's fourth component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5>` object's fourth component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4>.Item2` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item2` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4>` object, and retrieving the second element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5>` objects whose components contain the name of a state in the United States, its population in 1990 and 2000, its population change in this 10-year period, and the percentage change in its population. It then iterates through the array and displays the value of each component in a tuple.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5>.Item5 property

```csharp
public T5 Item5 { get; }
```

Gets the value of the current `Tuple<T1,T2,T3,T4,T5>` object's fifth component.

Returns: The value of the current `Tuple<T1,T2,T3,T4,T5>` object's fifth component.

#### Remarks
You can dynamically determine the type of the `Tuple<T1,T2,T3,T4>.Item2` component in one of two ways:

- By calling the `GetType` method on the value that is returned by the `Item2` property.

- By retrieving the `Type` object that represents the `Tuple<T1,T2,T3,T4>` object, and retrieving the second element from the array that is returned by its `Type.GetGenericArguments` method.

#### Examples
The following example defines an array of `Tuple<T1,T2,T3,T4,T5>` objects whose components contain the name of a state in the United States, its population in 1990 and 2000, its population change in this 10-year period, and the percentage change in its population. It then iterates through the array and displays the value of each component in a tuple.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/Item1/item1.cs._

## Tuple<T1,T2,T3,T4,T5>.System.Runtime.CompilerServices.ITuple.Item property

```csharp
object? System.Runtime.CompilerServices.ITuple.Item[int index] { get; }
```

Gets the value of the specified `Tuple` element.

Parameters:

- `index`: The index of the specified `Tuple` element. `index` can range from 0 to 4.

Returns: The value of the `Tuple` element at the specified position.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than 0 or greater than 4.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Item` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2,T3,T4,T5>` object to an `ITuple` interface object.

## Tuple<T1,T2,T3,T4,T5>.System.Runtime.CompilerServices.ITuple.Length property

```csharp
int System.Runtime.CompilerServices.ITuple.Length { get; }
```

Gets the number of elements in the `Tuple`.

Returns: 5, the number of elements in a `Tuple<T1,T2,T3,T4,T5>` object.

#### Remarks
The `System%23Runtime%23CompilerServices%23ITuple%23Length` property is an explicit interface implementation. To call it, you must cast or convert the `Tuple<T1,T2,T3,T4,T5>` object to an `ITuple` interface object.

## Tuple<T1,T2,T3,T4,T5>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current `Tuple<T1,T2,T3,T4,T5>` object is equal to a specified object.

Parameters:

- `obj`: The object to compare with this instance.

Returns: `true` if the current instance is equal to the specified object; otherwise, `false`.

#### Remarks
The `obj` parameter is considered to be equal to the current instance under the following conditions:

- It is a `Tuple<T1,T2,T3,T4,T5>` object.

- Its five components are of the same types as the current instance.

- Its five components are equal to those of the current instance. Equality is determined by the default object equality comparer for each component.

#### Examples
The following example defines an array of 5-tuple objects that contain data about the temperatures of patients in two test groups. The first component of the array provides the number of the test group, and the second through fifth components provide the temperatures of a patient at hourly intervals. The `Equals` method is called to compare every `Tuple<T1,T2,T3,T4,T5>` object with every other `Tuple<T1,T2,T3,T4,T5>` object. The output illustrates that the `Tuple<T1,T2,T3,T4,T5>.Equals` method returns `true` only when all five components of the `Tuple<T1,T2,T3,T4,T5>` objects have equal values.

_Code sample not included: ~/snippets/csharp/System/TupleT1,T2,T3,T4,T5/Equals/equals1.cs._

## Tuple<T1,T2,T3,T4,T5>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `Tuple<T1,T2,T3,T4,T5>` object.

Returns: A 32-bit signed integer hash code.

To be added.
