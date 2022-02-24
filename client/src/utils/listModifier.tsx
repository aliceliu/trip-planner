import { DropResult, DraggableLocation } from "react-beautiful-dnd";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source: any[], destination: any[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: any } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

function removeItem(list: any[], listIndex: number, index: number) {
  const newList = [...list];
  newList[listIndex].splice(index, 1);
  return newList;
}

function removeList(list: any[], listIndex: number) {
  const newList = [...list];
  newList.splice(listIndex, 1);
  return newList;
}

function addItem(list: any[], listIndex: number, item: any) {
  const newList = [...list];
  newList[listIndex].push(item);
  return newList;
}

function replaceItem(list: any[], listIndex: number, index: number, item: any) {
  const newList = [...list];
  newList[listIndex][index] = item;
  return newList;
}

function reorderOrMove(result: DropResult, list: any[][]) {
  const { source, destination } = result;
  if (!destination) {
    return list;
  }

  const sourceIndex = parseInt(source.droppableId);
  const destIndex = parseInt(destination.droppableId);
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