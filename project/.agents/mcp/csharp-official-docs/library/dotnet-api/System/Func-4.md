---
title: "Func<T1,T2,T3,TResult> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Func`4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Func<T1,T2,T3,TResult> delegate

Namespace: `System`

```csharp
public delegate TResult Func<in T1,in T2,in T3,out TResult>(T1 arg1, T2 arg2, T3 arg3) where T1 : allows ref struct where T2 : allows ref struct where T3 : allows ref struct where TResult : allows ref struct;
```

Encapsulates a method that has three parameters and returns a value of the type specified by the `TResult` parameter.

Parameters:

- `T1`: The type of the first parameter of the method that this delegate encapsulates.
- `T2`: The type of the second parameter of the method that this delegate encapsulates.
- `T3`: The type of the third parameter of the method that this delegate encapsulates.
- `TResult`: The type of the return value of the method that this delegate encapsulates.
- `arg1`: The first parameter of the method that this delegate encapsulates.
- `arg2`: The second parameter of the method that this delegate encapsulates.
- `arg3`: The third parameter of the method that this delegate encapsulates.

Returns: The return value of the method that this delegate encapsulates.

#### Remarks
You can use this delegate to represent a method that can be passed as a parameter without explicitly declaring a custom delegate. The encapsulated method must correspond to the method signature that is defined by this delegate. This means that the encapsulated method must have three parameters, each of which is passed to it by value, and that it must return a value.

> **Note:**
>  To reference a method that has three parameters and returns `void` (`unit` in F#) (or in Visual Basic, that is declared as a `Sub` rather than as a `Function`), use the generic `Action<T1,T2,T3>` delegate instead.

When you use the `Func<T1,T2,T3,T4>` delegate, you do not have to explicitly define a delegate that encapsulates a method with three parameters. For example, the following code explicitly declares a generic delegate named `ParseNumber` and assigns a reference to the `Int32.Parse` method to its delegate instance.

_Code sample not included: ~/snippets/csharp/System/FuncT1,T2,T3,TResult/Overview/Delegate.cs._

The following example simplifies this code by instantiating the `Func<T1,T2,T3,T4>` delegate instead of explicitly defining a new delegate and assigning a named method to it.

_Code sample not included: ~/snippets/csharp/System/FuncT1,T2,T3,TResult/Overview/Func4.cs._

You can use the `Func<T1,T2,T3,T4>` delegate with anonymous methods in C#, as the following example illustrates. (For an introduction to anonymous methods, see Anonymous Methods.)

_Code sample not included: ~/snippets/csharp/System/FuncT1,T2,T3,TResult/Overview/Anon.cs._
You can also assign a lambda expression to a `Func<T1,T2,T3,T4>` delegate, as the following example illustrates. (For an introduction to lambda expressions, see Lambda Expressions (VB), Lambda Expressions (C#) and Lambda Expressions (F#).)

_Code sample not included: ~/snippets/csharp/System/FuncT1,T2,T3,TResult/Overview/Lambda.cs._

The underlying type of a lambda expression is one of the generic `Func` delegates. This makes it possible to pass a lambda expression as a parameter without explicitly assigning it to a delegate. In particular, because many methods of types in the `Linq` namespace have `Func` parameters, you can pass these methods a lambda expression without explicitly instantiating a `Func` delegate.

#### Examples
The following example demonstrates how to declare and use a `Func<T1,T2,T3>` delegate. This example declares a `Func<T1,T2,T3>` variable and assigns it a lambda expression that takes a `String` value and an `Int32` value as parameters. The lambda expression returns `true` if the length of the `String` parameter is equal to the value of the `Int32` parameter. The delegate that encapsulates this method is subsequently used in a query to filter strings in an array of strings.

_Code sample not included: ~/snippets/csharp/System/FuncT1,T2,TResult/Overview/Example.cs._
