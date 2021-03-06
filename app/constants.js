export const API_URL = '/api';
export const PERMISSION = {
  PRODUCT: {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
    DELETE: 4,
  },
  CUSTOMER: {
    CREATE: 5,
    READ: 6,
    UPDATE: 7,
    DELETE: 8,
  },
  ORDER: {
    SALE: {
      CREATE: 9,
      READ: 10,
      UPDATE: 11,
      DELETE: 12,
    },
    PURCHASE: {
      CREATE: 25,
      READ: 26,
      UPDATE: 27,
      DELETE: 28,
    },
  },
  INVENTORY: {
    GOODS_RECEIPT: {
      CREATE: 13,
      READ: 14,
      UPDATE: 15,
      DELETE: 16,
    },
    GOODS_ISSUE: {
      CREATE: 21,
      READ: 22,
      UPDATE: 23,
      DELETE: 24,
    },
    READ: 38,
  },
  WAREHOUSE: {
    CREATE: 17,
    READ: 18,
    UPDATE: 19,
    DELETE: 20,
  },
  COST: {
    CREATE: 29,
    READ: 30,
    UPDATE: 31,
    DELETE: 32,
  },
  PERSON: {
    CREATE: 33,
    READ: 34,
    UPDATE: 35,
    DELETE: 36,
  },
  COMPANY: {
    CREATE: 39,
    READ: 40,
    UPDATE: 41,
    DELETE: 42,
  },
  IMAGE: {
    READ: 37,
  },
  CONFIGURATION: 43,
  TEMPLATE: {
    CREATE: 44,
    READ: 45,
    UPDATE: 46,
    DELETE: 47,
  },
  EMAIL: {
    SEND: 48,
    READ: 49,
  },
  LOGIN: 50,
  AUDIT: 51,
  USER: {
    CREATE: 52,
    READ: 53,
    UPDATE: 54,
    DELETE: 55,
  },
  SURVEY: {
    CREATE: 56,
    READ: 57,
    UPDATE: 58,
    DELETE: 59,
  },
  EMPLOYEE: {
    CREATE: 60,
    READ: 61,
    UPDATE: 62,
    DELETE: 63,
  },
  SHIFT: {
    CREATE: 64,
    READ: 65,
    UPDATE: 66,
    DELETE: 67,
  },
};

export const PERMISSION_TYPE = {
  OWNER: 1,
  PARTIAL: 2,
  FULL: 3,
};
/**
 * enableType:
 *  - 1: Allow User select type (OWNER/PARTIAL/FULL)
 *  - 2: Not allow (hide) user select type.
 * @type {{permissions: [{enableType: number, name: string, id: number}], name: string, id: number}[]}
 */

export const PERMISSION_MODULE = [
  {
    id: 1,
    name: 'Product',
    permissions: [
      { id: PERMISSION.PRODUCT.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.PRODUCT.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.PRODUCT.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.PRODUCT.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 2,
    name: 'Customer',
    permissions: [
      { id: PERMISSION.CUSTOMER.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.CUSTOMER.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.CUSTOMER.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.CUSTOMER.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 3,
    name: 'Order Sale',
    permissions: [
      { id: PERMISSION.ORDER.SALE.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.ORDER.SALE.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.ORDER.SALE.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.ORDER.SALE.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 4,
    name: 'Order Purchase',
    permissions: [
      { id: PERMISSION.ORDER.PURCHASE.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.ORDER.PURCHASE.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.ORDER.PURCHASE.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.ORDER.PURCHASE.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 5,
    name: 'Inventory',
    permissions: [
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.CREATE,
        name: 'Create Good Receipt',
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.READ,
        name: 'Read Good Receipt',
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.DELETE,
        name: 'Delete Good Receipt',
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.UPDATE,
        name: 'Update Good Receipt',
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.CREATE,
        name: 'Create Good Issue',
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.READ,
        name: 'Read Good Issue',
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.DELETE,
        name: 'Delete Good Issue',
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.UPDATE,
        name: 'Update Good Issue',
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.READ,
        name: 'Read Summary',
        enableType: 0,
      },
    ],
  },
  {
    id: 6,
    name: 'Warehouse Management',
    permissions: [
      { id: PERMISSION.WAREHOUSE.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.WAREHOUSE.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.WAREHOUSE.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.WAREHOUSE.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 7,
    name: 'Cost Management',
    permissions: [
      { id: PERMISSION.COST.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.COST.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.COST.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.COST.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 8,
    name: 'Person Management',
    permissions: [
      { id: PERMISSION.PERSON.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.PERSON.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.PERSON.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.PERSON.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 9,
    name: 'Configuration',
    permissions: [
      { id: PERMISSION.CONFIGURATION, name: 'Configuration', enableType: 1 },
    ],
  },
  {
    id: 10,
    name: 'Template',
    permissions: [
      { id: PERMISSION.TEMPLATE.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.TEMPLATE.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.TEMPLATE.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.TEMPLATE.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 11,
    name: 'User Management',
    permissions: [
      { id: PERMISSION.USER.CREATE, name: 'Invite', enableType: 1 },
      { id: PERMISSION.USER.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.USER.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.USER.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 12,
    name: 'Employee Management',
    permissions: [
      { id: PERMISSION.EMPLOYEE.CREATE, name: 'Invite', enableType: 1 },
      { id: PERMISSION.EMPLOYEE.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.EMPLOYEE.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.EMPLOYEE.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 13,
    name: 'shiftWork Management',
    permissions: [
      { id: PERMISSION.SHIFT.CREATE, name: 'Invite', enableType: 1 },
      { id: PERMISSION.SHIFT.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.SHIFT.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.SHIFT.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
];
