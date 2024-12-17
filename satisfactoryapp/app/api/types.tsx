export interface InputItem {
        name: string;
        src: string;
        quantity: number;
}

export type SelectedInput = InputItem;

export interface Recipe {
        name: string;
        inputs: { [key: string]: number };
        output: { [key: string]: number };
        machine: string;
        power: number;
        base_production_rate: number | { [key: string]: number }; // Agora aceita ambos os tipos
        time: number;
}

export interface DependencyNode {
        id: string;
        name: string;
        machine: string;
        quantity: number;
        itemQuantity: number;
        imageSrc: string;
        children: DependencyNode[];
        requiredPerMinute?: number;
        shortage?: number;
        byproduct?: boolean;
        type: 'item' | 'machine';
}
