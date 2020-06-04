import { PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

import round from '../../utils/round';

class MachinePortModel extends PortModel {
  constructor({ itemName, label, productionSpeed, isInput }) {
    super({
      name: isInput ? `input-${itemName}` : `output-${itemName}`,
      productionSpeed,
      itemName,
      isInput,
      alignment: isInput ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
    });
  }

  getProductionSpeed() {
    let linksCount = Object.keys(this.links).length;
    if (linksCount === 0) linksCount = 1;
    return round(this.options.productionSpeed / linksCount);
  }

  getSatisfaction() {
    const totalInput = Object.keys(this.links).reduce((sum, linkName) => {
      return this.links[linkName].options.productionSpeed + sum;
    }, 0);

    return totalInput / this.options.productionSpeed;
  }

  removeAllLinks() {
    Object.keys(this.links).forEach(linkName => {
      this.links[linkName].remove();
    });
  }

  createLinkModel() {
    if (this.isInput) return null;

    const productionSpeed = this.getProductionSpeed();

    const link = new DefaultLinkModel({ productionSpeed });
    link.addLabel(`${productionSpeed} \\s`);

    return link;
  }

  canLinkToPort(otherPort) {
    return this.options.itemName === otherPort.options.itemName;
  }

  updateCraftingSpeed() {
    const links = Object.keys(this.links).map(key => this.links[key]);

    links.forEach(link => {
      const productionSpeed = this.getProductionSpeed();
      link.productionSpeed = productionSpeed;
      link.labels[0].options.label = `${productionSpeed} \\s`;
    });
  }
}

export default MachinePortModel;
