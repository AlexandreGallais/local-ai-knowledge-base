# std::set_terminate

| Defined in header `<exception>` |  |
| --- | --- |
| `std::terminate_handler set_terminate( std::terminate_handler f ) throw();` | (until C++11) |
| `std::terminate_handler set_terminate( std::terminate_handler f ) noexcept;` | (since C++11) |

Makes `f` the new global terminate handler function and returns the previously installed `std::terminate_handler`. `f` shall terminate execution of the program without returning to its caller, otherwise the behavior is undefined.

This function is thread-safe. Every call to `std::set_terminate` *synchronizes-with* (see `std::memory_order`) subsequent calls to `std::set_terminate` and `std::get_terminate`. (since C++11)

### Parameters

f - pointer to function of type `std::terminate_handler`, or null pointer

### Return value

The previously-installed terminate handler, or a null pointer value if none was installed.

### Example

```cpp
#include <cstdlib>
#include <exception>
#include <iostream>

int main()
{
    std::set_terminate([]()
    {
        std::cout << "Unhandled exception\n" << std::flush;
        std::abort();
    });
    throw 1;
}
```

Possible output:

```text
Unhandled exception
bash: line 7:  7743 Aborted                 (core dumped) ./a.out
```

The terminate handler will also work for launched threads, so it can be used as an alternative to wrapping the thread function with a `try`/`catch` block. In the following example, since the exception is unhandled, `std::terminate` will be called.

```cpp
#include <iostream>
#include <thread>

void run()
{
    throw std::runtime_error("Thread failure");
}

int main()
{
    try
    {
        std::thread t{run};
        t.join();
        return EXIT_SUCCESS;
    }
    catch (const std::exception& ex)
    {
        std::cerr << "Exception: " << ex.what() << '\n';
    }
    catch (...)
    {
        std::cerr << "Unknown exception caught\n";
    }
    return EXIT_FAILURE;
}
```

Possible output:

```text
terminate called after throwing an instance of 'std::runtime_error'
  what():  Thread failure
Aborted (core dumped)
```

With the introduction of the terminate handler, the exception thrown from the non-main thread can be analyzed, and exit can be gracefully performed.

```cpp
#include <iostream>
#include <thread>

class foo
{
public:
    foo() { std::cerr << "foo::foo()\n"; }
    ~foo() { std::cerr << "foo::~foo()\n"; }
};

// Static object, expecting destructor on exit
foo f;

void run()
{
    throw std::runtime_error("Thread failure");
}

int main()
{
    std::set_terminate([]()
    {
        try
        {
            std::exception_ptr eptr{std::current_exception()};
            if (eptr)
            {
                std::rethrow_exception(eptr);
            }
            else
            {
                std::cerr << "Exiting without exception\n";
            }
        }
        catch (const std::exception& ex)
        {
            std::cerr << "Exception: " << ex.what() << '\n';
        }
        catch (...)
        {
            std::cerr << "Unknown exception caught\n";
        }
        std::exit(EXIT_FAILURE);
    });

    std::thread t{run};
    t.join();
}
```

Output:

```text
foo::foo()
Exception: Thread failure
foo::~foo()
```

### See also

|  |  |
| --- | --- |
| terminate | function called when exception handling fails (function) |
| get_terminate (C++11) | obtains the current terminate_handler (function) |
| terminate_handler | the type of the function called by `std::terminate` (typedef) |
