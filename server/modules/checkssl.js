/* jshint esversion:8 */
const ssl = require("get-ssl-certificate");
const express = require('express');

const router = express.Router();

const DEFAULT_FL = [
    "domain",
    "valid_from",
    "valid_to"
];


const _cert = function(filter,cert) {
    var _c = {};

    for( var key in cert) {
        if(filter.indexOf(key) >= 0) {
            _c[key] = cert[key];

            if(/^valid_/.test(key)) {
                _c[key] = new Date(_c[key]);
            }
        }
    }

    if(_c.valid_from && _c.valid_to) {
        const today = new Date();
        _c.days_remaining  = Math.floor(
            (_c.valid_to.getTime() - today.getTime()) / (1000 * 3600 * 24)
        );

        _c.status = "active";
        if(_c.days_remaining <= 10) {
            _c.status = "warning";
        } else if(_c.days_remaining <= 0) {
            _c.status = "expired";
        }
    }
    return _c;
};

router.get("/:_domains", (req, resp) => {
    const domains = req
        .params
        ._domains
        .split(/[,:+ ]/).filter(domain => {
            return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain);
        });

    var response = [];

    var filter = DEFAULT_FL;

    if(req.query.fl) {
        filter = req.query.fl.split(",");
    }

    domains.forEach(domain => {
        ssl.get(domain)
        .then(cert => {
            cert.domain = domain;
            cert = _cert(filter,cert);
            response.push(cert);

            if(response.length === domains.length) {
                resp.json(response);
            }
        });
    });
    // resp.status(404)
});

module.exports = router;