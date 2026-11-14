# C++ named requirements: ContiguousContainer (since C++17)

A **ContiguousContainer** is a Container that stores objects in contiguous memory locations.

### Requirements

The type `X` satisfies ContiguousContainer if

- The type `X` satisfies Container
- The type `X` supports LegacyRandomAccessIterators
- The member types `X::iterator` and `X::const_iterator` are LegacyContiguousIterators(until C++20)`contiguous_iterator`s(since C++20)

### Standard library

The following standard library string types and containers satisfy the ContiguousContainer requirements:

|  |  |
| --- | --- |
| basic_string | stores and manipulates sequences of characters (class template) |
| vector | dynamic contiguous array (class template) |
| array (C++11) | fixed-sized inplace contiguous array (class template) |
| inplace_vector (C++26) | dynamically-resizable, fixed capacity, inplace contiguous array (class template) |
