import {contact} from '../service/index'
import {validationResult} from 'express-validator/check'

let findUsersContact = async (req, res) => {
  let errorsArr = [];
  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(element => {
      errorsArr.push(element.msg);
    });
    /**
     * Flash is middleware use for attaching req and rendering to client by jade engine
     */
    return res.status(500).send(errorsArr);
  }

  try {
    let currentUserId = req.user._id;
    let keyword = req.params.keyword;

    let users = await contact.findUserContact(currentUserId, keyword);
    return res.render("main/contact/section/_findUserContact", {users});
  } catch (error) {
    return res.status(500).send(error);
  }
};

let addNew = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let newContact = await contact.addNew(currentUserId, contactId);
    //Create a new document will retunrs status true or false. True appear when user click add new
    // once time and false when they click for more than one
    return res.status(200).send({success: !!newContact});
  } catch (error) {
    return res.status(500).send(error);
  };
};

let removeRequestContact = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let removeContact = await contact.removeRequestContact(currentUserId, contactId);
    return res.status(200).send({success: !!removeContact});
  } catch (error) {
    return res.status(500).send(error);
  };
};
module.exports = {
  findUsersContact : findUsersContact,
  addNew : addNew,
  removeRequestContact : removeRequestContact
}