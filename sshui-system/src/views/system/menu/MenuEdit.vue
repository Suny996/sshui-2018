<template>
    <div>
        <iForm :model="menu" ref="menuValidate" :rules='ruleValidate' label-position="right" :label-width="150">
            <iRow>
                <iFormItem :label="$t('system.label.menu.menuName')" prop="menuName">
                    <iInput v-model="menu.menuName"
                            :placeholder="$t('placeholder.default',[$t('system.label.menu.menuName')])"
                    />
                </iFormItem>
            </iRow>
            <iFormItem :label="$t('system.label.menu.menuType')" prop="menuType">
                <sSelect v-model="menu.menuType" dict="MENU_TYPE"
                         :placeholder="$t('placeholder.default',[$t('system.label.menu.menuType')])"
                />
            </iFormItem>
            <iFormItem :label="$t('system.label.menu.menuModule')" prop="menuModule">
                <iInput v-model="menu.menuModule"
                        :placeholder="$t('placeholder.default',[$t('system.label.menu.menuModule')])"
                />
            </iFormItem>
            <iFormItem :label="$t('system.label.menu.menuUrl')" prop="menuUrl">
                <iInput v-model="menu.menuUrl"
                        :placeholder="$t('placeholder.default',[$t('system.label.menu.menuUrl')])"
                />
            </iFormItem>
        </iForm>
    </div>
</template>

<script>
    export default {
        name: "MenuEdit",
        data() {
            return {
                menu: {},
                ruleValidate: {
                    menuName: [
                        {required: true, message: 'The menuName cannot be empty', trigger: 'blur'}
                    ],
                    menuType: [
                        {required: true, message: 'The menuType cannot be empty', trigger: 'change'}
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
