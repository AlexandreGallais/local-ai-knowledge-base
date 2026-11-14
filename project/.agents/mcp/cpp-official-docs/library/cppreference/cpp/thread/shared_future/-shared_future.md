# std::shared_future<T>::~shared_future

`~shared_future();` (since C++11)

If `*this` is the last object referring to the shared state, destroys the shared state. Otherwise does nothing.
