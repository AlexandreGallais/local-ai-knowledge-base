# std::basic_streambuf<CharT,Traits>::pubimbue, std::basic_streambuf<CharT,Traits>::imbue

|  |  |
| --- | --- |
| `std::locale pubimbue( const std::locale& loc );` | (1) |
| `protected: virtual void imbue( const std::locale& loc );` | (2) |

Changes the associated locale.

1) Sets `loc` as the associated locale. Calls `imbue(loc)` of the most derived class

2) The base class version of this function has no effect. The derived classes may override this function in order to be informed about the changes of the locale. The derived class may cache the locale and member facets between calls to `imbue()`.

### Parameters

loc - locale object to associate

### Return value

1) Previous associated locale.

2) (none)

### Notes

From within the call of `imbue()`, `getloc()` returns the previous locale.

### Example

This section is incomplete Reason: no example

### See also

getloc obtains a copy of the associated locale (public member function)
