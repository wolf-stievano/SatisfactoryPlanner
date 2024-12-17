export function getMachineImage(machineName: string): string {
        // Substitui espaços por underlines ou conforme necessário
        const formattedName = machineName.replace(/\s+/g, '_');
        return `/${formattedName}.png`;
}

export function getItemImage(itemName: string): string {
        const formattedName = itemName.replace(/\s+/g, '_');
        return `/${formattedName}.png`;
}
