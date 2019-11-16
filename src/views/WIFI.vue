<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="AP mode" active>
        <b-form-group
          label-cols="4" label-cols-lg="2" label-size="sm"
          id="input-group-ap_ssid"
          label="SSID:"
          label-for="input-ap_ssid"
        >
        <b-form-input
          id="input-ap_ssid"
          v-model="form.ap_ssid"
          type="text"
          required
          placeholder="Enter AP SSID"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" id="input-group-ap_security" label="Security Type:" label-for="input-ap_security">
        <b-form-select
          id="input-ap_security"
          v-model="form.ap_security"
          :options="securities"
          @change="onAPsecurityChanged"
        ></b-form-select>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" id="input-group-ap_password" label="Pre-shared Key:" label-for="input-ap_password">
        <b-form-input
          id="input-ap_password"
          v-model="form.ap_password"
          type="text"
          :disabled='form.ap_security==0'
          placeholder="Enter security key"
        ></b-form-input>
      </b-form-group>
           <p align=right><i>Set AP SSID of this device.</i></p>

        </b-tab>

        <b-tab title="Station mode">
        <b-form-group
          label-cols="4" label-cols-lg="2" label-size="sm"
          id="input-group-st_ssid"
          label="SSID:"
          label-for="input-st_ssid"
        >
        <b-form-input
          id="input-st_ssid"
          v-model="form.st_ssid"
          type="text"
          placeholder="Enter AP SSID to connect"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" id="input-group-st_security" label="Security Type:" label-for="input-st_security">
        <b-form-select
          id="input-st_security"
          v-model="form.st_security"
          :options="securities"
          @change="onSTsecurityChanged"
        ></b-form-select>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" id="input-group-st_password" label="Pre-shared Key:" label-for="input-st_password">
        <b-form-input
          id="input-st_password"
          v-model="form.st_password"
          type="text"
          :disabled='form.st_security==0'
          placeholder="Enter security key"
        ></b-form-input>
      </b-form-group>
           <p align=right><i>Set AP SSID that this device will connect to.</i></p>

        </b-tab>

        </b-tabs>

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
  data() {
    return {
      form: {
        ap_ssid: '',
        ap_security: 0,
        ap_password: '',
        st_ssid: '',
        st_security: 0,
        st_password: '',
      },
      securities: [{ text: 'None', value: 0 }, { text: 'WPA-PSK/WPA2-PSK', value: 1 }],
      show: true
    }
  },
  // Vue 인스턴스에 추가할 메소드
  methods: {
    onAPsecurityChanged() {
      if (this.form.ap_security == 0)
        this.form.ap_password=''
    },
    onSTsecurityChanged() {
      if (this.form.st_security == 0)
        this.form.st_password=''
    },
    onSubmit(evt) {
      evt.preventDefault()
      //alert(JSON.stringify(this.form))
      var data = {}

      data.ap_ssid = this.form.ap_ssid
      data.ap_security = parseInt(this.form.ap_security)
      data.ap_password = this.form.ap_password
      data.st_ssid = this.form.st_ssid
      data.st_security = parseInt(this.form.st_security)
      data.st_password = this.form.st_password

      var query = encodeURI(JSON.stringify(data))
      // 전달 객체를 URL 인코딩해서 보냄
      var url = this.WEB_API_URL + "/api_wifi_set?query=" + query
      console.log('Request:', url)
      this.isDisabled = true
      axios.get(url).then(res =>{
        console.log('API Response : ', res)
        if (res.data.error) {
          alert('Faile to set data: ' + res.data.error)
        }
        else {
          this.form.ap_ssid = res.data.ap_ssid
          this.form.ap_security = res.data.ap_security
          this.form.ap_password = res.data.ap_password
          this.form.st_ssid = res.data.st_ssid
          this.form.st_security = res.data.st_security
          this.form.st_password = res.data.st_password
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
      this.form.ap_ssid = ''
      this.form.ap_password = ''
      this.form.ap_security = 0
      this.form.st_ssid = ''
      this.form.st_password = ''
      this.form.st_security = 0
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    bindData() {
      var url = this.WEB_API_URL + '/api_wifi_get'
      this.isDisabled = true
      axios.get(url).then(res =>{
        console.log('API Response : ', res)
        this.form.ap_ssid = res.data.ap_ssid
        this.form.ap_security = res.data.ap_security
        this.form.ap_password = res.data.ap_password
        this.form.st_ssid = res.data.st_ssid
        this.form.st_security = res.data.st_security
        this.form.st_password = res.data.st_password
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
  }
}
</script>
