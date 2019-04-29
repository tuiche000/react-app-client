
let config = {}
const bases = {
    dev: {
        apiBase: 'http://unitest.fosunholiday.com',
        mBase: 'http://h5test.gofoliday.com/',
    },
    // prod: {
    //     apiBase: 'http://unitest.fosunholiday.com',
    //     mBase: 'http://h5test.gofoliday.com/',
    // },
    prod: {
        apiBase: 'http://api.fosunholiday.com',
        mBase: 'http://h5.gofoliday.com/',
    },
    test: {
        apiBase: 'http://unitest.fosunholiday.com',
        mBase: 'http://h5test.gofoliday.com/',
    }
}
switch (process.env.NODE_ENV) {
    case "development":
        config = bases.dev
        break;
    case "production":
        config = bases.prod
        break;
    case "test":
        config = bases.test
        break;
    default:
    //
}
export default config
