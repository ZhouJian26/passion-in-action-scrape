"use strict"

const cheerio = require('cheerio');
const request = require("request");
module.exports = (req, res) => {
    request.get(`https://www.polimi.it/?id=${req.query.id}&corso=${req.query.corso}`, (
        error,
        response,
        data
    ) => {
        const $ = cheerio.load(data);
        const dataFormatted = {
            title: $('.schedaCorso .titolo h2').text(),
            type: $('.schedaCorso .titolo h3').text(),
            linkTo: $('.schedaCorso .linkTo').text(),
            lang: $('.schedaCorso .iconList .languages').text(),
            location: $('.schedaCorso .iconList .sede').text(),
            tag: $('.schedaCorso .iconList .keywords').text(),
            subDate: $('.schedaCorso .dateIscrizione').text()
        }
        $('.schedaCorso dl dd').each((index, el) => {
            if (index == 0)
                dataFormatted.prof = $(el).text();
            if (index == 1)
                dataFormatted.addressedTo = $(el).text();
            if (index == 2)
                dataFormatted.cfu = $(el).text();
            if (index == 3)
                dataFormatted.duration = $(el).text();
            if (index == 4)
                dataFormatted.requirements = $(el).text().split('\n');
            if (index == 5)
                dataFormatted.maxSub = $(el).text();
            if (index == 6)
                dataFormatted.selectionCriteria = $(el).text().split('\n');
        })
        $('.schedaCorso .descrizioneIniziativa').each((index, el) => {
            if (index == 0)
                dataFormatted.description = ($(el).text()).split('\n');
            if (index == 1)
                dataFormatted.period = $(el).text();
            if (index == 2)
                dataFormatted.date = $(el).text().split('\n');
            if (index == 3)
                dataFormatted.notes = $(el).text().split('\n');
        })
        dataFormatted.type = dataFormatted.type.substring(1, dataFormatted.type.length - 1);
        dataFormatted.tag = dataFormatted.tag.substring(15, dataFormatted.tag.length);
        dataFormatted.location = dataFormatted.location.substring(6, dataFormatted.location.length);
        dataFormatted.StartSubData = dataFormatted.subDate.substring(12, 22);
        dataFormatted.EndSubTime = dataFormatted.subDate.substring(31, 37);
        dataFormatted.EndSubDate = dataFormatted.subDate.substring(41, dataFormatted.subDate.length);
        delete dataFormatted.subDate;
        res.send(dataFormatted);
    });

}
