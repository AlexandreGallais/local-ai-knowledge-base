# std::experimental::reflect::FunctionParameter

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept FunctionParameter = Typed<T> && ScopeMember<T> && /* see below */;` | (reflection TS) |

The `FunctionParameter` concept is satisfied if and only if `T` reflects a function parameter (Note: A `FunctionParameter` does not satisfy `Variable`, and thus does not offer an interface for getting the pointer to a parameter).

### Example

This section is incomplete Reason: examples

### See also

This section is incomplete Reason: templatization
