# std::priority_queue<T,Container,Compare>::~priority_queue

`~priority_queue();`

A destructor. Destructs the `priority_queue`. The destructors of the elements are called and the used storage is deallocated. Note, that if the elements are pointers, the pointed-to objects are not destroyed.

### Complexity

Linear in the size of the `priority_queue`.
