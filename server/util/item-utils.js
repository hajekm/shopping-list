function AllItemsDone(items) {
    return items.every((e) => {
        return e.status !== "new";
    });
}

module.exports = AllItemsDone;
