# std::auto_ptr<T>::~auto_ptr

`~auto_ptr() throw();` (deprecated in C++11) (removed in C++17)

Destroys the managed object. Calls `delete get()`.
