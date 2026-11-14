# std::experimental::ranges::indirect_result_of

| Defined in header `<experimental/ranges/iterator>` |  |
| --- | --- |
| `template< class > struct indirect_result_of {}; template< class F, class... Is > requires Invocable<F, ranges::reference_t<Is>...> struct indirect_result_of<F(Is...)> : std::result_of<F(ranges::reference_t<Is>&&...)> {};` | (ranges TS) |
