# std::use_facet

Defined in header `<locale>`

`template< class Facet > const Facet& use_facet( const std::locale& loc );`

Obtains a reference to a facet implemented by `loc`.

The program is ill-formed if Facet is not a facet whose definition contains the public static member `id` or it is a volatile-qualified facet.

### Parameters

loc - the locale object to query

### Return value

Returns a reference to the facet. The reference returned by this function is valid as long as any `std::locale` object refers to that facet.

### Exceptions

`std::bad_cast` if `std::has_facet<Facet>(loc) == false`.

### Notes

A `std::locale` object should not be a temporary if a reference to the `Facet` object obtained from `use_facet` is used after the end of statement:

```cpp
// BAD:
auto& f = std::use_facet<std::moneypunct<char, true>>(std::locale{"no_NO.UTF-8"});
foo(f.curr_symbol()); // Error: f internally uses a dangling reference
                      // to a std::locale object that no longer exists.
// GOOD:
auto loc = std::locale{"is_IS.UTF-8"}; // OK: a non-temporary object
auto& f = std::use_facet<std::moneypunct<char, true>>(loc);
foo(f.curr_symbol()); // OK: f internally uses a reference to existing locale object.
```

### Example

Display the 3-letter currency name used by the user's preferred locale.

```cpp
#include <iostream>
#include <locale>

int main()
{
    for (const char* name: {"en_US.UTF-8", "de_DE.UTF-8", "en_GB.UTF-8"})
        std::cout << "Your currency string is "
                  << std::use_facet<std::moneypunct<char, true>>(std::locale{name}).
                     curr_symbol() << '\n';
}
```

Output:

```text
Your currency string is USD
Your currency string is EUR
Your currency string is GBP
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 31 | C++98 | the returned reference remained usable as long as the locale value itself exists | the returned reference remains usable as long as some locale object refers to that facet |
| LWG 38 | C++98 | `Facet` was not required to have a direct member `id` | required |
| LWG 436 | C++98 | it was unclear whether `Facet` can be cv-qualified | it can be const-qualified, but not volatile-qualified |

### See also

|  |  |
| --- | --- |
| locale | set of polymorphic facets that encapsulate cultural differences (class) |
| has_facet | checks if a locale implements a specific facet (function template) |
