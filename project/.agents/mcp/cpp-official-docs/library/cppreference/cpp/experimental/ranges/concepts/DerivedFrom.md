# std::experimental::ranges::DerivedFrom

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T, class U > concept bool DerivedFrom = std::is_base_of<U, T>::value && std::is_convertible<std::remove_cv_t<T>*, std::remove_cv_t<U>*>::value;` | (ranges TS) |

The concept `DerivedFrom<T, U>` is satisfied if and only if `U` is a class type that is either `T` or a public and unambiguous base of `T`.

Despite the use of `std::is_base_of` and `std::is_convertible` in its description above, `DerivedFrom` is not required to use it in its implementation. Thus, there need not be any subsumption relationship between `DerivedFrom<T, U>` and `std::is_base_of<U,T>::value` or `std::is_convertible<std::remove_cv_t<T>*, std::remove_cv_t<U>*>::value`.

### See also

|  |  |
| --- | --- |
| is_base_of (C++11) | checks if a type is a base of the other type (class template) |
| is_convertible, is_nothrow_convertible (C++11), (C++20) | checks if a type can be converted to the other type (class template) |
