import {MysteryOrganism} from "./MysteryOrganism"

//Test Factory

const specimenOne = pAequorFactory(1, mockUpStrand());
const specimenTwo = pAequorFactory(2, mockUpStrand());
console.log(specimenOne);
specimenOne.mutate();
console.log(specimenOne);
console.log(specimenTwo);
specimenOne.compareDNA(specimenTwo);
console.log(specimenOne.willLikelySurvive());
console.log(specimenTwo.willLikelySurvive());