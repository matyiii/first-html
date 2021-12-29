const API_countries = 'https://location.wlfpt.co/api/v1/countries';
const API_counties = 'https://location.wlfpt.co/api/v1/states?filter=HU&type=code';
const API_city = 'https://location.wlfpt.co/api/v1/cities?filter=Heves&type=name';
function countries() {
    const xhr = new XMLHttpRequest();
    const metodus = "GET";

    xhr.open(metodus, API_countries, true)
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            //console.log(JSON.parse(this.responseText));
            tartalom = JSON.parse(this.responseText);
            const db = tartalom.length;
            //console.log(db);
            const select = document.getElementById("country");
            for (let i = 0; i < db; i++) {
                let opt = document.createElement("option");
                opt.value = tartalom[i].name;
                opt.innerHTML = tartalom[i].name;
                opt.id = tartalom[i].id;
                select.appendChild(opt);
                console.log(tartalom[i].name);
            }
        }
    }
    xhr.send();
}

function counties() {
    const xhr = new XMLHttpRequest();
    const metodus = 'GET';

    xhr.open(metodus, API_counties, true)
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            tartalom = JSON.parse(this.responseText);
            const db = tartalom.length;
            const select = document.getElementById("county");
            for (let i = 0; i < db; i++) {
                let opt = document.createElement("option");
                opt.value = tartalom[i].name;
                opt.innerHTML = tartalom[i].name;
                opt.id = tartalom[i].id;
                select.appendChild(opt);
                console.log(tartalom[i].name);
            }
        }
    }
    xhr.send();
}

function city() {
    const xhr = new XMLHttpRequest();
    const metodus = 'GET';
    xhr.open(metodus, API_city, true)
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            tartalom = JSON.parse(this.responseText);
            const db = tartalom.length;
            const select = document.getElementById("city");
            for (let i = 0; i < db; i++) {
                let opt = document.createElement("option");
                opt.value = tartalom[i].name;
                opt.id = tartalom[i].id;
                opt.innerText = tartalom[i].name;
                select.appendChild(opt);
                console.log(tartalom[i].name);
            }
        }
    }
    xhr.send();
}

function formHandler() {
    var name = document.getElementById("name").value;
    var birthday = document.getElementById("birthday").value;
    var sex = document.getElementById("sex").value;
    var phonenumber = document.getElementById("phonenumber").value;
    var email = document.getElementById("email").value;
    var country = document.getElementById("country").value;
    var county = document.getElementById("county").value;
    var city = document.getElementById("city").value;
    var taj = document.getElementById("taj").value;
    var ado = document.getElementById("ado").value;
    var edu = document.getElementById("edu").value;

    let ellenoriz = checkTajAdo(birthday, taj, ado);
    if (ellenoriz != true) {
        hiba(ellenoriz);
        return;
    }
    let validForm = validateForm();
    if (validForm == False) {
        return;
    }
    fillTable(name, birthday, sex, phonenumber, email, country, county, city, taj, ado, edu);
    document.getElementById("tablecontainer").style.display = "initial";
    document.getElementById("fieldset").disabled = true;
}

function fillTable(name, birthday, sex, phonenumber, email, country, county, city, taj, ado, edu) {
    document.getElementById("tname").innerText = name;
    document.getElementById("tbirthday").innerText = birthday;
    document.getElementById("tsex").innerText = sex;
    document.getElementById("tphonenumber").innerText = phonenumber;
    document.getElementById("temail").innerText = email;
    document.getElementById("tcountry").innerText = country;
    document.getElementById("tcounty").innerText = county;
    document.getElementById("tcity").innerText
    document.getElementById("ttaj").innerText = taj;
    document.getElementById("tado").innerText = ado;
    document.getElementById("tedu").innerText = edu;
}

function checkTajAdo(birthday, taj, ado) {
    if (!validTaj(taj)) {
        return "Érvénytelen tajszám!";
    }
    if (!validAdo(ado, birthday)) {
        return "Érvénytelen adószám";
    }
    return true;
}

function hiba(str) {
    var e = document.getElementById("error");
    e.innerText = str;
    e.style.display = "block";
}

function validTaj(tajszam) {
    if (typeof tajszam == "number") {
        tajszam = tajszam.toString();
        if (tajszam.length != 9) {
            return false;
        }
    }
    if (isNaN(Number(tajszam))) {
        return false;
    }
    var helyesTaj = 0;
    for (let i = 0; i < tajszam.length - 1; i += 2) {
        helyesTaj += Number(tajszam[i]) * 3;
    }
    for (let i = 1; i < tajszam.length - 1; i += 2) {
        helyesTaj += Number(tajszam[i]) * 7;
    }
    helyesTaj = helyesTaj % 10;

    if (helyesTaj == Number(tajszam[8])) {
        console.log("Helyes az TAJ szám")
        return true;
    }
    else {
        return false;
    }
}

function validAdo(adoszam, birthday) {
    if (typeof adoszam == "number") {
        adoszam = adoszam.toString();
        if (tajszam.length != 10) {
            return false;
        }
    }
    if (isNaN(Number(adoszam))) {
        return false;
    }

    var helyesAdo = 0;
    var ado26 = adoszam[1] + adoszam[2] + adoszam[3] + adoszam[4] + adoszam[5];

    var ota = new Date("01/01/1867");
    var bday = new Date(birthday);
    var differenceInTime = bday.getTime() - ota.getTime();
    var differenceInDays = differenceInTime / (1000 * 3600 * 24);

    var szamjegy10 = 0; //100
    var splitado = String(adoszam).split('');
    for (let i = 0; i < splitado.length; i++) {
        szamjegy10 += (i + 1) * (splitado[i]);
    }

    var maradek10 = szamjegy10 % 11;
    if (maradek10 == 0) {
        maradek10++;
    }
    if (adoszam[0] == "8" && ado26 == Math.floor(differenceInDays) && adoszam[9] == maradek10) {
        return true;
    }
}

function validateForm() {
    let validName = document.getElementById("name").value;
    let validEmail = document.getElementById("email").value;
    let validBirthday = document.getElementById("birthday").value;
    if (validName == "" || validEmail == "" || validBirthday=="") {
        alert("Minden mezőt ki kell tölteni");
        return false;
    }
}
