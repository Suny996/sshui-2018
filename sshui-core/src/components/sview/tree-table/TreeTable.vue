<template>
    <div>
        <iTable :data="formatData" :columns="formatColumns">
        </iTable>
    </div>

</template>

<script>
    /**
     Auth: Lei.j1ang
     Created: 2018/1/19-13:59
     */
    //import treeToArray from './eval'
    import {Table} from 'iview'

    export default {
        name: 'TreeTable',
        data() {
            return {
                tdata: [],
                tcolumns: []
            }
        },
        props: {
            /* eslint-disable */
            data: {
                type: [Array, Object],
                required: true
            },
            columns: {
                type: Array,
                default: () => []
            },
            evalFunc: Function,
            evalArgs: Array,
            expandAll: {
                type: Boolean,
                default: false
            }
        },
        /* mounted: function () {
             this.tdata = this.data;
             //this.tcolumns = this.columns;
         },*/
        /* watch: {
             data() {
                 //if(!this.tdata){
                     this.tdata = this.data;
                 //}
                 //this.tcolumns = this.formatColumns();
             }
         },*/
        computed: {
            // 格式化数据源
            formatData: function () {
                let tmp
                if (!Array.isArray(this.data)) {
                    tmp = [this.data]
                } else {
                    tmp = this.data
                }
                try {
                    tmp[0].children[0]['_disableExpand'] = true;
                } catch (e) {
                }
                return tmp
            },
            // 格式化column
            formatColumns: function () {
                let tmp = [{
                    type: 'expand',
                    //width: '20px',
                    title:'test',
                    key:'menuCode',
                    render: (h, params) => {
                        return h(Table, {
                            props: {
                                data: params.row.children,
                                columns: tmp,
                                showHeader:false,
                                width: '100%',
                                style: "overflow-y: hidden;max-height: 522px;"
                            }
                        })
                    }
                }]
                if (!Array.isArray(this.columns)) {
                    tmp.push(this.columns)
                } else {
                    tmp = tmp.concat(this.columns);
                }
                return tmp;
            },
        }
    }
</script>
<style>
    .treeRowHiden {
        /*display: inline;*/
        color: red;
    }

    .treeRowDisp {
        /*display: inline;*/
        color: black;
    }

    td.ivu-table-expanded-cell {
        padding: 0;
    }

    /*<!--@keyframes treeTableShow {
      from {opacity: 0;}
      to {opacity: 1;}
    }
    @-webkit-keyframes treeTableShow {
      from {opacity: 0;}
      to {opacity: 1;}
    }*/
</style>
