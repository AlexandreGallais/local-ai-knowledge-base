# std::experimental::ranges::Readable

| Defined in header `<experimental/ranges/iterator>` |  |
| --- | --- |
| `template< class In > concept bool Readable = requires { typename ranges::value_type_t<In>; typename ranges::reference_t<In>; typename ranges::rvalue_reference_t<In>; } && CommonReference<ranges::reference_t<In>&&, ranges::value_type_t<In>&> && CommonReference<ranges::reference_t<In>&&, ranges::rvalue_reference_t<In>&&> && CommonReference<ranges::rvalue_reference_t<In>&&, const ranges::value_type_t<In>&>;` | (ranges TS) |

The concept `Readable` is satisfied by types that are readable by applying `operator*`, such as pointers, smart pointers, and iterators.
