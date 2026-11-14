# std::sys::pal::itron::abi

ABI for μITRON derivatives

## type ID

```rust
pub type ID = int_t
```

Kernel object ID

## const TSK_SELF

```rust
pub const TSK_SELF: ID = 0
```

The current task.

## type RELTIM

```rust
pub type RELTIM = u32
```

Relative time

## type TMO

```rust
pub type TMO = u32
```

Timeout (a valid `RELTIM` value or `TMO_FEVR`)

## const TMO_FEVR

```rust
pub const TMO_FEVR: TMO = TMO::MAX
```

The infinite timeout value

## const TMAX_RELTIM

```rust
pub const TMAX_RELTIM: RELTIM = 4_000_000_000
```

The maximum valid value of `RELTIM`

## type SYSTIM

```rust
pub type SYSTIM = u64
```

System time

## type ER

```rust
pub type ER = int_t
```

Error code type

## type ER_ID

```rust
pub type ER_ID = int_t
```

Error code type, `ID` on success

## type MODE

```rust
pub type MODE = uint_t
```

Service call operational mode

## const TWF_ORW

```rust
pub const TWF_ORW: MODE = 0x01
```

OR waiting condition for an eventflag

## type ATR

```rust
pub type ATR = uint_t
```

Object attributes

## const TA_FIFO

```rust
pub const TA_FIFO: ATR = 0
```

FIFO wait order

## const TA_WSGL

```rust
pub const TA_WSGL: ATR = 0
```

Only one task is allowed to be in the waiting state for the eventflag

## const TA_CLR

```rust
pub const TA_CLR: ATR = 0x04
```

The eventflag’s bit pattern is cleared when a task is released from the
waiting state for that eventflag.

## type FLGPTN

```rust
pub type FLGPTN = uint_t
```

Bit pattern of an eventflag

## type PRI

```rust
pub type PRI = int_t
```

Task or interrupt priority

## const TPRI_SELF

```rust
pub const TPRI_SELF: PRI = 0
```

The special value of `PRI` representing the current task's priority.

## const TA_INHERIT

```rust
pub const TA_INHERIT: ATR = 0x02
```

Use the priority inheritance protocol

## const TA_ACT

```rust
pub const TA_ACT: ATR = 0x01
```

Activate the task on creation

## const TMAX_MAXSEM

```rust
pub const TMAX_MAXSEM: uint_t = uint_t::MAX
```

The maximum count of a semaphore

## type EXINF

```rust
pub type EXINF = isize
```

Callback parameter

## type TASK

```rust
pub type TASK = Option<unsafe extern "C" fn(EXINF)>
```

Task entrypoint