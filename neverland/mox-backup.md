


# Backup Proxmox's config file.

## Create Mount Point and Mount
```

mkdir -p /mnt/usb
mount /dev/sdc /mnt/usb
```
## Backup VM Configs
```
mkdir -p /mnt/usb/backup/qemu-server
cp -r /etc/pve/qemu-server/* /mnt/usb/backup/qemu-server/
```
## Backup GRUB Config
```
mkdir -p /mnt/usb/backup/grub
cp /etc/default/grub /mnt/usb/backup/grub/default-grub
cp -r /boot/grub /mnt/usb/backup/grub/boot-grub-folder
```
## Backup Kernel and Initramfs
```
mkdir -p /mnt/usb/backup/boot
cp /boot/initrd.img-$(uname -r) /mnt/usb/backup/boot/
cp /boot/vmlinuz-$(uname -r) /mnt/usb/backup/boot/
tar czvf /mnt/usb/backup/boot/boot-full-backup.tar.gz /boot
```

## Backup VFIO and Module Configs
```
mkdir -p /mnt/usb/backup/modprobe
cp /etc/modprobe.d/* /mnt/usb/backup/modprobe/

mkdir -p /mnt/usb/backup/modules-load
cp /etc/modules-load.d/* /mnt/usb/backup/modules-load/

cp /etc/modules /mnt/usb/backup/modules
```

## Backup Proxmox Configuration Files
```
mkdir -p /mnt/usb/backup/pve
cp -r /etc/pve/* /mnt/usb/backup/pve/
```

## ZFS Config
```
zfs list > /mnt/usb/backup/zfs-dataset-list.txt
zfs get all > /mnt/usb/backup/zfs-dataset-properties.txt
```
## Unmount
```
umount /mnt/usb
```