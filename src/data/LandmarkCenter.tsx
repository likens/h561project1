import { FIRE_RED, getRandomNumber } from "../Utils";
import { FIRE_RANKS, FIRE_STATUS } from "./FirePersonnel";
import fireWarning from "../assets/img/napsg/fire-warning.svg";

export const LANDMARK_CENTER_OUTLINE = [
    -86.156992, 39.782069,
    -86.157060, 39.782127,
    -86.157324, 39.781944,
    -86.157250, 39.781881,
    -86.157325, 39.781814,
    -86.157079, 39.781610,
    -86.157004, 39.781664,
    -86.156919, 39.781609,
    -86.156687, 39.781781,
    -86.156772, 39.781851,
    -86.156685, 39.781917,
    -86.156924, 39.782110
]

export const LANDMARK_CENTER_PERSONNEL = [{
    lng: -86.157127,
    lat: 39.781875,
    brng: getRandomNumber(0, 360),
    fname: "Tim",
    lname: "Allens",
    name: "Allens",
    sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
    status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
    loc: "Floor 5, The Landmark Center",
    symbol: "",
    color: FIRE_RED
},
{
    lng: -86.156945,
    lat: 39.781868,
    brng: getRandomNumber(0, 360),
    fname: "Dave",
    lname: "Murphy",
    name: "Murphy",
    sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
    status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
    loc: "Floor 5, The Landmark Center",
    symbol: "",
    color: FIRE_RED
},
{
    lng: -86.157035,
    lat: 39.781810,
    brng: getRandomNumber(0, 360),
    fname: "Ethan",
    lname: "Williams",
    name: "Williams",
    sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
    status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
    loc: "Floor 5, The Landmark Center",
    symbol: "",
    color: FIRE_RED
},
{
    lng: -86.157045,
    lat: 39.781915,
    brng: getRandomNumber(0, 360),
    fname: "Frank",
    lname: "Wood",
    name: "Wood",
    sub: FIRE_RANKS[getRandomNumber(0, FIRE_RANKS.length)],
    status: FIRE_STATUS[getRandomNumber(0, FIRE_STATUS.length)],
    loc: "Floor 5, The Landmark Center",
    symbol: "",
    color: FIRE_RED
},
]

export const LANDMARK_CENTER_WALLS = [
    [
        -86.156992, 39.782069,
        -86.157250, 39.781881,
        -86.157254, 39.781884,
        -86.156995, 39.782071
    ],
    [
        -86.157173, 39.781943,
        -86.157238, 39.782003,
        -86.157235, 39.782005,
        -86.157170, 39.781945
    ],
    [
        -86.157142, 39.782070,
        -86.157139, 39.782072,
        -86.157074, 39.782014,
        -86.157077, 39.782011
    ],
    [
        -86.157250, 39.781881,
        -86.157004, 39.781664,
        -86.157007, 39.781662,
        -86.157254, 39.781878
    ],
    [
        -86.157241, 39.781746,
        -86.157246, 39.781749,
        -86.157170, 39.781805,
        -86.157167, 39.781802
    ],
    [
        -86.156772, 39.781851,
        -86.156857, 39.781786,
        -86.156854, 39.781783,
        -86.156768, 39.781847
    ],
    [
        -86.156854, 39.781783,
        -86.156850, 39.781785,
        -86.156770, 39.781722,
        -86.156773, 39.781719
    ],
    [
        -86.156730, 39.781816,
        -86.156727, 39.781814,
        -86.156808, 39.781753,
        -86.156811, 39.781755
    ],
    [
        -86.156772, 39.781851,
        -86.156770, 39.781853,
        -86.157003, 39.782061,
        -86.157008, 39.782058
    ],
    [
        -86.156977, 39.782038,
        -86.156974, 39.782036,
        -86.156895, 39.782087,
        -86.156897, 39.782088
    ],
    [
        -86.156832, 39.782035,
        -86.156830, 39.782033,
        -86.156911, 39.781979,
        -86.156914, 39.781981
    ],
    [
        -86.156839, 39.781913,
        -86.156753, 39.781970,
        -86.156751, 39.781969,
        -86.156835, 39.781911
    ],
    [
        -86.157004, 39.781664,
        -86.157002, 39.781662,
        -86.156897, 39.781739,
        -86.156900, 39.781741
    ],
    [
        -86.156900, 39.781736,
        -86.156898, 39.781738,
        -86.156826, 39.781678,
        -86.156831, 39.781675
    ]
]

export const LANDMARK_CENTER_DOORS = [
    [
        -86.156862, 39.781701,
        -86.156875, 39.781713,
        -86.156869, 39.781715,
        -86.156857, 39.781705
    ]
]

export const LANDMARK_CENTER_WINDOWS = [
    [
        -86.156852, 39.781660,
        -86.156838, 39.781670,
        -86.156836, 39.781669,
        -86.156850, 39.781658
    ],
    [
        -86.156885, 39.781635,
        -86.156884, 39.781634,
        -86.156900, 39.781622,
        -86.156901, 39.781623
    ],
    [
        -86.156979, 39.781651,
        -86.156936, 39.781623,
        -86.156939, 39.781620,
        -86.156983, 39.781648
    ]
    
]

export const LANDMARK_CENTER_FIRES = [
    {
        lng: -86.156913,
        lat: 39.781671,
        name: "Fire Detected",
        color: "#e59824",
        symbol: fireWarning,
        scale: 4
    },
    {
        lng: -86.157175,
        lat: 39.781746,
        name: "Fire Detected",
        color: "#e59824",
        symbol: fireWarning,
        scale: 4
    },
    {
        lng: -86.157084,
        lat: 39.781670,
        name: "Fire Detected",
        color: "#e59824",
        symbol: fireWarning,
        scale: 4
    },
    {
        lng: -86.157250,
        lat: 39.781811,
        name: "Fire Detected",
        color: "#e59824",
        symbol: fireWarning,
        scale: 4
    },
    {
        lng: -86.157246,
        lat: 39.781943,
        name: "Fire Detected",
        color: "#e59824",
        symbol: fireWarning,
        scale: 4
    },
    {
        lng: -86.157193,
        lat: 39.781880,
        name: "Fire Detected",
        color: "#e59824",
        symbol: fireWarning,
        scale: 4
    },
    {
        lng: -86.157132,
        lat: 39.781823,
        name: "Fire Detected",
        color: "#e59824",
        symbol: fireWarning,
        scale: 4
    },
    {
        lng: -86.157003,
        lat: 39.781701,
        name: "Fire Detected",
        color: "#e59824",
        symbol: fireWarning,
        scale: 4
    },
]