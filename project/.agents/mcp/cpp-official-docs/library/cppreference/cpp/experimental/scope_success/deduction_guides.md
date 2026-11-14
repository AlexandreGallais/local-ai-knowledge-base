# deduction guides for `std::experimental::scope_success`

| Defined in header `<experimental/scope>` |  |
| --- | --- |
| `template< class EF > scope_success(EF) -> scope_success<EF>;` | (library fundamentals TS v3) |

One deduction guide is provided for `std::experimental::scope_success` to permit deduction from an argument of function or function object type.

The argument (after function-to-pointer decay, if any) is copied or moved into the constructed `scope_success`.

### Example

This section is incomplete Reason: no example
