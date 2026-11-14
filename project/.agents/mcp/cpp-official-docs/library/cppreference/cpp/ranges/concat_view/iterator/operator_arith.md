# std::ranges::concat_view<Views...>::*iterator*<Const>::operator++,--,+=,-=

|  |  |  |
| --- | --- | --- |
| `constexpr /*iterator*/& operator++();` | (1) | (since C++26) |
| `constexpr void operator++( int );` | (2) | (since C++26) |
| `constexpr /*iterator*/ operator++( int ) requires /*all-forward*/<Const, Views...>;` | (3) | (since C++26) |
| `constexpr /*iterator*/& operator--() requires /*concat-is-bidirectional*/<Const, Views...>;` | (4) | (since C++26) |
| `constexpr /*iterator*/ operator--( int ) requires /*concat-is-bidirectional*/<Const, Views...>;` | (5) | (since C++26) |
| `constexpr /*iterator*/& operator+=( difference_type n ) requires /*concat-is-random-access*/<Const, Views...>;` | (6) | (since C++26) |
| `constexpr /*iterator*/& operator-=( difference_type n ) requires /*concat-is-random-access*/<Const, Views...>;` | (7) | (since C++26) |

Increments or decrements the iterator.

| Overload | Equivalent to (let `I` be `it_ .index()`) |
| --- | --- |
| (1) | `++get-iter <I>(); satisfy <I>(); return *this;` |
| (2) | `++*this;` |
| (3) | `auto tmp = *this; ++*this; return tmp;` |
| (4) | `prev <I>(); return *this;` |
| (5) | `auto tmp = *this; --*this; return tmp;` |
| (6) | `auto offset = get-iter <I>() - get-begin <I>(); if (n > 0) advance-fwd <I>(offset, n); else if (n < 0) advance-bwd <I>(offset, -n); return *this;` |
| (7) | `*this += -n; return *this;` |

If `it_ .valueless_by_exception()` is `true`, the behavior is undefined.

### Parameters

n - position relative to current location

### Return value

As described above.

### Example

This section is incomplete Reason: no example
