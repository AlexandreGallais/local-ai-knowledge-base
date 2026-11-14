# std::unordered_map<Key,T,Hash,KeyEqual,Allocator>::insert_or_assign

|  |  |  |
| --- | --- | --- |
| `template< class M > std::pair<iterator, bool> insert_or_assign( const Key& k, M&& obj );` | (1) | (since C++17) |
| `template< class M > std::pair<iterator, bool> insert_or_assign( Key&& k, M&& obj );` | (2) | (since C++17) |
| `template< class K, class M > std::pair<iterator, bool> insert_or_assign( K&& k, M&& obj );` | (3) | (since C++26) |
| `template< class M > iterator insert_or_assign( const_iterator hint, const Key& k, M&& obj );` | (4) | (since C++17) |
| `template< class M > iterator insert_or_assign( const_iterator hint, Key&& k, M&& obj );` | (5) | (since C++17) |
| `template< class K, class M > iterator insert_or_assign( const_iterator hint, K&& k, M&& obj );` | (6) | (since C++26) |

1,4) If a key equivalent to `k` already exists in the container, assigns `std::forward<M>(obj)` to the `mapped_type` corresponding to the key `k`. If the key does not exist, inserts the new value as if by `insert`, constructing it from `value_type(k, std::forward<M>(obj))`.

2,5) Same as (1,4), except the mapped value is constructed from `value_type(std::move(k), std::forward<M>(obj))`.

3,6) If a key equivalent to `k` already exists in the container, assigns `std::forward<M>(obj)` to the `mapped_type` corresponding to the key `k`. If the key does not exist, constructs an object `u` of `value_type` with `std::forward<K>(k), std::forward<M>(obj))`, then inserts `u` into `*this`. If `hash_function()(u.first) != hash_function()(k) || contains(u.first)` is `true`, the behavior is undefined. The `value_type` must be EmplaceConstructible into `unordered_map` from `std::forward<K>(k), std::forward<M>(obj)`. This overload participates in overload resolution only if `Hash::is_transparent` and `KeyEqual::is_transparent` are valid and each denotes a type. This assumes that such `Hash` is callable with both `K` and `Key` type, and that the `KeyEqual` is transparent, which, together, allows calling this function without constructing an instance of `Key`.

The behavior is undefined(until C++20)The program is ill-formed(since C++20) if `std::is_assignable_v<mapped_type&, M&&>` is `false`.

If after the operation the new number of elements is greater than old `max_load_factor() * bucket_count()` a rehashing takes place. If rehashing occurs (due to the insertion), all iterators are invalidated. Otherwise (no rehashing), iterators are not invalidated.

### Parameters

|  |  |  |
| --- | --- | --- |
| k | - | the key used both to look up and to insert if not found |
| hint | - | iterator to the position before which the new element will be inserted |
| obj | - | the value to insert or assign |

### Return value

1-3) The `bool` component is `true` if the insertion took place and `false` if the assignment took place. The iterator component is pointing at the element that was inserted or updated.

4-6) Iterator pointing at the element that was inserted or updated.

### Complexity

1-3) Same as for `emplace`.

4-6) Same as for `emplace_hint`.

### Notes

`insert_or_assign` returns more information than `operator``[]` and does not require default-constructibility of the mapped type.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_unordered_map_try_emplace` | `201411L` | (C++17) | `std::unordered_map::try_emplace`, `std::unordered_map::insert_or_assign` |
| `__cpp_lib_associative_heterogeneous_insertion` | `202311L` | (C++26) | Heterogeneous overloads for the remaining member functions in ordered and unordered associative containers. Overloads (3) and (6). |

### Example

```cpp
#include <iostream>
#include <string>
#include <unordered_map>

void print_node(const auto& node)
{
    std::cout << '[' << node.first << "] = " << node.second << '\n';
}

void print_result(auto const& pair)
{
    std::cout << (pair.second ? "inserted: " : "assigned: ");
    print_node(*pair.first);
}

int main()
{
    std::unordered_map<std::string, std::string> myMap;

    print_result(myMap.insert_or_assign("a", "apple"));
    print_result(myMap.insert_or_assign("b", "banana"));
    print_result(myMap.insert_or_assign("c", "cherry"));
    print_result(myMap.insert_or_assign("c", "clementine"));

    for (const auto& node : myMap)
        print_node(node);
}
```

Possible output:

```text
inserted: [a] = apple
inserted: [b] = banana
inserted: [c] = cherry
assigned: [c] = clementine
[c] = clementine
[a] = apple
[b] = banana
```

### See also

|  |  |
| --- | --- |
| operator[] | access or insert specified element (public member function) |
| at | access specified element with bounds checking (public member function) |
| insert | inserts elements or nodes(since C++17) (public member function) |
| emplace | constructs element in-place (public member function) |
