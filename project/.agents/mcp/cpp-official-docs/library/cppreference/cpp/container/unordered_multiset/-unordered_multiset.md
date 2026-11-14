# std::unordered_multiset<Key,Hash,KeyEqual,Allocator>::~unordered_multiset

`~unordered_multiset();` (since C++11)

A destructor. Destructs the `unordered_multiset`. The destructors of the elements are called and the used storage is deallocated. Note, that if the elements are pointers, the pointed-to objects are not destroyed.

### Complexity

Linear in the size of the `unordered_multiset`.
