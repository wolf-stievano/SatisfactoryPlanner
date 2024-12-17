import { Recipe, DependencyNode, InputItem } from '../api/types';
import recipesData from './Recipes.json';
import { getItemImage, getMachineImage } from '../api/getImage';

function findRecipesByOutput(itemName: string): Recipe[] {
        return recipesData.filter((recipe) =>
                Object.keys(recipe.output).some(outputName => outputName.toLowerCase() === itemName.toLowerCase())
        );
}

export function calculateDependencies(
        itemName: string,
        quantityNeededPerMinute: number,
        selectedInputs: InputItem[],
        parentNodeId: string = '',
        processedNodes: Map<string, DependencyNode> = new Map(),
        isFinalProduct: boolean = true // Adicionamos este parâmetro
): DependencyNode {
        const nodeId = `${parentNodeId}-${itemName}`;

        if (processedNodes.has(nodeId)) {
                return processedNodes.get(nodeId)!;
        }

        // Verifica se o item está nos inputs selecionados
        const inputItem = selectedInputs.find(input => input.name === itemName);

        if (inputItem) {
                // Input disponível é suficiente
                const node: DependencyNode = {
                        id: nodeId,
                        name: itemName,
                        machine: 'Input',
                        quantity: 0,
                        itemQuantity: quantityNeededPerMinute,
                        imageSrc: getItemImage(itemName),
                        children: [],
                        requiredPerMinute: quantityNeededPerMinute,
                        type: 'item',
                };
                processedNodes.set(nodeId, node);
                return node;
        }

        // Encontra todas as receitas que produzem o item desejado
        const recipes = findRecipesByOutput(itemName);

        if (recipes.length === 0) {
                // Item é matéria-prima ou não pode ser produzido
                const node: DependencyNode = {
                        id: nodeId,
                        name: itemName,
                        machine: 'Raw Material',
                        quantity: 0,
                        itemQuantity: quantityNeededPerMinute,
                        imageSrc: getItemImage(itemName),
                        children: [],
                        requiredPerMinute: quantityNeededPerMinute,
                        type: 'item',
                };
                processedNodes.set(nodeId, node);
                return node;
        }

        // Seleciona a primeira receita encontrada
        const recipe = recipes[0];

        const itemOutputPerCraft = recipe.output[itemName]!;

        const itemOutputPerMinute =
                (itemOutputPerCraft / recipe.time) * 60;

        // Número de máquinas necessárias para produzir a quantidade desejada por minuto
        const machinesNeeded = quantityNeededPerMinute / itemOutputPerMinute;

        // Cria o nó da máquina
        const machineNodeId = `${nodeId}-machine`;
        const machineNode: DependencyNode = {
                id: machineNodeId,
                name: recipe.machine,
                machine: recipe.machine,
                quantity: machinesNeeded,
                itemQuantity: 0,
                imageSrc: getMachineImage(recipe.machine),
                children: [],
                requiredPerMinute: quantityNeededPerMinute,
                type: 'machine',
        };

        processedNodes.set(machineNodeId, machineNode);

        // Processa os inputs da máquina
        for (const inputName in recipe.inputs) {
                const inputQuantityPerCraft = recipe.inputs[inputName]!;

                const inputQuantityNeededPerMinute =
                        (inputQuantityPerCraft / recipe.time) * 60 * machinesNeeded;

                // Verifica se é o produto final
                const childNode = calculateDependencies(
                        inputName,
                        inputQuantityNeededPerMinute,
                        selectedInputs,
                        machineNode.id,
                        processedNodes,
                        false // Nós filhos não são o produto final
                );

                // Adiciona o nó de input como filho da máquina
                machineNode.children.push(childNode);
        }

        // Lida com os outputs adicionais (subprodutos)
        for (const outputName in recipe.output) {
                if (outputName !== itemName) {
                        const outputQuantityPerCraft = recipe.output[outputName]!;

                        const outputQuantityPerMinute =
                                (outputQuantityPerCraft / recipe.time) * 60 * machinesNeeded;

                        // Cria nós para os subprodutos
                        const byproductNode: DependencyNode = {
                                id: `${machineNode.id}-${outputName}`,
                                name: outputName,
                                machine: 'Byproduct',
                                quantity: 0,
                                itemQuantity: outputQuantityPerMinute,
                                imageSrc: getItemImage(outputName),
                                children: [],
                                requiredPerMinute: 0,
                                byproduct: true,
                                type: 'item',
                        };
                        machineNode.children.push(byproductNode);
                }
        }

        if (isFinalProduct) {
                // Se for o produto final, criamos o nó do item
                const itemNode: DependencyNode = {
                        id: nodeId,
                        name: itemName,
                        machine: recipe.machine,
                        quantity: 0,
                        itemQuantity: quantityNeededPerMinute,
                        imageSrc: getItemImage(itemName),
                        children: [machineNode], // O item tem a máquina como filho
                        requiredPerMinute: quantityNeededPerMinute,
                        type: 'item',
                };
                processedNodes.set(nodeId, itemNode);
                return itemNode;
        } else {
                // Se não for o produto final, retornamos o nó da máquina
                return machineNode;
        }
}
