# std::experimental::disjunction

| Defined in header `<experimental/type_traits>` |  |
| --- | --- |
| `template< class... B > struct disjunction;` | (library fundamentals TS v2) |

Forms the logical disjunction of the type traits `B...`, effectively performing a logical or on the sequence of traits.

The specialization `std::experimental::disjunction<B1, ..., BN>` has a public and unambiguous base that is

- if `sizeof...(B) == 0`, `std::false_type`; otherwise
- the first type `Bi` in `B1, ..., BN` for which `bool(Bi::value) == true`, or `BN` if there is no such type.

The member names of the base class, other than `disjunction` and `operator=`, are not hidden and are unambiguously available in `disjunction`.

Disjunction is short-circuiting: if there is a template type argument `Bi` with `bool(Bi::value) != false`, then instantiating `disjunction<B1, ..., BN>::value` does not require the instantiation of `Bj::value` for `j > i`.

### Template parameters

B... - every template argument `Bi` for which `Bi::value` is instantiated must be usable as a base class and define member `value` that is convertible to `bool`

### Helper variable template

`template< class... B > constexpr bool disjunction_v = disjunction<B...>::value;` (library fundamentals TS v2)

### Possible implementation

`template<class...> struct disjunction : std::false_type {}; template<class B1> struct disjunction<B1> : B1 {}; template<class B1, class... Bn> struct disjunction<B1, Bn...> : std::conditional_t<bool(B1::value), B1, disjunction<Bn...>> {};`

### Notes

A specialization of `disjunction` does not necessarily inherit from of either `std::true_type` or `std::false_type`: it simply inherits from the first `B` whose `::value`, explicitly converted to `bool`, is true, or from the very last B when all of them convert to false. For example, `disjunction<std::integral_constant<int, 2>, std::integral_constant<int, 4>>::value` is `2`.

### Example

This section is incomplete Reason: no example

### See also

disjunction (C++17) variadic logical OR metafunction (class template)
