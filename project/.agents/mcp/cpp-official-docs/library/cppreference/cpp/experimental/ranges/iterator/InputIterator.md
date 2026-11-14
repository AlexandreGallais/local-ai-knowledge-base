# std::experimental::ranges::InputIterator

| Defined in header `<experimental/ranges/iterator>` |  |
| --- | --- |
| `template< class I > concept bool InputIterator = Iterator<I> && Readable<I> && requires { typename ranges::iterator_category_t<I>; } && DerivedFrom<ranges::iterator_category_t<I>, ranges::input_iterator_tag>;` | (ranges TS) |

The `InputIterator` concept is a refinement of `Iterator`, adding the requirement that the referenced values can be read (via `Readable`) and the requirement that the iterator category tag be present.

### Notes

Unlike the input iterator requirements in the C++ standard, `InputIterator` in the Ranges TS does not require `EqualityComparable`.
