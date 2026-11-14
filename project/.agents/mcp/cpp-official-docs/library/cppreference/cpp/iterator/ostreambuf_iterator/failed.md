# std::ostreambuf_iterator<CharT,Traits>::failed

|  |  |
| --- | --- |
| `bool failed() const throw();` | (until C++11) |
| `bool failed() const noexcept;` | (since C++11) |

Returns `true` if the iterator encountered the end-of-file condition, that is, if an earlier call to `std::basic_streambuf::sputc` (made by `operator=`) returned `Traits::eof`.

### Parameters

(none)

### Return value

`true` if this iterator has encountered the end-of-file condition on output, `false` otherwise.

### Example

This section is incomplete Reason: no example
