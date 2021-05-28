// dnaBases global, so we can use it inside mutate()
const dnaBases = ['A', 'T', 'C', 'G'];

// Returns a random DNA base
const returnRandBase = () => {
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory function to create pAequors
const pAequorFactory = (specimenNum, dnaStrand) => {
  return {
    specimenNum: specimenNum,
    dna: dnaStrand,

    //Picks a random base inside the dna and changes it against a different base from dnaBases
    mutate () {
      //Pick a random element from dna
      const index = Math.floor(Math.random()*this.dna.length);
      const oldValue = this.dna[index];
      //Check which dnaBases we can use
      const possibleBases = dnaBases.filter(element => oldValue !== element);
      const newValue = possibleBases[Math.floor(Math.random() * possibleBases.length)];
      //Change the element to a random new possible element
      this.dna[index] = newValue;
    },

    //Returns the percentage of bases which are the same and on equal positions
    compareDNA(pAequor) {
      //Number of Bases that are equal and on the same position
      let equalBases = 0;
      //Go through all Bases and compare with the Base on the same position in the input pAequor strand
      for (let i = 0; i < pAequor.dna.length; i++){
        //Increment equalBases if they are the same
        if(pAequor.dna[i] === this.dna[i]) {
          equalBases++;
        }
      }
      let percentage = equalBases/pAequor.dna.length*100;
      console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common`);
      //Return percentage to be used when finding the pAequor closest related to another
      return percentage;
    },

    //Returns true if at least 60% of the bases are C or G
    willLikelySurvive(){
      //Reduce the DNA Strand to a single percentage Value. 
      const percentage = this.dna.reduce((percentage, base) => {
        //Convert the percentage Value to the number of bases that are C or G
        goodBases = percentage * this.dna.length / 100;
        //If base is C or G, add a good Base
        if(base === 'C' || base === 'G') goodBases++;
        //Calculate the percentage of bases that are C or G
        return goodBases/this.dna.length*100;
      },0)
      return (percentage >= 60)    
    },

    //Returns the complement DNA strand. Swaps A<->T and C<->G.
    complementStrand(){
      return this.dna.map(base =>
      //Switch A to T
      base === 'A' ? 'T' : 
      //Switch T to A
      base === 'T' ? 'A' : 
      //Switch C to G
      base === 'C' ? 'G' : 
      //Switch G to C, or return undefined if the Base is "something" different
      base === 'G' ? 'C' : undefined)     
    }
  }
}

//Create 30 pAequors with random Strands
let pAequors = [];
while (pAequors.length < 30) {
  let pAequor = pAequorFactory(pAequors.length, mockUpStrand());
  if(pAequor.willLikelySurvive()) pAequors.push(pAequor);
}

//Returns the most related Pair of pAequors out of a sample
const getMostRelated = (pAequors) => {
  //The Most Related Pair of pAequors are saved in this object.
  const mostRelated = {
    firstPAequor: pAequors[0],
    secondPAequor: pAequors[1],
    percentage: pAequors[0].compareDNA(pAequors[1])
  }

  //Go through all pAequors and compare them with each other
  for(let i = 0; i < pAequors.length; i++){
    //We only need to compare against each pAequor with a higher index
    for(let j = i + 1; j < pAequors.length; j++)
    //If the compared pAequors have a higher percentage, save them as the new best.
      if(pAequors[i].compareDNA(pAequors[j]) > mostRelated.percentage){
        mostRelated.firstPAequor = pAequors[i];
        mostRelated.secondPAequor = pAequors[j];
        mostRelated.percentage = pAequors[i].compareDNA(pAequors[j]);
      }
  }
  console.log(`Specimen #${mostRelated.firstPAequor.specimenNum} and specimen #${mostRelated.secondPAequor.specimenNum} are most related and have ${mostRelated.percentage}% DNA in common`)
  return mostRelated; 
}


console.log(getMostRelated(pAequors));