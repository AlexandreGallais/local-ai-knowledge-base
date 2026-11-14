# std::experimental::ostream_joiner<DelimT,CharT,Traits>::operator=

|  |  |  |
| --- | --- | --- |
| `template< class T > ostream_joiner& operator=( const T& value );` | (1) | (library fundamentals TS v2) |
| `ostream_joiner& operator=( const ostream_joiner& other ) = default;` | (2) | (library fundamentals TS v2) (implicitly declared) |
| `ostream_joiner& operator=( ostream_joiner&& other ) = default;` | (3) | (library fundamentals TS v2) (implicitly declared) |

1) First, if the private "first element" flag is `false`, insert the delimiter `delim` into the output stream `os` associated with this iterator as if by `os << delim;`.

Then, unconditionally sets the "first element" flag to `false`, and insert `value` into the output stream as if by `os << value;`.

Let `out_stream`, `delim`, and `first_element` denote the private stream pointer, delimiter, and "first element" flag members respectively. Then this function is equivalent to

```cpp
if (!first_element)
    *out_stream << delim;
first_element = false;
*out_stream << value;
return *this;
```

2,3) Implicitly declared copy/move assignment operator that copy/move assigns the private stream pointer, delimiter, and "first element" flag members.

### Parameters

|  |  |  |
| --- | --- | --- |
| value | - | the object to to be written to the stream |
| other | - | the `ostream_joiner` object to be assigned to this object |

### Return value

`*this`.

### Example

```cpp
#include <experimental/iterator>
#include <iostream>

int main()
{
    auto joiner = std::experimental::make_ostream_joiner(std::cout, ", ");
    joiner = "First";
    joiner = "do no harm.";  // prefixes with the delimiter
}
```

Output:

```text
First, do no harm.
```
