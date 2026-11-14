# core::ops::control_flow

## ControlFlow::is_break

```rust
pub const fn is_break(&self) -> bool
```

Returns `true` if this is a `Break` variant.

# Examples

```
use std::ops::ControlFlow;

assert!(ControlFlow::<&str, i32>::Break("Stop right there!").is_break());
assert!(!ControlFlow::<&str, i32>::Continue(3).is_break());
```

## ControlFlow::is_continue

```rust
pub const fn is_continue(&self) -> bool
```

Returns `true` if this is a `Continue` variant.

# Examples

```
use std::ops::ControlFlow;

assert!(!ControlFlow::<&str, i32>::Break("Stop right there!").is_continue());
assert!(ControlFlow::<&str, i32>::Continue(3).is_continue());
```

## ControlFlow::break_value

```rust
pub const fn break_value(self) -> Option<B> where Self: [const] Destruct,
```

Converts the `ControlFlow` into an `Option` which is `Some` if the
`ControlFlow` was `Break` and `None` otherwise.

# Examples

```
use std::ops::ControlFlow;

assert_eq!(ControlFlow::<&str, i32>::Break("Stop right there!").break_value(), Some("Stop right there!"));
assert_eq!(ControlFlow::<&str, i32>::Continue(3).break_value(), None);
```

## ControlFlow::break_ok

```rust
pub const fn break_ok(self) -> Result<B, C>
```

Converts the `ControlFlow` into a `Result` which is `Ok` if the
`ControlFlow` was `Break` and `Err` if otherwise.

# Examples

```
use std::ops::ControlFlow;

struct TreeNode<T> {
    value: T,
    left: Option<Box<TreeNode<T>>>,
    right: Option<Box<TreeNode<T>>>,
}

impl<T> TreeNode<T> {
    fn find<'a>(&'a self, mut predicate: impl FnMut(&T) -> bool) -> Result<&'a T, ()> {
        let mut f = |t: &'a T| -> ControlFlow<&'a T> {
            if predicate(t) {
                ControlFlow::Break(t)
            } else {
                ControlFlow::Continue(())
            }
        };

        self.traverse_inorder(&mut f).break_ok()
    }

    fn traverse_inorder<'a, B>(
        &'a self,
        f: &mut impl FnMut(&'a T) -> ControlFlow<B>,
    ) -> ControlFlow<B> {
        if let Some(left) = &self.left {
            left.traverse_inorder(f)?;
        }
        f(&self.value)?;
        if let Some(right) = &self.right {
            right.traverse_inorder(f)?;
        }
        ControlFlow::Continue(())
    }

    fn leaf(value: T) -> Option<Box<TreeNode<T>>> {
        Some(Box::new(Self {
            value,
            left: None,
            right: None,
        }))
    }
}

let node = TreeNode {
    value: 0,
    left: TreeNode::leaf(1),
    right: Some(Box::new(TreeNode {
        value: -1,
        left: TreeNode::leaf(5),
        right: TreeNode::leaf(2),
    })),
};

let res = node.find(|val: &i32| *val > 3);
assert_eq!(res, Ok(&5));
```

## ControlFlow::map_break

```rust
pub const fn map_break<T, F>(self, f: F) -> ControlFlow<T, C> where F: [const] FnOnce(B) -> T + [const] Destruct,
```

Maps `ControlFlow<B, C>` to `ControlFlow<T, C>` by applying a function
to the break value in case it exists.

## ControlFlow::continue_value

```rust
pub const fn continue_value(self) -> Option<C> where Self: [const] Destruct,
```

Converts the `ControlFlow` into an `Option` which is `Some` if the
`ControlFlow` was `Continue` and `None` otherwise.

# Examples

```
use std::ops::ControlFlow;

assert_eq!(ControlFlow::<&str, i32>::Break("Stop right there!").continue_value(), None);
assert_eq!(ControlFlow::<&str, i32>::Continue(3).continue_value(), Some(3));
```

## ControlFlow::continue_ok

```rust
pub const fn continue_ok(self) -> Result<C, B>
```

Converts the `ControlFlow` into a `Result` which is `Ok` if the
`ControlFlow` was `Continue` and `Err` if otherwise.

# Examples

```
use std::ops::ControlFlow;

struct TreeNode<T> {
    value: T,
    left: Option<Box<TreeNode<T>>>,
    right: Option<Box<TreeNode<T>>>,
}

impl<T> TreeNode<T> {
    fn validate<B>(&self, f: &mut impl FnMut(&T) -> ControlFlow<B>) -> Result<(), B> {
        self.traverse_inorder(f).continue_ok()
    }

    fn traverse_inorder<B>(&self, f: &mut impl FnMut(&T) -> ControlFlow<B>) -> ControlFlow<B> {
        if let Some(left) = &self.left {
            left.traverse_inorder(f)?;
        }
        f(&self.value)?;
        if let Some(right) = &self.right {
            right.traverse_inorder(f)?;
        }
        ControlFlow::Continue(())
    }

    fn leaf(value: T) -> Option<Box<TreeNode<T>>> {
        Some(Box::new(Self {
            value,
            left: None,
            right: None,
        }))
    }
}

let node = TreeNode {
    value: 0,
    left: TreeNode::leaf(1),
    right: Some(Box::new(TreeNode {
        value: -1,
        left: TreeNode::leaf(5),
        right: TreeNode::leaf(2),
    })),
};

let res = node.validate(&mut |val| {
    if *val < 0 {
        return ControlFlow::Break("negative value detected");
    }

    if *val > 4 {
        return ControlFlow::Break("too big value detected");
    }

    ControlFlow::Continue(())
});
assert_eq!(res, Err("too big value detected"));
```

## ControlFlow::map_continue

```rust
pub const fn map_continue<T, F>(self, f: F) -> ControlFlow<B, T> where F: [const] FnOnce(C) -> T + [const] Destruct,
```

Maps `ControlFlow<B, C>` to `ControlFlow<B, T>` by applying a function
to the continue value in case it exists.