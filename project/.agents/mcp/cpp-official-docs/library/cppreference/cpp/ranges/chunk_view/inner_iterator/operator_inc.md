# std::ranges::chunk_view<V>::*inner-iterator*::operator++

|  |  |  |
| --- | --- | --- |
| `constexpr /*inner-iterator*/& operator++();` | (1) | (since C++23) |
| `constexpr void operator++( int );` | (2) | (since C++23) |

Increments the iterator.

Let `parent_` be the underlying pointer to enclosing `chunk_view`.

1) Equivalent to:

```cpp
++*parent_->current_;
if (*parent_->current_ == ranges::end(parent_->base_))
    parent_->remainder_ = 0;
else
    --parent_->remainder_;
return *this;
```

Before invocation of this operator the expression `*this == std::default_sentinel` must be `false`.

2) Equivalent to `++*this`.

### Parameters

(none)

### Return value

1) `*this`

2) (none)

### Example

This section is incomplete Reason: no example

### See also

operator- (C++23) calculates the number of chunks remained (function)
