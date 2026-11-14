# std::front_insert_iterator<Container>::operator*

|  |  |
| --- | --- |
| `front_insert_iterator& operator*();` | (until C++20) |
| `constexpr front_insert_iterator& operator*();` | (since C++20) |

Does nothing, this member function is provided to satisfy the requirements of LegacyOutputIterator.

It returns the iterator itself, which makes it possible to use code such as `*iter = value` to output (insert) the value into the underlying container.

### Parameters

(none)

### Return value

`*this`
