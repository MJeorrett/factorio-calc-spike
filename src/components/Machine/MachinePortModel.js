import { PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

class MachinePortModel extends PortModel {
  constructor({ itemName, label, craftingSpeed, isInput }) {
    super({
      name: isInput ? `input-${itemName}` : `output-${itemName}`,
      craftingSpeed,
      itemName,
      label,
      isInput,
      alignment: isInput ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
    });
  }

  removeAllLinks() {
    Object.keys(this.links).forEach(linkName => {
      this.links[linkName].remove();
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
