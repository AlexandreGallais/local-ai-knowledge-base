# C++ named requirements: Container

A Container is an object used to store other objects and taking care of the management of the memory used by the objects it contains.

### Requirements

Given the following types and values:

| Type | Definition |
| --- | --- |
| `T` | an object type |
| `C` | a container class containing objects of type `T` |
| Value | Definition |
| `u`, `v` | values of type `C` or `const C` |
| `mv` | a value of type `C` |
| `cv` | a value of type `const C` |
| `lhs`, `rhs` | lvalues of type `C` |
| `i`, `j` | values of type `C::iterator` or `const C::iterator` |

`C` satisfies the requirements of Container if the following types, statements, and expressions are well-formed and have the specified semantics:

#### Types

| Type | Definition | Requirements |
| --- | --- | --- |
| `typename C::value_type` | `T` | `T` is CopyConstructible(until C++11)Erasable from `C`(since C++11). |
| `typename C::reference` | `T&` | No explicit requirement |
| `typename C::const_reference` | `const T&` |  |
| `typename C::iterator` | an iterator type | `C::iterator` is a LegacyForwardIterator, and its value type is `T`. `C::iterator` is convertible to `C::const_iterator`. |
| `typename C::const_iterator` | a constant iterator type | `C::const_iterator` is a LegacyForwardIterator, and its value type is `T`. |
| `typename C::difference_type` | a signed integer type | `C::difference_type` is the same as the difference type of `C::iterator` and `C::const_iterator`. |
| `typename C::size_type` | an unsigned integer type | `C::size_type` is large enough to represent all non-negative values of `C::difference_type`. |

#### Statements

| Statement | Semantics |  | Complexity |
| --- | --- | --- | --- |
| `C c;` `C c = C();` | Postcondition | `c.empty()` is `true`. | constant |
| `C c(v);` `C c = C(v);` | Precondition | If `v` is not an rvalue of type `C`, `T` is CopyInsertable into `C`. (since C++11) | linear[1] |
| Postcondition | If `v` is an lvalue, `c == v` is `true`. If `v` is an rvalue, and `c` and `v` do not refer to the same object(since C++11), `c` is equal to the value that `v` had before this construction. |  |  |
| Notes |  |  |  |
| ↑ If `v` is an rvalue of type `C`, and `C` is not a specialization of `std::array` or `std::inplace_vector`, the complexity is constant. |  |  |  |

#### Expressions

