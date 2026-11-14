---
title: "Func<TResult> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Func`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Func<TResult> delegate

Namespace: `System`

```csharp
public delegate TResult Func<out TResult>() where TResult : allows ref struct;
```

Encapsulates a method that has no parameters and returns a value of the type specified by the `TResult` parameter.

Parameters:

- `TResult`: The type of the return value of the method that this delegate encapsulates.

Returns: The return value of the method that this delegate encapsulates.

#### Remarks
You can use this delegate to represent a method that can be passed as a parameter without explicitly declaring a custom delegate. The encapsulated method must correspond to the method signature that is defined by this delegate. This means that the encapsulated method must have no parameters and must return a value.

> **Note:**
>  To reference a method that has no parameters and returns `void` (`unit`, in F#) (or in Visual Basic, that is declared as a `Sub` rather than as a `Function`), use the `Action` delegate instead.

When you use the `Func<T>` delegate, you do not have to explicitly define a delegate that encapsulates a parameterless method. For example, the following code explicitly declares a delegate named `WriteMethod` and assigns a reference to the `OutputTarget.SendToFile` instance method to its delegate instance.

_Code sample not included: ~/snippets/csharp/System/FuncTResult/Overview/Delegate.cs._

The following example simplifies this code by instantiating the `Func<T>` delegate instead of explicitly defining a new delegate and assigning a named method to it.

_Code sample not included: ~/snippets/csharp/System/FuncTResult/Overview/Func1.cs._

You can use the `Func<T>` delegate with anonymous methods in C#, as the following example illustrates. (For an introduction to anonymous methods, see Anonymous Methods.)

_Code sample not included: ~/snippets/csharp/System/FuncTResult/Overview/Anon.cs._
You can also assign a lambda expression to a `Func<T1,T2>` delegate, as the following example illustrates. (For an introduction to lambda expressions, see Lambda Expressions (VB), Lambda Expressions (C#), and Lambda Expressions (F#).)

_Code sample not included: ~/snippets/csharp/System/FuncTResult/Overview/Lambda.cs._

The underlying type of a lambda expression is one of the generic `Func` delegates. This makes it possible to pass a lambda expression as a parameter without explicitly assigning it to a delegate. In particular, because many methods of types in the `Linq` namespace have `Func` parameters, you can pass these methods a lambda expression without explicitly instantiating a `Func` delegate.

If you have an expensive computation that you want to execute only if the result is actually needed, you can assign the expensive function to a `Func<T>` delegate. The execution of the function can then be delayed until a property that accesses the value is used in an expression. The example in the next section demonstrates how to do this.

#### Examples
The following example demonstrates how to use a delegate that takes no parameters. This code creates a generic class named `LazyValue` that has a field of type `Func<T>`. This delegate field can store a reference to any function that returns a value of the type that corresponds to the type parameter of the `LazyValue` object. The `LazyValue` type also has a `Value` property that executes the function (if it has not already been executed) and returns the resulting value.

The example creates two methods and instantiates two `LazyValue` objects with lambda expressions that call these methods. The lambda expressions do not take parameters because they just need to call a method. As the output shows, the two methods are executed only when the value of each `LazyValue` object is retrieved.

_Code sample not included: ~/snippets/csharp/System/FuncTResult/Overview/Example.cs._
