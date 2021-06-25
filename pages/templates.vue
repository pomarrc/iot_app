<template>
  <div class="row">
   
   <iotbutton></iotbutton>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,

      configIndicator: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "8888",
          templateName: "Power Sensor",
          templateId: "984237562348756ldksjfh",
          saverRule: false
        },
        variableFullName: "Pump",
        variable: "var1",
        icon: "fa-sun",
        column: "col-6",
        widget: "indicator",
        class: "success"
      },


    };
  },
  methods: {

  }
};
</script>
