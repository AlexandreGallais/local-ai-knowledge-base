# std::deque<T,Allocator>::~deque

`~deque();`

A destructor. Destructs the `deque`. The destructors of the elements are called and the used storage is deallocated. Note, that if the elements are pointers, the pointed-to objects are not destroyed.

### Complexity

Linear in the size of the `deque`.
