---
title: "IteratorStateMachineAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/IteratorStateMachineAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IteratorStateMachineAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class IteratorStateMachineAttribute : System.Runtime.CompilerServices.StateMachineAttribute
```

Indicates whether a method in Visual Basic is marked with the `Iterator` modifier.

#### Remarks
You shouldn't apply the `IteratorStateMachine` attribute to methods in your code. For methods in Visual Basic that have the Iterator modifier, the compiler will apply the `IteratorStateMachine` attribute in the IL that it emits.

When a method (*MethodName*) in Visual Basic has the `Iterator` modifier, the compiler emits IL that includes a state machine structure. That structure contains the code in the method. That IL also contains a stub method (*MethodName*) that calls into the state machine. The compiler adds the `IteratorStateMachine` attribute to the stub method so that tools can identify the corresponding state machine. Details of the emitted IL might change in future releases of the compilers.

An iterator method performs a custom iteration over a collection by using the `Yield` (Visual Basic) statement to return each element one at a time.

> **Note:**
>  You can't use `IteratorStateMachineAttribute` to test whether a method is an iterator method in C#.

#### Examples
The following example shows how to determine whether a method is an iterator method. In the example, `IsIteratorMethod` performs the following steps:

- Obtains a `MethodInfo` object for the method name by using `Type.GetMethod`.

- Obtains a `Type` object for the attribute by using GetType Operator.

- Obtains an attribute object for the method and attribute type by using `MethodInfo.GetCustomAttribute`. If `GetCustomAttribute` returns `Nothing` (Visual Basic), the method doesn't contain the attribute.

## IteratorStateMachineAttribute.IteratorStateMachineAttribute(Type) constructor

```csharp
public IteratorStateMachineAttribute (Type stateMachineType);
```

Initializes a new instance of the `IteratorStateMachineAttribute` class.

Parameters:

- `stateMachineType`: The type object for the underlying state machine type that's used to implement a state machine method.

To be added.
