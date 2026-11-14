# C++ keyword: `short`

### Usage

- `short` type modifier

### Example

```cpp
#include <climits>
#include <concepts>
#include <iostream>
#include <limits>

static_assert(sizeof(short) >= 16 / CHAR_BIT);
static_assert(sizeof(unsigned short) >= 16 / CHAR_BIT);
static_assert(std::numeric_limits<short>::min() <= -32'768); //'
static_assert(std::numeric_limits<short>::max() >= 32'767); //'
static_assert(std::numeric_limits<unsigned short>::max() >= 65'535u); //'

// concepts are available since C++20
static_assert(std::integral<short> and std::integral<unsigned short>);

template <typename T, typename... Ts>
concept all_same = (... and std::same_as <T, Ts>);

static_assert(all_same<short, short int, signed short, signed short int>);
static_assert(all_same<unsigned short, unsigned short int>);

#define OUT(...) std::cout << #__VA_ARGS__ << " = " << __VA_ARGS__ << '\n'

int main()
{
    OUT(sizeof(short));
    OUT(sizeof(unsigned short));
    OUT(std::numeric_limits<short>::min());
    OUT(std::numeric_limits<short>::max());
    OUT(std::numeric_limits<unsigned short>::max());
}

#undef OUT
```

Possible output:

```text
sizeof(short) = 2
sizeof(unsigned short) = 2
std::numeric_limits<short>::min() = -32768
std::numeric_limits<short>::max() = 32767
std::numeric_limits<unsigned short>::max() = 65535
```

### See also

- Fundamental types: `void`, `std::nullptr_t`(since C++11).
  - Integral types: `int`. Modifiers: `signed`, `unsigned`, **`short`**, `long`.
    - Boolean type: `bool`. Boolean literals: `false`, `true`.
    - Character types: `char`, `char8_t`(since C++20), `char16_t`, `char32_t`(since C++11), `wchar_t`.
  - Floating-point types: `float`, `double`.
