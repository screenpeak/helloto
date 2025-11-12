
# List PCI Devices

- Includes the id to find PCI-slot (`01:00.0`) in next step
```
lspci
```

Output:
```
root@proxmox:~# lspci
00:00.0 Host bridge: Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor Host Bridge/DRAM Registers (rev 07)
00:01.0 PCI bridge: Intel Corporation 6th-10th Gen Core Processor PCIe Controller (x16) (rev 07)
00:14.0 USB controller: Intel Corporation 100 Series/C230 Series Chipset Family USB 3.0 xHCI Controller (rev 31)
00:16.0 Communication controller: Intel Corporation 100 Series/C230 Series Chipset Family MEI Controller #1 (rev 31)
00:17.0 SATA controller: Intel Corporation Q170/Q150/B150/H170/H110/Z170/CM236 Chipset SATA Controller [AHCI Mode] (rev 31)
00:1b.0 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #17 (rev f1)
00:1c.0 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #1 (rev f1)
00:1c.2 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #3 (rev f1)
00:1d.0 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #9 (rev f1)
00:1f.0 ISA bridge: Intel Corporation Z170 Chipset LPC/eSPI Controller (rev 31)
00:1f.2 Memory controller: Intel Corporation 100 Series/C230 Series Chipset Family Power Management Controller (rev 31)
00:1f.3 Audio device: Intel Corporation 100 Series/C230 Series Chipset Family HD Audio Controller (rev 31)
00:1f.4 SMBus: Intel Corporation 100 Series/C230 Series Chipset Family SMBus (rev 31)
00:1f.6 Ethernet controller: Intel Corporation Ethernet Connection (2) I219-V (rev 31)
01:00.0 VGA compatible controller: NVIDIA Corporation GP106 [GeForce GTX 1060 6GB] (rev a1)
01:00.1 Audio device: NVIDIA Corporation GP106 High Definition Audio Controller (rev a1)
03:00.0 USB controller: ASMedia Technology Inc. ASM1142 USB 3.1 Host Controller
04:00.0 PCI bridge: ASMedia Technology Inc. ASM1083/1085 PCIe to PCI Bridge (rev 04)
```

**Found at**: 01:00.0 VGA compatible controller: NVIDIA Corporation GP106 [GeForce GTX 1060 6GB] (rev a1)"

# Display Device Info


Input (derived from PCI-slot above: 
```
lspci -n -s 01:00.0 -v
```

Output:
```
root@proxmox:~# lspci -n -s 01:00.0 -v
01:00.0 0300: 10de:1c03 (rev a1) (prog-if 00 [VGA controller])
        Subsystem: 196e:11dd
        Flags: fast devsel, IRQ 11, IOMMU group 12
        Memory at de000000 (32-bit, non-prefetchable) [disabled] [size=16M]
        Memory at c0000000 (64-bit, prefetchable) [disabled] [size=256M]
        Memory at d0000000 (64-bit, prefetchable) [disabled] [size=32M]
        I/O ports at e000 [disabled] [size=128]
        Expansion ROM at df000000 [disabled] [size=512K]
        Capabilities: [60] Power Management version 3
        Capabilities: [68] MSI: Enable- Count=1/1 Maskable- 64bit+
        Capabilities: [78] Express Legacy Endpoint, MSI 00
        Capabilities: [100] Virtual Channel
        Capabilities: [250] Latency Tolerance Reporting
        Capabilities: [128] Power Budgeting <?>
        Capabilities: [420] Advanced Error Reporting
        Capabilities: [600] Vendor Specific Information: ID=0001 Rev=1 Len=024 <?>
        Capabilities: [900] Secondary PCI Express
        Kernel modules: nvidiafb, nouveau
```

Finds:
 -  PCI Hex-id: `10de:1c03`.
- Kernels to modprobe: `nvidiafb`, `nouveau`.


Prevent Proxmox from assigning VGA to VMs
```
echo "options vfio-pci ids=10de:1c03 disable_vga=1" > /etc/modprobe.d/vfio.conf
```

Prevent Nvidia kernels on VMs from accessing GPU 

```
echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nvidia" >> /etc/modprobe.d/blacklist.conf
```

Update changes:
```
update-initramfs -u -k all
```

Reboot


# Troubleshooting: 

Excellent — your changes are correctly applied so far. You're nearly done. Let's finish it off cleanly and make sure your GPU binds to `vfio-pci` on next boot.

---


##  Check GRUB for IOMMU

You **must** ensure `intel_iommu=on` is set. Let’s confirm it.

### Run:

```bash
grep GRUB_CMDLINE_LINUX_DEFAULT /etc/default/grub
```

It should output:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on"
```

If not, edit it:

```bash
nano /etc/default/grub
```

Change this line:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
```

To:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on"
```

Then apply changes:

```bash
update-grub
```

---

## Load vfio modules at boot

This ensures `vfio` loads early:

```bash
echo -e "vfio\nvfio_pci\nvfio_virqfd\nvfio_iommu_type1" >> /etc/modules
```

---

##  Final Step: Reboot

Now reboot:

```bash
reboot
```

---

##  Post-Reboot Check

After reboot, confirm `vfio-pci` binding:

```bash
lspci -nnk -d 10de:1c03
```

You want:

```
Kernel driver in use: vfio-pci
```

Do the same for:

```bash
lspci -nnk -d 10de:10f1
```

---

## Attach the GPU to Your Ubuntu VM

Once confirmed, we’ll finalize passthrough in `/etc/pve/qemu-server/<vmid>.conf`. If you'd like, post the output of:

```bash
cat /etc/pve/qemu-server/100.conf
```

(replace `100` with your VM ID)

That way I can help you confirm proper configuration for **UEFI**, **Q35**, and **PCI passthrough**.
