import { PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

class MachinePortModel extends PortModel {
  constructor({ itemName, label, productionSpeed, isInput }) {
    super({
      name: isInput ? `input-${itemName}` : `output-${itemName}`,
      productionSpeed,
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

    const link = new DefaultLinkModel();
    link.addLabel(`${this.options.productionSpeed} \\s`);

    return link;
  }

  canLinkToPort(otherPort) {
    return this.options.itemName === otherPort.options.itemName;
  }
}

export default MachinePortModel;
