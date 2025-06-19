import { defineQuery } from 'next-sanity'

//  single contact info document
export const SINGLE_CONTACT_INFO_QUERY = defineQuery(`
  *[_type == "contactinfo" && !(_id in path("drafts.**"))][0] {
    _id,
    _type,
    email,
    address,
    postbox,
    contactPersons[] {
      _key,
      namePerson,
      position,
      email,
      phone
    },
    socialLinks[] {
      _key,
      platform,
      someUrl
    }
  }
`)

// query for contact persons and social links
export const FOOTER_CONTACT_QUERY = defineQuery(`
  *[_type == "contactinfo" && !(_id in path("drafts.**"))][0] {
    email,
    address,
    postbox,
    socialLinks[] {
      _key,
      platform,
      someUrl
    }
  }
`)
