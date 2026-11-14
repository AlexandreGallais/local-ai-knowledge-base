# std::coroutine_handle, std::noop_coroutine_handle

| Defined in header `<coroutine>` |  |  |
| --- | --- | --- |
| `template< class Promise = void > struct coroutine_handle;` | (1) | (since C++20) |
| `template<> struct coroutine_handle<void>;` | (2) | (since C++20) |
| `template<> struct coroutine_handle<std::noop_coroutine_promise>;` | (3) | (since C++20) |
| `using noop_coroutine_handle = std::coroutine_handle<std::noop_coroutine_promise>;` | (4) | (since C++20) |

The class template `coroutine_handle` can be used to refer to a suspended or executing coroutine. Every specialization of `coroutine_handle` is a LiteralType.

1) Primary template, can be created from the promise object of type `Promise`.

2) Specialization `std::coroutine_handle<void>` erases the promise type. It is convertible from other specializations.

3) Specialization `std::coroutine_handle<std::noop_coroutine_promise>` refers to no-op coroutines. It cannot be created from a promise object.

On typical implementations, every specialization of `std::coroutine_handle` is TriviallyCopyable.

If the program adds specializations for `std::coroutine_handle`, the behavior is undefined.

### Data members

| Member name | Definition |
| --- | --- |
| `ptr` (private) | A pointer `void*` to the coroutine state. (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `coroutine_handle` object (public member function) |
| operator= | assigns the `coroutine_handle` object (public member function) |
| Conversion |  |
| operator coroutine_handle<> | obtains a type-erased `coroutine_handle` (public member function) |
| Observers |  |
| done | checks if the coroutine has completed (public member function) |
| operator bool | checks if the handle represents a coroutine (public member function) |
| Control |  |
| operator(), resume | resumes execution of the coroutine (public member function) |
| destroy | destroys a coroutine (public member function) |
| Promise Access |  |
| promise | access the promise of a coroutine (public member function) |
| from_promise [static] | creates a `coroutine_handle` from the promise object of a coroutine (public static member function) |
| Export/Import |  |
| address | exports the underlying address, i.e. the pointer backing the coroutine (public member function) |
| from_address [static] | imports a coroutine from a pointer (public static member function) |

### Non-member functions

operator==, operator<=> (C++20) compares two `coroutine_handle` objects (function)

### Helper classes

std::hash<std::coroutine_handle> (C++20) hash support for **`std::coroutine_handle`** (class template specialization)

### Notes

A `coroutine_handle` may be dangling, in which case the `coroutine_handle` must be used carefully in order to avoid undefined behavior.

### Example

```cpp
#include <coroutine>
#include <iostream>
#include <optional>

template<std::movable T>
class Generator
{
public:
    struct promise_type
    {
        Generator<T> get_return_object()
        {
            return Generator{Handle::from_promise(*this)};
        }
        static std::suspend_always initial_suspend() noexcept
        {
            return {};
        }
        static std::suspend_always final_suspend() noexcept
        {
            return {};
        }
        std::suspend_always yield_value(T value) noexcept
        {
            current_value = std::move(value);
            return {};
        }
        // Disallow co_await in generator coroutines.
        void await_transform() = delete;
        [[noreturn]]
        static void unhandled_exception() { throw; }

        std::optional<T> current_value;
    };

    using Handle = std::coroutine_handle<promise_type>;

    explicit Generator(const Handle coroutine) :
        m_coroutine{coroutine}
    {}

    Generator() = default;
    ~Generator()
    {
        if (m_coroutine)
            m_coroutine.destroy();
    }

    Generator(const Generator&) = delete;
    Generator& operator=(const Generator&) = delete;

    Generator(Generator&& other) noexcept :
        m_coroutine{other.m_coroutine}
    {
        other.m_coroutine = {};
    }
    Generator& operator=(Generator&& other) noexcept
    {
        if (this != &other)
        {
            if (m_coroutine)
                m_coroutine.destroy();
            m_coroutine = other.m_coroutine;
            other.m_coroutine = {};
        }
        return *this;
    }

    // Range-based for loop support.
    class Iter
    {
    public:
        void operator++()
        {
            m_coroutine.resume();
        }
        const T& operator*() const
        {
            return *m_coroutine.promise().current_value;
        }
        bool operator==(std::default_sentinel_t) const
        {
            return !m_coroutine || m_coroutine.done();
        }

        explicit Iter(const Handle coroutine) :
            m_coroutine{coroutine}
        {}

    private:
        Handle m_coroutine;
    };

    Iter begin()
    {
        if (m_coroutine)
            m_coroutine.resume();
        return Iter{m_coroutine};
    }

    std::default_sentinel_t end() { return {}; }

private:
    Handle m_coroutine;
};

template<std::integral T>
Generator<T> range(T first, const T last)
{
    while (first < last)
        co_yield first++;
}

int main()
{
    for (const char i : range(65, 91))
        std::cout << i << ' ';
    std::cout << '\n';
}
```

Output:

```text
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3460 | C++20 | the public base class of `coroutine_handle` could leave it in an undesired state | inheritance removed |

### See also

generator (C++23) A `view` that represents synchronous coroutine generator (class template)
