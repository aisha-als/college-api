const { getConnection } = require('../services/db');

class Authorisation {
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    static async getAuthorisation(authData) {
        const connection = await getConnection();
        try {
            const [result] = await connection.query(
                'SELECT COUNT(*) AS authcheck FROM users WHERE UserID = ? AND RoleID = ?;',
                [authData.UserID, authData.RoleID]
            );
            return result[0].authcheck;
        } finally {
            connection.end();
        }
    };
}

module.exports = Authorisation;