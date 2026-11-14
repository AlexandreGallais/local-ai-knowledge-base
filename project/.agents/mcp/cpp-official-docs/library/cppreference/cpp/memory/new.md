# Low level memory management

The new-expression is the only way to create an object or an array of objects with dynamic storage duration, that is, with lifetime not restricted to the scope in which it is created. A new-expression obtains storage by calling an allocation function. A delete-expression destroys a most derived object or an array created by a new-expression and calls the deallocation function. The default allocation and deallocation functions, along with related functions, types, and objects, are declared in the header `<new>`.

| Defined in header `<new>` |  |
| --- | --- |
| Functions |  |
| operator new, operator new[] | allocation functions (function) |
| operator delete, operator delete[] | deallocation functions (function) |
| get_new_handler (C++11) | obtains the current new handler (function) |
| set_new_handler | registers a new handler (function) |
| Classes |  |
| bad_alloc | exception thrown when memory allocation fails (class) |
| bad_array_new_length (C++11) | exception thrown on allocation of array with invalid length (class) |
| align_val_t (C++17) | type used to pass alignment to alignment-aware allocation and deallocation functions (enum) |
| Types |  |
| new_handler | function pointer type of the new handler (typedef) |
| Objects |  |
| nothrow, nothrow_t | a tag used to select a non-throwing *allocation function* (tag) |
| destroying_delete, destroying_delete_t (C++20) | a tag used to select destroying-delete overloads of `operator delete` (tag) |
| Object access |  |
| launder (C++17) | pointer optimization barrier (function template) |
