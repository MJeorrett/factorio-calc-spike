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

    this.updateSatisfaction();
  }

  setCraftTime(newCraftTime) {
    this.options.craftTime = newCraftTime;
    this.updateCraftingSpeed();
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

  updateSatisfaction() {
    const totalInput = Object.keys(this.links).reduce((sum, linkName) => {
      return this.links[linkName].options.productionSpeed + sum;
    }, 0);

    this.satisfaction = totalInput / this.getProductionSpeed();
  }

  removeAllLinks() {
    Object.keys(this.links).forEach(linkName => {
      this.links[linkName].remove();
    });
  }

  createLinkModel() {
    if (this.options.isInput) return null;

    const productionSpeedPerOutput = this.getProductionSpeedPerOutput();

    const link = new DefaultLinkModel({ productionSpeed: productionSpeedPerOutput });
    link.addLabel(`${productionSpeedPerOutput} \\s`);

    return link;
  }

  canLinkToPort(otherPort) {
    return this.options.itemName === otherPort.options.itemName;
  }

  updateCraftingSpeed() {
    this.updateSatisfaction();
    if (this.options.isInput) return;

    const links = Object.keys(this.links).map(key => this.links[key]);

    links.forEach(link => {
      const productionSpeedPerOutput = this.getProductionSpeedPerOutput();
      link.options.productionSpeed = productionSpeedPerOutput;
      link.labels[0].options.label = `${productionSpeedPerOutput} \\s`;
      link.targetPort.updateSatisfaction();
    });

  }
}

export default MachinePortModel;
