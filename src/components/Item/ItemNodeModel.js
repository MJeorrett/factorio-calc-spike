import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';

class ItemNodeModel extends NodeModel {
  constructor() {
    super({
      type: 'item',
      label: 'Red Science'
    });
    this.addPort(new DefaultPortModel({
      alignment: PortModelAlignment.LEFT,
      name: 'coal',
      label: 'Coal',
    }));
  }
}

export default ItemNodeModel;
