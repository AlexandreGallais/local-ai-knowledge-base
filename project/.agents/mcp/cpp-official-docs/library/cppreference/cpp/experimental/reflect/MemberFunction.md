# std::experimental::reflect::MemberFunction

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept MemberFunction = RecordMember<T> && Function<T> && /* see below */;` | (reflection TS) |

The `MemberFunction` concept is satisfied if and only if T reflects a member function, excluding constructors and destructors.

### Example

This section is incomplete Reason: examples

### See also

This section is incomplete Reason: templatization