| Expression | Type | Semantics |  | Complexity |
| --- | --- | --- | --- | --- |
| `C()` | `C` | Postcondition | `C().empty()` is `true`. | constant |
| `C(v)` | `C` | Precondition | If `v` is not an rvalue of type `C`, `T` is CopyInsertable into `C`. (since C++11) | constant[1] |
| Postcondition | If `v` is an lvalue, `C(v) == v` is `true`. If `v` is an rvalue, and `C(v)` and `v` do not refer to the same object(since C++11), `C(v)` is equal to the value that `v` had before this construction. |  |  |  |
| `lhs = v` | `C&` | Postcondition | If `v` is an lvalue, `lhs == v` is `true`. If `v` is an rvalue, and `lv` and `v` do not refer to the same object(since C++11), `lhs` is equal to the value that `v` had before this assignment. | linear |
| `v.~C()` | `void` | Effect | Destroys all elements of `v` and deallocates all memory obtained. | linear |
| `mv.begin()` | `C::iterator` | Effect | Returns an iterator pointing to the first element of `mv`. | constant |
| `cv.begin()` | `C::const_iterator` | Effect | Returns an iterator pointing to the first element of `cv`. | constant |
| `mv.end()` | `C::iterator` | Effect | Returns the past-the-end iterator of `mv`. | constant |
| `cv.end()` | `C::const_iterator` | Effect | Returns the past-the-end iterator of `cv`. | constant |
| `v.cbegin()` (since C++11) | `C::const_iterator` | Effect | Returns `const_cast<const C&>(v).begin()`. | constant |
| `v.cend()` (since C++11) | `C::const_iterator` | Effect | Returns `const_cast<const C&>(v).end()`. | constant |
| `i <=> j` (since C++20) | `std::strong_ordering` | Constraint | This expression is only required to be well-formed if `C::iterator` satisfies the random access iterator requirements. | constant |
| `u == v` | `bool` | Effect | Returns `u.size() == v.size() && std::equal(u.begin(), u.end(), v.begin())` (until C++14) `std::equal(u.begin(), u.end(), v.begin(), v.end())` (since C++14) . | linear[2] |
| `u != v` |  | Effect | Equivalent to `!(u == v)`. |  |
| `lhs.swap(rhs)` `swap(lhs, rhs)` | `void` | Effect | Exchanges the contents of `lhs` and `rhs`. | constant[3] |
| `v.size()` | `C::size_type` | Effect | Returns the number of elements[4] of `v`. | constant |
| `v.max_size()` | `C::size_type` | Effect | Returns the number of elements of the largest possible container of type `C`. | constant |
| `v.empty()` | `bool` | Effect | Returns `v.begin() == v.end()`. | constant |
| Optional container requirements (only provided for some types of containers) |  |  |  |  |
| `u <=> v` (since C++20) | `synth-three-way-result` `<C::value_type>` | Precondition | Either `T` models `three_way_comparable`, or `operator<` is a total ordering relationship defined for values of type `T` and `const T`. | linear |
| Effect | Returns `std::lexicographical_compare_three_way (u.begin(), u.end(), v.begin(), v.end(), synth-three-way )`[5]. |  |  |  |
| Notes |  |  |  |  |
| ↑ If `v` is an rvalue of type `C`, and `C` is a specialization of `std::array` or `std::inplace_vector`, the complexity is linear. ↑ If `u.size() != v.size()` is `true`, the complexity is constant. ↑ If `C` is a specialization of `std::array` or `std::inplace_vector`, the complexity is linear. ↑ The number of elements is defined by the rules of constructors, inserts, and erases. It is equal to the value of `std::distance(v.begin(), v.end())`. ↑ If the iterators passed to `std::lexicographical_compare_three_way` are ConstexprIterators, the operation is implemented by `constexpr` functions. |  |  |  |  |

In the expressions `i == j`, `i != j`, `i < j`, `i <= j`, `i >= j`, `i > j` and `i - j`, if `i` and/or `j` are replaced by iterators of type `C::const_iterator` pointing to the same element respectively, the semantics remain the same.

### Container data races

See container thread safety.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 179 | C++98 | `iterator` and `const_iterator` types might be incomparable | required to be comparable |
| LWG 276 | C++98 | `T` was required to be CopyAssignable | `T` is required to be CopyConstructible |
| LWG 322 | C++98 | the value types of `iterator` and `const_iterator` were not specified | specified as `T` |
| LWG 774 | C++98 | there was no requirement on `swap(a, b)` | added |
| LWG 883 | C++98 | `a.swap(b)` was defined as `swap(a, b)`, resulted in circular definition | defined as exchanging the values of `a` and `b` |
| LWG 1319 | C++98 | `iterator` and `const_iterator` might not have multipass guarantee | they are required to satisfy the requirements of LegacyForwardIterator |
| LWG 2114 (P2167R3) | C++98 | non-`bool` return types of some functions were allowed | disallowed |
| LWG 2182 | C++98 | the types deonted by `reference` and `const_reference` were poorly specified | improved wording |
| LWG 2257 | C++98 | two containers required linear time to compare equal even if they have different sizes | only requires constant time in this case |
| LWG 2263 | C++11 | the resolution of LWG issue 179 was accidentally dropped in C++11 | restored |
| LWG 2839 | C++11 | self move assignment of standard containers was not allowed | allowed but the result is unspecified |
| N3346 | C++11 | `C::value_type` was required to be Destructible | required to be Erasable from `C` |

### See also

C++ documentation for Containers library
