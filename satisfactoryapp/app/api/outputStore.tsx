import { create } from 'zustand';

interface OutputItem {
        name: string;
        src: string;
        quantity: number;
}

interface OutputStore {
        selectedOutputs: OutputItem[];
        addOutput: (output: Omit<OutputItem, 'quantity'>) => void;
        updateQuantity: (index: number, newQuantity: number) => void;
        removeOutput: (index: number) => void;
}

export const useOutputStore = create<OutputStore>((set) => ({
        selectedOutputs: [],

        addOutput: (output) => set((state) => {
                const existingOutputIndex = state.selectedOutputs.findIndex((item) => item.name === output.name);

                if (existingOutputIndex !== -1) {
                        const updatedOutputs = [...state.selectedOutputs];
                        updatedOutputs[existingOutputIndex].quantity += 1;
                        return { selectedOutputs: updatedOutputs };
                } else {
                        return { selectedOutputs: [...state.selectedOutputs, { ...output, quantity: 1 }] };
                }
        }),

        updateQuantity: (index, newQuantity) => set((state) => {
                const updatedOutputs = [...state.selectedOutputs];
                updatedOutputs[index].quantity = newQuantity;
                return { selectedOutputs: updatedOutputs };
        }),

        removeOutput: (index) => set((state) => {
                const updatedOutputs = state.selectedOutputs.filter((_, i) => i !== index);
                return { selectedOutputs: updatedOutputs };
        })
}));

