# std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::operator[]

|  |  |  |
| --- | --- | --- |
| `T& operator[]( const Key& key );` | (1) | (since C++23) |
| `T& operator[]( Key&& key );` | (2) | (since C++23) |
| `template< class K > T& operator[]( K&& x );` | (3) | (since C++23) |

Returns a reference to the value that is mapped to a key equivalent to `key` or `x` respectively, performing an insertion if such key does not already exist.

1) Inserts a `value_type` object constructed in-place if the key does not exist. Equivalent to `return try_emplace(x).first->second;`.

2) Inserts a `value_type` object constructed in-place if the key does not exist. Equivalent to `return try_emplace(std::move(x)).first->second;`

3) Inserts a `value_type` object constructed in-place if there is no key that transparently compares *equivalent* to the value `x`.

Equivalent to `return this->try_emplace(std::forward<K>(x)).first->second;`. This overload participates in overload resolution only if the qualified-id `Compare::is_transparent` is valid and denotes a type. It allows calling this function without constructing an instance of `Key`.

Information on iterator invalidation is copied from here

### Parameters

|  |  |  |
| --- | --- | --- |
| key | - | the key of the element to find |
| x | - | a value of any type that can be transparently compared with a key |

### Return value

1,2) A reference to the mapped value of the new element if no element with key `key` existed. Otherwise, a reference to the mapped value of the existing element whose key is equivalent to `key`.

3) A reference to the mapped value of the new element if no element with key that compares equivalent to the value `x` existed. Otherwise, a reference to the mapped value of the existing element whose key compares equivalent to `x`.

### Exceptions

If an exception is thrown by any operation, the insertion has no effect.

### Complexity

Logarithmic in the size of the container, plus the cost of insertion (if any) of an empty element.

### Notes

`operator[]` is non-const because it inserts the key if it doesn't exist. If this behavior is undesirable or if the container is `const`, `at` may be used.

`insert_or_assign` returns more information than `operator[]` and does not require default-constructibility of the mapped type.

### Example

```cpp
#include <iostream>
#include <string>
#include <flat_map>

void println(auto const comment, auto const& map)
{
    std::cout << comment << '{';
    for (const auto& pair : map)
        std::cout << '{' << pair.first << ": " << pair.second << '}';
    std::cout << "}\n";
}

int main()
{
    std::flat_map<char, int> letter_counts{{'a', 27}, {'b', 3}, {'c', 1}};

    println("letter_counts initially contains: ", letter_counts);

    letter_counts['b'] = 42; // updates an existing value
    letter_counts['x'] = 9;  // inserts a new value

    println("after modifications it contains: ", letter_counts);

    // count the number of occurrences of each word
    // (the first call to operator[] initialized the counter with zero)
    std::flat_map<std::string, int>  word_map;
    for (const auto& w : {"this", "sentence", "is", "not", "a", "sentence",
                          "this", "sentence", "is", "a", "hoax"})
        ++word_map[w];
    word_map["that"]; // just inserts the pair {"that", 0}

    for (const auto& [word, count] : word_map)
        std::cout << count << " occurrence(s) of word '" << word << "'\n";
}
```

Output:

```text
letter_counts initially contains: {{a: 27}{b: 3}{c: 1}}
after modifications it contains: {{a: 27}{b: 42}{c: 1}{x: 9}}
2 occurrence(s) of word 'a'
1 occurrence(s) of word 'hoax'
2 occurrence(s) of word 'is'
1 occurrence(s) of word 'not'
3 occurrence(s) of word 'sentence'
0 occurrence(s) of word 'that'
2 occurrence(s) of word 'this'
```

### See also

|  |  |
| --- | --- |
| at | access specified element with bounds checking (public member function) |
| insert_or_assign | inserts an element or assigns to the current element if the key already exists (public member function) |
| try_emplace | inserts in-place if the key does not exist, does nothing if the key exists (public member function) |
