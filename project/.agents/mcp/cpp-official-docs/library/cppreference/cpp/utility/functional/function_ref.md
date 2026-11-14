# std::function_ref

| Defined in header `<functional>` |  |  |
| --- | --- | --- |
| `template< class... > class function_ref; // not defined` | (1) | (since C++26) |
| `template< class R, class... Args > class function_ref<R(Args...)>; template< class R, class... Args > class function_ref<R(Args...) noexcept>; template< class R, class... Args > class function_ref<R(Args...) const>; template< class R, class... Args > class function_ref<R(Args...) const noexcept>;` | (2) | (since C++26) |

Class template `std::function_ref` is a non-owning function wrapper. `std::function_ref` objects can store and invoke reference to Callable *target* - functions, lambda expressions, bind expressions, or other function objects, but not pointers to member functions and pointers to member objects. `std::nontype` can be used to construct `std::function_ref` by passing function pointers, pointers to member functions, and pointers to member objects.

`std::function_ref`s supports every possible combination of cv-qualifiers (excluding `volatile`), and noexcept-specifiers provided in its template parameter.

Every specialization of `std::function_ref` is a TriviallyCopyable type that satisfies `copyable`.

### Member types

| Member | Definition |
| --- | --- |
| `BoundEntityType` (private) | unspecified TriviallyCopyable type that satisfies `copyable` and is capable of storing a pointer to object value or pointer to function value (exposition-only member type*) |
| `FunctionPointerType` (private) | `R(*)(``BoundEntityType` `, Args&&...) noexcept(`noex `)` where noex is `true` if `noexcept` is present in function signature as part of the template parameter of `std::function_ref`, `false` otherwise (exposition-only member type*) |

### Data members

| Member | Definition |
| --- | --- |
| `BoundEntityType` `bound-entity` | a bound entity object (exposition-only member object*) |
| `FunctionPointerType` `thunk-ptr` | a stored pointer to function (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `function_ref` object (public member function) |
| operator= | assigns a `function_ref` (public member function) |
| operator() | invokes the stored thunk of a `function_ref` (public member function) |

### Deduction guides

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_function_ref` | `202306L` | (C++26) | `std::function_ref` |

### Example

This section is incomplete Reason: example

### See also

|  |  |
| --- | --- |
| function (C++11) | copyable wrapper of any copy constructible callable object (class template) |
| copyable_function (C++26) | copyable wrapper of any copy constructible callable object that supports qualifiers in a given call signature (class template) |
| move_only_function (C++23) | move-only wrapper of any callable object that supports qualifiers in a given call signature (class template) |
| nontype, nontype_t (C++26) | value construction tag (tag) |
