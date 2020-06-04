import { PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

class MachinePortModel extends PortModel {
  constructor({ itemName, label, isInput }) {
    super({
      name: isInput ? `input-${itemName}` : `output-${itemName}`,
      itemName,
      label,
      isInput,
      alignment: isInput ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
    });
  }

  createLinkModel() {
    if (this.isInput) return null;

    return new DefaultLinkModel();
  }

  canLinkToPort(otherPort) {
    return this.options.itemName === otherPort.options.itemName;
  }
}

export default MachinePortModel;
