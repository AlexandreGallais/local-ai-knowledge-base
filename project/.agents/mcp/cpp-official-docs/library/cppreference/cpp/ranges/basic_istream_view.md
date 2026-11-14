# std::ranges::views::istream, std::ranges::basic_istream_view, std::ranges::istream_view, std::ranges::wistream_view

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< std::movable Val, class CharT, class Traits = std::char_traits<CharT> > requires std::default_initializable<Val> && /*stream-extractable*/<Val, CharT, Traits> class basic_istream_view : public ranges::view_interface<basic_istream_view<Val, CharT, Traits>>` | (1) | (since C++20) |
| Helper templates |  |  |
| `template< class Val > using istream_view = ranges::basic_istream_view<Val, char>;` | (2) | (since C++20) |
| `template< class Val > using wistream_view = ranges::basic_istream_view<Val, wchar_t>;` | (3) | (since C++20) |
| Customization point objects |  |  |
| `namespace views { template< class T > constexpr /* unspecified */ istream = /* unspecified */; }` | (4) | (since C++20) |
| Helper concepts |  |  |
| `template< class Val, class CharT, class Traits > concept /*stream-extractable*/ = requires(std::basic_istream<CharT, Traits>& is, Val& t) { is >> t; };` | (5) | (exposition only*) |

1) A range factory that generates a sequence of elements by repeatedly calling `operator>>`.

2,3) Convenience alias templates for character types `char` and `wchar_t`.

4) `views::istream<T>(e)` is expression-equivalent to `ranges::basic_istream_view<T, typename U::char_type, typename U::traits_type>(e)` for any suitable subexpressions `e`, where `U` is `std::remove_reference_t<decltype(e)>`.

The program is ill-formed if `U` is not both publicly and unambiguously derived from `std::basic_istream<typename U::char_type, typename U::traits_type>`, which may result in a substitution failure.

5) The exposition-only concept `/*stream-extractable*/<Val, CharT, Traits>` is satisfied when lvalue of type `Val` can be extracted from lvalue of type `std::basic_istream<CharT, Traits>`.

The iterator type of `basic_istream_view` is move-only: it does not meet the LegacyIterator requirements, and thus does not work with pre-C++20 algorithms.

### Customization point objects

The name `views::istream<T>` denotes a *customization point object*, which is a const function object of a literal `semiregular` class type. For exposition purposes, the cv-unqualified version of its type is denoted as `__istream_fn<T>`.

All instances of `__istream_fn<T>` are equal. The effects of invoking different instances of type `__istream_fn<T>` on the same arguments are equivalent, regardless of whether the expression denoting the instance is an lvalue or rvalue, and is const-qualified or not (however, a volatile-qualified instance is not required to be invocable). Thus, `views::istream<T>` can be copied freely and its copies can be used interchangeably.

Given a set of types `Args...`, if `std::declval<Args>()...` meet the requirements for arguments to `views::istream<T>` above, `__istream_fn<T>` models

- `std::invocable<__istream_fn<T>, Args...>`,
- `std::invocable<const __istream_fn<T>, Args...>`,
- `std::invocable<__istream_fn<T>&, Args...>`, and
- `std::invocable<const __istream_fn<T>&, Args...>`.

Otherwise, no function call operator of `__istream_fn<T>` participates in overload resolution.

### Data members

| Member | Definition |
| --- | --- |
| `std::basic_istream<CharT, Traits>*` `stream_` | a pointer to the input stream (exposition-only member object*) |
| `Val` `value_` | the stored value (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `basic_istream_view` (public member function) |
| begin | returns an iterator (public member function) |
| end | returns `std::default_sentinel` (public member function) |
| Inherited from `std::ranges::view_interface` |  |
| cbegin (C++23) | returns a constant iterator to the beginning of the range. (public member function of `std::ranges::view_interface<D>`) |
| cend (C++23) | returns a sentinel for the constant iterator of the range. (public member function of `std::ranges::view_interface<D>`) |
