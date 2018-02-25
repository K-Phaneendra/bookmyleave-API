import { Router } from 'express'
import projects from './projects'
import activities from './activities'
import projectviews from './projectviews'
import employees from './employees'
import employeesview from './employeesview'
import roles from './roles'
import permissions from './permissions'
import projectresources from './projectresources'
import employeeroles from './employeeroles'
import employeepermissions from './employeepermissions'
import rolesandpermissions from './rolesandpermissions'
import workingtypes from './workingtypes';
import activityresources from './activityresources';
import viewresourceactivities from './viewresourceactivities';
import clockinhours from './clockinhours';
import projectvestings from './projectvestings';
import calendar from './calendar';
import locations from './locations';
import timecorrections from './timecorrections';
import projectaccessrequests from './projectaccessrequests';
import activitycodes from './activitycodes';
import companies from './companies';

import profilepictures from './profilepictures';
import timesheets from './timesheets';
import leavehours from './leavehours';
import freezetimesheets from './freezetimesheets';
import notifications from './notifications';
import viewprojectaccessrequests from './viewprojectaccessrequests';
import employeesdetails from './employeesdetails';
import otheractivities from './otheractivities';
import usertokens from './usertokens';
import forgotpasswordtokens from './forgotpasswordtokens';

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/projects', projects)
router.use('/activities', activities)
router.use('/projectviews', projectviews)
router.use('/employees', employees)
router.use('/employeesview', employeesview)
router.use('/roles', roles)
router.use('/permissions', permissions)
router.use('/projectresources', projectresources)
router.use('/employeeroles', employeeroles)
router.use('/employeepermissions', employeepermissions)
router.use('/rolesandpermissions', rolesandpermissions)
router.use('/workingtypes', workingtypes)
router.use('/activityresources', activityresources)
router.use('/viewresourceactivities', viewresourceactivities)
router.use('/clockinhours', clockinhours)
router.use('/projectvestings', projectvestings)
router.use('/calendar', calendar)
router.use('/projectaccessrequests', projectaccessrequests)
router.use('/locations', locations)
router.use('/timecorrections', timecorrections)
router.use('/activitycodes', activitycodes)
router.use('/companies', companies)
router.use('/profilepictures', profilepictures)
router.use('/timesheets', timesheets)
router.use('/leavehours', leavehours)
router.use('/freezetimesheets', freezetimesheets)
router.use('/otheractivities', otheractivities)
router.use('/notifications', notifications)
router.use('/viewprojectaccessrequests', viewprojectaccessrequests)
router.use('/employeesdetails', employeesdetails)
router.use('/usertokens', usertokens)
router.use('/forgotpasswordtokens', forgotpasswordtokens)

export default router
