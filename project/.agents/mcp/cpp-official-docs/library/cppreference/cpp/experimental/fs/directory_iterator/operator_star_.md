# std::experimental::filesystem::directory_iterator::operator*,operator->

`const directory_entry& operator*() const; const directory_entry* operator->() const;` (filesystem TS)

Accesses the pointed-to `directory_entry`.

The result of `operator*` or `operator->` on the end iterator is undefined behavior.

### Parameters

(none)

### Return value

1) Value of the `directory_entry` referred to by this iterator.

2) Pointer to the `directory_entry` referred to by this iterator.

### Exceptions

May throw implementation-defined exceptions.

### See also

operator*, operator-> accesses the pointed-to entry (public member function of `std::experimental::filesystem::recursive_directory_iterator`)
