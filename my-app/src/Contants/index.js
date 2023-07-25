export const APP_ROUTERS = {
    CUSTOMER: {
        INDEX: {
            LABEL: 'QUAN LI KHACH HANG',
            VALUE: '/admin/customer/index'
        },
        ADD: {
            LABEL: 'QUAN LI KHACH HANG',
            VALUE: '/admin/customer/add'
        },
        SEARCH: {
            LABEL: 'QUAN LI KHACH HANG',
            VALUE: '/admin/customer/search/:name'
        },
    },
    APPOINTMENT: {
        INDEX: {
            LABEL: 'QUAN LI LICH HEN',
            VALUE: '/admin/appointment/index'
        },
        ADD: {
            LABEL: 'QUAN LI LICH HEN',
            VALUE: '/admin/appointment/add'
        },
        DETAIL: {
            LABEL: 'QUAN LI LICH HEN',
            VALUE: '/admin/appointment/detail/:id'
        },
    }
}