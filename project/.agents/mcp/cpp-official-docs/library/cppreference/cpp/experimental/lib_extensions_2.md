# C++ standard libraries extensions, version 2

Version 2 of the C++ Extensions for Library Fundamentals, ISO/IEC TS 19568:2017, defines the following new components for the C++ standard library, in addition to those defined in version 1:

### The C++ detection idiom

| Defined in header `<experimental/type_traits>` |  |
| --- | --- |
| is_detected, detected_t, detected_or | alias templates that detect whether a *template-id* is well-formed (alias template) |
| nonesuch | class type returned by `detected_t` on failure (class) |

### A const-propagating wrapper for pointer-like objects

| Defined in header `<experimental/propagate_const>` |  |
| --- | --- |
| propagate_const | a const-propagating wrapper for pointer-like objects (class template) |

### Non-owning pointers

| Defined in header `<experimental/memory>` |  |
| --- | --- |
| observer_ptr | a class representing a non-owning pointer (class template) |

### `std::array` creation

| Defined in header `<experimental/array>` |  |
| --- | --- |
| make_array (library fundamentals TS v2) | creates a `std::array` object whose size and optionally element type are deduced from the arguments (function template) |

### `ostream_joiner`

| Defined in header `<experimental/iterator>` |  |
| --- | --- |
| ostream_joiner | an output iterator that writes successive elements into an output stream, separating adjacent elements with a delimiter (class template) |

### Simple random number generation facilities

A *per-thread engine* of type `std::default_random_engine`, initialized to an unpredictable state, is maintained for each thread and used by the functions below.

| Defined in header `<experimental/random>` |  |
| --- | --- |
| randint | generates a random integer in the specified range (function template) |
| reseed | reseeds the per-thread random engine (function) |
| Defined in header `<experimental/algorithm>` |  |
| sample | selects n random elements from a sequence (function template) |
| shuffle | randomly re-orders elements in a range (function template) |

### Feature test macros

| Defined in header `<experimental/type_traits>` |  |
| --- | --- |
| __cpp_lib_experimental_logical_traits | a value of at least `201511` indicates that the logical operator type traits are supported (macro constant) |
| __cpp_lib_experimental_detect | a value of at least `201505` indicates that the detection idiom is supported (macro constant) |
| Defined in header `<experimental/propagate_const>` |  |
| __cpp_lib_experimental_propagate_const | a value of at least `201505` indicates that `propagate_const` is supported (macro constant) |
| Defined in header `<experimental/functional>` |  |
| __cpp_lib_experimental_not_fn | a value of at least `201406` indicates that `not_fn` is supported (macro constant) |
| Defined in header `<experimental/memory>` |  |
| __cpp_lib_experimental_observer_ptr | a value of at least `201411` indicates that `observer_ptr` is supported (macro constant) |
| Defined in header `<experimental/array>` |  |
| __cpp_lib_experimental_make_array | a value of at least `201505` indicates that `make_array` is supported (macro constant) |
| Defined in header `<experimental/iterator>` |  |
| __cpp_lib_experimental_ostream_joiner | a value of at least `201411` indicates that `ostream_joiner` is supported (macro constant) |
| Defined in header `<experimental/vector>` |  |
| __cpp_lib_experimental_erase_if | a value of at least `201411` indicates that uniform container erasure is supported (macro constant) |
| Defined in header `<experimental/numeric>` |  |
| __cpp_lib_experimental_gcd_lcm | a value of at least `201411` indicates that `gcd` and `lcm` are supported (macro constant) |
| Defined in header `<experimental/random>` |  |
| __cpp_lib_experimental_randint | a value of at least `201511` indicates that `randint` and related functions are supported (macro constant) |
| Defined in header `<experimental/source_location>` |  |
| __cpp_lib_experimental_source_location | a value of at least `201505` indicates that `source_location` is supported (macro constant) |

## Merged into C++17

The following components of the library fundamentals v2 have been adopted into the C++17 standard.

| Defined in header `<experimental/type_traits>` |  |
| --- | --- |
| void_t | variadic alias template for `void` (alias template) |
| Defined in header `<experimental/type_traits>` |  |
| conjunction | variadic logical AND metafunction (class template) |
| disjunction | variadic logical OR metafunction (class template) |
| negation | logical NOT metafunction (class template) |
| Defined in header `<experimental/functional>` |  |
| not_fn | creates a function object that returns the complement of the result of the function object it holds (function template) |
| Defined in header `<experimental/numeric>` |  |
| gcd | `constexpr` function template returning the greatest common divisor of two integers (function template) |
| lcm | `constexpr` function template returning the least common multiple of two integers (function template) |

## Merged into C++20

The following components of the library fundamentals v2 have been adopted into the C++20 standard.

### Uniform container erasure

| Defined in header `<experimental/string>` |  |
| --- | --- |
| erase (std::basic_string) | erases all elements equal to a specific value from a `std::basic_string` (function template) |
| erase_if (std::basic_string) | erases all elements satisfying a predicate from a `std::basic_string` (function template) |
| Defined in header `<experimental/deque>` |  |
| erase (std::deque) | erases all elements equal to a specific value from a `std::deque` (function template) |
| erase_if (std::deque) | erases all elements satisfying a predicate from a `std::deque` (function template) |
| Defined in header `<experimental/vector>` |  |
| erase (std::vector) | erases all elements equal to a specific value from a `std::vector` (function template) |
| erase_if (std::vector) | erases all elements satisfying a predicate from a `std::vector` (function template) |
| Defined in header `<experimental/forward_list>` |  |
| erase (std::forward_list) | erases all elements equal to a specific value from a `std::forward_list` (function template) |
| erase_if (std::forward_list) | erases all elements satisfying a predicate from a `std::forward_list` (function template) |
| Defined in header `<experimental/list>` |  |
| erase (std::list) | erases all elements equal to a specific value from a `std::list` (function template) |
| erase_if (std::list) | erases all elements satisfying a predicate from a `std::list` (function template) |
| Defined in header `<experimental/map>` |  |
| erase_if (std::map) | erases all elements satisfying a predicate from a `std::map` (function template) |
| erase_if (std::multimap) | erases all elements satisfying a predicate from a `std::multimap` (function template) |
| Defined in header `<experimental/set>` |  |
| erase_if (std::set) | erases all elements satisfying a predicate from a `std::set` (function template) |
| erase_if (std::multiset) | erases all elements satisfying a predicate from a `std::multiset` (function template) |
| Defined in header `<experimental/unordered_map>` |  |
| erase_if (std::unordered_map) | erases all elements satisfying a predicate from a `std::unordered_map` (function template) |
| erase_if (std::unordered_multimap) | erases all elements satisfying a predicate from a `std::unordered_multimap` (function template) |
| Defined in header `<experimental/unordered_set>` |  |
| erase_if (std::unordered_set) | erases all elements satisfying a predicate from a `std::unordered_set` (function template) |
| erase_if (std::unordered_multiset) | erases all elements satisfying a predicate from a `std::unordered_multiset` (function template) |

### Source code information capture

| Defined in header `<experimental/source_location>` |  |
| --- | --- |
| source_location | a class representing information about the source code, such as file names, line numbers, and function names (class) |

### `std::array` conversion

| Defined in header `<experimental/array>` |  |
| --- | --- |
| to_array | creates a `std::array` object from a built-in array (function template) |
