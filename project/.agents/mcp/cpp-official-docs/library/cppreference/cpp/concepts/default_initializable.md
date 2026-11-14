# std::default_initializable

| Defined in header `<concepts>` |  |
| --- | --- |
| `template< class T > concept default_initializable = std::constructible_from<T> && requires { T{}; } && /* T t; is well-formed, see below */;` | (since C++20) |

The `default_initializable` concept checks whether variables of type `T` can be

- value-initialized (i.e., whether `T()` is well-formed);
- direct-list-initialized from an empty initializer list (i.e., whether `T{}` is well-formed); and
- default-initialized (i.e., whether `T t;` is well-formed).

Access checking is performed as if in a context unrelated to T. Only the validity of the immediate context of the variable initialization is considered.

### Possible implementation

`template<class T> concept default_initializable = std::constructible_from<T> && requires { T{}; ::new T; };`

### References

- C++23 standard (ISO/IEC 14882:2024):

- 18.4.12 Concept `default_initializable` [concept.default.init]

- C++20 standard (ISO/IEC 14882:2020):

- 18.4.12 Concept `default_initializable` [concept.default.init]

### See also

|  |  |
| --- | --- |
| constructible_from (C++20) | specifies that a variable of the type can be constructed from or bound to a set of argument types (concept) |
| is_default_constructible, is_trivially_default_constructible, is_nothrow_default_constructible (C++11), (C++11), (C++11) | checks if a type has a default constructor (class template) |
