---
title: "UnicastIPAddressInformationCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/UnicastIPAddressInformationCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnicastIPAddressInformationCollection class

Namespace: `System.Net.NetworkInformation`

```csharp
public class UnicastIPAddressInformationCollection : System.Collections.Generic.ICollection<System.Net.NetworkInformation.UnicastIPAddressInformation>, System.Collections.Generic.IEnumerable<System.Net.NetworkInformation.UnicastIPAddressInformation>
```

Stores a set of `UnicastIPAddressInformation` types.

To be added.

## UnicastIPAddressInformationCollection.UnicastIPAddressInformationCollection() constructor

```csharp
protected internal UnicastIPAddressInformationCollection ();
```

Initializes a new instance of the `UnicastIPAddressInformationCollection` class.

To be added.

## UnicastIPAddressInformationCollection.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of `UnicastIPAddressInformation` types in this collection.

Returns: An `Int32` value that contains the number of `UnicastIPAddressInformation` types in this collection.

To be added.

## UnicastIPAddressInformationCollection.IsReadOnly property

```csharp
public virtual bool IsReadOnly { get; }
```

Gets a value that indicates whether access to this collection is read-only.

Returns: `true` in all cases.

To be added.

## UnicastIPAddressInformationCollection.Item property

```csharp
public virtual System.Net.NetworkInformation.UnicastIPAddressInformation this[int index] { get; }
```

Gets the `UnicastIPAddressInformation` instance at the specified index in the collection.

Parameters:

- `index`: The zero-based index of the element.

Returns: The `UnicastIPAddressInformation` at the specified location.

To be added.

## UnicastIPAddressInformationCollection.Add(UnicastIPAddressInformation) method

```csharp
public virtual void Add (System.Net.NetworkInformation.UnicastIPAddressInformation address);
```

Throws a `NotSupportedException` because this operation is not supported for this collection.

Parameters:

- `address`: The object to be added to the collection.

To be added.

## UnicastIPAddressInformationCollection.Clear() method

```csharp
public virtual void Clear ();
```

Throws a `NotSupportedException` because this operation is not supported for this collection.

To be added.

## UnicastIPAddressInformationCollection.Contains(UnicastIPAddressInformation) method

```csharp
public virtual bool Contains (System.Net.NetworkInformation.UnicastIPAddressInformation address);
```

Checks whether the collection contains the specified `UnicastIPAddressInformation` object.

Parameters:

- `address`: The `UnicastIPAddressInformation` object to be searched in the collection.

Returns: `true` if the `UnicastIPAddressInformation` object exists in the collection; otherwise, `false`.

To be added.

## UnicastIPAddressInformationCollection.CopyTo(UnicastIPAddressInformation[], Int32) method

```csharp
public virtual void CopyTo (System.Net.NetworkInformation.UnicastIPAddressInformation[] array, int offset);
```

Copies the elements in this collection to a one-dimensional array of type `UnicastIPAddressInformation`.

Parameters:

- `array`: A one-dimensional array that receives a copy of the collection.
- `offset`: The zero-based index in `array` at which the copy begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in this `UnicastIPAddressInformationCollection` is greater than the available space from `offset` to the end of the destination `array`.
- `InvalidCastException`: The elements in this `UnicastIPAddressInformationCollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The array parameter must be one-dimensional with zero-based indexing.

## UnicastIPAddressInformationCollection.GetEnumerator() method

```csharp
public virtual System.Collections.Generic.IEnumerator<System.Net.NetworkInformation.UnicastIPAddressInformation> GetEnumerator ();
```

Returns an object that can be used to iterate through this collection.

Returns: An object that implements the `IEnumerator` interface and provides access to the `UnicastIPAddressInformation` types in this collection.

#### Remarks
The object that is returned by this method is initially positioned before the first element in this collection. You must call the `IEnumerator.MoveNext` method before you can access the first element. To access the element at the current position, call the `Current` property.

Do not modify the collection while using the enumerator. If the collection is modified while an enumerator is in use, an attempt to set the position by calling `IEnumerator.MoveNext` or `IEnumerator.Reset` causes an `InvalidOperationException`.

For a detailed description of enumerators, see the documentation for the `IEnumerator` class and the `IEnumerable.GetEnumerator` method.

## UnicastIPAddressInformationCollection.Remove(UnicastIPAddressInformation) method

```csharp
public virtual bool Remove (System.Net.NetworkInformation.UnicastIPAddressInformation address);
```

Throws a `NotSupportedException` because the collection is read-only and elements cannot be removed.

Parameters:

- `address`: The object to be removed.

Returns: Always throws a `NotSupportedException`.

To be added.

## UnicastIPAddressInformationCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an object that can be used to iterate through this collection.

Returns: An object that implements the `IEnumerator` interface and provides access to the `UnicastIPAddressInformation` types in this collection.

#### Remarks
The object that is returned by this method is initially positioned before the first element in this collection. You must call the `IEnumerator.MoveNext` method before you can access the first element. To access the element at the current position, call the `Current` property.

Do not modify the collection while using the enumerator. If the collection is modified while an enumerator is in use, an attempt to set the position by calling `IEnumerator.MoveNext` or `IEnumerator.Reset` causes an `InvalidOperationException`.

For a detailed description of enumerators, see the documentation for the `IEnumerator` class and the `IEnumerable.GetEnumerator` method.
