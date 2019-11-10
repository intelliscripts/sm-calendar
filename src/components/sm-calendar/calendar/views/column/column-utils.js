import {getTimeDiff, getTimeFromStartOfDay} from "../../utils/common/date-utils";

export function getBestFitPosition(events, expandEvents) {
  if (!events || events.length == 0)
    return {};

  let root = new Tree();
  return root._getBestFitPosition(events, expandEvents);
}


export function getOverlaps(payload, startMoment) {
  if (!payload)
    return {};

  let nodes = getNodes(payload, startMoment);
  let root = new Tree();
  return root._getOverlaps(nodes);
}

function getNodes(payload, startMoment) {
  return payload.map(el => {
    let node = {};

    if (startMoment) {
      node.start = getTimeDiff(startMoment, el.startMoment).startOf('day');
      node.end = getTimeDiff(startMoment, el.endMoment).endOf('day');
    } else {
      node.start = getTimeFromStartOfDay(el.startMoment);
      node.end =  getTimeFromStartOfDay(el.endMoment)
    }

    node.data = el;
    // Adding start and end time in seconds to event to avoid re-calculation
    el.startSec = node.start;
    el.endSec = node.end;
    return node;
  });
}


class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class TreeNode {
  constructor(node) {
    this.interval = new Interval(node.start, node.end);
    this.data = node.data;
    this.max = node.max ? node.max : 0;
    this.left = null;
    this.right = null;
    this.position = node.position ? node.position : 0;
  }
}

/**
 * Interval tree
 */
class Tree {
  constructor() {
    this.root = null;
  }

  insert(newnode) {
    return this._insert(this.root, newnode);
  }

  _insert(root, newnode) {
    if (!root)
      return new TreeNode(newnode);

    if (newnode.start < root.interval.start)
      root.left = this._insert(root.left, newnode);
    else
      root.right = this._insert(root.right, newnode);

    if (root.max < newnode.end)
      root.max = newnode.end;

    return root;
  }

  _isOverlapping(a, b) {
    if (a.start < b.end && b.start < a.end)
      return true;

    if (a.start == b.start || a.end == b.end)
      return true;

    return false;
  }

  overlapSearch(interval) {
    return this._overlapSearch(this.root, interval);
  }

  _overlapSearch(node, interval) {
    if (!node)
      return null;

    if (this._isOverlapping(node.interval, interval))
      return node;

    if (node.left && node.left.max >= interval.start)
      return this._overlapSearch(node.left, interval);

    return this._overlapSearch(node.right, interval);
  }

  /**
   * Input: Array of tree nodes
   * Ouput: Object {
   *                  overlaps: [[],[],[]..] // each array contains events having transitive property for overlapping
   *              }
   */
  _getOverlaps(nodes) {
    if (!nodes || nodes.length === 0)
      return {};

    nodes.sort((e1, e2) => (e1.start - e2.start));
    this.root = this.insert(nodes[0]);
    let overlappingIntervals = [];
    let set = new Set();
    set.add(nodes[0].data);
    for (let i = 1; i < nodes.length; i++) {
      let resNode = this.overlapSearch(new Interval(nodes[i].start, nodes[i].end));
      if (resNode) {
        set.add(nodes[i].data);
        set.add(resNode.data);
      } else {
        //push all overlapping intervals so far
        overlappingIntervals.push([...set]);
        //non-overlapping interval found, discard previous tree at this point
        this.root = null;
        set.clear();
        set.add(nodes[i].data);
      }
      this.root = this.insert(nodes[i]);
    }
    //push remaining intervals
    if (set.size > 0)
      overlappingIntervals.push([...set]);

    return overlappingIntervals;
  }

  /**
   * Input: Array of overlapping events
   * Output: Object {
   * 			divisor: <>
   * 			events: [{...event, startPosition: 0, endPosition: 2}, ....]
   * 		}
   * where:
   *        divisor:    <integer> (divide column width by this number to get event width)
   *        position:    <integer> (0 based index to position event in a column and incrementing along x-axis)
   */
  _getBestFitPosition(events, expand) {
    let maxPositionSoFar = 0;
    let result = {};
    result.events = [];
    let nodeMap = [];	//index i stores root node of ith position
    //initialize first event as root
    events[0].startPosition = 0;
    this.root = this._insertFit(nodeMap, this.root, new TreeNode({
      data: events[0],
      start: events[0].startSec,
      end: events[0].endSec - 1,
      max: events[0].endSec - 1
    }));
    result.events.push(events[0]);
    for (let i = 1; i < events.length; i++) {
      this._insertFit(nodeMap, this.root, new TreeNode({
        data: events[i],
        start: events[i].startSec,
        end: events[i].endSec - 1,
        max: events[i].endSec - 1
      }));
      result.events.push(events[i]);
      if (maxPositionSoFar < events[i].startPosition)
        maxPositionSoFar = events[i].startPosition;
    }
    result.divisor = maxPositionSoFar + 1;
    if (expand) {
      this.expandPositions(this.root, nodeMap);
    }
    return result;
  }

  _insertFit(nodeMap, root, newnode) {
    if (!root) {
      newnode.data.startPosition = newnode.data.endPosition = newnode.position;
      if (!nodeMap[newnode.position])
        nodeMap[newnode.position] = newnode;

      return newnode;
    }
    if (root.max < newnode.interval.start) {
      root.max = newnode.interval.end;
      newnode.position = root.position;
      root.left = this._insertFit(nodeMap, root.left, newnode);
    } else {
      newnode.position = root.position + 1;
      root.right = this._insertFit(nodeMap, root.right, newnode);
    }
    return root;
  }

  expandPositions(root, nodeMap) {
    if (!root)
      return;

    this._expandPositions(root, nodeMap);
    this.expandPositions(root.left, nodeMap);
    this.expandPositions(root.right, nodeMap);
  }

  /**
   * Find maximum endPosition to the right until which an event can be expanded
   */
  _expandPositions(root, nodeMap) {
    let nextRoot = nodeMap[root.data.startPosition + 1];
    while (nextRoot) {
      if (this._isOverlapping(root.interval, nextRoot.interval))
        break;

      if (!nextRoot.left) {
        root.data.endPosition += 1;
        nextRoot = nodeMap[root.data.endPosition + 1];
      } else {
        nextRoot = nextRoot.left;
      }
    }
  }
}
