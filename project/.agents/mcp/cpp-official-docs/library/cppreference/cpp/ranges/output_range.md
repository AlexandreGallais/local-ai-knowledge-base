# std::ranges::output_range

| Defined in header `<ranges>` |  |
| --- | --- |
| `template<class R, class T> concept output_range = ranges::range<R> && std::output_iterator<ranges::iterator_t<R>, T>;` | (since C++20) |

The `output_range` concept is a refinement of `range` for which `ranges::begin` returns a model of `output_iterator`.
