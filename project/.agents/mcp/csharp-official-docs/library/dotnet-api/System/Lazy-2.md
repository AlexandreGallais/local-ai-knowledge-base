---
title: "Lazy<T,TMetadata> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Lazy`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Lazy<T,TMetadata> class

Namespace: `System`

```csharp
public class Lazy<T,TMetadata> : Lazy<T>
```

Provides a lazy indirect reference to an object and its associated metadata for use by the Managed Extensibility Framework.

Parameters:

- `T`: The type of the object referenced.
- `TMetadata`: The type of the metadata.

To be added.

## Lazy<T,TMetadata>.Lazy(TMetadata) constructor

```csharp
public Lazy (TMetadata metadata);
```

Initializes a new instance of the `Lazy<T1,T2>` class with the specified metadata.

Parameters:

- `metadata`: The metadata associated with the referenced object.

To be added.

## Lazy<T,TMetadata>.Lazy(Func<T>, TMetadata) constructor

```csharp
public Lazy (Func<T> valueFactory, TMetadata metadata);
```

Initializes a new instance of the `Lazy<T1,T2>` class with the specified metadata that uses the specified function to get the referenced object.

Parameters:

- `valueFactory`: A function that returns the referenced object.
- `metadata`: The metadata associated with the referenced object.

To be added.

## Lazy<T,TMetadata>.Lazy(TMetadata, Boolean) constructor

```csharp
public Lazy (TMetadata metadata, bool isThreadSafe);
```

Initializes a new instance of the `Lazy<T1,T2>` class with the specified metadata and thread safety value.

Parameters:

- `metadata`: The metadata associated with the referenced object.
- `isThreadSafe`: Indicates whether the `Lazy<T1,T2>` object that is created will be thread-safe.

To be added.

## Lazy<T,TMetadata>.Lazy(TMetadata, LazyThreadSafetyMode) constructor

```csharp
public Lazy (TMetadata metadata, System.Threading.LazyThreadSafetyMode mode);
```

Initializes a new instance of the `Lazy<T1,T2>` class with the specified metadata and thread synchronization mode.

Parameters:

- `metadata`: The metadata associated with the referenced object.
- `mode`: The thread synchronization mode.

#### Remarks
See `LazyThreadSafetyMode` for more information on thread synchronization and `Lazy<T1,T2>`.

## Lazy<T,TMetadata>.Lazy(Func<T>, TMetadata, Boolean) constructor

```csharp
public Lazy (Func<T> valueFactory, TMetadata metadata, bool isThreadSafe);
```

Initializes a new instance of the `Lazy<T1,T2>` class with the specified metadata and thread safety value that uses the specified function to get the referenced object.

Parameters:

- `valueFactory`: A function that returns the referenced object.
- `metadata`: The metadata associated with the referenced object.
- `isThreadSafe`: Indicates whether the `Lazy<T1,T2>` object that is created will be thread-safe.

To be added.

## Lazy<T,TMetadata>.Lazy(Func<T>, TMetadata, LazyThreadSafetyMode) constructor

```csharp
public Lazy (Func<T> valueFactory, TMetadata metadata, System.Threading.LazyThreadSafetyMode mode);
```

Initializes a new instance of the `Lazy<T1,T2>` class with the specified metadata and thread synchronization mode that uses the specified function to get the referenced object.

Parameters:

- `valueFactory`: A function that returns the referenced object.
- `metadata`: The metadata associated with the referenced object.
- `mode`: The thread synchronization mode.

#### Remarks
See `LazyThreadSafetyMode` for more information on thread synchronization and `Lazy<T1,T2>`.

## Lazy<T,TMetadata>.Metadata property

```csharp
public TMetadata Metadata { get; }
```

Gets the metadata associated with the referenced object.

Returns: The metadata associated with the referenced object.

To be added.
