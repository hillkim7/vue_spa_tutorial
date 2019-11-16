<template>
  <div>
    <b-form v-if="show">
      <b-form-group
        label-cols="4" label-cols-lg="2" label-size="sm"
        id="input-group-cmd"
        label="GPS device input:"
        label-for="input-cmd"
        description="Input text to GPS device"
      >
      <b-input-group>
        <b-form-textarea
          id="input-cmd"
          v-model="form.gps_cmd"
          required
          placeholder="Enter text to pass it to GPS device"
        ></b-form-textarea>
        <b-input-group-append>
        <b-button  :disabled='isDisabled || form.gps_cmd.length == 0' v-on:click="onSendCmd" variant="info">Send</b-button>
        </b-input-group-append>
        </b-input-group>
      </b-form-group>

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
        gps_cmd: ''
      },
      show: true,
      isDisabled: false
    }
  },
  // Vue 인스턴스에 추가할 메소드
  methods: {
    onSendCmd(evt) {
      evt.preventDefault()
      var data = {}

      data.gps_cmd = this.form.gps_cmd
      var query = encodeURI(JSON.stringify(data))
      // 전달 객체를 URL 인코딩해서 보냄
      var url = this.WEB_API_URL + "/api_gps_set?query=" + query
      console.log('Request:', url)
      this.isDisabled = true
      axios.get(url).then(res =>{
        console.log('API Response : ', res)
        if (res.data.error) {
          alert('Faile to set data: ' + res.data.error)
        }
        else {
          alert('Update done')
        }
        this.isDisabled = false
      }).catch(e => {
        console.log(e)
        alert('Failed to get response')
        this.isDisabled = false
      })

    },
    bindData() {
    }
  },
  // 컴포넌트, 템플릿, 렌더링된 돔에 접근할 수 있는 상태 (인스턴스 라이프사이클에 속함)
  mounted() {
    this.bindData()
  },
}

</script>
