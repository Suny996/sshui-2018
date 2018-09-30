<template>
    <div>
        <iTable :data="formatData" :columns="formatColumns" :row-class-name="showRow">
            <!--<el-table-column v-if="columns.length===0" width="150">
              <template slot-scope="scope">
                <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
                <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                  <i v-if="!scope.row._expanded" class="el-icon-plus"/>
                  <i v-else class="el-icon-minus"/>
                </span>
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
              <template slot-scope="scope">-->
            <!-- Todo -->
            <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
            <!-- <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
             <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
               <i v-if="!scope.row._expanded" class="el-icon-plus"/>
               <i v-else class="el-icon-minus"/>
             </span>
             {{ scope.row[column.value] }}
           </template>
         </el-table-column>
         <slot/>-->
        </iTable>
    </div>

</template>

<script>
    /**
     Auth: Lei.j1ang
     Created: 2018/1/19-13:59
     */
    import treeToArray from './eval'

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
                const func = this.evalFunc || treeToArray
                const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
                let d = func.apply(null, args)
                //console.log(">>>>>>>" + JSON.stringify(d));
                return d
            },
            // 格式化column
            formatColumns: function () {
                let tmp
                if (!Array.isArray(this.columns)) {
                    tmp = [this.columns]
                } else {
                    tmp = this.columns
                }

                tmp[0].render = ((h, params) => {
                    return h('div', [
                        h('span', {
                            style: {
                                display: 'inline-block',
                                width: (params.row._level - 1) * 25 + 'px'
                            }
                        }, ' '),
                        h('Icon', {
                            props: {
                                type: params.row.children > 0 ? params.row.__expanded ? 'ios-arrow-down' : 'ios-arrow-forward' : ''
                            },
                            on: {
                                click: () => {
                                    this.toggleExpanded(params.row._index)
                                }
                            }
                        }),
                        h('strong', params.row[tmp[0].key])
                    ]);
                })
                return tmp;
            },
        },
        methods: {
            showRow: function (row) {
                //alert(JSON.stringify(row)+"   ||   "+JSON.stringify(row.parent));
                const show = (row.parent ? row.parent.__expanded : true)
                console.log(row.menuName+"------" + show)
                console.log(">>>>>>" + JSON.stringify(row))
                return show ? 'treeRowDisp' : 'treeRowHiden'
            },
            // 切换下级是否展开
            toggleExpanded: function (trIndex) {
                //alert(trIndex)
                //const record = this.formatData[trIndex]
                //record.__expanded = !record.__expanded
                this.data[trIndex].__expanded =  !this.data[trIndex].__expanded
                //record.age = record.age + 1
                //alert(">>>>>>" + JSON.stringify(this.data));
                console.log(">>>>>>" + JSON.stringify(this.formatData))
            }
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

    /*<!--@keyframes treeTableShow {
      from {opacity: 0;}
      to {opacity: 1;}
    }
    @-webkit-keyframes treeTableShow {
      from {opacity: 0;}
      to {opacity: 1;}
    }*/
</style>
