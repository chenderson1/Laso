const router = require('express').Router()
const locationsRoutes = require('./locations.routes')
const supportRequestsRoutes = require('./support-requests.routes')
const institutionsRoutes = require('./institutions.routes')
const pageSectionTemplatesRoutes = require('./page-section-templates.routes')
const hackersRoutes = require('./hackers.routes')
const usersRoutes = require('./users.routes')
const profileRoutes = require('./profiles.routes')
const faqEntriesRoutes = require('./faq-entries.routes')
const clientRoutes = require('./client.routes')
const authenticate = require('../filters/authenticate')
const addressesRoutes = require('./addresses.routes')


module.exports = router;


router.use(authenticate)

// API routes (group routing modules here - no empty lines between)
router.use('/api/institutions', institutionsRoutes)
router.use('/api/support-requests', supportRequestsRoutes)
router.use('/api/hackers', hackersRoutes)
router.use('/api/addresses', addressesRoutes)
router.use('/api/users', usersRoutes)
router.use('/api/profiles', profileRoutes) 
router.use('/api/faq-entries', faqEntriesRoutes)
router.use('/api/pageSectionTemplates', pageSectionTemplatesRoutes)
router.use('/api/locations', locationsRoutes)

// API error handlers (API routes must be registered before this)
useAPIErrorHandlers(router)

router.use(clientRoutes)

function useAPIErrorHandlers(router) {
       // Handle API 404
    router.use('/api/*', (req, res, next) => {
        res.sendStatus(404)
    })
    
    // Handle API 500
    router.use((err, req, res, next) => {
        // If the error object doesn't exists
        if (!err) {
            return next()
        }

         // Log it
        console.error(err.stack)

        // Redirect to error page
        res.sendStatus(500)
    })
}


