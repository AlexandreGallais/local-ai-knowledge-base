# std::experimental::ranges::iterator_t, std::experimental::ranges::sentinel_t

| Defined in header `<experimental/ranges/range>` |  |  |
| --- | --- | --- |
| `template< class T > using iterator_t = decltype(ranges::begin(std::declval<T&>()));` | (1) | (ranges TS) |
| `template< class T > using sentinel_t = decltype(ranges::end(std::declval<T&>()));` | (2) | (ranges TS) |

Obtain the iterator and sentinel types of a range `T`.
