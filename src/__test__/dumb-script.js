const frameArr = [];

const random = () => Number(Math.random().toFixed(2));
const truthy = () => Math.floor(Math.random()*2) ? true : false;
const p = (arr) => {
  const mood = Math.max(...arr.map(f => f.moodScore));
  const att = Math.max(...arr.map(f => f.attentionScore));
  const ppl = Math.max(...arr.map(f => f.amountOfPeople));
  return {moodPeak: mood, attentionPeak: att, peoplePeak: ppl};
};
const v = (arr) => {
  const mood = Math.min(...arr.map(f => f.moodScore));
  const att = Math.min(...arr.map(f => f.attentionScore));
  const ppl = Math.min(...arr.map(f => f.amountOfPeople));
  return {moodValley: mood, attentionValley: att, peopleValley: ppl};
};
const ave = (arr) => {
  const mood = +(arr.map(f => f.moodScore).reduce((a,b) => a+b)/arr.length).toFixed(2);
  const att = +(arr.map(f => f.attentionScore).reduce((a,b) => a+b)/arr.length).toFixed(2);
  const ppl = Math.round(arr.map(f => f.amountOfPeople).reduce((a,b) => a+b)/arr.length);
  return {moodAverage: mood, attentionAverage: att, peopleAverage: ppl};
};

for (let i=0; i<15; i++) {
  frameArr.push({
    attentionScore: random(),
    moodScore: random(),
    amountOfPeople: Math.round(Math.random()*10),
    isImportantAttention: truthy(),
    isImportantMood: truthy(),
    isImportantPeople: truthy()
  });
}

const mockdata = {
  framesArray: frameArr,
  peaks: p(frameArr),
  valleys: v(frameArr),
  averages: ave(frameArr)
};

console.log(mockdata);