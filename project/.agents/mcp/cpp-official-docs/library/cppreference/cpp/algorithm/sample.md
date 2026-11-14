# std::sample

| Defined in header `<algorithm>` |  |
| --- | --- |
| `template< class PopulationIt, class SampleIt, class Distance, class URBG > SampleIterator sample( PopulationIt first, PopulationIt last, SampleIt out, Distance n, URBG&& g );` | (since C++17) |

Selects `n` elements from the sequence `[``first``,``last``)` (without replacement) such that each possible sample has equal probability of appearance, and writes those selected elements into the output iterator `out`. Random numbers are generated using the random number generator `g`.

If `n` is greater than the number of elements in the sequence, selects all elements in the sequence.

The algorithm is stable (preserves the relative order of the selected elements) only if `PopulationIt` meets the requirements of LegacyForwardIterator.

If the value type of `first`(until C++20)`*first`(since C++20) is not writable to `out`, the program is ill-formed.

If any of the following conditions is satisfied, the behavior is undefined:

- `out` is in `[``first``,``last``)`.
- `PopulationIt` does not meet the requirements of LegacyInputIterator.
- `SampleIt` does not meet the requirements of LegacyOutputIterator.
- All following conditions are satisfied:

|  |  |
| --- | --- |
| `PopulationIt` does not meet the requirements of LegacyForwardIterator. | (until C++23) |
| `PopulationIt` does not model `forward_iterator`. | (since C++23) |

- `SampleIt` does not meet the requirements of LegacyRandomAccessIterator.

- Given the type `T` as `std::remove_reference_t<URBG>`, any of the following conditions is satisfied:

- `T` does not meet the requirements of UniformRandomBitGenerator.

The return type of `T` is not convertible to `Distance`. (until C++20)

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | pair of iterators forming the range from which to make the sampling (the population) |
| out | - | the output iterator where the samples are written |
| n | - | number of samples to make |
| g | - | the random number generator used as the source of randomness |
| Type requirements |  |  |
| - `Distance` must be an integer type. |  |  |

### Return value

Returns a copy of `out` after the last sample that was output, that is, end of the sample range.

### Complexity

Linear in `std::distance(first, last)`.

### Possible implementation

See the implementations in libstdc++, libc++ and MSVC STL.

### Notes

This function may implement selection sampling or reservoir sampling.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_sample` | `201603L` | (C++17) | `std::sample` |

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <random>
#include <string>

int main()
{
    std::string in {"ABCDEFGHIJK"}, out;
    std::sample(in.begin(), in.end(), std::back_inserter(out), 4,
                std::mt19937 {std::random_device{}()});
    std::cout << "Four random letters out of " << in << " : " << out << '\n';
}
```

Possible output:

```text
Four random letters out of ABCDEFGHIJK: EFGK
```

### See also

|  |  |
| --- | --- |
| random_shuffle, shuffle (until C++17), (C++11) | randomly re-orders elements in a range (function template) |
| ranges::sample (C++20) | selects N random elements from a sequence (algorithm function object) |
