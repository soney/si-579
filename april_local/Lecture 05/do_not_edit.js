/**
 * PROBLEM 1
 */
const p1 = document.getElementById("p1");
if(x === 3) {
    p1.setAttribute("class", "correct");
    p1.textContent = "x is set to 3";
} else {
    p1.setAttribute("class", "incorrect");
    p1.textContent = `x is set to ${x}`;
}


/**
 * PROBLEM 3
 */

const p3 = document.getElementById("p3");
if(lst instanceof Array) {
    if(lst.length === 3) {
        p3.setAttribute("class", "correct");
        p3.textContent = "lst is an array with three items";
    } else {
        p3.setAttribute("class", "incorrect");
        p3.textContent = `lst is an array with ${lst.length} items`;
    }
} else {
    p3.setAttribute("class", "incorrect");
    p3.textContent = `lst is ${lst}`;
}

/**
 * PROBLEM 4
 */

const p4 = document.getElementById("p4");
if(typeof obj === "object") {
    if(Object.keys(obj).length === 2) {
        p4.setAttribute("class", "correct");
        p4.textContent = "obj is an object with two key-value pairs";
    } else {
        p4.setAttribute("class", "incorrect");
        p4.textContent = `obj is an object with ${Object.keys(obj).length} key-value pairs`;
    }
} else {
    p4.setAttribute("class", "incorrect");
    p4.textContent = `obj is ${obj}`;
}

/**
 * PROBLEM 6
 */

const p6 = document.getElementById("p6");
const blueCall = alwaysBlue();
if(blueCall === "blue") {
    p6.setAttribute("class", "correct");
    p6.textContent = "alwaysBlue() returned 'blue'";
} else {
    p6.setAttribute("class", "incorrect");
    p6.textContent = `alwaysBlue() returned ${blueCall}`;
}