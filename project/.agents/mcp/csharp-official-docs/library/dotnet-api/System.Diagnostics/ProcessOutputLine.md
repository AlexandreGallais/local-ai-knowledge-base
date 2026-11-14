---
title: "ProcessOutputLine struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessOutputLine.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessOutputLine struct

Namespace: `System.Diagnostics`

```csharp
public readonly struct ProcessOutputLine
```

Represents a single line of text read from a process's standard output or standard error stream.

To be added.

## ProcessOutputLine.ProcessOutputLine(String, Boolean) constructor

```csharp
public ProcessOutputLine (string content, bool standardError);
```

Initializes a new instance of the `ProcessOutputLine` struct.

Parameters:

- `content`: The text content of the output line.
- `standardError`: `true` if the line was read from standard error; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `content` is `null`.

To be added.

## ProcessOutputLine.Content property

```csharp
public string Content { get; }
```

Gets the text content of the output line.

Returns: The text content of the output line, or `null` if the structure is default-initialized.

To be added.

## ProcessOutputLine.StandardError property

```csharp
public bool StandardError { get; }
```

Gets a value that indicates whether the line was read from standard error.

Returns: `true` if the line was read from standard error; otherwise, `false`.

To be added.

## ProcessOutputLine.ToString() method

```csharp
public override string ToString ();
```

Returns the text content of the output line, or `String.Empty` if the structure is default-initialized.

Returns: The value of `ProcessOutputLine.Content`, or `String.Empty` if `ProcessOutputLine.Content` is `null`.

To be added.
