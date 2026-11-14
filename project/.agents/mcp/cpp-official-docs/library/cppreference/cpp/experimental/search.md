# std::experimental::search

| Defined in header `<experimental/algorithm>` |  |
| --- | --- |
| `template< class ForwardIterator, class Searcher > ForwardIterator search( ForwardIterator first, ForwardIterator last, const Searcher& searcher );` | (library fundamentals TS) |

Searches the sequence `[``first``,``last``)` for the pattern specified in the constructor of `searcher`.

|  |  |
| --- | --- |
| Effectively executes `searcher(first, last)`. | (until C++17) |
| Effectively executes `searcher(first, last).first`. | (since C++17) |

`Searcher` need not be CopyConstructible.

The standard library provides the following searchers:

|  |  |
| --- | --- |
| default_searcher | standard C++ library search algorithm implementation (class template) |
| boyer_moore_searcher | Boyer-Moore search algorithm implementation (class template) |
| boyer_moore_horspool_searcher | Boyer-Moore-Horspool search algorithm implementation (class template) |

### Parameters

This section is incomplete

### Return value

Returns the result of `searcher.operator()`, that is, an iterator to the location at which the substring is found or a copy of `last` if it was not found.

### Complexity

Depends on the searcher.

### Example

```cpp
#include <experimental/algorithm>
#include <experimental/functional>
#include <iostream>
#include <string>

int main()
{
    std::string in = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed "
                     "do eiusmod tempor incididunt ut labore et dolore magna aliqua";
    std::string needle = "pisci";
    auto it = std::experimental::search(in.begin(), in.end(),
                  std::experimental::make_boyer_moore_searcher(
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
