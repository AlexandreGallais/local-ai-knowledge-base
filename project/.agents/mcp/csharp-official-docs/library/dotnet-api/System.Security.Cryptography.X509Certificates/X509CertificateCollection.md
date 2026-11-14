---
title: "X509CertificateCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509CertificateCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509CertificateCollection class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public class X509CertificateCollection : System.Collections.CollectionBase
```

Defines a collection that stores `X509Certificate` objects.

To be added.

## X509CertificateCollection.X509CertificateCollection() constructor

```csharp
public X509CertificateCollection ();
```

Initializes a new instance of the `X509CertificateCollection` class.

To be added.

## X509CertificateCollection.X509CertificateCollection(X509Certificate[]) constructor

```csharp
public X509CertificateCollection (System.Security.Cryptography.X509Certificates.X509Certificate[] value);
```

Initializes a new instance of the `X509CertificateCollection` class from an array of `X509Certificate` objects.

Parameters:

- `value`: The array of `X509Certificate` objects with which to initialize the new object.

To be added.

## X509CertificateCollection.X509CertificateCollection(X509CertificateCollection) constructor

```csharp
public X509CertificateCollection (System.Security.Cryptography.X509Certificates.X509CertificateCollection value);
```

Initializes a new instance of the `X509CertificateCollection` class from another `X509CertificateCollection`.

Parameters:

- `value`: The `X509CertificateCollection` with which to initialize the new object.

To be added.

## X509CertificateCollection.Item property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate this[int index] { get; set; }
```

Gets or sets the entry at the specified index of the current `X509CertificateCollection`.

Parameters:

- `index`: The zero-based index of the entry to locate in the current `X509CertificateCollection`.

Returns: The `X509Certificate` at the specified index of the current `X509CertificateCollection`.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` parameter is outside the valid range of indexes for the collection.

To be added.

## X509CertificateCollection.Add(X509Certificate) method

```csharp
public int Add (System.Security.Cryptography.X509Certificates.X509Certificate value);
```

Adds an `X509Certificate` with the specified value to the current `X509CertificateCollection`.

Parameters:

- `value`: The `X509Certificate` to add to the current `X509CertificateCollection`.

Returns: The index into the current `X509CertificateCollection` at which the new `X509Certificate` was inserted.

To be added.

## X509CertificateCollection.AddRange(X509Certificate[]) method

```csharp
public void AddRange (System.Security.Cryptography.X509Certificates.X509Certificate[] value);
```

Copies the elements of an array of type `X509Certificate` to the end of the current `X509CertificateCollection`.

Parameters:

- `value`: The array of type `X509Certificate` containing the objects to add to the current `X509CertificateCollection`.

Exceptions:

- `ArgumentNullException`: The `value` parameter is `null`.

To be added.

## X509CertificateCollection.AddRange(X509CertificateCollection) method

```csharp
public void AddRange (System.Security.Cryptography.X509Certificates.X509CertificateCollection value);
```

Copies the elements of the specified `X509CertificateCollection` to the end of the current `X509CertificateCollection`.

Parameters:

- `value`: The `X509CertificateCollection` containing the objects to add to the collection.

Exceptions:

- `ArgumentNullException`: The `value` parameter is `null`.

To be added.

## X509CertificateCollection.Contains(X509Certificate) method

```csharp
public bool Contains (System.Security.Cryptography.X509Certificates.X509Certificate value);
```

Gets a value indicating whether the current `X509CertificateCollection` contains the specified `X509Certificate`.

Parameters:

- `value`: The `X509Certificate` to locate.

Returns: `true` if the `X509Certificate` is contained in this collection; otherwise, `false`.

To be added.

## X509CertificateCollection.CopyTo(X509Certificate[], Int32) method

```csharp
public void CopyTo (System.Security.Cryptography.X509Certificates.X509Certificate[] array, int index);
```

Copies the `X509Certificate` values in the current `X509CertificateCollection` to a one-dimensional `Array` instance at the specified index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the values copied from `X509CertificateCollection`.
- `index`: The index into `array` to begin copying.

Exceptions:

- `ArgumentException`: The `array` parameter is multidimensional.

-or-

The number of elements in the `X509CertificateCollection` is greater than the available space between `index` and the end of `array`.
- `ArgumentNullException`: The `array` parameter is `null`.
- `ArgumentOutOfRangeException`: The `index` parameter is less than the `array` parameter's lower bound.

To be added.

## X509CertificateCollection.GetEnumerator() method

```csharp
public System.Security.Cryptography.X509Certificates.X509CertificateCollection.X509CertificateEnumerator GetEnumerator ();
```

Returns an enumerator that can iterate through the `X509CertificateCollection`.

Returns: An enumerator of the subelements of `X509CertificateCollection` you can use to iterate through the collection.

To be added.

## X509CertificateCollection.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Builds a hash value based on all values contained in the current `X509CertificateCollection`.

Returns: A hash value based on all values contained in the current `X509CertificateCollection`.

To be added.

## X509CertificateCollection.IndexOf(X509Certificate) method

```csharp
public int IndexOf (System.Security.Cryptography.X509Certificates.X509Certificate value);
```

Returns the index of the specified `X509Certificate` in the current `X509CertificateCollection`.

Parameters:

- `value`: The `X509Certificate` to locate.

Returns: The index of the `X509Certificate` specified by the `value` parameter in the `X509CertificateCollection`, if found; otherwise, -1.

To be added.

## X509CertificateCollection.Insert(Int32, X509Certificate) method

```csharp
public void Insert (int index, System.Security.Cryptography.X509Certificates.X509Certificate value);
```

Inserts a `X509Certificate` into the current `X509CertificateCollection` at the specified index.

Parameters:

- `index`: The zero-based index where `value` should be inserted.
- `value`: The `X509Certificate` to insert.

To be added.

## X509CertificateCollection.OnValidate(Object) method

```csharp
protected override void OnValidate (object value);
```

Performs additional custom processes when validating a value.

Parameters:

- `value`: The object to validate.

To be added.

## X509CertificateCollection.Remove(X509Certificate) method

```csharp
public void Remove (System.Security.Cryptography.X509Certificates.X509Certificate value);
```

Removes a specific `X509Certificate` from the current `X509CertificateCollection`.

Parameters:

- `value`: The `X509Certificate` to remove from the current `X509CertificateCollection`.

Exceptions:

- `ArgumentException`: The `X509Certificate` specified by the `value` parameter is not found in the current `X509CertificateCollection`.

To be added.
