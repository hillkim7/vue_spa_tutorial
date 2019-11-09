<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        label-cols="4" label-cols-lg="2" label-size="sm"
        id="input-group-addr"
        label="NTRIP address:"
        label-for="input-addr"
        description="NTRIP server address"
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
        description="NTRIP server port"
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
        description="NTRIP user id"
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
        label="NTRIP address:"
        label-for="input-password"
        description="NTRIP user password"
      >
        <b-form-input
          id="input-password"
          v-model="form.ntrip_password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result" v-if="false">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          ntrip_addr: '',
          ntrip_port: 2101,
          ntrip_user: '',
          ntrip_password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
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
      }
    }
  }
</script>
