"use strict"
const cheerio = require('cheerio')
const request = require("request")
const jsonframe = require('jsonframe-cheerio')
const listaCorsiFrame = {
    "corsi": {
        "_s": ".item",
        "_d": [
            {
                "title": ".titolo .descrizioneIniziativa",
                "type": ".titolo .modErog",
                "tag": ".keywords",
                "lang": ".languages",
                "location": ".sede",
                "subDate": ".dateIscrizione",
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
        const dataFormatted = $('.listaCorsi').scrape(listaCorsiFrame).corsi.map(el => {
            el.type = el.type.substring(1, el.type.length - 1);
            el.tag = el.tag.substring(15, el.tag.length);
            el.location = el.location.substring(6, el.location.length);
            el.startSubData = el.subDate.substring(16, 26);
            el.endSubTime = el.subDate.substring(35, 40);
            el.endSubDate = el.subDate.substring(45, el.subDate.length);
            el.lang = el.lang.substring(8, el.lang.length);
            delete el.subDate;
            return el;
        })
        res.send(dataFormatted);
    });
}
