---
title: "Array class (part 18 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 18 of 18)

## Array.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Calling this method always throws a `NotSupportedException` exception.

Parameters:

- `value`: The object to be added to the `IList`.

Returns: Adding a value to an array is not supported. No value is returned.

Exceptions:

- `NotSupportedException`: The `IList` has a fixed size.

#### Remarks
Ordinarily, an `IList.Add` implementation adds a member to a collection. However, because arrays have a fixed size (the `IsFixedSize` property always returns `true`), this method always throws a `NotSupportedException` exception.

This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IList` interface.

## Array.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Removes all items from the `IList`.

Exceptions:

- `NotSupportedException`: The `IList` is read-only.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IList` interface.

## Array.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether an element is in the `IList`.

Parameters:

- `value`: The object to locate in the current list. The element to locate can be `null` for reference types.

Returns: `true` if `value` is found in the `IList`; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IList` interface.

## Array.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the `IList`.

Parameters:

- `value`: The object to locate in the current list.

Returns: The index of value if found in the list; otherwise, -1.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IList` interface.

## Array.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item to the `IList` at the specified index.

Parameters:

- `index`: The index at which `value` should be inserted.
- `value`: The object to insert.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList`.
- `NotSupportedException`: The `IList` is read-only.

-or-

The `IList` has a fixed size.
- `NullReferenceException`: `value` is null reference in the `IList`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IList` interface.

## Array.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the `IList`.

Parameters:

- `value`: The object to remove from the `IList`.

Exceptions:

- `NotSupportedException`: The `IList` is read-only.

-or-

The `IList` has a fixed size.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IList` interface.

## Array.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Removes the `IList` item at the specified index.

Parameters:

- `index`: The index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: index is not a valid index in the `IList`.
- `NotSupportedException`: The `IList` is read-only.

-or-

The `IList` has a fixed size.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IList` interface.

## Array.System.Collections.IStructuralComparable.CompareTo(Object, IComparer) method

```csharp
int IStructuralComparable.CompareTo (object other, System.Collections.IComparer comparer);
```

Determines whether the current collection object precedes, occurs in the same position as, or follows another object in the sort order.

Parameters:

- `other`: The object to compare with the current instance.
- `comparer`: An object that compares the current object and `other`.

Returns: An integer that indicates the relationship of the current collection object to other, as shown in the following table.

-  -1

:  The current instance precedes `other`.

-  0

:  The current instance and `other` are equal.

-  1

:  The current instance follows `other`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IStructuralComparable` interface.

## Array.System.Collections.IStructuralEquatable.Equals(Object, IEqualityComparer) method

```csharp
bool IStructuralEquatable.Equals (object other, System.Collections.IEqualityComparer comparer);
```

Determines whether an object is equal to the current instance.

Parameters:

- `other`: The object to compare with the current instance.
- `comparer`: An object that determines whether the current instance and `other` are equal.

Returns: `true` if the two objects are equal; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IStructuralEquatable` interface.

## Array.System.Collections.IStructuralEquatable.GetHashCode(IEqualityComparer) method

```csharp
int IStructuralEquatable.GetHashCode (System.Collections.IEqualityComparer comparer);
```

Returns a hash code for the current instance.

Parameters:

- `comparer`: An object that computes the hash code of the current object.

Returns: The hash code for the current instance.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IStructuralEquatable` interface.

## Array.TrueForAll<T>(T[], Predicate<T>) method

```csharp
public static bool TrueForAll<T> (T[] array, Predicate<T> match);
```

Determines whether every element in the array matches the conditions defined by the specified predicate.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based `Array` to check against the conditions.
- `match`: The predicate that defines the conditions to check against the elements.

Returns: `true` if every element in `array` matches the conditions defined by the specified predicate; otherwise, `false`. If there are no elements in the array, the return value is `true`.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`match` is `null`.

#### Remarks
The `Predicate<T>` is a delegate to a method that returns`true` if the object passed to it matches the conditions defined in the delegate.  The elements of `array` are individually passed to the `Predicate<T>`, and processing is stopped when the delegate returns `false` for any element.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

#### Examples
The following example determines whether the last character of each element in a string array is a number. It creates two string arrays. The first array includes both strings that end with alphabetic characters and strings that end with numeric characters. The second array consists only of strings that end with numeric characters. The example also defines an `EndWithANumber` method whose signature matches the `Predicate<T>` delegate. The example passes each array to the `Array.TrueForAll` method along with a delegate that represents the `EndsWithANumber` method.

_Code sample not included: ~/snippets/csharp/System/Array/TrueForAllT/trueforall2.cs._

The following example is similar to the first, except that it passes the string array to the `Array.TrueForAll` method along with  a lambda expression that determines whether a particular array element ends with the string representation of a number.

_Code sample not included: ~/snippets/csharp/System/Array/TrueForAllT/trueforall1.cs._

In both cases, the `Array.TrueForAll` method returns `false` as soon as it encounters the first array element that does not end in a number. Otherwise, it returns `true` after iterating all the elements in the array.

> **Note:**
> As both examples show, in C# and Visual Basic, it is not necessary to create the `Predicate<string>` delegate (`Predicate(Of String)` in Visual Basic) explicitly. These languages infer the correct delegate from context and create it automatically.
