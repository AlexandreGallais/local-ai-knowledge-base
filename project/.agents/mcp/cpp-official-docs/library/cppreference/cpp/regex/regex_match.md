# std::regex_match

| Defined in header `<regex>` |  |  |
| --- | --- | --- |
| `template< class BidirIt, class Alloc, class CharT, class Traits > bool regex_match( BidirIt first, BidirIt last, std::match_results<BidirIt, Alloc>& m, const std::basic_regex<CharT, Traits>& e, std::regex_constants::match_flag_type flags = std::regex_constants::match_default );` | (1) | (since C++11) |
| `template< class BidirIt, class CharT, class Traits > bool regex_match( BidirIt first, BidirIt last, const std::basic_regex<CharT, Traits>& e, std::regex_constants::match_flag_type flags = std::regex_constants::match_default );` | (2) | (since C++11) |
| `template< class CharT, class Alloc, class Traits > bool regex_match( const CharT* str, std::match_results<const CharT*, Alloc>& m, const std::basic_regex<CharT, Traits>& e, std::regex_constants::match_flag_type flags = std::regex_constants::match_default );` | (3) | (since C++11) |
| `template< class CharT, class Traits > bool regex_match( const CharT* str, const std::basic_regex<CharT, Traits>& e, std::regex_constants::match_flag_type flags = std::regex_constants::match_default );` | (4) | (since C++11) |
| `template< class STraits, class SAlloc, class Alloc, class CharT, class Traits > bool regex_match ( const std::basic_string<CharT, STraits, SAlloc>& s, std::match_results <typename std::basic_string<CharT, STraits, SAlloc>::const_iterator, Alloc>& m, const std::basic_regex<CharT, Traits>& e, std::regex_constants::match_flag_type flags = std::regex_constants::match_default );` | (5) | (since C++11) |
| `template< class STraits, class SAlloc, class CharT, class Traits > bool regex_match( const std::basic_string<CharT, STraits, SAlloc>& s, const std::basic_regex<CharT, Traits>& e, std::regex_constants::match_flag_type flags = std::regex_constants::match_default );` | (6) | (since C++11) |
| `template< class STraits, class SAlloc, class Alloc, class CharT, class Traits > bool regex_match ( const std::basic_string<CharT, STraits, SAlloc>&&, std::match_results <typename std::basic_string<CharT, STraits, SAlloc>::const_iterator, Alloc>&, const std::basic_regex<CharT, Traits>&, std::regex_constants::match_flag_type flags = std::regex_constants::match_default ) = delete;` | (7) | (since C++11) |

Determines if the regular expression `e` matches the entire target character sequence. The detailed match result is stored in `m` (if present).

1,2) The target character sequence is represented by the range `[``first``,``last``)`.

|  |  |
| --- | --- |
| If `BidirIt` does not satisfy the requirements of LegacyBidirectionalIterator, the behavior is undefined. | (until C++23) |
| If `BidirIt` does not model `bidirectional_iterator`, the behavior is undefined. | (since C++23) |

3,4) The target character sequence is represented by the range `[``str``,``str + std::char_traits<CharT>::length(str)``)`.

5,6) The target character sequence is represented by the string `s`.

7) The target character sequence cannot be represented by a `std::string` rvalue.

If the match does not exist, the following expressions involving `m` (if exists) should yield the specified values:

| Expression | Value |
| --- | --- |
| `m.ready()` | `true` |
| `m.size()` | `​0​` |
| `m.empty()` | `true` |

If the match exists, given any integer in `(``​0``,``m.size()``)` as `n`, the following expressions involving `m` should yield the specified values for each overload listed below:

