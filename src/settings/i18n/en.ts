export default {
    LOGIN: {
        TITLE: 'Welcome',
        DESCRIPTION: 'Login',
        EMAIL: 'E-mail',
        EMAIL_PLACEHOLDER: 'Enter your e-mail',
        PASSWORD: 'Password',
        PASSWORD_PLACEHOLDER: 'Enter your password',
        RECOVERY: 'Forgot password?',
        BUTTON: 'Sing In',
        LOGOUT: 'Logout',
        ERROR: {
            INVALID: 'Invalid email or password',
        },
    },
    TOP_BAR : {
        PROFILE: 'Profile'
    },
    FOOTER: 'Developed by',
    DASHBOARD: {
        MODULE: 'Dashboard'
    },
    SETTINGS: {
        MODULE: 'Settings',
        BANNER: {
            TITLE: 'Menu Banner',
        },
        NAME: {
            TITLE: 'Name',
            REQUIRED: 'Name is required',
        },
        DESCRIPTION: 'Description (Optional)',
        BUTTON: {
            SAVE: 'Save',
            IMAGE: 'Change Image',
            ADJUST: 'Cover',
        },
        TOAST: {
            SUBMIT: {
                SUCCESS: 'Settings saved successfully',
                ERROR: 'An error occurred while saving your settings',
            },
        }
    },
    CATEGORIES: {
        MODULE: 'Categories',
        DESCRIPTION: 'Manage Categories',
        SEARCH: 'Search ...',
        MODAL_TITLE: 'Category Details',
        INPUT: {
            NAME: {
                TITLE: 'Name',
                REQUIRED: 'Name is required',
            },
            STATUS: 'Status',
        },
        BUTTONS: {
            NEW: 'New Category',
        },
        TABLE: {
            CURRENT_PAGE: 'Displaying {first} to {last} of {totalRecords} categories',
            NAME: 'Name',
            STATUS: 'Status',
        },
        STATUS: {
            ACTIVE: 'Active',
            INACTIVE: 'Inactive',
        },
        DELETE_MODAL: {
            TITLE: 'Confirm',
            DESCRIPTION: 'Are you sure you want to delete {0} and {1} its items?',
            1: 'all'

        },
        TOAST: {
            SUBMIT: {
                SUCCESS: 'Category saved successfully',
                ERROR: 'An error occurred while saving the category',
            },
            FETCH_ERROR: 'An error occurred while loading the category list, please try again',
        },
    },
    PRODUCTS: {
        MODULE: 'Products',
        DESCRIPTION: 'Manage Products',
        SEARCH: 'Search ...',
        MODAL_TITLE: 'Product Details',
        INPUT: {
            NAME: {
                TITLE: 'Name',
                REQUIRED: 'Name is required',
            },
            DESCRIPTION: 'Description (Optional)',
            CATEGORY: {
                TITLE: 'Category',
                PLACEHOLDER: 'Select a category',
                REQUIRED: 'Category is required.',
            },
            STATUS: 'Status',
            PRICE: 'Price',
        },
        BUTTONS: {
            NEW: 'New Product',
            NEW_PRICE: 'New Price',
        },
        TABLE: {
            CURRENT_PAGE: 'Displaying {first} to {last} of {totalRecords} products',
            IMAGE: 'Image',
            NAME: 'Name',
            CATEGORY: 'Category',
            STATUS: 'Status',
        },
        STATUS: {
            ACTIVE: 'Active',
            INACTIVE: 'Inactive',
            OUTOFSTOCK: 'Out of Stock',
        },
        PRICES: {
            SMALL: 'Small',
            MEDIUM: 'Medium',
            LARGE: 'Large',
        },
        DELETE_MODAL: {
            TITLE: 'Confirm',
            DESCRIPTION: 'Are you sure you want to delete',
        },
        TOAST: {
            SUBMIT: {
                SUCCESS: 'Product saved successfully',
                ERROR: 'An error occurred while saving your product',
            },
            FETCH_ERROR: 'An error occurred while loading the product list, please try again',
        },
    },
    QR_CODE: {
        MODULE: 'QR Code',
        CARD: {
            MENU: 'MENU',
            INFO: 'Scan or access the link below',
        },
        DOWNLOAD: {
            SIMPLE: 'Download simple QRCode',
            STYLED: 'Download styled QRCode',
        }
    },
    TOAST: {
        SUMMARY: {
            SUCCESS: 'Success',
            ERROR: 'Error',
        },
        ERROR: {
            IMAGE: 'An error occurred while saving the image',
            DELETE: 'An error occurred while deleting',
            FETCH: 'An error occurred while loading the data, please try again',
        },
        SUCCESS: {
            DELETE: 'Deleted successfully',
        }
    },
    COMMON: {
        BUTTONS: {
            SAVE: 'Save',
            CANCEL: 'Cancel',
            IMAGE: 'Change Image',
            ADJUST: 'Cover',
            YES: 'Yes',
            NO: 'No',
        },
        UPLOADER: {
            DESCRIPTION: 'Select or drag and drop the image here',
            REQUIRED: 'Image is required',
        }
    },
}
