---
title: "MethodHandles class (java.lang.invoke) (part 11 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 11 of 14)

## MethodHandles.loop(MethodHandle[]...)

```java
public static MethodHandle loop(MethodHandle[]... clauses)
```

Constructs a method handle representing a loop with several loop variables that are updated and checked upon each
iteration. Upon termination of the loop due to one of the predicates, a corresponding finalizer is run and
delivers the loop's result, which is the return value of the resulting handle.

Intuitively, every loop is formed by one or more "clauses", each specifying a local *iteration variable* and/or a loop
exit. Each iteration of the loop executes each clause in order. A clause can optionally update its iteration
variable; it can also optionally perform a test and conditional loop exit. In order to express this logic in
terms of method handles, each clause will specify up to four independent actions:

- *init:* Before the loop executes, the initialization of an iteration variable `v` of type `V`.

- *step:* When a clause executes, an update step for the iteration variable `v`.

- *pred:* When a clause executes, a predicate execution to test for loop exit.

- *fini:* If a clause causes a loop exit, a finalizer execution to compute the loop's return value.

The full sequence of all iteration variable types, in clause order, will be notated as `(V...)`.
The values themselves will be `(v...)`.  When we speak of "parameter lists", we will usually
be referring to types, but in some contexts (describing execution) the lists will be of actual values.

Some of these clause parts may be omitted according to certain rules, and useful default behavior is provided in
this case. See below for a detailed description.

*Parameters optional everywhere:*
Each clause function is allowed but not required to accept a parameter for each iteration variable `v`.
As an exception, the init functions cannot take any `v` parameters,
because those values are not yet computed when the init functions are executed.
Any clause function may neglect to take any trailing subsequence of parameters it is entitled to take.
In fact, any clause function may take no arguments at all.

*Loop parameters:*
A clause function may take all the iteration variable values it is entitled to, in which case
it may also take more trailing parameters. Such extra values are called *loop parameters*,
with their types and values notated as `(A...)` and `(a...)`.
These become the parameters of the resulting loop handle, to be supplied whenever the loop is executed.
(Since init functions do not accept iteration variables `v`, any parameter to an
init function is automatically a loop parameter `a`.)
As with iteration variables, clause functions are allowed but not required to accept loop parameters.
These loop parameters act as loop-invariant values visible across the whole loop.

*Parameters visible everywhere:*
Each non-init clause function is permitted to observe the entire loop state, because it can be passed the full
list `(v... a...)` of current iteration variable values and incoming loop parameters.
The init functions can observe initial pre-loop state, in the form `(a...)`.
Most clause functions will not need all of this information, but they will be formally connected to it
as if by `dropArguments`.

More specifically, we shall use the notation `(V*)` to express an arbitrary prefix of a full
sequence `(V...)` (and likewise for `(v*)`, `(A*)`, `(a*)`).
In that notation, the general form of an init function parameter list
is `(A*)`, and the general form of a non-init function parameter list is `(V*)` or `(V... A*)`.

*Checking clause structure:*
Given a set of clauses, there is a number of checks and adjustments performed to connect all the parts of the
loop. They are spelled out in detail in the steps below. In these steps, every occurrence of the word "must"
corresponds to a place where `IllegalArgumentException` will be thrown if the required constraint is not
met by the inputs to the loop combinator.

*Effectively identical sequences:*

A parameter list `A` is defined to be *effectively identical* to another parameter list `B`
if `A` and `B` are identical, or if `A` is shorter and is identical with a proper prefix of `B`.
When speaking of an unordered set of parameter lists, we say they the set is "effectively identical"
as a whole if the set contains a longest list, and all members of the set are effectively identical to
that longest list.
For example, any set of type sequences of the form `(V*)` is effectively identical,
and the same is true if more sequences of the form `(V... A*)` are added.

*Step 0: Determine clause structure.*

- The clause array (of type `MethodHandle[][]`) must be non-`null` and contain at least one element.

- The clause array may not contain `null`s or sub-arrays longer than four elements.

- Clauses shorter than four elements are treated as if they were padded by `null` elements to length
four. Padding takes place by appending elements to the array.

