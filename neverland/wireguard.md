

# Static IP

/etc/wireguard

51

### 1. Identify your network interface

Run:

```bash
ip a
```

Look for something like `eth0`, `enp0s3`, or `ens33`.

### 2. Edit the interfaces file

Open the config file:

```bash
sudo nano /etc/network/interfaces
```

Then configure it like this (replace with your actual values):

```bash
auto enp0s3
iface enp0s3 inet static
    address 192.168.0.200
    netmask 255.255.255.0
    gateway 192.168.0.1
    dns-nameservers 192.168.0.53 192.168.0.153
```

### 3. Restart networking

```bash
sudo systemctl restart networking
```

---

If you're using **NetworkManager** (common on desktops or newer installs), you can use:

```bash
nmcli con mod "Wired connection 1" ipv4.addresses 192.168.1.100/24
nmcli con mod "Wired connection 1" ipv4.gateway 192.168.1.1
nmcli con mod "Wired connection 1" ipv4.dns "1.1.1.1 8.8.8.8"
nmcli con mod "Wired connection 1" ipv4.method manual
nmcli con up "Wired connection 1"
```

Want to go even more minimal and use `systemd-networkd` or explore `netplan` (used in Ubuntu)? Or maybe script this for VM provisioning? I can help tailor it to your setup. Just say the word.

---
## Configure Router

Advanced -> NAT Forwarding -> Port Forwarding

![[vaultimore/neverland/-attachments/Pasted image 20250712233651.png]]


---
# Install Wireguard

```
sudo pacman -Syu wireguard-tools
```

---
# Creating Key Pair 
(both server/client)

```
umask 077
wg genkey | tee myprivatekey | wg pubkey > mypublickey
```

## Append key to config

```
sudo tee -a /etc/wireguard/blockbuster.conf < server.key
```

# Create Configuration Files

### Tunnel to Home Network
Note: dependency needed: `apt install iptables -y`
```
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <server's private key>

PostUp = iptables -A FORWARD -i fairy -j ACCEPT
PostUp = iptables -A FORWARD -o fairy -j ACCEPT
PostUp = iptables -t nat -A POSTROUTING -o enp6s18 -j MASQUERADE

PostDown = iptables -D FORWARD -i fairy -j ACCEPT; iptables -D FORWARD -o fairy -j ACCEPT; iptables -t nat -D POSTROUTING -o enp6s18 -j MASQUERADE

[Peer]
PublicKey = <client's publickey>
AllowedIPs = 10.0.0.2/32

[Peer]
PublicKey = <client's publickey>
AllowedIPs = 10.0.0.3/32
```

### Client Config for Jellyfin and DNS
note: untested
```
[Interface]
PrivateKey = <client private key>
Address = 10.0.0.2/32
DNS = 192.168.0.153

[Peer]
PublicKey = <server public key>
Endpoint = <public ip>
AllowedIPs = 10.0.0.0/24, 192.168.0.0/24
PersistentKeepalive = 25
```

---
## Blockbuster (Mobile)
### Server Config for Jellyfin and DNS server
```
[Interface]
Address = 10.10.10.1/24
ListenPort = 51821
PrivateKey = <server private key>


PostUp = iptables -A FORWARD -i mobile -d 192.168.0.53 -j ACCEPT
PostUp = iptables -A FORWARD -i mobile -d 192.168.0.123 -j ACCEPT
PostUp = iptables -A FORWARD -o mobile -s 192.168.0.53 -j ACCEPT
PostUp = iptables -A FORWARD -o mobile -s 192.168.0.123 -j ACCEPT
PostUp = iptables -t nat -A POSTROUTING -o enp6s18 -j MASQUERADE


PostDown = iptables -D FORWARD -i mobile -d 192.168.0.53 -j ACCEPT
PostDown = iptables -D FORWARD -i mobile -d 192.168.0.123 -j ACCEPT
PostDown = iptables -D FORWARD -o mobile -s 192.168.0.53 -j ACCEPT
PostDown = iptables -D FORWARD -o mobile -s 192.168.0.123 -j ACCEPT
PostDown = iptables -t nat -D POSTROUTING -o enp6s18 -j MASQUERADE

[Peer]
PublicKey = <client public key>
AllowedIPs = 10.10.10.2/32
```

### Client Config for Jellyfin and DNS

```
[Interface]
PrivateKey = <client private key>
Address = 10.10.10.2/32
DNS = 192.168.0.153

[Peer]
PublicKey = <server public key>
Endpoint = <public ip>:<public port>
AllowedIPs = 192.168.0.123/32, 10.10.10.0/24
PersistentKeepalive = 25
```

---


# Generating WireGuard QR codes on Linux for mobile deployments

Now create the QR code, type:  
```
sudo qrencode -t png -o name.png -r client.conf
```