
Requirements:
- 1 core
- 512mb-1024mb RAM
- 10gb disk space

1. Download a bootable USB imager
	- https://rufus.ie/en/
2. Image Ubuntu Server 24.04 to USB with Rufus
3. Install Ubuntu Server then update
	- https://ubuntu.com/download/server

```
sudo apt update && sudo apt upgrade
```

4. Configure `/etcnetplan/50-cloud-init-yaml`

```

network:
  version: 2
  ethernets:
    enp6s18:
      addresses:
       - 192.168.0.53/24
      nameservers:
        addresses:
          - 1.1.1.1
      routes:
        - to: default
          via: 192.168.0.1

```
Note: might conflict with DHCP if IP is assigned.

5. Test config

```
sudo netplan try
sudo netplan apply
```

6. Download quick install of Pi-hole:
	- https://docs.pi-hole.net/main/basic-install/

```
sudo curl -sSL https://install.pi-hole.net | bash
```

7. Set password:

```
sudo pihole setpassword
```

8. Access dashboard
	- http://192.168.0.53/admin/
	
9. Navigate _Settings -> DNS_
10. Remove any upstream providers.
11. Change host to use Pi-hole
	- Turn off upstream DNS providers
	- Add custom DNS server: `192.168.0.53#5335`

![](vaultimore/neverland/attachments/Pasted%20image%2020250602194543.png)

12. Configure router
	- Set DNS nameserver: `192.168.0.53`

# Install Unbound

Documentation: `https://docs.pi-hole.net/guides/dns/unbound/`

```
sudo apt install unbound
```

1. Add Unbound config: `/etc/unbound/unbound.conf.d/pi-hole.conf`

```
server:
    # If no logfile is specified, syslog is used
    # logfile: "/var/log/unbound/unbound.log"
    verbosity: 0

    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes

    # May be set to no if you don't have IPv6 connectivity
    do-ip6: yes

    # You want to leave this to no unless you have *native* IPv6. With 6to4 and
    # Terredo tunnels your web browser should favor IPv4 for the same reasons
    prefer-ip6: no

    # Use this only when you downloaded the list of primary root servers!
    # If you use the default dns-root-data package, unbound will find it automatically
    #root-hints: "/var/lib/unbound/root.hints"

    # Trust glue only if it is within the server's authority
    harden-glue: yes

    # Require DNSSEC data for trust-anchored zones, if such data is absent, the zone becomes BOGUS
    harden-dnssec-stripped: yes

    # Don't use Capitalization randomization as it known to cause DNSSEC issues sometimes
    # see https://discourse.pi-hole.net/t/unbound-stubby-or-dnscrypt-proxy/9378 for further details
    use-caps-for-id: no

    # Reduce EDNS reassembly buffer size.
    # IP fragmentation is unreliable on the Internet today, and can cause
    # transmission failures when large DNS messages are sent via UDP. Even
    # when fragmentation does work, it may not be secure; it is theoretically
    # possible to spoof parts of a fragmented DNS message, without easy
    # detection at the receiving end. Recently, there was an excellent study
    # >>> Defragmenting DNS - Determining the optimal maximum UDP response size for DNS <<<
    # by Axel Koolhaas, and Tjeerd Slokker (https://indico.dns-oarc.net/event/36/contributions/776/)
    # in collaboration with NLnet Labs explored DNS using real world data from the
    # the RIPE Atlas probes and the researchers suggested different values for
    # IPv4 and IPv6 and in different scenarios. They advise that servers should
    # be configured to limit DNS messages sent over UDP to a size that will not
    # trigger fragmentation on typical network links. DNS servers can switch
    # from UDP to TCP when a DNS response is too big to fit in this limited
    # buffer size. This value has also been suggested in DNS Flag Day 2020.
    edns-buffer-size: 1232

    # Perform prefetching of close to expired message cache entries
    # This only applies to domains that have been frequently queried
    prefetch: yes

    # One thread should be sufficient, can be increased on beefy machines. In reality for most users running on small networks or on a single machine, it should be unnecessary to seek performance enhancement by increasing num-threads above 1.
    num-threads: 1

    # Ensure kernel buffer is large enough to not lose messages in traffic spikes
    so-rcvbuf: 1m

    # Ensure privacy of local IP ranges
    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10

    # Ensure no reverse queries to non-public IP ranges (RFC6303 4.2)
    private-address: 192.0.2.0/24
    private-address: 198.51.100.0/24
    private-address: 203.0.113.0/24
    private-address: 255.255.255.255/32
    private-address: 2001:db8::/32
```

2. Restart Unbound

```
dig fail01.dnssec.works @127.0.0.1 -p 5335
dig dnssec.works @127.0.0.1 -p 5335
```

3. Test if DNSSEC is working
	- https://wander.science/projects/dns/dnssec-resolver-test/

```
dig fail01.dnssec.works @127.0.0.1 -p 5335
dig dnssec.works @127.0.0.1 -p 5335
```
- The first command should give a status report of `SERVFAIL` and no IP address. The second should give `NOERROR` plus an IP address.


# Configure Firewall

1. Install UFW

```
sudo apt install ufw -y
```

2. Add firewall rules

```
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 53/tcp
sudo ufw allow 53/udp
sudo ufw allow 67/tcp
sudo ufw allow 67/udp
sudo ufw allow 123/udp
```

3. Enable

```
sudo ufw enable
```


