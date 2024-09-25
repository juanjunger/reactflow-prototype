import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  Node,
  Edge,
  Connection,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from 'react-flow-renderer';
import axios from 'axios';

// Define the initial nodes and edges separately
const initialNodes: Node[] = [
  // Define initial nodes here
];

const initialEdges: Edge[] = [
  // Define initial edges here
];

const WorkflowEditor: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Function to handle saving the current workflow
  const saveWorkflow = async () => {
    try {
      const workflow = { nodes, edges };
      await axios.post('http://localhost:3000/workflows', workflow);
      alert('Workflow saved successfully');
    } catch (error) {
      console.error('Error saving workflow:', error);
    }
  };

  // Function to handle adding a new edge when two nodes are connected
  const onConnect = (params: Edge | Connection) =>
    setEdges((eds) => addEdge(params, eds));

  // Function to handle node changes like position, resizing, etc.
  const onNodesChange = (changes: NodeChange[]) =>
    setNodes((nds) => applyNodeChanges(changes, nds));

  // Function to handle edge changes like deleting an edge
  const onEdgesChange = (changes: EdgeChange[]) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
        <button onClick={saveWorkflow}>Save Workflow</button>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowEditor;
