Omarchy fix for ProtonVPN's DNS causing issues with a connection through 
WigaurOomarchy fix for ProtonVPN's DNS causing issues with a connection through Wigaurd

# Check if you have the resolvconf symlink:

```
ls -la /usr/local/bin/resolvconf
```

# If it doesn't exist or points to the wrong thing:
```
sudo ln -sf /usr/bin/resolvectl /usr/local/bin/resolvconf
```
