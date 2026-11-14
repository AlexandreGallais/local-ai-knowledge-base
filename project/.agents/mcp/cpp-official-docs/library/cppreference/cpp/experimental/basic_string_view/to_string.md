# std::experimental::basic_string_view<CharT,Traits>::to_string, std::experimental::basic_string_view<CharT,Traits>::operator basic_string

|  |  |
| --- | --- |
| `template<class Allocator = allocator<CharT>> basic_string<CharT, Traits, Allocator> to_string(const Allocator& a = Allocator()) const;` | (library fundamentals TS) |
| `template<class Allocator> explicit operator basic_string<CharT, Traits, Allocator>() const;` | (library fundamentals TS) |

Creates a `basic_string` with a copy of the content of the current view.

### Template parameters

Allocator - Allocator type used to allocate internal storage

### Parameters

a - Allocator instance to use for allocating the new string

### Return value

A `basic_string` containing a copy of the characters of the current view.

### Complexity

Linear in `size()`
