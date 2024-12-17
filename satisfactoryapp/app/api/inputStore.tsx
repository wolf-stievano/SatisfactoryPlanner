import { create } from 'zustand';

interface InputItem {
        name: string;
        src: string;
        quantity: number;
}

interface InputStore {
        selectedInputs: InputItem[];
        addInput: (input: Omit<InputItem, 'quantity'>) => void;
        updateQuantity: (index: number, newQuantity: number) => void;
        removeInput: (index: number) => void;
}

export const useInputStore = create<InputStore>((set) => ({
        selectedInputs: [],

        addInput: (input) => set((state) => {
                const existingInputIndex = state.selectedInputs.findIndex((item) => item.name === input.name);

                if (existingInputIndex !== -1) {
                        const updatedInputs = [...state.selectedInputs];
                        updatedInputs[existingInputIndex].quantity += 1;
                        return { selectedInputs: updatedInputs };
                } else {
                        return { selectedInputs: [...state.selectedInputs, { ...input, quantity: 1 }] };
                }
        }),

        updateQuantity: (index, newQuantity) => set((state) => {
                const updatedInputs = [...state.selectedInputs];
                updatedInputs[index].quantity = newQuantity;
                return { selectedInputs: updatedInputs };
        }),

        removeInput: (index) => set((state) => {
                const updatedInputs = state.selectedInputs.filter((_, i) => i !== index);
                return { selectedInputs: updatedInputs };
        })
}));
