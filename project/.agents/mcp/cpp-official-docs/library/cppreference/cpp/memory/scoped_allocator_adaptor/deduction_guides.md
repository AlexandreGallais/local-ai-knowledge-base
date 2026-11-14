# deduction guides for `std::scoped_allocator_adaptor`

| Defined in header `<scoped_allocator>` |  |
| --- | --- |
| `template< class OuterAlloc, class... InnerAllocs > scoped_allocator_adaptor( OuterAlloc, InnerAllocs... ) -> scoped_allocator_adaptor<OuterAlloc, InnerAllocs...>;` | (since C++17) |

One deduction guide is provided for `std::scoped_allocator_adaptor` to make it possible to deduce its outer allocator.

### Example

This section is incomplete Reason: no example
