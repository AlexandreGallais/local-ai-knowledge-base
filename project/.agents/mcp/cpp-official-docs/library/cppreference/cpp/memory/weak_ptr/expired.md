# std::weak_ptr<T>::expired

`bool expired() const noexcept;` (since C++11)

Equivalent to `use_count() == 0`. The destructor for the managed object may not yet have been called, but this object's destruction is imminent (or may have already happened).

### Parameters

(none)

### Return value

`true` if the managed object has already been deleted, `false` otherwise.

### Notes

If the managed object is shared among threads, it is only meaningful when `expired()` returns true.

### Example

Demonstrates how `expired` is used to check validity of the pointer.

```cpp
#include <iostream>
#include <memory>

std::weak_ptr<int> gw;

void f()
{
    if (!gw.expired())
	std::cout << "gw is valid\n";
    else
        std::cout << "gw is expired\n";
}

int main()
{
    {
        auto sp = std::make_shared<int>(42);
	gw = sp;

	f();
    }

    f();
}
```

Output:

```text
gw is valid
gw is expired
```

### See also

|  |  |
| --- | --- |
| lock | creates a `shared_ptr` that manages the referenced object (public member function) |
| use_count | returns the number of `shared_ptr` objects that manage the object (public member function) |
