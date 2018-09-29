/**
 * @Author: Suny
 * @Date:   2018-9-12 12:06:49
 */
'use strict'
import Vue from 'vue'

export default function treeToArray(data, expandAll, parent = null, level = null) {
    let tmp = []
    //alert(Array.isArray(data)+" |  aaa="+JSON.stringify(data)+"    level="+level+ "   expandAll="+expandAll)
    Array.from(data).forEach(function (record) {
        //alert(record+"  for start  bbb="+JSON.stringify(record));
        if (record.__expanded === undefined) {
            //Vue.set(record, '__expanded', expandAll)
            record['__expanded']= expandAll
        }
        let _level = 1
        if (level !== undefined && level !== null) {
            _level = level + 1
        }
        //Vue.set(record, '_level', _level)
        record['_level']= _level;
        // 如果有父元素
        if (parent) {
            //Vue.set(record, 'parent', parent)
            record.parent=parent;
        }
        let clength = 0;
        if (record.children && record.children.length > 0) {
            clength = record.children.length;
        }
        tmp.push(record)
        //alert("tmp="+JSON.stringify(tmp));
        //alert("record="+record+"  children="+record.children);
        if (clength > 0) {
            //alert("next:"+record.children);
            const children = treeToArray(record.children, expandAll, record, _level)
            tmp = tmp.concat(children)
            record.children = clength;//移除原来的children
        }
        //alert("for end:"+record)
    })
    //alert("end all :"+level)
    return tmp
}
