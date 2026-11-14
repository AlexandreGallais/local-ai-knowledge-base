# C++ named requirements: ReversibleContainer

A **ReversibleContainer** is a Container that has iterators that meet the requirements of either LegacyBidirectionalIterator or LegacyRandomAccessIterator. Such iterators allow a ReversibleContainer to be iterated over in reverse.

### Requirements

A type satisfies ReversibleContainer if it satisfies Container, its iterator type belongs to the bidirectional or random access iterator categories and, given the following types and values, the semantic and complexity requirements in the tables below are satisfied:

| Type | Definition |
| --- | --- |
| `X` | an ReversibleContainer type |
| `T` | the `value_type` of `X` |
| Value | Definition |
| `a` | a value of type `X` |

#### Types

| Name | Type | Requirements |
| --- | --- | --- |
| `typename X::reverse_iterator` | `std::reverse_iterator<X::iterator>` | an iterator type whose value type is `T` |
| `typename X::const_reverse_iterator` | `std::reverse_iterator<X::const_iterator>` | a constant iterator type whose value type is `T` |

#### Expressions

The types `reverse_iterator` and `const_reverse_iterator` in the following table denote `typename X::reverse_iterator` and `typename X::const_reverse_iterator` respectively.

| Expression | Type | Semantics | Complexity |
| --- | --- | --- | --- |
| `a.rbegin()` | `reverse_iterator` `const_reverse_iterator` for constant `a` | `reverse_iterator(a.end())` | Constant |
| `a.rend()` | `reverse_iterator` `const_reverse_iterator` for constant `a` | `reverse_iterator(a.begin())` | Constant |
| `a.crbegin()` | `const_reverse_iterator` | `const_cast<const X&>(a).rbegin()` | Constant |
| `a.crend()` | `const_reverse_iterator` | `const_cast<const X&>(a).rend()` | Constant |

### Library types

The following standard library types satisfy ReversibleContainer requirements:

|  |  |
| --- | --- |
| array (C++11) | fixed-sized inplace contiguous array (class template) |
| deque | double-ended queue (class template) |
| list | doubly-linked list (class template) |
| vector | dynamic contiguous array (class template) |
| inplace_vector (C++26) | dynamically-resizable, fixed capacity, inplace contiguous array (class template) |
| map | collection of key-value pairs, sorted by keys, keys are unique (class template) |
| multimap | collection of key-value pairs, sorted by keys (class template) |
| set | collection of unique keys, sorted by keys (class template) |
| multiset | collection of keys, sorted by keys (class template) |

### Example

The following example iterates over a `vector` (which has legacy random-access iterators) in reverse.

```cpp
#include <iostream>
#include <vector>

int main()
{
    std::vector<int> v = {3, 1, 4, 1, 5, 9};

    for (std::vector<int>::const_reverse_iterator i{v.crbegin()}; i != v.crend(); ++i)
        std::cout << *i << ' ';
    std::cout << '\n';
}
```

Output:

```text
9 5 1 4 1 3
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2105 | C++98 | `typename X::const_reverse_iterator` was required to be an iterator type of value type `const T` | required to be a constant iterator type of value type `T` |
