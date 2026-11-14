# std::experimental::reflect::Namespace

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept Namespace = Scope<T> && /* see below */;` | (reflection TS) |

The `Namespace` concept is satisfied if and only if T reflects a namespace including the global namespace (Note: Any such T that does not reflect the global namespace also satisfies `ScopeMember`).

### Example

This section is incomplete Reason: examples

### See also

This section is incomplete Reason: templatization
