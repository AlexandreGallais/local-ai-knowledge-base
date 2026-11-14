# std::allocator_arg, std::allocator_arg_t

| Defined in header `<memory>` |  |  |
| --- | --- | --- |
| `struct allocator_arg_t { explicit allocator_arg_t() = default; };` | (1) | (since C++11) |
| `constexpr std::allocator_arg_t allocator_arg {};` | (2) | (since C++11) (inline since C++17) |

1) `std::allocator_arg_t` is an empty class type used to disambiguate the overloads of constructors and member functions of allocator-aware objects, including `std::tuple`, `std::function`, `std::packaged_task`,(until C++17) and `std::promise`.

2) `std::allocator_arg` is an instance of (1) that can be passed to the constructors and member functions of such permitted types.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2510 | C++11 | the default constructor was non-explicit, which could lead to ambiguity | made explicit |

### See also

uses_allocator (C++11) checks if the specified type supports uses-allocator construction (class template)
