10/27/2025
NOTE: Need to fix what information is shown in bash script

Here's a summary of everything we did to add WireGuard to your Waybar:

## 1. Created the WireGuard status script
```bash
sudo nano /usr/local/bin/wg-status.sh
```

Added this configuration to file:
```
#!/bin/bash

# List of WireGuard interfaces to check
INTERFACES=("neverland" "proton")

CONNECTED_INTERFACE=""

for IFACE in "${INTERFACES[@]}"; do
    if ip link show "$IFACE" &> /dev/null; then
        if [[ $(ip link show "$IFACE" | grep "UP") ]]; then
            CONNECTED_INTERFACE="$IFACE"
            break
        fi
    fi
done

if [[ -n "$CONNECTED_INTERFACE" ]]; then
    echo "{\"text\": \"\", \"tooltip\": \"Connected: $CONNECTED_INTERFACE\", \"class\": \"connected\"}"
elif ip link show "${INTERFACES[@]}" &> /dev/null; then
    echo '{"text": "", "tooltip": "Down", "class": "disconnected"}'
else
    echo '{"text": "", "tooltip": "WireGuard Inactive", "class": "inactive"}'
fi
```

Made it executable:
```bash
sudo chmod +x /usr/local/bin/wg-status.sh
```

## 2. Updated Waybar config (`~/.config/waybar/config.jsonc`)

Added `"custom/wireguard"` to `modules-right`:
```jsonc
"modules-right": [
  "group/tray-expander",
  "custom/wireguard",
  "bluetooth",
  "network",
  "pulseaudio",
  "cpu",
  "battery"
],
```

Added the module definition (with comma after `"tray"` section):
```jsonc
"tray": {
  "icon-size": 12,
  "spacing": 17
},
"custom/wireguard": {
  "exec": "/usr/local/bin/wg-status.sh",
  "interval": 5,
  "on-click": "nmcli connection up proton || nmcli connection down proton",
  "tooltip-format": "WireGuard VPN"
}
```

## 3. Updated Waybar CSS (`~/.config/waybar/style.css`)

Added `#custom-wireguard` to the module list:
```css
#cpu,
#battery,
#pulseaudio,
#custom-omarchy,
#custom-screenrecording-indicator,
#custom-update,
#custom-wireguard {
  min-width: 12px;
  margin: 0 7.5px;
}
```

Added spacing rule:
```css
#custom-wireguard {
  margin-right: 17px;
}
```

## 4. Reloaded Waybar
```bash
killall waybar
waybar &
```

