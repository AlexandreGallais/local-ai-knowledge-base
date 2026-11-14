# std::experimental::filesystem::swap(std::experimental::filesystem::path)

`void swap( path& lhs, path& rhs );` (filesystem TS)

Exchanges the state of `lhs` with that of `rhs`. Effectively calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - paths whose states to swap

### Return value

(none)

### Exceptions

`noexcept` specification:

`noexcept`

### See also

swap swaps two paths (public member function)
