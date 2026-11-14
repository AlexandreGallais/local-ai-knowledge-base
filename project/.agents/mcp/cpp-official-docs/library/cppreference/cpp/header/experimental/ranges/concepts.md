# Experimental library header <experimental/ranges/concepts>

This header is part of the ranges library.

### Core language concepts

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| Same | specifies that a type is the same as another type (concept) |
| DerivedFrom | specifies that a type is derived from another type (concept) |
| ConvertibleTo | specifies that a type is implicitly convertible to another type (concept) |
| CommonReference | specifies that two types share a common reference type (concept) |
| Common | specifies that two types share a common type (concept) |
| Integral | specifies that a type is an integral type (concept) |
| SignedIntegral | specifies that a type is an integral type that is signed (concept) |
| UnsignedIntegral | specifies that a type is an integral type that is not signed (concept) |
| Assignable | specifies that a type is assignable from another type (concept) |
| Swappable, SwappableWith | specifies that a type can be swapped or that two types can be swapped with each other (concept) |

### Comparison concepts

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| Boolean | specifies that a type can be used in Boolean contexts (concept) |
| WeaklyEqualityComparableWith | specifies that two types can be compared for equality using operators `==` and `!=` (concept) |
| EqualityComparable, EqualityComparableWith | specifies that operator `==` is an equivalence relation (concept) |
| StrictTotallyOrdered, StrictTotallyOrderedWith | specifies that the comparison operators on the type yield a total order (concept) |

### Object concepts

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| Destructible | specifies that an object of the type can be destroyed (concept) |
| Constructible | specifies that a variable of the type can be constructed from or bound to a set of argument types (concept) |
| DefaultConstructible | specifies that an object of a type can be default constructed (concept) |
| MoveConstructible | specifies that an object of a type can be move constructed (concept) |
| CopyConstructible | specifies that an object of a type can be copy constructed and move constructed (concept) |
| Movable | specifies that an object of a type can be moved and swapped (concept) |
| Copyable | specifies that an object of a type can be copied, moved, and swapped (concept) |
| Semiregular | specifies that an object of a type can be copied, moved, swapped, and default constructed (concept) |
| Regular | specifies that a type is regular, that is, it is both `Semiregular` and `EqualityComparable` (concept) |

### Callable concepts

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| Invocable, RegularInvocable | specifies that a callable type can be invoked with a given set of argument types (concept) |
| Predicate | specifies that a callable type is a Boolean predicate (concept) |
| Relation | specifies that a callable type is a binary relation (concept) |
| StrictWeakOrder | specifies that a `Relation` imposes a strict weak ordering (concept) |

### Synopsis

```cpp
namespace std { namespace experimental { namespace ranges { inline namespace v1 {

template <class T, class U>
concept bool Same = /* see definition */;

template <class T, class U>
concept bool DerivedFrom = /* see definition */;

template <class T, class U>
concept bool ConvertibleTo = /* see definition */;

template <class T, class U>
concept bool CommonReference = /* see definition */;

template <class T, class U>
concept bool Common = /* see definition */;

template <class T>
concept bool Integral = /* see definition */;

template <class T>
concept bool SignedIntegral = /* see definition */;

template <class T>
concept bool UnsignedIntegral = /* see definition */;

template <class T, class U>
concept bool Assignable = /* see definition */;

template <class T>
concept bool Swappable = /* see definition */;

template <class T, class U>
concept bool SwappableWith = /* see definition */;

template <class T>
concept bool Destructible = /* see definition */;

template <class T, class... Args>
concept bool Constructible = /* see definition */;

template <class T>
concept bool DefaultConstructible = /* see definition */;

template <class T>
concept bool MoveConstructible = /* see definition */;

template <class T>
concept bool CopyConstructible = /* see definition */;

template <class B>
concept bool Boolean = /* see definition */;

template <class T, class U>
concept bool WeaklyEqualityComparableWith = /* see definition */;

template <class T>
concept bool EqualityComparable = /* see definition */;

template <class T, class U>
concept bool EqualityComparableWith = /* see definition */;

template <class T>
concept bool StrictTotallyOrdered = /* see definition */;

template <class T, class U>
concept bool StrictTotallyOrderedWith = /* see definition */;

template <class T>
concept bool Movable = /* see definition */;

template <class T>
concept bool Copyable = /* see definition */;

template <class T>
concept bool Semiregular = /* see definition */;

template <class T>
concept bool Regular = /* see definition */;

template <class F, class... Args>
concept bool Invocable = /* see definition */;

template <class F, class... Args>
concept bool RegularInvocable = /* see definition */;

template <class F, class... Args>
concept bool Predicate = /* see definition */;

template <class R, class T, class U>
concept bool Relation = /* see definition */;

template <class R, class T, class U>
concept bool StrictWeakOrder = /* see definition */;

}}}}
```
