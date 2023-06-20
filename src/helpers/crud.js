const create = (req, schema) => {
	return new Promise(async (accept, reject) => {
		await schema
			.create(req)
			.then(data => {
				accept({
					status: 'SUCCESS',
					data: data
				})
			})
			.catch(err => {
				reject(err)
			})
	})
}

const getById = (id, schema) => {
	return new Promise(async (accept, reject) => {
		await schema
			.find({
				_id: id
			})
			.then(data => {
				accept({
					status: 'SUCCESS',
					data: data
				})
			})
			.catch(err => {
				reject(err)
			})
	})
}

const getAll = schema => {
	return new Promise(async (accept, reject) => {
		await schema
			.find({})
			.then(data => {
				accept({
					status: 'SUCCESS',
					data: data
				})
			})
			.catch(err => {
				reject(err)
			})
	})
}

const updateById = (req, id, schema) => {
	return new Promise(async (accept, reject) => {
		await schema
			.updateOne(
				{ _id: id },
				{
					$set: req
				}
			)
			.then(data => {
				accept({
					status: 'SUCCESS',
					message: 'Data updated Successfully!',
					data
				})
			})
			.catch(err => {
				reject(err)
			})
	})
}

const deleteById = (id, schema) => {
	return new Promise(async (accept, reject) => {
		await schema
			.deleteOne({ _id: id })
			.then(data => {
				accept({
					status: 'SUCCESS',
					message: 'Data deleted Successfully!',
					data
				})
			})
			.catch(err => {
				reject(err)
			})
	})
}

module.exports = {
	create,
	getById,
	getAll,
	updateById,
	deleteById
}
