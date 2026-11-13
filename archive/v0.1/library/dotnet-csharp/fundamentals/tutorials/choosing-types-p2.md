---
title: "Tutorial: Choose between tuples, records, structs, and classes (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/choosing-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Choose between tuples, records, structs, and classes (part 2 of 2)

## Quick decision guide

Use this table as a starting point when you aren't sure which type to pick:

| Question                                        | Best fit      |
|-------------------------------------------------|---------------|
| Returning a few values from one method?         | Tuple         |
| Immutable data where equality is by values?     | Record class  |
| Small, copyable value data with equality?       | Record struct |
| Mutable state, behavior, or reference identity? | Class         |
| Specialized version of an existing class?       | Derived class |
| Shared capability across unrelated types?       | Interface     |

If none of these fit neatly, consider combining types. For example, a class can implement an interface, and a record can be a struct. For the full comparison, see Choose which kind of type.

## Related content

- Tuple types
- Records
- Structure types
- Classes, structs, and records
- Interfaces
- Choose which kind of type
