# operator<<,>>(std::shuffle_order_engine)

|  |  |  |
| --- | --- | --- |
| `template< class CharT, class Traits > friend std::basic_ostream<CharT,Traits>& operator<<( std::basic_ostream<CharT,Traits>& ost, shuffle_order_engine<>& e );` | (1) | (since C++11) |
| `template< class CharT, class Traits > friend std::basic_istream<CharT,Traits>& operator>>( std::basic_istream<CharT,Traits>& ist, shuffle_order_engine& e );` | (2) | (since C++11) |

1) Serializes the internal state of the pseudo-random number engine adaptor as a sequence of decimal numbers separated by one or more spaces, and inserts it to the stream `ost`. The fill character and the formatting flags of the stream are ignored and unaffected.

2) Restores the internal state of the pseudo-random number engine adaptor `e` from the serialized representation, which was created by an earlier call to `operator<<` using a stream with the same imbued locale and the same `CharT` and `Traits`. If the input cannot be deserialized, `e` is left unchanged and `failbit` is raised on `ist`.

These function templates are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when std::shuffle_order_engine<Engine, k> is an associated class of the arguments.

If a textual representation is written using `os << x` and that representation is restored into the same or a different object `y` of the same type using `is >> y`, then `x == y`.

This section is incomplete Reason: standard also defines what the textual representation consists of

### Parameters

|  |  |  |
| --- | --- | --- |
| ost | - | output stream to insert the data to |
| ist | - | input stream to extract the data from |
| e | - | engine adaptor to serialize or restore |

### Return value

1) `ost`

2) `ist`

### Complexity

This section is incomplete

### Exceptions

1) May throw implementation-defined exceptions.

2) May throw `std::ios_base::failure` when setting `failbit`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3519 | C++11 | the form of insertion and extraction operators were unspecified | specified to be hidden friends |
