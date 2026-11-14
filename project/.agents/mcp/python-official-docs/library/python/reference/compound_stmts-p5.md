---
title: "Compound statements (part 5 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/compound_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Compound statements (part 5 of 7)

## Function definitions

A function definition defines a user-defined function object (see section
types):

```text
python-grammar
funcdef: [`decorators`] "def" `funcname` [`type_params`] "(" [`parameter_list`] ")"
       : ["->" `expression`] ":" `suite`
decorators: `decorator`+
decorator: "@" `assignment_expression` NEWLINE
parameter_list: `defparameter` ("," `defparameter`)* "," "/" ["," [`parameter_list_no_posonly`]]
              :   | `parameter_list_no_posonly`
parameter_list_no_posonly: `defparameter` ("," `defparameter`)* ["," [`parameter_list_starargs`]]
                         : | `parameter_list_starargs`
parameter_list_starargs: "*" `star_parameter` ("," `defparameter`)* ["," [`parameter_star_kwargs`]]
                       : | "*" ("," `defparameter`)+ ["," [`parameter_star_kwargs`]]
                       : | `parameter_star_kwargs`
parameter_star_kwargs: "**" `parameter` [","]
parameter: `identifier` [":" `expression`]
star_parameter: `identifier` [":" ["*"] `expression`]
defparameter: `parameter` ["=" `expression`]
funcname: `identifier`
```

A function definition is an executable statement.  Its execution binds the
function name in the current local namespace to a function object (a wrapper
around the executable code for the function).  This function object contains a
reference to the current global namespace as the global namespace to be used
when the function is called.

The function definition does not execute the function body; this gets executed
only when the function is called.

A function definition may be wrapped by one or more decorator expressions.
Decorator expressions are evaluated when the function is defined, in the scope
that contains the function definition.  The result must be a callable, which is
invoked with the function object as the only argument. The returned value is
bound to the function name instead of the function object.  Multiple decorators
are applied in nested fashion. For example, the following code:

```
@f1(arg)
@f2
def func(): pass
```

is roughly equivalent to:

```
def func(): pass
func = f1(arg)(f2(func))
```

except that the original function is not temporarily bound to the name `func`.

> *Changed in version 3.9.*
> Functions may be decorated with any valid
> `python-grammar:assignment_expression`. Previously, the grammar was
> much more restrictive; see PEP 614 for details.

A list of type parameters may be given in square brackets
between the function's name and the opening parenthesis for its parameter list.
This indicates to static type checkers that the function is generic. At runtime,
the type parameters can be retrieved from the function's
`__type_params__`
attribute. See generic-functions for more.

> *Changed in version 3.12.*
> Type parameter lists are new in Python 3.12.

When one or more parameters have the form *parameter* `=`
*expression*, the function is said to have "default parameter values."  For a
parameter with a default value, the corresponding argument may be
omitted from a call, in which
case the parameter's default value is substituted.  If a parameter has a default
value, all following parameters up until the "`*`" must also have a default
value --- this is a syntactic restriction that is not expressed by the grammar.

**Default parameter values are evaluated from left to right when the function
definition is executed.** This means that the expression is evaluated once, when
the function is defined, and that the same "pre-computed" value is used for each
call.  This is especially important to understand when a default parameter value is a
mutable object, such as a list or a dictionary: if the function modifies the
object (e.g. by appending an item to a list), the default parameter value is in effect
modified.  This is generally not what was intended.  A way around this is to use
`None` as the default, and explicitly test for it in the body of the function,
for example:

```
def whats_on_the_telly(penguin=None):
    if penguin is None:
        penguin = []
    penguin.append("property of the zoo")
    return penguin
```

Function call semantics are described in more detail in section calls. A
function call always assigns values to all parameters mentioned in the parameter
list, either from positional arguments, from keyword arguments, or from default
values.  If the form "`*identifier`" is present, it is initialized to a tuple
receiving any excess positional parameters, defaulting to the empty tuple.
If the form "`**identifier`" is present, it is initialized to a new
ordered mapping receiving any excess keyword arguments, defaulting to a
new empty mapping of the same type.  Parameters after "`*`" or
"`*identifier`" are keyword-only parameters and may only be passed
by keyword arguments.  Parameters before "`/`" are positional-only parameters
and may only be passed by positional arguments.

> *Changed in version 3.8.*
> The `/` function parameter syntax may be used to indicate positional-only
> parameters. See PEP 570 for details.

Parameters may have an annotation of the form "`: expression`"
following the parameter name.  Any parameter may have an annotation, even those of the form
`*identifier` or `**identifier`. (As a special case, parameters of the form
`*identifier` may have an annotation "`: *expression`".) Functions may have "return" annotation of
the form "`-> expression`" after the parameter list.  These annotations can be
any valid Python expression.  The presence of annotations does not change the
semantics of a function. See annotations for more information on annotations.

> *Changed in version 3.11.*
> Parameters of the form "`*identifier`" may have an annotation
> "`: *expression`". See PEP 646.

It is also possible to create anonymous functions (functions not bound to a
name), for immediate use in expressions.  This uses lambda expressions, described in
section lambda.  Note that the lambda expression is merely a shorthand for a
simplified function definition; a function defined in a "`def`"
statement can be passed around or assigned to another name just like a function
defined by a lambda expression.  The "`def`" form is actually more powerful
since it allows the execution of multiple statements and annotations.

**Programmer's note:** Functions are first-class objects.  A "`def`" statement
executed inside a function definition defines a local function that can be
returned or passed around.  Free variables used in the nested function can
access the local variables of the function containing the def.  See section
naming for details.

> **See also:** PEP 3107 - Function Annotations
> The original specification for function annotations.
>
> PEP 484 - Type Hints
> Definition of a standard meaning for annotations: type hints.
>
> PEP 526 - Syntax for Variable Annotations
> Ability to type hint variable declarations, including class
> variables and instance variables.
>
> PEP 563 - Postponed Evaluation of Annotations
> Support for forward references within annotations by preserving
> annotations in a string form at runtime instead of eager evaluation.
>
> PEP 318 - Decorators for Functions and Methods
> Function and method decorators were introduced.
> Class decorators were introduced in PEP 3129.
