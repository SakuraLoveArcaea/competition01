// 此腳本旨在使用 Node.js 執行以填充 Firestore 資料庫。
// 執行前，請確保您已在專案中安裝 firebase: npm install firebase
// 執行指令: node ./scripts/update16result.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, terminate } from "firebase/firestore";

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
            {player: "XiaoHong", score: [null, null, null]},
            {player: "CLH", score: [null, null, null]},
            {player: "爺家森測試", score: [null, null, null]},
            {player: "關注永雛塔菲謝謝喵", score: [null, null, null]},
            {player: "拉格蘭我婆", score: [null, null, null]},
            {player: "郝鎊謗", score: [null, null, null]},
            {player: "三木", score: [null, null, null]},
            {player: "Bot14", score: [null, null, null]},
            {player: "七尾", score: [null, null, null]},
            {player: "咖啡", score: [null, null, null]},
            {player: "想睡覺", score: [null, null, null]},
            {player: "niniagibye", score: [null, null, null]}
        ],
    },
    maimai: {
        players: [
            {player: "manju9487", score: [101.0000, 100.9499, 100.9351]},
            {player: "maimai__0528", score: [null, null, null]},
            {player: "moyu5945", score: [null, null, null]},
            {player: "bobo0804", score: [null, null, null]},
            {player: "kkkmr45322", score: [null, null, null]},
            {player: "crimsrk", score: [null, null, null]},
            {player: "foam_0.0", score: [null, null, null]},
            {player: "gdren.", score: [null, null, null]},
            {player: "strwng", score: [null, null, null]},
            {player: "blackcatt._72", score: [null, null, null]},
            {player: "loin0201", score: [null, null, null]},
            {player: "tailcoat_", score: [null, null, null]},
            {player: "p72toast", score: [null, null, null]},
            {player: "blackpeaktw", score: [null, null, null]},
            {player: "ax_eri.a", score: [null, null, null]},
            {player: "stitch_0412", score: [null, null, null]}
        ],
    },
    chunithm: {
        players: [
            {player: "magnet_.", score: [1009456, 1009832, 1008840]},
            {player: "halcybody", score: [null, null, null]},
            {player: "thaumaturxy", score: [null, null, null]},
            {player: "sean6095", score: [null, null, null]},
            {player: "ric3cat", score: [null, null, null]},
            {player: "xv16_tensixho", score: [null, null, null]},
            {player: "thomas86llk", score: [null, null, null]},
            {player: "meikungloveayame", score: [null, null, null]},
            {player: "dddayo_1", score: [null, null, null]},
            {player: "coffee0929", score: [null, null, null]},
            {player: "_justinchang_", score: [null, null, null]},
            {player: "boxes1010", score: [null, null, null]},
            {player: "shoyu.1217", score: [null, null, null]},
            {player: "mary_1108_chunithmplayer", score: [null, null, null]},
            {player: "joleehigh", score: [null, null, null]},
            {player: "lyc_1234", score: [null, null, null]}
        ],
    },
    'ProjectSakai-jp': {
        players: [
            {player: "luna_with_clh", score: [null, null, null, null]},
            {player: "blackcatt._72", score: [null, null, null, null]}
        ],
    },
    'ProjectSakai-in': {
        players: [
            {player: "blackcatt._72", score: [null, null, null, null, null]},
            {player: "rumi_0527", score: [null, null, null, null, null]},
            {player: "jackyang0623", score: [null, null, null, null, null]},
            {player: "105269", score: [null, null, null, null, null]},
            {player: "ye_yu_940520", score: [null, null, null, null, null]},
            {player: "dddayo_1", score: [null, null, null, null, null]},
            {player: "pisces314", score: [null, null, null, null, null]},
            {player: "n0359._86780", score: [null, null, null, null, null]},
            {player: "lyc_1234", score: [null, null, null, null, null]},
            {player: "choroowo", score: [null, null, null, null, null]},
            {player: "samtsai0428", score: [null, null, null, null, null]}
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
                if (scores.every(s => s !== null && s !== undefined)) {
                    totalScore = scores.reduce((sum, current) => sum + current, 0);
                }
                return { ...player, totalScore };
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
                const { totalScore, ...playerData } = player;
                return { ...playerData, rank: index + 1 };
            });

            console.log(`準備上傳 ${gameId} 的資料...`);
            const docRef = doc(collectionRef, gameId);
            promises.push(setDoc(docRef, { players: processedPlayers }));
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