# C attribute: fallthrough (since C23)

Indicates that the fall through from the previous case label is intentional and should not be diagnosed by a compiler that warns on fallthrough.

### Syntax

`[[` `fallthrough` `]]` `[[` `__fallthrough__` `]]`

### Explanation

May only be used in an attribute declaration to create a *fallthrough declaration* (`[[fallthrough]];`).

A fallthrough declaration may only be used in a `switch` statement, where the next block item (statement, declaration, or label) to be encounted is a statement with a `case` or `default` label for that switch statement.

Indicates that the fall through from the previous case label is intentional and should not be diagnosed by a compiler that warns on fallthrough.

### Example

```c
#include <stdbool.h>

void g(void) {}
void h(void) {}
void i(void) {}

void f(int n) {
  switch (n) {
    case 1:
    case 2:
      g();
     [[fallthrough]];
    case 3: // no warning on fallthrough
      h();
    case 4: // compiler may warn on fallthrough
      if(n < 3) {
          i();
          [[fallthrough]]; // OK
      }
      else {
          return;
      }
    case 5:
      while (false) {
        [[fallthrough]]; // ill-formed: no subsequent case or default label
      }
    case 6:
      [[fallthrough]]; // ill-formed: no subsequent case or default label
  }
}

int main(void) {}
```

### See also

C++ documentation for fallthrough
