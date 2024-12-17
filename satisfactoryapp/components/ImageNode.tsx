import { Handle, Position } from '@xyflow/react';

function ImageNode({ data }) {
        const { nodeType, name, itemQuantity, machine, quantity, imageSrc, shortage, byproduct } = data;

        let content;

        if (byproduct) {
                // Exibição para subprodutos
                content = (
                        <>
                                <div className="image-container">
                                        <img src={imageSrc} alt={name} width={80} height={80} />
                                </div>
                                <div className="text-container">
                                        <p><strong>{name} (Subproduto)</strong></p>
                                        <p>{itemQuantity.toFixed(2)} / min</p>
                                </div>
                        </>
                );
        } else if (nodeType === 'item') {
                // Nó de Item (apenas para o produto final e inputs)
                content = (
                        <>
                                <div className="image-container">
                                        <img src={imageSrc} alt={name} width={80} height={80} />
                                </div>
                                <div className="text-container">
                                        <p><strong>{name}</strong></p>
                                        <p>{itemQuantity.toFixed(2)} / min</p>
                                        {shortage && shortage > 0 && (
                                                <p style={{ color: 'red' }}>Falta: {shortage.toFixed(2)} / min</p>
                                        )}
                                </div>
                        </>
                );
        } else if (nodeType === 'machine') {
                // Nós de Máquina
                content = (
                        <>
                                <div className="image-container">
                                        <img src={imageSrc} alt={machine} width={80} height={80} />
                                </div>
                                <div className="text-container">
                                        <p><strong>{machine}</strong></p>
                                        <p>{quantity.toFixed(2)} máquinas</p>
                                </div>
                        </>
                );
        }

        return (
                <div className="image-node">
                        <Handle type="target" position={Position.Top} />
                        {content}
                        <Handle type="source" position={Position.Bottom} />
                </div>
        );
}

export default ImageNode;
