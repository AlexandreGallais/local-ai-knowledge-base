---
title: "ImmutableInterlocked class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableInterlocked.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableInterlocked class (part 2 of 2)

## ImmutableInterlocked.Update<T,TArg>(T, Func<T,TArg,T>, TArg) method

```csharp
public static bool Update<T,TArg> (ref T location, Func<T,TArg,T> transformer, TArg transformerArgument) where T : class where TArg : allows ref struct;
```

Mutates a value in-place with optimistic locking transaction semantics             via a specified transformation function.             The transformation is retried as many times as necessary to win the optimistic locking race.

Parameters:

- `T`: The type of data.
- `TArg`: The type of argument passed to the `transformer`.
- `location`: The variable or field to be changed, which may be accessed by multiple threads.
- `transformer`: A function that mutates the value. This function should be side-effect free,              as it may run multiple times when races occur with other threads.
- `transformerArgument`: The argument to pass to `transformer`.

Returns: `true` if the location's value is changed by applying the result of the `transformer` function; `false` if the location's value remained the same because the last invocation of `transformer` returned the existing value.

To be added.
