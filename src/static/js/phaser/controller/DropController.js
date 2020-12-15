const DropController = {
  create() {
    const newObj = {
      calcDrop(dropTable) {
        for (let i = 0; i < dropTable.length; i++) {
          const roll = Math.round(Math.random() * 100);
          if (roll < dropTable[i].chance) {
            return dropTable[i].type;
          }
        }
        return null;
      }
    };
    return newObj;
  }
};
export default DropController;
