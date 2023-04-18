module.exports = {
    data: {
        name: 'chemformula',
        description: 'gives a random chemical formula'
    },
    async run(interaction) {
        const elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'];
        const formula = [];
 
        // Generate the chemical formula
        for (let i = 0; i < 10; i++) {
            const element = elements[Math.floor(Math.random() * elements.length)];
            const subscript = Math.floor(Math.random() * 9) + 1;
            formula.push(`${element}${subscript}`);
        };
    
        // Send the chemical formula back to the user
        await interaction.reply(`Here's your random chemical formula: ${formula.join('')}`);
    }
};