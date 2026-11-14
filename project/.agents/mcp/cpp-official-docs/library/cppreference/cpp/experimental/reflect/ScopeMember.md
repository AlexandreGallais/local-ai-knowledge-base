# std::experimental::reflect::ScopeMember

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept ScopeMember = Named<T> && /* see below */;` | (reflection TS) |

The `ScopeMember` concept is satisfied if and only if T satisfies `RecordMember`, `Enumerator`, or `Variable`, or if T reflects a namespace that is not the global namespace (Note: The scope of members of an unnamed union is the unnamed union; the scope of enumerators is their type).

### Example

This section is incomplete Reason: examples

### See also

This section is incomplete Reason: templatization
