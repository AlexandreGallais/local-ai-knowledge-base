# std::function<R(Args...)>::swap

`void swap( function& other ) noexcept;` (since C++11)

Exchanges the stored callable objects of `*this` and `other`.

### Parameters

other - function wrapper to exchange the stored callable object with

### Return value

(none)

### Example

```cpp
#include <functional>
#include <iostream>

void foo(const char* str, int x)
{
    std::cout << "foo(\"" << str << "\", " << x << ")\n";
}

void bar(const char* str, int x)
{
    std::cout << "bar(\"" << str << "\", " << x << ")\n";
}

int main()
{
    std::function<void(const char*, int)> f1{foo};
    std::function<void(const char*, int)> f2{bar};

    f1("f1", 1);
    f2("f2", 2);

    std::cout << "f1.swap(f2);\n";
    f1.swap(f2);

    f1("f1", 1);
    f2("f2", 2);
}
```

Output:

```text
foo("f1", 1)
bar("f2", 2)
f1.swap(f2);
bar("f1", 1)
foo("f2", 2)
```

### See also

swap swaps the targets of two `std::move_only_function` objects (public member function of `std::move_only_function`)
