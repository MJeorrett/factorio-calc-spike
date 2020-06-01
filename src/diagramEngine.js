import createEngine, { DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';

const engine = createEngine();


const node = new DefaultNodeModel('machine', 'dodgerblue');
node.setPosition(100, 100);

const model = new DiagramModel();
model.addAll(node);

engine.setModel(model);

export default engine;