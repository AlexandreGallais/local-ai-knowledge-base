---
title: "AsnEncodedDataEnumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsnEncodedDataEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsnEncodedDataEnumerator class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class AsnEncodedDataEnumerator : System.Collections.IEnumerator
```

Provides the ability to navigate through an `AsnEncodedDataCollection` object. This class cannot be inherited.

#### Remarks
This class implements the `IEnumerator` interface.

#### Examples
The following code example shows how to use the `AsnEncodedDataEnumerator` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataEnumerator.Current property

```csharp
public System.Security.Cryptography.AsnEncodedData Current { get; }
```

Gets the current `AsnEncodedData` object in an `AsnEncodedDataCollection` object.

Returns: The current `AsnEncodedData` object in the collection.

#### Remarks
After an enumerator is created, the `AsnEncodedDataEnumerator.MoveNext` method must be called to advance the enumerator to the first element of the collection before reading the value of the `Current` property; otherwise, `AsnEncodedDataEnumerator.Current` returns `null` or throws an exception.

`AsnEncodedDataEnumerator.Current` also returns `null` or throws an exception if the last call to `AsnEncodedDataEnumerator.MoveNext` returns `false`, which indicates that the end of the collection has been reached.

`AsnEncodedDataEnumerator.Current` does not move the position of the enumerator, and consecutive calls to `AsnEncodedDataEnumerator.Current` return the same object until `AsnEncodedDataEnumerator.MoveNext` is called.

#### Examples
The following code example shows how to use the `AsnEncodedDataEnumerator` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the current `AsnEncodedData` object in an `AsnEncodedDataCollection` object.

Returns: The current `AsnEncodedData` object.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `AsnEncodedDataEnumerator` instance is cast to an `IEnumerator` interface.

## AsnEncodedDataEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances to the next `AsnEncodedData` object in an `AsnEncodedDataCollection` object.

Returns: `true`, if the enumerator was successfully advanced to the next element; `false`, if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
After an enumerator is created, it is positioned before the first element of the collection, and the first call to the `AsnEncodedDataEnumerator.MoveNext` method moves the enumerator over the first element of the collection. Subsequent calls to `AsnEncodedDataEnumerator.MoveNext` advance the enumerator past subsequent elements.

After the end of the collection is passed, calls to `AsnEncodedDataEnumerator.MoveNext` return `false`.

An enumerator is valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator becomes invalid and the next call to `AsnEncodedDataEnumerator.MoveNext` can throw an `InvalidOperationException`.

#### Examples
The following code example shows how to use the `AsnEncodedDataEnumerator` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._

## AsnEncodedDataEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets an enumerator to its initial position.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
The initial position of an enumerator is before the first element in the `AsnEncodedDataCollection` object. An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator becomes invalid, and the next call to the `AsnEncodedDataEnumerator.Reset` method throws an `InvalidOperationException`.

#### Examples
The following code example shows how to use the `AsnEncodedDataEnumerator` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsnEncodedData/Overview/asnencodeddata.cs._
