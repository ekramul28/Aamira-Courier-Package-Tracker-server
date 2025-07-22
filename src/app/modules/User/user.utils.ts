// import { TAcademicSemester } from '../AcademicSemester/academicSemester.interface';
import { TUser } from './user.interface';
import { User } from './user.model';

const findLastCustomer = async () => {
  const lastCustomer = await User.findOne(
    {
      role: 'customer',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastCustomer?.id ? lastCustomer.id.substring(2) : undefined;
};

export const generateCustomerLastId = async () => {
  let currentId = (0).toString();
  const lastCustomerId = await findLastCustomer();

  if (lastCustomerId) {
    currentId = lastCustomerId;
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `C-${incrementId}`;
  return incrementId;
};

const findLastAdmin = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdmin();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;

  return incrementId;
};
