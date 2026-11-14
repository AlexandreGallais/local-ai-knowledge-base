# Standard library header <cfenv> (C++11)

This header was originally in the C standard library as `<fenv.h>`.

This header is part of the floating-point environment library.

### Types

|  |  |
| --- | --- |
| fenv_t (C++11) | the type representing the entire floating-point environment (typedef) |
| fexcept_t (C++11) | the type representing all floating-point status flags collectively (typedef) |

### Functions

|  |  |
| --- | --- |
| feclearexcept (C++11) | clears the specified floating-point status flags (function) |
| fetestexcept (C++11) | determines which of the specified floating-point status flags are set (function) |
| feraiseexcept (C++11) | raises the specified floating-point exceptions (function) |
| fegetexceptflag, fesetexceptflag (C++11), (C++11) | copies the state of the specified floating-point status flags from or to the floating-point environment (function) |
| fegetround, fesetround (C++11), (C++11) | gets or sets rounding direction (function) |
| fegetenv, fesetenv (C++11) | saves or restores the current floating-point environment (function) |
| feholdexcept (C++11) | saves the environment, clears all status flags and ignores all future errors (function) |
| feupdateenv (C++11) | restores the floating-point environment and raises the previously raised exceptions (function) |

### Macros

|  |  |
| --- | --- |
| FE_ALL_EXCEPT, FE_DIVBYZERO, FE_INEXACT, FE_INVALID, FE_OVERFLOW, FE_UNDERFLOW (C++11) | floating-point exceptions (macro constant) |
| FE_DOWNWARD, FE_TONEAREST, FE_TOWARDZERO, FE_UPWARD (C++11) | floating-point rounding direction (macro constant) |
| FE_DFL_ENV (C++11) | default floating-point environment (macro constant) |

### Synopsis

```cpp
#define FE_ALL_EXCEPT /* see description */
#define FE_DIVBYZERO /* see description */    // optional
#define FE_INEXACT /* see description */      // optional
#define FE_INVALID /* see description */      // optional
#define FE_OVERFLOW /* see description */     // optional
#define FE_UNDERFLOW /* see description */    // optional

#define FE_DOWNWARD /* see description */     // optional
#define FE_TONEAREST /* see description */    // optional
#define FE_TOWARDZERO /* see description */   // optional
#define FE_UPWARD /* see description */       // optional

#define FE_DFL_ENV /* see description */

namespace std {
    // types
    using fenv_t    = /* object type */;
    using fexcept_t = /* object type */;

    // functions
    int feclearexcept(int except);
    int fegetexceptflag(fexcept_t* pflag, int except);
    int feraiseexcept(int except);
    int fesetexceptflag(const fexcept_t* pflag, int except);
    int fetestexcept(int except);
    int fegetround(void);
    int fesetround(int mode);
    int fegetenv(fenv_t* penv);
    int feholdexcept(fenv_t* penv);
    int fesetenv(const fenv_t* penv);
    int feupdateenv(const fenv_t* penv);
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3905 | C++11 | `std::fexcept_t` must be an integer type | it is an object type |
