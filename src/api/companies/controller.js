import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Companies } from '.'
import mongoose from 'mongoose'

var path = require('path');

export const create = ({ bodymen: { body } }, res, next) => {
  if (body.createdBy !== undefined) {
    body.createdBy = new mongoose.Types.ObjectId.createFromHexString(body.createdBy.replace("'",""));
  }
  Companies.create(body)
    .then((companies) => companies.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) => {
  Companies.findById(params.id)
    .then(notFound(res))
    .then((companies) => companies ? companies.view() : null)
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
Companies.find(query, select, cursor)
    .then((companies) => companies.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) => {
  Companies.findOneAndUpdate({ _id: params.id }, { name: body.name }, {upsert:false, new: true})
    .then(notFound(res))
    .then((companies) => companies ? _.merge(companies, body).save() : null)
    .then((companies) => companies ? companies.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
  Companies.findById(params.id)
    .then(notFound(res))
    .then((companies) => companies ? _.merge(companies, { status: 'DELETED' }).save() : null)
    .then(success(res, 204))
    .catch(next)

export const checkCompanyonRegister = (req, res, next) => {
  Companies.find({"name": req.body.name})
      .then((companies) => companies.map((companies) => companies.view()))
      .then(success(res))
      .catch(next)
}
