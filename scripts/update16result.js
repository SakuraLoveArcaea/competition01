// 此腳本旨在使用 Node.js 執行以填充 Firestore 資料庫。
// 執行前，請確保您已在專案中安裝 firebase: npm install firebase
// 執行指令: node ./scripts/update16result.js

import {initializeApp} from "firebase/app";
import {getFirestore, collection, doc, setDoc, terminate} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCM0hQuTsJZDEW3FmoEC5FsqUNTOMH57ws",
    authDomain: "competition01-507c6.firebaseapp.com",
    projectId: "competition01-507c6",
    storageBucket: "competition01-507c6.firebasestorage.app",
    messagingSenderId: "907579028768",
    appId: "1:907579028768:web:e4a1b831d5806817891345",
    measurementId: "G-W67QGMJB92"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 要上傳到 Firestore 的資料。`totalScore` 已被移除，將在客戶端計算。
const top16ResultsData = {
    arcaea: {
        players: [
            {player: "XiaoHong", score: [10000987, 9994687, 10001198]},
            {player: "CLH", score: [9991102, 9984518, 10001200]},
            {player: "爺家森測試", score: [9991100, 10001448, 9997119]},
            // {player: "關注永雛塔菲謝謝喵", score: [1000996, 9943780, 9956173]},
            {player: "關注永雛塔菲謝謝喵", score: [9976239, 9940375, 9992999]},
            {player: "拉格蘭我婆", score: [9981193, 9981082, 10001202]},
            // {player: "郝鎊謗", score: [9986129, 9947171, 9993009]},
            // {player: "郝鎊謗", score: [9971297, 9974293, 9988920]},
            {player: "郝鎊謗", score: [9991079, 9981060, 9988904]},
            {player: "三木", score: [null, null, null]},
            {player: "Bot14", score: [9981170, 9957320, 9972537]},
            {player: "七尾", score: [9961371, 9960733, 9972513]},
            {player: "咖啡", score: [null, null, null]},
            {player: "想睡覺", score: [null, null, null]},
            {player: "niniagibye", score: [null, null, null]}
        ],
    },
    maimai: {
        players: [
            {player: "manju9487", score: [101.0000, 100.9499, 100.9351]},
            {player: "maimai__0528", score: [100.9808, 100.9641, 100.9666]},
            {player: "moyu5945", score: [null, null, null]},
            {player: "bobo0804", score: [101.0000, 100.9857, 100.9833]},
            {player: "kkkmr45322", score: [100.9808, 100.9857, 100.9684]},
            // {player: "crimsrk", score: [100.9318, 100.9427, 81.5167]},
            // {player: "crimsrk", score: [101.0000, 91.9386, 100.9369]},
            {player: "crimsrk", score: [100.9772, 100.9857, 100.9333]},
            {player: "foam_0.0", score: [100.9545, 100.9785, 100.9619]},
            {player: "gdren.", score: [101.0000, 100.9857, 100.9666]},
            {player: "strwng", score: [101.0000, 100.9857, 100.9833]},
            {player: "blackcatt._72", score: [100.9772, 100.9642, 101.0000]},
            // {player: "loin0201", score: [100.9772, 100.9713, 100.9184]},
            {player: "loin0201", score: [100.9545, 100.9857, 100.9500]},
            // {player: "tailcoat_", score: [100.9581, 100,9714,100.8821]},
            {player: "tailcoat_", score: [100.9545, 100.9427, 100.9833]},
            {player: "p72toast", score: [null, null, null]},
            {player: "blackpeaktw", score: [null, null, null]},
            {player: "ax_eri.a", score: [100.8935, 100.8067, 100.9851]},
            {player: "stitch_0412", score: [null, null, null]}
        ],
    },
    chunithm: {
        players: [
            {player: "magnet_.", score: [1009456, 1009832, 1008840]},
            {player: "halcybody", score: [1009740, 1009742, 1008803]},
            {player: "thaumaturxy", score: [1009953,1009488,1009206]},
            // {player: "sean6095", score: [1008602, 1009677, 1007286]},
            {player: "sean6095", score: [1008955, 1009192, 1009550]},
            // {player: "ric3cat", score: [1009459,1005850,1008962]},
            {player: "ric3cat", score: [1009315,1009729,1008677]},
            {player: "xv16_tensixho", score: [null, null, null]},
            // {player: "thomas86llk", score: [1009506,1009703,1009382]},
            {player: "thomas86llk", score: [1009333,1009699,1009815]},
            // {player: "meikungloveayame", score: [1009495,1007946,10007421]},
            {player: "meikungloveayame", score: [1009891,1009463,1008475]},
            {player: "dddayo_1", score: [null, null, null]},
            // {player: "coffee0929", score: [1007636, 1006932, 1005766]},
            {player: "coffee0929", score: [1008962, 1007822, 1005942]},
            {player: "_justinchang_", score: [null, null, null]},
            {player: "boxes1010", score: [1009715, 1009415, 1007953]},
            {player: "shoyu.1217", score: [1008141, 1006842,1007744]},
            {player: "mary_1108_chunithmplayer", score: [1009301, 1009866, 1007454]},
            // {player: "joleehigh", score: [1009884, 1008170, 1004372]},
            {player: "joleehigh", score: [1009441, 1009458, 1006178]},
            {player: "lyc_1234", score: [null, null, null]}
        ],
    },
    'ProjectSakai-jp': {
        players: [
            {player: "luna_with_clh", score: [5342, null, null, null]},
            {player: "blackcatt._72", score: [5366, null, null, null]}
        ],
    },
    'ProjectSakai-in': {
        players: [
            {player: "blackcatt._72", score: [3609, 3591, 4455, 4812, 4364]},
            {player: "rumi_0527", score: [3609, 3591, 4454, 4857, 4365]},
            {player: "jackyang0623", score: [null, null, null, null, null]},
            {player: "105269", score: [3609, 3579, 4445, null, 4324]},
            {player: "ye_yu_940520", score: [3598, 3544, 4439, 4784, 4338]},
            {player: "dddayo_1", score: [3583, 3555, 4424, 4856, 4349]},
            {player: "pisces314", score: [3583, 3470, 4394, null, 4249]},
            {player: "n0359._86780", score: [3565, null, null, null, null]},
            {player: "lyc_1234", score: [null, null, null, null, null]},
            {player: "choroowo", score: [null, null, null, null, null]},
            {player: "samtsai0428", score: [3587, 3582, 4435, 4834, 4335]}
        ],
    },
};

