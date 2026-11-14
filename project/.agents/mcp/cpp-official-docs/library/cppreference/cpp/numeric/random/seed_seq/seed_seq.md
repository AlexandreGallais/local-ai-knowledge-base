# std::seed_seq::seed_seq

|  |  |  |
| --- | --- | --- |
| `seed_seq() noexcept;` | (1) | (since C++11) |
| `seed_seq( const seed_seq& ) = delete;` | (2) | (since C++11) |
| `template< class InputIt > seed_seq( InputIt begin, InputIt end );` | (3) | (since C++11) |
| `template< class T > seed_seq( std::initializer_list<T> il );` | (4) | (since C++11) |

1) The default constructor. After construction, `v` is empty.

2) The copy constructor is deleted: `std::seed_seq` is not copyable.

3) Constructs a `std::seed_seq` with the values in the range `[``begin``,``end``)`. Equivalent to default-initializing `v` followed by `for (InputIt s = begin; s != end; ++s) v .push_back(modseed(*s));`, where \(\scriptsize \mathrm{modseed}(x)=x \mod 2^{32} \)mod_seed(x)=x mod 232 .

If `std::iterator_traits<InputIt>::value_type` is not an integer type, the program is ill-formed.

If `InputIt` does not satisfy the requirements of LegacyInputIterator, the behavior is undefined.

4) Equivalent to `seed_seq(il.begin(), il.end())`. This constructor enables list-initialization from the list of seed values.

This overload participates in overload resolution only if `T` is an integer type.

### Parameters

|  |  |  |
| --- | --- | --- |
| begin, end | - | the pair of iterators denoting the initial seed sequence |
| il | - | the initial seed sequence |

### Example

```cpp
#include <iterator>
#include <random>
#include <sstream>

int main()
{
    std::seed_seq s1; // default-constructible
    std::seed_seq s2{1, 2, 3}; // can use list-initialization
    std::seed_seq s3 = {-1, 0, 1}; // another form of list-initialization
    int a[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    std::seed_seq s4(a, a + 10); // can use iterators
    std::istringstream buf("1 2 3 4 5");
    std::istream_iterator<int> beg(buf), end;
    std::seed_seq s5(beg, end); // even stream input iterators
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2180 | C++11 | all constructors were non-throwing | only overload (1) is non-throwing |
| LWG 3422 | C++11 | 1. overload (1) was not noexcept 2. overload (4) was not constrainted | 1.made noexcept 2. constrained |
