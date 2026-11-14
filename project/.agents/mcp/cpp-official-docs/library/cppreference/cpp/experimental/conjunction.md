# std::experimental::conjunction

| Defined in header `<experimental/type_traits>` |  |
| --- | --- |
| `template< class... B > struct conjunction;` | (library fundamentals TS v2) |

Forms the logical conjunction of the type traits `B...`, effectively performing a logical AND on the sequence of traits.

The specialization `std::experimental::conjunction<B1, ..., BN>` has a public and unambiguous base that is

- if `sizeof...(B) == 0`, `std::true_type`; otherwise
- the first type `Bi` in `B1, ..., BN` for which `bool(Bi::value) == false`, or `BN` if there is no such type.

The member names of the base class, other than `conjunction` and `operator=`, are not hidden and are unambiguously available in `conjunction`.

Conjunction is short-circuiting: if there is a template type argument `Bi` with `bool(Bi::value) == false`, then instantiating `conjunction<B1, ..., BN>::value` does not require the instantiation of `Bj::value` for `j > i`.

### Template parameters

B... - every template argument `Bi` for which `Bi::value` is instantiated must be usable as a base class and define member `value` that is convertible to `bool`

### Helper variable template

`template< class... B > constexpr bool conjunction_v = conjunction<B...>::value;` (library fundamentals TS v2)

### Possible implementation

`template<class...> struct conjunction : std::true_type {}; template<class B1> struct conjunction<B1> : B1 {}; template<class B1, class... Bn> struct conjunction<B1, Bn...> : std::conditional_t<bool(B1::value), conjunction<Bn...>, B1> {};`

### Notes

A specialization of `conjunction` does not necessarily inherit from either `std::true_type` or `std::false_type`: it simply inherits from the first B whose ::value, converted to bool, is false, or from the very last B when all of them convert to true. For example, `conjunction<std::integral_constant<int, 2>, std::integral_constant<int, 4>>::value` is `4`.

### Example

```cpp
#include <experimental/type_traits>
#include <iostream>

// func is enabled if all Ts... have the same type
template<typename T, typename... Ts>
constexpr std::enable_if_t<std::experimental::conjunction_v<std::is_same<T, Ts>...>>
func(T, Ts...)
{
    std::cout << "All types are the same.\n";
}

template<typename T, typename... Ts>
constexpr std::enable_if_t<!std::experimental::conjunction_v<std::is_same<T, Ts>...>>
func(T, Ts...)
{
    std::cout << "Types differ.\n";
}

int main()
{
    func(1, 2'7, 3'1);
    func(1, 2.7, '3');
}
```

Output:

```text
All types are the same.
Types differ.
```

### See also

conjunction (C++17) variadic logical AND metafunction (class template)