async function updateFirestore() {
    console.log("開始更新 Firestore 的十六強成績...");
    const collectionRef = collection(db, 'top16results');

    const promises = [];
    for (const gameId in top16ResultsData) {
        if (Object.prototype.hasOwnProperty.call(top16ResultsData, gameId)) {
            const gameData = top16ResultsData[gameId];

            // 1. 為每位玩家計算總分
            const playersWithTotalScore = gameData.players.map(player => {
                const scores = player.score;
                let totalScore = null;
                if (scores) {
                    totalScore = scores.reduce((sum, current) => (sum ? sum : 0) + current, 0);
                }
                return {...player, totalScore};
            });

            // 2. 根據總分排序 (高分在前，無分在後)
            playersWithTotalScore.sort((a, b) => {
                if (b.totalScore === null && a.totalScore === null) return 0;
                if (b.totalScore === null) return -1;
                if (a.totalScore === null) return 1;
                return b.totalScore - a.totalScore;
            });

            // 3. 分配 rank 並移除 totalScore
            const processedPlayers = playersWithTotalScore.map((player, index) => {
                const {totalScore, ...playerData} = player;
                return {...playerData, rank: index + 1};
            });

            console.log(`準備上傳 ${gameId} 的資料...`);
            const docRef = doc(collectionRef, gameId);
            promises.push(setDoc(docRef, {players: processedPlayers}));
        }
    }

    try {
        await Promise.all(promises);
        console.log("所有遊戲資料已成功更新至 Firestore。");
    } catch (error) {
        console.error("更新 Firestore 時發生錯誤:", error);
    } finally {
        console.log("正在關閉 Firestore 連線...");
        await terminate(db);
        console.log("連線已關閉，程序即將結束。");
    }
}

updateFirestore();