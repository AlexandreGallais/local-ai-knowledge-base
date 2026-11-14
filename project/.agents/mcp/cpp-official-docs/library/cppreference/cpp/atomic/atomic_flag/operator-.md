# std::atomic_flag::operator=

| Defined in header `<atomic>` |  |  |
| --- | --- | --- |
| `atomic_flag& operator=( const atomic_flag& ) = delete;` | (1) | (since C++11) |
| `atomic_flag& operator=( const atomic_flag& ) volatile = delete;` | (2) | (since C++11) |

`std::atomic_flag` is not assignable, its assignment operators are deleted.
