# The `this` pointer

### Syntax

`this`

The expression `this` is a prvalue expression whose value is the address of the implicit object parameter (object on which the implicit object member function is being called). It can appear in the following contexts:

1) Within the body of any implicit object member function, including member initializer list, and lambda expression body(since C++11).

2) Within the declaration of any implicit object member function anywhere after the (optional) cv-qualifier sequence, including the exception specification and the trailing return type(since C++11).

3) Within default member initializer. 4) Within capture list of a lambda expression. (since C++11)

### Explanation

`this` can only associate with the innermost enclosing class of its appearance, even if the appearance is invalid in the context:

```cpp
class Outer
{
    int a[sizeof(*this)];            // Error: not inside a member function
    unsigned int sz = sizeof(*this); // OK: in default member initializer

    void f()
    {
        int b[sizeof(*this)];     // OK

        struct Inner
        {
            int c[sizeof(*this)]; // Error: not inside a member function of Inner
                                  // “this” is not associated with Outer
                                  // even if it is inside a member function of Outer
        };
    }
};
```

The type of `this` in a member function of class `X` is `X*` (pointer to X). If the member function is declared with a cv-qualifier sequence *cv*, the type of `this` is `cv X*` (pointer to identically cv-qualified X). Since constructors and destructors cannot be declared with cv-qualifiers, the type of `this` in them is always `X*`, even when constructing or destroying a const object.

In class templates, `this` is a dependent expression, and explicit `this->` may be used to force another expression to become dependent.

```cpp
template<typename T>
struct B
{
    int var;
};

template<typename T>
struct D : B<T>
{
    D()
    {
        // var = 1;    // Error: “var” was not declared in this scope
        this->var = 1; // OK
    }
};
```

During construction of an object, if the value of the object or any of its subobjects is accessed through a glvalue that is not obtained, directly or indirectly, from the constructor's `this` pointer, the value of the object or subobject thus obtained is unspecified. In other words, the this pointer cannot be aliased in a constructor:

```cpp
extern struct D d;

struct D
{
    D(int a) : a(a), b(d.a) {} // b(a) or b(this->a) would be correct
    int a, b;
};

D d = D(1); // because b(d.a) did not obtain a through this, d.b is now unspecified
```

It is possible to execute `delete this;`, if the program can guarantee that the object was allocated by `new`, however, this renders every pointer to the deallocated object invalid, including the `this` pointer itself: after `delete this;` returns, such member function cannot refer to a member of a class (since this involves an implicit dereference of `this`) and no other member function may be called.

This can be used in the member function of the reference-counting pointer (for example, `std::shared_ptr`)(since C++11) responsible for decrementing the reference count, when the last reference to the managed object goes out of scope.

```cpp
class ref
{
    // ...
    void incRef() { ++mnRef; }
    void decRef() { if (--mnRef == 0) delete this; }
};
```

### Keywords

`this`

### Example

```cpp
class T
{
    int x;

    void foo()
    {
        x = 6;       // same as this->x = 6;
        this->x = 5; // explicit use of this->
    }

    void foo() const
    {
    //  x = 7; // Error: *this is constant
    }

    void foo(int x) // parameter x shadows the member with the same name
    {
        this->x = x; // unqualified x refers to the parameter
                     // “this->” is required for disambiguation
    }

    int y;
    T(int x) : x(x),      // uses parameter x to initialize member x
               y(this->x) // uses member x to initialize member y
    {}

    T& operator=(const T& b)
    {
        x = b.x;
        return *this; // many overloaded operators return *this
    }
};
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| CWG 760 | C++98 | when `this` is used in a nested class, it was unspecified whether it is associated with the nested class or the enclosing class | `this` always associates with the innermost nested class, regardless of whether it is in a non-static member function |
| CWG 2271 | C++98 | `this` could be aliased when constructing a non-const object | alias is also prohibited in this case |
| CWG 2869 | C++98 | it was unclear whether `this` could be used in a static member function of a non-associated class | made clear |
