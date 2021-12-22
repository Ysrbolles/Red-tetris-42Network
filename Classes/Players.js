class Players {
  constructor() {}
  // Add New Player
  newPlayer = async (io, name, socketId, players) => {
    const player = players.find((p) => p.name === name);

    if (player && player.name) {
      io.to(socketId).emit("useralready_exist", { res: true });
    } else {
      players.push({
        name,
        socketId,
        admin: false,
        room: "",
        gameOver: false,
      });
      io.to(socketId).emit("useralready_exist", { res: false });
    }
    return players;
  };
  // Delete Player
  deletePlayer = async (playerremoved, players) => {
    const newplayers = await players.filter((player) => player.socketId !== playerremoved?.socketId);
    return newplayers;
  };
  // Update Player
  updatePlayer = async (io, socket, data, players) => {
    return new Promise(async (resolve, reject) => {
      const newplayers = await players.filter((player) => player.name !== data.username);
      newplayers.push({
        name: data.username,
        socketId: socket.id,
        admin: false,
        room: "",
        gameOver: false,
      });
      resolve(newplayers);
    });
  };
}

module.exports = Players;
