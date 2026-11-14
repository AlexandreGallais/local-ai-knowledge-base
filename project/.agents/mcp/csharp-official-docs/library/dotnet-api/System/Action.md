---
title: "Action delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Action.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Action delegate

Namespace: `System`

```csharp
public delegate void Action();
```

Encapsulates a method that has no parameters and does not return a value.

#### Remarks
You can use this delegate to pass a method as a parameter without explicitly declaring a custom delegate. The encapsulated method must correspond to the method signature that is defined by this delegate. This means that the encapsulated method must have no parameters and no return value. (In C#, the method must return `void`. In F# the function or method must return `unit`. In Visual Basic, it must be defined by the `Sub`…`End Sub` construct. It can also be a method that returns a value that is ignored.) Typically, such a method is used to perform an operation.

> **Note:**
> To reference a method that has no parameters and returns a value, use the generic `Func<T>` delegate instead.

When you use the `Action` delegate, you do not have to explicitly define a delegate that encapsulates a parameterless procedure. For example, the following code explicitly declares a delegate named `ShowValue` and assigns a reference to the `Name.DisplayToWindow` instance method to its delegate instance.

_Code sample not included: ~/snippets/csharp/System/Action/Overview/delegate1.cs._

The following example simplifies this code by instantiating the `Action` delegate instead of explicitly defining a new delegate and assigning a named method to it.

_Code sample not included: ~/snippets/csharp/System/Action/Overview/Action.cs._

You can also use the `Action` delegate with anonymous methods in C#, as the following example illustrates. (For an introduction to anonymous methods, see Anonymous Methods.)

_Code sample not included: ~/snippets/csharp/System/Action/Overview/Anon.cs._
You can also assign a lambda expression to an `Action` delegate instance, as the following example illustrates. (For an introduction to lambda expressions, see Lambda Expressions (C#) or Lambda Expressions (F#).)

_Code sample not included: ~/snippets/csharp/System/Action/Overview/Lambda.cs._
