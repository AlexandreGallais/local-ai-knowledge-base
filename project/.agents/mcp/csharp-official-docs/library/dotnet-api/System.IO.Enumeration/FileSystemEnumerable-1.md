---
title: "FileSystemEnumerable<TResult> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Enumeration/FileSystemEnumerable`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemEnumerable<TResult> class

Namespace: `System.IO.Enumeration`

```csharp
public class FileSystemEnumerable<TResult> : System.Collections.Generic.IEnumerable<TResult>
```

Allows utilizing custom filter predicates and transform delegates for enumeration purposes.

Parameters:

- `TResult`: The type that this enumerable encapsulates.

#### Examples

The following example shows how to use the `FileSystemEnumerable<T>` constructor with basic <example-value> options:

_Code sample not included: ~/snippets/csharp/System.IO.Enumeration/FileSystemEnumerableTResult/Overview/Sample1.cs._
## FileSystemEnumerable<TResult>.FileSystemEnumerable(String, FileSystemEnumerable<TResult>+FindTransform, EnumerationOptions) constructor

```csharp
public FileSystemEnumerable (string directory, System.IO.Enumeration.FileSystemEnumerable<TResult>.FindTransform transform, System.IO.EnumerationOptions? options = default);
```

Initializes a new instance of the `FileSystemEnumerable<T>` class with specific search and filtering options.

Parameters:

- `directory`: The path of the directory where the enumeration will be performed.
- `transform`: A delegate method for transforming raw find data into a result.
- `options`: An object describing the enumeration options.

Exceptions:

- `ArgumentNullException`: `directory` or `transform` is `null`.
- `ArgumentException`: The `directory` path is empty.

-or-

`directory` contains a null character "\0".

To be added.

## FileSystemEnumerable<TResult>.ShouldIncludePredicate property

```csharp
public System.IO.Enumeration.FileSystemEnumerable<TResult>.FindPredicate? ShouldIncludePredicate { get; set; }
```

Gets or sets the predicate that can be used to verify if the TResults should be included.

Returns: The include predicate.

To be added.

## FileSystemEnumerable<TResult>.ShouldRecursePredicate property

```csharp
public System.IO.Enumeration.FileSystemEnumerable<TResult>.FindPredicate? ShouldRecursePredicate { get; set; }
```

Gets or sets the predicate that can be used to verify if the TResults should be recursed.

Returns: The recurse predicate.

To be added.

## FileSystemEnumerable<TResult>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<TResult> GetEnumerator ();
```

Retrieves the enumerator for this type of result.

Returns: An enumerator.

To be added.

## FileSystemEnumerable<TResult>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Gets an enumerator that can be used to iterate.

Returns: An enumerator instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `FileSystemEnumerable<T>` instance is cast to an `IEnumerable` interface.
