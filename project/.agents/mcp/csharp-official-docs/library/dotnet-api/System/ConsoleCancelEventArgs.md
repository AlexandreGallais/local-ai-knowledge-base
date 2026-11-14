---
title: "ConsoleCancelEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ConsoleCancelEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleCancelEventArgs class

Namespace: `System`

```csharp
public sealed class ConsoleCancelEventArgs : EventArgs
```

Provides data for the `Console.CancelKeyPress` event. This class cannot be inherited.

#### Remarks
A user can interrupt a console application process by simultaneously pressing the `Control` modifier key and the `C` console key (Ctrl+C), or the `Control` modifier key and the Break console key (Ctrl+Break). Consequently, .NET provides a `ConsoleCancelEventArgs` object to the event handler for the `CancelKeyPress` event to specify whether the process should be cancelled.

If the `Cancel` property is set to `true` in the event handler, the process is resumed; otherwise, the process is terminated. By default, the value of the `ConsoleCancelEventArgs` property is `false`, and the process terminates.

#### Examples
The following example demonstrates how to use the `ConsoleCancelEventArgs` class to handle an event.

_Code sample not included: ~/snippets/csharp/System/Console/CancelKeyPress/ckp.cs._

## ConsoleCancelEventArgs.Cancel property

```csharp
public bool Cancel { get; set; }
```

Gets or sets a value that indicates whether simultaneously pressing the `ConsoleModifiers.Control` modifier key and the `ConsoleKey.C` console key (Ctrl+C) or the Ctrl+Break keys terminates the current process. The default is `false`, which terminates the current process.

Returns: `true` if the current process should resume when the event handler concludes; `false` if the current process should terminate. The default value is `false`; the current process terminates when the event handler returns. If `true`, the current process continues.

#### Remarks
The `Cancel` property is automatically initialized to `false` when the handler for the `CancelKeyPress` event is invoked. The value of the `Cancel` property when the event handler finishes determines whether the current process resumes or terminates.

In a set operation after Ctrl+C is pressed, specify `true` to indicate that the current process should resume when the event handler concludes, or `false` to indicate that the current process should terminate.

#### Examples
The following example demonstrates how to use the `Cancel` property to handle an event.

_Code sample not included: ~/snippets/csharp/System/Console/CancelKeyPress/ckp.cs._

## ConsoleCancelEventArgs.SpecialKey <example-value>

```csharp
public ConsoleSpecialKey <example-value> { get; }
```

Gets the combination of modifier and console keys that interrupted the current process.

Returns: One of the enumeration values that specifies the key <example-value> that interrupted the current process. There is no default value.

#### Examples
The following example demonstrates how to use the `SpecialKey` property to handle an event.

_Code sample not included: ~/snippets/csharp/System/Console/CancelKeyPress/ckp.cs._
