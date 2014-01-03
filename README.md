# RobotIRC

## Description

Multifonction IRC bot written in Node.js.

## Configuration

Configuration options are set in the `config.json` file :

	{
	    "server": "irc.freenode.net",
	    "nickname": "robotirc",
	    "options": {
	        "userName": "robotirc",
	        "realName": "RobotIRC 0.1.1",
	        "port": 6667,
	        "autoRejoin": true,
	        "autoConnect": true,
	        "channels": [
	            "#robotirc"
	        ]
	    }
	}

## Commands

RobotIRC supports the following commands :

- !alexa (Get Alexa traffic rank for a domain or URL)
- !date (Display server local time)
- !expand (Expand a shortened URL)
- !geoip (IP address Geolocation)
- !headers (Display HTTP headers for queried URL)
- !resolve (Get A records (IPv4) and AAAA records (IPv6) for queried domain)
- !reverse (Get reverse (PTR) records from IPv4 or IPv6 addresses)
- !wikipedia (Query Wikipedia for an article summary)

A list of available functions can be displayed by using the `!help` command.

## Examples

	<fcambus> !alexa echojs.com
	<robotirc> Alexa Traffic Rank for echojs.com : 267098

	<fcambus> !date
	<robotirc> Fri Jan 03 2014 01:02:39 GMT+0100 (CET)

	<fcambus> !expand http://bit.ly/1g4jD0H
	<robotirc> http://www.echojs.com/

	<fcambus_> !geoip 77.88.8.8
	<robotirc> country: Russian Federation
	<robotirc> dma_code: 0
	<robotirc> area_code: 0
	<robotirc> ip: 77.88.8.8
	<robotirc> asn: AS13238
	<robotirc> continent_code: EU
	<robotirc> isp: Yandex LLC
	<robotirc> longitude: 100
	<robotirc> latitude: 60
	<robotirc> country_code: RU
	<robotirc> country_code3: RUS

	<fcambus> !headers http://www.echojs.com
	<robotirc> server: nginx
	<robotirc> date: Fri, 03 Jan 2014 00:08:05 GMT
	<robotirc> content-type: text/html;charset=utf-8
	<robotirc> content-length: 16769
	<robotirc> connection: keep-alive
	<robotirc> vary: Accept-Encoding
	<robotirc> status: 200 OK
	<robotirc> x-xss-protection: 1; mode=block
	<robotirc> x-frame-options: sameorigin

	<fcambus> !resolve echojs.com
	<robotirc> 46.19.37.108
	<robotirc> 2a02:2770::21a:4aff:feb3:2ee

	<fcambus> !reverse 77.88.8.8
	<robotirc> dns.yandex.ru

	<fcambus> !reverse 2a02:6b8::feed:ff
	<robotirc> dns.yandex.ru

	<fcambus> !wikipedia node.js
	<robotirc> Node.js is a software system designed for writing scalable Internet applications, notably web servers. Programs are written in JavaScript, using event-driven, asynchronous I/O to minimize overhead and maximize scalability. http://en.wikipedia.org/wiki/Node.js

## License

RobotIRC is released under the BSD 2-Clause license. See `LICENSE` file for details.

## Author

RobotIRC is developed by Frederic Cambus

- Site : http://www.cambus.net
- Twitter: http://twitter.com/fcambus
