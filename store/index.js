export const state = () => ({
  //estados globales
  auth: null,
  devices: [],
  selectedDevice: {}
});

//no se pueden cambiar los valores a menos usar mutaciones
//mutaciones
export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
  setDevices(state, devices) {
    state.devices = devices;
  },
  setSelectedDevice(state, device) {
    state.selectedDevice = device;
  }
};

export const actions = {
  readToken() {
    let auth = null;
    try {
      auth = JSON.parse(localStorage.getItem("auth"));
    } catch (error) {
      console.log(err);
    }
    //saving auth in state
    this.commit("setAuth", auth);
  },

  getDevices() {
    const axiosHeader = {
      headers: {
        token: this.state.auth.token
      }
    };

    this.$axios.get("/device", axiosHeader).then(res => {
      console.log(res.data.data);

      res.data.data.forEach((device, index) => {
        if (device.selected) {
          this.commit("setSelectedDevice", device);
          $nuxt.$emit("selectedDeviceIndex", index);
        }
      });

      this.commit("setDevices", res.data.data);
    });
  }
};
