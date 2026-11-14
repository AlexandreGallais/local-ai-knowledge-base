# std::ostreambuf_iterator<CharT,Traits>::operator=

`ostreambuf_iterator& operator=( CharT c );`

If `failed()` returns `false`, inserts the character `c` into the associated stream buffer by calling `pbuf->sputc(c)`, where `pbuf` is the private member of type `streambuf_type*`. Otherwise, does nothing.

If the call to `pbuf->sputc(c)` returns `Traits::eof`, sets the failed() flag to true.

### Parameters

c - the character to insert

### Return value

`*this`

### Example

This section is incomplete Reason: no example

### See also

sputc writes one character to the put area and advances the next pointer (public member function of `std::basic_streambuf<CharT,Traits>`)
