# std::unordered_map<Key,T,Hash,KeyEqual,Allocator>::bucket

|  |  |  |
| --- | --- | --- |
| `size_type bucket( const Key& key ) const;` | (1) | (since C++11) |
| `template< typename K > size_type bucket( const K& x ) const;` | (2) | (since C++26) |

1) Returns the index of the bucket for key `key`. Elements (if any) with keys equivalent to `key` are always found in this bucket.

2) Returns the index of the bucket for key that compares *equivalent* to the value `x`. Elements (if any) with keys that compare equivalent to `x` are always found in this bucket. This overload participates in overload resolution only if `Hash::is_transparent` and `KeyEqual::is_transparent` are valid and each denotes a type. This assumes that such `Hash` is callable with both `K` and `Key` type, and that the `KeyEqual` is transparent, which, together, allows calling this function without constructing an instance of `Key`.

The returned value is valid only for instances of the container for which `bucket_count()` returns the same value (e.g., `rehash()` invalidates previously obtained value).

The behavior is undefined if `bucket_count()` is zero.

### Parameters

|  |  |  |
| --- | --- | --- |
| key | - | the value of the key to examine |
| x | - | a value of any type that can be transparently compared with a key |

### Return value

Bucket index for the requested key.

### Complexity

Constant.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_associative_heterogeneous_insertion` | `202311L` | (C++26) | Heterogeneous overloads for the remaining member functions in ordered and unordered associative containers. (2) |

### Example

This section is incomplete Reason: no example

### See also

bucket_size returns the number of elements in specific bucket (public member function)
