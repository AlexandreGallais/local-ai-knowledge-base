# operator==,!=,<,<=,>,>=(std::experimental::propagate_const)

|  |  |  |
| --- | --- | --- |
| `template< class T > constexpr bool operator==( const propagate_const<T>& pt, nullptr_t );` | (1) | (library fundamentals TS v2) |
| `template< class T > constexpr bool operator==( nullptr_t, const propagate_const<T>& pt );` | (2) | (library fundamentals TS v2) |
| `template< class T > constexpr bool operator!=( const propagate_const<T>& pt, nullptr_t );` | (3) | (library fundamentals TS v2) |
| `template< class T > constexpr bool operator!=( nullptr_t, const propagate_const<T>& pt );` | (4) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator==( const propagate_const<T>& pt, const propagate_const<U>& pu );` | (5) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator!=( const propagate_const<T>& pt, const propagate_const<U>& pu );` | (6) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator<( const propagate_const<T>& pt, const propagate_const<U>& pu );` | (7) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator>( const propagate_const<T>& pt, const propagate_const<U>& pu );` | (8) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator<=( const propagate_const<T>& pt, const propagate_const<U>& pu );` | (9) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator>=( const propagate_const<T>& pt, const propagate_const<U>& pu );` | (10) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator==( const propagate_const<T>& pt, const U& u );` | (11) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator!=( const propagate_const<T>& pt, const U& u );` | (12) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator==( const T& t, const propagate_const<U>& pu );` | (13) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator!=( const T& t, const propagate_const<U>& pu );` | (14) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator<( const propagate_const<T>& pt, const U& u );` | (15) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator>( const propagate_const<T>& pt, const U& u );` | (16) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator<=( const propagate_const<T>& pt, const U& u );` | (17) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator>=( const propagate_const<T>& pt, const U& u );` | (18) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator<( const T& t, const propagate_const<U>& pu );` | (19) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator>( const T& t, const propagate_const<U>& pu );` | (20) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator<=( const T& t, const propagate_const<U>& pu );` | (21) | (library fundamentals TS v2) |
| `template< class T, class U > constexpr bool operator>=( const T& t, const propagate_const<U>& pu );` | (22) | (library fundamentals TS v2) |

Compares the wrapped pointers of two `propagate_const`s, or between a `propagate_const` and `nullptr`, or between a `propagate_const` and another object.

1-4) Equality comparison for a `propagate_const` and `nullptr`.

5,6) Equality comparison for two `propagate_const`s.

7-10) Ordered comparison for two `propagate_const`s.

11-14) Equality comparison for a `propagate_const` and another object.

15-22) Ordered comparison for a `propagate_const` and another object.

### Parameters

|  |  |  |
| --- | --- | --- |
| pt, pu | - | `propagate_const`s to compare |
| t, u | - | other objects to compare |

### Return value

Let `t_` denote the underlying pointer-like object wrapped by a `propagate_const`.

1) `pt.t_ == nullptr`

2) `nullptr == pt.t_`

3) `pt.t_ != nullptr`

4) `nullptr != pt.t_`

5) `pt.t_ == pu.t_`

6) `pt.t_ != pu.t_`

7) `pt.t_ < pu.t_`

8) `pt.t_ > pu.t_`

9) `pt.t_ <= pu.t_`

10) `pt.t_ >= pu.t_`

11) `pt.t_ == u`

12) `pt.t_ != u`

13) `t == pu.t_`

14) `t != pu.t_`

15) `pt.t_ < u`

16) `pt.t_ > u`

17) `pt.t_ <= u`

18) `pt.t_ >= u`

19) `t < pu.t_`

20) `t > pu.t_`

21) `t <= pu.t_`

22) `t >= pu.t_`
