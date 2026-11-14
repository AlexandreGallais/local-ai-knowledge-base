# std::inplace_vector<T,N>::~inplace_vector

`constexpr ~inplace_vector();` (since C++26)

A destructor. Also, a trivial destructor if `std::is_trivially_destructible_v<T>` is `true`. Destructs the `inplace_vector`. The destructors of the elements are called and the used storage is deallocated. Note, that if the elements are pointers, the pointed-to objects are not destroyed.

### Complexity

Linear in the size of the `inplace_vector`.
