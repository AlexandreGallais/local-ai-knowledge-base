# operator==,!=(std::match_results)

| Defined in header `<regex>` |  |  |
| --- | --- | --- |
| `template< class BidirIt, class Alloc > bool operator==( match_results<BidirIt,Alloc>& lhs, match_results<BidirIt,Alloc>& rhs );` | (1) | (since C++11) |
| `template< class BidirIt, class Alloc > bool operator!=( match_results<BidirIt,Alloc>& lhs, match_results<BidirIt,Alloc>& rhs );` | (2) | (since C++11) (until C++20) |

Compares two `match_results` objects.

Two `match_results` are equal if the following conditions are met:

- neither of the objects is *ready*, *or*
- both match results are *ready* and the following conditions are met:

- `lhs.empty()` and `rhs.empty()`, *or*
- `!lhs.empty()` and `!rhs.empty()` and the following conditions are met:

- `lhs.prefix() == rhs.prefix()`
- `lhs.size() == rhs.size() && std::equal(lhs.begin(), lhs.end(), rhs.begin())`
- `lhs.suffix() == rhs.suffix()`

1) Checks if `lhs` and `rhs` are equal.

2) Checks if `lhs` and `rhs` are not equal.

The `!=` operator is synthesized from `operator==`. (since C++20)

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs, rhs | - | match results to compare |
| Type requirements |  |  |
| - `BidirIt` must meet the requirements of LegacyBidirectionalIterator. |  |  |
| - `Alloc` must meet the requirements of Allocator. |  |  |

### Return value

1) `true` if `lhs` and `rhs` are equal, `false` otherwise.

2) `true` if `lhs` and `rhs` are not equal, `false` otherwise.

### Exceptions

May throw implementation-defined exceptions.

### Example

This section is incomplete Reason: no example
