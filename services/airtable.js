import Airtable from 'airtable'

const database = new Airtable({apiKey: 'keyewgm9mqGHbFBhY'}).base('appcV1lVAzuUM2YKr')

export { database }