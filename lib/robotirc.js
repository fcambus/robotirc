#!/usr/bin/env node

/*****************************************************************************/
/*                                                                           */
/* RobotIRC 0.1.1 (c) by Frederic Cambus 2013-2014                           */
/* https://github.com/fcambus/robotirc                                       */
/*                                                                           */
/* Created: 2013/12/17                                                       */
/* Last Updated: 2014/01/05                                                  */
/*                                                                           */
/* RobotIRC is released under the BSD 2-Clause license.                      */
/* See LICENSE file for details.                                             */
/*                                                                           */
/*****************************************************************************/

var crypto = require('crypto');
var dns = require('dns');
var net = require('net');



/**[ NPM Modules ]************************************************************/

var alexa = require('alexarank');
var irc = require('irc');
var log = require('npmlog')
var request = require('request');



/**[ Configuration ]**********************************************************/

var config = require("../config.json");

var client = new irc.Client(config.server, config.nickname, config.options);



/**[ Connection ]*************************************************************/

log.info("", "RobotIRC is running. Press Ctrl+C to stop.");

client.addListener('registered', function(message) {
    log.info("", "RobotIRC is now connected to " + config.server);
});



/**[ Error handler ]**********************************************************/

client.addListener('error', function(message) {
    log.error("", message.args.splice(1, message.args.length).join(" - "));
});



/**[ CTCP VERSION handler ]***************************************************/

client.addListener('ctcp-version', function(from, to, message) {
    client.ctcp(from, 'notice', "VERSION " + config.options.realName);
});



/**[ Message handler ]********************************************************/

client.addListener('message', function(from, to, message) {
    var params = message.split(' ').slice(1).join(' ');

    if (to == client.nick) { // Handling private messages
        to = from;
    }

    /**************************************************************[ !help ]**/

    if (message.match(/^!help/)) {
        var help = "RobotIRC 0.1.1 supports the following commands :\n" +
            "!alexa     => Get Alexa traffic rank for a domain or URL\n" +
            "!date      => Display server local time\n" +
            "!expand    => Expand a shortened URL\n" +
            "!geoip     => IP address Geolocation\n" +
            "!headers   => Display HTTP headers for queried URL\n" +
            "!resolve   => Get A records (IPv4) and AAAA records (IPv6) for queried domain\n" +
            "!reverse   => Get reverse (PTR) records from IPv4 or IPv6 addresses\n" +
            "!wikipedia => Query Wikipedia for an article summary\n";

        client.say(to, help);
    }

    /*************************************************************[ !alexa ]**/

    if (message.match(/^!alexa/)) {
        alexa(params, function(error, result) {
            if (!error && typeof result.rank != "undefined") {
                client.say(to, "Alexa Traffic Rank for " + result.idn.slice(0, -1) + " : " + result.rank);
            }
        });
    }

    /**************************************************************[ !date ]**/

    if (message.match(/^!date/)) {
        client.say(to, Date());
    }

    /************************************************************[ !expand ]**/

    if (message.match(/^!expand/)) {
        request({
                method: "HEAD",
                url: params,
                followAllRedirects: true
            },
            function(error, response) {
                if (!error && response.statusCode == 200) {
                    client.say(to, response.request.href);
                }
            });
    }

    /*************************************************************[ !geoip ]**/

    if (message.match(/^!geoip/)) {
        request('http://www.telize.com/geoip/' + params, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var geoip = JSON.parse(response.body);

                for (var item in geoip) {
                    client.say(to, item + ": " + geoip[item] + "\n");
                }
            }
        });
    }

    /***********************************************************[ !headers ]**/

    if (message.match(/^!headers/)) {
        request(params, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                for (var item in response.headers) {
                    client.say(to, item + ": " + response.headers[item] + "\n");
                }
            }
        });
    }

    /***********************************************************[ !resolve ]**/

    if (message.match(/^!resolve/)) {
        dns.resolve4(params, function(error, addresses) {
            if (!error) {
                for (var item in addresses) {
                    client.say(to, addresses[item] + "\n");
                }
            }
            dns.resolve6(params, function(error, addresses) {
                if (!error) {
                    for (var item in addresses) {
                        client.say(to, addresses[item] + "\n");
                    }
                }
            });
        });
    }

    /***********************************************************[ !reverse ]**/

    if (message.match(/^!reverse/)) {
        if (net.isIP(params)) {
            dns.reverse(params, function(error, domains) {
                if (!error) {
                    client.say(to, domains[0]);
                }
            });
        }
    }

    /*********************************************************[ !wikipedia ]**/

    if (message.match(/^!wikipedia/)) {
        params.split(' ').join('_');

        dns.resolveTxt(params + ".wp.dg.cx", function(error, txt) {
            if (!error) {
                client.say(to, txt[0]);
            }
        });
    }
});
