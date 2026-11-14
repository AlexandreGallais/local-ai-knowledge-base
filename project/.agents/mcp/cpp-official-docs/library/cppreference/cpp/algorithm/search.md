# std::search

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class ForwardIt1, class ForwardIt2 > ForwardIt1 search( ForwardIt1 first, ForwardIt1 last, ForwardIt2 s_first, ForwardIt2 s_last );` | (1) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 > ForwardIt1 search( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 s_first, ForwardIt2 s_last );` | (2) | (since C++17) |
| `template< class ForwardIt1, class ForwardIt2, class BinaryPred > ForwardIt1 search( ForwardIt1 first, ForwardIt1 last, ForwardIt2 s_first, ForwardIt2 s_last, BinaryPred p );` | (3) | (constexpr since C++20) |
| `template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2, class BinaryPred > ForwardIt1 search( ExecutionPolicy&& policy, ForwardIt1 first, ForwardIt1 last, ForwardIt2 s_first, ForwardIt2 s_last, BinaryPred p );` | (4) | (since C++17) |
| `template< class ForwardIt, class Searcher > ForwardIt search( ForwardIt first, ForwardIt last, const Searcher& searcher );` | (5) | (since C++17) (constexpr since C++20) |

1-4) Searches for the first occurrence of the sequence of elements `[``s_first``,``s_last``)` in the range `[``first``,``last``)`.

1) Elements are compared using `operator==`.

3) Elements are compared using the given binary predicate `p`.

2,4) Same as (1,3), but executed according to `policy`.

These overloads participate in overload resolution only if all following conditions are satisfied:

|  |  |
| --- | --- |
| `std::is_execution_policy_v<std::decay_t<ExecutionPolicy>>` is `true`. | (until C++20) |
| `std::is_execution_policy_v<std::remove_cvref_t<ExecutionPolicy>>` is `true`. | (since C++20) |

5) Searches the range `[``first``,``last``)` for the pattern specified in the constructor of `searcher`.

The standard library provides the following searchers: default_searcher (C++17) standard C++ library search algorithm implementation (class template) boyer_moore_searcher (C++17) Boyer-Moore search algorithm implementation (class template) boyer_moore_horspool_searcher (C++17) Boyer-Moore-Horspool search algorithm implementation (class template) (since C++17)

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the range of elements to examine |
| s_first, s_last | - | the range of elements to search for |
| policy | - | the execution policy to use |
| searcher | - | the searcher encapsulating the search algorithm and the pattern to look for |
| p | - | binary predicate which returns ​`true` if the elements should be treated as equal. The signature of the predicate function should be equivalent to the following: `bool pred(const Type1 &a, const Type2 &b);` While the signature does not need to have `const &`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1 &` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that objects of types `ForwardIt1` and `ForwardIt2` can be dereferenced and then implicitly converted to `Type1` and `Type2` respectively. ​ |
| Type requirements |  |  |
| - `ForwardIt1, ForwardIt2` must meet the requirements of LegacyForwardIterator. |  |  |
| - `BinaryPred` must meet the requirements of BinaryPredicate. |  |  |

### Return value

1-4) Iterator to the beginning of first occurrence of the sequence `[``s_first``,``s_last``)` in the range `[``first``,``last``)`. If no such occurrence is found, `last` is returned.

If `[``s_first``,``s_last``)` is empty, `first` is returned.

5) `searcher(first, last).first`.

### Complexity

1-4) Given \(\scriptsize N\)N as `std::distance(first, last)` and \(\scriptsize S\)S as `std::distance(s_first, s_last)`:

1,2) At most \(\scriptsize N\cdot S\)N·S comparisons using `operator==`.

3,4) At most \(\scriptsize N\cdot S\)N·S applications of the predicate `p`.

5) Depends on `searcher`.

### Exceptions

The overloads with a template parameter named `ExecutionPolicy` report errors as follows:

- If execution of a function invoked as part of the algorithm throws an exception and `ExecutionPolicy` is one of the standard policies, `std::terminate` is called. For any other `ExecutionPolicy`, the behavior is implementation-defined.
- If the algorithm fails to allocate memory, `std::bad_alloc` is thrown.

### Possible implementation

search (1)

`template<class ForwardIt1, class ForwardIt2> constexpr //< since C++20 ForwardIt1 search(ForwardIt1 first, ForwardIt1 last, ForwardIt2 s_first, ForwardIt2 s_last) { while (true) { ForwardIt1 it = first; for (ForwardIt2 s_it = s_first; ; ++it, ++s_it) { if (s_it == s_last) return first; if (it == last) return last; if (!(*it == *s_it)) break; } ++first; } }`

