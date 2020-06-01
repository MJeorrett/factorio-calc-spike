import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';

import * as Item from './components/Item';

const engine = createEngine();

const nodeFactories = engine.getNodeFactories();
nodeFactories.registerFactory(new Item.Factory());

const node = new Item.Model();
node.setPosition(100, 100);

const model = new DiagramModel();
model.addAll(node);

engine.setModel(model);

export default engine;