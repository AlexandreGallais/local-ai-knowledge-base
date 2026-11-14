# File scope

If the declarator or type specifier that declares the identifier appears outside of any block or list of parameters, the identifier has file scope, which terminates at the end of the translation unit.

So, placement of an identifier's declaration (in a declarator or type specifier) outside any block or list of parameters means that the identifier has file scope. File scope of an identifier extends from the declaration to the end of the translation unit in which the declaration appears.

### Example

Identifiers a, b, f, and g have file scope.

```c
#include <stdio.h>

int a = 1;
static int b = 2;

void f (void) {printf("from function f()\n");}
static void g (void) {printf("from function g()\n");}

int main(void)
{
    f();
    g();

    return 0;
}
/* end of this translation unit, end of file scope */
```

Possible output:

```text
from function f()
from function g()
```
