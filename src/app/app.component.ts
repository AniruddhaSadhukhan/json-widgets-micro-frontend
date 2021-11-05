import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'json-widgets-micro-frontend';

  variables = {
    id: 1,
  };
  tokens = {
    as: 'ani',
  };

  report = {
    // For single request, 'request' can be object instead of array
    // Eg : request : {url,method,body,authToken...}
    // For multiple request, the 'request' should be array
    // Methods Supported (case insensative) : GraphQl, Get, Post
    // Each request should have the following :
    // url, method, body, authToken (optional)

    request: [
      {
        url: 'https://graphqlzero.almansi.me/api',
        method: 'graphql',
        authToken: '${{as}}',
        // GraphQL body can be an array if more than one query is needed
        body: [
          {
            query: `
              query($id:ID!){
                user(id: $id) {
                  id
                  name
                }
              }
            `,
            // Variables for this GraphQL is not defined here,
            // but the microfrontend has got 'variables' as input
            // Those will be used for all the graphql in addition to
            // the explicitly given variables in each graphql (if any)
          },
          {
            query: `
              query($id:ID!){
                user(id: $id) {
                  id
                  name
                }
              }
            `,
            // If any GraphQL has any variable which is also defined in the global variable input,
            // always the explicitly given variables will take priority
            variables: {
              id: 2,
              h: 0,
            },
          },
        ],
      },
      {
        url: 'https://graphqlzero.almansi.me/api',
        method: 'graphql',
        body: {
          query: `
            query {
              users{
                data{
                  id
                }
              }
            }
            `,
        },
      },
    ],

    rows: [
      {
        widgets: [
          {
            classes: ['col-2'],
            widget: 'small-stat',
            title: 'Total Users',
            value: '${{1.data.users.data}}.length',
            a: {
              b: [
                {
                  c: [
                    6,
                    '${{1.data.users.data}}.length',
                    '()=>{let s=${{1.data.users.data}}.length; return s+50+#{{id}}}',
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  };
}
