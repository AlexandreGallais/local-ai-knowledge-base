---
title: "ch03-02-data-types (part 3 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch03-02-data-types.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch03-02-data-types (part 3 of 3)

### Compound Types

_Compound types_ can group multiple values into one type. Rust has two
primitive compound types: tuples and arrays.

#### The Tuple Type

A _tuple_ is a general way of grouping together a number of values with a
variety of types into one compound type. Tuples have a fixed length: Once
declared, they cannot grow or shrink in size.

We create a tuple by writing a comma-separated list of values inside
parentheses. Each position in the tuple has a type, and the types of the
different values in the tuple don’t have to be the same. We’ve added optional
type annotations in this example:

Filename: src/main.rs

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

The variable `tup` binds to the entire tuple because a tuple is considered a
single compound element. To get the individual values out of a tuple, we can
use pattern matching to destructure a tuple value, like this:

Filename: src/main.rs

```rust
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("The value of y is: {y}");
}
```

This program first creates a tuple and binds it to the variable `tup`. It then
uses a pattern with `let` to take `tup` and turn it into three separate
variables, `x`, `y`, and `z`. This is called _destructuring_ because it breaks
the single tuple into three parts. Finally, the program prints the value of
`y`, which is `6.4`.

We can also access a tuple element directly by using a period (`.`) followed by
the index of the value we want to access. For example:

Filename: src/main.rs

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;

    let six_point_four = x.1;

    let one = x.2;
}
```

This program creates the tuple `x` and then accesses each element of the tuple
using their respective indices. As with most programming languages, the first
index in a tuple is 0.

The tuple without any values has a special name, _unit_. This value and its
corresponding type are both written `()` and represent an empty value or an
empty return type. Expressions implicitly return the unit value if they don’t
return any other value.

#### The Array Type

Another way to have a collection of multiple values is with an _array_. Unlike
a tuple, every element of an array must have the same type. Unlike arrays in
some other languages, arrays in Rust have a fixed length.

We write the values in an array as a comma-separated list inside square
brackets:

Filename: src/main.rs

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
}
```

Arrays are useful when you want your data allocated on the stack, the same as
the other types we have seen so far, rather than the heap (we will discuss the
stack and the heap more in Chapter 4) or when
you want to ensure that you always have a fixed number of elements. An array
isn’t as flexible as the vector type, though. A vector is a similar collection
type provided by the standard library that _is_ allowed to grow or shrink in
size because its contents live on the heap. If you’re unsure whether to use an
array or a vector, chances are you should use a vector. Chapter
8 discusses vectors in more detail.

However, arrays are more useful when you know the number of elements will not
need to change. For example, if you were using the names of the month in a
program, you would probably use an array rather than a vector because you know
it will always contain 12 elements:

```rust
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
```

You write an array’s type using square brackets with the type of each element,
a semicolon, and then the number of elements in the array, like so:

```rust
let a: [i32; 5] = [1, 2, 3, 4, 5];
```

Here, `i32` is the type of each element. After the semicolon, the number `5`
indicates the array contains five elements.

You can also initialize an array to contain the same value for each element by
specifying the initial value, followed by a semicolon, and then the length of
the array in square brackets, as shown here:

```rust
let a = [3; 5];
```

The array named `a` will contain `5` elements that will all be set to the value
`3` initially. This is the same as writing `let a = [3, 3, 3, 3, 3];` but in a
more concise way.

#### Array Element Access

An array is a single chunk of memory of a known, fixed size that can be
allocated on the stack. You can access elements of an array using indexing,
like this:

Filename: src/main.rs

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```

In this example, the variable named `first` will get the value `1` because that
is the value at index `[0]` in the array. The variable named `second` will get
the value `2` from index `[1]` in the array.

#### Invalid Array Element Access

Let’s see what happens if you try to access an element of an array that is past
the end of the array. Say you run this code, similar to the guessing game in
Chapter 2, to get an array index from the user:

Filename: src/main.rs

```rust
use std::io;

fn main() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");

    let mut index = String::new();

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    let element = a[index];

    println!("The value of the element at index {index} is: {element}");
}
```

This code compiles successfully. If you run this code using `cargo run` and
enter `0`, `1`, `2`, `3`, or `4`, the program will print out the corresponding
value at that index in the array. If you instead enter a number past the end of
the array, such as `10`, you’ll see output like this:

```console
thread 'main' panicked at src/main.rs:19:19:
index out of bounds: the len is 5 but the index is 10
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

The program resulted in a runtime error at the point of using an invalid
value in the indexing operation. The program exited with an error message and
didn’t execute the final `println!` statement. When you attempt to access an
element using indexing, Rust will check that the index you’ve specified is less
than the array length. If the index is greater than or equal to the length,
Rust will panic. This check has to happen at runtime, especially in this case,
because the compiler can’t possibly know what value a user will enter when they
run the code later.

This is an example of Rust’s memory safety principles in action. In many
low-level languages, this kind of check is not done, and when you provide an
incorrect index, invalid memory can be accessed. Rust protects you against this
kind of error by immediately exiting instead of allowing the memory access and
continuing. Chapter 9 discusses more of Rust’s error handling and how you can
write readable, safe code that neither panics nor allows invalid memory access.
