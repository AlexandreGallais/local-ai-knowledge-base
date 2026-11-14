---
title: "Action<T1,T2> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Action`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Action<T1,T2> delegate

Namespace: `System`

```csharp
public delegate void Action<in T1,in T2>(T1 arg1, T2 arg2) where T1 : allows ref struct where T2 : allows ref struct;
```

Encapsulates a method that has two parameters and does not return a value.

Parameters:

- `T1`: The type of the first parameter of the method that this delegate encapsulates.
- `T2`: The type of the second parameter of the method that this delegate encapsulates.
- `arg1`: The first parameter of the method that this delegate encapsulates.
- `arg2`: The second parameter of the method that this delegate encapsulates.

#### Remarks
You can use the `Action<T1,T2>` delegate to pass a method as a parameter without explicitly declaring a custom delegate. The encapsulated method must correspond to the method signature that is defined by this delegate. This means that the encapsulated method must have two parameters that are both passed to it by value, and it must not return a value. (In C#, the method must return `void`. In F#, the method or function must return unit. In Visual Basic, it must be defined by the `Sub`…`End Sub` construct. It can also be a method that returns a value that is ignored.) Typically, such a method is used to perform an operation.

> **Note:**
>  To reference a method that has two parameters and returns a value, use the generic `Func<T1,T2,T3>` delegate instead.

When you use the `Action<T1,T2>` delegate, you do not have to explicitly define a delegate that encapsulates a method with two parameters. For example, the following code explicitly declares a delegate named `ConcatStrings`. It then assigns a reference to either of two methods to its delegate instance. One method writes two strings to the console; the second writes two strings to a file.

_Code sample not included: ~/snippets/csharp/System/ActionT1,T2/Overview/Delegate.cs._

The following example simplifies this code by instantiating the `Action<T1,T2>` delegate instead of explicitly defining a new delegate and assigning a named method to it.

_Code sample not included: ~/snippets/csharp/System/ActionT1,T2/Overview/Action2.cs._

You can also use the `Action<T1,T2>` delegate with anonymous methods in C#, as the following example illustrates. (For an introduction to anonymous methods, see Anonymous Methods.)

_Code sample not included: ~/snippets/csharp/System/ActionT1,T2/Overview/Anon.cs._
You can also assign a lambda expression to an `Action<T1,T2>` delegate instance, as the following example illustrates. (For an introduction to lambda expressions, see Lambda Expressions (C#), or Lambda Expressions (F#).)

_Code sample not included: ~/snippets/csharp/System/ActionT1,T2/Overview/Lambda.cs._
