const SERVICES = {
  all: 'placeholder-for-all-services',
  iam: 'hospital-iam',
  user: 'hospital-user',
};

const SERVICE_ENDPOINT_MAPPING = {
  'hospital-iam': 'HOSPITAL_IAM_ENDPOINT',
  'hospital-user': 'HOSPITAL_USER_ENDPOINT',
};

const PERMISSION_LIST = [
  {
    key: 'UserManagement',
    value: 'User Management'
  },
];

const URL_EXPIRE_SECONDS = {
  'seconds': 3600
};

module.exports = {
  SERVICE_NAME: SERVICES.iam,
  SERVICES,
  SERVICE_ENDPOINT_MAPPING,
  PERMISSION_LIST,
  URL_EXPIRE_SECONDS
};
