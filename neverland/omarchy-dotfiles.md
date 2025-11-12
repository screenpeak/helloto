```
…/.config/hypr ❯ cat bindings.conf
# Application bindings
$terminal = uwsm app -- $TERMINAL
$browser = omarchy-launch-browser

bindd = SUPER, RETURN, Terminal, exec, $terminal --working-directory="$(omarchy-cmd-terminal-cwd)"
bindd = SUPER SHIFT, F, File manager, exec, uwsm app -- nautilus --new-window
bindd = SUPER SHIFT, B, Browser, exec, $browser
bindd = SUPER SHIFT ALT, B, Browser (private), exec, $browser --private
bindd = SUPER SHIFT, N, Editor, exec, omarchy-launch-editor
bindd = SUPER SHIFT, T, Activity, exec, $terminal -e btop
bindd = SUPER SHIFT, D, Docker, exec, $terminal -e lazydocker
bindd = SUPER SHIFT ALT, G, Signal, exec, omarchy-launch-or-focus signal "uwsm app -- signal-desktop"
bindd = SUPER SHIFT, O, Obsidian, exec, omarchy-launch-or-focus obsidian "uwsm app -- obsidian -disable-gpu --enable-wayland-ime"
bindd = SUPER SHIFT, slash, Passwords, exec, uwsm app -- Bitwarden

# If your web app url contains #, type it as ## to prevent hyperland treat it as comments

#bindd = SUPER SHIFT ALT, C, Calendar, exec, omarchy-launch-webapp "https://app.hey.com/calendar/weeks/"
bindd = SUPER SHIFT ALT, G, WhatsApp, exec, omarchy-launch-or-focus-webapp WhatsApp "https://web.whatsapp.com/"
bindd = SUPER SHIFT ALT, X, X Post, exec, omarchy-launch-webapp "https://x.com/compose/post"
bindd = SUPER SHIFT ALT, A, Grok, exec, omarchy-launch-webapp "https://grok.com"
bindd = SUPER SHIFT, X, X, exec, omarchy-launch-webapp "https://x.com/"
bindd = SUPER SHIFT, A, ChatGPT, exec, omarchy-launch-webapp "https://chatgpt.com"
bindd = SUPER SHIFT, C, Claude, exec, omarchy-launch-webapp "https://claude.ai/new"
bindd = SUPER SHIFT, E, Email, exec, omarchy-launch-webapp "https://mail.proton.me/u/0/inbox"
bindd = SUPER SHIFT, G, Google Messages, exec, omarchy-launch-or-focus-webapp "Google Messages" "https://messages.google.com/web/conversations"
b
# Overwrite existing bindings, like putting Omarchy Menu on Super + Space
# unbind = SUPER SHIFT, SPACE
# bindd = SUPER SHIFT, SPACE, Omarchy menu, exec, omarchy-menu

…/.config/hypr ❯ cat looknfeel.conf
# Change the default Omarchy look'n'feel

# https://wiki.hyprland.org/Configuring/Variables/#general
general {
    # No gaps between windows
    # gaps_in = 0
    # gaps_out = 0

    # Use master layout instead of dwindle
    # layout = master
}

# https://wiki.hyprland.org/Configuring/Variables/#decoration
decoration {
    # Use round window corners
    # rounding = 8
}

# https://wiki.hypr.land/Configuring/Dwindle-Layout/
dwindle {
    # Avoid overly wide single-window layouts on wide screens
    # single_window_aspect_ratio = 1 1
}

# Bitwarden extension popup - float instead of tile
windowrulev2 = float, class:^(brave-nngceckbapebfimnlniiiahkandclblb-Default)$
windowrulev2 = size 400 600, class:^(brave-nngceckbapebfimnlniiiahkandclblb-Default)$
#windowrulev2 = center, class:^(brave-nngceckbapebfimnlniiiahkandclblb-Default)$

…/.config/hypr ❯ cat monitors.conf
# See https://wiki.hyprland.org/Configuring/Monitors/
# List current monitors and resolutions possible: hyprctl monitors
# Format: monitor = [port], resolution, position, scale
# You must relaunch Hyprland after changing any envs (use Super+Esc, then Relaunch)

# Optimized for retina-class 2x displays, like 13" 2.8K, 27" 5K, 32" 6K.

# Laptop screen (scaled for better readability)
#monitor=,preferred,auto,auto
monitor = eDP-2, 1920x1080@165, 0x0, 1.50

# External monitor
monitor=HDMI-A-1, 2560x1440@119.88Hz, 1280x0, 1.33

# Assign workspaces to specifc monitors
workspace=1,monitor:eDP-2,default:true
workspace=2,monitor:HDMI-A-1,default:true

# Good compromise for 27" or 32" 4K monitors (but fractional!)
# env = GDK_SCALE,1.75
# monitor=,preferred,auto,1.666667

# Straight 1x setup for low-resolution displays like 1080p or 1440p
# env = GDK_SCALE,1
# monitor=,preferred,auto,1

# Example for Framework 13 w/ 6K XDR Apple display
# monitor = DP-5, 6016x3384@60, auto, 2
# monitor = eDP-1, 2880x1920@120, auto, 2


```

