// 1.
// 1-1: 后续遍历
// 后序遍历(递归)
function lastTraverse(node) {
    if (node) {
        lastTraverse(node.left);
        lastTraverse(node.right);
        console.log(node.value);
    }
}
// 后序遍历(非递归)
function lastTraverseUnRecursion(root) {
    let arr = [], parentNode = null, traverseNode = null;
    if (root) {
        arr.unshift(root);
        while (arr.length !== 0) {
            parentNode = arr[0];
            if (parentNode.left && traverseNode !== parentNode.left && traverseNode !== parentNode.right) {
                arr.unshift(parentNode.left);
            } else if (parentNode.right && traverseNode !== parentNode.right) {
                arr.unshift(parentNode.right);
            } else {
                traverseNode = arr.shift();
                console.log(traverseNode.value);
            }
        }
    }
}

// 1-2: leet112
// 判断二叉树中是否存在从根节点到叶子节点和值为sum的路径
function hasSumPath(root, sum) {
    if (!root) return false;
    // if (!root.left && !root.right)
    if (sum === root.value) {
        return true;
    }
    return hasSumPath(root.left, sum - root.value) || hasSumPath(root.right, sum - root.value);
}



// 1-3: 快速排序 vs 冒泡
// 交换
function swapSort(arr) {
    if (arr.length <= 1) return arr;
    let temp;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                tmp = arr[j];
                arr[j] = arr[i];
                arr[i] = tmp;
            }
        }
    }
    return arr;
}
// 冒泡
function bubbleSort(arr) {
    if (arr.length <= 1) return arr;
    let temp;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = arr.length - 1; j > i; j--) {
            if (arr[j] < arr[j - 1]) {
                tmp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}
// 快速
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = Math.floor(arr.length / 2);
    let temp = arr.splice(pivot, 1)[0];
    let left = [], right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < temp) {
            left.push(arr[i]);
        }
        if (arr[i] >= temp) {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(temp, quickSort(right));
}
// 找出3sum: leetcode 16
function threeSumCloset(arr, target) {
    arr = arr.sort(function (a, b) { return a > b });
    for (let i = 0; i < arr.length - 2; i++) {
        let begin = i + 1;
        let end = arr.length - 1;
        while (begin < end) {
            let sum = arr[i] + arr[begin] + arr[end];
            if (sum < target) {
                begin++;
            } else if (sum > target) {
                end--;
            } else {
                console.log(arr[i], arr[begin], arr[end]);
                return;
            }
            // return target;
        }
    }
}
// 2 sum
function getNum(arr, sum) {
    if (!Array.isArray(arr)) return null;

    arr.sort();

    for (let i = 0, j = arr.length - 1; i <= arr.length - 2;) {
        if (arr[i] + arr[j] < sum) i++;
        else if (arr[i] + arr[j] > sum) j--;

        else return [arr[i], arr[j]];
    }

    return null;
}

// 2. curry化 与 bind
// 2-1. reduce的实现，reduce用途
// reduce vs map vs bind 的实现
Array.prototype.myReduce = function (cb, init) {
    const arr = this;
    let start = 1, prev = arr[0];
    if (init) {
        start = 0;
        prev = init;
    }
    for (let i = start; i < arr.length; i++) {
        prev = cb(prev, arr[i], i, arr);
    }
    return prev;
}

Array.prototype.myMap = function (cb, context) {
    const arr = this;
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(cb.call(context, arr[i], i, arr));
    }
    return result;
}

Function.prototype.myBind = function (context) {
    const fn = this;
    const args = Array.prototype.slice.call(arguments, 1);
    function tmp() { }
    function newBind() {
        fn.apply(this instanceof newBind ? this : context, [...args, ...arguments]);
    }
    tmp.prototype = this.prototype;
    newBind.prototype = new tmp;
    return newBind;
}

