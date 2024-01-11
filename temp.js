'use strict';

/*
Given an array of forcasted temperatures, the thermometer displays a string with these temperatures.
Example : [17, 21, 23] will print "...17deg in 1 days, 21deg in 2 days..."
Create a funciton printForcast which takes in temperature array as a parameter and logs a string like mentioned above
to the console.
*/

function printForcast(temp) {
    let s = '';
    for (let i = 0; i < temp.length; i++){
    //        console.log(`...${temp[i]}deg in ${i + 1}days,...`);
        s += `...${temp[i]}deg in ${i + 1}days...`;
    }
    return s;
}

console.log(printForcast([17, 21, 23]));

