# std::chrono::month_weekday_last

| Defined in header `<chrono>` |  |
| --- | --- |
| `class month_weekday_last;` | (since C++20) |

The class `month_weekday_last` represents the last weekday of a specific month, of some yet to be specified year.

`month_weekday_last` is a TriviallyCopyable StandardLayoutType.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `month_weekday_last` (public member function) |
| month, weekday_last | retrieves the stored `month` and `weekday_last` values (public member function) |
| ok | checks whether the contained `month` and `weekday_last` are valid (public member function) |

### Nonmember functions

|  |  |
| --- | --- |
| operator== (C++20) | compares two `month_weekday_last` values (function) |
| operator<< (C++20) | outputs a `month_weekday_last` into a stream (function template) |

### Helper classes

|  |  |
| --- | --- |
| std::formatter<std::chrono::month_weekday_last> (C++20) | formatting support for `month_weekday_last` (class template specialization) |
| std::hash<std::chrono::month_weekday_last> (C++26) | hash support for **`std::chrono::month_weekday_last`** (class template specialization) |
