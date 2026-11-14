# Curiously Recurring Template Pattern

The Curiously Recurring Template Pattern is an idiom in which a class `X` derives from a class template `Y`, taking a template parameter `Z`, where `Y` is instantiated with `Z = X`. For example,

```cpp
template<class Z>
class Y {};

class X : public Y<X> {};
```

### Example

CRTP may be used to implement "compile-time polymorphism", when a base class exposes an interface, and derived classes implement such interface.

```cpp
#include <cstdio>

#ifndef __cpp_explicit_this_parameter // Traditional syntax

template <class Derived>
struct Base
{
    void name() { static_cast<Derived*>(this)->impl(); }
protected:
    Base() = default; // prohibits the creation of Base objects, which is UB
};
struct D1 : public Base<D1> { void impl() { std::puts("D1::impl()"); } };
struct D2 : public Base<D2> { void impl() { std::puts("D2::impl()"); } };

#else // C++23 deducing-this syntax

struct Base { void name(this auto&& self) { self.impl(); } };
struct D1 : public Base { void impl() { std::puts("D1::impl()"); } };
struct D2 : public Base { void impl() { std::puts("D2::impl()"); } };

#endif

int main()
{
    D1 d1; d1.name();
    D2 d2; d2.name();
}
```

Output:

```text
D1::impl()
D2::impl()
```

### See also

|  |  |
| --- | --- |
| Explicit object member functions (deducing `this`) (C++23) |  |
| enable_shared_from_this (C++11) | allows an object to create a `shared_ptr` referring to itself (class template) |
| ranges::view_interface (C++20) | helper class template for defining a `view`, using the **curiously recurring template pattern** (class template) |

### External links

|  |  |
| --- | --- |
| 1. | Replace CRTP with concepts? — Sandor Drago's blog |
| 2. | The Curiously Recurring Template Pattern (CRTP) — Sandor Drago's blog |
| 3. | The Curiously Recurring Template Pattern (CRTP) - 1 — Fluent`{C++}` |
| 4. | What the CRTP can bring to your code - 2 — Fluent`{C++}` |
| 5. | An implementation helper for the CRTP - 3 — Fluent`{C++}` |
| 6. | What is the Curiously Recurring Template Pattern (CRTP) — SO |
