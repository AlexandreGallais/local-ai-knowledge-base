# std::experimental::optional<T>::~optional

`~optional();` (library fundamentals TS)

If the object contains a value and the type `T` is not trivially destructible (see `std::is_trivially_destructible`), destroys the contained value by calling its destructor, as if by `val->T::~T()`.

Otherwise, does nothing.

### Notes

If `T` is trivially-destructible, then this destructor is also trivial, so `optional<T>` is also trivially-destructible.
