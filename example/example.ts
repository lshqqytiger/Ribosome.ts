import { transcribe, translateRNA } from "../src";

console.log(
  `입력: CTACGGCAGTCAATTTGCCATC\n출력: ${transcribe(
    "CTACGGCAGTCAATTTGCCATC"
  ).join("")}`
);
console.log(
  translateRNA("GAUGCCGUCAGUUAAACGGUAGGAAUUAGGGAUGCCGUCAGUUAAACGGUAG")
);
