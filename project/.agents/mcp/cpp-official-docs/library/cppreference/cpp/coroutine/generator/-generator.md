# std::generator<Ref,V,Allocator>::~generator

`~generator();` (since C++23)

Destructs the generator object.

Given `coroutine_` as the underlying coroutine object, equivalent to:

```cpp
if (coroutine_)
    coroutine_.destroy();
```

Note, that destroying the root generator effectively destroys the entire stack of yielded generators, because the ownership of recursively yielded generators is held in awaitable objects in the coroutine frame of the yielding generator.

### Complexity

This section is incomplete

### Example

This section is incomplete Reason: no example
