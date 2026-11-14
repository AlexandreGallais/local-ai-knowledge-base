---
title: "IPAddressCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPAddressCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPAddressCollection class

Namespace: `System.Net.NetworkInformation`

```csharp
public class IPAddressCollection : System.Collections.Generic.ICollection<System.Net.IPAddress>, System.Collections.Generic.IEnumerable<System.Net.IPAddress>
```

Stores a set of `IPAddress` types.

To be added.

## IPAddressCollection.IPAddressCollection() constructor

```csharp
protected internal IPAddressCollection ();
```

Initializes a new instance of the `IPAddressCollection` class.

To be added.

## IPAddressCollection.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of `IPAddress` types in this collection.

Returns: An `Int32` value that contains the number of `IPAddress` types in this collection.

To be added.

## IPAddressCollection.IsReadOnly property

```csharp
public virtual bool IsReadOnly { get; }
```

Gets a value that indicates whether access to this collection is read-only.

Returns: `true` in all cases.

To be added.

## IPAddressCollection.Item property

```csharp
public virtual System.Net.IPAddress this[int index] { get; }
```

Gets the `IPAddress` at the specific index of the collection.

Parameters:

- `index`: The index of interest.

Returns: The `IPAddress` at the specific index in the collection.

To be added.

## IPAddressCollection.Add(IPAddress) method

```csharp
public virtual void Add (System.Net.IPAddress address);
```

Throws a `NotSupportedException` because this operation is not supported for this collection.

Parameters:

- `address`: The object to be added to the collection.

To be added.

## IPAddressCollection.Clear() method

```csharp
public virtual void Clear ();
```

Throws a `NotSupportedException` because this operation is not supported for this collection.

To be added.

## IPAddressCollection.Contains(IPAddress) method

```csharp
public virtual bool Contains (System.Net.IPAddress address);
```

Checks whether the collection contains the specified `IPAddress` object.

Parameters:

- `address`: The `IPAddress` object to be searched in the collection.

Returns: `true` if the `IPAddress` object exists in the collection; otherwise, `false`.

To be added.

## IPAddressCollection.CopyTo(IPAddress[], Int32) method

```csharp
public virtual void CopyTo (System.Net.IPAddress[] array, int offset);
```

Copies the elements in this collection to a one-dimensional array of type `IPAddress`.

Parameters:

- `array`: A one-dimensional array that receives a copy of the collection.
- `offset`: The zero-based index in `array` at which the copy begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in this `IPAddressCollection` is greater than the available space from `offset` to the end of the destination `array`.
- `InvalidCastException`: The elements in this `IPAddressCollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The array parameter must be one-dimensional with zero-based indexing.

## IPAddressCollection.GetEnumerator() method

```csharp
public virtual System.Collections.Generic.IEnumerator<System.Net.IPAddress> GetEnumerator ();
```

Returns an object that can be used to iterate through this collection.

Returns: An object that implements the `IEnumerator` interface and provides access to the `IPAddressCollection` types in this collection.

#### Remarks
The object that is returned by this method is initially positioned before the first element in this collection. You must call the `IEnumerator.MoveNext` method before you can access the first element. To access the element at the current position, call the `Current` property.

Do not modify the collection while using the enumerator. If the collection is modified while an enumerator is in use, an attempt to set the position by calling `IEnumerator.MoveNext` or `IEnumerator.Reset` causes an `InvalidOperationException`.

For a detailed description of enumerators, see the documentation for the `IEnumerator` class and the `IEnumerable.GetEnumerator` method.

## IPAddressCollection.Remove(IPAddress) method

```csharp
public virtual bool Remove (System.Net.IPAddress address);
```

Throws a `NotSupportedException` because this operation is not supported for this collection.

Parameters:

- `address`: The object to be removed.

Returns: Always throws a `NotSupportedException`.

To be added.

## IPAddressCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an object that can be used to iterate through this collection.

Returns: An object that implements the `IEnumerator` interface and provides access to the `IPAddressCollection` types in this collection.

#### Remarks
The object that is returned by this method is initially positioned before the first element in this collection. You must call the `IEnumerator.MoveNext` method before you can access the first element. To access the element at the current position, call the `Current` property.

Do not modify the collection while using the enumerator. If the collection is modified while an enumerator is in use, an attempt to set the position by calling `IEnumerator.MoveNext` or `IEnumerator.Reset` causes an `InvalidOperationException`.

For a detailed description of enumerators, see the documentation for the `IEnumerator` class and the `IEnumerable.GetEnumerator` method.
