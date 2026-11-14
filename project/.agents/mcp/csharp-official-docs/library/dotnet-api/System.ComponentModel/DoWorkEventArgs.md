---
title: "DoWorkEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DoWorkEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DoWorkEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class DoWorkEventArgs : System.ComponentModel.CancelEventArgs
```

Provides data for the `BackgroundWorker.DoWork` event handler.

#### Examples
The following code example demonstrates how to use the `DoWorkEventArgs` class to handle the `DoWork` event. For a full code listing, see How to: Run an Operation in the Background.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DoWorkEventArgs/Overview/Form1.cs._

## DoWorkEventArgs.DoWorkEventArgs(Object) constructor

```csharp
public DoWorkEventArgs (object? argument);
```

Initializes a new instance of the `DoWorkEventArgs` class.

Parameters:

- `argument`: Specifies an argument for an asynchronous operation.

To be added.

## DoWorkEventArgs.Argument property

```csharp
public object? Argument { get; }
```

Gets a value that represents the argument of an asynchronous operation.

Returns: An `Object` representing the argument of an asynchronous operation.

#### Examples
The following code example demonstrates how to use the `DoWorkEventArgs` class to handle the `DoWork` event. For a full code listing, see How to: Run an Operation in the Background.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DoWorkEventArgs/Overview/Form1.cs._

## DoWorkEventArgs.Result property

```csharp
public object? Result { get; set; }
```

Gets or sets a value that represents the result of an asynchronous operation.

Returns: An `Object` representing the result of an asynchronous operation.

#### Examples
The following code example demonstrates how to use the `DoWorkEventArgs` class to handle the `DoWork` event. For a full code listing, see How to: Run an Operation in the Background.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DoWorkEventArgs/Overview/Form1.cs._
