# std::experimental::randint

| Defined in header `<experimental/random>` |  |
| --- | --- |
| `template< class IntType > IntType randint( IntType a, IntType b );` | (library fundamentals TS v2) |

Generates a random integer in the closed interval `[a, b]`.

### Parameters

a, b - integer values specifying the range

### Return value

A random integer i in the closed interval `[a, b]`, produced using a thread-local instance of `std::uniform_int_distribution<IntType>` invoked with the per-thread random number engine.

### Remarks

If `IntType` is not one of `short`, `int`, `long`, `long long`, `unsigned short`, `unsigned int`, `unsigned long`, or `unsigned long long`, the program is ill-formed.

The behavior is undefined if `a > b`.

### Example

```cpp
#include <experimental/random>
#include <iostream>

int main()
{
    int random_number = std::experimental::randint(100, 999);
    std::cout << "random 3-digit number: " << random_number << '\n';
}
```

Possible output:

```text
random 3-digit number: 273
```

### See also

reseed reseeds the per-thread random engine (function)
