const mongoose = require('mongoose');

const AdminUserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  username:{
    type: String
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'SubAdmin'
  },
  status:{
    type: String,
  },
  permissions: {  // list of assigned modules
    type: Array
  },
  name: {
    type: String,
  },
  profileImage:{ 
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('hospital_user_admin_user', AdminUserSchema);
