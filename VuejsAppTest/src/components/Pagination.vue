<template>
    <div v-if="totalPages !== 1" class="col-md-12">
        <nav aria-label="Page navigation movies">
            <ul class="pagination justify-content-center">
                <li :class="[page===1 ? 'disabled' : '', 'page-item']">
                    <a class="page-link" @click="changePage(page - 1)"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
                </li>
                <li v-for="n in totalPages"
                    v-if="Math.abs(n - page) < 3 || n == totalPages || n == 1"
                       :class="{ 'current': page === n, 'last': (n == totalPages && Math.abs(n - page) > 3), 'first':(n == 1 && Math.abs(n - page) > 3)}"
                >
                    <a @click="changePage(n)" class="page-link" >
                        {{ n }}
                    </a>
                </li>
                <li :class="[page===totalPages ? 'disabled' : '', 'page-item']">
                    <a class="page-link" @click="changePage(page + 1)"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        props: ['page', 'totalPages', 'totalResults'],
        methods: {
            changePage(pageNb) {
                //console.log("Pagination changePage", pageNb);
                this.$emit('changePage', pageNb);
            }
        },
    }
</script>

<style scoped>
    .pagination li {
        display: inline-flex;
        cursor: pointer;
    }
    li.first::after,
    li.last::before {
        cursor: default;
        position: relative;
        display: block;
        content: '...';
        padding: .5rem .75rem;
        margin-left: -1px;
        line-height: 1.25;
        color: #007bff;
        background-color: #fff;
        border: 1px solid #dee2e6;
    }
    li.current .page-link {
        color: #fff;
        background-color: #007bff;
        border: 0;
        cursor: default;
    }
</style>