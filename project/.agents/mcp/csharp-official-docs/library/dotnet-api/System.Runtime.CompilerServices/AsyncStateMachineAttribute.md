---
title: "AsyncStateMachineAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/AsyncStateMachineAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncStateMachineAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class AsyncStateMachineAttribute : System.Runtime.CompilerServices.StateMachineAttribute
```

Indicates whether a method is marked with either the Async or async modifier.

#### Remarks
You shouldn't apply the `AsyncStateMachine` attribute to methods in your code. For methods that have the async modifier, the compiler will apply the `AsyncStateMachine` attribute in the IL that the compiler emits.

When a method (*MethodName*) has the Async or async modifier, the compiler emits IL that includes a state machine structure. This structure contains the code in the method. That IL also contains a stub method (*MethodName*) that calls into the state machine. The compiler adds the `AsyncStateMachine` attribute to the stub method so that tools can identify the corresponding state machine. Details of the emitted IL might change in future releases of the compilers.

For information about the Async feature, see Asynchronous programming (C#) or Asynchronous programming with Async and Await (Visual Basic).

#### Examples
As the following example shows, you can determine whether a method is marked with Async or async modifier. In the example, `IsAsyncMethod` performs the following steps:

- Obtains a `MethodInfo` object for the method name by using `Type.GetMethod`.

- Obtains a `Type` object for the attribute by using GetType Operator or typeof.

- Obtains an attribute object for the method and attribute type by using `MethodInfo.GetCustomAttribute`. If `GetCustomAttribute` returns `Nothing` (Visual Basic) or `null` (C#), the method doesn't contain the attribute.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/AsyncStateMachineAttribute/Overview/program.cs._

## AsyncStateMachineAttribute.AsyncStateMachineAttribute(Type) constructor

```csharp
public AsyncStateMachineAttribute (Type stateMachineType);
```

Initializes a new instance of the `AsyncStateMachineAttribute` class.

Parameters:

- `stateMachineType`: The type object for the underlying state machine type that's used to implement a state machine method.

To be added.
