# std::uses_allocator

| Defined in header `<memory>` |  |
| --- | --- |
| `template< class T, class Alloc > struct uses_allocator;` | (since C++11) |

If `T` has a nested type `allocator_type` which is convertible from `Alloc`, the member constant `value` is `true`. Otherwise `value` is `false`.

### Helper variable template

`template< class T, class Alloc > constexpr bool uses_allocator_v = uses_allocator<T, Alloc>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` uses allocator `Alloc`, `false` otherwise (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator bool | converts the object to `bool`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `bool` |
| `type` | `std::integral_constant<bool, value>` |

### Uses-allocator construction

There are three conventions of passing an allocator `alloc` to a constructor of some type `T`:

- If `T` does not use a compatible allocator (`std::uses_allocator_v<T, Alloc>` is `false`), then `alloc` is ignored.
- Otherwise, `std::uses_allocator_v<T, Alloc>` is `true`, and

- if `T` uses the *leading-allocator convention* (is invocable as `T(std::allocator_arg, alloc, args...)`), then uses-allocator construction uses this form.
- if `T` uses the *trailing-allocator convention* (is invocable as `T(args..., alloc)`), then uses-allocator construction uses this form.
- Otherwise, the program is ill-formed (this means `std::uses_allocator_v<T, Alloc>` is `true`, but the type does not follow either of the two allowed conventions).

- As a special case, `std::pair` is treated as a uses-allocator type even though `std::uses_allocator` is `false` for pairs (unlike e.g. `std::tuple`): see pair-specific overloads of `std::pmr::polymorphic_allocator::construct` and `std::scoped_allocator_adaptor::construct`(until C++20)`std::uses_allocator_construction_args`(since C++20).

The utility functions `std::make_obj_using_allocator`, and `std::uninitialized_construct_using_allocator` may be used to explicitly create an object following the above protocol, and `std::uses_allocator_construction_args` can be used to prepare the argument list that matches the flavor of uses-allocator construction expected by the type. (since C++20)

### Specializations

Given a program-defined type `T` that does not have a nested `allocator_type`, a program can specialize `std::uses_allocator` to derive from `std::true_type` for `T` if any of the following requirements is satisfied:

- `T` has a constructor which takes `std::allocator_arg_t` as the first argument, and `Alloc` as the second argument.
- `T` has a constructor which takes `Alloc` as the last argument.

In the above, `Alloc` is a type that satisfies Allocator or is a pointer type convertible to `std::experimental::pmr::memory_resource*`(library fundamentals TS).

The following specializations are already provided by the standard library:

|  |  |
| --- | --- |
| std::uses_allocator<std::tuple> (C++11) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::queue> (C++11) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::priority_queue> (C++11) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::stack> (C++11) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::flat_map> (C++23) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::flat_set> (C++23) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::flat_multimap> (C++23) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::flat_multiset> (C++23) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::function> (C++11) (until C++17) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::promise> (C++11) | specializes the `std::uses_allocator` type trait (class template specialization) |
| std::uses_allocator<std::packaged_task> (C++11) (until C++17) | specializes the `std::uses_allocator` type trait (class template specialization) |

### Notes

This type trait is used by `std::tuple`, `std::scoped_allocator_adaptor`, and `std::pmr::polymorphic_allocator`. It may also be used by custom allocators or wrapper types to determine whether the object or member being constructed is itself capable of using an allocator (e.g. is a container), in which case an allocator should be passed to its constructor.

### See also

|  |  |
| --- | --- |
| allocator_arg, allocator_arg_t (C++11) | a tag used to select allocator-aware constructors (tag) |
| uses_allocator_construction_args (C++20) | prepares the argument list matching the flavor of uses-allocator construction required by the given type (function template) |
| make_obj_using_allocator (C++20) | creates an object of the given type by means of uses-allocator construction (function template) |
| uninitialized_construct_using_allocator (C++20) | creates an object of the given type at specified memory location by means of uses-allocator construction (function template) |
| scoped_allocator_adaptor (C++11) | implements multi-level allocator for multi-level containers (class template) |
