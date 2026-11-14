# std::experimental::scope_exit

| Defined in header `<experimental/scope>` |  |
| --- | --- |
| `template< class EF > class scope_exit;` | (library fundamentals TS v3) |

The class template `scope_exit` is a general-purpose scope guard intended to call its exit function when a scope is exited.

`scope_exit` is not CopyConstructible, CopyAssignable or MoveAssignable, however, it may be MoveConstructible if `EF` meets some requirements, which permits wrapping a `scope_exit` into another object.

A `scope_exit` may be either active, i.e. calls its exit function on destruction, or inactive, i.e. does nothing on destruction. A `scope_exit` is active after constructed from an exit function.

A `scope_exit` can become inactive by calling `release()` on it either manually or automatically (by the move constructor). An inactive `scope_exit` may also be obtained by initializing with another inactive `scope_exit`. Once a `scope_exit` is inactive, it cannot become active again.

A `scope_exit` effectively holds an `EF` and a `bool` flag indicating if it is active.

### Template parameters

|  |  |  |
| --- | --- | --- |
| EF | - | type of stored exit function |
| Type requirements |  |  |
| - `EF` shall be either: a Destructible FunctionObject type, an lvalue reference to FunctionObject, an lvalue reference to function. |  |  |
| - Calling an lvalue of `std::remove_reference_t<EF>` with no argument shall be well-formed. |  |  |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `scope_exit` (public member function) |
| (destructor) | calls the exit function when the scope is exited if the `scope_exit` is active, then destroys the `scope_exit` (public member function) |
| operator= [deleted] | `scope_exit` is not assignable (public member function) |
| Modifiers |  |
| release | makes the `scope_exit` inactive (public member function) |

### Deduction guides

### Notes

Constructing a `scope_exit` of dynamic storage duration might lead to unexpected behavior.

If the `EF` stored in a `scope_exit` object refers to a local variable of the function where it is defined, e.g., as a lambda capturing the variable by reference, and that variable is used as a return operand in that function, that variable might have already been returned when the `scope_exit`'s destructor executes, calling the exit function. This can lead to surprising behavior.

### Example

```cpp
#include <iostream>
#include <cstdlib>
#include <string_view>
#include <experimental/scope>

void print_exit_status(std::string_view name, bool exit_status, bool did_throw) {
  std::cout << name << ":\n";
  std::cout << "  Throwed exception  " << (did_throw ? "yes" : "no") << "\n";
  std::cout << "  Exit status        " << (exit_status ? "finished" : "pending") << "\n\n";
}

// Randomly throw an exception (50% chance)
void maybe_throw() {
    if (std::rand() >= RAND_MAX / 2)
        throw std::exception{};
}

int main() {
  bool exit_status{false}, did_throw{false};

  // Manual handling at "end of scope"
  try {
    maybe_throw();
    exit_status = true;
  } catch (...) { did_throw = true; }
  print_exit_status("Manual handling", exit_status, did_throw);

  // Using scope_exit: runs on scope exit (success or exception)
  exit_status = did_throw = false;
  try {
    auto guard = std::experimental::scope_exit{[&]{ exit_status = true; } };
    maybe_throw();
  } catch (...) { did_throw = true; }
  print_exit_status("scope_exit", exit_status, did_throw);

  // Using scope_fail: runs only if an exception occurs
  exit_status = did_throw = false;
  try {
    auto guard = std::experimental::scope_fail{[&]{ exit_status = true; } };
    maybe_throw();
  } catch (...) { did_throw = true; }
  print_exit_status("scope_fail", exit_status, did_throw);

  // Using scope_success: runs only if no exception occurs
  exit_status = did_throw = false;
  try {
    auto guard = std::experimental::scope_success{[&]{ exit_status = true; } };
    maybe_throw();
  } catch (...) { did_throw = true; }
  print_exit_status("scope_success", exit_status, did_throw);
}
```

Output:

```text
Manual handling:
  Throwed exception  yes
  Exit status        pending

scope_exit:
  Throwed exception  no
  Exit status        finished

scope_fail:
  Throwed exception  yes
  Exit status        finished

scope_success:
  Throwed exception  yes
  Exit status        pending
```

### See also

|  |  |
| --- | --- |
| scope_fail | wraps a function object and invokes it on exiting the scope through an exception (class template) |
| scope_success | wraps a function object and invokes it on exiting the scope normally (class template) |
| default_delete (C++11) | default deleter for `unique_ptr` (class template) |
