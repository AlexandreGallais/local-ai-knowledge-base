# std::expected<T,E>::swap

|  |  |  |
| --- | --- | --- |
| Primary template |  |  |
| `constexpr void swap( expected& other ) noexcept(/* see below */);` | (1) | (since C++23) |
| `void` partial specialization |  |  |
| `constexpr void swap( expected& other ) noexcept(/* see below */);` | (2) | (since C++23) |

Swaps the contents with those of `other`.

1) The contained values are swapped as follows:

| Value of `has_value()` | Value of `other.has_value()` |  |
| --- | --- | --- |
| `true` | `false` |  |
| `true` | `using std::swap; swap(val, rhs.val);` | see below |
| `false` | `other.swap(*this);` | `using std::swap; swap(unex, rhs.unex);` |

If `has_value()` is `true` and `other.has_value()` is `false`, equivalent to:

`// Case 1: the move constructions of unexpected values are non-throwing: // “other.unex” will be restored if the construction of “other.val” fails if constexpr (std::is_nothrow_move_constructible_v<E>) { E temp(std::move(other.unex)); std::destroy_at(std::addressof(other.unex)); try { std::construct_at(std::addressof(other.val), std::move(val)); // may throw std::destroy_at(std::addressof(val)); std::construct_at(std::addressof(unex), std::move(temp)); } catch(...) { std::construct_at(std::addressof(other.unex), std::move(temp)); throw; } } // Case 2: the move constructions of expected values are non-throwing: // “this->val” will be restored if the construction of “this->unex” fails else { T temp(std::move(val)); std::destroy_at(std::addressof(val)); try { std::construct_at(std::addressof(unex), std::move(other.unex)); // may throw std::destroy_at(std::addressof(other.unex)); std::construct_at(std::addressof(other.val), std::move(temp)); } catch(...) { std::construct_at(std::addressof(val), std::move(temp)); throw; } } has_val = false; rhs.has_val = true;`

This overload participates in overload resolution only if all following values are `true`:

- `std::is_swappable_v<T>`
- `std::is_swappable_v<E>`
- `std::is_move_constructible_v<T> && std::is_move_constructible_v<E>`
- `std::is_nothrow_move_constructible_v<T> || std::is_nothrow_move_constructible_v<E>`

2) The unexpected values are swapped as follows:

| Value of `has_value()` | Value of `other.has_value()` |  |
| --- | --- | --- |
| `true` | `false` |  |
| `true` | `using std::swap; swap(val, rhs.val);` | `std::construct_at(std::addressof(unex), std::move(rhs.unex)); std::destroy_at(std::addressof(rhs.unex)); has_val = false; rhs.has_val = true;` |
| `false` | `other.swap(*this);` | `using std::swap; swap(unex, rhs.unex);` |

This overload participates in overload resolution only if `std::is_swappable_v<E>` and `std::is_move_constructible_v<E>` are both `true`.

### Parameters

other - the `expected` object to exchange the contents with

### Exceptions

1)

`noexcept` specification:

`noexcept( std::is_nothrow_move_constructible_v<T> && std::is_nothrow_swappable_v<T> && std::is_nothrow_move_constructible_v<E> && std::is_nothrow_swappable_v<E> )`

2)

`noexcept` specification:

`noexcept( std::is_nothrow_move_constructible_v<E> && std::is_nothrow_swappable_v<E> )`

### Example

```cpp
#include <expected>
#include <iostream>
#include <string>

using Ex = std::expected<std::string, int>;

void show(const Ex& ex1, const Ex& ex2)
{
    for (int i{}; i < 2; ++i)
    {
        std::cout << (i ? "ex2" : "ex1");
        if (const Ex& ex = (i ? ex2 : ex1); ex.has_value())
            std::cout << ".has_value() = " << *ex << '\n';
        else
            std::cout << ".error() = " << ex.error() << '\n';
    }
}

int main()
{
    Ex ex1("\N{CAT FACE}");
    Ex ex2{"\N{GREEN HEART}"};
    show(ex1, ex2);
    ex1.swap(ex2);
    std::cout << "ex1.swap(ex2);\n";
    show(ex1, ex2);
    std::cout << '\n';

    ex2 = std::unexpected(13);
    show(ex1, ex2);
    std::cout << "ex1.swap(ex2);\n";
    ex1.swap(ex2);
    show(ex1, ex2);
    std::cout << '\n';

    ex2 = std::unexpected(19937);
    show(ex1, ex2);
    std::cout << "ex1.swap(ex2);\n";
    ex1.swap(ex2);
    show(ex1, ex2);
}
```

Output:

```text
ex1.has_value() = 🐱
ex2.has_value() = 💚
ex1.swap(ex2);
ex1.has_value() = 💚
ex2.has_value() = 🐱

ex1.has_value() = 💚
ex2.error() = 13
ex1.swap(ex2);
ex1.error() = 13
ex2.has_value() = 💚

ex1.error() = 13
ex2.error() = 19937
ex1.swap(ex2);
ex1.error() = 19937
ex2.error() = 13
```

### See also

swap(std::expected) (C++23) specializes the `std::swap` algorithm (function)
