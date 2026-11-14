# std::ranges::input_range

| Defined in header `<ranges>` |  |
| --- | --- |
| `template< class T > concept input_range = ranges::range<T> && std::input_iterator<ranges::iterator_t<T>>;` | (since C++20) |

The `input_range` concept is a refinement of `range` for which `ranges::begin` returns a model of `input_iterator`.
