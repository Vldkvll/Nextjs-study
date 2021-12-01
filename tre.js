

 function howMuchILoveYou(petals) {

  
  const arr = ['I love you', 'a little', 'a lot', 'passionately', 'madly', 'not at all']
  console.log('file: tre.js ~ line 7 ~ arr', arr.length)

let p = petals-1
console.log('file: tre.js ~ line 9 ~ p', p)

  let restDivide =  p%arr.length
  console.log('file: tre.ts ~ line 10 ~ restDivide', restDivide)

  return  arr[restDivide]
  // return ["I love you","a little","a lot","passionately","madly","not at all"][(petals -1) % 6];
}

// howMuchILoveYou(32)
console.log('file: tre.js ~ line 16 ~  ', howMuchILoveYou(6))
console.log('file: tre.js ~ line 16 ~  ', howMuchILoveYou(5))
console.log('file: tre.js ~ line 16 ~  ', howMuchILoveYou(4))
console.log('file: tre.js ~ line 16 ~  ', howMuchILoveYou(3))
console.log('file: tre.js ~ line 16 ~  ', howMuchILoveYou(32))
console.log('file: tre.js ~ line 16 ~  ', howMuchILoveYou(1))
