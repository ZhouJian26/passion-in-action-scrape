"use strict"
const cheerio = require('cheerio')
const request = require("request")
const jsonframe = require('jsonframe-cheerio')
const listaCorsiFrame = {
    "corsi": {
        "_s": ".item",
        "_d": [
            {
                "link": ".linkTo a @ href"
            }
        ]
    }
}

module.exports = (req, res) => {
    request.get(`https://www.polimi.it/corsi/passion-in-action/`, (
        error,
        response,
        data
    ) => {
        const $ = cheerio.load(data);
        jsonframe($);
        const dataFormatted = $('.listaCorsi').scrape(listaCorsiFrame).corsi.map(el => { return el.link.substring(1, el.link.length) });
        res.send(dataFormatted);
    });
}
