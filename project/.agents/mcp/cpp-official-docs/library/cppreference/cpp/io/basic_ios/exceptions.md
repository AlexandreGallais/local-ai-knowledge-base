# std::basic_ios<CharT,Traits>::exceptions

|  |  |
| --- | --- |
| `std::ios_base::iostate exceptions() const;` | (1) |
| `void exceptions( std::ios_base::iostate except );` | (2) |

Gets and sets the exception mask of the stream. The exception mask determines which error states trigger exceptions of type `failure`.

1) Returns the exception mask.

2) Sets the exception mask to `except`. If the stream has an error state covered by the exception mask when called, an exception is immediately triggered.

### Parameters

except - exception mask

### Return value

1) The current exception mask.

2) (none)

### Notes

This section is incomplete Reason: discuss LWG2349 and link from ios_base::clear, and from (un)formatted(i/o)utputfunction requirement pages (or perhaps the behavior should be fully elaborated on the requirement pages and linked from here). See also stackoverflow.com/a/35089910

### Example

```cpp
#include <fstream>
#include <iostream>

int main()
{
    int ivalue;
    try
    {
        std::ifstream in("in.txt");
        in.exceptions(std::ifstream::failbit); // may throw
        in >> ivalue; // may throw
    }
    catch (const std::ios_base::failure& fail)
    {
        // handle exception here
        std::cout << fail.what() << '\n';
    }
}
```

Possible output:

```text
basic_ios::clear: iostream error
```
