// if we take an overnight bus, put the night's date into the next city we were going to

var PLACES = [
    // Peru
    {
        "name": "Lima",
        "id": "#Peru_1",
        "startDate": "2015-08-31",
        "endDate": "2015-09-03",
        "incomingLines": ["#line1"],
        // "outgoingLine": "#line2",
    },
    {
        "name": "Iquitos & Amazon Jungle",
        "id": "#Peru_2",
        "startDate": "2015-09-03",
        "endDate": "2015-09-10",
        "incomingLines": ["#line2"],
        // "outgoingLine": "#line3",
    },
    {
        "name": "Huaraz",
        "id": "#Peru_3",
        "startDate": "2015-09-10",
        "endDate": "2015-09-16",
        "incomingLines": ["#line3", "#line4"],
        // "outgoingLine": "#line5",
    },
    {
        "name": "Huánuco",
        "id": "#Peru_4",
        "startDate": "2015-09-16",
        "endDate": "2015-09-17",
        "incomingLines": ["#line5"],
        // "outgoingLine": "#line6",
    },
    {
        "name": "Huancayo",
        "id": "#Peru_5",
        "startDate": "2015-09-17",
        "endDate": "2015-09-20",
        "incomingLines": ["#line6"],
        // "outgoingLine": "#line7",
    },
    {
        "name": "Huacachina",
        "id": "#Peru_6",
        "startDate": "2015-09-20",
        "endDate": "2015-09-24",
        "incomingLines": ["#line100", "#line7"],
        // "outgoingLine": "#line8",
    },
    {
        "name": "Arequipa & Colca Canyon",
        "id": "#Peru_7",
        "startDate": "2015-09-24",
        "endDate": "2015-09-30",
        "incomingLines": ["#line8"],
        // "outgoingLine": "#line9",
    },
    {
        "name": "Cusco",
        "id": "#Peru_8",
        "startDate": "2015-09-30",
        "endDate": "2015-10-17",
        "incomingLines": ["#line9"],
        // "outgoingLine": "#line10",
    },
    {
        "name": "Puno",
        "id": "#Peru_9",
        "startDate": "2015-10-17",
        "endDate": "2015-10-19",
        "incomingLines": ["#line10"],
        // "outgoingLine": "#line11",
    },
    // Bolivia
    {
        "name": "Copacabana",
        "id": "#Bolivia_1",
        "startDate": "2015-10-19",
        "endDate": "2015-10-22",
        "incomingLines": ["#line11"],
        "country": "Bolivia_Map_path",
        // "outgoingLine": "#line12",
    },
    {
        "name": "La Paz",
        "id": "#Bolivia_2",
        "startDate": "2015-10-22",
        "endDate": "2015-11-03",
        "incomingLines": ["#line12"],
        // "outgoingLine": "#line13",
    },
    {
        "name": "Cochabamba & Toro Toro",
        "id": "#Bolivia_3",
        "startDate": "2015-11-03",
        "endDate": "2015-11-11",
        "incomingLines": ["#line13"],
        // "outgoingLine": "#line14",
    },
    {
        "name": "Sucre",
        "id": "#Bolivia_4",
        "startDate": "2015-11-11",
        "endDate": "2015-11-29",
        "incomingLines": ["#line14"],
        // "outgoingLine": "#line15",
    },
    {
        "name": "Potosí",
        "id": "#Bolivia_5",
        "startDate": "2015-11-29",
        "endDate": "2015-12-01",
        "incomingLines": ["#line15"],
        // "outgoingLine": "#line16",
    },
    {
        "name": "Uyuni",
        "id": "#Bolivia_6",
        "startDate": "2015-12-01",
        "endDate": "2015-12-04",
        "incomingLines": ["#line16"],
        // "outgoingLine": "#line17",
    },
    // Chile
    {
        "name": "San Pedro de Atacama",
        "id": "#Chile_1",
        "startDate": "2015-12-04",
        "endDate": "2015-12-07",
        "incomingLines": ["#line17"],
        // "outgoingLine": "#line18",
    },
    {
        "name": "Santiago",
        "id": "#Chile_2",
        "startDate": "2015-12-07",
        "endDate": "2015-12-13",
        "incomingLines": ["#line18"],
        // "outgoingLine": "#line19",
    },
    {
        "name": "Valparaíso",
        "id": "#Chile_3",
        "startDate": "2015-12-13",
        "endDate": "2015-12-18",
        "incomingLines": ["#line19"],
        // "outgoingLine": "#line19",
    },
    {
        "name": "Pichilemu",
        "id": "#Chile_4",
        "startDate": "2015-12-18",
        "endDate": "2015-12-20",
        "incomingLines": ["#line20"],
        // "outgoingLine": "#line20",
    },
    {
        "name": "Santiago",
        "id": "#Chile_200",
        "startDate": "2015-12-20",
        "endDate": "2015-12-22",
        "incomingLines": ["#line200"],
        // "outgoingLine": "#line19",
    },
    {
        "name": "Puerto Octay/Lakes District Farm",
        "id": "#Chile_5",
        "startDate": "2015-12-22",
        "endDate": "2016-01-17",
        "incomingLines": ["#line21"],
        // "outgoingLine": "#line22",
    },
    {
        "name": "Puerto Varas",
        "id": "#Chile_6",
        "startDate": "2016-01-17",
        "endDate": "2016-01-19",
        "incomingLines": ["#line22"],
        // "outgoingLine": "#line23",
    },
    {
        "name": "Ancud",
        "id": "#Chile_7",
        "startDate": "2016-01-19",
        "endDate": "2016-01-21",
        "incomingLines": ["#line23"],
        // "outgoingLine": "#line24",
    },
    {
        "name": "Dalcahue",
        "id": "#Chile_8",
        "startDate": "2016-01-21",
        "endDate": "2016-01-24",
        "incomingLines": ["#line24"],
        // "outgoingLine": "#line25",
    },
    {
        "name": "Castro",
        "id": "#Chile_9",
        "startDate": "2016-01-24",
        "endDate": "2016-01-27",
        "incomingLines": ["#line25"],
        // "outgoingLine": "#line26",
    },
    {
        "name": "Chaitén & Parque Pumalín",
        "id": "#Chile_10",
        "startDate": "2016-01-27",
        "endDate": "2016-01-31",
        "incomingLines": ["#line26"],
        // "outgoingLine": "#line27",
    },
    {
        "name": "La Junta",
        "id": "#Chile_11",
        "startDate": "2016-01-31",
        "endDate": "2016-02-01",
        "incomingLines": ["#line27"],
        // "outgoingLine": "#line28",
    },
    {
        "name": "Parque Queulat",
        "id": "#Chile_12",
        "startDate": "2016-02-01",
        "endDate": "2016-02-02",
        "incomingLines": ["#line28"],
        // "outgoingLine": "#line29",
    },
    {
        "name": "Coyhaique",
        "id": "#Chile_13",
        "startDate": "2016-02-02",
        "endDate": "2016-02-06",
        "incomingLines": ["#line29"],
        // "outgoingLine": "#line30",
    },
    {
        "name": "Cerro Castillo",
        "id": "#Chile_14",
        "startDate": "2016-02-06",
        "endDate": "2016-02-11",
        "incomingLines": ["#line30"],
        // "outgoingLine": "#line31",
    },
    {
        "name": "Puerto Río Tranquilo",
        "id": "#Chile_15",
        "startDate": "2016-02-11",
        "endDate": "2016-02-12",
        "incomingLines": ["#line31"],
        // "outgoingLine": "#line32",
    },
    // Argentina
    {
        "name": "El Chaltén",
        "id": "#Argentina_1",
        "startDate": "2016-02-12",
        "endDate": "2016-02-16",
        "incomingLines": ["#line32"],
        // "outgoingLine": "#line33",
    },
    {
        "name": "El Calafate",
        "id": "#Argentina_2",
        "startDate": "2016-02-16",
        "endDate": "2016-02-18",
        "incomingLines": ["#line33"],
        // "outgoingLine": "#line34",
    },
    // Chile
    {
        "name": "Puerto Natales & Torres del Paine",
        "id": "#Chile_18",
        "startDate": "2016-02-18",
        "endDate": "2016-02-29",
        "incomingLines": ["#line34"],
        // "outgoingLine": "#line35",
    },
    {
        "name": "Punta Arenas",
        "id": "#Chile_19",
        "startDate": "2016-02-29",
        "endDate": "2016-03-02",
        "incomingLines": ["#line35"],
        // "outgoingLine": "#line36",
    },
    // Argentina
    {
        "name": "Ushuaia",
        "id": "#Argentina_3",
        "startDate": "2016-03-02",
        "endDate": "2016-03-04",
        "incomingLines": ["#line36"],
        // "outgoingLine": "#line37",
    },
    {
        "name": "Buenos Aires",
        "id": "#Argentina_4",
        "startDate": "2016-03-04",
        "endDate": "2016-03-15",
        "incomingLines": ["#line37"],
        // "outgoingLine": "#line38",
    },
    // Uruguay
    {
        "name": "Montevideo",
        "id": "#Uruguay_1",
        "startDate": "2016-03-15",
        "endDate": "2016-03-16",
        "incomingLines": ["#line39"],
        // "outgoingLine": "#line40",
    },
    {
        "name": "Punta del Diablo",
        "id": "#Uruguay_2",
        "startDate": "2016-03-16",
        "endDate": "2016-03-19",
        "incomingLines": ["#line40"],
        // "outgoingLine": "line41",
    },
    {
        "name": "Colonia del Sacramento",
        "id": "#Uruguay_3",
        "startDate": "2016-03-19",
        "endDate": "2016-03-21",
        "incomingLines": ["#line41"],
        // "outgoingLine": "#line38",
    },
    // Argentina
    {
        "name": "Buenos Aires",
        "id": "#Argentina_400",
        "startDate": "2016-03-21",
        "endDate": "2016-03-30",
        "incomingLines": ["#line38"],
        // "outgoingLine": "#line42",
    },
    {
        "name": "Iguazú Falls",
        "id": "#Argentina_5",
        "startDate": "2016-03-30",
        "endDate": "2016-04-01",
        "incomingLines": ["#line42"],
        // "outgoingLine": "#line43",
    },
    {
        "name": "Buenos Aires",
        "id": "#Argentina_4000",
        "startDate": "2016-04-01",
        "endDate": "2016-04-15",
        "incomingLines": ["#line43"],
        // "outgoingLine": "#line44",
    },
    {
        "name": "Mendoza",
        "id": "#Argentina_6",
        "startDate": "2016-04-15",
        "endDate": "2016-04-19",
        "incomingLines": ["#line44"],
        // "outgoingLine": "#line45",
    },
    {
        "name": "Salta",
        "id": "#Argentina_7",
        "startDate": "2016-04-19",
        "endDate": "2016-04-22",
        "incomingLines": ["#line45"],
        // "outgoingLine": "#line46",
    },
    // Bolivia
    {
        "name": "Tarija",
        "id": "#Bolivia_7",
        "startDate": "2016-04-22",
        "endDate": "2016-04-24",
        "incomingLines": ["#line46"],
        // "outgoingLine": "#line47",
    },
    {
        "name": "Santa Cruz",
        "id": "#Bolivia_8",
        "startDate": "2016-04-24",
        "endDate": "2016-04-28",
        "incomingLines": ["#line47"],
        // "outgoingLine": "#line48",
    },
    // Colombia
    {
        "name": "Bogota",
        "id": "#Colombia_1",
        "startDate": "2016-04-28",
        "endDate": "2016-05-02",
        "incomingLines": ["#line48"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Medellín",
        "id": "#Colombia_2",
        "startDate": "2016-05-02",
        "endDate": "2016-06-02",
        "incomingLines": ["#line49"],
        // "outgoingLine": "#line50",
    },
    {
        "name": "Jardín",
        "id": "#Colombia_3",
        "startDate": "2016-06-02",
        "endDate": "2016-06-06",
        "incomingLines": ["#line50"],
        // "outgoingLine": "#line51",
    },
    {
        "name": "Manizales",
        "id": "#Colombia_4",
        "startDate": "2016-06-06",
        "endDate": "2016-06-10",
        "incomingLines": ["#line51"],
        // "outgoingLine": "#line52",
    },
    {
        "name": "Salento",
        "id": "#Colombia_5",
        "startDate": "2016-06-10",
        "endDate": "2016-06-14",
        "incomingLines": ["#line52"],
        // "outgoingLine": "#line53",
    },
    {
        "name": "Pereira",
        "id": "#Colombia_6",
        "startDate": "2016-06-14",
        "endDate": "2016-06-15",
        "incomingLines": ["#line53"],
        // "outgoingLine": "#line54",
    },
    {
        "name": "Cartagena",
        "id": "#Colombia_7",
        "startDate": "2016-06-15",
        "endDate": "2016-06-18",
        "incomingLines": ["#line54"],
    },
    // Colombia Central
    {
        "name": "Cartagena_Central",
        "id": "#Colombia_Central_1",
        "startDate": "2016-06-18",
        "endDate": "2016-06-18",
        "incomingLines": ["#line88888"],
        // "outgoingLine": "#line49",
    },
    // Panama
    {
        "name": "SanBlas",
        "id": "#Panama_1",
        "startDate": "2016-06-18",
        "endDate": "2016-06-23",
        "incomingLines": ["#line56, #line55"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Panama",
        "id": "#Panama_2",
        "startDate": "2016-06-23",
        "endDate": "2016-06-27",
        "incomingLines": ["#line57"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Boquete",
        "id": "#Panama_3",
        "startDate": "2016-06-27",
        "endDate": "2016-07-05",
        "incomingLines": ["#line58"],
        // "outgoingLine": "#line49",
    },
    // Costa Rica
    {
        "name": "SanJose",
        "id": "#CostaRica_1",
        "startDate": "2016-07-05",
        "endDate": "2016-07-07",
        "incomingLines": ["#line59"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Monteverde",
        "id": "#CostaRica_2",
        "startDate": "2016-07-07",
        "endDate": "2016-07-10",
        "incomingLines": ["#line60"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Montezuma",
        "id": "#CostaRica_3",
        "startDate": "2016-07-10",
        "endDate": "2016-07-13",
        "incomingLines": ["#line61"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "SantaTeresa",
        "id": "#CostaRica_4",
        "startDate": "2016-07-13",
        "endDate": "2016-07-16",
        "incomingLines": ["#line62"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Tamarindo",
        "id": "#CostaRica_5",
        "startDate": "2016-07-16",
        "endDate": "2016-07-19",
        "incomingLines": ["#line63"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Liberia",
        "id": "#CostaRica_6",
        "startDate": "2016-07-19",
        "endDate": "2016-07-20",
        "incomingLines": ["#line64"],
        // "outgoingLine": "#line49",
    },
    // Nicaragua
    {
        "name": "SanJuan",
        "id": "#Nicaragua_1",
        "startDate": "2016-07-20",
        "endDate": "2016-07-25",
        "incomingLines": ["#line65"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Ometepe",
        "id": "#Nicaragua_2",
        "startDate": "2016-07-25",
        "endDate": "2016-07-29",
        "incomingLines": ["#line66"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Granada",
        "id": "#Nicaragua_3",
        "startDate": "2016-07-29",
        "endDate": "2016-08-01",
        "incomingLines": ["#line67"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "LasPenitas",
        "id": "#Nicaragua_4",
        "startDate": "2016-08-01",
        "endDate": "2016-08-04",
        "incomingLines": ["#line68"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Leon",
        "id": "#Nicaragua_5",
        "startDate": "2016-08-04",
        "endDate": "2016-08-07",
        "incomingLines": ["#line69"],
        // "outgoingLine": "#line49",
    },
    // Honduras
    {
        "name": "Utila",
        "id": "#Honduras_1",
        "startDate": "2016-08-07",
        "endDate": "2016-08-13",
        "incomingLines": ["#line70"],
        // "outgoingLine": "#line49",
    },
    // Guatemala
    {
        "name": "Flores",
        "id": "#Guatemala_1",
        "startDate": "2016-08-13",
        "endDate": "2016-08-16",
        "incomingLines": ["#line71"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "SemucChampey",
        "id": "#Guatemala_2",
        "startDate": "2016-08-16",
        "endDate": "2016-08-19",
        "incomingLines": ["#line72"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "Antigua",
        "id": "#Guatemala_3",
        "startDate": "2016-08-19",
        "endDate": "2016-08-30",
        "incomingLines": ["#line73"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "SanMarcos",
        "id": "#Guatemala_4",
        "startDate": "2016-08-30",
        "endDate": "2016-09-06",
        "incomingLines": ["#line74"],
        // "outgoingLine": "#line49",
    },
    {
        "name": "GuatemalaCity",
        "id": "#Guatemala_5",
        "startDate": "2016-09-06",
        "endDate": "2016-09-07",
        "incomingLines": ["#line75"],
        // "outgoingLine": "#line49",
    }
]
