# vue-bootstrap-paginator
A simple Bootstrap Paginator component for vue.js

This is my first Vue component based on the homework to the book
[The Majesty Of Vue.js](https://leanpub.com/vuejs). It provides a Bootstrap
paginator in order to navigate through paginated Lists that are delivered 
from an apropriate Web API endpoint. 

The example page uses the Web API provided from my [WebApiCoreExample project](https://github.com/miseeger/WebApiCoreExample).

![PaginatorStart](https://github.com/miseeger/vue-bootstrap-paginator/blob/master/img/paginator_1.png?raw=true "Paginator first page")
![PaginatorEnd](https://github.com/miseeger/vue-bootstrap-paginator/blob/master/img/paginator_2.png?raw=true "Paginator last page")

The component itself needs to be fed with three properties:

* __total-pages__ - The total page count of the data to be retrieved from the Web API (delivered with the API request).
* __pages-per-segment__ - Number of page "buttons" shown in the paginator control.
* __current-page__ - The Current page number which is two-way-bound with the Vue element.

They can be placed in the data of the Vue element like this:

```javascript
data: {
    pagination: {
        pagesPerSegment: 2,
        totalPages: 0,
        currentPage: 0                    
    },
    apiUrl: 'http://localhost:5000/api/stories/page/',
    rows: []
}    
``` 

In order to use the paginator component, the Vue element has to do two things:

1) Initialize the row data to be displayed for and set the intial Page (usually page #1).
```javascript
ready: function(){
    this.$http.get('http://localhost:5000/api/stories/page/1')
        .then(function(response){
            this.$set('rows', response.data);
            this.pagination.totalPages = response.data.pagination.lastPage;
            this.pagination.currentPage = 1;
        });
}
```
2) Watch the currentPage property
```javascript
watch: {
    'pagination.currentPage': function (val, oldVal) {
        this.$http.get(this.apiUrl + val)
            .then(function(response){
                this.$set('rows', response.data);
            })
    }
} 
```

When done, the paginator can be used:
```html
<div class="col-md-12">
    <h1>Let's hear some stories!</h1>
    <bs-paginator 
        :total-pages="pagination.totalPages" 
        :pages-per-segment="pagination.pagesPerSegment" 
        :current-page.sync="pagination.currentPage">
    </bs-paginator>
</div>
```