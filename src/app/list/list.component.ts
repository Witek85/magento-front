import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';

import { Person, PersonId, PersonIdQuery, PersonQuery, Country, CountryQuery } from '../types';

const GET_ALLPERSONS = gql`
  query allPersons {
    allPersons {
      id
      name
    }
  }
`;

const GET_ALLPERSONIDS = gql`
  query allPersonIds {
    allPersons {
      id
    }
  }
`;

const GET_COUNTRIES = gql`
  query countriesQuery {
    countries {
      full_name_english
      full_name_locale
    }
  }
`;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  persons: Observable<any>
  // persons: Observable<Person[]>
  personIds: Observable<any>
  // personIds: Observable<PersonId[]>
  countries: Observable<any>
  // countries: Observable<Country[]>

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    console.log('works');

    this.countries = this.apollo.use('magentoEndpoint').watchQuery<any>({
      query: GET_COUNTRIES
    }).valueChanges
    .pipe(
      map( result => {
        console.log('result', result)
        return result.data.countries;
      })
    );


    // this.persons = this.apollo.use('magentoEndpoint').watchQuery<CountryQuery>({
    //   query: GET_COUNTRIES
    // }).valueChanges
    // .pipe(
    //   map( result => {
    //     console.log('result', result)
    //     return null
    //     // return result.data.allPersons
    //   })
    // );

    this.personIds = this.apollo.use('testEndpoint').watchQuery<any>({
      query: GET_ALLPERSONIDS
    }).valueChanges
    .pipe(
      map( (result) => {
        console.log('result', result)
        return result.data.allPersons
      })
    );

    this.persons = this.apollo.use('testEndpoint').watchQuery<any>({
      query: GET_ALLPERSONS
    }).valueChanges
    .pipe(
      map( (result) => {
        console.log('result', result)
        return result.data.allPersons
      })
    );

    // WORKING
    // this.persons = this.apollo.use('testEndpoint').watchQuery<PersonQuery>({
    //   query: GET_ALLPERSONS
    // }).valueChanges
    // .pipe(
    //   map( (result, all) => {
    //     console.log('all', all)
    //     console.log('result', result)
    //     return result.data.allPersons
    //   })
    // );


  }

}

// {
//   allPersons {
// 	birthYear,
//     height,
//     mass,
//     name
//     films {
//       director
//     }
//   }
// }

// {
//   countries {
//     full_name_english
//     full_name_locale
//   }
// }

