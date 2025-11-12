

#  Installing TrueNAS on Proxmox


### 1) Download ISO

- TrueNAS-SCALE-25.04.1
- SHA256: `0719DFE4B1C7BD36AE1D6084F674CFB1AD87B749B407B4BF4801511CA401ED4A`

### 2) Install on Proxmox w/GUI

1. Goto node: `proxmox -> Select VM (right clicked)`

Proxmox Config:
```
General
	Node: proxmox
	VM ID: 111
	Name: truenas

OS
	Storage: local
	ISO Image: TrueNAS-SCALE-25.04.1.iso
	Type: Linux
	Version: 6.x - 2.6 Kernel

System
	Graphic card: Default
	Machine: q35
	BIOS: OVMF (UEFI)
	Add EFI Desk: [x]
	EFI Storage: local-lvm
	PRE-Enroll keys: [ ]
	SCSI Controller: VirtIO SCSI single
	Qemu Agent: [x]
	Add TPM: [ ]

Disk
	Bus/Device: VIRTIO Block 0
	Storage: local-lvm
	Disk Size: 16819
	Discard: [x]
	IO thread: [x]

CPU
	Socket: 1
	Cores: 4
	Type: x86x64-v2-AES

Memory
	Memory (MiB): 8192
	Ballooning Device: [ ]

Netowrk
	Bridge: vmbr0
	VLAN tag: no
	Firewall: [x]
	Model: VirtIO (paravirtualized)
	MAC address: auto
```

### 3) Add NFT disk:  

proxmox -> 111 (truenas) -> Hardware -> Add -> Hard Disk

```
Bus/Device: VirtIO Block 1
Storage: vault-111
Disk Size (GiB): 884
Discard: [x]
IO thread [x]
```

### 4) Start TrueNAS

1. Install TrueNAS

### 5) Initial Network & GUI Setup

1. On first boot, TrueNAS will display an IP (via DHCP) on the console.
    
2. In your browser, navigate to `http://<TrueNAS-IP>:80`.
    
3. Create user with same UUID as users on machines accessing NFS share.
    

### 6. Create a ZFS Pool

1. **Storage → Pools → Add**
    
2. Select your raw disks (`sdb`, `sdc`, …), choose mirrored or RAIDZ layout.
    
3. Name it e.g. `vault-111`.
    

### 7. Create a Dataset for Media

 Storage -> Create Pool
   
1. Named it `vault-111`, and allowed non-unique serialed disks
    
2. Layout: Striped, Disk Size: 844 GiB (HDD
3. Set permissions to username

### 8. Enable & Configure NFS Share

1. **Sharing → Unix (NFS) Shares → Add**
    
2. Path: `/mnt/tank/media`
    
3. Authorized networks: `10.0.0.0/24(rw)`
    
4. All other defaults (you can toggle `Maproot User/Group` for squash).
    
5. **Save & Enable** the NFS service under **System Settings → Services**.
    

### 9. (Optional) Enable SMB Share

1. **Sharing → Windows (SMB) Shares → Add**
    
2. Path: `/mnt/tank/media`
    
3. Name: `Media`
    
4. Enable and start the SMB service (under Services).
    

### 10. Mount the Share on Other VMs

On both your **media-server VM** and your **upload VM**:

```
# Create mount point
mkdir -p /mnt/nas-media

# Mount NFS 
mount -t nfs 192.168.0.111:/mnt/vault-111 /mnt/vault-111

# (Or for SMB, if needed:)
# mount -t cifs //10.0.0.2/Media /mnt/nas-media -o username=your_share_user,password=your_password

```

– Replace `10.0.0.2` with your TrueNAS VM’s IP.  
– Add an `/etc/fstab` entry if you want it to persist across reboots:

```
10.0.0.2:/mnt/tank/media   /mnt/nas-media   nfs   defaults,_netdev   0  0
```



Note: installed 

```
sudo apt update
sudo apt install -y nfs-common
```
