inspiring = new Array();
inspiring.push({t:"Frohe Weihnachten!", l: "Deutsch"});
inspiring.push({t:"Merry Christmas!", l: "Englisch"});
inspiring.push({t:"Gemiedliche Weinocht!", l: "Österreichisch"});
inspiring.push({t:"Buon Natale!", l: "Ialienisch"});
inspiring.push({t:"メリークリスマス!", l: "Japanisch"});
inspiring.push({t:"Felicem natalem Christi!", l: "Latein"});
inspiring.push({t:"ಮೆರ್ರಿ ಕ್ರಿಸ್ಮಸ್!", l: "Kanadisch"});
inspiring.push({t:"Wesołych Świąt!", l: "Polnisch"});
inspiring.push({t:"Vrolijk kerstfeest!", l: "Niederländisch"});
inspiring.push({t:"圣诞节快乐", l: "Chinesisch"});
inspiring.push({t:"Joyeux Noël!", l: "Französisch"});
inspiring.push({t:"¡Feliz Navidad!", l: "Spanisch"});
inspiring.push({t:"God jul!", l: "Norwegisch, Schwedisch"});
inspiring.push({t:"Veselé Vianoce!", l: "Slowakisch"});
inspiring.push({t:"Jabulela Ukhisimusi!!", l: "Zulu"});
inspiring.push({t:"Feliz Natal!", l: "Portugiesisch"});
inspiring.push({t:"Veselé Vánoce!", l: "Tschechisch"});
inspiring.push({t:"Glædelig jul!", l: "Dänisch"});
inspiring.push({t:"Sretan Božić!", l: "Kroatisch"});
inspiring.push({t:"Giáng sinh vui vẻ!", l: "Vietnamesisch"});
inspiring.push({t:"Vesel božič!", l: "Slowenisch"});
inspiring.push({t:"Gleðileg jól!", l: "Isländisch"});





function reset() {
    let random = Math.floor(Math.random() * inspiring.length);
    let textplaceholder = document.getElementsByClassName("text")[0];
    textplaceholder.innerHTML = inspiring[random].t;
    document.getElementsByClassName("speech")[0].innerHTML = "- " + inspiring[random].l;
}

reset();