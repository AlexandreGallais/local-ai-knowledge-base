# std::swap(std::match_results)

| Defined in header `<regex>` |  |
| --- | --- |
| `template< class BidirIt, class Alloc > void swap( match_results<BidirIt,Alloc>& x1, match_results<BidirIt,Alloc>& x2 ) noexcept;` | (since C++11) |

Specializes the `std::swap` algorithm for `std::match_results`. Exchanges the contents of `x1` with those of `x2`. Effectively calls `x1.swap(x2)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| x1, x2 | - | the match_results objects whose contents will be swapped |
| Type requirements |  |  |
| - `BidirIt` must meet the requirements of LegacyBidirectionalIterator. |  |  |
| - `Alloc` must meet the requirements of Allocator. |  |  |

### Return value

(none)

### Example

This section is incomplete Reason: no example

### See also

swap swaps the contents (public member function)
