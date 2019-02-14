const join = (to_complete, key1, to_join, key2) => {
  var obj_to_join = {}
  const result = []
  for (let obj2 of to_join) {
    obj_to_join[obj2[key2]] = obj2
  }
  for (let obj1 of to_complete) {
    result.push({
      ...obj1, ...obj_to_join[obj1[key1]]
    })
  }
  return result
}

module.exports = join
