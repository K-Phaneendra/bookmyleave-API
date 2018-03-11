import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, checkCompanyonRegister } from './controller'
import { schema } from './model'
export Companies, { schema } from './model'

const router = new Router()
const { name, admin, createdBy, email, password } = schema.tree

/**
 * @api {post} /pmployees Create pmployees
 * @apiName CreateCompanies
 * @apiGroup Companies
 * @apiParam countryName Country's name.
 * @apiParam status Country's status.
 * @apiSuccess {Object} Companies Country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Companies not found.
 */
router.post('/',
    body({ name, admin, createdBy, email, password }),
    create)

/**
 * @api {get} /pmployees Retrieve country
 * @apiName RetrieveCountry
 * @apiGroup Companies
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
 * @apiName RetrieveCompanies
 * @apiGroup Companies
 * @apiSuccess {Object} pmployees country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 pmployees not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /pmployees Create pmployees
 * @apiName CreateCompanies
 * @apiGroup Companies
 * @apiParam countryName country's countryName.
 * @apiParam status country's status.
 * @apiSuccess {Object} Companies country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Companies not found.
 */
router.put('/:id',
    body({ name, admin, createdBy, email, password }),
    update)

/**
* @api {delete} /pmployees/:id Delete pmployees
* @apiName DeleteCompanies
* @apiGroup Companies
* @apiSuccess (Success 204) 204 No Content.
* @apiError 404 Companies not found.
*/
router.delete('/:id',
    destroy)

// check company name
router.post('/registeredCompany', checkCompanyonRegister)

export default router