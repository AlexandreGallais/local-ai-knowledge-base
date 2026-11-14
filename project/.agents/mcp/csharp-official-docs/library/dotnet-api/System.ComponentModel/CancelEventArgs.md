---
title: "CancelEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CancelEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CancelEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class CancelEventArgs : EventArgs
```

Provides data for a cancelable event.

#### Remarks
A cancelable event is raised by a component when it is about to perform an action that can be canceled, such as the `Closing` event of a `Form`.

> **Note:**
>  The `Closing` event is deprecated and has been replaced by `FormClosing`. It is offered as an example here only to illustrate the usage of `CancelEventArgs`.

`CancelEventArgs` provides the `Cancel` property to indicate whether the event should be canceled.

#### Examples
The following example uses `CancelEventArgs` and a `CancelEventHandler` to handle the `Closing` event of a `Form`. This code assumes that you have created a `Form` with a class-level `Boolean` variable named `isDataSaved`. It also assumes that you have added a statement to invoke the `OtherInitialize` method from the form's `Load` method or the constructor (after the call to `InitializeComponent`).

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CancelEventArgs/Overview/source.cs._

## CancelEventArgs.CancelEventArgs() constructor

```csharp
public CancelEventArgs ();
```

Initializes a new instance of the `CancelEventArgs` class with the `CancelEventArgs.Cancel` property set to `false`.

To be added.

## CancelEventArgs.CancelEventArgs(Boolean) constructor

```csharp
public CancelEventArgs (bool cancel);
```

Initializes a new instance of the `CancelEventArgs` class with the `CancelEventArgs.Cancel` property set to the given value.

Parameters:

- `cancel`: `true` to cancel the event; otherwise, `false`.

To be added.

## CancelEventArgs.Cancel property

```csharp
public bool Cancel { get; set; }
```

Gets or sets a value indicating whether the event should be canceled.

Returns: `true` if the event should be canceled; otherwise, `false`.

#### Examples
The following example uses `CancelEventArgs` and a `CancelEventHandler` to handle the `FormClosing` event of a `Form`. This code assumes that you have created a `Form` with a class-level `Boolean` variable named `isDataSaved`. It also assumes that you have added a statement to invoke the `OtherInitialize` method from the form's `Load` method or the constructor (after the call to `InitializeComponent`).

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CancelEventArgs/Overview/source.cs._
