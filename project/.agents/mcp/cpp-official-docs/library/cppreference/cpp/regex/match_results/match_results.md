# std::match_results<BidirIt,Alloc>::match_results

|  |  |
| --- | --- |
| `match_results() : match_results(Allocator()) {}` | (1) |
| `explicit match_results( const Allocator& a );` | (2) |
| `match_results( const match_results& rhs );` | (3) |
| `match_results( const match_results& rhs, const Allocator& a );` | (4) |
| `match_results( match_results&& rhs ) noexcept;` | (5) |
| `match_results( match_results&& rhs, const Allocator& a );` | (6) |

1,2) Constructs a match result with no established result state.

1) The default constructor.

2) Constructs the match result using a copy of `a` as the allocator.

When the construction finishes, `ready()` returns `false` and `size()` returns `​0​`.

3-6) Constructs a match result from `rhs`.

3) The copy constructor.

4) Constructs the match result using a copy of `a` as the allocator.

5) The move constructor. When the construction finishes, `rhs` is in a valid but unspecified state.

6) Constructs the match result using a copy of `a` as the allocator. When the construction finishes, `rhs` is in a valid but unspecified state.

Given the value of `rhs` before the construction as `m` and any integer in `[``​0​``,``m.size()``)` as `n`, when the construction finishes, the following member functions should return the specified values:

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

|  |  |  |
| --- | --- | --- |
| a | - | allocator to use for all memory allocations of this container |
| rhs | - | another `match_results` to use as source to initialize the `match_results` with |

### Exceptions

1-4) May throw implementation-defined exceptions.

6) Throws nothing if `a == rhs.get_allocator()` is `true`.

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2191 | C++11 | `n` could be negative in the postconditions of overloads (3-6) | can only be non-negative |
| LWG 2195 | C++11 | the constructors required by AllocatorAwareContainer were missing | added |
| P0935R0 | C++11 | default constructor was explicit | made implicit |
