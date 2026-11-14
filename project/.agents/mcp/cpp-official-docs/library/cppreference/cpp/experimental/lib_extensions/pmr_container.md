# Convenience aliases for containers using polymorphic allocators (library fundamentals TS)

The following convenience aliases and alias templates for containers using polymorphic allocators are defined in the `std::experimental::pmr` namespace.

### Strings

| Alias/alias template | Alias for |
| --- | --- |
| Defined in header `<experimental/string>` |  |
| `template<class CharT, class Traits=std::char_traits<CharT>> using basic_string =` | `std::basic_string<CharT, Traits, polymorphic_allocator<CharT>>;` |
| `using string =` | `pmr::basic_string<char>;` |
| `using wstring =` | `pmr::basic_string<wchar_t>;` |
| `using u16string =` | `pmr::basic_string<char16_t>;` |
| `using u32string =` | `pmr::basic_string<char32_t>;` |

### Sequence containers

| Alias template | Alias for |
| --- | --- |
| Defined in header `<experimental/vector>` |  |
| `template<class T> using vector =` | `std::vector<T, polymorphic_allocator<T>>;` |
| Defined in header `<experimental/deque>` |  |
| `template<class T> using deque =` | `std::deque<T, polymorphic_allocator<T>>;` |
| Defined in header `<experimental/forward_list>` |  |
| `template<class T> using forward_list =` | `std::forward_list<T, polymorphic_allocator<T>>;` |
| Defined in header `<experimental/list>` |  |
| `template<class T> using list =` | `std::list<T, polymorphic_allocator<T>>;` |

### Associative containers

| Alias template | Alias for |
| --- | --- |
| Defined in header `<experimental/map>` |  |
| `template<class Key, class T, class Compare=std::less<Key>> using map =` | `std::map<Key, T, Compare, polymorphic_allocator<std::pair<const Key, T>>>;` |
| `template<class Key, class T, class Compare=std::less<Key>> using multimap =` | `std::multimap<Key, T, Compare, polymorphic_allocator<std::pair<const Key, T>>>;` |
| Defined in header `<experimental/set>` |  |
| `template<class Key, class Compare=std::less<Key>> using set =` | `std::set<Key, Compare, polymorphic_allocator<Key>>;` |
| `template<class Key, class Compare=std::less<Key>> using multiset =` | `std::multiset<Key, Compare, polymorphic_allocator<Key>>;` |

### Unordered associative containers

| Alias template | Alias for |
| --- | --- |
| Defined in header `<experimental/unordered_map>` |  |
| `template<class Key, class T, class Hash = std::hash<Key>, class Pred = std::equal_to<Key>> using unordered_map =` | `std::unordered_map<Key, T, Hash, Pred, polymorphic_allocator<std::pair<const Key, T>>>;` |
| `template<class Key, class T, class Hash = std::hash<Key>, class Pred = std::equal_to<Key>> using unordered_multimap =` | `std::unordered_multimap<Key, T, Hash, Pred, polymorphic_allocator<std::pair<const Key, T>>>;` |
| Defined in header `<experimental/unordered_set>` |  |
| `template<class Key, class Hash = std::hash<Key>, class Pred = std::equal_to<Key>> using unordered_set =` | `std::unordered_set<Key, Hash, Pred, polymorphic_allocator<Key>>;` |
| `template<class Key, class Hash = std::hash<Key>, class Pred = std::equal_to<Key>> using unordered_multiset =` | `std::unordered_multiset<Key, Hash, Pred, polymorphic_allocator<Key>>;` |

### `match_results`

| Alias/alias template | Alias for |
| --- | --- |
| Defined in header `<experimental/regex>` |  |
| `template<class BidirIt> using match_results =` | `std::match_results<BidirIt, polymorphic_allocator<std::sub_match<BidirIt>>>;` |
| `using cmatch =` | `pmr::match_results<const char*>;` |
| `using wcmatch =` | `pmr::match_results<const wchar_t*>;` |
| `using smatch =` | `pmr::match_results<pmr::string::const_iterator>;` |
| `using wsmatch =` | `pmr::match_results<pmr::wstring::const_iterator>;` |
