// 由一个组件向上找到最近的指定组件
function findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  // name为undefined或者name和componnetName不等则继续找其父组件
  while(parent && ( !name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent
    if(parent) 
    name = parent.$options.name
  }
  return parent
}

// 向上找到所有指定的组件
function findAllComponentsUpward(context, componentName) {
  let parents = []
  const parent = context.$parent

  if(parent) {
    if(parent.$options.name === componentName)
    parents.push(parent)

    return parents.concat(findAllComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// 向下找到最近的指定组件
function findComponentDownward(context, componentName) {
  const childrens = context.$children
  let target = null

  if(childrens.length) {
    for(const child of childrens) {
      const name = child.$options.name

      if(name === componentName) {
        target = child
        break;
      } else {
        target = findComponentDownward(child, componentName)
        if(target) break;
      }
    }
  }
  return target
}

// 向下找到所有指定的组件
function findAllComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if(child.$options.name === componentName)
    components.push(child)

    const foundChilds = findAllComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

// 找到指定组件的兄弟组件
function findBrotherComponents(context, componentName, exceptSelf = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  console.log(">>", res)
  let index = res.findIndex(item => item._uid === context._uid)
  
  if(exceptSelf) res.splice(index, 1)
  return res
}


export { findComponentUpward, findAllComponentsUpward, findComponentDownward, findAllComponentsDownward, findBrotherComponents }