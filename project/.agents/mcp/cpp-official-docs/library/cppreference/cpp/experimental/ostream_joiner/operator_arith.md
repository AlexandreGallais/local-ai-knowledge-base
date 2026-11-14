# std::experimental::ostream_joiner<DelimT,CharT,Traits>::operator++

|  |  |
| --- | --- |
| `ostream_joiner& operator++() noexcept;` | (library fundamentals TS v2) |
| `ostream_joiner& operator++( int ) noexcept;` | (library fundamentals TS v2) |

Does nothing. These operator overloads are provided to satisfy the requirements of LegacyOutputIterator. They make it possible for the expressions `*iter++=value` and `*++iter=value` to be used to output (insert) a value into the underlying stream.

### Parameters

(none)

### Return value

`*this`
