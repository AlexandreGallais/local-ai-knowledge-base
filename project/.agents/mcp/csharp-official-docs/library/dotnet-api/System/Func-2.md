---
title: "Func<T,TResult> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Func`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Func<T,TResult> delegate

Namespace: `System`

```csharp
public delegate TResult Func<in T,out TResult>(T arg) where T : allows ref struct where TResult : allows ref struct;
```

Encapsulates a method that has one parameter and returns a value of the type specified by the `TResult` parameter.

Parameters:

- `T`: The type of the parameter of the method that this delegate encapsulates.
- `TResult`: The type of the return value of the method that this delegate encapsulates.
- `arg`: The parameter of the method that this delegate encapsulates.

Returns: The return value of the method that this delegate encapsulates.

#### Remarks
You can use this delegate to represent a method that can be passed as a parameter without explicitly declaring a custom delegate. The encapsulated method must correspond to the method signature that is defined by this delegate. This means that the encapsulated method must have one parameter that is passed to it by value, and that it must return a value.

> **Note:**
>  To reference a method that has one parameter and returns `void` (or in Visual Basic, that is declared as a `Sub` rather than as a `Function`), use the generic `Action<T>` delegate instead.

When you use the `Func<T1,T2>` delegate, you do not have to explicitly define a delegate that encapsulates a method with a single parameter. For example, the following code explicitly declares a delegate named `ConvertMethod` and assigns a reference to the `UppercaseString` method to its delegate instance.

_Code sample not included: ~/snippets/csharp/System/FuncT,TResult/Overview/Delegate.cs._

The following example simplifies this code by instantiating the `Func<T1,T2>` delegate instead of explicitly defining a new delegate and assigning a named method to it.

_Code sample not included: ~/snippets/csharp/System/FuncT,TResult/Overview/Func2_1.cs._

You can also use the `Func<T1,T2>` delegate with anonymous methods in C#, as the following example illustrates. (For an introduction to anonymous methods, see Anonymous Methods.)

_Code sample not included: ~/snippets/csharp/System/FuncT,TResult/Overview/Anon.cs._
You can also assign a lambda expression to a `Func<T1,T2>` delegate, as the following example illustrates. (For an introduction to lambda expressions, see Lambda Expressions (VB), Lambda Expressions (C#) and Lambda Expressions (F#).)

_Code sample not included: ~/snippets/csharp/System/FuncT,TResult/Overview/Lambda.cs._

The underlying type of a lambda expression is one of the generic `Func` delegates. This makes it possible to pass a lambda expression as a parameter without explicitly assigning it to a delegate. In particular, because many methods of types in the `Linq` namespace have `Func<T1,T2>` parameters, you can pass these methods a lambda expression without explicitly instantiating a `Func<T1,T2>` delegate.

#### Examples
The following example demonstrates how to declare and use a `Func<T1,T2>` delegate. This example declares a `Func<T1,T2>` variable and assigns it a lambda expression that converts the characters in a string to uppercase. The delegate that encapsulates this method is subsequently passed to the `Enumerable.Select` method to change the strings in an array of strings to uppercase.

_Code sample not included: ~/snippets/csharp/System/FuncT,TResult/Overview/Example.cs._
