---
title: "TypeConverter+StandardValuesCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeConverter+StandardValuesCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeConverter+StandardValuesCollection class

Namespace: `System.ComponentModel`

```csharp
public class TypeConverter.StandardValuesCollection : System.Collections.ICollection
```

Represents a collection of values.

#### Remarks
This is a simple collection class that takes an array of values and converts it to a collection. It is lightweight and is well suited for use in `TypeConverter.GetStandardValues`.

## TypeConverter+StandardValuesCollection.TypeConverter+StandardValuesCollection(ICollection) constructor

```csharp
public StandardValuesCollection (System.Collections.ICollection? values);
```

Initializes a new instance of the `StandardValuesCollection` class.

Parameters:

- `values`: An `ICollection` that represents the objects to put into the collection.

To be added.

## TypeConverter+StandardValuesCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of objects in the collection.

Returns: The number of objects in the collection.

#### Remarks
The `Count` property can be used to set the limits of a loop that iterates through a collection of objects. Since collection is zero-based, be sure to use `Count - 1` as the upper bound of the loop.

## TypeConverter+StandardValuesCollection.Item property

```csharp
public object? this[int index] { get; }
```

Gets the object at the specified index number.

Parameters:

- `index`: The zero-based index of the `Object` to get from the collection.

Returns: The `Object` with the specified index.

#### Remarks
The index number is zero-based. Therefore, you must subtract one from the numerical position of a particular `Object` to access that `Object`. For example, to get the third `Object`, you need to specify `myColl[2]`.

## TypeConverter+StandardValuesCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

For a description of this member, see `ICollection.IsSynchronized`.

Returns: `false` in all cases.

#### Remarks
For speed, the `StandardValuesCollection` is not synchronized. Since it is read-only, there is no need to synchronize it.

## TypeConverter+StandardValuesCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

For a description of this member, see `ICollection.SyncRoot`.

Returns: `null` in all cases.

#### Remarks
The `StandardValuesCollection` is not synchronized.

## TypeConverter+StandardValuesCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the contents of this collection to an array.

Parameters:

- `array`: An `Array` that represents the array to copy to.
- `index`: The index to start from.

#### Remarks
The index number is zero-based. Therefore, you must subtract one from the numerical position of a particular `Object` to access that `Object`. For example, to get the third `Object`, you need to specify `myColl[2]`.

## TypeConverter+StandardValuesCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator for this collection.

Returns: An enumerator of type `IEnumerator`.

To be added.
