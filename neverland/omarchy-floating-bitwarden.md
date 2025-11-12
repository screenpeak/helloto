# Change Hyprland Tiled Window to FLoating Window

## Bitwarden browser extension

### 1. Trigger the bitwarden extension popup window.
### 2. Enumerate clients and get the bitwarden data:
  - class:
  - initialClass:
  - initialTitle:

stdin:
```
hyperctl clients
```

stdout:
```
Window 55df634f07e0 -> Bitwarden:
    mapped: 1
    hidden: 0
    at: 1292,560
    size: 941,508
    workspace: 2 (2)
    floating: 0
    pseudo: 0
    monitor: 1
    class: brave-nngceckbapebfimnlniiiahkandclblb-Default
    title: Bitwarden
    initialClass: brave-nngceckbapebfimnlniiiahkandclblb-Default
    initialTitle: _crx_nngceckbapebfimnlniiiahkandclblb
    pid: 3765
    xwayland: 0
    pinned: 0
    fullscreen: 0
    fullscreenClient: 0
    grouped: 0
    tags:
    swallowing: 0
    focusHistoryID: 1
    inhibitingIdle: 0
    xdgTag:
    xdgDescription:
```

### 3. Edit the Omarchy `~/.config/hypr/looknfeel.conf`

```
# Bitwarden extension popup - float instead of tile
windowrulev2 = float, class:^(brave-nngceckbapebfimnlniiiahkandclblb-Default)$
windowrulev2 = size 400 600, class:^(brave-nngceckbapebfimnlniiiahkandclblb-Default)$
windowrulev2 = center, class:^(brave-nngceckbapebfimnlniiiahkandclblb-Default)$
```

### 4. Then reload

```
hyprctl reload
```
