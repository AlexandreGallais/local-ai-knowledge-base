---
title: "Pipe class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipelines/Pipe.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Pipe class

Namespace: `System.IO.Pipelines`

```csharp
public sealed class Pipe
```

The default `PipeWriter` and `PipeReader` implementation.

To be added.

## Pipe.Pipe() constructor

```csharp
public Pipe ();
```

Initializes a new instance of the `Pipe` class using `PipeOptions.Default` as options.

To be added.

## Pipe.Pipe(PipeOptions) constructor

```csharp
public Pipe (System.IO.Pipelines.PipeOptions options);
```

Initializes a new instance of the `Pipe` class with the specified options.

Parameters:

- `options`: The set of options for this pipe.

To be added.

## Pipe.Reader property

```csharp
public System.IO.Pipelines.PipeReader Reader { get; }
```

Gets the `PipeReader` for this pipe.

Returns: A `PipeReader` instance for this pipe.

To be added.

## Pipe.Writer property

```csharp
public System.IO.Pipelines.PipeWriter Writer { get; }
```

Gets the `PipeWriter` for this pipe.

Returns: A `PipeWriter` instance for this pipe.

To be added.

## Pipe.Reset() method

```csharp
public void Reset ();
```

Resets the pipe.

To be added.
