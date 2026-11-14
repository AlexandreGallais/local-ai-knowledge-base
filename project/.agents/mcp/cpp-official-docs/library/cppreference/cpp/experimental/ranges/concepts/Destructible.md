# std::experimental::ranges::Destructible

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool Destructible = std::is_nothrow_destructible<T>::value;` | (ranges TS) |

The concept `Destructible` specifies the concept of all types whose instances can safely be destroyed at the end of their lifetime (including reference types).

There need not be any subsumption relationship between `Destructible<T>` and `std::is_nothrow_destructible<T>::value`.

### Notes

Unlike the Destructible named requirement in the main C++ standard, `Destructible` requires the destructor to be `noexcept(true)`, not merely non-throwing when invoked, and allows reference types and array types.

### See also

is_destructible, is_trivially_destructible, is_nothrow_destructible (C++11), (C++11), (C++11) checks if a type has a non-deleted destructor (class template)
