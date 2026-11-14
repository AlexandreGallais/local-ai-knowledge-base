# std::list<T,Allocator>::~list

`~list();`

A destructor. Destructs the `list`. The destructors of the elements are called and the used storage is deallocated. Note, that if the elements are pointers, the pointed-to objects are not destroyed.

### Complexity

Linear in the size of the `list`.
