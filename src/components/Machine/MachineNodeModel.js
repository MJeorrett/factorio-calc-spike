import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';

class MachineNodeModel extends NodeModel {
  constructor(label, inputs, iconCol, iconRow) {
    super({
      type: 'machine',
      label,
      iconCol,
      iconRow,
    });
    inputs.forEach(input => {
      this.addPort(new DefaultPortModel({
        alignment: PortModelAlignment.LEFT,
        name: input.name,
        label: input.label,
      }));
    });
  }
}

export default MachineNodeModel;
