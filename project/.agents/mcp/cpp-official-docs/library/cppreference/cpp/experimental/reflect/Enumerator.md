# std::experimental::reflect::Enumerator

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept Enumerator = Typed<T> && ScopeMember<T> && /* see below */;` | (reflection TS) |

The `Enumerator` concept is satisfied if and only if T reflects an enumerator (Note: The `Scope` of an `Enumerator` is its type also for enumerations that are unscoped enumeration types).

### Example

This section is incomplete Reason: examples

### See also

This section is incomplete Reason: templatization
