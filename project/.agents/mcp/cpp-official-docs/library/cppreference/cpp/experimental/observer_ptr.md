# std::experimental::observer_ptr

| Defined in header `<experimental/memory>` |  |
| --- | --- |
| `template< class W > class observer_ptr;` | (library fundamentals TS v2) |

`std::experimental::observer_ptr` is a non-owning pointer, or *observer*. The observer stores a pointer to a second object, known as the *watched object*. An `observer_ptr` may also have no watched object.

An observer is not responsible in any way for the watched object; there is no inherent relationship between an observer and the object it watches.

It is intended as a near drop-in replacement for raw pointer types, with the advantage that, as a vocabulary type, it indicates its intended use without need for detailed analysis by code readers.

Specializations of `observer_ptr` satisfy the requirements of CopyConstructible and CopyAssignable.

Type requirements

- `W` shall not be a reference type, but may be an incomplete type.

### Member types

| Member type | Definition |
| --- | --- |
| `element_type` | `W`, the type of the object watched by this `observer_ptr` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `observer_ptr` (public member function) |
| (destructor) (implicitly declared) | destructs an `observer_ptr` (public member function) |
| operator= (implicitly declared) | implicitly declared copy and move assignment operators that assign the stored pointer (public member function) |
| Modifiers |  |
| release | returns a pointer to the watched object and stops watching the object (public member function) |
| reset | replaces the watched object (public member function) |
| swap | swaps the watched objects (public member function) |
| Observers |  |
| get | returns a pointer to the watched object (public member function) |
| operator bool | checks if there is an associated watched object (public member function) |
| operator*, operator-> | dereferences pointer to the watched object (public member function) |
| Conversions |  |
| operator element_type* | explicit conversion function to the stored pointer (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| make_observer | creates an `observer_ptr` that watches an object (function template) |
| operator==, operator!=, operator<, operator<=, operator>, operator>= | compares to another `observer_ptr` or with `nullptr` (function template) |
| std::experimental::swap(std::experimental::observer_ptr) | specializes the `swap` algorithm (function template) |

### Helper classes

std::hash<std::experimental::observer_ptr> hash support for `observer_ptr` (class template specialization)

### Example

This section is incomplete Reason: no example
