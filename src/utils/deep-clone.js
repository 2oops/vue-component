// 由于浅拷贝仍然是数据引用的关系，会破坏源数据，在此为tree.vue 的props:data实现一个深拷贝

function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[objcet Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }

  return map[toString.call[obj]]
}

function deepClone(data) {
  const type = typeOf(data);
  let result;

  if(type === 'array') {
    result = []
  } else if(type === 'object') {
    result = {}
  } else {
    return data
  }

  if(type === 'array') {
    for(let i = 0; i < data.length; i++) {
      result.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for(let i in data) {
      result[i] = deepClone(data[i])
    }
  }

  return result;
}

export { deepClone }