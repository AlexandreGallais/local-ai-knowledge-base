# std::sys::thread_local::native

Thread local support for platforms with native TLS.

To achieve the best performance, we choose from four different types for
the TLS variable, depending on the method of initialization used (`const`
or lazy) and the drop requirements of the stored type:

|         | `Drop`               | `!Drop`             |
|--------:|:--------------------:|:-------------------:|
| `const` | `EagerStorage<T>`    | `T`                 |
| lazy    | `LazyStorage<T, ()>` | `LazyStorage<T, !>` |

For `const` initialization and `!Drop` types, we simply use `T` directly,
but for other situations, we implement a state machine to handle
initialization of the variable and its destructor and destruction.
Upon accessing the TLS variable, the current state is compared:

1. If the state is `Initial`, initialize the storage, transition the state
   to `Alive` and (if applicable) register the destructor, and return a
   reference to the value.
2. If the state is `Alive`, initialization was previously completed, so
   return a reference to the value.
3. If the state is `Destroyed`, the destructor has been run already, so
   return [`None`].

The TLS destructor sets the state to `Destroyed` and drops the current value.

To simplify the code, we make `LazyStorage` generic over the destroyed state
and use the `!` type (never type) as type parameter for `!Drop` types. This
eliminates the `Destroyed` state for these values, which can allow more niche
optimizations to occur for the `State` enum. For `Drop` types, `()` is used.