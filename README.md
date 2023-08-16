# Json Widgets Micro-Frontend

This is a Micro-Frontend written in Angular that can render a collection of configurable widgets in the UI. All the configuration are passed by a simple JSON string or JavaScript Object.

Being a Micro-Frontend, this can be used in any web-application be it Angular, React, Vue or even simple HTML + JS page.
An example of its use in a simple HTML page is given in the [demo](./demo/) folder.

### Usage

To use this Micro-Frontend, you need to first import its `main.js` and `style.css` files in your `index.html` file of the application where you want to render the widget collection. In case of non-Angular applications, you need to import the `polyfills.js` file as well.

```html
<link rel="stylesheet" href="http://localhost:4251/json-widgets-micro-frontend/styles.css" />
<script src="http://localhost:4251/json-widgets-micro-frontend/polyfills.js"></script>
<script src="http://localhost:4251/json-widgets-micro-frontend/main.js"></script>
```

Then use the HTML tag `json-widgets` with appropriate inputs and outputs to use this.

---

### Inputs & Outputs

Inputs

jsonInput | Mandatory | The main JSON should be given as input here either as JSON String or JavaScript Object
variables | Optional | This should be a JS Object containing the variables required either for the GraphQL Variables or to be referenced in the widgets
baseURL | Optional | For all the requests, this baseURL will be appended before the url in the requests
tokens| Optional | This should be a JS Object containing the variables required to be referenced for the authToken in the requests

jsonInput Structure

The jsonInput Structure consists of 2 parts: the requests part and the widgets display configuration part

Requests
