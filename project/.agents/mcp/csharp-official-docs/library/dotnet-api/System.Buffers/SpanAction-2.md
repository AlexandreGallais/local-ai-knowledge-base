---
title: "SpanAction<T,TArg> delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Buffers/SpanAction`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SpanAction<T,TArg> delegate

Namespace: `System.Buffers`

```csharp
public delegate void SpanAction<T,in TArg>(Span<T> span, TArg arg) where TArg : allows ref struct;
```

Encapsulates a method that receives a span of objects of type `T` and a state object of type `TArg`.

Parameters:

- `T`: The type of the objects in the span.
- `TArg`: The type of the object that represents the state.
- `span`: A span of objects of type `T`.
- `arg`: A state object of type `TArg`.

To be added.
