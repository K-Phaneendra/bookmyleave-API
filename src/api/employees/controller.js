import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { employees } from '.'
import mongoose from 'mongoose'

var path = require('path');

export const create = ({ bodymen: { body } }, res, next) => {
  if (body.createdBy !== undefined) {
    body.createdBy = new mongoose.Types.ObjectId.createFromHexString(body.createdBy.replace("'",""));
  }
  employees.create(body)
    .then((employees) => employees.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) => {
  employees.findById(params.id)
    .then(notFound(res))
    .then((employees) => employees ? employees.view() : null)
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  employees.find({ status: { $ne : "DELETED" } }, select, cursor)
    .then((employees) => employees.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) => {
  employees.findOneAndUpdate({ _id: params.id }, { name: body.name }, {upsert:false, new: true})
    .then(notFound(res))
    .then((employees) => employees ? _.merge(employees, body).save() : null)
    .then((employees) => employees ? employees.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
  employees.findById(params.id)
    .then(notFound(res))
    .then((employees) => employees ? _.merge(employees, { status: 'DELETED' }).save() : null)
    .then(success(res, 204))
    .catch(next)

