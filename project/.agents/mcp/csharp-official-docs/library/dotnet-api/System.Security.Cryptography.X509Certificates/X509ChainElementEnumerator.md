---
title: "X509ChainElementEnumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ChainElementEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ChainElementEnumerator class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509ChainElementEnumerator : System.Collections.Generic.IEnumerator<System.Security.Cryptography.X509Certificates.X509ChainElement>
```

Supports a simple iteration over an `X509ChainElementCollection`. This class cannot be inherited.

#### Remarks
Enumerators provide read-only access to the data in a collection. Enumerators cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `X509ChainElementEnumerator.Reset` resets the enumerator to this position. At this position, calling `X509ChainElementEnumerator.Current` throws an exception. Therefore, you must call `X509ChainElementEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `X509ChainElementEnumerator.Current`.

This class inherits from `IEnumerator`. See the class for more information about enumerating over a collection.

## X509ChainElementEnumerator.Current property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainElement Current { get; }
```

Gets the current element in the `X509ChainElementCollection`.

Returns: The current element in the `X509ChainElementCollection`.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
`X509ChainElementEnumerator.Current` does not move the position of the enumerator and consecutive calls to `X509ChainElementEnumerator.Current` return the same object until either `X509ChainElementEnumerator.MoveNext` or `X509ChainElementEnumerator.Reset` is called.

## X509ChainElementEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets the current element in the `X509ChainElementCollection`.

Returns: The current element in the `X509ChainElementCollection`.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
`X509ChainElementEnumerator.Current` does not move the position of the enumerator and consecutive calls to `X509ChainElementEnumerator.Current` return the same object until either `X509ChainElementEnumerator.MoveNext` or `X509ChainElementEnumerator.Reset` is called.

## X509ChainElementEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element in the `X509ChainElementCollection`.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
This method advances the enumerator to the next element in the collection. The `X509ChainElementEnumerator` class inherits from `IEnumerator`; see this class for more information on using enumerators.

## X509ChainElementEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the `X509ChainElementCollection`.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying or deleting elements, the enumerator is irrecoverably invalidated and the next call to `X509ChainElementEnumerator.MoveNext` or `X509ChainElementEnumerator.Reset` throws an `InvalidOperationException`.

## X509ChainElementEnumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `X509ChainElementEnumerator` instance is cast to an `IDisposable` interface.
