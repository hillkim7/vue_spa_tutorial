<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        label-cols="4" label-cols-lg="2" label-size="sm"
        id="input-group-addr"
        label="NTRIP address:"
        label-for="input-addr"
      >
        <b-form-input
          id="input-addr"
          v-model="form.ntrip_addr"
          type="text"
          required
          placeholder="Enter server address"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols="4" label-cols-lg="2" label-size="sm"
        id="input-group-port"
        label="NTRIP port:"
        label-for="input-port"
      >
        <b-form-input
          id="input-port"
          v-model="form.ntrip_port"
          type="number"
          required
          placeholder="Enter port number"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols="4" label-cols-lg="2" label-size="sm"
        id="input-group-user"
        label="NTRIP user:"
        label-for="input-user"
      >
        <b-form-input
          id="input-user"
          v-model="form.ntrip_user"
          type="text"
          required
          placeholder="Enter user id"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols="4" label-cols-lg="2" label-size="sm"
        id="input-group-password"
        label="NTRIP password:"
        label-for="input-password"
      >
        <b-form-input
          id="input-password"
          v-model="form.ntrip_password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button :disabled='isDisabled' type="submit" variant="primary">Submit</b-button>
      <b-button :disabled='isDisabled' type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result" v-if="false">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  // 데이터 객체
  data() {
    return {
      form: {
        ntrip_addr: '',
        ntrip_port: 0,
        ntrip_user: '',
        ntrip_password: ''
      },
      show: true,
      isDisabled: false
    }
  },
  // Vue 인스턴스에 추가할 메소드
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      //alert(JSON.stringify(this.form))
      var data = {}

      data.ntrip_addr = this.form.ntrip_addr
      data.ntrip_port = parseInt(this.form.ntrip_port)
      data.ntrip_user = this.form.ntrip_user
      data.ntrip_password = this.form.ntrip_password
      var query = encodeURI(JSON.stringify(data))
      // 전달 객체를 URL 인코딩해서 보냄
      var url = this.WEB_API_URL + "/api_ntrip_set?query=" + query
      console.log('Request:', url)
      this.isDisabled = true
      axios.get(url).then(res =>{
        console.log('API Response : ', res)
        if (res.data.error) {
          alert('Faile to set data: ' + res.data.error)
        }
        else {
          this.form.ntrip_addr = res.data.ntrip_addr
          this.form.ntrip_port = res.data.ntrip_port
          this.form.ntrip_user = res.data.ntrip_user
          this.form.ntrip_password = res.data.ntrip_password
          alert('Update done')
          this.isDisabled = false
        }
      }).catch(e => {
        console.log(e)
        alert('Failed to get response')
        this.isDisabled = false
      })

    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.ntrip_addr = ''
      this.form.ntrip_port = 2101
      this.form.ntrip_user = ''
      this.form.ntrip_password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    bindData() {
      var url = this.WEB_API_URL + '/api_ntrip_get'
      this.isDisabled = true
      axios.get(url).then(res =>{
        console.log('API Response : ', res)
        this.form.ntrip_addr = res.data.ntrip_addr
        this.form.ntrip_port = res.data.ntrip_port
        this.form.ntrip_user = res.data.ntrip_user
        this.form.ntrip_password = res.data.ntrip_password
        this.isDisabled = false
      }).catch(e => {
        console.log(e)
        alert('Failed to get response')
        this.isDisabled = false
      })
    }
  },
  // 컴포넌트, 템플릿, 렌더링된 돔에 접근할 수 있는 상태 (인스턴스 라이프사이클에 속함)
  mounted() {
    this.bindData()
  },
}

</script>
