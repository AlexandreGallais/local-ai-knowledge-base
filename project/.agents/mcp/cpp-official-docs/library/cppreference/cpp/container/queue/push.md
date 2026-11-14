# std::queue<T,Container>::push

|  |  |  |
| --- | --- | --- |
| `void push( const value_type& value );` | (1) |  |
| `void push( value_type&& value );` | (2) | (since C++11) |

Pushes the given element `value` to the end of the queue.

1) Equivalent to: `c.push_back(value)`.

2) Equivalent to: `c.push_back(std::move(value))`.

### Parameters

value - the value of the element to push

### Return value

(none)

### Complexity

Equal to the complexity of `Container::push_back`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| emplace (C++11) | constructs element in-place at the end (public member function) |
| pop | removes the first element (public member function) |
