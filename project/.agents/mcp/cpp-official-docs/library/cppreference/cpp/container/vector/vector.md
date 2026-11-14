# std::vector<T,Allocator>::vector

|  |  |  |
| --- | --- | --- |
|  | (1) |  |
| `vector() : vector(Allocator()) {}` |  | (since C++11) (until C++17) |
| `vector() noexcept(noexcept(Allocator())) : vector(Allocator()) {}` |  | (since C++17) (constexpr since C++20) |
|  | (2) |  |
| `explicit vector( const Allocator& alloc = Allocator() );` |  | (until C++11) |
| `explicit vector( const Allocator& alloc );` |  | (since C++11) (noexcept since C++17) (constexpr since C++20) |
| `explicit vector( size_type count, const Allocator& alloc = Allocator() );` | (3) | (since C++11) |
|  | (4) |  |
| `explicit vector( size_type count, const T& value = T(), const Allocator& alloc = Allocator() );` |  | (until C++11) |
| `vector( size_type count, const T& value, const Allocator& alloc = Allocator() );` |  | (since C++11) (constexpr since C++20) |
| `template< class InputIt > vector( InputIt first, InputIt last, const Allocator& alloc = Allocator() );` | (5) | (constexpr since C++20) |
| `template< container-compatible-range<T> R > constexpr vector( std::from_range_t, R&& rg, const Allocator& alloc = Allocator() );` | (6) | (since C++23) |
| `vector( const vector& other );` | (7) | (constexpr since C++20) |
| `vector( vector&& other );` | (8) | (since C++11) (noexcept since C++17) (constexpr since C++20) |
|  | (9) |  |
| `vector( const vector& other, const Allocator& alloc );` |  | (since C++11) (constexpr since C++20) (until C++23) |
| `constexpr vector( const vector& other, const std::type_identity_t<Allocator>& alloc );` |  | (since C++23) |
|  | (10) |  |
| `vector( vector&& other, const Allocator& alloc );` |  | (since C++11) (until C++23) |
| `constexpr vector( vector&& other, const std::type_identity_t<Allocator>& alloc );` |  | (since C++23) |
| `vector( std::initializer_list<T> init, const Allocator& alloc = Allocator() );` | (11) | (since C++11) |

Constructs a new `vector` from a variety of data sources, optionally using a user supplied allocator `alloc`.

1) The default constructor since C++11. Constructs an empty `vector` with a default-constructed allocator.

If `Allocator` is not DefaultConstructible, the behavior is undefined.

2) The default constructor until C++11. Constructs an empty `vector` with the given allocator `alloc`.

3) Constructs a `vector` with `count` default-inserted objects of `T`. No copies are made.

If `T` is not DefaultInsertable into `std::vector<T>`, the behavior is undefined.

4) Constructs a `vector` with `count` copies of elements with value `value`.

If `T` is not CopyInsertable into `std::vector<T>`, the behavior is undefined. (since C++11)

5) Constructs a `vector` with the contents of the range `[``first``,``last``)`. Each iterator in `[``first``,``last``)` is dereferenced exactly once.

|  |  |
| --- | --- |
| If `InputIt` does not satisfy the requirements of LegacyInputIterator, overload (4) is called instead with arguments `static_cast<size_type>(first)`, `last` and `alloc`. | (until C++11) |
| This overload participates in overload resolution only if `InputIt` satisfies the requirements of LegacyInputIterator. If any of the following conditions is satisfied, the behavior is undefined: `T` is not EmplaceConstructible into `std::vector<T>` from `*first`. `Iter` does not satisfy the requirements of LegacyForwardIterator, and `T` is not MoveInsertable into `std::vector<T>`. | (since C++11) |

6) Constructs a `vector` with the contents of the range `rg`. Each iterator in `rg` is dereferenced exactly once.

If any of the following conditions is satisfied, the behavior is undefined:

- `T` is not EmplaceConstructible into `std::vector<T>` from `*ranges::begin(rg)`.
- `R` models neither `sized_range` nor `forward_range`, and `T` is not MoveInsertable into `std::vector<T>`.

7-10) Constructs a `vector` with the contents of `other`.

7) The copy constructor.

The allocator is obtained as if by calling `std::allocator_traits<Allocator>:: select_on_container_copy_construction (other.get_allocator())`. (since C++11)

8) The move constructor. The allocator is obtained by move construction from `other.get_allocator()`.

