# std::experimental::sample

| Defined in header `<experimental/algorithm>` |  |  |
| --- | --- | --- |
| `template< class PopulationIterator, class SampleIterator, class Distance, class URBG > SampleIterator sample( PopulationIterator first, PopulationIterator last, SampleIterator out, Distance n, URBG&& g );` | (1) | (library fundamentals TS) |
| `template< class PopulationIterator, class SampleIterator, class Distance > SampleIterator sample( PopulationIterator first, PopulationIterator last, SampleIterator out, Distance n );` | (2) | (library fundamentals TS v2) |

Selects `n` elements from the sequence `[``first``,``last``)` such that each possible sample has equal probability of appearance, and writes those selected elements into the output iterator `out`.

If `n` is greater than the number of elements in the sequence, selects `last - first` elements.

The algorithm is stable only if `PopulationIterator` meets the requirements of LegacyForwardIterator.

1) Random numbers are generated using the random number generator `g`.

2) Random numbers are generated using the per-thread engine.

### Parameters

|  |  |  |
| --- | --- | --- |
| first, last | - | pair of iterators forming the range from which to make the sampling (the population) |
| out | - | the output iterator where the samples are written. Must not be in the range `[``first``,``last``)` |
| n | - | number of samples to make |
| g | - | the random number generator used as the source of randomness |
| - `PopulationIterator` must meet the requirements of LegacyInputIterator. |  |  |
| - `SampleIterator` must meet the requirements of LegacyOutputIterator. |  |  |
| - `SampleIterator` must also meet the requirements of LegacyRandomAccessIterator if `PopulationIterator` doesn't meet LegacyForwardIterator. |  |  |
| - `PopulationIterator`'s value type must be writeable to `out`. |  |  |
| - `Distance` must be an integer type. |  |  |
| - `URBG` must meet the requirements of UniformRandomBitGenerator and its return type must be convertible to `Distance`. |  |  |

### Return value

Returns a copy of `out` after the last sample that was output, that is, end of the sample range.

### Complexity

Linear in `std::distance(first, last)`.

### Notes

This function may implement selection sampling or reservoir sampling.

### Example

```cpp
#include <experimental/algorithm>
#include <iostream>
#include <iterator>
#include <random>
#include <string>

int main()
{
    std::string in = "abcdefgh", out;
    std::experimental::sample(in.begin(), in.end(), std::back_inserter(out),
                              5, std::mt19937{std::random_device{}()});
    std::cout << "five random letters out of " << in << " : " << out << '\n';
}
```

Possible output:

```text
five random letters out of abcdefgh : cdefg
```

### See also

random_shuffle, shuffle (until C++17), (C++11) randomly re-orders elements in a range (function template)
