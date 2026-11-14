# std::set<Key,Compare,Allocator>::equal_range

|  |  |  |
| --- | --- | --- |
| `std::pair<iterator, iterator> equal_range( const Key& key );` | (1) |  |
| `std::pair<const_iterator, const_iterator> equal_range( const Key& key ) const;` | (2) |  |
| `template< class K > std::pair<iterator, iterator> equal_range( const K& x );` | (3) | (since C++14) |
| `template< class K > std::pair<const_iterator, const_iterator> equal_range( const K& x ) const;` | (4) | (since C++14) |

Returns a range containing all elements with the given key in the container. The range is defined by two iterators, one pointing to the first element that is *not less* than `key` and another pointing to the first element *greater* than `key`. Alternatively, the first iterator may be obtained with `lower_bound()`, and the second with `upper_bound()`.

1,2) Compares the keys to `key`.

3,4) Compares the keys to the value `x`. This overload participates in overload resolution only if the qualified-id `Compare::is_transparent` is valid and denotes a type. It allows calling this function without constructing an instance of `Key`.

### Parameters

|  |  |  |
| --- | --- | --- |
| key | - | key value to compare the elements to |
| x | - | alternative value that can be compared to `Key` |

### Return value

`std::pair` containing a pair of iterators defining the wanted range: the first pointing to the first element that is not *less* than `key` and the second pointing to the first element *greater* than `key`.

If there are no elements *not less* than `key`, past-the-end (see `end()`) iterator is returned as the first element. Similarly if there are no elements *greater* than `key`, past-the-end iterator is returned as the second element.

### Complexity

Logarithmic in the size of the container.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_generic_associative_lookup` | `201304L` | (C++14) | Heterogeneous comparison lookup in associative containers, for overloads (3,4) |

### Example

```cpp
#include <set>
#include <functional>
#include <print>
#include <ranges>
#include <string>
#include <string_view>
#include <tuple>

struct Names
{
    std::string forename, surname;
    friend auto operator<(const Names& lhs, const Names& rhs)
    {
        return std::tie(lhs.surname, lhs.forename) < std::tie(rhs.surname, rhs.forename);
    }
};

struct SurnameCompare
{
    std::string_view surname;

    friend bool operator<(const Names& lhs, const SurnameCompare& rhs)
    {
        return lhs.surname < rhs.surname;
    }

    friend bool operator<(const SurnameCompare& lhs, const Names& rhs)
    {
        return lhs.surname < rhs.surname;
    }
};

std::set<Names, std::less<>> characters
{
    {"Homer", "Simpson"},
    {"Marge", "Simpson"},
    {"Lisa", "Simpson"},
    {"Ned", "Flanders"},
    {"Joe", "Quimby"}
};

void print_unique(const Names& names)
{
    auto [begin, end] = characters.equal_range(names);
    std::print(
        "Found {} characters with name \"{} {}\"\n",
        std::distance(begin, end),
        names.forename, names.surname
    );
}

void print_by_surname(std::string_view surname)
{
    auto [begin, end] = characters.equal_range(SurnameCompare{surname});
    std::print("Found {} characters with surname \"{}\":\n", std::distance(begin, end), surname);
    for (const Names& names : std::ranges::subrange(begin, end))
        std::print("    {} {}\n", names.forename, names.surname);
}

int main()
{
    print_unique({"Maude", "Flanders"});
    print_unique({"Lisa", "Simpson"});
    print_by_surname("Simpson");
}
```

Output:

```text
Found 0 characters with name "Maude Flanders"
Found 1 characters with name "Lisa Simpson"
Found 3 characters with surname "Simpson":
    Homer Simpson
    Lisa Simpson
    Marge Simpson
```

### See also

|  |  |
| --- | --- |
| find | finds element with specific key (public member function) |
| contains (C++20) | checks if the container contains element with specific key (public member function) |
| count | returns the number of elements matching specific key (public member function) |
| upper_bound | returns an iterator to the first element *greater* than the given key (public member function) |
| lower_bound | returns an iterator to the first element *not less* than the given key (public member function) |
| equal_range | returns range of elements matching a specific key (function template) |
