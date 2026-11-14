# std::move_sentinel

| Defined in header `<iterator>` |  |
| --- | --- |
| `template< std::semiregular S > class move_sentinel;` | (since C++20) |

`std::move_sentinel` is a sentinel adaptor used for denoting ranges together with `std::move_iterator`.

### Template parameters

S - the type of underlying sentinel

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `move_sentinel` (public member function) |
| operator= | assigns the contents of one `move_sentinel` to another (public member function) |
| base | return a copy of the underlying sentinel (public member function) |

### Member objects

| Member name | Definition |
| --- | --- |
| `last` (private) | underlying sentinel (exposition-only member object*) |

### Non-member functions

|  |  |
| --- | --- |
| operator==(std::move_sentinel) (C++20) | compares the underlying iterator and the underlying sentinel (function template) |
| operator-(std::move_sentinel) (C++20) | computes the distance between the underlying iterator and the underlying sentinel (function template) |

### Example

This section is incomplete Reason: no example

### See also

move_iterator (C++11) iterator adaptor which dereferences to an rvalue (class template)
