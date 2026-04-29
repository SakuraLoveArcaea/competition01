import { readFileSync } from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));
} catch (error) {
  console.error("Error reading serviceAccountKey.json. Make sure the file exists and is valid JSON.");
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// Sample data structure to update
// Replace this with the actual data source logic
const tournamentData = {
  arcaea: [
    { player: "PlayerA", song1: 9800000, song2: 9900000, song3: 9950000, total: 29650000 },
    { player: "PlayerB", song1: 9500000, song2: 9600000, song3: 9700000, total: 28800000 }
  ],
  maimai: [

      { "player": "ax_eri.a", "song1": 100.9200, "song2": 100.9320, "song3": 100.9793, "total": 302.8313 },
      { "player": "meikungloveayame", "song1": 100.9240, "song2": 100.9761, "song3": 100.8840, "total": 302.7841 },
      { "player": "dontfightthees", "song1": 100.5856, "song2": 100.3488, "song3": 100.7698, "total": 301.7042 },
      { "player": "tailcoat_", "song1": 100.9359, "song2": 101.0000, "song3": 100.9876, "total": 302.9235 },
      { "player": "j4safaq", "song1": 100.9046, "song2": 100.8561, "song3": 100.9700, "total": 302.7307 },
      { "player": "p72toast", "song1": 100.9838, "song2": 100.9242, "song3": 100.9907, "total": 302.8987 },
      { "player": "ying_145", "song1": 100.6017, "song2": 100.5490, "song3": 100.8658, "total": 302.0165 },
      { "player": "crimsrk", "song1": 100.9838, "song2": 101.0000, "song3": 100.9855, "total": 302.9693 },
      { "player": "blackpeaktw", "song1": 100.9516, "song2": 100.9440, "song3": 100.9679, "total": 302.8635 },
      { "player": "loin0201", "song1": 100.9435, "song2": 100.9523, "song3": 100.9246, "total": 302.8204 },
      { "player": "loin0201", "song1": 100.9838, "song2": 100.9880, "song3": 100.9552, "total": 302.9270 },
      { "player": "wei03_29", "song1": 100.8641, "song2": 100.8647, "song3": 100.9614, "total": 302.6902 },
      { "player": "manju9487", "song1": 100.9198, "song2": 100.9880, "song3": 100.9896, "total": 302.8974 },
      { "player": "halcybody", "song1": 100.8643, "song2": 100.8042, "song3": 100.7412, "total": 302.4097 },
      { "player": "maimai__0528", "song1": 101.0000, "song2": 101.0000, "song3": 100.9834, "total": 302.9834 },
      { "player": "bobo08040804", "song1": 101.0000, "song2": 100.9761, "song3": 100.9948, "total": 302.9709 },
      { "player": "jacowo.", "song1": 100.9121, "song2": 100.8370, "song3": 100.9586, "total": 302.7077 },
      { "player": "cadoea", "song1": 100.8608, "song2": 100.8649, "song3": 100.9129, "total": 302.6386 },
      { "player": "blackcatt._72", "song1": 100.9435, "song2": 100.9761, "song3": 100.9690, "total": 302.8886 },
      { "player": "gdren.", "song1": 100.9838, "song2": 100.9880, "song3": 100.9896, "total": 302.9614 },
      { "player": "yangqizhong32", "song1": 91.2342, "song2": 83.8991, "song3": 93.0038, "total": 268.1371 },
      { "player": "strwng", "song1": 100.9838, "song2": 100.9523, "song3": 100.9865, "total": 302.9226 },
      { "player": "moyu5945", "song1": 100.9919, "song2": 101.0000, "song3": 100.9907, "total": 302.9826 },
      { "player": "heter1", "song1": 100.2442, "song2": 100.7365, "song3": 100.9439, "total": 301.9246 }

  ],
  chunithm: [

      { "player": "sean6095", "song1": 1009920, "song2": 1009951, "song3": 1009737, "total": 3029608 },
      { "player": "ric3cat", "song1": 1009905, "song2": 1009961, "song3": 1009561, "total": 3029427 },
      { "player": "xv16_tensixho", "song1": 1009965, "song2": 1009449, "song3": 1009942, "total": 3029356 },
      { "player": "thomas86llk", "song1": 1009645, "song2": 1009922, "song3": 1009721, "total": 3029288 },
      { "player": "meikungloveayame", "song1": 1009960, "song2": 1009217, "song3": 1009942, "total": 3029119 },
      { "player": "dddayo_1", "song1": 1009915, "song2": 1009937, "song3": 1009138, "total": 3028990 },
      { "player": "_justinchang_", "song1": 1009430, "song2": 1009739, "song3": 1009741, "total": 3028910 },
      { "player": "boxes1010", "song1": 1009665, "song2": 1009705, "song3": 1009491, "total": 3028861 },
      { "player": "shoyu.1217", "song1": 1009390, "song2": 1009961, "song3": 1009483, "total": 3028834 },
      { "player": "halcybody", "song1": 1009960, "song2": 1009478, "song3": 1009319, "total": 3028757 },
      { "player": "coffee0929", "song1": 1009355, "song2": 1009251, "song3": 1009917, "total": 3028523 },
      { "player": "magnet_.", "song1": 1009440, "song2": 1009483, "song3": 1009524, "total": 3028447 },
      { "player": "mary_1108_chunithmplayer", "song1": 1009140, "song2": 1009971, "song3": 1009290, "total": 3028401 },
      { "player": "joleehigh", "song1": 1009930, "song2": 1009966, "song3": 1008252, "total": 3028148 },
      { "player": "yukura_0916", "song1": 1008065, "song2": 1009647, "song3": 1008995, "total": 3026707 },
      { "player": "pisces314", "song1": 1009505, "song2": 1009690, "song3": 1007321, "total": 3026516 },
      { "player": "jackyang0623", "song1": 1008350, "song2": 1009145, "song3": 1008076, "total": 3025571 },
      { "player": "lyc_1234", "song1": 1005020, "song2": 1006784, "song3": 1002370, "total": 3014174 }

  ],
  game4: []
};

async function updateData() {
  const games = ['arcaea', 'maimai', 'chunithm', 'game4'];
  const now = new Date().toISOString();

  for (const game of games) {
    const records = tournamentData[game] || [];
    
    if (records.length > 0) {
      // Sort records by total descending
      records.sort((a, b) => b.total - a.total);
      
      const docRef = db.collection('tournaments').doc(game);
      await docRef.set({
        records: records,
        lastUpdated: now
      });
      console.log(`Updated data for ${game} with ${records.length} records.`);
    } else {
      console.log(`No data for ${game}, skipping.`);
    }
  }
}

updateData().then(() => {
  console.log("Data update completed.");
  process.exit(0);
}).catch(error => {
  console.error("Error updating data:", error);
  process.exit(1);
});
