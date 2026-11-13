---
title: "Value tuples"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/value-tuples.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Value tuples

A value tuple is a data structure that has a specific number and sequence of values. .NET provides the following built-in value tuple types:

- The `System.ValueTuple`1` structure represents a value tuple that has one element.
- The `System.ValueTuple`2` structure represents a value tuple that has two elements.-
- The `System.ValueTuple`3` structure represents a value tuple that has three elements.
- The `System.ValueTuple`4` structure represents a value tuple that has four elements.
- The `System.ValueTuple`5` structure represents a value tuple that has five elements.
- The `System.ValueTuple`6` structure represents a value tuple that has six elements.
- The `System.ValueTuple`7` structure represents a value tuple that has seven elements.
- The `System.ValueTuple`8` structure represents a value tuple that has eight or more elements.

The value tuple types differ from the tuple types (such as `System.Tuple`2`) as follows:

- They are structures (value types) rather than classes (reference types).
- Members such as `System.ValueTuple`2.Item1` and   `System.ValueTuple`2.Item2` are fields rather than properties.
- Their fields are mutable rather than read-only.

The value tuple types provide the runtime implementation that supports tuples in C# and struct tuples in F#. In addition to creating a `System.ValueTuple`2` instance by using language syntax, you can call the `System.ValueTuple.Create*` factory method.

## See also

- Tuple types (C# reference)
