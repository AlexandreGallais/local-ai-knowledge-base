# deduction guides for `std::experimental::unique_resource`

| Defined in header `<experimental/scope>` |  |
| --- | --- |
| `template< class R, class D > unique_resource( R, D ) -> unique_resource<R, D>;` | (library fundamentals TS v3) |

One deduction guide is provided for `std::experimental::unique_resource` to permit deduction from given resource handle and deleter.

The arguments (after array-to-pointer and function-to-pointer decay, if any) are copied or moved into the constructed `unique_resource`.

### Example

This section is incomplete Reason: no example
