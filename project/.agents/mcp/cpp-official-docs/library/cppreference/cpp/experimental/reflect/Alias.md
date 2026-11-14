# std::experimental::reflect::Alias

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept Alias = Named<T> && ScopedMember<T> && /* see below */;` | (reflection TS) |

The `Alias` concept is satisfied if and only if T reflects a `typedef` declaration, an alias-declaration, a namespace alias, a template type parameter, a decltype-specifier, or a declaration introduced by using-declaration (Note: The `Scope` of an `Alias` is the scope that the alias was injected into).

### Example

This section is incomplete Reason: examples

### See also

This section is incomplete Reason: templatization
