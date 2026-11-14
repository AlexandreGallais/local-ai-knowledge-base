# std::seed_seq::param

`template< class OutputIt > void param( OutputIt dest ) const;` (since C++11)

Copies the stored seeds to the range beginning with `dest`. Equivalent to `std::copy(v .begin(), v .end(), dest);`.

If values of type `result_type` are not writable to `dest`, the program is ill-formed.

If `OutputIt` does not satisfy the requirements of LegacyOutputIterator, the behavior is undefined.

### Parameters

dest - the beginning iterator of the output range

### Exceptions

Only throws the exceptions thrown by the operations on `dest`.

### Example

```cpp
#include <iostream>
#include <iterator>
#include <random>

int main()
{
    std::seed_seq s1 = {-1, 0, 1};
    s1.param(std::ostream_iterator<int>(std::cout, " "));
}
```

Output:

```text
-1 0 1
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2180 | C++11 | `seed_seq::param` is non-throwing | it may throw exceptions |
