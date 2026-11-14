# std::experimental::basic_string_view<CharT,Traits>::compare

|  |  |  |
| --- | --- | --- |
| `constexpr int compare(basic_string_view v) const noexcept;` | (1) | (library fundamentals TS) |
| `constexpr int compare(size_type pos1, size_type count1, basic_string_view v) const` | (2) | (library fundamentals TS) |
| `constexpr int compare(size_type pos1, size_type count1, basic_string_view v, size_type pos2, size_type count2) const;` | (3) | (library fundamentals TS) |
| `constexpr int compare(const CharT* s) const;` | (4) | (library fundamentals TS) |
| `constexpr int compare(size_type pos1, size_type count1, const CharT* s) const;` | (5) | (library fundamentals TS) |
| `constexpr int compare(size_type pos1, size_type count1, const CharT* s, size_type count2) const;` | (6) | (library fundamentals TS) |

Compares two character sequences.

1) The length `rlen` of the sequences to compare is the smaller of `size()` and `v.size()`. The function compares the two views by calling `traits::compare(data(), v.data(), rlen)`, and returns a value according to the following table:

| Condition |  | Result | Return value |
| --- | --- | --- | --- |
| `Traits::compare(data(), v.data(), rlen) < 0` |  | `this` is *less* than `v` | `<0` |
| `Traits::compare(data(), v.data(), rlen) == 0` | `size() < v.size()` | `this` is *less* than `v` | `<0` |
| `size() == v.size()` | `this` is *equal* to `v` | `​0​` |  |
| `size() > v.size()` | `this` is *greater* than `v` | `>0` |  |
| `Traits::compare(data(), v.data(), rlen) > 0` |  | `this` is *greater* than `v` | `>0` |

2) Equivalent to `substr(pos1, count1).compare(v)`.

3) Equivalent to `substr(pos1, count1).compare(v.substr(pos2, count2))`.

4) Equivalent to `compare(basic_string_view(s))`.

5) Equivalent to `substr(pos1, count1).compare(basic_string_view(s))`.

6) Equivalent to `substr(pos1, count1).compare(basic_string_view(s, count2))`.

### Parameters

|  |  |  |
| --- | --- | --- |
| v | - | view to compare |
| s | - | pointer to the character string to compare to |
| count1 | - | number of characters of this view to compare |
| pos1 | - | position of the first character in this view to compare |
| count2 | - | number of characters of the given view to compare |
| pos2 | - | position of the first character of the given view to compare |

### Return value

negative value if this view is less than the other character sequence, zero if the both character sequences are equal, positive value if this view is greater than the other character sequence.

### Complexity

1) Linear in the number of characters compared.

### See also

operator==, operator!=, operator<, operator>, operator<=, operator>= lexicographically compares two views (function template)
