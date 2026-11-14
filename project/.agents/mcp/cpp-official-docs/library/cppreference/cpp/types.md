# Type support (basic types, RTTI)

See also type system overview and fundamental types defined by the language.

### Additional basic types and macros

| Defined in header `<cstddef>` |  |
| --- | --- |
| size_t | unsigned integer type returned by the `sizeof` operator (typedef) |
| ptrdiff_t | signed integer type returned when subtracting two pointers (typedef) |
| nullptr_t (C++11) | the type of the null pointer literal `nullptr` (typedef) |
| NULL | implementation-defined null pointer constant (macro constant) |
| max_align_t (C++11) | trivial type with alignment requirement as great as any other scalar type (typedef) |
| offsetof | byte offset from the beginning of a standard-layout type to specified member (function macro) |
| byte (C++17) | the byte type (enum) |

| Defined in header `<cstdbool>`(deprecated) (until C++20) |  |
| --- | --- |
| Defined in header `<stdbool.h>` |  |
| __bool_true_false_are_defined (C++11), (deprecated) | C compatibility macro constant, expands to integer literal `1` (macro constant) |
| Defined in header `<cstdalign>`(deprecated) (until C++20) |  |
| Defined in header `<stdalign.h>` |  |
| __alignas_is_defined (C++11), (deprecated) | C compatibility macro constant, expands to integer literal `1` (macro constant) |
| __alignof_is_defined (C++11), (deprecated) | C compatibility macro constant, expands to integer literal `1` (macro constant) |

### Fixed width integer types (since C++11)

### Fixed width floating-point types (since C++23)

### Numeric limits

| Defined in header `<limits>` |  |
| --- | --- |
| numeric_limits | provides an interface to query properties of all fundamental numeric types (class template) |

#### C numeric limits interface

### Runtime type identification

| Defined in header `<typeinfo>` |  |
| --- | --- |
| type_info | contains some type’s information, the class returned by the typeid operator (class) |
| bad_typeid | exception that is thrown if an argument in a typeid expression is null (class) |
| bad_cast | exception that is thrown by an invalid `dynamic_cast` expression, i.e. a cast of reference type fails (class) |
| Defined in header `<typeindex>` |  |
| type_index (C++11) | wrapper around a `type_info` object, that can be used as index in associative and unordered associative containers (class) |

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 4036 | C++11 | `__alignof_is_defined` was underspecified in the C++ standard | specified and deprecated |

### See also

Type traits and metaprogramming library

C documentation for Type support library
