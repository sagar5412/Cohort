/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
    const temp=function(str){
      return str.toLowerCase().replace(/[^a-z0-9]/gi, "").split('').sort().join('');
      
    }
    console.log(temp(str2));
    console.log(str2);

    return console.log(temp(str1)===temp(str2));
}

isAnagram("spar","rasp@");

// g - global
// i - case insensitive