# C++ standard libraries extensions, version 3

Version 3 of the C++ Extensions for Library Fundamentals, ISO/IEC TS 19568:2024, defines the following new components for the C++ standard library, in addition to those defined in version 1 and version 2.

Components merged into C++17/20 and the following components are removed in LFTS v3:

- `std::experimental::make_array`,
- `std::experimental::erased_type`,
- `std::experimental::packaged_task`, and
- `std::experimental::promise`.

### Scope guard

| Defined in header `<experimental/scope>` |  |
| --- | --- |
| scope_exit | wraps a function object and invokes it on exiting the scope (class template) |
| scope_fail | wraps a function object and invokes it on exiting the scope through an exception (class template) |
| scope_success | wraps a function object and invokes it on exiting the scope normally (class template) |
| unique_resource | universal RAII resource handle wrapper (class template) |

### Feature test macros

| Defined in header `<experimental/memory_resource>` |  |
| --- | --- |
| __cpp_lib_experimental_memory_resources | a value of at least `201803` indicates that `resource_adaptor` is supported (macro constant) |
| Defined in header `<experimental/functional>` |  |
| __cpp_lib_experimental_function_polymorphic_allocator | a value of at least `202211` indicates that `std::pmr::polymorphic_allocator<>` is used for `std::experimental::function` (macro constant) |
| Defined in header `<experimental/scope>` |  |
| __cpp_lib_experimental_scope | a value of at least `201902` indicates that the scope guards are supported (macro constant) |

### Notes

The value of `__cpp_lib_experimental_memory_resources` has been increased in LFTS v3, because the design of `resource_adaptor` is rebased onto `std::pmr::memory_resource`.
