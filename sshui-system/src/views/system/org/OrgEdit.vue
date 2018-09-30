<template>
    <div>
        <iForm :model="org" ref="orgValidate" :rules='ruleValidate' label-position="right" :label-width="150">
            <iFormItem :label="$t('system.label.org.parentOrgCode')" prop="parentOrgCode">
                <iInput v-model="org.parentOrgCode"
                        :placeholder="$t('placeholder.default',[$t('system.label.org.parentOrgCode')])"
                />
            </iFormItem>
            <iFormItem :label="$t('system.label.org.orgCode')" prop="orgCode">
                <iInput v-model="org.orgCode"
                        :placeholder="$t('placeholder.default',[$t('system.label.org.orgCode')])"
                />
            </iFormItem>
            <iFormItem :label="$t('system.label.org.orgName')" prop="orgName">
                <iInput v-model="org.orgName"
                        :placeholder="$t('placeholder.default',[$t('system.label.org.orgName')])"
                />
            </iFormItem>
            <iFormItem :label="$t('system.label.org.orgCategory')" prop="orgCategory">
                <sSelect v-model="org.orgCategory" dict="ORG_CATEGORY"
                         :placeholder="$t('placeholder.default',[$t('system.label.org.orgCategory')])"
                />
            </iFormItem>

        </iForm>
    </div>
</template>

<script>
    export default {
        name: "OrgEdit",
        data() {
            return {
                org: {},
                ruleValidate: {
                    parentOrgCode: [
                        {required: true, message: 'The parentOrgCode cannot be empty', trigger: 'blur'}
                    ],
                    orgCode: [
                        {required: true, message: 'The orgCode cannot be empty', trigger: 'blur'}
                    ]
                }
            }
        },
        props: {
            data: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>
