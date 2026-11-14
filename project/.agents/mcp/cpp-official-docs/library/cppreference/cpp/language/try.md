# `try` block

An exception thrown in a `try` block can possibly be handled by an associated handler.

### Syntax

|  |  |
| --- | --- |
| `try` compound-statement handler-seq | (1) |
| `try` ctor-initializer (optional) compound-statement handler-seq | (2) |

1) An ordinary `try` block.

2) A function `try` block. compound-statement must be the compound statement component of a function body.

|  |  |  |
| --- | --- | --- |
| compound-statement | - | a compound statement |
| handler-seq | - | a non-empty sequence of handlers |
| ctor-initializer | - | member initializer list (for constructors only) |

### Ordinary `try` block

An ordinary `try` block is a statement.

If an exception is thrown from its compound-statement, the exception will be matched against the handlers in its handler-seq :

```cpp
void f()
{
    throw 1;     // NOT handled by the handler below
    try
    {
        throw 2; // handled by the associated handler
    }
    catch (...)
    {
        // handles the exception 2
    }
    throw 3;     // NOT handled by the handler above
}
```

### Function `try` block

A function `try` block is a special kind of function body.

If an exception is thrown from its compound-statement or ctor-initializer (if any), the exception will be matched against the handlers in its handler-seq :

```cpp
int f(bool cond)
{
    if (cond)
        throw 1;
    return 0;
}

struct X
{
    int mem;

    X() try : mem(f(true)) {}
    catch (...)
    {
        // handles the exception 1
    }

    X(int) try
    {
        throw 2;
    }
    catch (...)
    {
        // handles the exception 2
    }
};
```

Exceptions thrown in destructors of objects with static storage duration or in constructors of objects associated with non-block variables with static storage duration are not caught by a function `try` block on the `main` function.

Exceptions thrown in destructors of objects with thread storage duration or in constructors of objects associated with non-block variables with thread storage duration are not caught by a function `try` block on the initial function of the thread. (since C++11)

Flowing off the end of the compound-statement of a handler of a function `try` block is equivalent to flowing off the end of the `compound-statement` of that function `try` block, unless the function is a constructor or destructor (see below).

#### Constructor and destructor `try` block

For a class `C`, if the function body of its constuctor or destructor definition is a function `try` block, and an exception is thrown during the initialization or destruction, respectively, of `C`’s subobjects, the exception will also be matched against the handlers in the handler-seq of the function `try` block:

```cpp
int f(bool cond = true)
{
    if (cond)
        throw 1;
    return 0;
}

struct X
{
    int mem = f();

    ~X()
    {
        throw 2;
    }
};

struct Y
{
    X mem;

    Y() try {}
    catch (...)
    {
        // handles the exception 1
    }

    ~Y() try {}
    catch (...)
    {
        // handles the exception 2
    }
};
```

Referring to any non-static member or base class of an object in the handler for a function `try` block of a constructor or destructor for that object results in undefined behavior.

If a `return` statement appears in a handler of the function `try` block of a constructor, the program is ill-formed.

The currently handled exception is rethrown if control reaches the end of a handler of the function `try` block of a constructor or destructor.

### Control flow

The compound-statement of a `try` block is a control-flow-limited statement:

```cpp
void f()
{
    goto label;     // error
    try
    {
        goto label; // OK
        label: ;
    }
    catch (...)
    {
        goto label; // error
    }
}
```

A jump statement (`goto`, `break`, `return`, `continue`) can be used to transfer control out of a `try` block (including its handlers). When this happens, each variable declared in the `try` block will be destroyed in the context that directly contains its declaration:

```cpp
try
{
    T1 t1;
    try
    {
        T2 t2;
        goto label; // destroy t2 first, then t1
    }
    catch(...)
    {
        // executed if an exception is thrown while destroying t2
    }
}
catch(...)
{
    // executed if an exception is thrown while destroying t1
}
label: ;
```

### Keywords

`try`

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| CWG 98 | C++98 | a `switch` statement can transfer control into the compound-statement of a `try` block | prohibited |
| CWG 1167 | C++98 | it was unspecified whether a function `try` block on a destructor will catch exceptions from a base or member destructor | such exceptions are caught |

### See also

- Throwing exceptions
- Handling exceptions
