<template>
    <div>
       <!-- <div class="demo-split">
            <iSplit v-model="split1">
                <div slot="left" class="demo-split-pane">-->
                    <OrgQuery @on-query="d=>retData=d"></OrgQuery>
                    <OrgList :data="[retData]" @on-add="toAdd" @on-del="toDel"></OrgList>
               <!-- </div>
                <div slot="right" class="demo-split-pane">
                    Right Pane
                </div>
            </iSplit>
        </div>-->

        <iModal v-model="editDialog" title="机构管理" draggable @on-ok="save"
                :loading="loading">
            <OrgEdit :data="currentRow" ref="edit"></OrgEdit>
        </iModal>
    </div>
</template>

<script>
    import OrgQuery from './OrgQuery'
    import OrgList from './OrgList'
    import OrgEdit from './OrgEdit'

    export default {
        name: "OrgManage",
        data() {
            return {
                retData: {},
                currentRow: {},
                editDialog: false,
                isCollapsed: false,
                loading: true,
                split1: 0.3
            }
        },
        props: ['option'],
        components: {OrgQuery, OrgList, OrgEdit},
        methods: {
            toAdd(d) {
                this.currentRow = d;
                this.editDialog = true;
            },
            toDel(d) {
                /*this.currentRow = d;
                this.$Modal.confirm({
                  title: '确定要删除该记录吗？', onOk: function () {
                    alert(d.menuCode);
                  }
                })*/
                this.$PageUtil.delete('/system/org/' + d.orgCode, {}, {
                    error: function (message) {
                        this.loading = false;
                        //this.$Modal.error({});
                        this.$nextTick(() => {
                            this.loading = true;
                        });
                    }, success: function (data) {
                        //this.$Modal.success({});
                    }
                });
            },
            save() {
                this.$refs.edit.$refs['orgValidate'].validate((valid) => {
                    if (valid) {
                        console.log(JSON.stringify(this.$refs.edit.org))

                        this.$PageUtil.post('/system/org', Object.assign(this.$refs.edit.org, {parentOrgCode: this.currentRow.orgCode}), {
                            error: function (message) {
                                this.loading = false;
                                //this.$Modal.error({});
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                            }, success: function (data) {
                                //this.$Modal.success({});
                            }
                        });

                        return true;
                    } else {
                        this.loading = false;
                        this.$nextTick(() => {
                            this.loading = true;
                        });
                        return false;
                    }
                })

            }
        }
    }
</script>

<style scoped>
</style>
