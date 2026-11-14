# std::shared_mutex::~shared_mutex

`~shared_mutex();`

Destroys the mutex.

The behavior is undefined if the mutex is owned by any thread or if any thread terminates while holding any ownership of the mutex.

### See also

C documentation for mtx_destroy
