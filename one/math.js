function add(a,b){
    return a + b;
}
function sub(a,b){
    return a - b;
}

// use object function to stop override
// module.exports = add;
// module.exports = sub;
//-----------------------------------


// module.exports =  {
//      add,
//      sub,
// }

// or
exports.mul = (a,b) => a*b;
exports.div = (a,b) => a/b;