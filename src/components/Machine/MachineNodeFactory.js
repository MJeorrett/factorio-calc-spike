import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

import MachineNodeModel from './MachineNodeModel';
import MachineNodeWidget from './MachineNodeWidget';

class MachineNodeFactory extends AbstractReactFactory {
  constructor() {
    super('machine');
  }

  generateReactWidget = event => (
    <MachineNodeWidget engine={this.engine} node={event.model} />
  )

  generateModel = () => {
    return new MachineNodeModel();
  }
}

export default MachineNodeFactory;