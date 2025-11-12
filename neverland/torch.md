
# Updating fix

```
pacman -Sy
pacman-key --init
pacman-key --populate archlinux
pacman -Sy archlinux-keyring
pacman -S archinstall
```


https://wiki.archlinux.org/title/Pacman/Package_signing
# GUI

```
sudo pacman -S xfce4 xfce4-goodies lightdm lightdm-gtk-greeter
sudo systemctl enable lightdm.service
reboot
```

# NetworkManager

__View connection status:__
```
nmcli device status
```

List active connections:
```
nmcli con show
```

__Set the static IP config__
```
nmcli con mod "Wired connection 1" \
  ipv4.addresses 192.168.0.110/24 \
  ipv4.gateway 192.168.0.1 \
  ipv4.dns "192.168.0.53 192.168.0.153" \
  ipv4.method manual
```

Apply the changes:
```
nmcli con down "Wired connection 1" && nmcli con up "Wired connection 1"
```
# Mount NFS

```
sudo pacman -S nfs-utils
```

```
mount -t nfs 192.168.0.111:/mnt/vault-111 /home/bertastic/vault-111
```

# Install YAY

You should do this as a **non-root user**
```
cd ~
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

# Install Brave Browser

```
pacman -Sy brave-bin
```


# Install Proton VPN

[Install](https://wiki.archlinux.org/title/Install "Install") the [wireguard-tools](https://archlinux.org/packages/?name=wireguard-tools) package. Ensure [systemd-resolvconf](https://archlinux.org/packages/?name=systemd-resolvconf) is also installed. Then follow the [WireGuard setup](https://wiki.archlinux.org/title/ProtonVPN#WireGuard_setup).

```
sudo pacman -Sy wireguard-tools systemd-resolvconf
```

Download WireGuard configuration files by signing into [ProtonVPN](https://account.protonvpn.com) and go to Downloads → WireGuard configuration.

Move the `.conf` files into `/etc/wireguard`. Consider renaming the `.conf` files if necessary as WireGuard might not work well with names that are too long.

If you have not already, [start/enable](https://wiki.archlinux.org/title/Start/enable "Start/enable") `systemd-resolved`.

```
wg-quick up /etc/wireguard/mermaid-lagoon.conf
```