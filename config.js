var DEBUG = (process.env.NODE_ENV !== 'production');

module.exports = {
    pguser: "pggstduser",
    pgpass: "vivirencanada",
    pgdb: "pggclient",
    pghost: "ec2-204-236-171-205.us-west-1.compute.amazonaws.com",
    pgport: 5432,
    /** Session secret. */
    secret: 'I am a session secret. Please change me (and keep me a secret).',
    /** Default cookie lifetime is 1 day. */
    COOKIE_LIFETIME: 1000 * 60 * 60 * 24,
    /** Default fav icon lifetime is 30 days. */
    FAVICON_LIFETIME: 1000 * 60 * 60 * 24 * 30,
    /** Whether we're in development mode. */
    DEBUG: DEBUG,
    /** Current node environment. */
    env: (process.env.NODE_ENV || 'development'),
    /** Port to use. */
    port: process.env.PORT || 3131,
    host: process.env.IP || 'localhost',
    enableSMTP: true, /** Your SMTP information. You can use gmail or your own server. */
    SMTP: {
        host: "smtp.gmail.com",
        port: 587,
        ssl: false,
        use_authentication: true,
        user: "your@email.here",
        pass: "yourpasswordhere"
    }
};
