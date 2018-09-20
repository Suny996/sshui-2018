import Axios from "axios"

export default {
  query: function (vm, param) {
    console.log(vm);
    //console.log(this)
    let variables = vm.variables;
    let operators = vm.operators;
    let customises = vm.customises;
    if (param && param.variables) {
      variables = param.variables;
    }
    if (param && param.operators) {
      operators = param.operators;
    }
    if (param && param.customises) {
      customises = param.customises;
    }
    if (customises) {
      for (let c in variables) {
        console.log(c)
        if (!customises[c]) {
          delete variables[c];
          delete operators[c];
        }
      }
    }
    Axios.post(vm.listUrl, {pageSize: this.pageSize | 5, variables: variables, operators: operators})
      .then(res => {
        //设置查询Url以供分页使用
        res.data.listUrl = vm.listUrl;
        console.log(res.data);
        vm.$emit("on-query", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  change: function (vm, param, pageSize, dataRef) {
    console.log(vm);
    //console.log(this)
    var dataRef = 'data';
    if (param && param['dataRef']) {
      dataRef = param['dataRef'];
    }
    if (param && param['currPage']) {
      vm[dataRef].currentPage = param['currPage'];
    }
    if (param && param['pageSize']) {
      vm[dataRef].pageSize = param['pageSize'];
    }
    //vm[dataRef].rows = [];
    var param = vm[dataRef];
    param.rows = [];//清除参数里的历史数据
    Axios.post(vm[dataRef].listUrl, vm[dataRef])
      .then(res => {
        res.data.listUrl = vm[dataRef].listUrl;
        console.log(res.data);
        //vm[dataRef] = res.data;
        vm.$emit("on-change", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  get: function (vm, param) {
    console.log(vm);
    //console.log(this)
    let variables = vm.variables;
    let operators = vm.operators;
    if (param) {
      variables = param;
    }
    Axios(vm.listUrl, {
      params: variables
    }).then(res => {
      vm.$emit("on-query", res.data);
      console.log(res.data);
    })
      .catch(error => {
        console.log(error);
      })
  },
  post: function (url, data,callbaks) {
    console.log(data);
    //console.log(this)
    Axios.post(url, data)
      .then(res => {
        console.log(res.data);
        if(callbaks && callbaks.success){
          callbaks.success(res.data);
        }
      })
      .catch(error => {
        console.log(error);
        if(callbaks && callbaks.error){
          callbaks.error(error);
        }
      });
  },
  delete: function (url, data,callbaks) {
    console.log(data);
    //console.log(this)
    Axios.delete(url, data)
      .then(res => {
        console.log(res.data);
        if(callbaks && callbaks.success){
          callbaks.success(res.data);
        }
      })
      .catch(error => {
        console.log(error);
        if(callbaks && callbaks.error){
          callbaks.error(error);
        }
      });
  }
}