| Expression | Value |  |  |
| --- | --- | --- | --- |
| Overload (1) | Overload (3) | Overload (5) |  |
| `m.ready()` | `true` |  |  |
| `m.size()` | `1 + e.mark_count()` |  |  |
| `m.empty()` | `false` |  |  |
| `m.prefix().first` | `first` | `str` | `s.begin()` |
| `m.prefix().second` |  |  |  |
| `m.prefix().matched` | `false`[1] |  |  |
| `m.suffix().first` | `last` | `std::char_traits<CharT>:: length(str) + str` | `s.end()` |
| `m.suffix().second` |  |  |  |
| `m.suffix().matched` | `false`[2] |  |  |
| `m[0].first` | `first` | `str` | `s.begin()` |
| `m[0].second` | `last` | `std::char_traits<CharT>:: length(str) + str` | `s.end()` |
| `m[0].matched` | `true`[3] |  |  |
| `m[n].first` | `last` if marked sub-expression `n` did not participate in the match the start of the sequence otherwise matching sub-expression `n` otherwise |  |  |
| `m[n].second` | `last` if marked sub-expression `n` did not participate in the match the end of the sequence otherwise matching sub-expression `n` otherwise |  |  |
| `m[n].matched` | `false` if marked sub-expression `n` did not participate in the match `true` otherwise |  |  |

1. ↑ The match prefix is empty.
2. ↑ The match suffix is empty.
3. ↑ The entire sequence is matched.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | the target character range |
| str | - | the target null-terminated C-style string |
| s | - | the target `std::basic_string` |
| m | - | the match results |
| e | - | the regular expression |
| flags | - | flags used to determine how the match will be performed |

### Return value

Returns `true` if the entire target sequence matches `e`, `false` otherwise.

### Notes

Because `regex_match` only considers full matches, the same regex may give different matches between `regex_match` and `std::regex_search`:

```cpp
std::regex re("Get|GetValue");
std::cmatch m;
std::regex_search("GetValue", m, re);  // returns true, and m[0] contains "Get"
std::regex_match ("GetValue", m, re);  // returns true, and m[0] contains "GetValue"
std::regex_search("GetValues", m, re); // returns true, and m[0] contains "Get"
std::regex_match ("GetValues", m, re); // returns false
```

### Example

```cpp
#include <cstddef>
#include <iostream>
#include <regex>
#include <string>

int main()
{
    // Simple regular expression matching
    const std::string fnames[] = {"foo.txt", "bar.txt", "baz.dat", "zoidberg"};
    const std::regex txt_regex("[a-z]+\\.txt");

    for (const auto& fname : fnames)
        std::cout << fname << ": " << std::regex_match(fname, txt_regex) << '\n';

    // Extraction of a sub-match
    const std::regex base_regex("([a-z]+)\\.txt");
    std::smatch base_match;

    for (const auto& fname : fnames)
        if (std::regex_match(fname, base_match, base_regex))
            // The first sub_match is the whole string; the next
            // sub_match is the first parenthesized expression.
            if (base_match.size() == 2)
            {
                std::ssub_match base_sub_match = base_match[1];
                std::string base = base_sub_match.str();
                std::cout << fname << " has a base of " << base << '\n';
            }

    // Extraction of several sub-matches
    const std::regex pieces_regex("([a-z]+)\\.([a-z]+)");
    std::smatch pieces_match;

    for (const auto& fname : fnames)
        if (std::regex_match(fname, pieces_match, pieces_regex))
        {
            std::cout << fname << '\n';
            for (std::size_t i = 0; i < pieces_match.size(); ++i)
            {
                std::ssub_match sub_match = pieces_match[i];
                std::string piece = sub_match.str();
                std::cout << "  submatch " << i << ": " << piece << '\n';
            }
        }
}
```

Output:

```text
foo.txt: 1
bar.txt: 1
baz.dat: 0
zoidberg: 0
foo.txt has a base of foo
bar.txt has a base of bar
foo.txt
  submatch 0: foo.txt
  submatch 1: foo
  submatch 2: txt
bar.txt
  submatch 0: bar.txt
  submatch 1: bar
  submatch 2: txt
baz.dat
  submatch 0: baz.dat
  submatch 1: baz
  submatch 2: dat
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2205 | C++11 | `n` could be zero in the postcondition | can only be positive |
| LWG 2273 | C++11 | it was unclear whether partial matches are considered | only considers full matches |
| LWG 2329 | C++11 | overload (5) accepted `basic_string` rvalues, which could result in dangling iterators | rejected via deleted overload (7) |

### See also

|  |  |
| --- | --- |
| basic_regex (C++11) | regular expression object (class template) |
| match_results (C++11) | identifies one regular expression match, including all sub-expression matches (class template) |
| regex_search (C++11) | attempts to match a regular expression to any part of a character sequence (function template) |
