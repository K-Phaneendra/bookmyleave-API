import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Employees } from '.'
import mongoose from 'mongoose'
//import md5 from 'md5';
import Companies from '../companies/model';

var path = require('path');

export const create = ({ bodymen: { body } }, res, next) => {
  if (body.createdBy !== undefined) {
    body.createdBy = new mongoose.Types.ObjectId.createFromHexString(body.createdBy.replace("'",""));
  }
  body.companyid = new mongoose.Types.ObjectId.createFromHexString(body.companyid.replace("'",""));
  Employees.create(body)
    .then((employees) => employees.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const registeredAdmin = (req, res, next) => {
  if (req.body.empCollection.createdBy !== undefined) {
    req.body.empCollection.createdBy = new mongoose.Types.ObjectId.createFromHexString(req.body.empCollection.createdBy.replace("'",""));
  }
  Employees.create(req.body.empCollection)
    .then((employees) => {
      employees.view(true)
      const compCollection = {
        name: req.body.name,
        admin: employees['_id']
      };
      Companies.create(compCollection)
        .then((companies) => {
          companies.view(true)
          const empColl = {
            id: compCollection.admin,
            companyid: companies['_id']
          };
          Employees.findOneAndUpdate({ _id: empColl.id }, { companyid: empColl.companyid }, {upsert:false, new: true})
          .then(notFound(res))
          .then((employees) => employees ? _.merge(employees).save() : null)
          .then((employees) => employees ? employees.view(true) : null)
          .then(success(res))
        })
    })
}

export const checkLogin = (req, res, next) => {
  // Employees.find({"email": req.body.email, "password":req.body.password }, {password: 0})
  Employees.find({"email": req.body.email })
  .then((employees) => {
    if (employees.length === 0) {
      res.send([]);
    } else {
      employees.map((employee) => {
        if (employee.password === req.body.password) {
          res.send([employee.view()]);
        } else {
          res.send({login: "INVALID_PASS"});
        }
      });
    }
  })
  // .then(success(res))
  // .catch(next)
}

export const showByCompid = (req, res, next) => {
  console.log('line48', req.body);
  const companyid = new mongoose.Types.ObjectId.createFromHexString(req.body.companyid.replace("'",""));
  Employees.find({ companyid: companyid })
  .then((employees) => employees.map((employee) => employee.view()))
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) => {
  Employees.findById(params.id)
    .then(notFound(res))
    .then((employees) => employees ? employees.view() : null)
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
Employees.find(query, select, cursor)
    .then((employees) => employees.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) => {
  Employees.findOneAndUpdate({ _id: params.id }, { name: body.name, email: body.email }, {upsert:false, new: true})
    .then(notFound(res))
    .then((employees) => employees ? _.merge(employees, body).save() : null)
    .then((employees) => employees ? employees.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
Employees.findById(params.id)
    .then(notFound(res))
    .then((employees) => employees ? employees.remove() : null)
    // .then((employees) => employees ? _.merge(employees, { status: 'DELETED' }).save() : null)
    .then(success(res, 204))
    .catch(next)

