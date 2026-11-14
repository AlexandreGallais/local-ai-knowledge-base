---
title: "FileSystemEnumerator<TResult> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Enumeration/FileSystemEnumerator`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemEnumerator<TResult> class

Namespace: `System.IO.Enumeration`

```csharp
public abstract class FileSystemEnumerator<TResult> : System.Runtime.ConstrainedExecution.CriticalFinalizerObject, System.Collections.Generic.IEnumerator<TResult>
```

Enumerates the file system elements of the provided type that are being searched and filtered by a `FileSystemEnumerable<T>`.

Parameters:

- `TResult`: The type of the result produced by this file system enumerator.

To be added.

## FileSystemEnumerator<TResult>.FileSystemEnumerator(String, EnumerationOptions) constructor

```csharp
public FileSystemEnumerator (string directory, System.IO.EnumerationOptions? options = default);
```

Encapsulates a find operation.

Parameters:

- `directory`: The directory to search in.
- `options`: Enumeration options to use.

To be added.

## FileSystemEnumerator<TResult>.Current property

```csharp
public TResult Current { get; }
```

Gets the currently visited element.

Returns: The currently visited element.

To be added.

## FileSystemEnumerator<TResult>.System.Collections.IEnumerator.Current property

```csharp
object? System.Collections.IEnumerator.Current { get; }
```

Gets the currently visited object.

Returns: The currently visited object.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `FileSystemEnumerator<T>` instance is cast to an `IEnumerator` interface.

## FileSystemEnumerator<TResult>.ContinueOnError(Int32) method

```csharp
protected virtual bool ContinueOnError (int error);
```

When overriden in a derived class, returns a value that indicates whether to continue execution or throw the default exception.

Parameters:

- `error`: The native error code.

Returns: `true` to continue; `false` to throw the default exception for the given error.

To be added.

## FileSystemEnumerator<TResult>.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by the current instance of the `FileSystemEnumerator<T>` class.

To be added.

## FileSystemEnumerator<TResult>.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

When overridden in a derived class, releases the unmanaged resources used by the `FileSystemEnumerator<T>` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## FileSystemEnumerator<TResult>.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next item of the `FileSystemEnumerator<T>`.

Returns: `true` if the enumerator successfully advanced to the next item; `false` if the end of the enumerator has been passed.

To be added.

## FileSystemEnumerator<TResult>.OnDirectoryFinished(Char>) method

```csharp
protected virtual void OnDirectoryFinished (ReadOnlySpan<char> directory);
```

When overriden in a derived class, this method is called whenever the end of a directory is reached.

Parameters:

- `directory`: The directory path as a read-only span.

To be added.

## FileSystemEnumerator<TResult>.Reset() method

```csharp
public void Reset ();
```

Always throws `NotSupportedException`.

#### Remarks

As described in the remarks for `IEnumerator`, the `Reset` method is provided for COM interoperability and does not need to be fully implemented; instead, the implementer can throw a `NotSupportedException`.

## FileSystemEnumerator<TResult>.ShouldIncludeEntry(FileSystemEntry) method

```csharp
protected virtual bool ShouldIncludeEntry (ref System.IO.Enumeration.FileSystemEntry entry);
```

When overridden in a derived class, determines whether the specified file system entry should be included in the results.

Parameters:

- `entry`: A file system entry reference.

Returns: `true` if the specified file system entry should be included in the results; otherwise, `false`.

To be added.

## FileSystemEnumerator<TResult>.ShouldRecurseIntoEntry(FileSystemEntry) method

```csharp
protected virtual bool ShouldRecurseIntoEntry (ref System.IO.Enumeration.FileSystemEntry entry);
```

When overridden in a derived class, determines whether the specified file system entry should be recursed.

Parameters:

- `entry`: A file system entry reference.

Returns: `true` if the specified directory entry should be recursed into; otherwise, `false`.

To be added.

## FileSystemEnumerator<TResult>.TransformEntry(FileSystemEntry) method

```csharp
protected abstract TResult TransformEntry (ref System.IO.Enumeration.FileSystemEntry entry);
```

When overridden in a derived class, generates the result type from the current entry.

Parameters:

- `entry`: A file system entry reference.

Returns: The result type from the current entry.

To be added.
