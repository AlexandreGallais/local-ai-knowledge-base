# std::experimental::reseed

| Defined in header `<experimental/random>` |  |  |
| --- | --- | --- |
| `void reseed();` | (1) | (library fundamentals TS v2) |
| `void reseed( std::default_random_engine::result_type value );` | (2) | (library fundamentals TS v2) |

Reseeds the per-thread random number engine and any `std::uniform_int_distribution` instances used by `randint`.

1) Sets the per-thread engine to an unpredictable state.

2) Seeds the per-thread engine `g` as if by `g.seed(value)`.

### Parameters

value - value of the new seed

### Remarks

Subsequent calls to `randint` do not depend on values produced by the per-thread engine prior to calling `reseed`.

### Example

```cpp
#include <experimental/random>
#include <iostream>

int main()
{
    std::experimental::reseed();

    std::cout << "Random 2-digit decimal numbers: ";

    for (auto i = 0; i != 3; ++i)
        std::cout << std::experimental::randint(10, 99) << ' ';
    std::cout << '\n';
}
```

Possible output:

```text
Random 2-digit decimal numbers: 41 60 56
```

### See also

randint generates a random integer in the specified range (function template)
