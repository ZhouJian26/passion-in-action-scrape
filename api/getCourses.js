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
    // Extract data
    const infoList = (courseObj.child.map((el) => { return el.child })).map(el => {
        return el.map(el2 => { return el2 })
    })
    // Return formatted data
    /**
     * TODO
     *  - title, se troppo lungo vengono dati puntini puntini quindi va fatta la richiesta al link per avere il nome completo
     */
    return {
        title: ((infoList[0][0].child[0].text).split("&#39;")).join("'"),
        tag: infoList[1][1].text,
        lang: infoList[2][1].text,
        where: ((infoList[3][1].text).split("&agrave;")).join("à "),
        subStartDate: ((infoList[4][1].child[0].text).split("dal ")).join(""),
        subEndDate: ((infoList[4][2].child[0].text).split("del "))[1],
        subEndTime: ((((infoList[4][2].child[0].text).split(" del"))[0]).split("alle ore "))[1],
        link: ((infoList[infoList.length - 1][0].attr.href).split("amp;")).join("")
    };
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
