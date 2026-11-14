# std::experimental::make_observer

| Defined in header `<experimental/memory>` |  |
| --- | --- |
| `template< class W > std::experimental::observer_ptr<W> make_observer( W* p ) noexcept;` | (library fundamentals TS v2) |

Creates an `observer_ptr` object, deducing the template argument from the type of the function argument.

### Parameters

p - pointer to the object to be watched by the `observer_ptr` object

### Return value

A `observer_ptr` object, created as if by `std::experimental::observer_ptr<W>(p)`.

### Example

This section is incomplete Reason: no example
