# std::reference_wrapper<T>::operator=

`reference_wrapper& operator=( const reference_wrapper& other ) noexcept;` (since C++11) (constexpr since C++20)

Copy assignment operator. Drops the current reference and stores a reference to `other.get()`.

### Parameters

other - reference wrapper to copy

### Return value

`*this`
