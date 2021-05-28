const MysteryOrganism = {
//All available DNA Bases
dnaBases: ['A', 'T', 'C', 'G'],

//Returns a random element from an array
getRandElement() {(array) => array[Math.floor(Math.random() * array.length)]},

// Returns a random DNA base
returnRandBase() {
  return getRandElement(this.dnaBases);
},

// Returns a random single stand of DNA containing 15 bases
mockUpStrand() {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
},

//Factory function to create multiple P. Aequors. Takes a unique identifying number and an array of DNA Bases representing the P. Aequors DNA
pAequorFactory(ident,bases) {
  return {
    specimenNum: ident,
    dna: bases,
    mutate(){
      const indexOfselectedBase = Math.floor(Math.random() * this.dna.length);
      const possibleBases = dnaBases.filter(base => base !== this.dna[indexOfselectedBase]);
      this.dna[indexOfselectedBase] = getRandElement(possibleBases);
    },
    compareDNA(pAequor){
      let identicalBases = 0;
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === pAequor.dna[i]) identicalBases++;
      }
      let identicalPercentage = identicalBases / this.dna.length * 100;
      console.log(`Specimen #${this.specimenNum} and Speciment #${pAequor.specimenNum} have ${identicalPercentage}% DNA in common.`)
    },
    willLikelySurvive(){
      numGoodBases = this.dna.reduce((acc, el) => {
        return el === 'C' || el === 'G' ? ++acc : acc;
      },0)
      return (numGoodBases / this.dna.length * 100 >= 60)
    }
  }
}
};

module.exports = MysteryOrganism

