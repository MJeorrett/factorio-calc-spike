import { PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

import round from '../../utils/round';

class MachinePortModel extends PortModel {
  constructor({ itemName, label, productionSpeed, itemAmount, craftTime, isInput }) {
    super({
      name: isInput ? `input-${itemName}` : `output-${itemName}`,
      itemName,
      itemAmount,
      craftTime,
      isInput,
      alignment: isInput ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
    });
  }

  getProductionSpeed(dontRound = false) {
    const raw = this.options.itemAmount / this.options.craftTime;
    return dontRound ? raw : round(raw);
  }

  getProductionSpeedPerOutput() {
    let linksCount = Object.keys(this.links).length;
    if (linksCount === 0) linksCount = 1;
    return round(this.getProductionSpeed(true) / linksCount);
  }

  getSatisfaction() {
    const totalInput = Object.keys(this.links).reduce((sum, linkName) => {
      return this.links[linkName].options.productionSpeed + sum;
    }, 0);

    return totalInput / this.getProductionSpeed();
  }

  removeAllLinks() {
    Object.keys(this.links).forEach(linkName => {
      this.links[linkName].remove();
    });
  }

  createLinkModel() {
    if (this.isInput) return null;

    const productionSpeedPerOutput = this.getProductionSpeedPerOutput();

    const link = new DefaultLinkModel({ productionSpeed: productionSpeedPerOutput });
    link.addLabel(`${productionSpeedPerOutput} \\s`);

    return link;
  }

  canLinkToPort(otherPort) {
    return this.options.itemName === otherPort.options.itemName;
  }

  updateCraftingSpeed() {
    const links = Object.keys(this.links).map(key => this.links[key]);

    links.forEach(link => {
      const productionSpeedPerOutput = this.getProductionSpeedPerOutput();
      link.productionSpeed = productionSpeedPerOutput;
      link.labels[0].options.label = `${productionSpeedPerOutput} \\s`;
    });
  }
}

export default MachinePortModel;
