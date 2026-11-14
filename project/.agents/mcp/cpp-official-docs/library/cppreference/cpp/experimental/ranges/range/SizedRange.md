# std::experimental::ranges::SizedRange

| Defined in header `<experimental/ranges/range>` |  |
| --- | --- |
| `template< class T > concept bool SizedRange = Range<T> && !ranges::disable_sized_range<std::remove_cv_t<std::remove_reference_t<T>>> && requires(T& t) { { ranges::size(t) } -> ConvertibleTo<ranges::difference_type_t<ranges::iterator_t<T>>>; };` | (ranges TS) |

This section is incomplete Reason: add description and extra caveats
