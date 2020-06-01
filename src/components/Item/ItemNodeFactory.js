import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

import ItemNodeModel from './ItemNodeModel';
import ItemNodeWidget from './ItemNodeWidget';

class ItemNodeFactory extends AbstractReactFactory {
  constructor() {
    super('item');
  }

  generateReactWidget = event => (
    <ItemNodeWidget engine={this.engine} node={event.model} />
  )

  generateModel = () => {
    return new ItemNodeModel();
  }
}

export default ItemNodeFactory;