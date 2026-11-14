# std::sync::mpmc::array

Bounded channel based on a preallocated array.

This flavor has a fixed, positive capacity.

The implementation is based on Dmitry Vyukov's bounded MPMC queue.

Source:
  - <http://www.1024cores.net/home/lock-free-algorithms/queues/bounded-mpmc-queue>
  - <https://docs.google.com/document/d/1yIAYmbvL3JxOKOjuCyon7JhW4cSv1wy5hC0ApeGMV9s/pub>