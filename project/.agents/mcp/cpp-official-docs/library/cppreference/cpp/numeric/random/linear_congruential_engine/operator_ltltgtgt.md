# operator<<,>>(std::linear_congruential_engine)

|  |  |  |
| --- | --- | --- |
| `template< class CharT, class Traits > friend std::basic_ostream<CharT, Traits>& operator<<( std::basic_ostream<CharT, Traits>& os, const linear_congruential_engine& e );` | (1) | (since C++11) |
| `template< class CharT, class Traits > friend std::basic_istream<CharT, Traits>& operator>>( std::basic_istream<CharT, Traits>& is, linear_congruential_engine& e );` | (2) | (since C++11) |

1) Writes the textual representation of the current state of `e` to `os` with fmtflags set to `std::ios_base::dec | std::ios_base::left` and the fill character set to the space character.

After writing, `os`'s original fmtflags and fill character are restored.

2) Reads a textual representation of engine state from `is` (denoted as `text`) with fmtflags set to `std::ios_base::dec`, and sets the state of `e` to that state.

After reading, `is`'s original fmtflags is restored.

- If `text` was not previously written using an output stream `pr`, the behavior is undefined.
- Otherwise, if any of the following values is `false`, the behavior is undefined:

- `is.getloc() == pr.getloc()`
- `std::is_same<decltype(is)::char_type, decltype(pr)::char_type>::value`
- `std::is_same<decltype(is)::traits_type, decltype(pr)::traits_type>::value`

- Otherwise, if `text` is not a valid textual representation of any state of `decltype(e)`, the state of `e` is unchanged and `is.setstate(std::ios_base::failbit)` is called.
- Otherwise, given another engine `eng` of the same type as `e`. If `text` was previously written by `pr << eng` and there is no intervening invocations of `e` or of `eng` between `pr << eng` and `is >> e`, `e == eng` is `true`.

These function templates are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `decltype(e)` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| os | - | output stream to insert the data to |
| is | - | input stream to extract the data from |
| e | - | pseudo-random number engine |

### Return value

1) `os`

2) `is`

### Complexity

1,2) Constant.

### Exceptions

2) May throw `std::ios_base::failure` when setting `std::ios_base::failbit`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3519 | C++11 | the form of insertion and extraction operators were unspecified | specified to be hidden friends |
