import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: 'https://api.graph.cool/simple/v1/swapi'}),
      // link: httpLink.create({ uri: 'https://api.graphqlplaceholder.com/'}),
      cache: new InMemoryCache()
    }, 'testEndpoint')
    apollo.create({
      // link: httpLink.create({ uri: 'http://airkiosk.itworks.org.pl/graphql'}),
      link: httpLink.create({ uri: 'http://magento.local:3000/graphql'}),
      cache: new InMemoryCache()
    }, 'magentoEndpoint')
  }
}
