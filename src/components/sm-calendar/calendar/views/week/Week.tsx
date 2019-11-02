import {Column} from "../column/Column";

class Week extends Column {
  constructor() {
    super();
  }

  public numberOfCols: number = 7;

}

export default new Week();
