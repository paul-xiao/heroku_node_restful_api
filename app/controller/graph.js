const Graph = require('../models/Graph');


exports.addGraph = (req, res) => {

    const {
        nodename,
        category,
        target,
        desc
    } = req.body

    const req_data = {
        nodename,
        category,
        target,
        desc
    }
    const graph = new Graph(req_data)

    Graph.init().then(() => {
        if (nodename && category) {
            graph.save().then((err, result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(result)

                }

            }).catch((err) => {
                if (err.code === 11000) {
                    res.status(500).send({
                        message: 'duplicate nodename'
                    })
                } else {
                    res.status(500).send(err)
                    console.log(err)
                }
            })
        } else {
            res.status(500).send({
                message: 'Nodename and category is required'
            })
        }
    }).catch((err) => {
        res.status(500).send(err)
    })



}


exports.getGraph = (req, res) => {
    Graph.find().then(graph => {
        const data = graph.map(item => {const {nodename, category, target, desc, createdAt} = item; return {nodename, category, target, desc, createdAt}})
        res.send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
}


exports.getGraphById = (req, res) => {
    const {id} = req.params
    Graph.find({nodename: id}).then(graph => {
        res.send(graph[0])
    }).catch(err => {
        res.status(500).send(err)
    })
}