# C++ keyword: `and`

### Usage

- alternative operators: as an alternative for `&&`

### Example

```cpp
int main()
{
    static_assert((false and false) == false);
    static_assert((false and true)  == false);
    static_assert((true  and false) == false);
    static_assert((true  and true)  == true);
}
```

### See also

- `and_eq`
- `bitand`, `bitor`
- `not`, `not_eq`
- `or`, `or_eq`
- `xor`, `xor_eq`
