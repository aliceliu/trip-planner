const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

function removeItem(list, i, index) {
  const newList = [...list];
  newList[i].splice(index, 1);
  return newList;
}

function removeList(list, i) {
  const newList = [...list];
  newList.splice(i, 1);
  return newList;
}

function addItem(list, i, item) {
  const newList = [...list];
  newList[i].push(item);
  return newList;
}

function replaceItem(list, i, index, item) {
  const newList = [...list];
  newList[i][index] = item;
  return newList;
}

function reorderOrMove(result, list) {
  const { source, destination } = result;
  if (!destination) {
    return;
  }

  const sourceIndex = source.droppableId;
  const destIndex = destination.droppableId;
  let newList;

  if (sourceIndex === destIndex) {
    const items = reorder(list[sourceIndex], source.index, destination.index);
    newList = [...list];
    newList[sourceIndex] = items;
  } else {
    const result = move(list[sourceIndex], list[destIndex], source, destination);
    newList = [...list];
    newList[sourceIndex] = result[sourceIndex];
    newList[destIndex] = result[destIndex];
  }
  return newList;
}

export { addItem, removeItem, replaceItem, removeList, reorderOrMove };