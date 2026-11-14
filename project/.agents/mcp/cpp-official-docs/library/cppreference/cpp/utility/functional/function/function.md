# std::function<R(Args...)>::function

|  |  |  |
| --- | --- | --- |
| `function() noexcept;` | (1) | (since C++11) |
| `function( std::nullptr_t ) noexcept;` | (2) | (since C++11) |
| `function( const function& other );` | (3) | (since C++11) |
|  | (4) |  |
| `function( function&& other );` |  | (since C++11) (until C++20) |
| `function( function&& other ) noexcept;` |  | (since C++20) |
| `template< class F > function( F&& f );` | (5) | (since C++11) |
| `template< class Alloc > function( std::allocator_arg_t, const Alloc& alloc ) noexcept;` | (6) | (since C++11) (removed in C++17) |
| `template< class Alloc > function( std::allocator_arg_t, const Alloc& alloc, std::nullptr_t ) noexcept;` | (7) | (since C++11) (removed in C++17) |
| `template< class Alloc > function( std::allocator_arg_t, const Alloc& alloc, const function& other );` | (8) | (since C++11) (removed in C++17) |
| `template< class Alloc > function( std::allocator_arg_t, const Alloc& alloc, function&& other );` | (9) | (since C++11) (removed in C++17) |
| `template< class F, class Alloc > function( std::allocator_arg_t, const Alloc& alloc, F f );` | (10) | (since C++11) (removed in C++17) |

Constructs a `std::function` from a variety of sources.

1,2) Creates an empty `std::function`.

3) Copies the target of `other` to the target of `*this`.

If `other` is empty, `*this` will be empty right after the call too.

4) Moves the target of `other` to the target of `*this`.

If `other` is empty, `*this` will be empty right after the call too.

`other` is in a valid but unspecified state right after the call.

5) Initializes the target with `std::forward<F>(f)`. The target is of type `std::decay<F>::type`.

If `f` is a null pointer to function, a null pointer to member, or an empty value of some `std::function` specialization, `*this` will be empty right after the call.

This overload participates in overload resolution only if all following conditions are satisfied:

`std::is_same_v<std::remove_cvref_t<F>, std::function<R(Args...)>` is `false`. (since C++23)

- An lvalue of type `std::decay<F>::type` is callable for argument types `Args...` and return type `R`.

If `std::is_copy_constructible_v<std::decay_t<F>>` or `std::is_constructible_v<std::decay_t<F>, F>` is `false`, the program is ill-formed. (since C++23)

If `F` is not CopyConstructible, the behavior is undefined.

6-10) Same as (1-5) except that `alloc` is used to allocate memory for any internal data structures that the `std::function` might use.

When the target is a function pointer or a `std::reference_wrapper`, small object optimization is guaranteed, that is, these targets are always directly stored inside the `std::function` object, no dynamic allocation takes place. Other large objects may be constructed in dynamic allocated storage and accessed by the `std::function` object through a pointer.

### Parameters

|  |  |  |
| --- | --- | --- |
| other | - | the function object used to initialize `*this` |
| f | - | a callable object used to initialize `*this` |
| alloc | - | an Allocator used for internal memory allocation |
| Type requirements |  |  |
| - `Alloc` must meet the requirements of Allocator. |  |  |

### Exceptions

3,8,9) Does not throw if `other`'s target is a function pointer or a `std::reference_wrapper`, otherwise may throw `std::bad_alloc` or any exception thrown by the constructor used to copy or move the stored callable object.

4) Does not throw if `other`'s target is a function pointer or a `std::reference_wrapper`, otherwise may throw `std::bad_alloc` or any exception thrown by the constructor used to copy or move the stored callable object. (until C++20)

5,10) Does not throw if `f` is a function pointer or a `std::reference_wrapper`, otherwise may throw `std::bad_alloc` or any exception thrown by the copy constructor of the stored callable object.

### Notes

`std::function`'s allocator support was poorly specified and inconsistently implemented. Some implementations do not provide overloads (6-10) at all, some provide the overloads but ignore the supplied allocator argument, and some provide the overloads and use the supplied allocator for construction but not when the `std::function` is reassigned. As a result, allocator support was removed in C++17.

### Example

```cpp
#include <functional>
#include <iostream>
#include <utility>

void print_num(int i) { std::cout << "print_num(" << i << ")\n"; }

int main()
{
    std::function<void(int)> func1; // (1) empty constructor
    try
    {
        func1(333 << 1);
    }
    catch (const std::bad_function_call& ex)
    {
        std::cout << "1) " << ex.what() << '\n';
    }

    std::function<void(int)> func2{nullptr}; // (2) empty constructor
    try
    {
        func1(222 * 3);
    }
    catch (const std::bad_function_call& ex)
    {
        std::cout << "2) " << ex.what() << '\n';
    }

    func1 = print_num; // initializes func1 using assignment operator

    std::function<void(int)> func3{func1}; // (3) copy constructor
    func3(33);

    std::function<void(int)> func4{std::move(func3)}; // (4) move constructor,
                                                      // func3 in unspecified state
    func4(44);

    std::function<void(int)> func5{print_num}; // (5) constructor with function
    func5(55);

    // (5) constructor with lambda
    std::function<void(int)> func6([](int i) { std::cout << "lambda(" << i << ")\n"; });
    func6(66);
}
```

Possible output:

```text
1) bad_function_call
2) bad_function_call
print_num(33)
print_num(44)
print_num(55)
lambda(66)
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2132 | C++11 | overloads (5,10) might be ambiguous | constrained |
| LWG 2774 | C++11 | (5,10) performed an additional move | eliminated |

### See also

(constructor) constructs a new `std::move_only_function` object (public member function of `std::move_only_function`)
