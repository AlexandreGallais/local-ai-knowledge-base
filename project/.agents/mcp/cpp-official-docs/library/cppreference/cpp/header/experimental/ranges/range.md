# Standard library header <experimental/ranges/range>

This header is part of the ranges library.

### Range concepts

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| Range | specifies that a type is a range, that is, it provides a `begin` iterator and an `end` sentinel (concept) |
| SizedRange | specifies that a range knows its size in constant time (concept) |
| View | specifies that a range is a view, that is, it has constant time copy/move/assignment (concept) |
| BoundedRange | specifies that a range has identical iterator and sentinel types (concept) |
| InputRange | specifies a range whose iterator type satisfies `InputIterator` (concept) |
| OutputRange | specifies a range whose iterator type satisfies `OutputIterator` (concept) |
| ForwardRange | specifies a range whose iterator type satisfies `ForwardIterator` (concept) |
| BidirectionalRange | specifies a range whose iterator type satisfies `BidirectionalIterator` (concept) |
| RandomAccessRange | specifies a range whose iterator type satisfies `RandomAccessIterator` (concept) |

### Range access

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| begin, cbegin | returns an iterator to the beginning of a range (customization point object) |
| end, cend | returns an iterator to the end of a range (customization point object) |
| rbegin, crbegin | returns a reverse iterator to a range (customization point object) |
| rend, crend | returns a reverse end iterator to a range (customization point object) |

### Range primitives

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| size | obtains the size of a range whose size can be calculated in constant time (customization point object) |
| empty | checks whether a range is empty (customization point object) |
| data, cdata | obtains a pointer to the beginning of a contiguous range (customization point object) |
| iterator_t, sentinel_t | obtains the iterator and sentinel types of a range (alias template) |

### Synopsis

```cpp
#include <experimental/ranges/iterator>

namespace std { namespace experimental { namespace ranges { inline namespace v1 {

namespace {
  constexpr /* unspecified */ begin = /* unspecified */;
  constexpr /* unspecified */ end = /* unspecified */;
  constexpr /* unspecified */ cbegin = /* unspecified */;
  constexpr /* unspecified */ cend = /* unspecified */;
  constexpr /* unspecified */ rbegin = /* unspecified */;
  constexpr /* unspecified */ rend = /* unspecified */;
  constexpr /* unspecified */ crbegin = /* unspecified */;
  constexpr /* unspecified */ crend = /* unspecified */;
}

namespace {
  constexpr /* unspecified */ size = /* unspecified */;
  constexpr /* unspecified */ empty = /* unspecified */;
  constexpr /* unspecified */ data = /* unspecified */;
  constexpr /* unspecified */ cdata = /* unspecified */;
}

template <class T>
using iterator_t = decltype(ranges::begin(declval<T&>()));

template <class T>
using sentinel_t = decltype(ranges::end(declval<T&>()));

template <class>
constexpr bool disable_sized_range = false;

template <class T>
struct enable_view { };

struct view_base { };

template <class T>
concept bool Range = /* see definition */;

template <class T>
concept bool SizedRange = /* see definition */;

template <class T>
concept bool View = /* see definition */;

template <class T>
concept bool BoundedRange = /* see definition */;

template <class T>
concept bool InputRange = /* see definition */;

template <class R, class T>
concept bool OutputRange = /* see definition */;

template <class T>
concept bool ForwardRange = /* see definition */;

template <class T>
concept bool BidirectionalRange = /* see definition */;

template <class T>
concept bool RandomAccessRange = /* see definition */;

}}}}
```
