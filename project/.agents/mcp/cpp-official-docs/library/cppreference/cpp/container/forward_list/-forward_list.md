# std::forward_list<T,Allocator>::~forward_list

`~forward_list();` (since C++11)

A destructor. Destructs the `forward_list`. The destructors of the elements are called and the used storage is deallocated. Note, that if the elements are pointers, the pointed-to objects are not destroyed.

### Complexity

Linear in the size of the `forward_list`.
