# std::experimental::shared_ptr

| Defined in header `<experimental/memory>` |  |
| --- | --- |
| `template< class T > class shared_ptr;` | (library fundamentals TS) |

`std::experimental::shared_ptr` is a modified version of `std::shared_ptr` that adds support for arrays.

### Member types

| Member type | Definition |
| --- | --- |
| `element_type` | `std::remove_extent_t<T>` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs new `shared_ptr` (public member function) |
| Observers |  |
| get | returns the stored pointer (public member function) |
| operator*, operator-> | dereferences the stored pointer (public member function) |
| operator[] | provides index access to the array (public member function) |

### Non-member functions

static_pointer_cast, dynamic_pointer_cast, const_pointer_cast, reinterpret_pointer_cast applies `static_cast`, `dynamic_cast`, `const_cast`, or `reinterpret_cast` to the stored pointer (function template)

### Helper classes

std::hash<std::experimental::shared_ptr> hash support for `std::experimental::shared_ptr` (class template specialization)

## Members and non-members identical to std::shared_ptr

### Member functions

The following member functions work with `std::experimental::shared_ptr` instead of `std::shared_ptr` and `std::experimental::weak_ptr` instead of `std::weak_ptr`. The behavior is otherwise identical.

|  |  |
| --- | --- |
| (destructor) | destructs the owned object if no more `shared_ptr`s link to it (public member function of `std::shared_ptr<T>`) |
| operator= | assigns the `shared_ptr` (public member function of `std::shared_ptr<T>`) |
| Modifiers |  |
| reset | replaces the managed object (public member function of `std::shared_ptr<T>`) |
| swap | swaps the managed objects (public member function of `std::shared_ptr<T>`) |
| Observers |  |
| use_count | returns the number of `shared_ptr` objects referring to the same managed object (public member function of `std::shared_ptr<T>`) |
| unique (until C++20) | checks whether the managed object is managed only by the current `shared_ptr` object (public member function of `std::shared_ptr<T>`) |
| operator bool | checks if the stored pointer is not null (public member function of `std::shared_ptr<T>`) |
| owner_before | provides owner-based ordering of shared pointers (public member function of `std::shared_ptr<T>`) |

### Non-member functions

These non-member functions are declared in the `std::experimental` namespace, and work with `std::experimental::shared_ptr` rather than `std::shared_ptr`, but otherwise behaves identically to the corresponding C++14 function.

|  |  |
| --- | --- |
| make_shared, make_shared_for_overwrite (C++20) | creates a shared pointer that manages a new object (function template) |
| allocate_shared, allocate_shared_for_overwrite (C++20) | creates a shared pointer that manages a new object allocated using an allocator (function template) |
| get_deleter | returns the deleter of specified type, if owned (function template) |
| operator==, operator!=, operator<, operator<=, operator>, operator>=, operator<=> (removed in C++20), (removed in C++20), (removed in C++20), (removed in C++20), (removed in C++20), (C++20) | compares with another `shared_ptr` or with `nullptr` (function template) |
| operator<<(std::shared_ptr) | outputs the value of the stored pointer to an output stream (function template) |
| std::swap(std::shared_ptr) (C++11) | specializes the `std::swap` algorithm (function template) |

std::atomic_is_lock_free(std::shared_ptr), std::atomic_load(std::shared_ptr), std::atomic_load_explicit(std::shared_ptr), std::atomic_store(std::shared_ptr), std::atomic_store_explicit(std::shared_ptr), std::atomic_exchange(std::shared_ptr), std::atomic_exchange_explicit(std::shared_ptr), std::atomic_compare_exchange_weak(std::shared_ptr), std::atomic_compare_exchange_strong(std::shared_ptr), std::atomic_compare_exchange_weak_explicit(std::shared_ptr), std::atomic_compare_exchange_strong_explicit(std::shared_ptr) (deprecated in C++20), (removed in C++26) specializes atomic operations for `std::shared_ptr` (function template)

### Helper class templates

These class templates are declared in the `std::experimental` namespace, and work with `std::experimental::shared_ptr` and `std::experimental::weak_ptr` rather than `std::shared_ptr` and `std::weak_ptr`, but otherwise behaves identically to the corresponding C++14 class template.

|  |  |
| --- | --- |
| owner_less (C++11) | provides mixed-type owner-based ordering of shared and weak pointers (class template) |
| enable_shared_from_this (C++11) | allows an object to create a `shared_ptr` referring to itself (class template) |

### Example

This section is incomplete Reason: no example
