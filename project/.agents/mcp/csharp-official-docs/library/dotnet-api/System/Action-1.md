---
title: "Action<T> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Action`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Action<T> delegate

Namespace: `System`

```csharp
public delegate void Action<in T>(T obj) where T : allows ref struct;
```

Encapsulates a method that has a single parameter and does not return a value.

Parameters:

- `T`: The type of the parameter of the method that this delegate encapsulates.
- `obj`: The parameter of the method that this delegate encapsulates.

#### Remarks
You can use the `Action<T>` delegate to pass a method as a parameter without explicitly declaring a custom delegate. The encapsulated method must correspond to the method signature that is defined by this delegate. This means that the encapsulated method must have one parameter that is passed to it by value, and it must not return a value. (In C#, the method must return `void`. In Visual Basic, it must be defined by the `Sub`…`End Sub` construct. It can also be a method that returns a value that is ignored.) Typically, such a method is used to perform an operation.

> **Note:**
>  To reference a method that has one parameter and returns a value, use the generic `Func<T1,T2>` delegate instead.

When you use the `Action<T>` delegate, you do not have to explicitly define a delegate that encapsulates a method with a single parameter. For example, the following code explicitly declares a delegate named `DisplayMessage` and assigns a reference to either the `Console.WriteLine` method or the `ShowWindowsMessage` method to its delegate instance.

_Code sample not included: ~/snippets/csharp/System/ActionT/Overview/Delegate.cs._

The following example simplifies this code by instantiating the `Action<T>` delegate instead of explicitly defining a new delegate and assigning a named method to it.

_Code sample not included: ~/snippets/csharp/System/ActionT/Overview/Action1.cs._

You can also use the `Action<T>` delegate with anonymous methods in C#, as the following example illustrates. (For an introduction to anonymous methods, see Anonymous Methods.)

_Code sample not included: ~/snippets/csharp/System/ActionT/Overview/Anon.cs._
You can also assign a lambda expression to an `Action<T>` delegate instance, as the following example illustrates. (For an introduction to lambda expressions, see Lambda Expressions.)

_Code sample not included: ~/snippets/csharp/System/ActionT/Overview/Lambda.cs._

The `List<T>.ForEach` and `Array.ForEach` methods each take an `Action<T>` delegate as a parameter. The method encapsulated by the delegate allows you to perform an action on each element in the array or list. The example uses the `List<T>.ForEach` method to provide an illustration.

#### Examples
The following example demonstrates the use of the `Action<T>` delegate to print the contents of a `List<T>` object. In this example, the `Print` method is used to display the contents of the list to the console. In addition, the C# example also demonstrates the use of anonymous methods to display the contents to the console. Note that the example does not explicitly declare an `Action<T>` variable. Instead, it passes a reference to a method that takes a single parameter and that does not return a value to the `List<T>.ForEach` method, whose single parameter is an `Action<T>` delegate. Similarly, in the C# example, an `Action<T>` delegate is not explicitly instantiated because the signature of the anonymous method matches the signature of the `Action<T>` delegate that is expected by the `List<T>.ForEach` method.

_Code sample not included: ~/snippets/csharp/System/ActionT/Overview/action.cs._
