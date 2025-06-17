import { defineQuery } from 'next-sanity'

//  single contact info document
export const SINGLE_CONTACT_INFO_QUERY = defineQuery(`
  *[_type == "contactinfo"][0] {
    _id,
    _type,
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
      someUrl,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        hotspot,
        crop
      }
    }
  }
`)

// query for contact persons
export const CONTACT_PERSONS_QUERY = defineQuery(`
  *[_type == "contactinfo"][0].contactPersons[] {
    _key,
    namePerson,
    position,
    email,
    phone
  }
`)

// query just social links
export const SOCIAL_LINKS_QUERY = defineQuery(`
  *[_type == "contactinfo"][0].socialLinks[] {
    _key,
    someUrl,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    }
  }
`)
