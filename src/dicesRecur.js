export class Dices {

  dicesRecursive(
    // Initial Variable
    totalDices, totalFace, score,
    
    // State
    currentDices,
    parentFace,
    sumCurrentScore,

    // Keep
    resultItem,
    resultList
    ) {



    const remainScore = score - sumCurrentScore;
    const remainDices = totalDices - currentDices + 1; // นับตัวเองด้วย
    const avg = remainScore / remainDices;
    
    // Last Dices         
    if (currentDices >= totalDices
      && (remainScore > 0 && remainScore <= totalFace)
      && remainScore >= parentFace) {
     
      // Keep Result
      resultItem.push(remainScore);
      resultList.push(resultItem);
        
      return;
    }    

    for (let iFace = parentFace; iFace <= Math.floor(avg) && Math.ceil(avg) <= totalFace; iFace++) {
      
      let newResultItem = [...resultItem, iFace];      
      this.dicesRecursive(totalDices, totalFace, score, 
        currentDices+1, iFace, sumCurrentScore + iFace, 
        newResultItem, resultList);
    }
  }

  dices(score) {
    const totalDices = 3;
    const totalFace = 6;

    let resultList = [];
    this.dicesRecursive(totalDices, totalFace, score,
      1, 1, 0, 
      [], resultList
      );

    return resultList;
  }

  collectResult(data) {
    let result = [];
    data.forEach((val, idx) => {
      const line = (idx+1) + '. ' + val.join(' + ');
      result.push(line);
      
    });

    return result;
  }

  printResult(data) {
    const result = (data.length === 0) ? ["Imposible"] : this.collectResult(data);
    
    result.forEach((val, idx) => {
      console.log(val);
    })     
  }
  
}

let d = new Dices();
let result = d.dices(8);
d.printResult(result);
