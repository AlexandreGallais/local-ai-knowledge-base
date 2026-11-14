# std::experimental::ranges::IndirectUnaryPredicate

| Defined in header `<experimental/ranges/iterator>` |  |
| --- | --- |
| `template< class F, class I > concept bool IndirectUnaryPredicate = Readable<I> && CopyConstructible<F> && Predicate<F&, ranges::value_type_t<I>&> && Predicate<F&, ranges::reference_t<I>> && Predicate<F&, ranges::iter_common_reference_t<I>>;` | (ranges TS) |

This section is incomplete Reason: add description and extra caveats
