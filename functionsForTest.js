
module.exports.ucFirst = function (name){
	return name.charAt(0).toUpperCase() + name.slice(1);
}

module.exports.truncate = function (str, maxLength) {
	var result = str;

	if(str.length > maxLength){
		result = result.slice(0, maxLength - 3) + '...';
	}

	return result;
}
module.exports.ObjSum = function (obj) {
	var sum = 0;
	for (var o in obj) {
		sum += obj[o];
	};
	return sum;
}


module.exports.camelize = function (str){
  var array = str.split('-');
  array = array.map(function(el, i){
  	if (i===0){
  		return el;
  	} else
    return el.charAt(0).toUpperCase() + el.slice(1);
  });
  return array.join('');
}

module.exports.aclean = function (arr){
	var result=[];
	for (var i=0;i<arr.length;i++){
		if(!ArrayContainceA(result, arr[i])){
			result.push(arr[i]);
		}
	}
	return result;


 function  ArrayContainceA(arr, str){
	var carr = arr.filter(el=>el.length===str.length);
	var el = carr.join('').toLowerCase();
	str = str.toLowerCase();
	var matchers = 0;
	for(var i=0;i<str.length;i++){
		var j = el.indexOf(str[i])
		if(j<0){
			break;
		} else {
			el = el.slice(0, j) + el.slice(j+1);
			/*console.log(str[i]);
			
			console.log(el);*/
			matchers ++;
		}
	}
	return matchers==str.length;
	}
}
module.exports.intersection = function (arr1, arr2) {
  return arr1.filter(function(item) {
    return arr2.indexOf(item) != -1;
  });
}

module.exports.getSums = function (array){
	var newArray =[];
	var res = array.reduce(function(sum, current, iter){
		newArray[iter] = sum + current;
		return sum + current;
	}, 0);
	return newArray;
}

module.exports.timeMeasure = function (){

	var arr = [];
	for (var i = 0; i < 100; i++) arr[i] = 0;

	function walkIn(arr) {
	  for (var key in arr) arr[key]++;
	}

	function walkLength(arr) {
	  for (var i = 0; i < arr.length; i++) arr[i]++;
	}

	function bench(f) {
	  var date = new Date();
	  for (var i = 0; i < 10000; i++) f(arr);
	  return new Date() - date;
	}
	console.time("All Benchmarks");

	// bench для каждого теста запустим много раз, чередуя
	var timeIn = 0,
	  timeLength = 0;
	for (var i = 0; i < 10; i++) {
	  timeIn += bench(walkIn);
	  timeLength += bench(walkLength);
	}

	console.log( 'Время walkIn: ' + timeIn + 'мс' );
	console.log( 'Время walkLength: ' + timeLength + 'мс' );
	console.timeEnd("All Benchmarks");
}


module.exports.sumClosures = function (num1) {
	return function(num2){
		return num1+num2;
	};
}

module.exports.makeBuffer = function (){
	var buf = '';
	function buffer(value){
		if (arguments.length ==0 ){
			return buf;
		} 
		buf += value;
	};
	buffer.clear = function(){
		buf = '';
	}
	return buffer;
}

module.exports.byField = function (field){
	return function(a, b) {
      return a[field] > b[field] ? 1 : -1;
    }
}

module.exports.filter = function (arr, callback){
	return arr.filter(callback);
}
module.exports.inBetween = function (a, b){
	return function(el){
		return ((el >= a)&&(el<=b));
	};
}
module.exports.inArray = function (arr){
	//console.log(arr);
	return function(el){
		//console.log(el);
		for(var i=0;i<arr.length;i++){
			if(arr[i]==el)
				return true;
		}
		return false;
	};
}


module.exports.sum = function (a) {

  var currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}


module.exports.Calculator = function (){
  this.methods = {
    '-' : function(a, b){return a - b;}
    ,'+' : function(a, b){return a + b;}
  };
  this.calculate = function(str){
    var s = str.split(' ');
    return this.methods[s[1]](Number(s[0]), Number(s[2]));
  };

  this.addMethod = function(method, callback){
    this.methods[method] = callback
  };
}

module.exports.User =function (fullName) {
  this.fullName = fullName;
  Object.defineProperties(this, {
  	firstName: {
	    get: function() {
	      return this.fullName.split(" ")[0];
	    }
	    ,set : function(value){
	    	this.fullName = value + " " + this.lastName;
	    }
	  }
		,lastName : {
	    get: function() {
	      return this.fullName.split(" ")[1];
	    }
	    ,set : function(value){
	    	this.fullName = this.firstName + " " + value;
	    }
	  }
	});
}

module.exports.sumArgs = function(){
	arguments.reduce = [].reduce;
	return arguments.reduce(function(a, b){
		return a + b;
	});
}

module.exports.applyAll = function(callback){
	return callback.apply(this, [].slice.call(arguments, 1));
}


module.exports.makeCaching = function(callback){
	var cache = {};
  return function(){
    if (cache[arguments[0]]){
    	
    } else {
    	cache[arguments[0]] = callback.apply(this, arguments);
    }
    return Number(cache[arguments[0]]);
  }
}

module.exports.formatDate = function(value){
	var date;
	if((typeof value) == 'number'){
		date = new Date(value*100);
	}else
	if ((typeof value) == 'string') {
		date = new Date(value);
	} else
	if (Array.isArray(value)){
		date = new Date(value[0], value[1]+1, value[2]);
	} else
	if(value.getDate){
		date = value;
	}
	return date.toLocaleString("ua", {day: '2-digit', month: '2-digit', year: '2-digit'});
}

module.exports.printNumbersInterval = function (){
	var i=1;
	setTimeout(function timeOut(){
		console.log(i);
		if (i<20) setTimeout(timeOut, 100);
		i++;
	}, 100);
}


module.exports.delay = function (f, time){
  return function(){
    var savedThis = this;
    var args = [].slice.call(arguments, 0);
    setTimeout(function(){
      f.apply(savedThis, args);
    }, time);
  }
}

module.exports.debounce= function (f, ms) {
  var state = null;
  var COOLDOWN = 1;
  return function() {
    if (state) return;

    f.apply(this, arguments);

    state = COOLDOWN;

    setTimeout(function() { state = null }, ms);
  }

}


module.exports.throttle = function (f, ms) {
  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    console.log(arguments[0], isThrottled);
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}



function Machine(power) {
  this._power = power;
  this._enabled = false;

  var self = this;

  this.enable = function() {
    self._enabled = true;
  };

  this.disable = function() {
    self._enabled = false;
  };
}

function Fridge (power) {
  Machine.apply(this, arguments);
  var food = [];

  this.addFood = function() {
    if(!this._enabled) throw new Error("Холодильник выключен");
    for (var i =0; i<arguments.length; i++){
      if(food.length == power/100){
        throw new Error("Холодильник полон");
      }
      
      food.push(arguments[i]);
    }
  };
  
  this.getFood = function() {
    return food;
  };

  this.filterFood = function(func){
  	return food.filter(func);
  }
  this.removeFood = function(item){
  	food = food.filter(function(el){
  		return el != item;
  	});	
  }
  var parrentDisable = this.disable;
  this.disable = function(){
  	if(food.length > 0) throw new Error("Холодильник не пустой");
  	parrentDisable();
  }
}

//Fridge.prototype = Machine;
exports.Fridge = Fridge;