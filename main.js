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

const pAequorFactor = (number, array) => {
  return {
    specimenNum: number,
    dna: array,
    mutate () {
      //Pick a random element from dna
      const index = Math.floor(Math.random()*this.dna.length);
      const oldValue = this.dna[index];
      //Check which dnaBases we can use
      /*if(oldValue === 'A') {
        this.dna[index] = 'T';
      } else if(oldValue === 'T'){
        this.dna[index] = 'C';
      } else if(oldValue === 'C'){
        this.dna[index] = 'G';
      }else if(oldValue === 'G'){
        this.dna[index] = 'A';
      */
      const possibleBases = dnaBases.filter(element => oldValue !== element);
      const newValue = possibleBases[Math.floor(Math.random() * possibleBases.length)];
      //Change the element to a random new possible element
      this.dna[index] = newValue;
    },
    compareDNA(pAequor) {
      let numBase = 0;
      for (let i = 0; i < pAequor.dna.length; i++){
        if(pAequor.dna[i] === this.dna[i]) {
          numBase += 1;
        }
      }
      let percentage = Math.floor(numBase/pAequor.dna.length*100);
      console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common`);
      return percentage;
    },
    willLikelySurvive(){
      /*
      const percentage = this.dna.reduce((numBase, ele) => {
        numBase = numBase * this.dna.length / 100;
        if(ele === 'C' || ele === 'G') numBase++;
        return numBase/this.dna.length*100;
      }, 0)
      return (percentage >= 60)
      */
      
      let numBase = 0;
      for (let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === 'C') {
          numBase += 1;
        }
        if(this.dna[i] === 'G') {
          numBase += 1;
        }
      }
      return (numBase/this.dna.length*100 >= 60)
     
    },
    complementStrand(){
      return this.dna.map(el => 
      el === 'A' ? 'T' : 
      el === 'T' ? 'A' : 
      el === 'C' ? 'G' : 
      el === 'G' ? 'C' : undefined)

      /*
      const complementStrand = [];
      let strand1 = this.dna;
      for (let i = 0; i < strand1.length; i++) {
        switch(strand1[i]){
          case 'A':
            complementStrand.push('T')
            break;
          case 'T':
            complementStrand.push('A')
            break;
          case 'C':
            complementStrand.push('G')
            break;
          case 'G':
            complementStrand.push('C')
            break;
        }
        
        if(strand1[i] === 'A') {
          complementStrand.push('T')
        } else if (strand1[i] === 'T') {
          complementStrand.push('A')
        } else if (strand1[i] === 'G') {
          complementStrand.push('C')
        } else if (strand1[i] === 'C') {
          complementStrand.push('G')
        }
        
      }
      return complementStrand;*/
      
    }
  }
}

let mutantArray = [];
while (mutantArray.length < 30) {
  let mutant = pAequorFactor(mutantArray.length, mockUpStrand());
  if(mutant.willLikelySurvive()) mutantArray.push(mutant);
}


const mostRelated = (array) => {
  let comparisons = []; 
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array.length; j++)
      if(i !== j){
        comparisons.push({
          first: array[i],
          second: array[j],
          percentage: (array[i].compareDNA(array[j]))
        }
        )
      }
  }
  let sortedComparisons = comparisons.sort(
    (first, second) => {
      if (second.percentage < first.percentage) {
        return -1;
      }
      if (second.percentage > first.percentage) {
        return 1;
      }
      // a must be equal to b
      return 0;
    }
  )
  //console.log(sortedComparisons);
  return sortedComparisons[0]; 
}


//Tests

const pAequor1 = pAequorFactor(1, mockUpStrand());
const pAequor2 = pAequorFactor(2, mockUpStrand());
const pAequor3 = pAequorFactor(3, mockUpStrand());
const pAequor4 = pAequorFactor(4, mockUpStrand());

pAequor1.dna = ['A', 'A', 'A', 'A']; 
pAequor2.dna = ['G', 'G', 'G', 'G']; 
pAequor3.dna = ['G', 'G', 'G', 'G']; 
pAequor4.dna = ['G', 'G', 'G', 'G']; 

const testSample = [pAequor1, pAequor2, pAequor3, pAequor4];
console.log(mostRelated(testSample));

/*
const pAequor1 = pAequorFactor(1, mockUpStrand());
const pAequor2 = pAequorFactor(2, mockUpStrand());


pAequor1.dna = ['A', 'G', 'C', 'T']; 
pAequor2.dna = ['A', 'G', 'C', 'T']; 
pAequor1.compareDNA(pAequor2); //Should print 100% common DNA
pAequor2.dna = ['A', 'G', 'A', 'A']; 
pAequor1.compareDNA(pAequor2); //Should print 50% common DNA

pAequor1.dna = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']; 
console.log(pAequor1.willLikelySurvive());
pAequor1.dna = ['C', 'C', 'C', 'C', 'C', 'C', 'A', 'A', 'A', 'A']; 
console.log(pAequor1.willLikelySurvive());
pAequor1.dna = ['G', 'G', 'G', 'G', 'G', 'G', 'A', 'A', 'A', 'A']; 
console.log(pAequor1.willLikelySurvive());
*/
/*
console.log(mutantArray.length);
for(const mutant of mutantArray){
  console.log(mutant.willLikelySurvive());
}*/
/*
const pAequor1 = pAequorFactor(1, mockUpStrand());
pAequor1.dna = ['A', 'G', 'C', 'T']; 
console.log(pAequor1.complementStrand()); //T C G A
*/