Array.prototype.findDup = function (n) {
    const numArray = this.reduce(function(prev, cur) {
        if (cur in prev) {
            prev[cur]++;
        } else {
            prev[cur] = 1;
        }
        return prev;
    }, {});
    // const newArray = numArray.find((value, index, arr) => arr[value] >= n);
    const rst = [];
    Object.keys(numArray).forEach((v, i, a) => {
		console.log(numArray, numArray[v]);
        if (numArray[v] === n) {
            rst.push(v);
        }
	});
	return rst;
}

// new实现
function _new(fn, ...args) {
    const obj = Object.create(fn.prototype);
    // 	const obj = {};
    // 	Object.setPrototypeOf(obj, fn.prototype);
    const ret = fn.apply(obj, args);
    return ret instanceof Object ? ret : obj;
}

let JMath = (function JMath() {
    function JMath() {
        this.foo = function () {
            return this.PI;
        }
    }
    JMath.prototype = Math;
    return new JMath();
})();

// compose实现
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

// 扁平化数组
let arr = [[0, 1], [2, 3], [4, [5, 6, 7]]]
function flat(arr) {
    return arr.reduce(function (flatten, cur) {
        return flatten.concat(Array.isArray(cur) ? flat(cur) : cur);
    }, []);
}
// 统计个数
names.reduce(function (prev, cur) {
    if (cur in prev) {
        prev[cur]++;
    } else {
        prev[cur] = 1;
    }
    return prev;
}, {})

// 3. 防抖 与 节流
// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
function debounce(fn) {
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return function () {
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            fn.apply(this, arguments);
        }, 500);
    };
}
// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
function throttle(fn, time) {
    let runnable = true;
    return function () {
        if (!runnable) return;
        runnable = false;
        setTimeout(function () {
            fn.apply(this, arguments);
            runnable = true;
        }, time)
    }
}

// 4. 事件循环
// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7
async function a1() {
    console.log('a1 start')
    await a2()
    console.log('a1 end')
}
async function a2() {
    console.log('a2')
}

console.log('script start')

setTimeout(() => {
    console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
    console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
    resolve('promise2.then')
    console.log('promise2')
})

promise2.then((res) => {
    console.log(res)
    Promise.resolve().then(() => {
        console.log('promise3')
    })
})
console.log('script end')

/* 
script start
VM69:2 a1 start
VM69:7 a2
VM69:24 promise2
VM69:33 script end
VM69:17 promise1
VM69:4 a1 end
VM69:28 promise2.then
VM69:30 promise3
undefined
VM69:13 setTimeout


*/
// 5. event emitter
class EventEmitter {
    constructor() {
        this.events = {};
    }

    emit(name, ...args) {
        this.events[name].forEach(cb => {
            cb.apply(this, args);
        });
    }

    on(name, cb) {
        this.events[name] ? this.events[name].push(cb) : (this.events[name] = cb);
    }

    off(name) {
        this.events[name] && delete this.events[name];
    }
    // once
}

// 6. CSS
{/* <div class="box">
    <div class="Abox">A</div>
</div> */}
/*
*{
    padding:0;
    margin: 0;
}
html,body{
    width: 100%;
    height: 100%;
}
.box{
    position: relative;
    background: red;
    width: 100%;
    height: 100%;
}
.Abox{
    margin-left:10px;
    width: calc(100vw - 20px);
    height: calc(50vw - 10px);
    position: absolute;
    background: yellow;
    top:50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}
*/
// 子元素: width: calc(100vw - 20px); height: 0; padding-top: 50%;

// 7.ajax
function serialize(data) {
    if (!data) {
        return '';
    }
    const paris = [];
    for (let key in data) {
        if (!data.hasOwnProperty(key) || typeof data[key] === 'function') {
            continue;
        }
        let name = encodeURIComponent(key);
        let value = encodeURIComponent(data[key].toString());
        paris.push(name + '=' + value);
    }
    return paris.join('&');
}

function request(method, url, options, callback) {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                console.log('请求成功');
                callback(req.response);
            }
        } else {
            console.log('请求中...');
        }
    }

    url = method === 'get' && serialize(options) !== '' ? url + '?' + serialize(options) : url;
    let sendParams = method === 'get' ? null : serialize(options);

    req.open(method, url);
    req.send(sendParams);
}