# Monitors Hyprland Config


```
~/.config/hypr/monitors.conf
```

# Laptop screen (scaled for better readability)
monitor=eDP-2,1920x1080@165,0x0,1.50
monitor=,preferred,auto,auto

# External monitor
monitor=HDMI-A-2,2560x1440@119.88Hz,1280x0,1.00

# Assign workspaces to specific monitors

```
workspace=1,monitor:eDP-2,default:true
workspace=3,monitor:HDMI-A-1,default:true
```
