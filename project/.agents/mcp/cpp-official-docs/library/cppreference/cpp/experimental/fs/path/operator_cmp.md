# operator==,!=,<,<=,>,>=(std::experimental::filesystem::path)

|  |  |  |
| --- | --- | --- |
| `bool operator==( const path& lhs, const path& rhs );` | (1) | (filesystem TS) |
| `bool operator!=( const path& lhs, const path& rhs );` | (2) | (filesystem TS) |
| `bool operator<( const path& lhs, const path& rhs );` | (3) | (filesystem TS) |
| `bool operator<=( const path& lhs, const path& rhs );` | (4) | (filesystem TS) |
| `bool operator>( const path& lhs, const path& rhs );` | (5) | (filesystem TS) |
| `bool operator>=( const path& lhs, const path& rhs );` | (6) | (filesystem TS) |

Compares two paths lexicographically.

1) Checks whether `lhs` and `rhs` are equal. Equivalent to `!(lhs < rhs) && !(rhs < lhs)`.

2) Checks whether `lhs` and `rhs` are not equal. Equivalent to `!(lhs == rhs)`.

3) Checks whether `lhs` is less than `rhs`. Equivalent to `lhs.compare(rhs) < 0`.

4) Checks whether `lhs` is less than or equal to `rhs`. Equivalent to `!(rhs < lhs)`.

5) Checks whether `lhs` is greater than `rhs`. Equivalent to `rhs < lhs`.

6) Checks whether `lhs` is greater than or equal to `rhs`. Equivalent to `!(lhs < rhs)`.

### Parameters

lhs, rhs - the paths to compare

### Return value

`true` if the corresponding comparison yields, `false` otherwise.

### Exceptions

`noexcept` specification:

`noexcept`

### Notes

Path equality and equivalence have different semantics.

In the case of equality, as determined by `operator==`, only lexical representations are compared. Therefore, `path("a") == path("b")` is never `true`.

In the case of equivalence, as determined by `equivalent()`, it is checked whether two paths *resolve* to the same file system object. Thus `equivalent("a", "b")` will return `true` if the paths resolve to the same file.

### See also

compare compares the lexical representations of two paths lexicographically (public member function)