- Clauses with all `null`s are disregarded.

- Each clause is treated as a four-tuple of functions, called "init", "step", "pred", and "fini".

*Step 1A: Determine iteration variable types `(V...)`.*

- The iteration variable type for each clause is determined using the clause's init and step return types.

- If both functions are omitted, there is no iteration variable for the corresponding clause (`void` is
used as the type to indicate that). If one of them is omitted, the other's return type defines the clause's
iteration variable type. If both are given, the common return type (they must be identical) defines the clause's
iteration variable type.

- Form the list of return types (in clause order), omitting all occurrences of `void`.

- This list of types is called the "iteration variable types" (`(V...)`).

*Step 1B: Determine loop parameters `(A...)`.*

- Examine and collect init function parameter lists (which are of the form `(A*)`).

- Examine and collect the suffixes of the step, pred, and fini parameter lists, after removing the iteration variable types.
(They must have the form `(V... A*)`; collect the `(A*)` parts only.)

- Do not collect suffixes from step, pred, and fini parameter lists that do not begin with all the iteration variable types.
(These types will be checked in step 2, along with all the clause function types.)

- Omitted clause functions are ignored.  (Equivalently, they are deemed to have empty parameter lists.)

- All of the collected parameter lists must be effectively identical.

- The longest parameter list (which is necessarily unique) is called the "external parameter list" (`(A...)`).

- If there is no such parameter list, the external parameter list is taken to be the empty sequence.

- The combined list consisting of iteration variable types followed by the external parameter types is called
the "internal parameter list".

*Step 1C: Determine loop return type.*

- Examine fini function return types, disregarding omitted fini functions.

- If there are no fini functions, the loop return type is `void`.

- Otherwise, the common return type `R` of the fini functions (their return types must be identical) defines the loop return
type.

*Step 1D: Check other types.*

- There must be at least one non-omitted pred function.

- Every non-omitted pred function must have a `boolean` return type.

*Step 2: Determine parameter lists.*

- The parameter list for the resulting loop handle will be the external parameter list `(A...)`.

- The parameter list for init functions will be adjusted to the external parameter list.
(Note that their parameter lists are already effectively identical to this list.)

- The parameter list for every non-omitted, non-init (step, pred, and fini) function must be
effectively identical to the internal parameter list `(V... A...)`.

*Step 3: Fill in omitted functions.*

- If an init function is omitted, use a default value for the clause's iteration variable
type.

- If a step function is omitted, use an identity function of the clause's iteration
variable type; insert dropped argument parameters before the identity function parameter for the non-`void`
iteration variables of preceding clauses. (This will turn the loop variable into a local loop invariant.)

- If a pred function is omitted, use a constant `true` function. (This will keep the loop going, as far
as this clause is concerned.  Note that in such cases the corresponding fini function is unreachable.)

- If a fini function is omitted, use a default value for the
loop return type.

*Step 4: Fill in missing parameter types.*

- At this point, every init function parameter list is effectively identical to the external parameter list `(A...)`,
but some lists may be shorter. For every init function with a short parameter list, pad out the end of the list.

- At this point, every non-init function parameter list is effectively identical to the internal parameter
list `(V... A...)`, but some lists may be shorter. For every non-init function with a short parameter list,
pad out the end of the list.

- Argument lists are padded out by int, List, int) dropping unused trailing arguments.

*Final observations.*

- After these steps, all clauses have been adjusted by supplying omitted functions and arguments.

- All init functions have a common parameter type list `(A...)`, which the final loop handle will also have.

- All fini functions have a common return type `R`, which the final loop handle will also have.

- All non-init functions have a common parameter type list `(V... A...)`, of
(non-`void`) iteration variables `V` followed by loop parameters.

- Each pair of init and step functions agrees in their return type `V`.

- Each non-init function will be able to observe the current values `(v...)` of all iteration variables.

- Every function will be able to observe the incoming values `(a...)` of all loop parameters.

*Example.* As a consequence of step 1A above, the `loop` combinator has the following property:

- Given `N` clauses `Cn = {null, Sn, Pn}` with `n = 1..N`.

- Suppose predicate handles `Pn` are either `null` or have no parameters.
(Only one `Pn` has to be non-`null`.)

