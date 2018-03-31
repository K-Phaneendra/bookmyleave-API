import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Leaverequests } from '.'
import mongoose from 'mongoose'
//import md5 from 'md5';
import Companies from '../companies/model';
import Employees from '../employees/model';

var path = require('path');

export const create = ({ bodymen: { body } }, res, next) => {
  if (body.createdBy !== undefined) {
    body.createdBy = new mongoose.Types.ObjectId.createFromHexString(body.createdBy.replace("'",""));
  }
  body.companyid = new mongoose.Types.ObjectId.createFromHexString(body.companyid.replace("'",""));
  body.from = new mongoose.Types.ObjectId.createFromHexString(body.from.replace("'",""));
  body.to = new mongoose.Types.ObjectId.createFromHexString(body.to.replace("'",""));
  let resourceManagerid = body.to;
  let sentObj = {};
  Leaverequests.create(body)
    .then((employees) => {
      Employees.findById({_id: resourceManagerid})
      .then((emp) => {
        sentObj.leavedata = employees.view();
        sentObj.toName = emp.name;
        res.send(sentObj);
      })
      employees.view(true)
    })
    // .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) => {
  Leaverequests.findById(params.id)
    .then(notFound(res))
    .then((employees) => employees ? employees.view() : null)
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
Leaverequests.find(query, select, cursor)
    .then((employees) => employees.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = (req, res, next) => {
  console.log(req.body, "body");
  if (req.body.createdBy !== undefined) {
    req.body.createdBy = new mongoose.Types.ObjectId.createFromHexString(req.body.createdBy.replace("'",""));
  }
  Leaverequests.findOneAndUpdate({ _id: req.body.id }, { status: req.body.status }, {upsert:false, new: true})
    .then(notFound(res))
    // .then((employees) => employees ? employees.view(true) : null)
    // .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
Leaverequests.findById(params.id)
    .then(notFound(res))
    .then((employees) => employees ? employees.remove() : null)
    // .then((employees) => employees ? _.merge(employees, { status: 'DELETED' }).save() : null)
    .then(success(res, 204))
    .catch(next)

export const getbyfromid = ({ params }, res, next) => {
  params.id = new mongoose.Types.ObjectId.createFromHexString(params.id.replace("'",""));
  Leaverequests.find({ from: params.id })
    .then(notFound(res))
    .then((employees) => employees.map((employee) => employee.view()))
    .then(success(res))
    .catch(next)
}

export const getbytoid = ({ params }, res, next) => {
  params.id = new mongoose.Types.ObjectId.createFromHexString(params.id.replace("'",""));
  Leaverequests.find({ to: params.id })
    .then(notFound(res))
    .then((employees) => employees.map((employee) => employee.view()))
    .then(success(res))
    .catch(next)
}
