function listToTree(arr){
  let tree = []
  let map={}
  for(let item of arr){
    map[item.pid] ={
      ...item,
      children: []
    }
  }
  for(let item of arr){
    let newItem = map[item.id]
    if(map[item.pid]){
      let parent = map[item.pid]
      parent.children.push(newItem)
    }else{
      tree.push(newItem)
    }
  }
  return tree
}

function treeToList(tree,arr){
  tree.forEach(item => {
    let {children,...props} = item
    arr.push(props)
    if(children){
      treeToList(children,arr)
    }
  });
  return arr
}
