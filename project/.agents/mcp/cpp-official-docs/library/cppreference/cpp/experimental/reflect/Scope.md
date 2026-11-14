# std::experimental::reflect::Scope

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept Scope = Object<T> && /* see below */;` | (reflection TS) |

The `Scope` concept is satisfied if and only if `T` reflects a namespace (including the global namespace), class, enumeration, function, or closure-type (Note: Any such `T` that does not reflect the global namespace also satisfies `ScopeMember`).

### Example

This section is incomplete Reason: examples

### See also

This section is incomplete Reason: templatization
