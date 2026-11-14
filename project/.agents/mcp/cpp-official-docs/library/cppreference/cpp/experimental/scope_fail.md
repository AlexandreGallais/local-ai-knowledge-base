# std::experimental::scope_fail

| Defined in header `<experimental/scope>` |  |
| --- | --- |
| `template< class EF > class scope_fail;` | (library fundamentals TS v3) |

The class template `scope_fail` is a general-purpose scope guard intended to call its exit function when a scope is exited via an exception.

`scope_fail` is not CopyConstructible, CopyAssignable or MoveAssignable, however, it may be MoveConstructible if `EF` meets some requirements, which permits wrapping a `scope_fail` into another object.

A `scope_fail` may be either active, i.e. calls its exit function on destruction, or inactive, i.e. does nothing on destruction. A `scope_fail` is active after constructed from an exit function.

A `scope_fail` can become inactive by calling `release()` on it either manually or automatically (by the move constructor). An inactive `scope_fail` may also be obtained by initializing with another inactive `scope_fail`. Once a `scope_fail` is inactive, it cannot become active again.

A `scope_fail` effectively holds an `EF` and a `bool` flag indicating if it is active, alongwith a counter of uncaught exceptions used for detecting whether the destructor is called during stack unwinding.

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
| (constructor) | constructs a new `scope_fail` (public member function) |
| (destructor) | calls the exit function when the scope is exited via an exception if the `scope_fail` is active, then destroys the `scope_fail` (public member function) |
| operator= [deleted] | `scope_fail` is not assignable (public member function) |
| Modifiers |  |
| release | makes the `scope_fail` inactive (public member function) |

### Deduction guides

### Notes

Constructing a `scope_fail` of dynamic storage duration might lead to unexpected behavior.

Constructing a `scope_fail` is constructed from another `scope_fail` created in a different thread might also lead to unexpected behavior since the count of uncaught exceptions obtained in different threads may be compared during the destruction.

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
| scope_exit | wraps a function object and invokes it on exiting the scope (class template) |
| scope_success | wraps a function object and invokes it on exiting the scope normally (class template) |
| default_delete (C++11) | default deleter for `unique_ptr` (class template) |
