- 192.168.0.123

# Resources
- 6144 mb -> 4096 balloon min
- 4 core
- gpu passthrough
- 32gb ssd

# Pre-requisites

- Ubuntu with GPU passthrough in Proxmox


--- 
# Install NVIDIA drivers

To install **NVIDIA drivers for your GeForce GTX 1060** on **Ubuntu Server**, and verify **hardware acceleration** (NVENC/NVDEC), follow this **step-by-step guide**. This works with or without Proxmox GPU passthrough, as long as the GPU is visible inside the VM (`lspci` shows it).
##  Step 1: Prepare the System

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install build-essential dkms linux-headers-$(uname -r) -y
```

> `dkms` and `headers` are needed for building the NVIDIA kernel module.

##  Step 2: Add NVIDIA Driver Repository (Optional but recommended)

```bash
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update
```

---

##  Step 3: Detect Recommended Driver Version

```bash
ubuntu-drivers devices
```

Example output (recommended driver found):

```
driver   : nvidia-driver-535 - distro non-free recommended
```

---

##  Step 4: Install the Recommended Driver

Use the driver shown as "recommended":

```bash
sudo apt install nvidia-driver-535 -y
```

Replace `535` with whatever version `ubuntu-drivers` suggested.

---

##  Step 5: Reboot

```bash
sudo reboot
```

> Enrolled MOK at reboot
---

##  Step 6: Test NVIDIA Driver Installation

After reboot, run:

```bash
nvidia-smi
```

You should see a table with your **GTX 1060**, driver version, and no errors.

Example:

```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 535.113.01    Driver Version: 535.113.01    CUDA Version: 12.2   |
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
|  0   GeForce GTX 1060 6GB     Off      | 00000000:01:00.0 Off |        N/A     |
+-----------------------------------------------------------------------------+
```

---

# Install Jellyfin

```
curl https://repo.jellyfin.org/install-debuntu.sh | sudo bash
```










##  Verify NVENC/NVDEC Support (Optional for Jellyfin)

You can test NVENC (hardware encoding) with:

```bash
/opt/jellyfin-ffmpeg/ffmpeg -hide_banner -encoders | grep nvenc
```

## Optional: Confirm Transcoding Works in Jellyfin

1. Go to **Jellyfin Web UI** → Admin Dashboard
    
2. Navigate to: **Playback > Transcoding**
    
3. Enable:
    
    -  Hardware Acceleration
        
    -  NVIDIA NVENC & NVDEC
        
4. Check logs during playback:

```
tail -f /var/log/jellyfin/jellyfin.log
```

You should see lines like:
```
Using hardware accelerated decoding with nvdec
Using hardware accelerated encoding with h264_nvenc
```


---

##  Troubleshooting

If `nvidia-smi` gives "No devices found":

- Run `lspci | grep -i nvidia` — make sure card is detected
    
- Confirm VM has access to GPU (passthrough)
    
- Check for missing kernel headers or `secure boot` enabled (disable if needed)
    
- Reinstall driver using `--no-dkms` or `--dkms` based on kernel behavior
    

---