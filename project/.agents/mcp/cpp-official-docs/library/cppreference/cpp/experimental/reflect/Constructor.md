# std::experimental::reflect::Constructor

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept Constructor = Callable<T> && RecordMember<T> && /* see below */;` | (reflection TS) |

The `Constructor` concept is satisfied if and only if T reflects a constructor (Note: Some types that satisfy `Constructor` also satisfy `SpecialMemberFunction`).

### Example

This section is incomplete Reason: examples

### See also

This section is incomplete Reason: templatization
