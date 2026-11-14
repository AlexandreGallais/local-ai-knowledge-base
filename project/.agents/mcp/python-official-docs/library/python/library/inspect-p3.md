---
title: "inspect --- Inspect live objects (part 3 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/inspect.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# inspect --- Inspect live objects (part 3 of 8)

```text
+-----------------+-------------------+---------------------------+
| Type            | Attribute         | Description               |
+=================+===================+===========================+
| class           | __doc__           | documentation string      |
+-----------------+-------------------+---------------------------+
|                 | __name__          | name with which this      |
|                 |                   | class was defined         |
+-----------------+-------------------+---------------------------+
|                 | __qualname__      | qualified name            |
+-----------------+-------------------+---------------------------+
|                 | __module__        | name of module in which   |
|                 |                   | this class was defined    |
+-----------------+-------------------+---------------------------+
|                 | __type_params__   | A tuple containing the    |
|                 |                   | :ref:`type parameters     |
|                 |                   | <type-params>` of         |
|                 |                   | a generic class           |
+-----------------+-------------------+---------------------------+
| method          | __doc__           | documentation string      |
+-----------------+-------------------+---------------------------+
|                 | __name__          | name with which this      |
|                 |                   | method was defined        |
+-----------------+-------------------+---------------------------+
|                 | __qualname__      | qualified name            |
+-----------------+-------------------+---------------------------+
|                 | __func__          | function object           |
|                 |                   | containing implementation |
|                 |                   | of method                 |
+-----------------+-------------------+---------------------------+
|                 | __self__          | instance to which this    |
|                 |                   | method is bound, or       |
|                 |                   | ``None``                  |
+-----------------+-------------------+---------------------------+
|                 | __module__        | name of module in which   |
|                 |                   | this method was defined   |
+-----------------+-------------------+---------------------------+
| function        | __doc__           | documentation string      |
+-----------------+-------------------+---------------------------+
|                 | __name__          | name with which this      |
|                 |                   | function was defined      |
+-----------------+-------------------+---------------------------+
|                 | __qualname__      | qualified name            |
+-----------------+-------------------+---------------------------+
|                 | __code__          | code object containing    |
|                 |                   | compiled function         |
|                 |                   | :term:`bytecode`          |
+-----------------+-------------------+---------------------------+
|                 | __defaults__      | tuple of any default      |
|                 |                   | values for positional or  |
|                 |                   | keyword parameters        |
+-----------------+-------------------+---------------------------+
|                 | __kwdefaults__    | mapping of any default    |
|                 |                   | values for keyword-only   |
|                 |                   | parameters                |
+-----------------+-------------------+---------------------------+
|                 | __globals__       | global namespace in which |
|                 |                   | this function was defined |
+-----------------+-------------------+---------------------------+
|                 | __builtins__      | builtins namespace        |
+-----------------+-------------------+---------------------------+
|                 | __annotations__   | mapping of parameters     |
|                 |                   | names to annotations;     |
|                 |                   | ``"return"`` key is       |
|                 |                   | reserved for return       |
|                 |                   | annotations.              |
+-----------------+-------------------+---------------------------+
|                 | __type_params__   | A tuple containing the    |
|                 |                   | :ref:`type parameters     |
|                 |                   | <type-params>` of         |
|                 |                   | a generic function        |
+-----------------+-------------------+---------------------------+
|                 | __module__        | name of module in which   |
|                 |                   | this function was defined |
+-----------------+-------------------+---------------------------+
| traceback       | tb_frame          | frame object at this      |
|                 |                   | level                     |
+-----------------+-------------------+---------------------------+
|                 | tb_lasti          | index of last attempted   |
|                 |                   | instruction in bytecode   |
+-----------------+-------------------+---------------------------+
|                 | tb_lineno         | current line number in    |
|                 |                   | Python source code        |
+-----------------+-------------------+---------------------------+
|                 | tb_next           | next inner traceback      |
|                 |                   | object (called by this    |
|                 |                   | level)                    |
+-----------------+-------------------+---------------------------+
| frame           | f_back            | next outer frame object   |
|                 |                   | (this frame's caller)     |
+-----------------+-------------------+---------------------------+
|                 | f_builtins        | builtins namespace seen   |
|                 |                   | by this frame             |
+-----------------+-------------------+---------------------------+
|                 | f_code            | code object being         |
|                 |                   | executed in this frame    |
+-----------------+-------------------+---------------------------+
|                 | f_globals         | global namespace seen by  |
|                 |                   | this frame                |
+-----------------+-------------------+---------------------------+
|                 | f_lasti           | index of last attempted   |
|                 |                   | instruction in bytecode   |
+-----------------+-------------------+---------------------------+
|                 | f_lineno          | current line number in    |
|                 |                   | Python source code        |
+-----------------+-------------------+---------------------------+
|                 | f_locals          | local namespace seen by   |
|                 |                   | this frame                |
+-----------------+-------------------+---------------------------+
|                 | f_generator       | returns the generator or  |
|                 |                   | coroutine object that     |
|                 |                   | owns this frame, or       |
|                 |                   | ``None`` if the frame is  |
|                 |                   | of a regular function     |
+-----------------+-------------------+---------------------------+
|                 | f_trace           | tracing function for this |
|                 |                   | frame, or ``None``        |
+-----------------+-------------------+---------------------------+
|                 | f_trace_lines     | indicate whether a        |
|                 |                   | tracing event is          |
|                 |                   | triggered for each source |
|                 |                   | source line               |
+-----------------+-------------------+---------------------------+
|                 | f_trace_opcodes   | indicate whether          |
|                 |                   | per-opcode events are     |
|                 |                   | requested                 |
+-----------------+-------------------+---------------------------+
|                 | clear()           | used to clear all         |
|                 |                   | references to local       |
|                 |                   | variables                 |
+-----------------+-------------------+---------------------------+
| code            | co_argcount       | number of arguments (not  |
|                 |                   | including keyword only    |
|                 |                   | arguments, \* or \*\*     |
|                 |                   | args)                     |
+-----------------+-------------------+---------------------------+
|                 | co_code           | string of raw compiled    |
|                 |                   | bytecode                  |
+-----------------+-------------------+---------------------------+
|                 | co_cellvars       | tuple of names of cell    |
|                 |                   | variables (referenced by  |
|                 |                   | containing scopes)        |
+-----------------+-------------------+---------------------------+
|                 | co_consts         | tuple of constants used   |
|                 |                   | in the bytecode           |
+-----------------+-------------------+---------------------------+
|                 | co_filename       | name of file in which     |
|                 |                   | this code object was      |
|                 |                   | created                   |
+-----------------+-------------------+---------------------------+
|                 | co_firstlineno    | number of first line in   |
|                 |                   | Python source code        |
+-----------------+-------------------+---------------------------+
|                 | co_flags          | bitmap of ``CO_*`` flags, |
|                 |                   | read more :ref:`here      |
|                 |                   | <inspect-module-co-flags>`|
+-----------------+-------------------+---------------------------+
|                 | co_freevars       | tuple of names of free    |
|                 |                   | variables (referenced via |
|                 |                   | a function's closure)     |
+-----------------+-------------------+---------------------------+
|                 | co_posonlyargcount| number of positional only |
|                 |                   | arguments                 |
+-----------------+-------------------+---------------------------+
|                 | co_kwonlyargcount | number of keyword only    |
|                 |                   | arguments (not including  |
|                 |                   | \*\* arg)                 |
+-----------------+-------------------+---------------------------+
|                 | co_name           | name with which this code |
|                 |                   | object was defined        |
+-----------------+-------------------+---------------------------+
|                 | co_qualname       | fully qualified name with |
|                 |                   | which this code object    |
|                 |                   | was defined               |
+-----------------+-------------------+---------------------------+
|                 | co_names          | tuple of names other      |
|                 |                   | than arguments and        |
|                 |                   | function locals           |
+-----------------+-------------------+---------------------------+
|                 | co_nlocals        | number of local variables |
+-----------------+-------------------+---------------------------+
|                 | co_stacksize      | virtual machine stack     |
|                 |                   | space required            |
+-----------------+-------------------+---------------------------+
|                 | co_varnames       | tuple of names of         |
|                 |                   | arguments and local       |
|                 |                   | variables                 |
+-----------------+-------------------+---------------------------+
|                 | co_lines()        | returns an iterator that  |
|                 |                   | yields successive         |
|                 |                   | bytecode ranges           |
+-----------------+-------------------+---------------------------+
|                 | co_positions()    | returns an iterator of    |
|                 |                   | source code positions for |
|                 |                   | each bytecode instruction |
+-----------------+-------------------+---------------------------+
|                 | replace()         | returns a copy of the     |
|                 |                   | code object with new      |
|                 |                   | values                    |
+-----------------+-------------------+---------------------------+
| generator       | __name__          | name                      |
+-----------------+-------------------+---------------------------+
|                 | __qualname__      | qualified name            |
+-----------------+-------------------+---------------------------+
|                 | gi_frame          | frame                     |
+-----------------+-------------------+---------------------------+
|                 | gi_running        | is the generator running? |
+-----------------+-------------------+---------------------------+
|                 | gi_suspended      | is the generator          |
|                 |                   | suspended?                |
+-----------------+-------------------+---------------------------+
|                 | gi_code           | code                      |
+-----------------+-------------------+---------------------------+
|                 | gi_yieldfrom      | object being iterated by  |
|                 |                   | ``yield from``, or        |
|                 |                   | ``None``                  |
+-----------------+-------------------+---------------------------+
|                 | gi_state          | state of the generator,   |
|                 |                   | one of ``GEN_CREATED``,   |
|                 |                   | ``GEN_RUNNING``,          |
|                 |                   | ``GEN_SUSPENDED``, or     |
```
