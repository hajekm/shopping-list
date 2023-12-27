module.exports.IsMember = function (userId, members) {
    return members.some((m) => m._id.toString() === userId);
};

module.exports.IsListOwnerOrItemOwner = function (
    userId,
    listOwner,
    itemOwner
) {
    return userId === itemOwner.toString() || listOwner.toString() === userId;
};
