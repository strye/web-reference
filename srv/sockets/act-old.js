const channel = '/data',
	dal = require("../dal"),
	cmp = new dal.ActivationsOld();

module.exports.listen = io => {
	let dataChnl = io.of(channel);
	dataChnl.on('connection', socket => {
		console.log('a user connected');

		socket.on('disconnect', () => {
			console.log('user disconected')
		})
		
		socket.on('activation.get.all', msg => {
            //console.log('activation.get.all',msg)
			cmp.getAll(msg)
			.then(res => {
				//console.log(`message ${res.length}`)
				socket.emit('activation.list', res)
			})
			.catch(err => {
				console.log(`error ${err}`)
				socket.emit('activation.list.err', err)
			})
		})

		socket.on('activation.get.with.filter', msg => {
            //console.log('activation.get.with.filter',msg)
			cmp.find(msg.filter, msg.options)
			.then(res => {
				//console.log(`message ${res.length}`)
				socket.emit('activation.list', res)
			})
			.catch(err => {
				console.log(`error ${err}`)
				socket.emit('activation.list.err', err)
			})
		})

        socket.on('activation.get.one', msg => {
			cmp.getOne(msg.id)
			.then(res => {
				//console.log(`message ${res}`)
				socket.emit('activation.item', res)
			})
			.catch(err => {
				console.log(`error ${err}`)
				socket.emit('activation.list.err', err)
			})
		})

		socket.on('activation.item.edit', msg => {
			// msg = {id, fld, newV, oldV}
			socket.broadcast.emit('activation.item.edit', msg)
		})
		socket.on('activation.item.reset', msg => {
			// msg = [id,id,id]
			socket.broadcast.emit('activation.item.reset', msg)
		})

		socket.on('activation.item.update', msg => {
			let id = msg['id-DONT_ENTER']
			delete msg['id-DONT_ENTER']
			cmp.update(id, msg)
			.then(res => {
				msg['id-DONT_ENTER'] = id
				console.log(res)
				socket.broadcast.emit('activation.item', msg)
				socket.emit('activation.item.updated', msg)
			})
			.catch(err => {
				console.log("error", err)
				socket.emit('activation.item.update.err', err)
			})
		})

        socket.on('activation.item.add', msg => {
            if(msg.hasOwnProperty('id-DONT_ENTER')) delete msg['id-DONT_ENTER'];

			cmp.create(msg)
			.then(res => {
                //insertId:
                msg['id-DONT_ENTER'] = res.insertId
				console.log(res)
				socket.broadcast.emit('activation.item.add', msg)
				socket.emit('activation.item.add', msg)
			})
			.catch(err => {
				console.log("error", err)
				socket.emit('activation.item.add.err', err)
			})
		})
        socket.on('activation.item.delete', msg => {
            // msg = [id,id,id]
            cmp.delete(msg.id)
			.then(res => {
				console.log(res)
				socket.broadcast.emit('activation.item.delete', msg)
				socket.emit('activation.item.delete', msg)
			})
			.catch(err => {
				console.log("error", err)
				socket.emit('activation.item.delete.err', err)
			})
		})

	})
}