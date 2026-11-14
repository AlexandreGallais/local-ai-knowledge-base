---
title: "ConsoleSpecialKey enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ConsoleSpecialKey.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleSpecialKey enum

Namespace: `System`

```csharp
public enum ConsoleSpecialKey
```

Specifies combinations of modifier and console keys that can interrupt the current process.

#### Remarks
The `SpecialKey` property returns the `ConsoleSpecialKey` enumeration type.

Simultaneously pressing certain key <example-value> signals the operating system to interrupt the currently running process. The two valid key <example-value> are `Control` plus BREAK (CTRL+BREAK) and `Control` plus `C` (Ctrl+C).

#### Examples
The following code example displays the `ConsoleSpecialKey` value that invokes the associated event handler.

_Code sample not included: ~/snippets/csharp/System/Console/CancelKeyPress/ckp.cs._

## ConsoleSpecialKey.ControlBreak field

```csharp
ControlBreak
```

The `ConsoleModifiers.Control` modifier key plus the BREAK console key.

## ConsoleSpecialKey.ControlC field

```csharp
ControlC
```

The `ConsoleModifiers.Control` modifier key plus the `ConsoleKey.C` console key.