- Suppose step handles `Sn` have signatures `(B1..BX)Rn`, for some constant `X>=N`.

- Suppose `Q` is the count of non-void types `Rn`, and `(V1...VQ)` is the sequence of those types.

- It must be that `Vn == Bn` for `n = 1..min(X,Q)`.

- The parameter types `Vn` will be interpreted as loop-local state elements `(V...)`.

- Any remaining types `BQ+1..BX` (if `Q<X`) will determine
the resulting loop handle's parameter types `(A...)`.

In this example, the loop handle parameters `(A...)` were derived from the step functions,
which is natural if most of the loop computation happens in the steps.  For some loops,
the burden of computation might be heaviest in the pred functions, and so the pred functions
might need to accept the loop parameter values.  For loops with complex exit logic, the fini
functions might need to accept loop parameters, and likewise for loops with complex entry logic,
where the init functions will need the extra parameters.  For such reasons, the rules for
determining these parameters are as symmetric as possible, across all clause parts.
In general, the loop parameters function as common invariant values across the whole
loop, while the iteration variables function as common variant values, or (if there is
no step function) as internal loop invariant temporaries.

*Loop execution.*

- When the loop is called, the loop input values are saved in locals, to be passed to
every clause function. These locals are loop invariant.

- Each init function is executed in clause order (passing the external arguments `(a...)`)
and the non-`void` values are saved (as the iteration variables `(v...)`) into locals.
These locals will be loop varying (unless their steps behave as identity functions, as noted above).

- All function executions (except init functions) will be passed the internal parameter list, consisting of
the non-`void` iteration values `(v...)` (in clause order) and then the loop inputs `(a...)`
(in argument order).

- The step and pred functions are then executed, in clause order (step before pred), until a pred function
returns `false`.

- The non-`void` result from a step function call is used to update the corresponding value in the
sequence `(v...)` of loop variables.
The updated value is immediately visible to all subsequent function calls.

- If a pred function returns `false`, the corresponding fini function is called, and the resulting value
(of type `R`) is returned from the loop as a whole.

- If all the pred functions always return true, no fini function is ever invoked, and the loop cannot exit
except by throwing an exception.

*Usage tips.*

- Although each step function will receive the current values of *all* the loop variables,
sometimes a step function only needs to observe the current value of its own variable.
In that case, the step function may need to explicitly drop all preceding loop variables.
This will require mentioning their types, in an expression like `dropArguments(step, 0, V0.class, ...)`.

- Loop variables are not required to vary; they can be loop invariant.  A clause can create
a loop invariant by a suitable init function with no step, pred, or fini function.  This may be
useful to "wire" an incoming loop argument into the step or pred function of an adjacent loop variable.

- If some of the clause functions are virtual methods on an instance, the instance
itself can be conveniently placed in an initial invariant loop "variable", using an initial clause
like `new MethodHandle[]{identity(ObjType.class)}`.  In that case, the instance reference
will be the first iteration variable value, and it will be easy to use virtual
methods as clause parts, since all of them will take a leading instance reference matching that value.

Here is pseudocode for the resulting loop handle. As above, `V` and `v` represent the types
and values of loop variables; `A` and `a` represent arguments passed to the whole loop;
and `R` is the common result type of all finalizers as well as of the resulting loop.

Note that the parameter type lists `(V...)` and `(A...)` have been expanded
to their full length, even though individual clause functions may neglect to take them all.
As noted above, missing parameters are filled in as if by int, List, int).

Parameters:

- `clauses`: an array of arrays (4-tuples) of `MethodHandle`s adhering to the rules described above.

**API note:** Example:

The same example, dropping arguments and using combinators:

A similar example, using a helper object to hold a loop parameter:

**Returns:** a method handle embodying the looping behavior as defined by the arguments.

**See also:** MethodHandles#whileLoop(MethodHandle, MethodHandle, MethodHandle)

**See also:** MethodHandles#doWhileLoop(MethodHandle, MethodHandle, MethodHandle)

**See also:** MethodHandles#countedLoop(MethodHandle, MethodHandle, MethodHandle)
