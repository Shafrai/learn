"use strict";
var assert = require('assert');
var functionsForTest = require('./functionsForTest');
var alert = console.log;

describe('JavaScript', function() {
	it('Сделать первый символ заглавным', function() {
		assert.equal(functionsForTest.ucFirst("вася"), "Вася");
		assert.equal(functionsForTest.ucFirst(""), "");
	});
	it('Усечение строки', function() {
		assert.equal(functionsForTest.truncate("Вот, что мне хотелось бы сказать на эту тему:", 20), "Вот, что мне хоте...");
		assert.equal(functionsForTest.truncate("Всем привет!", 20), "Всем привет!");
	});
	it ('Подсчет суммы по свойствам', function () {
		var salaries = {
			"Вася": 100,
			"Петя": 300,
			"Даша": 250
		};
		assert.equal(functionsForTest.ObjSum(salaries), 650);
	});

	describe("делает заглавным первый символ после дефиса", function() {

    it("превращает background-color в backgroundColor", function() {
      assert.equal(functionsForTest.camelize("background-color"), "backgroundColor");
    });

    it("превращает list-style-image в listStyleImage", function() {
      assert.equal(functionsForTest.camelize("list-style-image"), "listStyleImage");
    });

    it("превращает -webkit-transition в WebkitTransition", function() {
      assert.equal(functionsForTest.camelize("-webkit-transition"), "WebkitTransition");
    });
  });

  describe("Скопировать и отсортировать массив", function() {

    it("", function() {

    	var arr = ["HTML", "JavaScript", "CSS"];

			var arrSorted = arr.map(el=>el).sort();

      assert.equal(arrSorted.join(', '), "CSS, HTML, JavaScript");
      assert.equal(arr.join(', '), "HTML, JavaScript, CSS");
    });
  });

  describe("Сортировка объектов", function() {

    it("", function() {

    	var vasya = { name: "Вася", age: 23 };
			var masha = { name: "Маша", age: 18 };
			var vovochka = { name: "Вовочка", age: 6 };

			var people = [ vasya , masha , vovochka ];

			people.sort((prv, nxt)=>prv.age>nxt.age);
			
      assert.equal(people[0].age, 6);
    });
  });

  describe("Вывести односвязный список", function() {

    it("", function() {
    	
    	/*function printList(ar){
    		var iter = list;
				while(iter){
					console.log(iter.value);
					iter = iter.next;
				}
    	}*/

    	function printList(ar){
    		if (ar){
    			//console.log(ar.value);
    			printList(ar.next);
    		}
    	}

    	/*function printReverseList(ar){
    		if (ar){
    			printList(ar.next);
    			console.log(ar.value);
    		}
    	}*/

    	function printReverseList(ar){
    		var array = [];
    		var iter = list;
				while(iter){
					array.unshift(iter.value);
					iter = iter.next;
				}
				//console.log(array.join('\n'));
    	}

    	var list = { value: 1 };
			list.next = { value: 2 };
			list.next.next = { value: 3 };
			list.next.next.next = { value: 4 };
			/*printList(list);
			printReverseList(list);*/
      
    });
  });

  describe("aclean", function() {

	  it("содержит ровно по 1 слову из каждого набора анаграмм", function() {
	    var arr = ["воз", "киборг", "корсет", "зов", "гробик", "костер", "сектор"];

	    var result = functionsForTest.aclean(arr);
	    assert.equal(result.length, 3);

	    assert.equal(functionsForTest.intersection(result, ["гробик", "киборг"]).length, 1);
	    assert.equal(functionsForTest.intersection(result, ["воз", "зов"]).length, 1);
	    assert.equal(functionsForTest.intersection(result, ["корсет", "сектор", "костер"]).length, 1);

	  });

	  it("не различает регистр символов", function() {
	    var arr = ["воз", "ЗОВ"];
	    assert.equal(functionsForTest.aclean(arr).length, 1);
	  });

	});
	describe("getSums", function() {

	  it("частичные суммы [1,2,3,4,5] равны [1,3,6,10,15]", function() {
	    assert.deepEqual(functionsForTest.getSums([1, 2, 3, 4, 5]), [1, 3, 6, 10, 15]);
	  });

	  it("частичные суммы [-2,-1,0,1] равны [-2,-3,-3,-2]", function() {
	    assert.deepEqual(functionsForTest.getSums([-2, -1, 0, 1]), [-2, -3, -3, -2]);
	  });

	  it("частичные суммы [] равны []", function() {
	    assert.deepEqual(functionsForTest.getSums([]), []);
	  });

	  it("частичные суммы [1] равны [1]", function() {
	    assert.deepEqual(functionsForTest.getSums([1]), [1]);
	  });
	});

	describe("Сумма через замыкание", function() {

	  it("sum(1)(2) = 3", function() {
	    assert.deepEqual(functionsForTest.sumClosures(1)(2) , 3);
	  });

	  it("sum(5)(-1) = 4", function() {
	    assert.deepEqual(functionsForTest.sumClosures(5)(-1), 4);
	  });
	});

	describe("Функция - строковый буфер", function() {
		var buffer;
		beforeEach(function() {
		  buffer = functionsForTest.makeBuffer();
		});

		it("возвращает пустую строку по умолчанию", function() {
		  assert.strictEqual(buffer(), "");
		});

		it("добавляет аргументы в буффер", function() {
		  buffer('Замыкания');
		  buffer(' Использовать');
		  buffer(' Нужно!');
		  assert.equal(buffer(), 'Замыкания Использовать Нужно!');
		});

		it("приводит всё к строке", function() {
		  buffer(null);
		  buffer(false);
		  assert.equal(buffer(), "nullfalse");
		});

		it("очищает буфер вызовом clear", function() {
		  buffer("test");
		  buffer.clear();
		  buffer("первый");
		  buffer("второй");
		  assert.equal(buffer(), "первыйвторой");
		});
	});
	describe("Сортировка", function() {
		var users = [{
			  name: "Вася",
			  surname: 'Иванов',
			  age: 20
			}, {
			  name: "Петя",
			  surname: 'Чапаев',
			  age: 25
			}, {
			  name: "Маша",
			  surname: 'Медведева',
			  age: 18
			}];
		
		it("Сортировка по имени", function() {
		  users.sort(functionsForTest.byField('name'));
		  var result = users.map(el=>el.name).join(', ');
		  assert.equal(result, "Вася, Маша, Петя");
		});

		it("Сортировка по возрасту", function() {
		  users.sort(functionsForTest.byField('age'));
		  var result = users.map(el=>el.name).join(', ');
		  assert.equal(result, "Маша, Вася, Петя");
		});
	});


	describe("Фильтрация через функцию", function() {
		var arr;

		before(function() {
		  arr = [1, 2, 3, 4, 5, 6, 7];
		});

		describe("inArray", function() {
		  var checkInArr;

		  before(function() {
		    checkInArr = functionsForTest.inArray(arr);
		  });

		  it("возвращает фильтр для значений в массиве", function() {
		    assert.equal(checkInArr(5), true);
		    assert.equal(checkInArr(0), false);
		  });
		});


		describe("inBetween", function() {
		  var checkBetween36;

		  before(function() {
		    checkBetween36 = functionsForTest.inBetween(3, 6);
		  });

		  it("возвращает фильтрa для значений в промежутке", function() {
		    assert.equal(checkBetween36(5), true);
		    assert.equal(checkBetween36(0), false);
		  });
		});


		describe("filter", function() {

		  it("фильтрует через func", function() {
		    assert.deepEqual(functionsForTest.filter(arr, function(a) {
		      return a % 2 == 0;
		    }), [2, 4, 6]);
		  });

		  it("не модифицирует исходный массив", function() {
		    functionsForTest.filter(arr, function(a) {
		      return a % 2 == 0;
		    });
		    assert.deepEqual(arr, [1, 2, 3, 4, 5, 6, 7]);
		  });

		  it("поддерживает фильтр inBetween", function() {
		    assert.deepEqual(functionsForTest.filter(arr, functionsForTest.inBetween(3, 6)), [3, 4, 5, 6]);
		  });

		  it("поддерживает фильтр inArray", function() {
		    assert.deepEqual(functionsForTest.filter(arr, functionsForTest.inArray([1, 2, 3])), [1, 2, 3]);
		  });

		});
	});

	describe("Сумма произвольного количества скобок", function() {

	  it("sum(1)(2) == 3", function() {
	    assert.equal(functionsForTest.sum(1)(2), 3);
	  });
	  it("sum(1)(2)(3) == 6", function() {
	    assert.equal(functionsForTest.sum(1)(2)(3), 6);
	  });
	  it("sum(5)(-1)(2) == 6", function() {
	    assert.equal(functionsForTest.sum(5)(-1)(2), 6);
	  });
	  it("sum(6)(-1)(-2)(-3) == 0", function() {
	    assert.equal(functionsForTest.sum(6)(-1)(-2)(-3), 0);
	  });
	  it("sum(0)(1)(2)(3)(4)(5) == 15", function() {
	    assert.equal(functionsForTest.sum(0)(1)(2)(3)(4)(5), 15);
	  });
	});

	describe("Создайте калькулятор", function() {
		var calculator;
		before(function() {
		  calculator = new functionsForTest.Calculator();
		});

		it("calculate(12 + 34) = 46", function() {
		  assert.equal(calculator.calculate("12 + 34"), 46);
		});

		it("calculate(34 - 12) = 22", function() {
		  assert.equal(calculator.calculate("34 - 12"), 22);
		});

		it("добавили умножение: calculate(2 * 3) = 6", function() {
		  calculator.addMethod("*", function(a, b) {
		    return a * b;
		  });
		  assert.equal(calculator.calculate("2 * 3"), 6);
		});

		it("добавили возведение в степень: calculate(2 ** 3) = 8", function() {
		  calculator.addMethod("**", function(a, b) {
		    return Math.pow(a, b);
		  });
		  assert.equal(calculator.calculate("2 ** 3"), 8);
		});
	});

	describe("Добавить get/set-свойства", function(){
		var vasya;

		before(function() {
		  vasya = new functionsForTest.User("Василий Попкин");
		});

		it("чтение firstName/lastName", function(){
			//assert.equal(vasya.firstName, "Василий");
			//assert.equal(vasya.lastName, "Попкин");
		});
		
		it("запись в lastName", function(){
			vasya.lastName = 'Сидоров';
			assert.equal(vasya.fullName, "Василий Сидоров");
		});
	});

	describe("Article.showStats", function() {
		function Article(){
				this.created = new Date();
				Article.count++;
				Article.lastDate =this.created;
			}
		Article.count = 0;
		Article.showStats = function(){
			return "Всего: " + Article.count + ", Последняя: " + Article.lastDate;
		}
	  it("Выводит число статей и дату создания последней", function() {
	    new Article();
	    new Article();
	    assert.equal(Article.showStats(), 'Всего: 2, Последняя: ' + new Date());
	  });

	  it("и ещё одна статья...", function() {
	    new Article();
	    assert.equal(Article.showStats(),'Всего: 3, Последняя: ' + new Date());
	  });
	});

	describe("функцию sumArgs(), которая будет суммировать все свои аргументы", function() {
		it('', function(){
	  	assert.equal(functionsForTest.sumArgs(1,2,3,4,5,6,7,8,9), 45);
		});
	});

	describe("applyAll", function() {

	  it("применяет функцию ко всем аргументам, начиная со 2го", function() {
	    assert.equal(functionsForTest.applyAll(Math.min, 1, 2, 3), 1);
	    assert.equal(functionsForTest.applyAll(Math.min, 10, 20, 5), 5);
	  });
	});


	describe("BindTest", function() {
	  it("", function() {
	    function ask(question, answer, ok, fail) {
			  var result = 500 + "";
			  if (result.toLowerCase() == answer.toLowerCase()) ok();
			  else fail();
			}

			var user = {
			  login: 'Василий',
			  password: '12345',

			  // метод для вызова из ask
			  loginDone: function(result) {
			    console.log( this.login + (result ? ' вошёл в сайт' : ' ошибка входа') );
			  },

			  checkPassword: function() {
			    //ask("Ваш пароль?", this.password, this.loginDone.bind(this, true),this.loginDone.bind(this, false));
			    ask("Ваш пароль?", this.password,
			      function() {
			        this.loginDone(true);
			      }.bind(this),
			      function() {
			        this.loginDone(false);
			      }.bind(this)
			    );
			  }
			};

			var vasya = user;
			user = null;
			vasya.checkPassword();
	  });
	});

	/*describe("makeCaching", function() {
	  it("запоминает предыдущее значение функции с таким аргументом", function() {
	  	function f(x) {
	      //return Math.random() * x; // random для удобства тестирования
	      return 2*x;
	    }

	    f = functionsForTest.makeCaching(f);
	    var a = f(1);
	    var b = f(1);
	    assert.equal(a, b);
	    var anotherValue = f(2);
	    assert.notEqual(a, anotherValue);
	  });
	});

	describe("formatDate", function() {
		var formatDate = functionsForTest.formatDate;
	  it("читает дату вида гггг-мм-дд из строки", function() {
	    assert.equal(formatDate('2011-10-02'), "02.10.11");
	  });

	  it("читает дату из числа 1234567890 (миллисекунды)", function() {
	    assert.equal(formatDate(1234567890), "14.02.09");
	  });

	  it("читает дату из массива вида [гггг, м, д]", function() {
	    assert.equal(formatDate([2014, 0, 1]), "01.01.14");
	  });

	  it("читает дату из объекта Date", function() {
	    assert.equal(formatDate(new Date(2014, 0, 1)), "01.01.14");
	  });

	});*/

	describe("Проверяем паботу холодильника", function() {
		var fridge;

		beforeEach(function() {
		  fridge = new functionsForTest.Fridge(500);
		});

	  it("ошибка, холодильник выключен", function() {
	  	assert.throws(()=>fridge.addFood("котлета"), Error);
	  });

	  it("ошибка, слишком много еды", function() {
	  	fridge.enable();
	    fridge.addFood("котлета");
	    fridge.addFood("сок", "зелень");
	  	assert.throws(()=>fridge.addFood("варенье", "пирог", "торт"), Error);
	  });

		it("добавление элементов не влияет на еду в холодильнике", function() {
		  fridge.enable();
	    fridge.addFood("котлета");
	    fridge.addFood("сок", "варенье");
	    
	    var fridgeFood = fridge.getFood();
	    assert.equal(fridgeFood.join(', '), "котлета, сок, варенье"); // котлета, сок, варенье
	    fridgeFood.push("вилка", "ложка");
	    assert.equal(fridge.getFood().join(', '), "котлета, сок, варенье, вилка, ложка");
		});

		it("добавление элементов не влияет на еду в холодильнике", function() {
		  fridge.enable();
			fridge.addFood({
			  title: "котлета",
			  calories: 100
			});
			fridge.addFood({
			  title: "сок",
			  calories: 30
			});
			fridge.addFood({
			  title: "зелень",
			  calories: 10
			});
			fridge.addFood({
			  title: "варенье",
			  calories: 150
			});

			fridge.removeFood("нет такой еды"); // без эффекта
			assert.equal(fridge.getFood().length, 4);

			var dietItems = fridge.filterFood(function(item) {
			  return item.calories < 50;
			});

			assert.equal(dietItems.map((el)=>el.title).join(", "), "сок, зелень");
			
			dietItems.forEach(function(item) {
			  fridge.removeFood(item);
			});
			assert.equal(fridge.getFood().length, 2);
		});
		it("Ошибка если выключаем холодильник едой", function(){
			fridge.enable();
			fridge.addFood("кус-кус");
			assert.throws(()=>fridge.disable(), Error);
		});
	});
});



function f(a, b){
	console.log(a+b);
}

Function.prototype.defer = function(ms) {
	var self = this;
	return function(a, b){
		setTimeout(function(){
			self(a, b);
		}, ms);
	}
};

f.defer(1000)(2,3);


// 1. Конструктор Animal
function Animal(name) {
  this.name = name;
  this.speed = 0;
}

// 1.1. Методы -- в прототип

Animal.prototype.stop = function() {
  this.speed = 0;
  alert( this.name + ' стоит' );
}

Animal.prototype.run = function(speed) {
  this.speed += speed;
  alert( this.name + ' бежит, скорость ' + this.speed );
};

// 2. Конструктор Rabbit
function Rabbit(name) {
  Animal.apply(this, arguments);
}

// 2.1. Наследование
var util = require('util');
util.inherits(Rabbit, Animal);
/*Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;
*/
// 2.2. Методы Rabbit
Rabbit.prototype.jump = function() {
  this.speed++;
  alert( this.name + ' прыгает, скорость ' + this.speed );
}
var rabbit = new Rabbit('Кроль');
rabbit.run(2);
