const https = require('https')
const html2json = require('html2json').html2json
const options = {
    hostname: 'www.polimi.it',
    port: "",
    path: '/corsi/passion-in-action/',
    method: 'GET'
}
const getCourseList = (parsetBody) => {
    //ricerca nel file parsato dell'array che contiene i corsi
    return parsetBody.child[0].child[3].child[3].child[2].child[0].child[3].child[3].child[6].child[3].child
}
const getCourseInfo = (courseObj) => {
    const resDataFormatted = [];
    /*
        Dati di interesse: 
            -   titolo [0]
            -   tag [1]
            -   lingua [2]
            -   sede [3]
            -   iscrizioni [4]
            -   more info [5]
    */
    const infoList = (courseObj.child.map((el) => { return el.child })).map(el => {
        return el.map(el2 => { return el2 })
    })
    // titolo [0]
    resDataFormatted.push({
        key: "title",
        value: ((infoList[0][0].child[0].text).split("&#39;")).join("'")
    });
    // tag [1]
    resDataFormatted.push({
        key: "tag",
        value: infoList[1][1].text
    });
    // lingua [2]
    resDataFormatted.push({
        key: "language",
        value: infoList[2][1].text
    });
    // sede [3]
    resDataFormatted.push({
        key: "location",
        value: infoList[3][1].text
    });
    // iscrizioni [4]
    resDataFormatted.push({
        key: "subscription start",
        value: infoList[4][1].child[0].text
    });
    // iscrizioni [4]
    resDataFormatted.push({
        key: "subscription end",
        value: infoList[4][2].child[0].text
    });
    // more info [5]
    resDataFormatted.push({
        key: "more info",
        value: ((infoList[infoList.length - 1][0].attr.href).split("amp;")).join("")
    });
    return resDataFormatted
}
module.exports = (req, res) => {
    const getData = https.request(options, resData => {
        var str = "";
        resData.setEncoding('utf8')
        resData.on('data', d => {
            str += d;
        })
        resData.on("end", () => {
            const resDataArr = []
            const dataGet = getCourseList(html2json(str))   //arrivo all'array che contiene tutti i corsi
            dataGet.forEach(el => { resDataArr.push(getCourseInfo(el)) }) //creo l'array da restituire
            res.send(resDataArr);
        })
    })
    getData.on('error', error => {
        console.error(error)
    })
    getData.end()
}
