import { useEffect, useState, useCallback } from 'react';
import { Background, Controls, ReactFlow, Node, Edge, applyNodeChanges, applyEdgeChanges, OnNodesChange, OnEdgesChange } from '@xyflow/react';
import ImageNode from './ImageNode';
import { useInputStore } from '@/app/api/inputStore';
import { useOutputStore } from '@/app/api/outputStore';
import '@xyflow/react/dist/style.css';
import { calculateDependencies } from '@/app/api/calculateDependencies';
import { DependencyNode } from '../app/api/types';
import { getItemImage } from '../app/api/getImage';
import { calculateMaxProduction } from '@/app/api/calculateMaxProduction';

const nodeTypes = { imageNode: ImageNode };

interface FlowProps {
        calculationMode: 'normal' | 'maximize';
}
export default function Flow({ calculationMode }: FlowProps) {
        const [nodes, setNodes] = useState<Node[]>([]);
        const [edges, setEdges] = useState<Edge[]>([]);
        const { selectedOutputs } = useOutputStore();
        const { selectedInputs } = useInputStore();

        const onNodesChange = useCallback(
                (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
                []
        );

        const onEdgesChange = useCallback(
                (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
                []
        );

        useEffect(() => {
                if (selectedOutputs.length === 0) {
                        setNodes([]);
                        setEdges([]);
                        return;
                }

                const allNodes: Node[] = [];
                const allEdges: Edge[] = [];
                const positions: { [key: string]: { x: number; y: number } } = {};
                let hasShortage = false;

                selectedOutputs.forEach((outputItem, outputIndex) => {
                        let dependencyTree: DependencyNode;

                        if (calculationMode === 'maximize') {
                                dependencyTree = calculateMaxProduction(
                                        outputItem.name,
                                        selectedInputs,
                                        '',
                                        new Map(),
                                        true
                                );
                        } else {
                                dependencyTree = calculateDependencies(
                                        outputItem.name,
                                        outputItem.quantity,
                                        selectedInputs,
                                        '',
                                        new Map(),
                                        true
                                );
                        }


                        // Verificar se há falta de recursos na árvore de dependências
                        function checkShortage(node: DependencyNode) {
                                if (node.shortage && node.shortage > 0) {
                                        hasShortage = true;
                                }
                                node.children.forEach(childNode => checkShortage(childNode));
                        }
                        checkShortage(dependencyTree);

                        const { flowNodes, flowEdges } = generateFlowElements(
                                dependencyTree,
                                positions,
                                outputIndex
                        );

                        allNodes.push(...flowNodes);
                        allEdges.push(...flowEdges);
                });

                if (hasShortage) {
                        // Exibir uma mensagem ou indicar faltas no diagrama
                        alert('Inputs insuficientes para produzir o output desejado.');
                        // Ou você pode optar por não exibir o diagrama:
                        // setNodes([]);
                        // setEdges([]);
                        // return;
                }

                const uniqueNodes = Array.from(new Map(allNodes.map(node => [node.id, node])).values());
                const uniqueEdges = Array.from(new Map(allEdges.map(edge => [edge.id, edge])).values());

                setNodes(uniqueNodes);
                setEdges(uniqueEdges);
        }, [selectedOutputs, selectedInputs, calculationMode]);

        return (
                <div style={{ height: '100%' }}>
                        <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                nodeTypes={nodeTypes}
                                fitView
                        >
                                <Background />
                                <Controls className='text-black' />
                        </ReactFlow>
                </div>
        );
}

function generateFlowElements(
        rootNode: DependencyNode,
        positions: { [key: string]: { x: number; y: number } } = {},
        outputIndex: number = 0
) {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        function traverse(
                node: DependencyNode,
                parentNode: DependencyNode | null = null,
                depth: number = 0,
                index: number = 0,
        ) {
                const nodeId = node.id;

                // Verifica se o nó já foi processado
                if (positions[nodeId]) {
                        return;
                }

                // Define a posição do nó
                const position = {
                        x: (index + outputIndex * 3) * 250,
                        y: depth * 250,
                };

                // Salva a posição para evitar sobreposição
                positions[nodeId] = position;

                nodes.push({
                        id: nodeId,
                        type: 'imageNode',
                        position,
                        data: {
                                nodeType: node.type,
                                name: node.name,
                                itemQuantity: node.itemQuantity,
                                machine: node.machine,
                                quantity: node.quantity,
                                imageSrc: node.imageSrc,
                                shortage: node.shortage,
                                byproduct: node.byproduct,
                        },
                });

                // Cria uma aresta para o nó pai
                if (parentNode) {
                        const parentId = parentNode.id;
                        let edgeLabel = '';
                        if (node.type === 'machine' && parentNode.type === 'item') {
                                // Aresta do item final para a máquina
                                edgeLabel = '';
                                edges.push({
                                        id: `e-${parentId}-${nodeId}`,
                                        source: parentId,
                                        target: nodeId,
                                        label: edgeLabel,
                                        type: 'default',
                                        animated: false,
                                        style: { strokeWidth: 2 },
                                        labelBgStyle: { fill: 'white' },
                                        labelStyle: { fill: '#000', fontWeight: 700 },
                                });
                        } else if (node.type === 'machine' && parentNode.type === 'machine') {
                                // Aresta entre máquinas (intermediárias)
                                edgeLabel = '';
                                edges.push({
                                        id: `e-${parentId}-${nodeId}`,
                                        source: parentId,
                                        target: nodeId,
                                        label: edgeLabel,
                                        type: 'default',
                                        animated: false,
                                        style: { strokeWidth: 2 },
                                        labelBgStyle: { fill: 'white' },
                                        labelStyle: { fill: '#000', fontWeight: 700 },
                                });
                        } else if (node.type === 'item' && parentNode.type === 'machine') {
                                // Aresta da máquina para o item (subprodutos e inputs)
                                edgeLabel = `${node.itemQuantity.toFixed(2)} / min`;
                                edges.push({
                                        id: `e-${parentId}-${nodeId}`,
                                        source: parentId,
                                        target: nodeId,
                                        label: edgeLabel,
                                        type: 'default',
                                        animated: false,
                                        style: { strokeWidth: 2 },
                                        labelBgStyle: { fill: 'white' },
                                        labelStyle: { fill: '#000', fontWeight: 700 },
                                });
                        }
                }

                // Percorre os filhos
                node.children.forEach((childNode, childIndex) => {
                        traverse(
                                childNode,
                                node,
                                depth + 1,
                                index + childIndex - Math.floor(node.children.length / 2),
                        );
                });
        }

        traverse(rootNode);

        return { flowNodes: nodes, flowEdges: edges };
}
