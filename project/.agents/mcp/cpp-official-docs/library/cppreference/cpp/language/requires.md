# `requires` expression (since C++20)

Yields a prvalue expression of type `bool` that describes the constraints.

### Syntax

|  |  |
| --- | --- |
| `requires` `{` requirement-seq `}` | (1) |
| `requires` `(` parameter-list (optional) `)` `{` requirement-seq `}` | (2) |

|  |  |  |
| --- | --- | --- |
| parameter-list | - | a parameter list |
| requirement-seq | - | sequence of *requirements*, each requirement is one of the following: simple requirement type requirement compound requirement nested requirement |

### Explanation

Requirements may refer to the template parameters that are in scope, to the parameters of parameter-list, and to any other declarations that are visible from the enclosing context.

The substitution of template arguments into a `requires` expression used in a declaration of a templated entity may result in the formation of invalid types or expressions in its requirements, or the violation of semantic constraints of those requirements. In such cases, the `requires` expression evaluates to `false` and does not cause the program to be ill-formed. The substitution and semantic constraint checking proceeds in lexical order and stops when a condition that determines the result of the `requires` expression is encountered. If substitution (if any) and semantic constraint checking succeed, the `requires` expression evaluates to `true`.

If a substitution failure would occur in a `requires` expression for every possible template argument, the program is ill-formed, no diagnostic required:

```cpp
template<class T>
concept C = requires
{
    new int[-(int)sizeof(T)]; // invalid for every T: ill-formed, no diagnostic required
};
```

If a `requires` expression contains invalid types or expressions in its requirements, and it does not appear within the declaration of a templated entity, then the program is ill-formed.

### Local parameters

A `requires` expression can introduce local parameters using a parameter list. These parameters have no linkage, storage, or lifetime; they are only used as notation for the purpose of defining requirements.

The type of each parameter is determined by the same way as determining the actual type of function parameters:

```cpp
template<typename T>
concept C = requires(T p[2])
{
    (decltype(p))nullptr; // OK, p has type T*
};
```

If any of the following conditions is satisfied, the program is ill-formed:

- A local parameter has a default argument.
- The parameter list terminate with an ellipsis.

```cpp
template<typename T>
concept C1 = requires(T t = 0)  // Error: t has a default argument
{
    t;
};

template<typename T>
concept C2 = requires(T t, ...) // Error: terminates with an ellipsis
{
    t;
};
```

### Simple requirements

expression `;`

expression - an expression which does not start with `requires`

A simple requirement asserts that expression is valid. expression is an unevaluated operand.

```cpp
template<typename T>
concept Addable = requires (T a, T b)
{
    a + b; // "the expression “a + b” is a valid expression that will compile"
};

template<class T, class U = T>
concept Swappable = requires(T&& t, U&& u)
{
    swap(std::forward<T>(t), std::forward<U>(u));
    swap(std::forward<U>(u), std::forward<T>(t));
};
```

A requirement that starts with the keyword `requires` is always interpreted as a nested requirement. Thus a simple requirement cannot start with an unparenthesized `requires` expression.

### Type requirements

`typename` identifier `;`

identifier - a (possibly qualified) identifier (including simple template identifier)

A type requirement asserts that the type named by identifier is valid: this can be used to verify that a certain named nested type exists, or that a class/alias template specialization names a type. A type requirement naming a class template specialization does not require the type to be complete.

```cpp
template<typename T>
using Ref = T&;

template<typename T>
concept C = requires
{
    typename T::inner; // required nested member name
    typename S<T>;     // required class template specialization
    typename Ref<T>;   // required alias template substitution
};

template<class T, class U>
using CommonType = std::common_type_t<T, U>;

template<class T, class U>
concept Common = requires (T&& t, U&& u)
{
    typename CommonType<T, U>; // CommonType<T, U> is valid and names a type
    { CommonType<T, U>{std::forward<T>(t)} };
    { CommonType<T, U>{std::forward<U>(u)} };
};
```

### Compound requirements

|  |  |
| --- | --- |
| `{` expression `};` | (1) |
| `{` expression `}` `noexcept` `;` | (2) |
| `{` expression `} ->` type-constraint `;` | (3) |
| `{` expression `}` `noexcept ->` type-constraint `;` | (4) |

|  |  |  |
| --- | --- | --- |
| expression | - | an expression |
| type-constraint | - | a constraint |

A compound requirement asserts properties of expression . Substitution and semantic constraint checking proceeds in the following order:

1) Template arguments (if any) are substituted into expression .

2) If `noexcept` is present, expression must not be potentially throwing.

3) If type-constraint is present, then:

a) Template arguments are substituted into type-constraint .

b) `decltype((`expression `))` must satisfy the constraint imposed by type-constraint . Otherwise, the enclosing `requires` expression is `false`.

expression is an unevaluated operand.

```cpp
template<typename T>
concept C2 = requires(T x)
{
    // the expression *x must be valid
    // AND the type T::inner must be valid
    // AND the result of *x must be convertible to T::inner
    {*x} -> std::convertible_to<typename T::inner>;

    // the expression x + 1 must be valid
    // AND std::same_as<decltype((x + 1)), int> must be satisfied
    // i.e., (x + 1) must be a prvalue of type int
    {x + 1} -> std::same_as<int>;

    // the expression x * 1 must be valid
    // AND its result must be convertible to T
    {x * 1} -> std::convertible_to<T>;
};
```

### Nested requirements

`requires` constraint-expression `;`

constraint-expression - an expression representing constraints

A nested requirement can be used to specify additional constraints in terms of local parameters. constraint-expression must be satisfied by the substituted template arguments, if any. Substitution of template arguments into a nested requirement causes substitution into constraint-expression only to the extent needed to determine whether constraint-expression is satisfied.

```cpp
template<class T>
concept Semiregular = DefaultConstructible<T> &&
    CopyConstructible<T> && CopyAssignable<T> && Destructible<T> &&
requires(T a, std::size_t n)
{
    requires Same<T*, decltype(&a)>; // nested: "Same<...> evaluates to true"
    { a.~T() } noexcept; // compound: "a.~T()" is a valid expression that doesn't throw
    requires Same<T*, decltype(new T)>; // nested: "Same<...> evaluates to true"
    requires Same<T*, decltype(new T[n])>; // nested
    { delete new T }; // compound
    { delete new T[n] }; // compound
};
```

### Note

The keyword `requires` is also used to introduce `requires` clauses.

```cpp
template<typename T>
concept Addable = requires (T x) { x + x; }; // requires expression

template<typename T> requires Addable<T> // requires clause, not requires expression
T add(T a, T b) { return a + b; }

template<typename T>
    requires requires (T x) { x + x; } // ad-hoc constraint, note keyword used twice
T add(T a, T b) { return a + b; }
```

### Keywords

`requires`

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| CWG 2560 | C++20 | it was unclear whether parameter types are adjusted in `requires` expressions | also adjusted |
| CWG 2911 | C++20 | all expressions appearing within `requires` expressions were unevaluated operands | only some expressions are |

### References

- C++23 standard (ISO/IEC 14882:2024):

- 7.5.7 Requires expressions [expr.prim.req]

- C++20 standard (ISO/IEC 14882:2020):

- 7.5.7 Requires expressions [expr.prim.req]

### See also

Constraints and concepts(C++20) specifies the requirements on template arguments
