# operator==,<=>(std::flat_set)

|  |  |  |
| --- | --- | --- |
| `friend bool operator==( const std::flat_set& lhs, const std::flat_set& rhs );` | (1) | (since C++23) |
| `friend synth-three-way-result<value_type> operator<=>( const std::flat_set& lhs, const std::flat_set& rhs );` | (2) | (since C++23) |

Compares the contents of the underlying containers of two container adaptors. The comparison is done by applying the corresponding operator to the underlying containers.

This section is incomplete Reason: For "flat" containers only: copy parts of Template:cpp/container/operator_cmp

### Parameters

lhs, rhs - container adaptors whose contents to compare This section is incomplete Reason: Add named requirements to "flat" container inner types

### Return value

1) `true` if the corresponding comparison yields `true`, `false` otherwise.

2) Result of three-way comparison on underlying containers.

### Complexity

1) Constant if `lhs` and `rhs` are of different size, otherwise linear in the size of the `flat_set`.

2) Linear in the size of the container.

### Example

This section is incomplete Reason: no example
