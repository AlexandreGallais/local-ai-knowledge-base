---
title: "ConsoleModifiers enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ConsoleModifiers.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleModifiers enum

Namespace: `System`

```csharp
public enum ConsoleModifiers
```

Represents the SHIFT, ALT, and CTRL modifier keys on a keyboard.

#### Remarks
No distinction is made between the left or right SHIFT, ALT, and CTRL keys.

The `ConsoleModifiers` enumeration is used in conjunction with the `ConsoleKeyInfo` type.

#### Examples
The following code example reads a key and determines whether one or more modifier keys was pressed.

_Code sample not included: ~/snippets/csharp/System/Console/ReadKey/rk.cs._

## ConsoleModifiers.Alt field

```csharp
Alt
```

The left or right ALT modifier key.

## ConsoleModifiers.Control field

```csharp
Control
```

The left or right CTRL modifier key.

## ConsoleModifiers.None field

```csharp
None
```

No modifier key.

## ConsoleModifiers.Shift field

```csharp
Shift
```

The left or right SHIFT modifier key.