search (3)

`template<class ForwardIt1, class ForwardIt2, class BinaryPred> constexpr //< since C++20 ForwardIt1 search(ForwardIt1 first, ForwardIt1 last, ForwardIt2 s_first, ForwardIt2 s_last, BinaryPred p) { while (true) { ForwardIt1 it = first; for (ForwardIt2 s_it = s_first; ; ++it, ++s_it) { if (s_it == s_last) return first; if (it == last) return last; if (!p(*it, *s_it)) break; } ++first; } }`

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <functional>
#include <iomanip>
#include <iostream>
#include <iterator>
#include <string_view>
#include <vector>

using namespace std::literals;

bool contains(const auto& cont, std::string_view s)
{
    // str.find() (or str.contains(), since C++23) can be used as well
    return std::search(cont.begin(), cont.end(), s.begin(), s.end()) != cont.end();
}

int main()
{
    const auto str{"why waste time learning, when ignorance is instantaneous?"sv};
    assert(contains(str, "learning"));
    assert(not contains(str, "lemming"));

    const std::vector vec(str.begin(), str.end());
    assert(contains(vec, "learning"));
    assert(not contains(vec, "leaning"));

    // The C++17 overload with searchers demo:
    constexpr auto quote
    {
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed "
        "do eiusmod tempor incididunt ut labore et dolore magna aliqua"sv
    };

    for (const auto word : {"pisci"sv, "Pisci"sv})
    {
        std::cout << "The string " << std::quoted(word) << ' ';
        const std::boyer_moore_searcher searcher(word.begin(), word.end());
        const auto it = std::search(quote.begin(), quote.end(), searcher);
        if (it == quote.end())
            std::cout << "not found\n";
        else
            std::cout << "found at offset " << std::distance(quote.begin(), it) << '\n';
    }
}
```

Output:

```text
The string "pisci" found at offset 43
The string "Pisci" not found
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 1205 | C++98 | the return value was unclear if `[``s_first``,``s_last``)` is empty | returns `first` in this case |
| LWG 1338 | C++98 | the resolution of LWG issue 1205 was incorrectly applied, making `first` to be returned if no occurence is found | returns `last` in this case |
| LWG 2150 | C++98 | the condition of “sequence occurence” was incorrect | corrected |

### See also

|  |  |
| --- | --- |
| find_end | finds the last sequence of elements in a certain range (function template) |
| includes | returns `true` if one sequence is a subsequence of another (function template) |
| equal | determines if two sets of elements are the same (function template) |
| find, find_if, find_if_not (C++11) | finds the first element satisfying specific criteria (function template) |
| lexicographical_compare | returns `true` if one range is lexicographically less than another (function template) |
| mismatch | finds the first position where two ranges differ (function template) |
| search_n | searches for the first occurrence of a number consecutive copies of an element in a range (function template) |
| default_searcher (C++17) | standard C++ library search algorithm implementation (class template) |
| boyer_moore_searcher (C++17) | Boyer-Moore search algorithm implementation (class template) |
| boyer_moore_horspool_searcher (C++17) | Boyer-Moore-Horspool search algorithm implementation (class template) |
| ranges::search (C++20) | searches for the first occurrence of a range of elements (algorithm function object) |
