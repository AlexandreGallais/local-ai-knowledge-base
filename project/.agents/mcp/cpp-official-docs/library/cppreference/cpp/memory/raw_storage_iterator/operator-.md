# std::raw_storage_iterator<OutputIt,T>::operator=

|  |  |  |
| --- | --- | --- |
| `raw_storage_iterator& operator=( const T& el );` | (1) |  |
| `raw_storage_iterator& operator=( T&& el );` | (2) | (since C++17) |

1) Constructs a value at the location the iterator points to from `el`.

2) Constructs a value at the location the iterator points to from `std::move(el)`.

### Parameters

el - the value to copy or move from

### Return value

`*this`
