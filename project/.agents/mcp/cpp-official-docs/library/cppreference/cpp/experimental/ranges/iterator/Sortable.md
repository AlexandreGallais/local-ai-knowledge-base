# std::experimental::ranges::Sortable

`template< class I, class R = ranges::less<>, class P = ranges::identity > concept bool Sortable = Permutable<I> && IndirectStrictWeakOrder<R, ranges::projected<I, P>>;` (ranges TS)

The `Sortable` concept specifies the common requirements of algorithms that permute sequences into ordered sequences (for example, `ranges::sort`).
