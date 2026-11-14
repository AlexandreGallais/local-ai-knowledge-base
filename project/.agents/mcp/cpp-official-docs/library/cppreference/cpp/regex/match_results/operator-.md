# std::match_results<BidirIt,Alloc>::operator=

| Defined in header `<regex>` |  |
| --- | --- |
| `match_results& operator=( const match_results& other );` | (1) |
| `match_results& operator=( match_results&& other ) noexcept;` | (2) |

Assigns the contents.

1) Copy assignment operator. Assigns the contents of `other`.

2) Move assignment operator. Assigns the contents of `other` using move semantics. `other` is in a valid, but unspecified state after the operation.

Given the value of `other` before the assignment as `m` and any integer in `[``​0​``,``m.size()``)` as `n`, when the assignment finishes, the following member functions should return the specified values:

| Member function | Value |
| --- | --- |
| `ready()` | `m.ready()` |
| `size()` | `m.size()` |
| `str(n)` | `m.str(n)` |
| `prefix()` | `m.prefix()` |
| `suffix()` | `m.suffix()` |
| `operator[](n)` | `m[n]` |
| `length(n)` | `m.length(n)` |
| `position(n)` | `m.position(n)` |

### Parameters

other - another match results object

### Return value

`*this`

### Exceptions

1) May throw implementation-defined exceptions.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2191 | C++11 | `n` could be negative in the postconditions | can only be non-negative |
