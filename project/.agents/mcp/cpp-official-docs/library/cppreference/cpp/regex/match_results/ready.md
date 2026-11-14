# std::match_results<BidirIt,Alloc>::ready

`bool ready() const;` (since C++11)

Indicates if the match results are ready (valid) or not.

A default-constructed match result has no result state (is not *ready*), and can only be made ready by one of the regex algorithms. The *ready* state implies that all match results have been fully established.

The result of calling most member functions of the `match_results` object that is not *ready* is undefined.

### Return value

`true` if the match results are ready, `false` otherwise.

### Example

```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
    std::string target("big-red-cat");
    std::smatch sm;
    std::cout << "Default constructed smatch is "
              << (sm.ready() ? "ready.\n" : "not ready.\n");

    std::regex re1(".*-red-.*");
    std::regex_search(target, sm, re1);

    std::cout << "After search, smatch is "
              << (sm.ready() ? "ready.\n" : "not ready.\n");
}
```

Output:

```text
Default constructed smatch is not ready.
After search, smatch is ready.
```
