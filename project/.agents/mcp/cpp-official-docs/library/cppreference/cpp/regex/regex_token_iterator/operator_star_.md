# std::regex_token_iterator<BidirIt,CharT,Traits>::operator*, operator->

|  |  |  |
| --- | --- | --- |
| `const value_type& operator*() const;` | (1) | (since C++11) |
| `const value_type* operator->() const;` | (2) | (since C++11) |

Returns a pointer or reference to the current match.

### Return value

1) Returns a reference to the current match.

2) Returns a pointer to the current match.

The behavior is undefined if the iterator is end-of-sequence iterator.
