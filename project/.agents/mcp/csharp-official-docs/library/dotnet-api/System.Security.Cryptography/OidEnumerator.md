---
title: "OidEnumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/OidEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OidEnumerator class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class OidEnumerator : System.Collections.IEnumerator
```

Provides the ability to navigate through an `OidCollection` object. This class cannot be inherited.

#### Remarks
This class implements the `IEnumerator` interface.

#### Examples
The following code example shows how to use the `OidEnumerator` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidEnumerator.Current property

```csharp
public System.Security.Cryptography.Oid Current { get; }
```

Gets the current `Oid` object in an `OidCollection` object.

Returns: The current `Oid` object in the collection.

#### Remarks
After an enumerator is created, the `OidEnumerator.MoveNext` method must be called to advance the enumerator to the first element of the collection before reading the value of the `Current` property; otherwise, `OidEnumerator.Current` returns `null` or throws an exception.

`OidEnumerator.Current` also returns `null` or throws an exception if the last call to `OidEnumerator.MoveNext` returns `false`, which indicates that the end of the collection has been reached.

`OidEnumerator.Current` does not move the position of the enumerator, and consecutive calls to `OidEnumerator.Current` return the same object, until `OidEnumerator.MoveNext` is called.

#### Examples
The following code example shows how to use the `OidEnumerator` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the current `Oid` object in an `OidCollection` object.

Returns: The current `Oid` object.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `OidEnumerator` instance is cast to an `IEnumerator` interface.

## OidEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances to the next `Oid` object in an `OidCollection` object.

Returns: `true`, if the enumerator was successfully advanced to the next element; `false`, if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
After an enumerator is created, it is positioned before the first element of the collection, and the first call to the `OidEnumerator.MoveNext` method moves the enumerator over the first element of the collection. Subsequent calls to `OidEnumerator.MoveNext` advances the enumerator past subsequent items in the collection.

After the end of the collection is passed, calls to `OidEnumerator.MoveNext` return `false`.

An enumerator is valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator becomes invalid and the next call to `OidEnumerator.MoveNext` throws an `InvalidOperationException`.

#### Examples
The following code example shows how to use the `OidEnumerator` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets an enumerator to its initial position.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
The initial position of an enumerator is before the first element in the `OidCollection` object. An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator becomes invalid and the next call to the `OidEnumerator.Reset` method throws an `InvalidOperationException`.

#### Examples
The following code example shows how to use the `OidEnumerator` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._
