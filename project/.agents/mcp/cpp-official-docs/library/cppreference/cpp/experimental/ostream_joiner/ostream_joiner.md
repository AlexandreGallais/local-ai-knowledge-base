# std::experimental::ostream_joiner<DelimT,CharT,Traits>::ostream_joiner

|  |  |  |
| --- | --- | --- |
| `ostream_joiner( ostream_type& stream, const DelimT& delimiter );` | (1) | (library fundamentals TS v2) |
| `ostream_joiner( ostream_type& stream, DelimT&& delimiter );` | (2) | (library fundamentals TS v2) |
| `ostream_joiner( const ostream_joiner& other ) = default;` | (3) | (library fundamentals TS v2) (implicitly declared) |
| `ostream_joiner( ostream_joiner&& other ) = default;` | (4) | (library fundamentals TS v2) (implicitly declared) |

1) Constructs the iterator with the private `ostream_type*` member initialized with `std::addressof(stream)`, the private delimiter member initialized with `delimiter`, and the private "first element" flag set to `true`.

2) Constructs the iterator with the private `ostream_type*` member initialized with `std::addressof(stream)`, the private delimiter member initialized with `std::move(delimiter)`, and the private "first element" flag set to `true`.

3,4) Implicitly declared copy/move constructor that copy/move constructs the private stream pointer, delimiter, and "first element" flag members.

### Parameters

|  |  |  |
| --- | --- | --- |
| stream | - | the output stream to be accessed by this iterator |
| delimiter | - | the delimiter to be inserted into the stream in between two outputs |
| other | - | the `ostream_joiner` object from which this object is to be copy- or move-constructed |

### Example

This section is incomplete Reason: no example
