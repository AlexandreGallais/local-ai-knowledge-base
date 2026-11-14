# std::basic_syncbuf<CharT,Traits,Allocator>::get_wrapped

`streambuf_type* get_wrapped() const noexcept;`

Returns a pointer to the wrapped `std::basic_streambuf`.

### Parameters

(none)

### Notes

This function is not expected to be called directly: it is called through `std::basic_osyncstream::get_wrapped`.

### Example

This section is incomplete Reason: no example

### See also

get_wrapped obtains a pointer to the final destination stream buffer (public member function of `std::basic_osyncstream<CharT,Traits,Allocator>`)
