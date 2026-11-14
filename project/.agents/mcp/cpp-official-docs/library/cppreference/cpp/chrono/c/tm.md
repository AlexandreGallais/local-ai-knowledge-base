# std::tm

Defined in header `<ctime>`

`struct tm;`

Structure holding a calendar date and time broken down into its components.

### Member objects

|  |  |
| --- | --- |
| int tm_sec | seconds after the minute – `[``​0​``,``61``]`(until C++11) `[``​0​``,``60``]`(since C++11)[note 1] (public member object) |
| int tm_min | minutes after the hour – `[``​0​``,``59``]` (public member object) |
| int tm_hour | hours since midnight – `[``​0​``,``23``]` (public member object) |
| int tm_mday | day of the month – `[``1``,``31``]` (public member object) |
| int tm_mon | months since January – `[``​0​``,``11``]` (public member object) |
| int tm_year | years since 1900 (public member object) |
| int tm_wday | days since Sunday – `[``​0​``,``6``]` (public member object) |
| int tm_yday | days since January 1 – `[``​0​``,``365``]` (public member object) |
| int tm_isdst | Daylight Saving Time flag. The value is positive if DST is in effect, zero if not and negative if no information is available. (public member object) |

1. ↑ Range allows for a positive leap second. Two leap seconds in the same minute are not allowed (the range `[``​0​``,``61``]` was a defect introduced in C89 and corrected in C99).

### Notes

BSD, GNU and musl C library support two additional members, which are standardized in POSIX.1-2024.

|  |  |
| --- | --- |
| long tm_gmtoff | seconds east of UTC (public member object) |
| const char* tm_zone | timezone abbreviation (public member object) |

### Example

```cpp
#include <ctime>
#include <iostream>

int main()
{
    std::tm tm{};
    tm.tm_year = 2022 - 1900;
    tm.tm_mday = 1;
    std::mktime(&tm);

    std::cout << std::asctime(&tm); // note implicit trailing '\n'
}
```

Possible output:

```text
Sat Jan  1 00:00:00 2022
```

### See also

|  |  |
| --- | --- |
| localtime | converts time since epoch to calendar time expressed as local time (function) |
| gmtime | converts time since epoch to calendar time expressed as Universal Coordinated Time (function) |
| C documentation for tm |  |
