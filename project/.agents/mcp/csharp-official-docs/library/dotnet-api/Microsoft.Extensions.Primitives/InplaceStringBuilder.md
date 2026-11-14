---
title: "InplaceStringBuilder struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/InplaceStringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InplaceStringBuilder struct

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public struct InplaceStringBuilder
```

Provides a mechanism for fast, non-allocating string concatenation.

To be added.

## InplaceStringBuilder.InplaceStringBuilder(Int32) constructor

```csharp
public InplaceStringBuilder (int capacity);
```

Initializes a new instance of the `InplaceStringBuilder` class.

Parameters:

- `capacity`: The suggested starting size of the `InplaceStringBuilder` instance.

To be added.

## InplaceStringBuilder.Capacity property

```csharp
public int Capacity { get; set; }
```

Gets the number of characters that the current `InplaceStringBuilder` object can contain.

Returns: To be added.

To be added.

## InplaceStringBuilder.Append(StringSegment) method

```csharp
public void Append (Microsoft.Extensions.Primitives.StringSegment segment);
```

Appends a string segment to the end of the current `InplaceStringBuilder` instance.

Parameters:

- `segment`: The string segment to append.

To be added.

## InplaceStringBuilder.Append(Char) method

```csharp
public void Append (char c);
```

Appends a character to the end of the current `InplaceStringBuilder` instance.

Parameters:

- `c`: The character to append.

To be added.

## InplaceStringBuilder.Append(String) method

```csharp
public void Append (string? value);
```

Appends a string to the end of the current `InplaceStringBuilder` instance.

Parameters:

- `value`: The string to append.

To be added.

## InplaceStringBuilder.Append(String, Int32, Int32) method

```csharp
public void Append (string? value, int offset, int count);
```

Appends a substring to the end of the current `InplaceStringBuilder` instance.

Parameters:

- `value`: The string that contains the substring to append.
- `offset`: The starting position of the substring within value.
- `count`: The number of characters in value to append.

To be added.

## InplaceStringBuilder.ToString() method

```csharp
public override string? ToString ();
```

Converts the value of this instance to a String.

Returns: A string whose value is the same as this instance.

To be added.
