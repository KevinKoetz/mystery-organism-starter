const dnaBases = ['A', 'T', 'C', 'G'];

//Returns a random element from an array
const getRandElement = (array) => array[Math.floor(Math.random() * array.length)];

// Returns a random DNA base
const returnRandBase = () => {
  return getRandElement(dnaBases);
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory function to create multiple P. Aequors. Takes a unique identifying number and and array of DNA Bases
const pAequorFactory = (ident,bases) => {
  return {
    specimenNum: ident,
    dna: bases,
    mutate(){
      const indexOfselectedBase = Math.floor(Math.random() * this.dna.length);
      const possibleBases = dnaBases.filter(base => base !== this.dna[indexOfselectedBase]);
      this.dna[indexOfselectedBase] = getRandElement(possibleBases);
    }
  }
}

//Test Factory
const specimenOne = pAequorFactory(1, mockUpStrand());
console.log(specimenOne);
specimenOne.mutate();
console.log(specimenOne);






