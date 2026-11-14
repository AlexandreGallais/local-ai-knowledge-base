# std::experimental::filesystem::recursive_directory_iterator::pop

`void pop();` (filesystem TS)

Moves the iterator one level up in the directory hierarchy.

If the parent directory is outside directory hierarchy that is iterated on (i.e. `depth() == 0`), sets `*this` to an end directory iterator.

### Parameters

(none)

### Return value

(none)

### Exceptions

This section is incomplete
