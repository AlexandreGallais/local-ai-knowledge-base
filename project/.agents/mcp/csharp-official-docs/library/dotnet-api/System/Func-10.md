---
title: "Func<T1,T2,T3,T4,T5,T6,T7,T8,T9,TResult> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Func`10.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Func<T1,T2,T3,T4,T5,T6,T7,T8,T9,TResult> delegate

Namespace: `System`

```csharp
public delegate TResult Func<in T1,in T2,in T3,in T4,in T5,in T6,in T7,in T8,in T9,out TResult>(T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, T7 arg7, T8 arg8, T9 arg9) where T1 : allows ref struct where T2 : allows ref struct where T3 : allows ref struct where T4 : allows ref struct where T5 : allows ref struct where T6 : allows ref struct where T7 : allows ref struct where T8 : allows ref struct where T9 : allows ref struct where TResult : allows ref struct;
```

Encapsulates a method that has nine parameters and returns a value of the type specified by the `TResult` parameter.

Parameters:

- `T1`: The type of the first parameter of the method that this delegate encapsulates.
- `T2`: The type of the second parameter of the method that this delegate encapsulates.
- `T3`: The type of the third parameter of the method that this delegate encapsulates.
- `T4`: The type of the fourth parameter of the method that this delegate encapsulates.
- `T5`: The type of the fifth parameter of the method that this delegate encapsulates.
- `T6`: The type of the sixth parameter of the method that this delegate encapsulates.
- `T7`: The type of the seventh parameter of the method that this delegate encapsulates.
- `T8`: The type of the eighth parameter of the method that this delegate encapsulates.
- `T9`: The type of the ninth parameter of the method that this delegate encapsulates.
- `TResult`: The type of the return value of the method that this delegate encapsulates.
- `arg1`: The first parameter of the method that this delegate encapsulates.
- `arg2`: The second parameter of the method that this delegate encapsulates.
- `arg3`: The third parameter of the method that this delegate encapsulates.
- `arg4`: The fourth parameter of the method that this delegate encapsulates.
- `arg5`: The fifth parameter of the method that this delegate encapsulates.
- `arg6`: The sixth parameter of the method that this delegate encapsulates.
- `arg7`: The seventh parameter of the method that this delegate encapsulates.
- `arg8`: The eighth parameter of the method that this delegate encapsulates.
- `arg9`: The ninth parameter of the method that this delegate encapsulates.

Returns: The return value of the method that this delegate encapsulates.

#### Remarks
You can use this delegate to represent a method that can be passed as a parameter without explicitly declaring a custom delegate. The encapsulated method must correspond to the method signature that is defined by this delegate. This means that the encapsulated method must have nine parameters, each of which is passed to it by value, and that it must return a value.

> **Note:**
>  To reference a method that has nine parameters and returns `void` (or in Visual Basic, that is declared as a `Sub` rather than as a `Function`), use the generic `Action<T1,T2,T3,T4,T5,T6,T7,T8,T9>` delegate instead.

You can also use the `Func<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10>` delegate with anonymous methods and lambda expressions.

The underlying type of a lambda expression is one of the generic `Func` delegates. This makes it possible to pass a lambda expression as a parameter without explicitly assigning it to a delegate.
