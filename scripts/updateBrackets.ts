import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch, doc, terminate } from "firebase/firestore";

// 使用前端 Firebase 設定進行初始化
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

// --- 更新後的介面 ---
interface MatchData {
  winner: string;
  score: (number | null)[];
  songImg: (string | null)[];
}

interface Match {
  p1: string;
  p2: string;
  matchdata: MatchData;
}

interface Bracket {
  quarterfinals: Match[];
  semifinals: Match[];
  final: Match;
  champion: string;
}

// --- 更新後的比賽數據 ---
const arcaeaMatchDetails = {
  qf1: { winner: 'Player A', score: [2, 1], songImg: ['img/arcaea/song1.jpg', 'img/arcaea/song2.jpg', 'img/arcaea/song3.jpg'] },
  qf2: { winner: 'Player D', score: [0, 2], songImg: ['img/arcaea/song4.jpg', 'img/arcaea/song5.jpg'] },
  qf3: { winner: 'Player E', score: [2, 0], songImg: ['img/arcaea/song6.jpg', 'img/arcaea/song7.jpg'] },
  qf4: { winner: 'Player H', score: [1, 2], songImg: ['img/arcaea/song8.jpg', 'img/arcaea/song9.jpg', 'img/arcaea/song10.jpg'] },
  sf1: { winner: 'Player A', score: [2, 1], songImg: ['img/arcaea/song11.jpg', 'img/arcaea/song12.jpg', 'img/arcaea/song13.jpg'] },
  sf2: { winner: 'Player H', score: [1, 2], songImg: ['img/arcaea/song14.jpg', 'img/arcaea/song15.jpg', 'img/arcaea/song16.jpg'] },
  f:   { winner: 'Player H', score: [1, 2], songImg: ['img/arcaea/song17.jpg', 'img/arcaea/song18.jpg', 'img/arcaea/song19.jpg'] },
};

const maimaiMatchDetails = {
    qf1: { winner: 'Player J', score: [1, 2], songImg: ['img/maimai/song1.jpg', 'img/maimai/song2.jpg', 'img/maimai/song3.jpg'] },
    qf2: { winner: 'Player K', score: [2, 0], songImg: ['img/maimai/song4.jpg', 'img/maimai/song5.jpg'] },
    qf3: { winner: 'Player N', score: [0, 2], songImg: ['img/maimai/song6.jpg', 'img/maimai/song7.jpg'] },
    qf4: { winner: 'Player O', score: [2, 1], songImg: ['img/maimai/song8.jpg', 'img/maimai/song9.jpg', 'img/maimai/song10.jpg'] },
    sf1: { winner: 'Player K', score: [0, 2], songImg: ['img/maimai/song11.jpg', 'img/maimai/song12.jpg'] },
    sf2: { winner: 'Player N', score: [2, 1], songImg: ['img/maimai/song13.jpg', 'img/maimai/song14.jpg', 'img/maimai/song15.jpg'] },
    f:   { winner: 'Player N', score: [1, 2], songImg: ['img/maimai/song16.jpg', 'img/maimai/song17.jpg', 'img/maimai/song18.jpg'] },
};

const placeholderMatch = { winner: '', score: [null, null], songImg: [null, null, null] };

// --- Main Bracket Data Structure ---
const bracketData: { [key: string]: Bracket } = {
  arcaea: {
    quarterfinals: [
      { p1: 'Player A', p2: 'Player B', matchdata: arcaeaMatchDetails.qf1 },
      { p1: 'Player C', p2: 'Player D', matchdata: arcaeaMatchDetails.qf2 },
      { p1: 'Player E', p2: 'Player F', matchdata: arcaeaMatchDetails.qf3 },
      { p1: 'Player G', p2: 'Player H', matchdata: arcaeaMatchDetails.qf4 },
    ],
    semifinals: [
      { p1: 'Player A', p2: 'Player D', matchdata: arcaeaMatchDetails.sf1 },
      { p1: 'Player E', p2: 'Player H', matchdata: arcaeaMatchDetails.sf2 },
    ],
    final: { p1: 'Player A', p2: 'Player H', matchdata: arcaeaMatchDetails.f },
    champion: 'Player H',
  },
  maimai: {
    quarterfinals: [
        { p1: 'Player I', p2: 'Player J', matchdata: maimaiMatchDetails.qf1 },
        { p1: 'Player K', p2: 'Player L', matchdata: maimaiMatchDetails.qf2 },
        { p1: 'Player M', p2: 'Player N', matchdata: maimaiMatchDetails.qf3 },
        { p1: 'Player O', p2: 'Player P', matchdata: maimaiMatchDetails.qf4 },
    ],
    semifinals: [
        { p1: 'Player J', p2: 'Player K', matchdata: maimaiMatchDetails.sf1 },
        { p1: 'Player N', p2: 'Player O', matchdata: maimaiMatchDetails.sf2 },
    ],
    final: { p1: 'Player K', p2: 'Player N', matchdata: maimaiMatchDetails.f },
    champion: 'Player N',
  },
  chunithm: {
    quarterfinals: Array(4).fill({ p1: 'TBD', p2: 'TBD', matchdata: placeholderMatch }),
    semifinals: Array(2).fill({ p1: 'TBD', p2: 'TBD', matchdata: placeholderMatch }),
    final: { p1: 'TBD', p2: 'TBD', matchdata: placeholderMatch },
    champion: 'TBD',
  },
  'ProjectSakai-jp': {
    quarterfinals: Array(4).fill({ p1: 'TBD', p2: 'TBD', matchdata: placeholderMatch }),
    semifinals: Array(2).fill({ p1: 'TBD', p2: 'TBD', matchdata: placeholderMatch }),
    final: { p1: 'TBD', p2: 'TBD', matchdata: placeholderMatch },
    champion: 'TBD',
  },
  'ProjectSakai-in': {
    quarterfinals: Array(4).fill({ p1: 'TBD', p2: 'TBD', matchdata: placeholderMatch }),
    semifinals: Array(2).fill({ p1: 'TBD', p2: 'TBD', matchdata: placeholderMatch }),
    final: { p1: 'TBD', p2: 'TBD', matchdata: placeholderMatch },
    champion: 'TBD',
  }
};

const updateBrackets = async () => {
  console.log('開始更新 Firestore 中的對戰數據 (使用前端 SDK)...');

  const batch = writeBatch(db);

  for (const gameId in bracketData) {
    const docRef = doc(db, 'tournaments', gameId);
    batch.set(docRef, { bracket: bracketData[gameId] }, { merge: true });
  }

  try {
    await batch.commit();
    console.log('對戰數據已成功更新！');
  } catch (error) {
    console.error('更新數據時發生錯誤：', error);
    throw error;
  }
};

updateBrackets().then(async () => {
  console.log("Bracket data update completed.");
  await terminate(db);
  console.log("Firestore connection terminated.");
}).catch(async error => {
  console.error("Error updating brackets:", error);
  await terminate(db);
  console.log("Firestore connection terminated after error.");
});
