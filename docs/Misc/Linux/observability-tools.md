---
title: "Observability Tools"
date: "2021-10-19"
categories: 
  - "observability"
tags: 
  - "observability"
---

### System Overview
- `uptime`
    - System uptime with average load on system in duration of 1, 5 and 15 minutes.

![](/assets/images/obs_uptime.jpg)

- `dmesg --human`
  - print the message buffer of kernel from (/var/log/dmesg) file.
  - Prints time in human readable format dmesg --human`

### Block I/O
- `df`
  - List all block devices and their space usage
    ```bash
    Filesystem     1K-blocks     Used Available Use% Mounted on
    tmpfs             810584     1928    808656   1% /run
    /dev/sda3      102106072 26826352  70046876  28% /
    tmpfs            4052900      100   4052800   1% /dev/shm
    tmpfs               5120        0      5120   0% /run/lock
    /dev/sda2         524252     5364    518888   2% /boot/efi
    tmpfs             810580      104    810476   1% /run/user/1000
    ```

- `iostat`
  - Performance and Utilization of block I/O devices
    ```bash
    Linux 5.15.0-53-generic (ub22)  20/11/22        _x86_64_        (4 CPU)
    avg-cpu:  %user   %nice %system %iowait  %steal   %idle
            2.03    0.00    0.76    0.01    0.00   97.19

    Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
    loop0             0.00         0.00         0.00         0.00         17          0          0
    loop1             0.00         0.01         0.00         0.00        348          0          0
    loop10            0.00         0.01         0.00         0.00        348          0          0
    loop11            0.02         0.71         0.00         0.00      26883          0          0
    loop12            0.00         0.00         0.00         0.00        189          0          0
    ```
- `biotop`
    - part of eBPF suite called [BCC](https:// github.com/iovisor/bcc)
    - Provide details about the operation writing data to the disk

### Networking
- `SAR`
  - collect and report system metrics
  - part of BCC suite
  
  Show Network Statistics $ sar -n 1 1 # Show I/O Statistics $ sar -b 1 1 # Show Block Devices Statistics $ sar -d 1 1 # Show power management Statistics $ sar -m 1 1
  {: .msg-info }

- `TCPTOP`
  - show network usage per process along with load avg for duration of 1, 5, 15 minutes
  - show raw TCP statistics $ sudo tcptop-bpfcc 1 1

### Memory
- `free`
  - show memory usage in human readable format $ free -h

---

### References
- [USE Method](https://www.brendangregg.com/usemethod.html)
