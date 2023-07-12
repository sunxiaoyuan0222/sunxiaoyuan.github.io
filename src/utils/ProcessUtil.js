
//判断是否为主要业务节点
export function isPrimaryNode(node){
  return node &&
    (node.type === 'ROOT' || node.type === 'APPROVAL'
      || node.type === 'CC' || node.type === 'DELAY'
      || node.type === 'TRIGGER');
}
export function isBranchNode(node){
  return node && (node.type === 'CONDITIONS' || node.type === 'CONCURRENTS');
}
export function isEmptyNode(node){
  return node && (node.type === 'EMPTY')
}
//是分支节点
export function isConditionNode(node){
  return node.type === 'CONDITIONS';
}
//是分支节点
export function isBranchSubNode(node){
  return node && (node.type === 'CONDITION' || node.type === 'CONCURRENT');
}
export function isConcurrentNode(node){
  return node.type === 'CONCURRENTS'
}

export function forEachNode(node, callback){
  if (isBranchNode(node)){
    if (callback(node)){return}
    node.branchs.map(branchNode => {
      if (callback(branchNode)){return}
      forEachNode(branchNode.children, callback)
    })
    forEachNode(node.children, callback)
  }else if (isPrimaryNode(node) || isEmptyNode(node) || isBranchSubNode(node)){
    if (callback(node)){return}
    forEachNode(node.children, callback)
  }
}

export default {
  forEachNode, isPrimaryNode, isBranchNode, isEmptyNode,
  isConditionNode, isBranchSubNode, isConcurrentNode
}
