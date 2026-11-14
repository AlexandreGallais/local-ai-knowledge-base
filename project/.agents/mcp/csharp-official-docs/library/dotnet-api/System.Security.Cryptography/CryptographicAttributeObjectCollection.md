---
title: "CryptographicAttributeObjectCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptographicAttributeObjectCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptographicAttributeObjectCollection class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CryptographicAttributeObjectCollection : System.Collections.ICollection
```

Contains a set of `CryptographicAttributeObject` objects.

#### Examples
`CryptographicAttributeObject`

## CryptographicAttributeObjectCollection.CryptographicAttributeObjectCollection() constructor

```csharp
public CryptographicAttributeObjectCollection ();
```

Initializes a new instance of the `CryptographicAttributeObjectCollection` class.

To be added.

## CryptographicAttributeObjectCollection.CryptographicAttributeObjectCollection(CryptographicAttributeObject) constructor

```csharp
public CryptographicAttributeObjectCollection (System.Security.Cryptography.CryptographicAttributeObject attribute);
```

Initializes a new instance of the `CryptographicAttributeObjectCollection` class, adding a specified `CryptographicAttributeObject` to the collection.

Parameters:

- `attribute`: A `CryptographicAttributeObject` object that is added to the collection.

To be added.

## CryptographicAttributeObjectCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of items in the collection.

Returns: The number of items in the collection.

To be added.

## CryptographicAttributeObjectCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value that indicates whether access to the collection is synchronized, or thread safe.

Returns: `true` if access to the collection is thread safe; otherwise `false`.

#### Remarks
This property always returns `false`, which means that the collection is not thread safe.

## CryptographicAttributeObjectCollection.Item property

```csharp
public System.Security.Cryptography.CryptographicAttributeObject this[int index] { get; }
```

Gets the `CryptographicAttributeObject` object at the specified index in the collection.

Parameters:

- `index`: An `Int32` value that represents the zero-based index of the `CryptographicAttributeObject` object to retrieve.

Returns: The `CryptographicAttributeObject` object at the specified index.

To be added.

## CryptographicAttributeObjectCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an `Object` object used to synchronize access to the collection.

Returns: An `Object` object used to synchronize access to the `CryptographicAttributeObjectCollection` collection.

To be added.

## CryptographicAttributeObjectCollection.Add(AsnEncodedData) method

```csharp
public int Add (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Adds the specified `AsnEncodedData` object to the collection.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` object to add to the collection.

Returns: `true` if the method returns the zero-based index of the added item; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `asnEncodedData` is `null`.
- `CryptographicException`: A cryptographic operation could not be completed.

To be added.

## CryptographicAttributeObjectCollection.Add(CryptographicAttributeObject) method

```csharp
public int Add (System.Security.Cryptography.CryptographicAttributeObject attribute);
```

Adds the specified `CryptographicAttributeObject` object to the collection.

Parameters:

- `attribute`: The `CryptographicAttributeObject` object to add to the collection.

Returns: `true` if the method returns the zero-based index of the added item; otherwise, `false`.

Exceptions:

- `CryptographicException`: A cryptographic operation could not be completed.
- `InvalidOperationException`: The specified item already exists in the collection.

#### Examples
`CryptographicAttributeObjectCollection.Remove`

## CryptographicAttributeObjectCollection.CopyTo(CryptographicAttributeObject[], Int32) method

```csharp
public void CopyTo (System.Security.Cryptography.CryptographicAttributeObject[] array, int index);
```

Copies the `CryptographicAttributeObjectCollection` collection to an array of `CryptographicAttributeObject` objects.

Parameters:

- `array`: An array of `CryptographicAttributeObject` objects that the collection is copied to.
- `index`: The zero-based index in `array` to which the collection is to be copied.

Exceptions:

- `ArgumentException`: One of the arguments provided to a method was not valid.
- `ArgumentNullException`: `null` was passed to a method that does not accept it as a valid argument.
- `ArgumentOutOfRangeException`: The value of an argument was outside the allowable range of values as defined by the called method.

To be added.

## CryptographicAttributeObjectCollection.GetEnumerator() method

```csharp
public System.Security.Cryptography.CryptographicAttributeObjectEnumerator GetEnumerator ();
```

Gets a `CryptographicAttributeObjectEnumerator` object for the collection.

Returns: `true` if the method returns a `CryptographicAttributeObjectEnumerator` object that can be used to enumerate the collection; otherwise, `false`.

To be added.

## CryptographicAttributeObjectCollection.Remove(CryptographicAttributeObject) method

```csharp
public void Remove (System.Security.Cryptography.CryptographicAttributeObject attribute);
```

Removes the specified `CryptographicAttributeObject` object from the collection.

Parameters:

- `attribute`: The `CryptographicAttributeObject` object to remove from the collection.

Exceptions:

- `ArgumentNullException`: `attribute` is `null`.

To be added.

## CryptographicAttributeObjectCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of this `CryptographicAttributeObjectCollection` collection to an `Array` array, starting at a particular index.

Parameters:

- `array`: The one-dimensional `Array` array that is the destination of the elements copied from this `CryptographicAttributeObjectCollection`. The `Array` array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## CryptographicAttributeObjectCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the `CryptographicAttributeObjectCollection` collection.

Returns: An `IEnumerator` object that can be used to iterate through the `CryptographicAttributeObjectCollection` collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `CryptographicAttributeObjectCollection` instance is cast to an `IEnumerable` interface.
