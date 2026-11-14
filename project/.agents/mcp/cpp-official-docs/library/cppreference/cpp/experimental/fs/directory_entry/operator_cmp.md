# std::experimental::filesystem::directory_entry::operator==,!=,<,<=,>,>=

|  |  |  |
| --- | --- | --- |
| `bool operator==( const directory_entry& rhs ) const;` | (1) | (filesystem TS) |
| `bool operator!=( const directory_entry& rhs ) const;` | (2) | (filesystem TS) |
| `bool operator<( const directory_entry& rhs ) const;` | (3) | (filesystem TS) |
| `bool operator<=( const directory_entry& rhs ) const;` | (4) | (filesystem TS) |
| `bool operator>( const directory_entry& rhs ) const;` | (5) | (filesystem TS) |
| `bool operator>=( const directory_entry& rhs ) const;` | (6) | (filesystem TS) |

Compares the path with the directory entry `rhs`.

### Parameters

rhs - directory_entry to compare

### Return value

1) `true` if `path() == rhs.path()`, `false` otherwise.

2) `true` if `path() != rhs.path()`, `false` otherwise.

3) `true` if `path() < rhs.path()`, `false` otherwise.

4) `true` if `path() <= rhs.path()`, `false` otherwise.

5) `true` if `path() > rhs.path()`, `false` otherwise.

6) `true` if `path() >= rhs.path()`, `false` otherwise.

### Exceptions

`noexcept` specification:

`noexcept`

### See also

path, operator const path& returns the path the entry refers to (public member function)
