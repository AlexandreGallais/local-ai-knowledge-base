---
title: "AsnEncodedDataCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsnEncodedDataCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsnEncodedDataCollection class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class AsnEncodedDataCollection : System.Collections.ICollection
```

Represents a collection of `AsnEncodedData` objects. This class cannot be inherited.

#### Remarks
This class implements the `ICollection` interface.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.AsnEncodedDataCollection() constructor

```csharp
public AsnEncodedDataCollection ();
```

Initializes a new instance of the `AsnEncodedDataCollection` class.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.AsnEncodedDataCollection(AsnEncodedData) constructor

```csharp
public AsnEncodedDataCollection (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Initializes a new instance of the `AsnEncodedDataCollection` class and adds an `AsnEncodedData` object to the collection.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` object to add to the collection.

To be added.

## AsnEncodedDataCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of `AsnEncodedData` objects in a collection.

Returns: The number of `AsnEncodedData` objects.

#### Remarks
Use this property to determine how many `AsnEncodedData` objects the collection contains.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value that indicates whether access to the `AsnEncodedDataCollection` object is thread safe.

Returns: `false` in all cases.

#### Remarks
This collection is not thread safe.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.Item property

```csharp
public System.Security.Cryptography.AsnEncodedData this[int index] { get; }
```

Gets an `AsnEncodedData` object from the `AsnEncodedDataCollection` object.

Parameters:

- `index`: The location in the collection.

Returns: An `AsnEncodedData` object.

#### Remarks
Use this method to retrieve an `AsnEncodedData` object from an `AsnEncodedDataCollection` object, if you know its location.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `AsnEncodedDataCollection` object.

Returns: An object used to synchronize access to the `AsnEncodedDataCollection` object.

#### Remarks
`AsnEncodedDataCollection` is not thread safe. Derived classes can provide their own synchronized version of the `AsnEncodedDataCollection` using this property. The synchronizing code must perform operations on the `SyncRoot` property of the `AsnEncodedDataCollection` class, not directly on the class itself. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `AsnEncodedDataCollection` object.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.Add(AsnEncodedData) method

```csharp
public int Add (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Adds an `AsnEncodedData` object to the `AsnEncodedDataCollection` object.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` object to add to the collection.

Returns: The index of the added `AsnEncodedData` object.

Exceptions:

- `ArgumentNullException`: `asnEncodedData` is `null`.
- `CryptographicException`: Neither of the OIDs are `null` and the OIDs do not match.

-or-

One of the OIDs is `null` and the OIDs do not match.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.CopyTo(AsnEncodedData[], Int32) method

```csharp
public void CopyTo (System.Security.Cryptography.AsnEncodedData[] array, int index);
```

Copies the `AsnEncodedDataCollection` object into an array.

Parameters:

- `array`: The array that the `AsnEncodedDataCollection` object is to be copied into.
- `index`: The location where the copy operation starts.

#### Remarks
This method copies the contents of an `OidCollection` object into an array. The copying begins at the specified index location.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.GetEnumerator() method

```csharp
public System.Security.Cryptography.AsnEncodedDataEnumerator GetEnumerator ();
```

Returns an `AsnEncodedDataEnumerator` object that can be used to navigate the `AsnEncodedDataCollection` object.

Returns: An `AsnEncodedDataEnumerator` object.

#### Remarks
The `AsnEncodedDataEnumerator` class implements the `IEnumerator` interface, which allows you to move within a collection.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.Remove(AsnEncodedData) method

```csharp
public void Remove (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Removes an `AsnEncodedData` object from the `AsnEncodedDataCollection` object.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` object to remove.

Exceptions:

- `ArgumentNullException`: `asnEncodedData` is `null`.

#### Examples
The following code example shows how to use the `AsnEncodedDataCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the `AsnEncodedDataCollection` object into an array.

Parameters:

- `array`: The array that the `AsnEncodedDataCollection` object is to be copied into.
- `index`: The location where the copy operation starts.

Exceptions:

- `ArgumentException`: `array` is a multidimensional array, which is not supported by this method.

-or-

The length for `index` is invalid.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: The length for `index` is out of range.

#### Remarks
This method copies the contents of an `AsnEncodedDataCollection` object into an array. The copying begins at the index location specified.

## AsnEncodedDataCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an `AsnEncodedDataEnumerator` object that can be used to navigate the `AsnEncodedDataCollection` object.

Returns: An `AsnEncodedDataEnumerator` object that can be used to navigate the collection.

#### Remarks
The `AsnEncodedDataEnumerator` class implements the `IEnumerator` interface, which allows you to move within a collection.
