//@Author ismael alves

class ControllerBase{

    pageSize
    basePath

    render(resp, next, options = {}){
       
        return (document)=>{
            if(document){
                resp.json(this.envelope(document, options))
            }else{
                next({name:"NotFound"})
            }
        }
    }

    renderAll(resp, next, options = {}){
        return (documents)=>{
            if(documents){
                documents.forEach(async(document, index, array)=>{
                    array[index] = this.envelope(document, options)
                })
                resp.json(this.envelopeAll(documents, options))
            }else{
                resp.json(this.envelopeAll([]))
            }
        }
    }

    envelope(document, options = { skipLinks : false }, basePath){
        this.basePath = basePath != null ? basePath : this.basePath
        if(!options.skipLinks){
            document =  Object.assign({_links:{}}, document.toJSON())
            document._links.self = `${this.basePath}/${document._id}`
            document._links.all = `${this.basePath}`
        }
        return document
    }

    envelopeAll(documents = [], options= {}, basePath) {
        this.basePath = basePath != null ? basePath : this.basePath
        let query = ''
        if(options.query){
            Object.keys(options.query).forEach((key, i)=>{
                query += `${i == 0 ? '?':'&'}${key}=${options.query[key]}`
            })
        }
        const resource = {
            _links:{
                self: `${options.url}${query}`
            },
            items: documents
        }
        if(options.page && options.count && options.pageSize){
            let query = ''
            if(options.query){
                Object.keys(options.query).forEach((key)=>{
                    if(key != "_page") query += `&${key}=${options.query[key]}`
                })
            }
            if(options.page > 1){
                resource._links.previous = `${this.basePath}?_page=${options.page-1}${query}`
            }
            const remaining = options.count - (options.page * options.pageSize)
            if(remaining > 0){
                resource._links.remaining = remaining
                resource._links.total = options.count
                resource._links.next = `${this.basePath}?_page=${options.page+1}${query}`
            }
        }
        return options.skipLinks ? {items: documents} : resource
    }

    findOne({
        model, 
        condition = {}, 
        populate, 
        sort, 
        params, 
        basePath, 
        skipLinks = false, 
        select, 
    }){
        return [
            (req, resp, next)=>{
                this.basePath = basePath != null ? basePath : `/${model.collection.name}` 
                if(params){
                    params.forEach(element => {
                        if(element.user){
                            condition[element.path] = req.user._id
                        }else{
                            condition[element.path] = req.params[element.params]
                        }
                    })
                }
                model.findOne(condition).populate(populate).select(select).sort(sort)
                .then(this.render(resp, next, {skipLinks}))
            }
        ]
    }

    findById({
        model, 
        populate, 
        sort, 
        basePath, 
        select, 
    }){
        return [
            (req, resp, next)=>{
                this.basePath = basePath != null ? basePath : `/${model.collection.name}` 
                model.findById(req.params.id).populate(populate).select(select).sort(sort)
                .then(this.render(resp, next))
            }
        ]
    }
    
    findAll({
        model, 
        condition = {}, 
        populate, 
        sort, 
        params, 
        basePath, 
        skipLinks = false, 
        select, 
    }){
        return [
            (req, resp, next)=>{
                let countQuery = {}
                this.basePath = basePath != null ? basePath : `/${model.collection.name}`   
                this.pageSize = req.query._pageSize != null ? parseInt(req.query._pageSize || 1) : 10
                let page = parseInt(req.query._page || 1)
                page = page > 0 ? page : 1
                const skip = (page - 1) * this.pageSize
                if(params){
                    params.forEach(element => {
                        if(element.user){
                            condition[element.path] = req.user._id
                            countQuery[element.path] = req.user._id
                        }else{
                            condition[element.path] = req.params[element.params]
                            countQuery[element.path] = req.params[element.params]
                        }
                    })
                }
                // query da requisição
                let query = {}
                try {
                    Object.keys(req.query).forEach(element => {
                        if(element == '_query') query = JSON.parse(String(req.query[element]).replace("#", "$"))
                    })
                    if(condition){
                        Object.keys(condition).forEach(element =>{
                            if(!query[element]){
                                query[element] = condition[element]
                            }         
                        })
                    }
                } catch (error) {
                    query = condition
                }

                //sort da requisição
                try {
                    if(req.query._sort){
                        let query = JSON.parse(String(req.query._sort))
                        Object.keys(query).forEach((element)=>{
                            if(query[element] == "asc"){
                                query[element] = 1
                            }
                            if(query[element] == "desc"){
                                query[element] = -1
                            }
                        })
                        sort = query
                    }else{
                        sort = sort
                    }
                } catch (error) {
                   
                }
                // console.log(sort)
                // console.log(query)
                // console.log(this.pageSize)
                countQuery = Object.assign(query, countQuery)
                model.countDocuments(countQuery).exec()
                .then(count=>model.find(query)
                    .populate(populate)
                    .select(select)
                    .sort(sort)
                    .skip(skip)
                    .limit(this.pageSize)
                    .then(this.renderAll(resp , next, {page, count, pageSize: this.pageSize, url: req._parsedUrl.pathname, skipLinks:skipLinks, query: req.query}))
                ).catch(next)
            }
        ]
    }

    delete({
        model, 
        params,
        callback = (data, req)=>{}
    }){
        return (req, resp, next) => {
            let condition = {}
            if(params){
                params.forEach(element => {
                    if(element.user){
                        condition[element.path] = req.user._id
                    }else{
                        condition[element.path] = req.params[element.params]
                    }
                })
            }else{
                condition._id =  req.params.id
            }
            // delete com files
            model.findOne(condition).then((remove)=>{
                if(remove){
                    callback(remove, req)
                    model.deleteOne(condition).then((doc)=>{
                        resp.sendStatus(204) 
                    })
                }else{
                    next({name:'NotFound'})
                }
            }).catch(next)
        }
    }

    update({
        model, 
        params,
        callback = (data, req)=>{}
    }){
        return (req, resp, next) => {
            const options = {new: true, runValidators: true}
            let condition = {}
            if(params){
                params.forEach(element => {
                    if(element.user){
                        condition[element.path] = req.user._id
                    }else{
                        condition[element.path] = req.params[element.params]
                    }
                })
            }else{
                condition._id =  req.params.id
            }
            model.findOneAndUpdate(condition, req.body, options).then((doc)=>{
                if(doc == null){
                    next({name: "NotFound"})
                    return false
                }
                callback(doc, req)
                resp.json(doc)
            }).catch(next)
        }
    }

    save({
        model, 
        addFields,
        callback = (data, req)=>{}
    }){
        return (req, resp, next)=>{
            let body = req.body
            if(addFields){
                addFields.forEach(element => {
                    if(element.user){
                        body[element.path] = req.user._id
                    }else if(element.ip){
                        body[element.path] = req.headers['x-real-ip'] || req.connection.remoteAddress;
                    }else{
                        body[element.path] = req.params[element.params]
                    }
                })
            }
            if(body.usuario == undefined) delete body.usuario
            new model(body).save().then((doc)=>{
                callback(doc, req)
                resp.status(201).json(doc)
            }).catch(next)
        }
    }
}

export default new ControllerBase()