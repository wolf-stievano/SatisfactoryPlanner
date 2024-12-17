import { Recipe, DependencyNode, InputItem } from '../api/types'
import recipesData from '../api/Recipes.json';
import { getItemImage, getMachineImage } from './getImage';

function findRecipesByOutput(itemName: string): Recipe[] {
        return recipesData.filter((recipe) =>
                Object.keys(recipe.output).includes(itemName)
        );
}

export function calculateMaxProduction(
        outputItemName: string,
        selectedInputs: InputItem[],
        parentNodeId: string = '',
        processedNodes: Map<string, DependencyNode> = new Map(),
        includeShortage: boolean = true // Parâmetro adicionado
): DependencyNode {
        const nodeId = `${parentNodeId}-${outputItemName}`;

        if (processedNodes.has(nodeId)) {
                return processedNodes.get(nodeId)!;
        }

        // Verifica se o outputItemName está nos selectedInputs
        const inputItem = selectedInputs.find(input => input.name === outputItemName);
        if (inputItem) {
                const node: DependencyNode = {
                        id: nodeId,
                        name: outputItemName,
                        machine: 'Input',
                        quantity: 0,
                        itemQuantity: inputItem.quantity,
                        imageSrc: getItemImage(outputItemName),
                        children: [],
                        requiredPerMinute: inputItem.quantity,
                        type: 'item'
                };
                processedNodes.set(nodeId, node);
                return node;
        }

        // Encontrar as receitas que produzem o outputItemName
        const recipes = findRecipesByOutput(outputItemName);

        if (!recipes || recipes.length === 0) {
                // Não podemos produzir este item
                const node: DependencyNode = {
                        id: nodeId,
                        name: outputItemName,
                        machine: 'Cannot Produce',
                        quantity: 0,
                        itemQuantity: 0,
                        imageSrc: getItemImage(outputItemName),
                        children: [],
                        requiredPerMinute: 0,
                        type: 'item'
                };
                processedNodes.set(nodeId, node);
                return node;
        }

        // Selecionar a primeira receita
        const recipe = recipes[0];

        // Obter a quantidade de output por craft
        const outputQuantityPerCraft = recipe.output[outputItemName];

        if (outputQuantityPerCraft === undefined) {
                throw new Error(`Quantidade de output '${outputItemName}' é undefined na receita '${recipe.name}'.`);
        }

        // Calcular outputPerMinute
        const outputPerMinute = (outputQuantityPerCraft / recipe.time) * 60;

        // Percorrer os inputs da receita
        const inputNodes: DependencyNode[] = [];
        let maxOutputPerMinute = Infinity;

        for (const inputName in recipe.inputs) {
                const inputQuantityPerCraft = recipe.inputs[inputName];

                if (inputQuantityPerCraft === undefined) {
                        throw new Error(`Quantidade de input '${inputName}' é undefined na receita '${recipe.name}'.`);
                }

                // Calcular inputPerMinute
                const inputPerMinute = (inputQuantityPerCraft / recipe.time) * 60;

                // Calcular a quantidade máxima de output possível com base na disponibilidade do input
                const inputNode = calculateMaxProduction(
                        inputName,
                        selectedInputs,
                        nodeId,
                        processedNodes,
                        includeShortage // Passa o parâmetro adicional para chamadas recursivas
                );

                const availableInput = inputNode.itemQuantity;

                const possibleOutputPerMinute = (availableInput * outputPerMinute) / inputPerMinute;

                maxOutputPerMinute = Math.min(maxOutputPerMinute, possibleOutputPerMinute);

                inputNodes.push(inputNode);
        }

        // Quantidade de máquinas necessárias
        const machinesNeeded = maxOutputPerMinute / outputPerMinute;

        // Criar o nó da máquina
        const machineNodeId = `${nodeId}-machine`;
        const machineNode: DependencyNode = {
                id: machineNodeId,
                name: recipe.machine,
                machine: recipe.machine,
                quantity: machinesNeeded,
                itemQuantity: 0,
                imageSrc: getMachineImage(recipe.machine),
                children: [],
                requiredPerMinute: maxOutputPerMinute,
                type: 'machine'
        };
        processedNodes.set(machineNodeId, machineNode);

        // Adicionar os nós de input como filhos da máquina
        machineNode.children.push(...inputNodes);

        // Lidar com subprodutos, se houver
        for (const outputName in recipe.output) {
                if (outputName !== outputItemName) {
                        const outputQuantityPerCraft = recipe.output[outputName]!;
                        const outputQuantityPerMinute = (outputQuantityPerCraft / recipe.time) * 60 * machinesNeeded;

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
                                type: 'item'
                        };
                        machineNode.children.push(byproductNode);
                }
        }

        // Criar o nó do item final
        const itemNode: DependencyNode = {
                id: nodeId,
                name: outputItemName,
                machine: recipe.machine,
                quantity: machinesNeeded,
                itemQuantity: maxOutputPerMinute,
                imageSrc: getItemImage(outputItemName),
                children: [machineNode],
                requiredPerMinute: maxOutputPerMinute,
                type: 'item'
        };
        processedNodes.set(nodeId, itemNode);

        return itemNode;
}
