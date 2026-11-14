---
title: "RunePosition struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/RunePosition.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RunePosition struct

Namespace: `System.Text`

```csharp
public readonly struct RunePosition : IEquatable<System.Text.RunePosition>
```

To be added.

To be added.

## RunePosition.RunePosition(Rune, Int32, Int32, Boolean) constructor

```csharp
public RunePosition (System.Text.Rune rune, int startIndex, int length, bool wasReplaced);
```

To be added.

Parameters:

- `rune`: To be added.
- `startIndex`: To be added.
- `length`: To be added.
- `wasReplaced`: To be added.

To be added.

## RunePosition.Length property

```csharp
public int Length { get; }
```

To be added.

Returns: To be added.

To be added.

## RunePosition.Rune property

```csharp
public System.Text.Rune Rune { get; }
```

To be added.

Returns: To be added.

To be added.

## RunePosition.StartIndex property

```csharp
public int StartIndex { get; }
```

To be added.

Returns: To be added.

To be added.

## RunePosition.WasReplaced property

```csharp
public bool WasReplaced { get; }
```

To be added.

Returns: To be added.

To be added.

## RunePosition.Deconstruct(Rune, Int32) method

```csharp
public void Deconstruct (out System.Text.Rune rune, out int startIndex);
```

To be added.

Parameters:

- `rune`: To be added.
- `startIndex`: To be added.

To be added.

## RunePosition.Deconstruct(Rune, Int32, Int32) method

```csharp
public void Deconstruct (out System.Text.Rune rune, out int startIndex, out int length);
```

To be added.

Parameters:

- `rune`: To be added.
- `startIndex`: To be added.
- `length`: To be added.

To be added.

## RunePosition.EnumerateUtf16(Char>) method

```csharp
public static System.Text.RunePosition.Utf16Enumerator EnumerateUtf16 (ReadOnlySpan<char> span);
```

To be added.

Parameters:

- `span`: To be added.

Returns: To be added.

To be added.

## RunePosition.EnumerateUtf8(Byte>) method

```csharp
public static System.Text.RunePosition.Utf8Enumerator EnumerateUtf8 (ReadOnlySpan<byte> span);
```

To be added.

Parameters:

- `span`: To be added.

Returns: To be added.

To be added.

## RunePosition.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

To be added.

Parameters:

- `obj`: To be added.

Returns: To be added.

To be added.

## RunePosition.Equals(RunePosition) method

```csharp
public bool Equals (System.Text.RunePosition other);
```

To be added.

Parameters:

- `other`: To be added.

Returns: To be added.

To be added.

## RunePosition.GetHashCode() method

```csharp
public override int GetHashCode ();
```

To be added.

Returns: To be added.

To be added.

## RunePosition.op_Equality(RunePosition, RunePosition) method

```csharp
public static bool operator == (System.Text.RunePosition left, System.Text.RunePosition right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.

## RunePosition.op_Inequality(RunePosition, RunePosition) method

```csharp
public static bool operator != (System.Text.RunePosition left, System.Text.RunePosition right);
```

To be added.

Parameters:

- `left`: To be added.
- `right`: To be added.

Returns: To be added.

To be added.
