---
title: "Argparse Tutorial (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/argparse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Argparse Tutorial (part 3 of 3)

## Custom type converters

The `argparse` module allows you to specify custom type converters for
your command-line arguments. This allows you to modify user input before it's
stored in the `argparse.Namespace`. This can be useful when you need to
pre-process the input before it is used in your program.

When using a custom type converter, you can use any callable that takes a
single string argument (the argument value) and returns the converted value.
However, if you need to handle more complex scenarios, you can use a custom
action class with the **action** parameter instead.

For example, let's say you want to handle arguments with different prefixes and
process them accordingly:

```
import argparse

parser = argparse.ArgumentParser(prefix_chars='-+')

parser.add_argument('-a', metavar='<value>', action='append',
                    type=lambda x: ('-', x))
parser.add_argument('+a', metavar='<value>', action='append',
                    type=lambda x: ('+', x))

args = parser.parse_args()
print(args)
```

Output:

```shell-session
$ python prog.py -a value1 +a value2
Namespace(a=[('-', 'value1'), ('+', 'value2')])
```

In this example, we:

- Created a parser with custom prefix characters using the `prefix_chars`
parameter.

- Defined two arguments, `-a` and `+a`, which used the `type` parameter to
create custom type converters to store the value in a tuple with the prefix.

Without the custom type converters, the arguments would have treated the `-a`
and `+a` as the same argument, which would have been undesirable. By using custom
type converters, we were able to differentiate between the two arguments.

## Conclusion

The `argparse` module offers a lot more than shown here.
Its docs are quite detailed and thorough, and full of examples.
Having gone through this tutorial, you should easily digest them
without feeling overwhelmed.