9) Same as the copy constructor, except that `alloc` is used as the allocator.

If `T` is not CopyInsertable into `std::vector<T>`, the behavior is undefined.

10) Same as the move constructor, except that `alloc` is used as the allocator.

If `T` is not MoveInsertable into `std::vector<T>`, the behavior is undefined.

11) Equivalent to `vector(il.begin(), il.end(), alloc)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| alloc | - | allocator to use for all memory allocations of this container |
| count | - | the size of the container |
| value | - | the value to initialize elements of the container with |
| first, last | - | the range to copy the elements from |
| other | - | another container to be used as source to initialize the elements of the container with |
| init | - | initializer list to initialize the elements of the container with |
| rg | - | a container compatible range |

### Complexity

1,2) Constant.

3,4) Linear in `count`.

5) Given `std::distance(first, last)` as N:

- If `first` and `last` are both forward, bidirectional or random-access iterators,

- The copy constructor of `T` is only called N times, and
- No reallocation occurs.

- Otherwise (`first` and `last` are just input iterators),

- The copy constructor of `T` is called O(N) times, and
- Reallocation occurs O(log N) times.

6) Given `ranges::distance(rg)` as N:

- If `R` models `ranges::forward_range` or `ranges::sized_range`,

- Initializes exactly N elements from the result of dereferencing successive iterators of `rg`, and
- No reallocation occurs.

- Otherwise (`R` models input range),

- The copy or move constructor of `T` is called O(N) times, and
- Reallocation occurs O(log N) times.

7) Linear in `other.size()`.

8) Constant.

9) Linear in `other.size()`.

10) Linear in `other.size()` if `alloc != other.get_allocator()`, otherwise constant.

11) Linear in `init.size()`.

### Exceptions

Calls to `Allocator::allocate` may throw.

### Notes

After container move construction (overload (8)), references, pointers, and iterators (other than the end iterator) to `other` remain valid, but refer to elements that are now in `*this`. The current standard makes this guarantee via the blanket statement in [container.reqmts]/67, and a more direct guarantee is under consideration via LWG issue 2321.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_containers_ranges` | `202202L` | (C++23) | Ranges-aware construction and insertion; overload (6) |

### Example

```cpp
#include <iostream>
#include <string>
#include <vector>

template<typename T>
std::ostream& operator<<(std::ostream& s, const std::vector<T>& v)
{
    s.put('{');
    for (char comma[]{'\0', ' ', '\0'}; const auto& e : v)
        s << comma << e, comma[0] = ',';
    return s << "}\n";
}

int main()
{
    // C++11 initializer list syntax:
    std::vector<std::string> words1{"the", "frogurt", "is", "also", "cursed"};
    std::cout << "1: " << words1;

    // words2 == words1
    std::vector<std::string> words2(words1.begin(), words1.end());
    std::cout << "2: " << words2;

    // words3 == words1
    std::vector<std::string> words3(words1);
    std::cout << "3: " << words3;

    // words4 is {"Mo", "Mo", "Mo", "Mo", "Mo"}
    std::vector<std::string> words4(5, "Mo");
    std::cout << "4: " << words4;

    const auto rg = {"cat", "cow", "crow"};
#ifdef __cpp_lib_containers_ranges
    std::vector<std::string> words5(std::from_range, rg); // overload (6)
#else
    std::vector<std::string> words5(rg.begin(), rg.end()); // overload (5)
#endif
    std::cout << "5: " << words5;
}
```

Output:

```text
1: {the, frogurt, is, also, cursed}
2: {the, frogurt, is, also, cursed}
3: {the, frogurt, is, also, cursed}
4: {Mo, Mo, Mo, Mo, Mo}
5: {cat, cow, crow}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 134 | C++98 | overload (5) allowed up to 2N copy constructor calls in the input iterator case | changed to O(N) calls |
| LWG 438 | C++98 | overload (5) would only call overload (4) if `InputIt` is an integral type | calls overload (4) if `InputIt` is not an LegacyInputIterator |
| LWG 2193 | C++11 | the default constructor was explicit | made non-explicit |
| LWG 2210 | C++11 | overload (3) did not have an allocator parameter | added the parameter |
| N3346 | C++11 | for overload (3), the elements in the container were value-initialized | they are default-inserted |

### See also

|  |  |
| --- | --- |
| assign | assigns values to the container (public member function) |
| operator= | assigns values to the container (public member function) |
