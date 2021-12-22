class GamesRoom {
	constructor() { }
	/*
	 ** Get Room Users List
	 */
	getClient = (io, room, players) => {
		return new Promise((resolve, reject) => {
			const player = [];
			const roomList = [];
			const clientsList = io.sockets.adapter.rooms.get(room);
			if (clientsList) {
				for (const clientId of clientsList) {
					player.push(clientId);
				}
				for (let i = 0; i < players.length; i++) {
					for (let j = 0; j < player.length; j++) {
						if (players[i].socketId === player[j]) {
							roomList.push(players[i].name);
						}
					}
				}
			}
			io.to(room).emit("roomPlayers", roomList);
		});
	};
	/*
	 ** Get room users name list
	 */
	getroomUsers = (io, room, players) => {
		return new Promise((resolve, reject) => {
			const player = [];
			const roomList = [];
			const clientsList = io.sockets.adapter.rooms.get(room);
			if (clientsList) {
				for (const clientId of clientsList) {
					player.push(clientId);
				}
				for (let i = 0; i < players.length; i++) {
					for (let j = 0; j < player.length; j++) {
						if (players[i].socketId === player[j]) {
							roomList.push(players[i].name);
						}
					}
				}
			}
			resolve(roomList);
		});
	};
	/*
	 ** Get room users name list
	 */
	getroomUsersDetails = (io, room, players) => {
		return new Promise((resolve, reject) => {
			const player = [];
			const roomList = [];
			const clientsList = io.sockets.adapter.rooms.get(room);
			if (clientsList) {
				for (const clientId of clientsList) {
					player.push(clientId);
				}
				for (let i = 0; i < players.length; i++) {
					for (let j = 0; j < player.length; j++) {
						if (players[i].socketId === player[j]) {
							roomList.push(players[i]);
						}
					}
				}
			}
			resolve(roomList);
		});
	};
	/*
	 ** Get user from room
	 */
	getUser = (io, socketId, room, players) => {
		return new Promise((resolve, reject) => {
			const player = [];
			let Admin;
			const clientsList = io.sockets.adapter.rooms.get(room?.name);
			if (clientsList) {
				for (const clientId of clientsList) {
					player.push(clientId);
				}
				for (let i = 0; i < player.length; i++) {
					if (player[i] === socketId) Admin = players.find((player) => player.socketId === socketId);
				}
				resolve(Admin);
			}
		});
	};
	/*
	 **  Tells the room that a player has joined
	 */
	joinedRoomMessage = (io, room, name, message) => {
		return new Promise((resolve, reject) => {
			const data = { name: name, message: message, type: "joined" };
			this.sendMessage(io, { name: name, message: message, type: "joined" });
			// io.to(room).emit('playersJoined', message);
		});
	};
	/*
	 ** Creates a new room
	 */
	createRoom = (io, socket, room, players) => {
		return new Promise(async (resolve, reject) => {
			const player = players.filter((plyr) => plyr.socketId === socket.id);
			player[0].admin = true;
			player[0].room = room;
			socket.join(room);
			if (player[0]?.name && io.to(room).emit("chat", { message: `${player[0]?.name} joined ${room}`, type: "joined" }))
				this.getClient(io, room, players);
		});
	};
	/*
	 ** Join Room already created
	 */
	joinRoom = (io, socket, room, rooms, players) => {
		return new Promise((resolve, reject) => {
			const room_data = rooms.find((rm) => rm.name === room);
			this.getroomUsers(io, room, players).then((users) => {
				if (users.length < 5) {
					const player = players.filter((plyr) => plyr.socketId === socket.id);
					player[0].room = room_data.name;
					socket.join(room_data.name);
					this.getClient(io, room_data.name, players);
					io.to(room_data.name).emit("chat", {
						message: `${player[0]?.name} joined ${room_data.name}`,
						type: "joined",
					});
					room_data.players += 1;
					io.emit("update_rooms", rooms);
					io.to(room).emit("update_room_data", room_data);
				} else {
					io.to(socket.id).emit("room_full");
				}
			});
		});
	};
	/*
	 **  Tells the room that a player has left
	 */

	leaveRoom = (io, socket, rooms, players) => {
		return new Promise((resolve, reject) => {
			const playerremoved = players.find((player) => player.socketId === socket.id);
			const room = playerremoved?.room;
			const Admin = playerremoved?.admin;
			if (room) {
				socket.leave(room);
				io.to(playerremoved.socketId).emit("leaved_room");
				io.to(room).emit("chat", { message: `${playerremoved.name} Left the room`, type: "left" });
				io.to(room).emit("clearStages", { username: playerremoved.name });
				const player = players.filter((plyr) => plyr.socketId === socket.id);
				const room_data = rooms.find((rm) => rm.name === room);
				player[0].admin = false;
				player[0].room = "";
				player[0].gameOver = false;
				const playersinRoom = players.filter((plyr) => plyr.room === room);
				if (!Admin && playersinRoom.length >= 1 && room_data?.state) {
					room_data.players -= 1;
					if (playersinRoom.length === 1) {
						const playerWin = players.find((p) => p.room === room_data.name && !p.gameOver);
						io.to(playerWin.socketId).emit("Game_finish", { winer: playerWin });
						io.to(room_data.name).emit("chat", { message: `${playerWin?.name} WIN the game `, type: "admin" });
						room_data.state = false;
					}
					io.emit("update_rooms", rooms);
					io.to(room).emit("update_room_data", room_data);
				} else if (Admin && playersinRoom.length >= 1 && room_data?.state) {
					room_data.players -= 1;
					playersinRoom[0].admin = true;
					if (playersinRoom.length === 1) {
						const playerWin = players.find((p) => p.room === room_data.name && !p.gameOver);
						io.to(playerWin.socketId).emit("Game_finish", { winer: playerWin });
						io.to(room_data.name).emit("chat", { message: `${playerWin?.name} WIN the game `, type: "admin" });
						room_data.state = false;
					}
					io.to(room).emit("update_room_data", room_data);
					io.emit("update_rooms", rooms);
					io.to(room).emit("chat", { message: `${playersinRoom[0].name} is the Admin now`, type: "admin" });
					resolve({ status: true, playerremoved, rooms });
				} else if (!Admin && playersinRoom.length >= 1 && !room_data.state) {
					room_data.players -= 1;
					io.emit("update_rooms", rooms);
					io.to(room).emit("update_room_data", room_data);
				} else if (Admin && playersinRoom.length >= 1 && !room_data.state) {
					playersinRoom[0].admin = true;
					room_data.players -= 1;
					io.to(room).emit("update_room_data", room_data);
					io.emit("update_rooms", rooms);
					io.to(room).emit("chat", { message: `${playersinRoom[0].name} is the Admin now`, type: "admin" });
					resolve({ status: true, playerremoved, rooms });
				} else {
					const newrooms = rooms.filter((rm) => rm.name !== room);
					socket.emit("update_roomList", newrooms);
					rooms = newrooms;
					io.emit("update_rooms", rooms);
					io.to(room).emit("update_room_data", []);
					resolve({ status: true, playerremoved, rooms });
				}
			} else {
				resolve({ status: true, playerremoved, rooms });
			}
		});
	};
	/*
	 ** Delete Player from players list
	 */
	deletePlayer = (socket, players) => {
		return new Promise((resolve, reject) => {
			const player = players.filter((plyr) => plyr.socketId !== socket.id);
			players = player;
		});
	};
	/*
	 ** Starts the game
	 */
	startGame = (io, room, Tetrimios) => {
		return new Promise((resolve, reject) => {
			if (!room.state) {
				room.state = true;
				io.to(room.name).emit("startGame", Tetrimios);
			}
		});
	};
	newTetriminos = (io, room, Tetrimios) => {
		return new Promise((resolve, reject) => {
			io.to(room).emit("newTetriminos", Tetrimios);
		});
	};
	/*
	 ** Send Message to Room
	 */
	sendMessage = (io, data) => {
		return new Promise((resolve, reject) => {
			io.to(data.room).emit("chat", { name: data.name, message: data.message, type: data.type });
			resolve(true);
		});
	};
	/*
	 ** semd Stage state to room
	 */
	sendStage = (io, room, stage, username) => {
		return new Promise((resolve, reject) => {
			io.to(room).emit("getstages", { stage, username });
		});
	};
	/*
	 ** Check Stages state and send it to the rooms
	 */
	checkStages = (io, Stages, stage, room) => {
		return new Promise((resolve, reject) => {
			io.to(room).emit("updateStages", { Stages });
		});
	};
	/*
	 ** Change room mode solo/buttle
	 */
	updateroomMode = (io, data, rooms) => {
		return new Promise((resolve, reject) => {
			const room = rooms.filter((room) => room.name === data.roomName);
			if (room[0].players === 1) {
				room[0].mode = data.mode;
				if (data.mode === "batlle") room[0].maxplayers = 5;
				else room[0].maxplayers = 1;
			}
			io.to(data.roomName).emit("update_room_data", room[0]);
			io.emit("update_rooms", rooms);
		});
	};

	/*
	 ** Handle Game over state
	 */
	GameOver = (io, data, rooms, players) => {
		return new Promise((resolve, reject) => {
			const room = rooms.find((room) => room?.name === data?.room);
			const player = players.find((player) => player?.name === data?.userName);
			if (room?.players === 1) {
				room.state = false;
				io.emit("update_rooms", rooms);
			}
			if (room?.mode === "batlle" && player?.room === room?.name && !player.gameOver) {
				player.gameOver = true;
				io.to(room.name).emit("chat", { message: `${player?.name} lose`, type: "joined" });
				this.getroomUsersDetails(io, room.name, players).then((res) => {
					const playersLose = players.filter((p) => p.room === room.name && p.gameOver);
					if (res.length === playersLose.length) {
						room.state = false;
						playersLose.forEach((element) => {
							element.gameOver = false;
						});
						io.emit("update_rooms", rooms);
					}
					if (res.length <= 5 && res.length >= 2 && res.length - 1 === playersLose.length) {
						const playerWin = players.find((p) => p.room === room.name && !p.gameOver);
						io.to(playerWin.socketId).emit("Game_finish", { winer: playerWin });
						io.to(room.name).emit("chat", { message: `${playerWin?.name} WIN the game `, type: "admin" });
						room.state = false;
						io.emit("update_rooms", rooms);
						playersLose.forEach((element) => {
							element.gameOver = false;
						});
					}
				});
			}
		});
	};

	/*
	 ** Add a Wall to the other players stage
	 */
	addWall = (socket, room) => {
		return new Promise((resolve, reject) => {
			socket.broadcast.to(room).emit("addWall");
		});
	};
}

module.exports = GamesRoom;
