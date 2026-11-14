---
title: "ProgressChangedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ProgressChangedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProgressChangedEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class ProgressChangedEventArgs : EventArgs
```

Provides data for the `BackgroundWorker.ProgressChanged` event.

#### Examples
The following code example shows how to use the `ProgressChangedEventArgs` class. This example is part of a larger example for the `BackgroundWorker` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BackgroundWorker/Overview/fibonacciform.cs._

## ProgressChangedEventArgs.ProgressChangedEventArgs(Int32, Object) constructor

```csharp
public ProgressChangedEventArgs (int progressPercentage, object? userState);
```

Initializes a new instance of the `ProgressChangedEventArgs` class.

Parameters:

- `progressPercentage`: The percentage of an asynchronous task that has been completed.
- `userState`: A unique user state.

To be added.

## ProgressChangedEventArgs.ProgressPercentage property

```csharp
public int ProgressPercentage { get; }
```

Gets the asynchronous task progress percentage.

Returns: A percentage value indicating the asynchronous task progress.

#### Remarks
The `ProgressPercentage` property determines what percentage of an asynchronous task has been completed.

#### Examples
The following code example demonstrates the use of this member. In the example, an event handler reports on the occurrence of the `LoadProgressChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `PictureBox` named `PictureBox1`. Then ensure that the event handler is associated with the `LoadProgressChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._

## ProgressChangedEventArgs.UserState property

```csharp
public object? UserState { get; }
```

Gets a unique user state.

Returns: A unique `Object` indicating the user state.

#### Examples
The following code example demonstrates the use of this member. In the example, an event handler reports on the occurrence of the `LoadProgressChanged` event. This report helps you to learn when the event occurs and can assist you in debugging. To report on multiple events or on events that occur frequently, consider replacing `MessageBox.Show` with `Console.WriteLine` or appending the message to a multiline `TextBox`.

To run the example code, paste it into a project that contains an instance of type `PictureBox` named `PictureBox1`. Then ensure that the event handler is associated with the `LoadProgressChanged` event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/CollectionChangeEventArgs/Overview/EventExamples.cs._
