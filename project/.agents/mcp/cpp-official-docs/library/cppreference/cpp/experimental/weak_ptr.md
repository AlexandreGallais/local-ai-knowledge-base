# std::experimental::weak_ptr

| Defined in header `<experimental/memory>` |  |
| --- | --- |
| `template< class T > class weak_ptr;` | (library fundamentals TS) |

`std::experimental::weak_ptr` is a modified version of `std::weak_ptr` that interoperates with `std::experimental::shared_ptr` and has support for arrays.

### Member types

| Member type | Definition |
| --- | --- |
| `element_type` | `std::remove_extent_t<T>` |

### Member functions

(constructor) constructs new `weak_ptr` (public member function)

## Members and non-members identical to std::weak_ptr

### Member functions

The following member functions work with `std::experimental::shared_ptr` instead of `std::shared_ptr` and `std::experimental::weak_ptr` instead of `std::weak_ptr`. The behavior is otherwise identical.

|  |  |
| --- | --- |
| (destructor) | destroys a `weak_ptr` (public member function of `std::weak_ptr<T>`) |
| operator= | assigns the `weak_ptr` (public member function of `std::weak_ptr<T>`) |
| Modifiers |  |
| reset | releases the ownership of the managed object (public member function of `std::weak_ptr<T>`) |
| swap | swaps the managed objects (public member function of `std::weak_ptr<T>`) |
| Observers |  |
| use_count | returns the number of `shared_ptr` objects that manage the object (public member function of `std::weak_ptr<T>`) |
| expired | checks whether the referenced object was already deleted (public member function of `std::weak_ptr<T>`) |
| lock | creates a `shared_ptr` that manages the referenced object (public member function of `std::weak_ptr<T>`) |
| owner_before | provides owner-based ordering of weak pointers (public member function of `std::weak_ptr<T>`) |

### Non-member functions

This non-member function is declared in the `std::experimental` namespace, and work with `std::experimental::weak_ptr` rather than `std::weak_ptr`, but otherwise behaves identically to the corresponding C++14 function.

std::swap(std::weak_ptr) (C++11) specializes the `std::swap` algorithm (function template)

### Example

This section is incomplete Reason: no example
