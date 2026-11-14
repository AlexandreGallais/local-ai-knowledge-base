---
title: "AsyncLocalValueChangedArgs<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/AsyncLocalValueChangedArgs`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncLocalValueChangedArgs<T> struct

Namespace: `System.Threading`

```csharp
public readonly struct AsyncLocalValueChangedArgs<T>
```

The class that provides data change information to `AsyncLocal<T>` instances that register for change notifications.

Parameters:

- `T`: The type of the data.

#### Remarks
An `AsyncLocal<T>` objects receives change notifications when it is instantiated by calling its `%23ctor` constructor.

## AsyncLocalValueChangedArgs<T>.CurrentValue property

```csharp
public T? CurrentValue { get; }
```

Gets the data's current value.

Returns: The data's current value.

To be added.

## AsyncLocalValueChangedArgs<T>.PreviousValue property

```csharp
public T? PreviousValue { get; }
```

Gets the data's previous value.

Returns: The data's previous value.

To be added.

## AsyncLocalValueChangedArgs<T>.ThreadContextChanged property

```csharp
public bool ThreadContextChanged { get; }
```

Returns a value that indicates whether the value changes because of a change of execution context.

Returns: `true` if the value changed because of a change of execution context; otherwise, `false`.

#### Remarks
The property value is `false` if the `Value` property is changed explicitly.
