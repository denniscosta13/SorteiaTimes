const shuffle = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 
  
// Usage 
const myArray = ['Dennis','Caique','Will', 'Luan', 'Edilson', 'Lucas', 'Gustavo','Japa', 'Pedrinho', 'Romulo', 'Isaias', 'Viguinho', 'Leo']; 
const shuffledArray = shuffle(myArray); 

// console.log(shuffledArray);


function splitArray(arr, chunkSize) {
  let result = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    let chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
}

myArraySplit = splitArray(shuffledArray,5)

console.log(myArraySplit.length)