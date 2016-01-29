console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

function html(pieces, ...substitutions) {
    var result = pieces[0];
    for (var i = 0; i < substitutions.length; ++i) {
        result += escape(substitutions[i]) + pieces[i + 1];
    }

    return result;
}

function escape(s) {
    return s.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&apos;")
            .replace(/"/g, "&quot;");
}

/*module.exports = function makeImportant(str, rep=str.length) {
    return str + "!".repeat(rep);
};
*/

/*module.exports = function midpoint(low=0, up=1) {
    return (low + up)/2;
};*/

/*module.exports = function average(...args) {
    // what goes here?
    var result = 0;
    args.forEach((value)=>result+=value);
    return result / args.length;
};*/

/*var inputs = process.argv.slice(2);
var result = Math.min(...inputs);
console.log(`The minimum of [${inputs}] is ${result}`);
*/

/*var foot = {
    kick: function () {
        this.yelp = "Ouch!";
        setImmediate(()=>console.log(this.yelp));
    }
};
foot.kick();
*/

/*var inputs = process.argv.slice(2);
var result = inputs.map(name=>name.slice(0,1)).reduce((all, current)=>all+=current);
console.log(`[${inputs}] becomes "${result}"`);
*/

//console.log(`Hello, ${process.argv[2]}!\nYour name lowercased is "${process.argv[2].toLowerCase()}".`);