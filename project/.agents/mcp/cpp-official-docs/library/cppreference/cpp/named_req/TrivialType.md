# C++ named requirements: TrivialType (since C++11)(deprecated in C++26)

Specifies that a type is a trivial type.

Note: the standard doesn't define a named requirement with this name. This is a type category defined by the core language. It is included here as a named requirement only for consistency.

### Requirements

The following types are collectively called *trivial types*:

- scalar types
- trivial class types
- arrays of such types
- cv-qualified versions of these types

### Notes

A trivial class may have a private or protected trivial default constructor, in which case an attempt to default-construct such a class object in contexts unrelated to the class makes the program ill-formed.

### See also

is_trivial (C++11), (deprecated in C++26) checks if a type is trivial (class template)
