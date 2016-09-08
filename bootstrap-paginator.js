Vue.component('bsPaginator', {
    template: 
        '<ul class="pagination">' +
        '    <li v-for="page in pageNav" :class="{\'active\': page.active}">' +
        '                <a href="#" @click="currentPage = page.pageNum">' +
        '                    <div v-show="!isNaN(page.keySymbol) || page.keySymbol == \'...\'">' +
        '                        {{ page.keySymbol }}' +
        '                    </div>' +
        '                    <div v-else>' +
        '                        <i class="fa" :class="{' +
        '                                    \'fa-angle-right\': page.keySymbol == \'>\',' +
        '                                    \'fa-angle-left\': page.keySymbol == \'<\',' +
        '                                    \'fa-angle-double-right\': page.keySymbol == \'>|\',' +
        '                                    \'fa-angle-double-left\': page.keySymbol == \'|<\'' +
        '                                }" aria-hidden="true"></i>' +
        '                    </div>' +
        '                </a>' +
        '            </li>' +
        '        </ul>',
    props: [
        'totalPages',
        'pagesPerSegment',
        'currentPage',
        'pageNav'
    ],
    watch: {
        'currentPage': function () {
            this.paginate();
        }
    },
    methods: {
        paginate: function () {
            var pages = [];
            var totalSegments = Math.floor((this.totalPages - 1) / this.pagesPerSegment) + 1;

            if (this.currentPage < 1 || this.currentPage > this.totalPages) {
                this.currentPage = 1;
            }

            var currentSegment = Math.floor((this.currentPage - 1) / this.pagesPerSegment) + 1;
            var endPage =
                (currentSegment * this.pagesPerSegment) > this.totalPages
                    ? this.totalPages
                    : (currentSegment * this.pagesPerSegment);
            var startPage =
                (this.pagesPerSegment > endPage)
                    ? 1
                    : endPage - (this.pagesPerSegment - 1);

            if (currentSegment > 1) {
                pages.push({
                    keySymbol: '|<',
                    pageNum: 1,
                    active: false
                });
                pages.push({
                    keySymbol: '<',
                    pageNum: this.currentPage - 1,
                    active: false
                });
                pages.push({
                    keySymbol: '...',
                    pageNum: startPage - 1,
                    active: false
                });
            }

            for (p = startPage; p <= endPage; p++) {
                pages.push({
                    keySymbol: '' + p,
                    pageNum: p,
                    active: p == this.currentPage
                });
            }

            if (currentSegment < totalSegments) {
                pages.push({
                    keySymbol: '...',
                    pageNum: endPage + 1,
                    active: false
                });
                pages.push({
                    keySymbol: '>',
                    pageNum: parseInt(this.currentPage) + 1,
                    active: false
                });
                pages.push({
                    keySymbol: '>|',
                    pageNum: this.totalPages,
                    active: false
                });
            }

            this.pageNav = pages;
        }

    }

});
