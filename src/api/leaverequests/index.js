import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, getbyfromid, getbytoid } from './controller'
import { schema } from './model'
export Leaverequests, { schema } from './model'

const router = new Router()
const { from, to, createdBy, leaveDate, leaveReason, status, companyid } = schema.tree

/**
 * @api {post} /pmployees Create pmployees
 * @apiName CreateEmployees
 * @apiGroup Employees
 * @apiParam countryName Country's name.
 * @apiParam status Country's status.
 * @apiSuccess {Object} Employees Country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Employees not found.
 */
router.post('/',
    body({ from, to, createdBy, leaveDate, leaveReason, status, companyid }),
    create)

/**
 * @api {get} /pmployees Retrieve country
 * @apiName RetrieveCountry
 * @apiGroup Employees
 * @apiUse listParams
 * @apiSuccess {Object[]} pmployees List of pmployees.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)
    
    /**
 * @api {get} /projects/:id Retrieve projects
 * @apiName RetrieveProjects
 * @apiGroup Projects
 * @apiSuccess {Object} projects country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 projects not found.
 */

/**
 * @api {get} /pmployees/:id Retrieve pmployees
 * @apiName RetrieveEmployees
 * @apiGroup Employees
 * @apiSuccess {Object} pmployees country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 pmployees not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /pmployees Create pmployees
 * @apiName CreateEmployees
 * @apiGroup Employees
 * @apiParam countryName country's countryName.
 * @apiParam status country's status.
 * @apiSuccess {Object} Employees country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Employees not found.
 */
router.put('/:id',
    body({ from, to, createdBy, leaveDate, leaveReason, status, companyid }),
    update)

/**
* @api {delete} /pmployees/:id Delete pmployees
* @apiName DeleteEmployees
* @apiGroup Employees
* @apiSuccess (Success 204) 204 No Content.
* @apiError 404 Employees not found.
*/
router.delete('/:id',
    destroy)

router.get('/byfromid/:id', getbyfromid)
router.get('/bytoid/:id', getbytoid)

export default router