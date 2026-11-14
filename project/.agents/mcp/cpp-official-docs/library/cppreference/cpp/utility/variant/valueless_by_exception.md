# std::variant<Types...>::valueless_by_exception

`constexpr bool valueless_by_exception() const noexcept;` (since C++17)

Returns `false` if and only if the variant holds a value.

### Notes

A variant may become valueless when initializing the contained value in the following situations:

- (guaranteed) an exception is thrown during move assignment
- (optional) an exception is thrown during copy assignment
- (optional) an exception is thrown during a type-changing assignment
- (optional) an exception is thrown during a type-changing `emplace`

Since variant is never permitted to allocate dynamic memory, the previous value cannot be retained and, therefore, restored in these situations. The "optional" cases can avoid throwing an exception if the type provides non-throwing moves and the implementation first constructs the new value on the stack and then moves it into the variant.

This applies even to variants of non-class types:

```cpp
struct S
{
    operator int() { throw 42; }
};
std::variant<float, int> v{12.f}; // OK
v.emplace<1>(S()); // v may be valueless
```

A variant that is *valueless by exception* — that is, has no value due to a previous exception from one of the situations listed above — is treated as being in an invalid state:

- `index` returns `variant_npos`
- `get` throws `bad_variant_access`
- `visit` and member-`visit`(since C++26) throw `bad_variant_access`

### Example

```cpp
#include <cassert>
#include <iostream>
#include <stdexcept>
#include <string>
#include <variant>

struct Demo
{
    Demo(int) {}
    Demo(const Demo&) { throw std::domain_error("copy ctor"); }
    Demo& operator= (const Demo&) = default;
};

int main()
{
    std::variant<std::string, Demo> var{"str"};
    assert(var.index() == 0);
    assert(std::get<0>(var) == "str");
    assert(var.valueless_by_exception() == false);

    try
    {
        var = Demo{555};
    }
    catch (const std::domain_error& ex)
    {
        std::cout << "1) Exception: " << ex.what() << '\n';
    }
    assert(var.index() == std::variant_npos);
    assert(var.valueless_by_exception() == true);

    // Now the var is "valueless" which is an invalid state caused
    // by an exception raised in the process of type-changing assignment.

    try
    {
        std::get<1>(var);
    }
    catch (const std::bad_variant_access& ex)
    {
        std::cout << "2) Exception: " << ex.what() << '\n';
    }

    var = "str2";
    assert(var.index() == 0);
    assert(std::get<0>(var) == "str2");
    assert(var.valueless_by_exception() == false);
}
```

Possible output:

```text
1) Exception: copy ctor
2) Exception: std::get: variant is valueless
```

### See also

|  |  |
| --- | --- |
| get(std::variant) (C++17) | reads the value of the variant given the index or the type (if the type is unique), throws on error (function template) |
| index | returns the zero-based index of the alternative held by the `variant` (public member function) |
| bad_variant_access (C++17) | exception thrown on invalid accesses to the value of a `variant` (class) |
