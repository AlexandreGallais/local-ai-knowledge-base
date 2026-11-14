# std::experimental::default_searcher, std::experimental::make_default_searcher

| Defined in header `<experimental/functional>` |  |
| --- | --- |
| `template< class ForwardIterator1, class BinaryPredicate = std::equal_to<> > class default_searcher;` | (library fundamentals TS) |

A class suitable for use with `std::experimental::search` that delegates the search operation to the standard library's `std::search`.

`default_searcher` is CopyConstructible and CopyAssignable.

### Member functions

## std::experimental::default_searcher::default_searcher

`default_searcher( ForwardIterator pat_first, ForwardIterator pat_last, BinaryPredicate pred = BinaryPredicate() );`

Constructs a `default_searcher` by storing copies of `pat_first`, `pat_last`, and `pred`.

### Parameters

|  |  |  |
| --- | --- | --- |
| pat_first, pat_last | - | a pair of iterators designating the string to be searched for |
| pred | - | a callable object used to determine equality |

### Exceptions

Any exceptions thrown by the copy constructors of `BinaryPredicate` or `ForwardIterator`.

## std::experimental::default_searcher::operator()

|  |  |
| --- | --- |
| `template< class ForwardIterator2 > ForwardIterator2 operator()( ForwardIterator2 first, ForwardIterator2 last ) const;` | (until C++17) |
| `template< class ForwardIterator2 > std::pair<ForwardIterator2, ForwardIterator2> operator()( ForwardIterator2 first, ForwardIterator2 last ) const;` | (since C++17) |

The member function called by `std::experimental::search` to perform a search with this searcher.

|  |  |
| --- | --- |
| Equivalent to `std::search(first, last, pat_first, pat_last, pred);`. | (until C++17) |
| Returns a pair of iterators `i, j`, where `i` is `std::search(first, last, pat_first, pat_last, pred)` and `j` is `std::next(i, std::distance(pat_first, pat_last))` unless `std::search` returned `last` (no match), in which case `j` equals `last` as well. | (until C++17) |

### Parameters

first, last - a pair of iterators designating the string to be examined

### Return value

|  |  |
| --- | --- |
| Iterator to the first position in `[``first``,``last``)` where a subsequence that compares equal to `[``pat_first``,``pat_last``)` as defined by `pred` is located, or a copy of `last` otherwise. | (until C++17) |
| A pair of iterators to the first and one past last positions in `[``first``,``last``)` where a subsequence that compares equal to `[``pat_first``,``pat_last``)` as defined by `pred` is located, or a pair of copies of `last` otherwise. | (since C++17) |

### Helper Functions

`template< class ForwardIterator, class BinaryPredicate = std::equal_to<> > default_searcher<ForwardIterator, BinaryPredicate> make_default_searcher( ForwardIterator pat_first, ForwardIterator pat_last, BinaryPredicate pred = BinaryPredicate());` (library fundamentals TS)

Helper function that constructs a `std::experimental::default_searcher` using template argument deduction. Equivalent to `return default_searcher<ForwardIterator, BinaryPredicate>(pat_first, pat_last, pred);`

### Parameters

|  |  |  |
| --- | --- | --- |
| pat_first, pat_last | - | a pair of iterators designating the string to be searched for |
| pred | - | a callable object used to determine equality |

### Return value

A `default_searcher` constructed with the arguments `pat_first`, `pat_last`, `pred`.

### Example

```cpp
#include <experimental/algorithm>
#include <experimental/functional>
#include <iostream>
#include <string>

int main()
{
    std::string in = "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
                     " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
    std::string needle = "pisci";
    auto it = std::experimental::search(in.begin(), in.end(),
                  std::experimental::make_default_searcher(
                      needle.begin(), needle.end()));
    if (it != in.end())
        std::cout << "The string " << needle << " found at offset "
                  << it - in.begin() << '\n';
    else
        std::cout << "The string " << needle << " not found\n";
}
```

Output:

```text
The string pisci found at offset 43
```

### See also

search searches for the first occurrence of a range of elements (function template)
