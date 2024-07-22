const authorisationModel = require('../models/authorisation');

exports.checkAuthorisation = async (req, res, UserID, RoleID) => {
  try {
    const auth = await authorisationModel.getAuthorisation({ UserID, RoleID });

    if (auth === 1) {
      return { authorised: true}
    } else {
      return { authorised: false}
    }
  } catch (error) {
    res.status(500).json({ message: 'Error authorising.', error: error.message });
  }
};