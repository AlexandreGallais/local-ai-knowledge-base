# Constant initialization

Sets the initial values of the static variables to a compile-time constant.

### Explanation

*Constant initialization* is performed in the following cases:

|  |  |
| --- | --- |
| Initializing a reference with static storage duration with a constant expression. Initializing an object of POD type with static storage duration with a constant expression. | (until C++11) |
| Initializing a reference with static or thread storage duration, where all following conditions are satisfied: Each full-expression (including implicit conversions) that appears in the initializer is a constant expression. The reference is bound to one of the following entities: an lvalue designating an object with static storage duration a temporary object a subobject of a temporary object a function Initializing an object with static or thread storage duration, and one of the following conditions is satisfied: If the object is initialized by a constructor call, where the initialization full-expression is a constant expression, except that it may also invoke `constexpr` constructors for the object and its subobjects (even if those objects are of non-literal class types). Otherwise, either the object is value-initialized or every full-expression that appears in its initializer is a constant expression. | (since C++11) (until C++17) |
| Initializing a variable or temporary object with static or thread storage duration by an initializer whose full-expression is a constant expression, except that if the entity being intialized is an object, such an initializer may also invoke `constexpr` constructors for the object and its subobjects (even if those objects are of non-literal class types). | (since C++17) (until C++20) |
| A variable or temporary object(until C++26) with static or thread storage duration is constant-initialized. | (since C++20) |

The effects of constant initialization are the same as the effects of the corresponding initialization, except that it is guaranteed that it is complete before any other initialization of a static or thread-local(since C++11) object begins.

### Notes

The compiler is permitted to initialize other static and thread-local(since C++11) objects using constant initialization, if it can guarantee that the value would be the same as if the standard order of initialization was followed.

Constant initialization usually happens when the program loads into memory, as part of initializing the program's runtime environment.

### Example

```cpp
#include <iostream>
#include <array>

struct S
{
    static const int c;
};

const int d = 10 * S::c; // not a constant expression: S::c has no preceding
                         // initializer, this initialization happens after const
const int S::c = 5;      // constant initialization, guaranteed to happen first

int main()
{
    std::cout << "d = " << d << '\n';
    std::array<int, S::c> a1; // OK: S::c is a constant expression
//  std::array<int, d> a2;    // error: d is not a constant expression
}
```

Output:

```text
d = 50
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| CWG 441 | C++98 | references could not be constant initialized | made constant initializable |
| CWG 1489 | C++11 | it was unclear whether value-initializing an object can be a constant initialization | it can |
| CWG 1747 | C++11 | binding a reference to a function could not be constant initialization | it can |
| CWG 1834 | C++11 | binding a reference to an xvalue could not be constant initialization | it can |

### See also

- `constinit`
- `constexpr`
- constructor
- converting constructor
- copy constructor
- default constructor
- `explicit`
- initialization
  - aggregate initialization
  - copy initialization
  - default initialization
  - direct initialization
  - list initialization
  - reference initialization
  - value initialization
  - zero initialization
- move constructor
