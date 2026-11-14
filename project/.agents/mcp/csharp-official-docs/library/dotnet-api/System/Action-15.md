---
title: "Action<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Action`15.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Action<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15> delegate

Namespace: `System`

```csharp
public delegate void Action<in T1,in T2,in T3,in T4,in T5,in T6,in T7,in T8,in T9,in T10,in T11,in T12,in T13,in T14,in T15>(T1 arg1, T2 arg2, T3 arg3, T4 arg4, T5 arg5, T6 arg6, T7 arg7, T8 arg8, T9 arg9, T10 arg10, T11 arg11, T12 arg12, T13 arg13, T14 arg14, T15 arg15) where T1 : allows ref struct where T2 : allows ref struct where T3 : allows ref struct where T4 : allows ref struct where T5 : allows ref struct where T6 : allows ref struct where T7 : allows ref struct where T8 : allows ref struct where T9 : allows ref struct where T10 : allows ref struct where T11 : allows ref struct where T12 : allows ref struct where T13 : allows ref struct where T14 : allows ref struct where T15 : allows ref struct;
```

Encapsulates a method that has 15 parameters and does not return a value.

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
- `T10`: The type of the tenth parameter of the method that this delegate encapsulates.
- `T11`: The type of the eleventh parameter of the method that this delegate encapsulates.
- `T12`: The type of the twelfth parameter of the method that this delegate encapsulates.
- `T13`: The type of the thirteenth parameter of the method that this delegate encapsulates.
- `T14`: The type of the fourteenth parameter of the method that this delegate encapsulates.
- `T15`: The type of the fifteenth parameter of the method that this delegate encapsulates.
- `arg1`: The first parameter of the method that this delegate encapsulates.
- `arg2`: The second parameter of the method that this delegate encapsulates.
- `arg3`: The third parameter of the method that this delegate encapsulates.
- `arg4`: The fourth parameter of the method that this delegate encapsulates.
- `arg5`: The fifth parameter of the method that this delegate encapsulates.
- `arg6`: The sixth parameter of the method that this delegate encapsulates.
- `arg7`: The seventh parameter of the method that this delegate encapsulates.
- `arg8`: The eighth parameter of the method that this delegate encapsulates.
- `arg9`: The ninth parameter of the method that this delegate encapsulates.
- `arg10`: The tenth parameter of the method that this delegate encapsulates.
- `arg11`: The eleventh parameter of the method that this delegate encapsulates.
- `arg12`: The twelfth parameter of the method that this delegate encapsulates.
- `arg13`: The thirteenth parameter of the method that this delegate encapsulates.
- `arg14`: The fourteenth parameter of the method that this delegate encapsulates.
- `arg15`: The fifteenth parameter of the method that this delegate encapsulates.

#### Remarks
You can use the `Action<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15>` delegate to pass a method as a parameter without explicitly declaring a custom delegate. The encapsulated method must correspond to the method signature that is defined by this delegate. This means that the encapsulated method must have 15 parameters that are all passed to it by value, and it must not return a value. (In C#, the method must return `void`. In Visual Basic, it must be defined by the `Sub`…`End Sub` construct. It can also be a method that returns a value that is ignored.) Typically, such a method is used to perform an operation.

> **Note:**
>  To reference a method that has 15 parameters and returns a value, use the generic `Func<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15,T16>` delegate instead.

You can also use the `Action<T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11,T12,T13,T14,T15>` delegate with anonymous methods and lambda expressions.
